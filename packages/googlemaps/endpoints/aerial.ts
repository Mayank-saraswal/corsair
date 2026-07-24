import type { GoogleMapsEndpoints } from '../index';
import { complete, req } from './helpers';

export const renderVideo: GoogleMapsEndpoints['aerialRenderVideo'] = async (
	ctx,
	input,
) => {
	const response = await req(ctx, '/videos:renderVideo', {
		method: 'POST',
		host: 'aerial',
		body: {
			address: input.address,
		},
	});
	await complete(ctx, 'googlemaps.aerial.renderVideo', {
		address: input.address,
	});
	return response;
};

export const lookupVideo: GoogleMapsEndpoints['aerialLookupVideo'] = async (
	ctx,
	input,
) => {
	if (input.videoId) {
		const response = await req(
			ctx,
			`/videos/${encodeURIComponent(input.videoId)}`,
			{
				method: 'GET',
				host: 'aerial',
			},
		);
		await complete(ctx, 'googlemaps.aerial.lookupVideo', {
			videoId: input.videoId,
		});
		return response;
	}
	const response = await req(ctx, '/videos:lookupVideo', {
		method: 'GET',
		host: 'aerial',
		query: {
			address: input.address,
		},
	});
	await complete(ctx, 'googlemaps.aerial.lookupVideo', {
		address: input.address,
	});
	return response;
};
