import { logEventFromContext } from 'corsair/core';
import { HF_INFERENCE_BASE } from '../client';
import type { HuggingFaceEndpoints } from '../index';
import { req, summarize } from './helpers';

export const chatCompletion: HuggingFaceEndpoints['inferenceChatCompletion'] =
	async (ctx, input) => {
		const { extra, maxTokens, ...rest } = input;
		const response = await req(ctx, '/v1/chat/completions', {
			method: 'POST',
			baseUrl: HF_INFERENCE_BASE,
			body: {
				...rest,
				max_tokens: maxTokens,
				...extra,
			},
		});
		await logEventFromContext(
			ctx,
			'huggingface.inference.chatCompletion',
			summarize(input),
			'completed',
		);
		return response;
	};

export const embeddings: HuggingFaceEndpoints['inferenceEmbeddings'] = async (
	ctx,
	input,
) => {
	const { extra, ...rest } = input;
	const response = await req(ctx, '/v1/embeddings', {
		method: 'POST',
		baseUrl: HF_INFERENCE_BASE,
		body: { ...rest, ...extra },
	});
	await logEventFromContext(
		ctx,
		'huggingface.inference.embeddings',
		summarize(input),
		'completed',
	);
	return response;
};
