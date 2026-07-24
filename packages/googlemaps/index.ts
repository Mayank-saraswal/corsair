import type {
	AuthTypes,
	BindEndpoints,
	CorsairEndpoint,
	CorsairErrorHandler,
	CorsairPlugin,
	CorsairPluginContext,
	KeyBuilderContext,
	PickAuth,
	PluginAuthConfig,
	PluginPermissionsConfig,
	RequiredPluginEndpointMeta,
	RequiredPluginEndpointSchemas,
} from 'corsair/core';
import { AuthMissingError } from 'corsair/core';
import {
	Aerial,
	Directions,
	Embed,
	Geocoding,
	Geolocation,
	Places,
	Routes,
	Tiles,
} from './endpoints';
import type {
	GoogleMapsEndpointInputs,
	GoogleMapsEndpointOutputs,
} from './endpoints/types';
import {
	GoogleMapsEndpointInputSchemas,
	GoogleMapsEndpointOutputSchemas,
} from './endpoints/types';
import { errorHandlers } from './error-handlers';
import { GoogleMapsSchema } from './schema';

export const googleMapsAuthConfig = {
	api_key: {
		account: [] as const,
	},
	oauth_2: {
		account: [] as const,
	},
} as const satisfies PluginAuthConfig;

export type GoogleMapsPluginOptions = {
	authType?: PickAuth<'api_key' | 'oauth_2'>;
	/** API key or OAuth access token supplied directly */
	key?: string;
	hooks?: InternalGoogleMapsPlugin['hooks'];
	errorHandlers?: CorsairErrorHandler;
	permissions?: PluginPermissionsConfig<typeof googleMapsEndpointsNested>;
};

export type GoogleMapsContext = CorsairPluginContext<
	typeof GoogleMapsSchema,
	GoogleMapsPluginOptions,
	undefined,
	typeof googleMapsAuthConfig
>;

export type GoogleMapsKeyBuilderContext = KeyBuilderContext<
	GoogleMapsPluginOptions,
	typeof googleMapsAuthConfig
>;

type GoogleMapsEndpoint<K extends keyof GoogleMapsEndpointOutputs> =
	CorsairEndpoint<
		GoogleMapsContext,
		GoogleMapsEndpointInputs[K],
		GoogleMapsEndpointOutputs[K]
	>;

export type GoogleMapsEndpoints = {
	placesTextSearch: GoogleMapsEndpoint<'placesTextSearch'>;
	placesNearbySearch: GoogleMapsEndpoint<'placesNearbySearch'>;
	placesAutocomplete: GoogleMapsEndpoint<'placesAutocomplete'>;
	placesGet: GoogleMapsEndpoint<'placesGet'>;
	placesGetPhoto: GoogleMapsEndpoint<'placesGetPhoto'>;
	geocodingGeocode: GoogleMapsEndpoint<'geocodingGeocode'>;
	geocodingAddressQuery: GoogleMapsEndpoint<'geocodingAddressQuery'>;
	geocodingReverse: GoogleMapsEndpoint<'geocodingReverse'>;
	geocodingPlace: GoogleMapsEndpoint<'geocodingPlace'>;
	geocodingDestinations: GoogleMapsEndpoint<'geocodingDestinations'>;
	geocodingAddressLegacy: GoogleMapsEndpoint<'geocodingAddressLegacy'>;
	routesComputeRoutes: GoogleMapsEndpoint<'routesComputeRoutes'>;
	routesComputeRouteMatrix: GoogleMapsEndpoint<'routesComputeRouteMatrix'>;
	directionsGet: GoogleMapsEndpoint<'directionsGet'>;
	distanceMatrixLegacy: GoogleMapsEndpoint<'distanceMatrixLegacy'>;
	geolocationGeolocate: GoogleMapsEndpoint<'geolocationGeolocate'>;
	tilesCreateSession: GoogleMapsEndpoint<'tilesCreateSession'>;
	tilesGet2d: GoogleMapsEndpoint<'tilesGet2d'>;
	tilesGet3dRoot: GoogleMapsEndpoint<'tilesGet3dRoot'>;
	aerialRenderVideo: GoogleMapsEndpoint<'aerialRenderVideo'>;
	aerialLookupVideo: GoogleMapsEndpoint<'aerialLookupVideo'>;
	mapsEmbed: GoogleMapsEndpoint<'mapsEmbed'>;
};

