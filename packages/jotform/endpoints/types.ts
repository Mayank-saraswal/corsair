import { z } from 'zod';

const ExampleGetInputSchema = z.object({
	id: z.string(),
});

export type ExampleGetInput = z.infer<typeof ExampleGetInputSchema>;

const ExampleGetResponseSchema = z.object({
	id: z.string(),
});

export type ExampleGetResponse = z.infer<typeof ExampleGetResponseSchema>;

export type JotformEndpointInputs = {
	exampleGet: ExampleGetInput;
};

export type JotformEndpointOutputs = {
	exampleGet: ExampleGetResponse;
};

export const JotformEndpointInputSchemas = {
	exampleGet: ExampleGetInputSchema,
} as const;

export const JotformEndpointOutputSchemas = {
	exampleGet: ExampleGetResponseSchema,
} as const;
