import type { GoogleMapsEndpoints } from '../index';
import { complete } from './helpers';

/**
 * Maps Embed API — builds a public embed URL + iframe HTML.
 * API-key only; does not call a remote JSON API.
 */
export const build: GoogleMapsEndpoints['mapsEmbed'] = async (ctx, input) => {
	const params = new URLSearchParams();
	params.set('key', ctx.key);
	if (input.language) params.set('language', input.language);
	if (input.region) params.set('region', input.region);
	if (input.maptype) params.set('maptype', input.maptype);
	if (input.zoom !== undefined) params.set('zoom', String(input.zoom));

	let path = 'place';
	switch (input.mode) {
		case 'place':
			path = 'place';
			if (input.q) params.set('q', input.q);
			break;
		case 'view':
			path = 'view';
			if (input.center) params.set('center', input.center);
			break;
		case 'directions':
			path = 'directions';
			if (input.origin) params.set('origin', input.origin);
			if (input.destination) params.set('destination', input.destination);
			break;
		case 'streetview':
			path = 'streetview';
			if (input.center) params.set('location', input.center);
			if (input.heading !== undefined)
				params.set('heading', String(input.heading));
			if (input.pitch !== undefined) params.set('pitch', String(input.pitch));
			if (input.fov !== undefined) params.set('fov', String(input.fov));
			break;
		case 'search':
			path = 'search';
			if (input.q) params.set('q', input.q);
			break;
	}

	const url = `https://www.google.com/maps/embed/v1/${path}?${params.toString()}`;
	const iframeHtml = `<iframe width="600" height="450" style="border:0" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="${url}"></iframe>`;

	const response = { url, iframeHtml };
	await complete(ctx, 'googlemaps.maps.embed', { mode: input.mode });
	return response;
};
