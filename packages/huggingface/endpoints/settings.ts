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

export const updateNotifications: HuggingFaceEndpoints['updateNotificationSettings'] =
	async (ctx, input) => {
		const response = await req(ctx, '/api/settings/notifications', {
			method: 'PATCH',
			body: input.settings,
		});
		await logEventFromContext(
			ctx,
			'huggingface.settings.updateNotifications',
			summarize(input),
			'completed',
		);
		return response;
	};

export const updateWatch: HuggingFaceEndpoints['updateWatchSettings'] = async (
	ctx,
	input,
) => {
	const response = await req(ctx, '/api/settings/watch', {
		method: 'PATCH',
		body: {
			add: input.add,
			remove: input.remove,
		},
	});
	await logEventFromContext(
		ctx,
		'huggingface.settings.updateWatch',
		summarize(input),
		'completed',
	);
	return response;
};

export const getMcp: HuggingFaceEndpoints['getMcpSettings'] = async (
	ctx,
	input,
) => {
	const response = await req(ctx, '/api/settings/mcp', { method: 'GET' });
	await logEventFromContext(
		ctx,
		'huggingface.settings.getMcp',
		summarize(input),
		'completed',
	);
	return response;
};

export const getBillingUsageV2: HuggingFaceEndpoints['getBillingUsageV2'] =
	async (ctx, input) => {
		const response = await req(ctx, '/api/settings/billing/usage-v2', {
			method: 'GET',
			query: { from: input.from, to: input.to },
		});
		await logEventFromContext(
			ctx,
			'huggingface.settings.getBillingUsageV2',
			summarize(input),
			'completed',
		);
		return response;
	};

export const getJobsUsage: HuggingFaceEndpoints['getJobsUsage'] = async (
	ctx,
	input,
) => {
	const response = await req(ctx, '/api/settings/billing/usage/jobs', {
		method: 'GET',
	});
	await logEventFromContext(
		ctx,
		'huggingface.settings.getJobsUsage',
		summarize(input),
		'completed',
	);
	return response;
};

export const getLiveBillingUsage: HuggingFaceEndpoints['getLiveBillingUsage'] =
	async (ctx, input) => {
		const response = await req(ctx, '/api/settings/billing/usage/live', {
			method: 'GET',
			rawText: true,
		});
		await logEventFromContext(
			ctx,
			'huggingface.settings.getLiveBillingUsage',
			summarize(input),
			'completed',
		);
		return response;
	};

export const listWebhooks: HuggingFaceEndpoints['listWebhooks'] = async (
	ctx,
	input,
) => {
	const response = await req(ctx, '/api/settings/webhooks', { method: 'GET' });
	await logEventFromContext(
		ctx,
		'huggingface.settings.listWebhooks',
		summarize(input),
		'completed',
	);
	return response;
};

export const getWebhook: HuggingFaceEndpoints['getWebhook'] = async (
	ctx,
	input,
) => {
	const response = await req(
		ctx,
		`/api/settings/webhooks/${encodeURIComponent(input.webhookId)}`,
		{ method: 'GET' },
	);
	await logEventFromContext(
		ctx,
		'huggingface.settings.getWebhook',
		summarize(input),
		'completed',
	);
	return response;
};

export const createWebhook: HuggingFaceEndpoints['createWebhook'] = async (
	ctx,
	input,
) => {
	const response = await req(ctx, '/api/settings/webhooks', {
		method: 'POST',
		body: {
			url: input.url,
			watched: input.watched,
			domains: input.domains,
			secret: input.secret,
			...input.extra,
		},
	});
	await logEventFromContext(
		ctx,
		'huggingface.settings.createWebhook',
		summarize(input),
		'completed',
	);
	return response;
};

export const updateWebhook: HuggingFaceEndpoints['updateWebhook'] = async (
	ctx,
	input,
) => {
	const { webhookId, extra, ...rest } = input;
	const response = await req(
		ctx,
		`/api/settings/webhooks/${encodeURIComponent(webhookId)}`,
		{
			method: 'POST',
			body: { ...rest, ...extra },
		},
	);
	await logEventFromContext(
		ctx,
		'huggingface.settings.updateWebhook',
		summarize(input),
		'completed',
	);
	return response;
};

export const deleteWebhook: HuggingFaceEndpoints['deleteWebhook'] = async (
	ctx,
	input,
) => {
	const response = await req(
		ctx,
		`/api/settings/webhooks/${encodeURIComponent(input.webhookId)}`,
		{ method: 'DELETE' },
	);
	await logEventFromContext(
		ctx,
		'huggingface.settings.deleteWebhook',
		summarize(input),
		'completed',
	);
	return response;
};

export const updateWebhookStatus: HuggingFaceEndpoints['updateWebhookStatus'] =
	async (ctx, input) => {
		const response = await req(
			ctx,
			`/api/settings/webhooks/${encodeURIComponent(input.webhookId)}/${input.action}`,
			{ method: 'POST', body: {} },
		);
		await logEventFromContext(
			ctx,
			'huggingface.settings.updateWebhookStatus',
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
