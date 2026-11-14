import { z } from 'zod';
import { TEAMWORK_OPENAPI_MANIFEST } from '../openapi-manifest';

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

// `unknown` is necessary because JSON.parse returns untrusted data; ManifestSchema validates it.
const parsedManifestInput: unknown = JSON.parse(TEAMWORK_OPENAPI_MANIFEST);
const parsedManifest = ManifestSchema.parse(parsedManifestInput);

export type TeamworkOperationDefinition = z.infer<typeof OperationSchema>;
export type TeamworkOpenApiSchema = z.infer<typeof OpenApiSchemaDocument>;

export const teamworkOperations = parsedManifest.operations;
export const teamworkDefinitions = parsedManifest.definitions;
