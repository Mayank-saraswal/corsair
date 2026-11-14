import { z } from 'zod';

const ExampleGetInputSchema = z.object({
	id: z.string(),
});

export type ExampleGetInput = z.infer<typeof ExampleGetInputSchema>;

const ExampleGetResponseSchema = z.object({
	id: z.string(),
});

export type ExampleGetResponse = z.infer<typeof ExampleGetResponseSchema>;

export type HexEndpointInputs = {
	exampleGet: ExampleGetInput;
};

export type HexEndpointOutputs = {
	exampleGet: ExampleGetResponse;
};

export const HexEndpointInputSchemas = {
	exampleGet: ExampleGetInputSchema,
} as const;

export const HexEndpointOutputSchemas = {
	exampleGet: ExampleGetResponseSchema,
} as const;
