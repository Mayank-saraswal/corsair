import { logEventFromContext } from 'corsair/core';
import type { IgnisignEndpoints } from '..';
import type { IgnisignEndpointOutputs } from './types';
import { makeIgnisignRequest } from '../client';

export const get: IgnisignEndpoints['exampleGet'] = async (ctx, input) => {
	const response = await makeIgnisignRequest<IgnisignEndpointOutputs['exampleGet']>(
		`example/${input.id}`,
		ctx.key,
		{ method: 'GET' },
	);

	await logEventFromContext(ctx, 'ignisign.example.get', { ...input }, 'completed');
	return response;
};
