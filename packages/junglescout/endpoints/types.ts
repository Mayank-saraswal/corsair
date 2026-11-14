import { z } from 'zod';

const ExampleGetInputSchema = z.object({
	id: z.string(),
});

export type ExampleGetInput = z.infer<typeof ExampleGetInputSchema>;

const ExampleGetResponseSchema = z.object({
	id: z.string(),
});

export type ExampleGetResponse = z.infer<typeof ExampleGetResponseSchema>;

export type JungleScoutEndpointInputs = {
	exampleGet: ExampleGetInput;
};

export type JungleScoutEndpointOutputs = {
	exampleGet: ExampleGetResponse;
};

export const JungleScoutEndpointInputSchemas = {
	exampleGet: ExampleGetInputSchema,
} as const;

export const JungleScoutEndpointOutputSchemas = {
	exampleGet: ExampleGetResponseSchema,
} as const;
