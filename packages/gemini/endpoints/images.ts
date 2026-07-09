import { logEventFromContext } from 'corsair/core';
import type { GeminiEndpoints } from '..';
import { makeGeminiRequest } from '../client';
import type { Candidate } from '../schema/content';
import type { GenerateImageResponse } from './types';

export const generateImage: GeminiEndpoints['generateImage'] = async (
	ctx,
	input,
) => {
	const parts: Array<{
		text?: string;
		inlineData?: { mimeType: string; data: string };
	}> = [
		{ text: input.prompt },
		...(input.referenceImages ?? []).map((image) => ({
			inlineData: { mimeType: image.mimeType, data: image.data },
		})),
	];

	const response = await makeGeminiRequest<{
		candidates?: Candidate[];
		usageMetadata?: GenerateImageResponse['usageMetadata'];
		// Generative Language API requires the /models/ segment for model-scoped methods
	}>(`/models/${input.model}:generateContent`, ctx.key, {
		method: 'POST',
		body: {
			contents: [{ role: 'user', parts }],
			generationConfig: {
				responseModalities: ['IMAGE'],
				...input.generationConfig,
			},
		},
	});

	const images = (response.candidates ?? []).flatMap((candidate) =>
		(candidate.content?.parts ?? [])
			.filter(
				(part): part is { inlineData: { mimeType: string; data: string } } =>
					part.inlineData !== undefined,
			)
			.map((part) => ({
				mimeType: part.inlineData.mimeType,
				contentBase64: part.inlineData.data,
			})),
	);

	await logEventFromContext(
		ctx,
		'gemini.images.generateImage',
		{ ...input },
		'completed',
	);
	return {
		images,
		candidates: response.candidates,
		usageMetadata: response.usageMetadata,
	};
};
