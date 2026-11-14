import { logEventFromContext } from 'corsair/core';
import type { JotformEndpoints } from '..';
import type { JotformEndpointOutputs } from './types';
import { makeJotformRequest } from '../client';

export const get: JotformEndpoints['exampleGet'] = async (ctx, input) => {
	const response = await makeJotformRequest<JotformEndpointOutputs['exampleGet']>(
		`example/${input.id}`,
		ctx.key,
		{ method: 'GET' },
	);

	await logEventFromContext(ctx, 'jotform.example.get', { ...input }, 'completed');
	return response;
};