export type GoogleMapsBoundEndpoints = BindEndpoints<
	typeof googleMapsEndpointsNested
>;

const googleMapsEndpointsNested = {
	places: {
		textSearch: Places.textSearch,
		nearbySearch: Places.nearbySearch,
		autocomplete: Places.autocomplete,
		get: Places.get,
		getPhoto: Places.getPhoto,
	},
	geocoding: {
		geocode: Geocoding.geocode,
		addressQuery: Geocoding.addressQuery,
		reverse: Geocoding.reverse,
		place: Geocoding.place,
		destinations: Geocoding.destinations,
		addressLegacy: Geocoding.addressLegacy,
	},
	routes: {
		computeRoutes: Routes.computeRoutes,
		computeRouteMatrix: Routes.computeRouteMatrix,
	},
	directions: {
		get: Directions.getDirections,
	},
	distanceMatrix: {
		legacy: Directions.distanceMatrixLegacy,
	},
	geolocation: {
		geolocate: Geolocation.geolocate,
	},
	tiles: {
		createSession: Tiles.createSession,
		get2d: Tiles.get2d,
		get3dRoot: Tiles.get3dRoot,
	},
	aerial: {
		renderVideo: Aerial.renderVideo,
		lookupVideo: Aerial.lookupVideo,
	},
	maps: {
		embed: Embed.build,
	},
} as const;

export const googleMapsEndpointSchemas = {
	'places.textSearch': {
		input: GoogleMapsEndpointInputSchemas.placesTextSearch,
		output: GoogleMapsEndpointOutputSchemas.placesTextSearch,
	},
	'places.nearbySearch': {
		input: GoogleMapsEndpointInputSchemas.placesNearbySearch,
		output: GoogleMapsEndpointOutputSchemas.placesNearbySearch,
	},
	'places.autocomplete': {
		input: GoogleMapsEndpointInputSchemas.placesAutocomplete,
		output: GoogleMapsEndpointOutputSchemas.placesAutocomplete,
	},
	'places.get': {
		input: GoogleMapsEndpointInputSchemas.placesGet,
		output: GoogleMapsEndpointOutputSchemas.placesGet,
	},
	'places.getPhoto': {
		input: GoogleMapsEndpointInputSchemas.placesGetPhoto,
		output: GoogleMapsEndpointOutputSchemas.placesGetPhoto,
	},
	'geocoding.geocode': {
		input: GoogleMapsEndpointInputSchemas.geocodingGeocode,
		output: GoogleMapsEndpointOutputSchemas.geocodingGeocode,
	},
	'geocoding.addressQuery': {
		input: GoogleMapsEndpointInputSchemas.geocodingAddressQuery,
		output: GoogleMapsEndpointOutputSchemas.geocodingAddressQuery,
	},
	'geocoding.reverse': {
		input: GoogleMapsEndpointInputSchemas.geocodingReverse,
		output: GoogleMapsEndpointOutputSchemas.geocodingReverse,
	},
	'geocoding.place': {
		input: GoogleMapsEndpointInputSchemas.geocodingPlace,
		output: GoogleMapsEndpointOutputSchemas.geocodingPlace,
	},
	'geocoding.destinations': {
		input: GoogleMapsEndpointInputSchemas.geocodingDestinations,
		output: GoogleMapsEndpointOutputSchemas.geocodingDestinations,
	},
	'geocoding.addressLegacy': {
		input: GoogleMapsEndpointInputSchemas.geocodingAddressLegacy,
		output: GoogleMapsEndpointOutputSchemas.geocodingAddressLegacy,
	},
	'routes.computeRoutes': {
		input: GoogleMapsEndpointInputSchemas.routesComputeRoutes,
		output: GoogleMapsEndpointOutputSchemas.routesComputeRoutes,
	},
	'routes.computeRouteMatrix': {
		input: GoogleMapsEndpointInputSchemas.routesComputeRouteMatrix,
		output: GoogleMapsEndpointOutputSchemas.routesComputeRouteMatrix,
	},
	'directions.get': {
		input: GoogleMapsEndpointInputSchemas.directionsGet,
		output: GoogleMapsEndpointOutputSchemas.directionsGet,
	},
	'distanceMatrix.legacy': {
		input: GoogleMapsEndpointInputSchemas.distanceMatrixLegacy,
		output: GoogleMapsEndpointOutputSchemas.distanceMatrixLegacy,
	},
	'geolocation.geolocate': {
		input: GoogleMapsEndpointInputSchemas.geolocationGeolocate,
		output: GoogleMapsEndpointOutputSchemas.geolocationGeolocate,
	},
	'tiles.createSession': {
		input: GoogleMapsEndpointInputSchemas.tilesCreateSession,
		output: GoogleMapsEndpointOutputSchemas.tilesCreateSession,
	},
	'tiles.get2d': {
		input: GoogleMapsEndpointInputSchemas.tilesGet2d,
		output: GoogleMapsEndpointOutputSchemas.tilesGet2d,
	},
	'tiles.get3dRoot': {
		input: GoogleMapsEndpointInputSchemas.tilesGet3dRoot,
		output: GoogleMapsEndpointOutputSchemas.tilesGet3dRoot,
	},
	'aerial.renderVideo': {
		input: GoogleMapsEndpointInputSchemas.aerialRenderVideo,
		output: GoogleMapsEndpointOutputSchemas.aerialRenderVideo,
	},
	'aerial.lookupVideo': {
		input: GoogleMapsEndpointInputSchemas.aerialLookupVideo,
		output: GoogleMapsEndpointOutputSchemas.aerialLookupVideo,
	},
	'maps.embed': {
		input: GoogleMapsEndpointInputSchemas.mapsEmbed,
		output: GoogleMapsEndpointOutputSchemas.mapsEmbed,
	},
} as const satisfies RequiredPluginEndpointSchemas<
	typeof googleMapsEndpointsNested
