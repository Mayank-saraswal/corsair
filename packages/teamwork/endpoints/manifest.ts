import { z } from 'zod';
import teamworkOpenApiV1 from '../openapi-manifest-v1.json';
import teamworkOpenApiV2 from '../openapi-manifest-v2.json';
import teamworkOpenApiV3Definitions from '../openapi-manifest-v3-definitions.json';
import teamworkOpenApiV3Operations1 from '../openapi-manifest-v3-operations-1.json';
import teamworkOpenApiV3Operations2 from '../openapi-manifest-v3-operations-2.json';

// `unknown` is necessary because OpenAPI schemas contain provider-defined JSON Schema keywords.
const OpenApiSchemaDocument = z.record(z.string(), z.unknown());

const OperationParameterSchema = z.object({
	name: z.string(),
	in: z.enum(['path', 'query']),
	type: z.string().optional(),
	format: z.string().optional(),
	// `unknown` is necessary because OpenAPI enum members may be strings, numbers, or booleans.
	enum: z.array(z.unknown()).optional(),
	items: OpenApiSchemaDocument.optional(),
	required: z.boolean(),
	// `unknown` is necessary because a documented query default may be any JSON scalar.
	default: z.unknown().optional(),
	collectionFormat: z.string().optional(),
	minimum: z.number().optional(),
	maximum: z.number().optional(),
	minLength: z.number().optional(),
	maxLength: z.number().optional(),
});

const OperationSchema = z.object({
	id: z.string(),
	version: z.enum(['v1', 'v2', 'v3']),
	method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
	path: z.string(),
	summary: z.string(),
	tag: z.string(),
	parameters: z.array(OperationParameterSchema),
	// `unknown` is necessary because request bodies may be objects or arrays before schema validation.
	body: z.unknown().optional(),
	bodyRequired: z.boolean(),
	response: OpenApiSchemaDocument.nullable(),
	responseCode: z.string(),
});

const ManifestSchema = z.object({
	operations: z.array(OperationSchema),
	// `unknown` is necessary because OpenAPI definitions contain arbitrary JSON Schema keywords.
	definitions: z.record(
		z.string(),
		z.record(z.string(), OpenApiSchemaDocument),
	),
});

// `unknown` is necessary because the imported provider contracts are validated at runtime by ManifestSchema.
const parsedManifestInput: unknown = {
	operations: [
		...teamworkOpenApiV1.operations,
		...teamworkOpenApiV2.operations,
		...teamworkOpenApiV3Operations1.operations,
		...teamworkOpenApiV3Operations2.operations,
	],
	definitions: {
		v1: teamworkOpenApiV1.definitions,
		v2: teamworkOpenApiV2.definitions,
		v3: teamworkOpenApiV3Definitions.definitions,
	},
};
const parsedManifest = ManifestSchema.parse(parsedManifestInput);

export type TeamworkOperationDefinition = z.infer<typeof OperationSchema>;
export type TeamworkOpenApiSchema = z.infer<typeof OpenApiSchemaDocument>;

export const teamworkOperations = parsedManifest.operations;
export const teamworkDefinitions = parsedManifest.definitions;
