import { z } from 'zod';
import { operationData } from '../operation-data';
import type {
	JsonSchema,
	SimlaComEndpointInput,
	SimlaComOperation,
} from './operation-types';

const operations = operationData.operations;
const openApiSchemas = new Map<string, JsonSchema>(
	Object.entries(operationData.schemas),
);

// Unknown here represents open-ended JSON properties explicitly allowed by the OpenAPI contract.
const allowJsonValue = z.custom<unknown>(() => true);

function referencedSchema(reference: string): JsonSchema {
	const name = reference.replace(/^#\/components\/schemas\//, '');
	const schema = openApiSchemas.get(name);
	if (!schema)
		throw new Error(`Unknown Simla.com OpenAPI schema reference: ${name}`);
	return schema;
}

function regexForPattern(pattern: string): RegExp {
	const datePatterns: Record<string, string> = {
		'Y-m-d': '^\\d{4}-\\d{2}-\\d{2}$',
		'Y-m-d H:i': '^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}$',
		'Y-m-d H:i:s': '^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}$',
		'Y-m-d H:i:sP':
			'^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}[+-]\\d{2}:\\d{2}$',
		'Y-m-d\\TH:i:sP':
			'^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}[+-]\\d{2}:\\d{2}$',
		'm.d': '^\\d{2}\\.\\d{2}$',
		'H:i': '^(?:[01]\\d|2[0-3]):[0-5]\\d$',
	};
	const normalized = datePatterns[pattern] ?? pattern;
	return new RegExp(normalized.replace(/^\\A/, '^').replace(/\\z$/, '$'));
}

// The provider publishes recursive and extensible objects; unknown here is narrowed by each generated OpenAPI schema.
function schemaToZod(schema: JsonSchema): z.ZodType<unknown> {
	if (schema.$ref) {
		return z.lazy(() => schemaToZod(referencedSchema(schema.$ref ?? '')));
	}

	const type = Array.isArray(schema.type) ? schema.type[0] : schema.type;
	// This dynamic output type is narrowed at runtime by the concrete OpenAPI-derived Zod schema.
	let result: z.ZodType<unknown>;

	if (schema.enum) {
		const enumValues = schema.enum;
		result = z.custom<unknown>(
			(value) =>
				enumValues.some(
					(entry) => JSON.stringify(entry) === JSON.stringify(value),
				),
			{ message: 'Value is not in the documented Simla.com enum.' },
		);
	} else if (schema.oneOf || schema.anyOf) {
		const choices = schema.oneOf ?? schema.anyOf ?? [];
		// Variant outputs differ by endpoint; each branch is runtime-validated before use.
		result = choices.reduce<z.ZodType<unknown>>(
			(combined, choice) => z.union([combined, schemaToZod(choice)]),
			schemaToZod(choices[0] ?? {}),
		);
	} else if (schema.allOf && schema.allOf.length > 0) {
		// Intersections can combine distinct provider models, so the common runtime type is unknown.
		result = schema.allOf
			.slice(1)
			.reduce<z.ZodType<unknown>>(
				(combined, part) => z.intersection(combined, schemaToZod(part)),
				schemaToZod(schema.allOf?.[0] ?? {}),
			);
	} else if (type === 'string') {
		let stringSchema = z.string();
		if (schema.minLength !== undefined)
			stringSchema = stringSchema.min(schema.minLength);
		if (schema.maxLength !== undefined)
			stringSchema = stringSchema.max(schema.maxLength);
		if (schema.pattern)
			stringSchema = stringSchema.regex(regexForPattern(schema.pattern));
		result = stringSchema;
	} else if (type === 'integer' || type === 'number') {
		let numberSchema = z.number();
		if (type === 'integer') numberSchema = numberSchema.int();
		if (schema.minimum !== undefined)
			numberSchema = numberSchema.min(schema.minimum);
		if (schema.maximum !== undefined)
			numberSchema = numberSchema.max(schema.maximum);
		result = numberSchema;
	} else if (type === 'boolean') {
		result = z.boolean();
	} else if (type === 'array') {
		let arraySchema = z.array(
			schema.items ? schemaToZod(schema.items) : allowJsonValue,
		);
		if (schema.minItems !== undefined)
			arraySchema = arraySchema.min(schema.minItems);
		if (schema.maxItems !== undefined)
			arraySchema = arraySchema.max(schema.maxItems);
		result = arraySchema;
	} else if (type === 'null') {
		result = z.null();
	} else if (type === 'object' || schema.properties) {
		// Field types vary across provider models; each field is recursively validated before output.
		const fields: Record<string, z.ZodType<unknown>> = {};
		for (const [name, property] of Object.entries(schema.properties ?? {})) {
			const field = schemaToZod(property);
			fields[name] = schema.required?.includes(name) ? field : field.optional();
		}
		for (const requiredName of schema.required ?? []) {
			if (!(requiredName in (schema.properties ?? {}))) {
				// Simla.com's OpenAPI marks this field required but publishes no type or constraints for it.
				fields[requiredName] = z.custom<unknown>(() => true);
			}
		}
		const objectSchema = z.object(fields);
		if (
			schema.additionalProperties &&
			typeof schema.additionalProperties === 'object'
		) {
			result = objectSchema.catchall(schemaToZod(schema.additionalProperties));
		} else if (schema.additionalProperties === true) {
			result = objectSchema.catchall(allowJsonValue);
		} else {
			result = objectSchema.strict();
		}
	} else {
		result = allowJsonValue;
	}

	if (schema.nullable) result = result.nullable();
	if (schema.description) result = result.describe(schema.description);
	return result;
}

function objectSchema(
	fields: Record<string, z.ZodType<unknown>>,
): z.ZodObject<Record<string, z.ZodType<unknown>>> {
	return z.object(fields).strict();
}

export function createOperationInputSchema(
	operation: SimlaComOperation,
): z.ZodType<SimlaComEndpointInput> {
	const pathFields: Record<string, z.ZodType<unknown>> = {};
	const queryFields: Record<string, z.ZodType<unknown>> = {};
	const requiredQuery: string[] = [];
	for (const parameter of operation.parameters) {
		const field = schemaToZod(parameter.schema);
		if (parameter.in === 'path') {
			pathFields[parameter.name] = field;
		} else {
			queryFields[parameter.name] = field;
			if (parameter.required && parameter.default === undefined) {
				requiredQuery.push(parameter.name);
			}
		}
	}
	for (const name of Object.keys(queryFields)) {
		if (!requiredQuery.includes(name))
			queryFields[name] = queryFields[name]?.optional() ?? allowJsonValue;
	}

	const pathSchema = objectSchema(pathFields);
	const querySchema = objectSchema(queryFields);
	const pathField =
		Object.keys(pathFields).length > 0 ? pathSchema : pathSchema.optional();
	const queryField =
		requiredQuery.length > 0 ? querySchema : querySchema.optional();
	const bodyField = operation.request?.schema
		? schemaToZod(operation.request.schema)
		: z.never();
	const bodySchema = operation.request?.required
		? bodyField
		: bodyField.optional();

	return z
		.object({ path: pathField, query: queryField, body: bodySchema })
		.strict();
}

// The full output type varies by operation; this runtime schema comes from that operation's OpenAPI response model.
export function createOperationOutputSchema(
	operation: SimlaComOperation,
): z.ZodType<unknown> {
	if (operation.response.kind === 'binary') {
		return z
			.object({
				kind: z.literal('binary'),
				contentType: z.string(),
				base64: z.string(),
			})
			.strict();
	}
	const schema = operation.response.schema
		? Object.keys(operation.response.schema).length === 0
			? z.record(z.string(), allowJsonValue)
			: schemaToZod(operation.response.schema)
		: z.record(z.string(), allowJsonValue);
	return schema;
}

export const SIMLACOM_INPUT_SCHEMAS = new Map(
	operations.map((operation) => [
		operation.id,
		createOperationInputSchema(operation),
	]),
);

export const SIMLACOM_OUTPUT_SCHEMAS = new Map(
	operations.map((operation) => [
		operation.id,
		createOperationOutputSchema(operation),
	]),
);
