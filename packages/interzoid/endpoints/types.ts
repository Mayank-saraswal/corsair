import { z } from 'zod';

const ExampleGetInputSchema = z.object({
	id: z.string(),
});

export type ExampleGetInput = z.infer<typeof ExampleGetInputSchema>;

const ExampleGetResponseSchema = z.object({
	id: z.string(),
});

export type ExampleGetResponse = z.infer<typeof ExampleGetResponseSchema>;

export type InterzoidEndpointInputs = {
	exampleGet: ExampleGetInput;
};

export type InterzoidEndpointOutputs = {
	exampleGet: ExampleGetResponse;
};

export const InterzoidEndpointInputSchemas = {
	exampleGet: ExampleGetInputSchema,
} as const;

export const InterzoidEndpointOutputSchemas = {
	exampleGet: ExampleGetResponseSchema,
} as const;
