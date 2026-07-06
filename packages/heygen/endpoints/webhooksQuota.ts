import { logEventFromContext } from 'corsair/core';
import { makeHeygenRequest } from '../client';
import type { HeygenEndpoints } from '../index';
import type { HeygenEndpointOutputs } from './types';

// HeyGen's v3 docs mention a `/v3/webhooks/endpoints/*` surface with full CRUD, secret
// rotation, and an event log, but its request/response shapes aren't documented yet, so the
// webhook endpoint CRUD and remaining-quota operations below stay on their confirmed v1/v2
// paths per developers.heygen.com/endpoint-version-comparison.

export const addEndpoint: HeygenEndpoints['webhooksQuotaAddEndpoint'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['webhooksQuotaAddEndpoint']
	>('/v1/webhook/endpoint.add', ctx.key, { method: 'POST', body: input });

	await logEventFromContext(
		ctx,
		'heygen.webhooksQuota.addEndpoint',
		{ itemCount: input.events.length },
		'completed',
	);
	return result;
};

export const listEndpoints: HeygenEndpoints['webhooksQuotaListEndpoints'] =
	async (ctx) => {
		const result = await makeHeygenRequest<
			HeygenEndpointOutputs['webhooksQuotaListEndpoints']
		>('/v1/webhook/endpoint.list', ctx.key, { method: 'GET' });

		await logEventFromContext(
			ctx,
			'heygen.webhooksQuota.listEndpoints',
			{},
			'completed',
		);
		return result;
	};

export const listEventTypes: HeygenEndpoints['webhooksQuotaListEventTypes'] =
	async (ctx) => {
		const result = await makeHeygenRequest<
			HeygenEndpointOutputs['webhooksQuotaListEventTypes']
		>('/v1/webhook/webhook.list', ctx.key, { method: 'GET' });

		await logEventFromContext(
			ctx,
			'heygen.webhooksQuota.listEventTypes',
			{},
			'completed',
		);
		return result;
	};

// [B] Path inferred as `PATCH /v1/webhook/endpoint.update`; see endpoints/types.ts.
export const updateEndpoint: HeygenEndpoints['webhooksQuotaUpdateEndpoint'] =
	async (ctx, input) => {
		const result = await makeHeygenRequest<
			HeygenEndpointOutputs['webhooksQuotaUpdateEndpoint']
		>('/v1/webhook/endpoint.update', ctx.key, { method: 'PATCH', body: input });

		await logEventFromContext(
			ctx,
			'heygen.webhooksQuota.updateEndpoint',
			{ endpointId: input.endpoint_id },
			'completed',
		);
		return result;
	};

export const deleteEndpoint: HeygenEndpoints['webhooksQuotaDeleteEndpoint'] =
	async (ctx, input) => {
		const result = await makeHeygenRequest<
			HeygenEndpointOutputs['webhooksQuotaDeleteEndpoint']
		>('/v1/webhook/endpoint.delete', ctx.key, {
			method: 'DELETE',
			query: { endpoint_id: input.endpoint_id },
		});

		await logEventFromContext(
			ctx,
			'heygen.webhooksQuota.deleteEndpoint',
			{ endpointId: input.endpoint_id },
			'completed',
		);
		return result;
	};

// Migrated to HeyGen v3 API endpoint per developers.heygen.com
export const getCurrentUser: HeygenEndpoints['webhooksQuotaGetCurrentUser'] =
	async (ctx) => {
		const result = await makeHeygenRequest<
			HeygenEndpointOutputs['webhooksQuotaGetCurrentUser']
		>('/v3/users/me', ctx.key, { method: 'GET' });

		await logEventFromContext(
			ctx,
			'heygen.webhooksQuota.getCurrentUser',
			{},
			'completed',
		);
		return result;
	};

export const remainingQuota: HeygenEndpoints['webhooksQuotaRemainingQuota'] =
	async (ctx) => {
		const result = await makeHeygenRequest<
			HeygenEndpointOutputs['webhooksQuotaRemainingQuota']
		>('/v2/user/remaining_quota', ctx.key, { method: 'GET' });

		await logEventFromContext(
			ctx,
			'heygen.webhooksQuota.remainingQuota',
			{},
			'completed',
		);
		return result;
	};
