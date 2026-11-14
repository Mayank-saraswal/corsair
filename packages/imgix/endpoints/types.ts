import { z } from 'zod';

const ExampleGetInputSchema = z.object({
	id: z.string(),
});

export type ExampleGetInput = z.infer<typeof ExampleGetInputSchema>;

const ExampleGetResponseSchema = z.object({
	id: z.string(),
});

export type ExampleGetResponse = z.infer<typeof ExampleGetResponseSchema>;

export type ImgixEndpointInputs = {
	exampleGet: ExampleGetInput;
};

export type ImgixEndpointOutputs = {
	exampleGet: ExampleGetResponse;
};

export const ImgixEndpointInputSchemas = {
	exampleGet: ExampleGetInputSchema,
} as const;

export const ImgixEndpointOutputSchemas = {
	exampleGet: ExampleGetResponseSchema,
} as const;
