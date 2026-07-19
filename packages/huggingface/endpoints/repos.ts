import { logEventFromContext } from 'corsair/core';
import type { HuggingFaceRequestOptions } from '../client';
import { encodePath, makeHuggingFaceRequest, splitRepoId } from '../client';
import type { HuggingFaceEndpoints } from '../index';

async function req<T>(
	ctx: { key: string },
	endpoint: string,
	options: HuggingFaceRequestOptions = {},
): Promise<T> {
	return makeHuggingFaceRequest<T>(endpoint, ctx.key || undefined, options);
}

export const create: HuggingFaceEndpoints['reposCreate'] = async (
	ctx,
	input,
) => {
	const { extra, ...rest } = input;
	const response = await req(ctx, '/api/repos/create', {
		method: 'POST',
		body: { ...rest, ...extra },
	});
	await logEventFromContext(
		ctx,
		'huggingface.repos.create',
		summarize(input),
		'completed',
	);
	return response;
};

export const listFiles: HuggingFaceEndpoints['reposListFiles'] = async (
	ctx,
	input,
) => {
	const { namespace, repo } = splitRepoId(input.repoId);
	const p = input.path ? encodePath(input.path) : '';
	const response = await req(
		ctx,
		`/api/${input.repoType}s/${namespace}/${repo}/tree/${encodeURIComponent(input.revision)}/${p}`,
		{
			method: 'GET',
			query: {
				recursive: input.recursive,
				expand: input.expand,
				cursor: input.cursor,
				limit: input.limit,
			},
		},
	);
	await logEventFromContext(
		ctx,
		'huggingface.repos.listFiles',
		summarize(input),
		'completed',
	);
	return response;
};

export const getResolve: HuggingFaceEndpoints['reposGetResolve'] = async (
	ctx,
	input,
) => {
	const { namespace, repo } = splitRepoId(input.repoId);
	const prefix =
		input.repoType === 'model'
			? ''
			: input.repoType === 'dataset'
				? 'datasets/'
				: 'spaces/';
	const headers = input.xetFileInfo
		? { Accept: 'application/vnd.xet-fileinfo+json' }
		: undefined;
	const response = await req(
		ctx,
		`/${prefix}${namespace}/${repo}/resolve/${encodeURIComponent(input.revision)}/${encodePath(input.path)}`,
		{
			method: 'GET',
			headers,
			rawText: true,
		},
	);
	await logEventFromContext(
		ctx,
		'huggingface.repos.getResolve',
		summarize(input),
		'completed',
	);
	return response;
};

export const requestAccess: HuggingFaceEndpoints['reposRequestAccess'] = async (
	ctx,
	input,
) => {
	const { namespace, repo } = splitRepoId(input.repoId);
	const prefix =
		input.repoType === 'model'
			? ''
			: input.repoType === 'dataset'
				? 'datasets/'
				: 'spaces/';
	const response = await req(ctx, `/${prefix}${namespace}/${repo}/ask-access`, {
		method: 'POST',
		body: input.fields ?? {},
	});
	await logEventFromContext(
		ctx,
		'huggingface.repos.requestAccess',
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
