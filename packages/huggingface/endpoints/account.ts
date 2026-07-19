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

export const getWhoami: HuggingFaceEndpoints['getWhoami'] = async (
	ctx,
	input,
) => {
	const response = await req(ctx, '/api/whoami-v2', { method: 'GET' });
	await logEventFromContext(
		ctx,
		'huggingface.account.getWhoami',
		summarize(input),
		'completed',
	);
	return response;
};

export const listNotifications: HuggingFaceEndpoints['listNotifications'] =
	async (ctx, input) => {
		const { read, type, page } = input;
		const response = await req(ctx, '/api/notifications', {
			method: 'GET',
			query: { read, type, page },
		});
		await logEventFromContext(
			ctx,
			'huggingface.account.listNotifications',
			summarize(input),
			'completed',
		);
		return response;
	};

export const deleteNotifications: HuggingFaceEndpoints['deleteNotifications'] =
	async (ctx, input) => {
		const response = await req(ctx, '/api/notifications', {
			method: 'DELETE',
			body: {
				discussion_ids: input.discussionIds,
				applyToAll: input.applyToAll,
				...input.filter,
			},
		});
		await logEventFromContext(
			ctx,
			'huggingface.account.deleteNotifications',
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
