import { logEventFromContext } from 'corsair/core';
import type { HelpwiseEndpoints } from '..';
import type { HelpwiseEndpointOutputs } from './types';
import { makeHelpwiseRequest } from '../client';

export const get: HelpwiseEndpoints['exampleGet'] = async (ctx, input) => {
	const response = await makeHelpwiseRequest<HelpwiseEndpointOutputs['exampleGet']>(
		`example/${input.id}`,
		ctx.key,
		{ method: 'GET' },
	);

	await logEventFromContext(ctx, 'helpwise.example.get', { ...input }, 'completed');
	return response;
};