>;

const defaultAuthType: AuthTypes = 'api_key' as const;

const googleMapsEndpointMeta = {
	'places.textSearch': {
		riskLevel: 'read',
		description: 'Text Search (Places API New) for places by free-text query',
	},
	'places.nearbySearch': {
		riskLevel: 'read',
		description: 'Nearby Search within a circular area',
	},
	'places.autocomplete': {
		riskLevel: 'read',
		description: 'Autocomplete place/query predictions for as-you-type input',
	},
	'places.get': {
		riskLevel: 'read',
		description: 'Get place details by place resource name or id',
	},
	'places.getPhoto': {
		riskLevel: 'read',
		description: 'Download place photo media by photo resource name',
	},
	'geocoding.geocode': {
		riskLevel: 'read',
		description: 'Geocoding API v4 (exactly one of address, latlng, placeId)',
	},
	'geocoding.addressQuery': {
		riskLevel: 'read',
		description: 'Geocode an address query (v4beta)',
	},
	'geocoding.reverse': {
		riskLevel: 'read',
		description: 'Reverse geocode lat/lng to addresses (v4beta)',
	},
	'geocoding.place': {
		riskLevel: 'read',
		description: 'Geocode by Google Place ID (v4beta)',
	},
	'geocoding.destinations': {
		riskLevel: 'read',
		description: 'Destination lookup with landmarks/navigation points',
	},
	'geocoding.addressLegacy': {
		riskLevel: 'read',
		description: 'DEPRECATED legacy Geocode Address (/geocode/json)',
	},
	'routes.computeRoutes': {
		riskLevel: 'read',
		description: 'Compute routes between origin and destination (Routes API)',
	},
	'routes.computeRouteMatrix': {
		riskLevel: 'read',
		description:
			'Compute route matrix (max 625 elements); use originIndex/destinationIndex',
	},
	'directions.get': {
		riskLevel: 'read',
		description:
			'DEPRECATED Get Directions — modern Routes with OAuth, legacy with API key',
	},
	'distanceMatrix.legacy': {
		riskLevel: 'read',
		description:
			'DEPRECATED Distance Matrix API (API key only, max 100 elements)',
	},
	'geolocation.geolocate': {
		riskLevel: 'read',
		description: 'Geolocate device from cell towers / WiFi access points',
	},
	'tiles.createSession': {
		riskLevel: 'write',
		description: 'Create Map Tiles session token (~2 weeks; cache and reuse)',
	},
	'tiles.get2d': {
		riskLevel: 'read',
		description: 'Get a 2D map tile image (requires session token)',
	},
	'tiles.get3dRoot': {
		riskLevel: 'read',
		description: 'Get photorealistic 3D Tiles root configuration',
	},
	'aerial.renderVideo': {
		riskLevel: 'write',
		description: 'Start aerial view video render for a US address',
	},
	'aerial.lookupVideo': {
		riskLevel: 'read',
		description: 'Lookup aerial video by address or video ID',
	},
	'maps.embed': {
		riskLevel: 'read',
		description: 'Build Maps Embed URL + iframe HTML (API key only)',
	},
} as const satisfies RequiredPluginEndpointMeta<
	typeof googleMapsEndpointsNested
