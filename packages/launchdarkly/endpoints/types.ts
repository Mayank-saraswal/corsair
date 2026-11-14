import { z } from 'zod';

const ExampleGetInputSchema = z.object({
	id: z.string(),
});

export type ExampleGetInput = z.infer<typeof ExampleGetInputSchema>;

const ExampleGetResponseSchema = z.object({
	id: z.string(),
});

export type ExampleGetResponse = z.infer<typeof ExampleGetResponseSchema>;

export type LaunchDarklyEndpointInputs = {
	exampleGet: ExampleGetInput;
};

export type LaunchDarklyEndpointOutputs = {
	exampleGet: ExampleGetResponse;
};

export const LaunchDarklyEndpointInputSchemas = {
	exampleGet: ExampleGetInputSchema,
} as const;

export const LaunchDarklyEndpointOutputSchemas = {
	exampleGet: ExampleGetResponseSchema,
} as const;
