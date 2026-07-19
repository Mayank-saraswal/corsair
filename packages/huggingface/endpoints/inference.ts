import { logEventFromContext } from 'corsair/core';
import type { HuggingFaceRequestOptions } from '../client';
import { HF_INFERENCE_BASE, makeHuggingFaceRequest } from '../client';
import type { HuggingFaceEndpoints } from '../index';

async function req<T>(
	ctx: { key: string },
	endpoint: string,
	options: HuggingFaceRequestOptions = {},
): Promise<T> {
	return makeHuggingFaceRequest<T>(endpoint, ctx.key || undefined, options);
}

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

function summarize(input: unknown): Record<string, unknown> {
	if (!input || typeof input !== 'object') return {};
	const out: Record<string, unknown> = {};
	for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
		if (
			k === 'value' ||
			k === 'secret' ||
			k === 'messages' ||
			k === 'operations' ||
			k === 'files'
		) {
			out[k] = '[redacted]';
		} else {
			out[k] = v;
		}
	}
	return out;
}
