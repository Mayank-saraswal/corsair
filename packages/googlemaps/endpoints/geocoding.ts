import type { GoogleMapsEndpoints } from '../index';
import { complete, req } from './helpers';

export const geocode: GoogleMapsEndpoints['geocodingGeocode'] = async (
	ctx,
	input,
) => {
	// Geocoding API v4beta — path style depends on mode
	let path = '/geocode/address';
	const query: Record<string, string | undefined> = {
		languageCode: input.languageCode,
		regionCode: input.regionCode,
	};
	if (input.address) {
		path = `/geocode/address/${encodeURIComponent(input.address)}`;
	} else if (input.latlng) {
		path = `/geocode/location/${encodeURIComponent(input.latlng)}`;
	} else if (input.placeId) {
		path = `/geocode/place/places%2F${encodeURIComponent(input.placeId)}`;
	}
	const response = await req(ctx, path, {
		method: 'GET',
		host: 'geocodeV4',
		query,
	});
	await complete(ctx, 'googlemaps.geocoding.geocode', {
		mode: input.address ? 'address' : input.latlng ? 'latlng' : 'placeId',
	});
	return response;
};

export const addressQuery: GoogleMapsEndpoints['geocodingAddressQuery'] =
	async (ctx, input) => {
		const response = await req(
			ctx,
			`/geocode/address/${encodeURIComponent(input.addressQuery)}`,
			{
				method: 'GET',
				host: 'geocodeV4',
				query: {
					languageCode: input.languageCode,
					regionCode: input.regionCode,
				},
			},
		);
		await complete(ctx, 'googlemaps.geocoding.addressQuery', {
			addressQuery: input.addressQuery,
		});
		return response;
	};

export const reverse: GoogleMapsEndpoints['geocodingReverse'] = async (
	ctx,
	input,
) => {
	const loc = `${input.latitude},${input.longitude}`;
	const response = await req(
		ctx,
		`/geocode/location/${encodeURIComponent(loc)}`,
		{
			method: 'GET',
			host: 'geocodeV4',
			query: {
				languageCode: input.languageCode,
				regionCode: input.regionCode,
			},
		},
	);
	await complete(ctx, 'googlemaps.geocoding.reverse', {
		latitude: input.latitude,
		longitude: input.longitude,
	});
	return response;
};

export const place: GoogleMapsEndpoints['geocodingPlace'] = async (
	ctx,
	input,
) => {
	const placePath = input.placeId.startsWith('places/')
		? input.placeId
		: `places/${input.placeId}`;
	const response = await req(
		ctx,
		`/geocode/place/${encodeURIComponent(placePath)}`,
		{
			method: 'GET',
			host: 'geocodeV4',
			query: {
				languageCode: input.languageCode,
				regionCode: input.regionCode,
			},
		},
	);
	await complete(ctx, 'googlemaps.geocoding.place', {
		placeId: input.placeId,
	});
	return response;
};

export const destinations: GoogleMapsEndpoints['geocodingDestinations'] =
	async (ctx, input) => {
		// Destinations API (places-adjacent destination lookup)
		const response = await req(
			ctx,
			`/geocode/destination/${encodeURIComponent(input.destination)}`,
			{
				method: 'GET',
				host: 'geocodeV4',
				query: {
					languageCode: input.languageCode,
					regionCode: input.regionCode,
				},
			},
		);
		await complete(ctx, 'googlemaps.geocoding.destinations', {
			destination: input.destination,
		});
		return response;
	};

/** @deprecated Prefer geocodingGeocode / addressQuery */
export const addressLegacy: GoogleMapsEndpoints['geocodingAddressLegacy'] =
	async (ctx, input) => {
		const response = await req(ctx, '/geocode/json', {
			method: 'GET',
			host: 'mapsLegacy',
			legacyKeyQuery: true,
			query: {
				address: input.address,
				language: input.language,
				region: input.region,
				components: input.components,
			},
		});
		await complete(ctx, 'googlemaps.geocoding.addressLegacy', {
			address: input.address,
		});
		return response;
	};
