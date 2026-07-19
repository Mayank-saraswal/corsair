import { logEventFromContext } from 'corsair/core';
import type { HuggingFaceRequestOptions } from '../client';
import { HF_ENDPOINTS_BASE, makeHuggingFaceRequest } from '../client';
import type { HuggingFaceEndpoints } from '../index';

async function req<T>(
	ctx: { key: string },
	endpoint: string,
	options: HuggingFaceRequestOptions = {},
): Promise<T> {
	return makeHuggingFaceRequest<T>(endpoint, ctx.key || undefined, options);
}

export const list: HuggingFaceEndpoints['endpointsList'] = async (
	ctx,
	input,
) => {
	const response = await req(
		ctx,
		`/v2/endpoint/${encodeURIComponent(input.namespace)}`,
		{
			method: 'GET',
			baseUrl: HF_ENDPOINTS_BASE,
			query: { name: input.name },
		},
	);
	await logEventFromContext(
		ctx,
		'huggingface.endpoints.list',
		summarize(input),
		'completed',
	);
	return response;
};

export const listVendors: HuggingFaceEndpoints['endpointsListVendors'] = async (
	ctx,
	input,
) => {
	const response = await req(ctx, '/v2/provider', {
		method: 'GET',
		baseUrl: HF_ENDPOINTS_BASE,
	});
	await logEventFromContext(
		ctx,
		'huggingface.endpoints.listVendors',
		summarize(input),
		'completed',
	);
	return response;
};

export const deleteNetworkCidr: HuggingFaceEndpoints['endpointsDeleteNetworkCidr'] =
	async (ctx, input) => {
		const response = await req(
			ctx,
			`/v2/endpoint/${encodeURIComponent(input.namespace)}/network-security/cidr/${encodeURIComponent(input.cidr)}`,
			{
				method: 'DELETE',
				baseUrl: HF_ENDPOINTS_BASE,
			},
		);
		await logEventFromContext(
			ctx,
			'huggingface.endpoints.deleteNetworkCidr',
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
