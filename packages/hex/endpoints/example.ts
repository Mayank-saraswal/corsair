import { logEventFromContext } from 'corsair/core';
import type { HexEndpoints } from '..';
import type { HexEndpointOutputs } from './types';
import { makeHexRequest } from '../client';

export const get: HexEndpoints['exampleGet'] = async (ctx, input) => {
	const response = await makeHexRequest<HexEndpointOutputs['exampleGet']>(
		`example/${input.id}`,
		ctx.key,
		{ method: 'GET' },
	);

	await logEventFromContext(ctx, 'hex.example.get', { ...input }, 'completed');
	return response;
};
