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

export const getDaily: HuggingFaceEndpoints['papersGetDaily'] = async (
	ctx,
	input,
) => {
	const response = await req(ctx, '/api/daily_papers', {
		method: 'GET',
		query: { date: input.date },
	});
	await logEventFromContext(
		ctx,
		'huggingface.papers.getDaily',
		summarize(input),
		'completed',
	);
	return response;
};

export const search: HuggingFaceEndpoints['papersSearch'] = async (
	ctx,
	input,
) => {
	const response = await req(ctx, '/api/papers/search', {
		method: 'GET',
		query: { q: input.q, limit: input.limit },
	});
	await logEventFromContext(
		ctx,
		'huggingface.papers.search',
		summarize(input),
		'completed',
	);
	return response;
};

export const createIndex: HuggingFaceEndpoints['papersCreateIndex'] = async (
	ctx,
	input,
) => {
	const response = await req(ctx, '/api/papers/index', {
		method: 'POST',
		body: { id: input.paperId },
	});
	await logEventFromContext(
		ctx,
		'huggingface.papers.createIndex',
		summarize(input),
		'completed',
	);
	return response;
};

export const claimAuthorship: HuggingFaceEndpoints['papersClaimAuthorship'] =
	async (ctx, input) => {
		const response = await req(ctx, '/api/settings/papers/claim', {
			method: 'POST',
			body: { paperId: input.paperId, ...input.extra },
		});
		await logEventFromContext(
			ctx,
			'huggingface.papers.claimAuthorship',
			summarize(input),
			'completed',
		);
		return response;
	};

export const createComment: HuggingFaceEndpoints['papersCreateComment'] =
	async (ctx, input) => {
		const response = await req(
			ctx,
			`/api/papers/${encodeURIComponent(input.paperId)}/comment`,
			{
				method: 'POST',
				body: { comment: input.comment },
			},
		);
		await logEventFromContext(
			ctx,
			'huggingface.papers.createComment',
			summarize(input),
			'completed',
		);
		return response;
	};

export const createCommentReply: HuggingFaceEndpoints['papersCreateCommentReply'] =
	async (ctx, input) => {
		const response = await req(
			ctx,
			`/api/papers/${encodeURIComponent(input.paperId)}/comment/${encodeURIComponent(input.commentId)}/reply`,
			{
				method: 'POST',
				body: { comment: input.comment },
			},
		);
		await logEventFromContext(
			ctx,
			'huggingface.papers.createCommentReply',
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
