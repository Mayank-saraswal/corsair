import type { CorsairEndpoint } from 'corsair/core';
import { logEventFromContext } from 'corsair/core';
import { makeTeamworkRequest } from '../client';
import type { TeamworkContext } from '../index';
import { teamworkInputSchemas, teamworkOutputSchemas } from './openapi-schema';
import type { TeamworkOperationDefinition } from './types';
import { teamworkOperations } from './types';

// `unknown` is necessary because each operation narrows this JSON with its own Zod input schema.
type EndpointInput = Record<string, unknown>;
// `unknown` is necessary because the endpoint output is validated against an operation-specific runtime schema.
export type TeamworkOperationEndpoint = CorsairEndpoint<
	TeamworkContext,
	EndpointInput,
	unknown
>;

// `unknown` is necessary because endpoint JSON is narrowed after runtime schema parsing.
function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// `unknown` is necessary because the dynamic input's path/query containers are narrowed here.
function recordFromInput(
	input: Record<string, unknown>,
	key: string,
): Record<string, unknown> {
	const value = input[key];
	if (isRecord(value)) return value;
	throw new Error('Invalid Teamwork endpoint input');
}

export function createTeamworkOperationEndpoint(
	operation: TeamworkOperationDefinition,
): TeamworkOperationEndpoint {
	return async (ctx, input) => {
		const inputSchema = teamworkInputSchemas[operation.id];
		const outputSchema = teamworkOutputSchemas[operation.id];
		if (!inputSchema || !outputSchema) {
			throw new Error('Teamwork operation schema is unavailable');
		}
		// `unknown` is necessary because OpenAPI-derived nested fields differ per operation.
		let parsedInput: Record<string, unknown>;
		try {
			// `unknown` is necessary because Zod parses an untyped endpoint payload at runtime.
			const parsed: unknown = inputSchema.parse(input);
			if (!isRecord(parsed)) throw new Error('Invalid input shape');
			parsedInput = parsed;
		} catch {
			throw new Error('Invalid Teamwork endpoint input');
		}

		const pathParameters = recordFromInput(parsedInput, 'path');
		const query = recordFromInput(parsedInput, 'query');
		// `unknown` is necessary because the transport returns untrusted provider JSON.
		const response = await makeTeamworkRequest({
			apiKey: ctx.key,
			siteName: ctx.options.siteName ?? '',
			version: operation.version,
			method: operation.method,
			path: operation.path,
			pathParameters,
			query,
			body: parsedInput.body,
		});

		// `unknown` is necessary because response validation does not yield a static operation-specific type.
		let parsedOutput: unknown;
		try {
			parsedOutput = outputSchema.parse(response);
		} catch {
			throw new Error('Teamwork response did not match its documented schema');
		}

		await logEventFromContext(
			ctx,
			'teamwork.operation',
			{ operationId: operation.id },
			'completed',
		);
		return parsedOutput;
	};
}

export const teamworkOperationsNested: Record<
	string,
	TeamworkOperationEndpoint
> = Object.fromEntries(
	teamworkOperations.map((operation) => [
		operation.id,
		createTeamworkOperationEndpoint(operation),
	]),
);
