import { logEventFromContext } from 'corsair/core';
import * as client from './client';
import { teamworkInputSchemas } from './endpoints/openapi-schema';
import { teamworkOperationsNested } from './endpoints/operations';
import { teamworkDefinitions, teamworkOperations } from './endpoints/types';
import type { TeamworkContext } from './index';
import { teamwork } from './index';

jest.mock('corsair/core', () => {
	const actual =
		jest.requireActual<typeof import('corsair/core')>('corsair/core');
	return { ...actual, logEventFromContext: jest.fn() };
});

jest.mock('./client', () => {
	const actual = jest.requireActual<typeof import('./client')>('./client');
	return { ...actual, makeTeamworkRequest: jest.fn() };
});

const mockedRequest = jest.mocked(client.makeTeamworkRequest);
const mockedLogEvent = jest.mocked(logEventFromContext);

// `unknown` is necessary because OpenAPI schemas describe runtime JSON values.
function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// `unknown` is necessary because OpenAPI schemas describe runtime JSON rather than trusted test types.
function makeValue(
	value: unknown,
	definitions: Record<string, Record<string, unknown>>,
	depth = 0,
): unknown {
	if (!isRecord(value) || depth > 16) return null;
	if (typeof value.$ref === 'string') {
		return makeValue(
			definitions[value.$ref.replace(/^#\/definitions\//, '')],
			definitions,
			depth + 1,
		);
	}
	if (Array.isArray(value.enum) && value.enum.length > 0) return value.enum[0];
	if (Array.isArray(value.allOf)) {
		// `unknown` is necessary because each allOf member is an arbitrary provider schema fragment.
		return value.allOf.reduce<Record<string, unknown>>((merged, member) => {
			const sample = makeValue(member, definitions, depth + 1);
			return isRecord(sample) ? { ...merged, ...sample } : merged;
		}, {});
	}
	const union = Array.isArray(value.oneOf) ? value.oneOf : value.anyOf;
	if (Array.isArray(union) && union.length > 0) {
		return makeValue(union[0], definitions, depth + 1);
	}
	if (value.type === 'string') return 'sample';
	if (value.type === 'integer')
		return typeof value.minimum === 'number' ? value.minimum : 1;
	if (value.type === 'number')
		return typeof value.minimum === 'number' ? value.minimum : 0;
	if (value.type === 'boolean') return true;
	if (value.type === 'array') {
		return isRecord(value.items)
			? [makeValue(value.items, definitions, depth + 1)]
			: [];
	}
	if (value.type === 'object' || isRecord(value.properties)) {
		const properties = isRecord(value.properties) ? value.properties : {};
		const required = Array.isArray(value.required) ? value.required : [];
		return Object.fromEntries(
			required
				.filter((name): name is string => typeof name === 'string')
				.map((name) => [
					name,
					makeValue(properties[name], definitions, depth + 1),
				]),
		);
	}
	// `unknown` is necessary for provider fields whose schema is not documented.
	return null;
}

// `unknown` is necessary because operation inputs are assembled from dynamic OpenAPI parameter definitions.
function makeInput(
	operation: (typeof teamworkOperations)[number],
): Record<string, unknown> {
	const definitions = teamworkDefinitions[operation.version] ?? {};
	// `unknown` is necessary because path parameter types vary across provider operations.
	const path: Record<string, unknown> = {};
	// `unknown` is necessary because query parameter types vary across provider operations.
	const query: Record<string, unknown> = {};
	for (const parameter of operation.parameters) {
		if (parameter.in === 'path' || parameter.required) {
			const value = makeValue(
				{
					type: parameter.type,
					enum: parameter.enum,
					items: parameter.items,
					minimum: parameter.minimum,
					maximum: parameter.maximum,
				},
				definitions,
			);
			(parameter.in === 'path' ? path : query)[parameter.name] = value;
		}
	}
	// `unknown` is necessary because request bodies vary by provider operation.
	const input: Record<string, unknown> = { path, query };
	if (operation.bodyRequired && operation.body !== undefined) {
		input.body = makeValue(operation.body, definitions);
	}
	return input;
}

function buildContext(): TeamworkContext {
	return {
		endpoints: {},
		$getAccountId: () => Promise.resolve('teamwork-test-account'),
		key: 'test-key',
		options: { siteName: 'teamwork-test' },
		keys: {
			get_dek: () => Promise.resolve('test-dek'),
			issue_new_dek: () => Promise.resolve('test-dek'),
			get_api_key: () => Promise.resolve('test-key'),
			set_api_key: () => Promise.resolve(),
			get_webhook_signature: () => Promise.resolve(null),
			set_webhook_signature: () => Promise.resolve(),
		},
		db: {},
	};
}

const ctx = buildContext();

beforeEach(() => {
	mockedRequest.mockReset();
	mockedRequest.mockResolvedValue(undefined);
	mockedLogEvent.mockReset();
});

describe('documented operation routes', () => {
	it.each(teamworkOperations)(
		'$id calls its documented HTTP route',
		async (operation) => {
			const endpoint = teamworkOperationsNested[operation.id];
			if (!endpoint)
				throw new Error('Registered Teamwork operation is missing');
			const input = makeInput(operation);
			const inputResult = teamworkInputSchemas[operation.id]?.safeParse(input);
			if (!inputResult?.success) {
				const paths = inputResult?.error.issues
					.map((issue) => issue.path.join('.'))
					.join(', ');
				throw new Error(`Invalid fixture for ${operation.id}: ${paths}`);
			}
			await endpoint(ctx, input).catch(() => undefined);
			expect(mockedRequest).toHaveBeenCalledWith({
				apiKey: 'test-key',
				siteName: 'teamwork-test',
				version: operation.version,
				method: operation.method,
				path: operation.path,
				pathParameters: input.path,
				query: input.query,
				body: input.body,
			});
			expect(mockedLogEvent).not.toHaveBeenCalledWith(
				expect.anything(),
				expect.anything(),
				expect.objectContaining(input),
				expect.anything(),
			);
		},
	);

	it.each(teamworkOperations)(
		'$id rejects undocumented input before network I/O',
		async (operation) => {
			const endpoint = teamworkOperationsNested[operation.id];
			if (!endpoint)
				throw new Error('Registered Teamwork operation is missing');
			await expect(endpoint(ctx, { unexpected: 'rejected' })).rejects.toThrow(
				'Invalid Teamwork endpoint input',
			);
			expect(mockedRequest).not.toHaveBeenCalled();
		},
	);

	it('uses a credential-required API-key connector and has no webhooks', () => {
		const plugin = teamwork({ siteName: 'teamwork-test' });
		expect(plugin.authConfig?.api_key?.account).toEqual(['tenant_external_id']);
		expect(plugin.webhooks).toEqual({});
	});
});
