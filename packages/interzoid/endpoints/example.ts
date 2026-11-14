import { logEventFromContext } from 'corsair/core';
import type { InterzoidEndpoints } from '..';
import type { InterzoidEndpointOutputs } from './types';
import { makeInterzoidRequest } from '../client';

export const get: InterzoidEndpoints['exampleGet'] = async (ctx, input) => {
	const response = await makeInterzoidRequest<InterzoidEndpointOutputs['exampleGet']>(
		`example/${input.id}`,
		ctx.key,
		{ method: 'GET' },
	);

	await logEventFromContext(ctx, 'interzoid.example.get', { ...input }, 'completed');
	return response;
};
