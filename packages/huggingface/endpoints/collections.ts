import { logEventFromContext } from 'corsair/core';
import type { HuggingFaceRequestOptions } from '../client';
import { makeHuggingFaceRequest } from '../client';
import type { HuggingFaceEndpoints } from '../index';

async function req<T>(
	ctx: { key: string },
	endpoint: string,
	options: HuggingFaceRequestOptions = {},
): Promise<T> {
	return makeHuggingFaceRequest<T>(endpoint, ctx.key || undefined, options);
}

export const create: HuggingFaceEndpoints['collectionsCreate'] = async (
	ctx,
	input,
) => {
	const response = await req(ctx, '/api/collections', {
		method: 'POST',
		body: {
			title: input.title,
			namespace: input.namespace,
			description: input.description,
			private: input.private,
		},
	});
	await logEventFromContext(
		ctx,
		'huggingface.collections.create',
		summarize(input),
		'completed',
	);
	return response;
};

export const list: HuggingFaceEndpoints['collectionsList'] = async (
	ctx,
	input,
) => {
	const response = await req(ctx, '/api/collections', {
		method: 'GET',
		query: { ...input },
	});
	await logEventFromContext(
		ctx,
		'huggingface.collections.list',
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
