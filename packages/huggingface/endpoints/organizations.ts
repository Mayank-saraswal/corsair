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

export const getAvatar: HuggingFaceEndpoints['organizationsGetAvatar'] = async (
	ctx,
	input,
) => {
	const response = await req(
		ctx,
		`/api/organizations/${encodeURIComponent(input.name)}/avatar`,
		{ method: 'GET' },
	);
	await logEventFromContext(
		ctx,
		'huggingface.organizations.getAvatar',
		summarize(input),
		'completed',
	);
	return response;
};

export const getMembers: HuggingFaceEndpoints['organizationsGetMembers'] =
	async (ctx, input) => {
		const response = await req(
			ctx,
			`/api/organizations/${encodeURIComponent(input.name)}/members`,
			{
				method: 'GET',
				query: { search: input.search, limit: input.limit, page: input.page },
			},
		);
		await logEventFromContext(
			ctx,
			'huggingface.organizations.getMembers',
			summarize(input),
			'completed',
		);
		return response;
	};

export const getSocials: HuggingFaceEndpoints['organizationsGetSocials'] =
	async (ctx, input) => {
		const response = await req(
			ctx,
			`/api/organizations/${encodeURIComponent(input.name)}/socials`,
			{ method: 'GET' },
		);
		await logEventFromContext(
			ctx,
			'huggingface.organizations.getSocials',
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
