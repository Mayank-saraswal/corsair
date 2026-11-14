import { logEventFromContext } from 'corsair/core';
import type { LaunchDarklyEndpoints } from '..';
import type { LaunchDarklyEndpointOutputs } from './types';
import { makeLaunchDarklyRequest } from '../client';

export const get: LaunchDarklyEndpoints['exampleGet'] = async (ctx, input) => {
	const response = await makeLaunchDarklyRequest<LaunchDarklyEndpointOutputs['exampleGet']>(
		`example/${input.id}`,
		ctx.key,
		{ method: 'GET' },
	);

	await logEventFromContext(ctx, 'launchdarkly.example.get', { ...input }, 'completed');
	return response;
};