>;

export type BaseGoogleMapsPlugin<T extends GoogleMapsPluginOptions> =
	CorsairPlugin<
		'googlemaps',
		typeof GoogleMapsSchema,
		typeof googleMapsEndpointsNested,
		{},
		T,
		typeof defaultAuthType,
		typeof googleMapsAuthConfig
	>;

export type InternalGoogleMapsPlugin =
	BaseGoogleMapsPlugin<GoogleMapsPluginOptions>;

export type ExternalGoogleMapsPlugin<T extends GoogleMapsPluginOptions> =
	BaseGoogleMapsPlugin<T>;

export function googlemaps<const T extends GoogleMapsPluginOptions>(
	incomingOptions: GoogleMapsPluginOptions & T = {} as GoogleMapsPluginOptions &
		T,
): ExternalGoogleMapsPlugin<T> {
	const options = {
		...incomingOptions,
		authType: incomingOptions.authType ?? defaultAuthType,
	};
	return {
		id: 'googlemaps',
		authConfig: googleMapsAuthConfig,
		schema: GoogleMapsSchema,
		options: options,
		hooks: options.hooks,
		endpoints: googleMapsEndpointsNested,
		webhooks: {},
		endpointMeta: googleMapsEndpointMeta,
		endpointSchemas: googleMapsEndpointSchemas,
		// Google Maps Platform has no inbound webhooks
		pluginWebhookMatcher: () => false,
		errorHandlers: (() => {
			// DEFAULT matches everything; always evaluate last so custom handlers work
			const { DEFAULT: defaultHandler, ...specificDefaults } = errorHandlers;
			return {
				...specificDefaults,
				...(options.errorHandlers || {}),
				DEFAULT: options.errorHandlers?.DEFAULT || defaultHandler,
			};
		})(),
		keyBuilder: async (ctx: GoogleMapsKeyBuilderContext, source) => {
			if (source === 'endpoint' && options.key) {
				return options.key;
			}

			if (source === 'endpoint' && ctx.authType === 'api_key') {
				const res = await ctx.keys.get_api_key();
				if (!res) {
					throw new AuthMissingError('googlemaps', 'api_key');
				}
				return res;
			}

			if (source === 'endpoint' && ctx.authType === 'oauth_2') {
				const res = await ctx.keys.get_access_token();
				if (!res) {
					throw new AuthMissingError('googlemaps', 'oauth_2');
				}
				return res;
			}

			throw new AuthMissingError(
				'googlemaps',
				(ctx.authType as 'api_key' | 'oauth_2') ?? 'api_key',
			);
		},
	} satisfies InternalGoogleMapsPlugin;
}

export type {
	GoogleMapsEndpointInputs,
	GoogleMapsEndpointOutputs,
} from './endpoints/types';
