import { logEventFromContext } from 'corsair/core';
import type { DockerHubEndpoints } from '../index';
import { pageQuery, req, summarize } from './helpers';

export const list: DockerHubEndpoints['webhooksList'] = async (ctx, input) => {
	const response = await req(
		ctx,
		`/repositories/${encodeURIComponent(input.namespace)}/${encodeURIComponent(input.name)}/webhook_pipeline/`,
		{ method: 'GET', query: pageQuery(input) },
	);
	await logEventFromContext(
		ctx,
		'dockerhub.webhooks.list',
		summarize(input),
		'completed',
	);
	return response;
};

export const get: DockerHubEndpoints['webhooksGet'] = async (ctx, input) => {
	const response = await req(
		ctx,
		`/repositories/${encodeURIComponent(input.namespace)}/${encodeURIComponent(input.name)}/webhook_pipeline/${encodeURIComponent(String(input.webhookId))}/`,
		{ method: 'GET' },
	);
	await logEventFromContext(
		ctx,
		'dockerhub.webhooks.get',
		summarize(input),
		'completed',
	);
	return response;
};

/**
 * Two-step create: register webhook name, then attach hook URL.
 */
export const create: DockerHubEndpoints['webhooksCreate'] = async (
	ctx,
	input,
) => {
	const base = `/repositories/${encodeURIComponent(input.namespace)}/${encodeURIComponent(input.name)}/webhook_pipeline/`;
	const created = await req<{ id?: string | number; name?: string }>(
		ctx,
		base,
		{
			method: 'POST',
			body: { name: input.webhookName },
		},
	);
	const id = created.id;
	if (id === undefined || id === null) {
		await logEventFromContext(
			ctx,
			'dockerhub.webhooks.create',
			summarize(input),
			'completed',
		);
		return created;
	}
	const withHook = await req(
		ctx,
		`${base}${encodeURIComponent(String(id))}/hooks/`,
		{
			method: 'POST',
			body: { hook_url: input.hookUrl },
		},
	);
	const response = { webhook: created, hook: withHook };
	await logEventFromContext(
		ctx,
		'dockerhub.webhooks.create',
		summarize(input),
		'completed',
	);
	return response;
};

export const deleteWebhook: DockerHubEndpoints['webhooksDelete'] = async (
	ctx,
	input,
) => {
	const response = await req(
		ctx,
		`/repositories/${encodeURIComponent(input.namespace)}/${encodeURIComponent(input.name)}/webhook_pipeline/${encodeURIComponent(String(input.webhookId))}/`,
		{ method: 'DELETE', okOn404: true },
	);
	await logEventFromContext(
		ctx,
		'dockerhub.webhooks.delete',
		summarize(input),
		'completed',
	);
	return response;
};
