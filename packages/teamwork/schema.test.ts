import {
	teamworkInputSchemas,
	teamworkOutputSchemas,
} from './endpoints/openapi-schema';
import { teamworkDefinitions, teamworkOperations } from './endpoints/types';
import { TeamworkSchema } from './schema';

// `unknown` is necessary because OpenAPI schemas are provider JSON data, not trusted TypeScript values.
function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// `unknown` is necessary because test contract fixtures are built from untrusted OpenAPI JSON values.
function sampleValue(
	value: unknown,
	definitions: Record<string, Record<string, unknown>>,
	depth = 0,
): unknown {
	if (!isRecord(value) || depth > 16) return null;
	if (typeof value.$ref === 'string') {
		const name = value.$ref.replace(/^#\/definitions\//, '');
		return sampleValue(definitions[name], definitions, depth + 1);
	}
	if (Array.isArray(value.enum) && value.enum.length > 0) return value.enum[0];
	if (Array.isArray(value.allOf)) {
		// `unknown` is necessary because allOf members have dynamically declared response shapes.
		return value.allOf.reduce<Record<string, unknown>>((merged, member) => {
			const sample = sampleValue(member, definitions, depth + 1);
			return isRecord(sample) ? { ...merged, ...sample } : merged;
		}, {});
	}
	const union = Array.isArray(value.oneOf) ? value.oneOf : value.anyOf;
	if (Array.isArray(union) && union.length > 0) {
		return sampleValue(union[0], definitions, depth + 1);
	}
	if (value.type === 'string')
		return 'x'.repeat(Math.max(1, Number(value.minLength) || 1));
	if (value.type === 'integer')
		return typeof value.minimum === 'number' ? value.minimum : 1;
	if (value.type === 'number')
		return typeof value.minimum === 'number' ? value.minimum : 0;
	if (value.type === 'boolean') return true;
	if (value.type === 'array') {
		return isRecord(value.items)
			? [sampleValue(value.items, definitions, depth + 1)]
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
					sampleValue(properties[name], definitions, depth + 1),
				]),
		);
	}
	// `unknown` is necessary because OpenAPI permits schema-free values in extension fields.
	return null;
}

describe('Teamwork OpenAPI contract schemas', () => {
	it('declares a semver database schema', () => {
		expect(TeamworkSchema.version).toMatch(/^\d+\.\d+\.\d+$/);
		expect(TeamworkSchema.entities).toEqual({});
	});

	it('registers input and output schemas for every documented JSON operation', () => {
		expect(Object.keys(teamworkInputSchemas).sort()).toEqual(
			teamworkOperations.map((operation) => operation.id).sort(),
		);
		expect(Object.keys(teamworkOutputSchemas).sort()).toEqual(
			teamworkOperations.map((operation) => operation.id).sort(),
		);
	});

	it('validates documented numeric maps without allowing unrelated body fields', () => {
		const ratesSchema =
			teamworkInputSchemas[
				'v3_patch_projects_api_v3_companies_companyid_rates_json'
			];
		expect(
			ratesSchema?.safeParse({
				path: { companyId: 123 },
				query: {},
				body: { clientRateByRoleId: { '123': 100 } },
			}).success,
		).toBe(true);
		expect(
			ratesSchema?.safeParse({
				path: { companyId: 123 },
				query: {},
				body: {
					clientRateByRoleId: { '123': 100 },
					undocumented: true,
				},
			}).success,
		).toBe(false);
	});

	it.each(teamworkOperations)(
		'$id rejects extra input properties and malformed output',
		(operation) => {
			const inputSchema = teamworkInputSchemas[operation.id];
			const outputSchema = teamworkOutputSchemas[operation.id];
			expect(inputSchema).toBeDefined();
			expect(outputSchema).toBeDefined();
			expect(inputSchema?.safeParse({ unexpected: true }).success).toBe(false);
			if (operation.responseCode === '204') {
				expect(outputSchema?.safeParse({}).success).toBe(false);
			} else {
				expect(outputSchema?.safeParse(null).success).toBe(false);
			}
			const documentedResponse = sampleValue(
				operation.response,
				teamworkDefinitions[operation.version] ?? {},
			);
			if (operation.responseCode !== '204') {
				const parsed = outputSchema?.safeParse(documentedResponse);
				expect(parsed?.success).toBe(true);
			}
		},
	);
});
