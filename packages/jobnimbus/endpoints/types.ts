import { z } from 'zod';

const ExampleGetInputSchema = z.object({
	id: z.string(),
});

export type ExampleGetInput = z.infer<typeof ExampleGetInputSchema>;

const ExampleGetResponseSchema = z.object({
	id: z.string(),
});

export type ExampleGetResponse = z.infer<typeof ExampleGetResponseSchema>;

export type JobNimbusEndpointInputs = {
	exampleGet: ExampleGetInput;
};

export type JobNimbusEndpointOutputs = {
	exampleGet: ExampleGetResponse;
};

export const JobNimbusEndpointInputSchemas = {
	exampleGet: ExampleGetInputSchema,
} as const;

export const JobNimbusEndpointOutputSchemas = {
	exampleGet: ExampleGetResponseSchema,
} as const;
