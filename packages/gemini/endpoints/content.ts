import { logEventFromContext } from 'corsair/core';
import type { GeminiEndpoints } from '..';
import { makeGeminiRequest } from '../client';
import type {
	CountTokensResponse,
	EmbedContentResponse,
	GenerateContentResponse,
} from './types';

/**
 * Strips a single leading/trailing markdown code fence (e.g. ```html ... ```)
 * and surrounding explanatory prose is left untouched — Gemini sometimes wraps
 * generated code/markup in a fenced block even when asked for raw output.
 */
export function stripMarkdownFences(text: string): string {
	const fenced = text.trim().match(/^```[^\n]*\n([\s\S]*?)\n```$/);
	return fenced?.[1] !== undefined ? fenced[1].trim() : text;
}

export const countTokens: GeminiEndpoints['countTokens'] = async (
	ctx,
	input,
) => {
	const response = await makeGeminiRequest<CountTokensResponse>(
		`/${input.model}:countTokens`,
		ctx.key,
		{
			method: 'POST',
			body: { contents: input.contents },
		},
	);

	await logEventFromContext(
		ctx,
		'gemini.content.countTokens',
		{ ...input },
		'completed',
	);
	return response;
};

export const embedContent: GeminiEndpoints['embedContent'] = async (
	ctx,
	input,
) => {
	const response = await makeGeminiRequest<EmbedContentResponse>(
		`/${input.model}:embedContent`,
		ctx.key,
		{
			method: 'POST',
			body: {
				content: input.content,
				taskType: input.taskType,
				title: input.title,
			},
		},
	);

	await logEventFromContext(
		ctx,
		'gemini.content.embedContent',
		{ ...input },
		'completed',
	);
	return response;
};

export const generateContent: GeminiEndpoints['generateContent'] = async (
	ctx,
	input,
) => {
	const response = await makeGeminiRequest<
		Omit<GenerateContentResponse, 'text'>
	>(`/${input.model}:generateContent`, ctx.key, {
		method: 'POST',
		body: {
			contents: input.contents,
			generationConfig: input.generationConfig,
			safetySettings: input.safetySettings,
			systemInstruction: input.systemInstruction,
		},
	});

	const firstText = response.candidates?.[0]?.content?.parts?.find(
		(part) => typeof part.text === 'string',
	)?.text;

	await logEventFromContext(
		ctx,
		'gemini.content.generateContent',
		{ ...input },
		'completed',
	);
	return {
		...response,
		text: firstText !== undefined ? stripMarkdownFences(firstText) : undefined,
	};
};
