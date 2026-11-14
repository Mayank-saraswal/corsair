import { logEventFromContext } from 'corsair/core';
import type { JungleScoutEndpoints } from '..';
import type { JungleScoutEndpointOutputs } from './types';
import { makeJungleScoutRequest } from '../client';

export const get: JungleScoutEndpoints['exampleGet'] = async (ctx, input) => {
	const response = await makeJungleScoutRequest<JungleScoutEndpointOutputs['exampleGet']>(
		`example/${input.id}`,
		ctx.key,
		{ method: 'GET' },
	);

	await logEventFromContext(ctx, 'junglescout.example.get', { ...input }, 'completed');
	return response;
};
