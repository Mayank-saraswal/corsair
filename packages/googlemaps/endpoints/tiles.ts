import type { GoogleMapsEndpoints } from '../index';
import { complete, req, reqBinary } from './helpers';

export const createSession: GoogleMapsEndpoints['tilesCreateSession'] = async (
	ctx,
	input,
) => {
	const response = await req(ctx, '/createSession', {
		method: 'POST',
		host: 'tiles',
		legacyKeyQuery: true,
		body: {
			mapType: input.mapType,
			language: input.language,
			region: input.region,
			imageFormat: input.imageFormat,
			scale: input.scale,
			highDpi: input.highDpi,
			layerTypes: input.layerTypes,
			styles: input.styles,
			overlay: input.overlay,
		},
	});
	await complete(ctx, 'googlemaps.tiles.createSession', {
		mapType: input.mapType,
	});
	return response;
};

export const get2d: GoogleMapsEndpoints['tilesGet2d'] = async (ctx, input) => {
	const path = `/2dtiles/${input.z}/${input.x}/${input.y}`;
	const binary = await reqBinary(ctx, path, {
		host: 'tiles',
		legacyKeyQuery: true,
		query: {
			session: input.session,
			orientation: input.orientation,
		},
	});
	await complete(ctx, 'googlemaps.tiles.get2d', {
		z: input.z,
		x: input.x,
		y: input.y,
		size: binary.size,
	});
	return binary;
};

export const get3dRoot: GoogleMapsEndpoints['tilesGet3dRoot'] = async (
	ctx,
	_input,
) => {
	const response = await req(ctx, '/3dtiles/root.json', {
		method: 'GET',
		host: 'tiles',
		legacyKeyQuery: true,
	});
	await complete(ctx, 'googlemaps.tiles.get3dRoot', {});
	return response;
};
