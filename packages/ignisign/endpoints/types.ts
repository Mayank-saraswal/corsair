import { z } from 'zod';

const ExampleGetInputSchema = z.object({
	id: z.string(),
});

export type ExampleGetInput = z.infer<typeof ExampleGetInputSchema>;

const ExampleGetResponseSchema = z.object({
	id: z.string(),
});

export type ExampleGetResponse = z.infer<typeof ExampleGetResponseSchema>;

export type IgnisignEndpointInputs = {
	exampleGet: ExampleGetInput;
};

export type IgnisignEndpointOutputs = {
	exampleGet: ExampleGetResponse;
};

export const IgnisignEndpointInputSchemas = {
	exampleGet: ExampleGetInputSchema,
} as const;

export const IgnisignEndpointOutputSchemas = {
	exampleGet: ExampleGetResponseSchema,
} as const;
