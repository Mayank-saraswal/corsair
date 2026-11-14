import { z } from 'zod';

const ExampleGetInputSchema = z.object({
	id: z.string(),
});

export type ExampleGetInput = z.infer<typeof ExampleGetInputSchema>;

const ExampleGetResponseSchema = z.object({
	id: z.string(),
});

export type ExampleGetResponse = z.infer<typeof ExampleGetResponseSchema>;

export type HelpwiseEndpointInputs = {
	exampleGet: ExampleGetInput;
};

export type HelpwiseEndpointOutputs = {
	exampleGet: ExampleGetResponse;
};

export const HelpwiseEndpointInputSchemas = {
	exampleGet: ExampleGetInputSchema,
} as const;

export const HelpwiseEndpointOutputSchemas = {
	exampleGet: ExampleGetResponseSchema,
} as const;
