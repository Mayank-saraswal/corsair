import type { GoogleMapsEndpoints } from '../index';
import { authMode, complete, req } from './helpers';

function waypointBody(point: {
	address?: string;
	placeId?: string;
	latitude?: number;
	longitude?: number;
}) {
	if (point.placeId) {
		return { placeId: point.placeId };
	}
	if (point.latitude !== undefined && point.longitude !== undefined) {
		return {
			location: {
				latLng: {
					latitude: point.latitude,
					longitude: point.longitude,
				},
			},
		};
	}
	if (point.address) {
		return { address: point.address };
	}
	throw new Error('Waypoint requires address, placeId, or lat/lng');
}

function originFromComputeInput(input: {
	originAddress?: string;
	originPlaceId?: string;
	originLatitude?: number;
	originLongitude?: number;
}) {
	return waypointBody({
		address: input.originAddress,
		placeId: input.originPlaceId,
		latitude: input.originLatitude,
		longitude: input.originLongitude,
	});
}

function destinationFromComputeInput(input: {
	destinationAddress?: string;
	destinationPlaceId?: string;
	destinationLatitude?: number;
	destinationLongitude?: number;
}) {
	return waypointBody({
		address: input.destinationAddress,
		placeId: input.destinationPlaceId,
		latitude: input.destinationLatitude,
		longitude: input.destinationLongitude,
	});
}

export const computeRoutes: GoogleMapsEndpoints['routesComputeRoutes'] = async (
	ctx,
	input,
) => {
	const fieldMask =
		input.fieldMask ??
		'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.legs,routes.description,routes.viewport';
	const body: Record<string, unknown> = {
		origin: originFromComputeInput(input),
		destination: destinationFromComputeInput(input),
		travelMode: input.travelMode ?? 'DRIVE',
		routingPreference: input.routingPreference,
		computeAlternativeRoutes: input.computeAlternativeRoutes,
		languageCode: input.languageCode,
		units: input.units,
	};
	if (input.intermediates?.length) {
		body.intermediates = input.intermediates.map(waypointBody);
	}
	const response = await req(ctx, '/directions/v2:computeRoutes', {
		method: 'POST',
		host: 'routes',
		headers: { 'X-Goog-FieldMask': fieldMask },
		body,
	});
	await complete(ctx, 'googlemaps.routes.computeRoutes', {
		travelMode: input.travelMode ?? 'DRIVE',
	});
	return response;
};

export const computeRouteMatrix: GoogleMapsEndpoints['routesComputeRouteMatrix'] =
	async (ctx, input) => {
		const elements = input.origins.length * input.destinations.length;
		if (elements > 625) {
			throw new Error(
				`Route matrix has ${elements} elements; max is 625 (e.g. 25×25). Chunk origins/destinations.`,
			);
		}
		const fieldMask =
			input.fieldMask ??
			'originIndex,destinationIndex,status,condition,distanceMeters,duration';
		const body = {
			origins: input.origins.map((o) => ({
				waypoint: waypointBody(o),
			})),
			destinations: input.destinations.map((d) => ({
				waypoint: waypointBody(d),
			})),
			travelMode: input.travelMode ?? 'DRIVE',
			routingPreference: input.routingPreference,
			languageCode: input.languageCode,
			units: input.units,
		};
		const response = await req(ctx, '/distanceMatrix/v2:computeRouteMatrix', {
			method: 'POST',
			host: 'routes',
			headers: { 'X-Goog-FieldMask': fieldMask },
			body,
		});
		await complete(ctx, 'googlemaps.routes.computeRouteMatrix', {
			origins: input.origins.length,
			destinations: input.destinations.length,
			elements,
		});
		return response;
	};

/** @deprecated Prefer routesComputeRoutes */
export const getDirections: GoogleMapsEndpoints['directionsGet'] = async (
	ctx,
	input,
) => {
	const preferModern = input.preferModern !== false;
	// Prefer modern Routes when OAuth is available; otherwise legacy Directions API
	if (preferModern && authMode(ctx) === 'oauth_2') {
		const response = await req(ctx, '/directions/v2:computeRoutes', {
			method: 'POST',
			host: 'routes',
			headers: {
				'X-Goog-FieldMask':
					'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.legs',
			},
			body: {
				origin: { address: input.origin },
				destination: { address: input.destination },
				travelMode: (input.mode ?? 'driving').toUpperCase(),
				computeAlternativeRoutes: input.alternatives,
				languageCode: input.language,
				units:
					input.units === 'imperial'
						? 'IMPERIAL'
						: input.units === 'metric'
							? 'METRIC'
							: undefined,
				intermediates: input.waypoints
					? input.waypoints
							.split('|')
							.filter(Boolean)
							.map((address) => ({ address }))
					: undefined,
			},
		});
		await complete(ctx, 'googlemaps.directions.get', {
			mode: 'modern',
			origin: input.origin,
			destination: input.destination,
		});
		return response;
	}

	const response = await req(ctx, '/directions/json', {
		method: 'GET',
		host: 'mapsLegacy',
		legacyKeyQuery: true,
		query: {
			origin: input.origin,
			destination: input.destination,
			mode: input.mode,
			waypoints: input.waypoints,
			alternatives: input.alternatives,
			language: input.language,
			units: input.units,
		},
	});
	await complete(ctx, 'googlemaps.directions.get', {
		mode: 'legacy',
		origin: input.origin,
		destination: input.destination,
	});
	return response;
};

/** @deprecated Prefer routesComputeRouteMatrix */
export const distanceMatrixLegacy: GoogleMapsEndpoints['distanceMatrixLegacy'] =
	async (ctx, input) => {
		const response = await req(ctx, '/distancematrix/json', {
			method: 'GET',
			host: 'mapsLegacy',
			legacyKeyQuery: true,
			query: {
				origins: input.origins,
				destinations: input.destinations,
				mode: input.mode,
				language: input.language,
				units: input.units,
				departure_time: input.departureTime,
				arrival_time: input.arrivalTime,
			},
		});
		await complete(ctx, 'googlemaps.distanceMatrix.legacy', {
			origins: input.origins,
			destinations: input.destinations,
		});
		return response;
	};
