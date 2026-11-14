import { logEventFromContext } from 'corsair/core';
import type { ImgixEndpoints } from '..';
import type { ImgixEndpointOutputs } from './types';
import { makeImgixRequest } from '../client';

export const get: ImgixEndpoints['exampleGet'] = async (ctx, input) => {
	const response = await makeImgixRequest<ImgixEndpointOutputs['exampleGet']>(
		`example/${input.id}`,
		ctx.key,
		{ method: 'GET' },
	);

	await logEventFromContext(ctx, 'imgix.example.get', { ...input }, 'completed');
	return response;
};
