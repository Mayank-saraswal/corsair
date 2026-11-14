import type { JsonSchema, JsonValue } from './endpoints/operation-types';
import {
	SIMLACOM_INPUT_SCHEMAS,
	SIMLACOM_OUTPUT_SCHEMAS,
} from './endpoints/schemas';
import { SIMLACOM_OPERATIONS } from './endpoints/types';
import { operationData } from './operation-data';

function documentedResponseSample(
	schema: JsonSchema,
	seen = new Set<string>(),
): JsonValue {
	if (schema.$ref) {
		const name = schema.$ref.replace('#/components/schemas/', '');
		if (seen.has(name)) return {};
		const next = new Set(seen);
		next.add(name);
		return documentedResponseSample(operationData.schemas[name] ?? {}, next);
	}
	if (schema.enum?.length) return schema.enum[0] ?? null;
	if (schema.allOf?.length) {
		const parts = schema.allOf.map((part) =>
			documentedResponseSample(part, seen),
		);
		const objectParts = parts.filter(
			(part): part is Record<string, JsonValue> =>
				typeof part === 'object' && part !== null && !Array.isArray(part),
		);
		if (objectParts.length > 0) return Object.assign({}, ...objectParts);
		return parts[0] ?? {};
	}
	if (schema.oneOf?.length) {
		return documentedResponseSample(schema.oneOf[0] ?? {}, seen);
	}
	if (schema.anyOf?.length) {
		return documentedResponseSample(schema.anyOf[0] ?? {}, seen);
	}
	const type = Array.isArray(schema.type) ? schema.type[0] : schema.type;
	if (type === 'string') {
		if (schema.enum?.length) return schema.enum[0] ?? 'demo';
		if (schema.format === 'date' || schema.pattern === 'Y-m-d')
			return '2025-01-01';
		if (schema.format === 'date-time') return '2025-01-01 12:00:00';
		if (schema.format === 'email') return 'reader@sample.invalid';
		if (schema.pattern === 'H:i') return '12:00';
		if (schema.pattern === 'm.d') return '01.01';
		if (schema.pattern === 'Y-m-d H:i:s') return '2025-01-01 12:00:00';
		if (schema.pattern === 'Y-m-d H:i:sP') return '2025-01-01 12:00:00+00:00';
		if (schema.pattern === 'Y-m-d\\TH:i:sP') return '2025-01-01T12:00:00+00:00';
		if (schema.pattern?.includes('[0-9,a-f,A-F]')) return '#aabbcc';
		if (schema.pattern?.includes('\\d')) return '17';
		if (schema.pattern?.includes('|')) {
			return schema.pattern.replace(/[()^$]/g, '').split('|')[0] ?? 'demo';
		}
		return 'demo';
	}
	if (type === 'integer' || type === 'number') return schema.minimum ?? 1;
	if (type === 'boolean') return false;
	if (type === 'null') return null;
	if (type === 'array') {
		return schema.minItems
			? Array.from({ length: schema.minItems }, () =>
					documentedResponseSample(schema.items ?? {}, seen),
				)
			: [];
	}
	if (type === 'object' || schema.properties) {
		const output: Record<string, JsonValue> = {};
		for (const name of schema.required ?? []) {
			const property = schema.properties?.[name];
			output[name] = property
				? documentedResponseSample(property, seen)
				: 'demo';
		}
		return output;
	}
	return {};
}

describe('OpenAPI-derived Zod schemas', () => {
	it('registers strict request schemas for all documented operations', () => {
		expect(SIMLACOM_INPUT_SCHEMAS.size).toBe(SIMLACOM_OPERATIONS.length);
		for (const operation of SIMLACOM_OPERATIONS) {
			const schema = SIMLACOM_INPUT_SCHEMAS.get(operation.id);
			expect(schema).toBeDefined();
			expect(schema?.safeParse({ undocumented: true }).success).toBe(false);
		}
	});

	it('registers response schemas that reject non-object JSON for all operations', () => {
		expect(SIMLACOM_OUTPUT_SCHEMAS.size).toBe(SIMLACOM_OPERATIONS.length);
		for (const operation of SIMLACOM_OPERATIONS) {
			const schema = SIMLACOM_OUTPUT_SCHEMAS.get(operation.id);
			expect(schema).toBeDefined();
			expect(schema?.safeParse(null).success).toBe(false);
		}
	});

	it('accepts a schema-shaped response sample for every documented operation', () => {
		const failures: string[] = [];
		for (const operation of SIMLACOM_OPERATIONS) {
			const schema = SIMLACOM_OUTPUT_SCHEMAS.get(operation.id);
			if (!schema) {
				failures.push(operation.id);
				continue;
			}
			const output =
				operation.response.kind === 'binary'
					? {
							kind: 'binary',
							contentType: 'application/octet-stream',
							base64: 'QQ==',
						}
					: documentedResponseSample(operation.response.schema);
			if (!schema.safeParse(output).success) failures.push(operation.id);
		}
		expect(failures).toEqual([]);
	});

	it('enforces the documented list-page bounds and enums', () => {
		const list = SIMLACOM_INPUT_SCHEMAS.get('cost.list.get');
		expect(list?.safeParse({ query: { limit: 20, page: 1 } }).success).toBe(
			true,
		);
		expect(list?.safeParse({ query: { limit: 19, page: 1 } }).success).toBe(
			false,
		);
		expect(list?.safeParse({ query: { limit: 20, page: 0 } }).success).toBe(
			false,
		);
	});

	it('accepts provider-documented Y-m-d dates and rejects malformed date strings', () => {
		const createCost = SIMLACOM_INPUT_SCHEMAS.get('cost.create.post');
		expect(
			createCost?.safeParse({ body: { cost: { dateFrom: '2025-01-01' } } })
				.success,
		).toBe(true);
		expect(
			createCost?.safeParse({ body: { cost: { dateFrom: 'not-a-date' } } })
				.success,
		).toBe(false);
	});
});
