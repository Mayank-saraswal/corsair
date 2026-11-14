import { logEventFromContext } from 'corsair/core';
import type { JobNimbusEndpoints } from '..';
import type { JobNimbusEndpointOutputs } from './types';
import { makeJobNimbusRequest } from '../client';

export const get: JobNimbusEndpoints['exampleGet'] = async (ctx, input) => {
	const response = await makeJobNimbusRequest<JobNimbusEndpointOutputs['exampleGet']>(
		`example/${input.id}`,
		ctx.key,
		{ method: 'GET' },
	);

	await logEventFromContext(ctx, 'jobnimbus.example.get', { ...input }, 'completed');
	return response;
};
