import type { GoogleMapsEndpoints } from '../index';
import {
	complete,
	PLACE_DETAILS_FIELD_MASK,
	PLACES_LIST_FIELD_MASK,
	req,
	reqBinary,
} from './helpers';

export const textSearch: GoogleMapsEndpoints['placesTextSearch'] = async (
	ctx,
	input,
) => {
	const {
		fieldMask,
		textQuery,
		maxResultCount,
		languageCode,
		regionCode,
		includedType,
		openNow,
	} = input;
	const response = await req(ctx, '/places:searchText', {
		method: 'POST',
		host: 'places',
		headers: {
			'X-Goog-FieldMask': fieldMask ?? PLACES_LIST_FIELD_MASK,
		},
		body: {
			textQuery,
			maxResultCount,
			languageCode,
			regionCode,
			includedType,
			openNow,
		},
	});
	await complete(ctx, 'googlemaps.places.textSearch', {
		textQuery,
		maxResultCount,
	});
	return response;
};

export const nearbySearch: GoogleMapsEndpoints['placesNearbySearch'] = async (
	ctx,
	input,
) => {
	const {
		latitude,
		longitude,
		radiusMeters,
		includedTypes,
		excludedTypes,
		maxResultCount,
		languageCode,
		rankPreference,
		fieldMask,
	} = input;
	const response = await req(ctx, '/places:searchNearby', {
		method: 'POST',
		host: 'places',
		headers: {
			'X-Goog-FieldMask': fieldMask ?? PLACES_LIST_FIELD_MASK,
		},
		body: {
			locationRestriction: {
				circle: {
					center: { latitude, longitude },
					radius: radiusMeters,
				},
			},
			includedTypes,
			excludedTypes,
			maxResultCount,
			languageCode,
			rankPreference,
		},
	});
	await complete(ctx, 'googlemaps.places.nearbySearch', {
		latitude,
		longitude,
		radiusMeters,
	});
	return response;
};

export const autocomplete: GoogleMapsEndpoints['placesAutocomplete'] = async (
	ctx,
	input,
) => {
	const body: Record<string, unknown> = {
		input: input.input,
		languageCode: input.languageCode,
		regionCode: input.regionCode,
		includedPrimaryTypes: input.includedPrimaryTypes,
		sessionToken: input.sessionToken,
		includeQueryPredictions: input.includeQueryPredictions,
	};
	if (
		input.latitude !== undefined &&
		input.longitude !== undefined &&
		input.radiusMeters !== undefined
	) {
		body.locationBias = {
			circle: {
				center: {
					latitude: input.latitude,
					longitude: input.longitude,
				},
				radius: input.radiusMeters,
			},
		};
	}
	const response = await req(ctx, '/places:autocomplete', {
		method: 'POST',
		host: 'places',
		body,
	});
	await complete(ctx, 'googlemaps.places.autocomplete', {
		input: input.input,
	});
	return response;
};

export const get: GoogleMapsEndpoints['placesGet'] = async (ctx, input) => {
	const placeName = input.placeId.startsWith('places/')
		? input.placeId
		: `places/${input.placeId}`;
	const response = await req(ctx, `/${placeName}`, {
		method: 'GET',
		host: 'places',
		headers: {
			'X-Goog-FieldMask': input.fieldMask ?? PLACE_DETAILS_FIELD_MASK,
		},
		query: {
			languageCode: input.languageCode,
			regionCode: input.regionCode,
		},
	});
	await complete(ctx, 'googlemaps.places.get', { placeId: input.placeId });
	return response;
};

export const getPhoto: GoogleMapsEndpoints['placesGetPhoto'] = async (
	ctx,
	input,
) => {
	const name = input.name.startsWith('places/') ? input.name : input.name;
	// Prefer media binary fetch; skipHttpRedirect returns JSON with photoUri
	if (input.skipHttpRedirect) {
		const response = await req(ctx, `/${name}/media`, {
			method: 'GET',
			host: 'places',
			query: {
				maxWidthPx: input.maxWidthPx,
				maxHeightPx: input.maxHeightPx,
				skipHttpRedirect: true,
			},
		});
		await complete(ctx, 'googlemaps.places.getPhoto', {
			name: input.name,
			mode: 'uri',
		});
		return response;
	}
	const binary = await reqBinary(ctx, `/${name}/media`, {
		host: 'places',
		query: {
			maxWidthPx: input.maxWidthPx ?? 800,
			maxHeightPx: input.maxHeightPx,
		},
	});
	await complete(ctx, 'googlemaps.places.getPhoto', {
		name: input.name,
		size: binary.size,
	});
	return binary;
};
