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

export const getAvatar: HuggingFaceEndpoints['usersGetAvatar'] = async (
	ctx,
	input,
) => {
	const response = await req(
		ctx,
		`/api/users/${encodeURIComponent(input.username)}/avatar`,
		{ method: 'GET' },
	);
	await logEventFromContext(
		ctx,
		'huggingface.users.getAvatar',
		summarize(input),
		'completed',
	);
	return response;
};

export const getOverview: HuggingFaceEndpoints['usersGetOverview'] = async (
	ctx,
	input,
) => {
	const response = await req(
		ctx,
		`/api/users/${encodeURIComponent(input.username)}/overview`,
		{ method: 'GET' },
	);
	await logEventFromContext(
		ctx,
		'huggingface.users.getOverview',
		summarize(input),
		'completed',
	);
	return response;
};

export const getSocials: HuggingFaceEndpoints['usersGetSocials'] = async (
	ctx,
	input,
) => {
	const response = await req(
		ctx,
		`/api/users/${encodeURIComponent(input.username)}/socials`,
		{ method: 'GET' },
	);
	await logEventFromContext(
		ctx,
		'huggingface.users.getSocials',
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
