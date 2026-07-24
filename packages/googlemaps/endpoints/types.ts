import { z } from 'zod';

/** Open Google Maps JSON (shape varies by API/version; matrix APIs may return arrays) */
const OpenResponseSchema = z.union([
	z.record(z.string(), z.unknown()),
	z.array(z.unknown()),
]);
export type OpenResponse = z.infer<typeof OpenResponseSchema>;

const LatLngSchema = z.object({
	latitude: z.number(),
	longitude: z.number(),
});

const LatLngLiteralSchema = z.object({
	lat: z.number(),
	lng: z.number(),
});

// ── Places ────────────────────────────────────────────────────────────

const PlacesTextSearchInputSchema = z.object({
	textQuery: z.string().min(1),
	maxResultCount: z.number().int().positive().max(20).optional(),
	languageCode: z.string().optional(),
	regionCode: z.string().optional(),
	includedType: z.string().optional(),
	openNow: z.boolean().optional(),
	/** Field mask override; defaults to a practical place summary set */
	fieldMask: z.string().optional(),
});
export type PlacesTextSearchInput = z.infer<typeof PlacesTextSearchInputSchema>;

const PlacesNearbySearchInputSchema = z.object({
	latitude: z.number(),
	longitude: z.number(),
	radiusMeters: z.number().positive().max(50000),
	includedTypes: z.array(z.string()).optional(),
	excludedTypes: z.array(z.string()).optional(),
	maxResultCount: z.number().int().positive().max(20).optional(),
	languageCode: z.string().optional(),
	rankPreference: z.enum(['POPULARITY', 'DISTANCE']).optional(),
	fieldMask: z.string().optional(),
});
export type PlacesNearbySearchInput = z.infer<
	typeof PlacesNearbySearchInputSchema
>;

const PlacesAutocompleteInputSchema = z.object({
	input: z.string().min(1),
	languageCode: z.string().optional(),
	regionCode: z.string().optional(),
	includedPrimaryTypes: z.array(z.string()).optional(),
	// location bias circle (optional)
	latitude: z.number().optional(),
	longitude: z.number().optional(),
	radiusMeters: z.number().positive().optional(),
	sessionToken: z.string().optional(),
	includeQueryPredictions: z.boolean().optional(),
});
export type PlacesAutocompleteInput = z.infer<
	typeof PlacesAutocompleteInputSchema
>;

const PlacesGetInputSchema = z.object({
	/** Place resource name or bare place id (places/{id} or {id}) */
	placeId: z.string().min(1),
	languageCode: z.string().optional(),
	regionCode: z.string().optional(),
	fieldMask: z.string().optional(),
});
export type PlacesGetInput = z.infer<typeof PlacesGetInputSchema>;

const PlacesGetPhotoInputSchema = z.object({
	/** Photo resource name, e.g. places/{place}/photos/{photo}/media */
	name: z.string().min(1),
	maxWidthPx: z.number().int().positive().max(4800).optional(),
	maxHeightPx: z.number().int().positive().max(4800).optional(),
	skipHttpRedirect: z.boolean().optional(),
});
export type PlacesGetPhotoInput = z.infer<typeof PlacesGetPhotoInputSchema>;

// ── Geocoding ─────────────────────────────────────────────────────────

const GeocodingGeocodeInputSchema = z
	.object({
		address: z.string().optional(),
		latlng: z.string().optional().describe('lat,lng string'),
		placeId: z.string().optional(),
		languageCode: z.string().optional(),
		regionCode: z.string().optional(),
	})
	.refine(
		(v) =>
			[v.address, v.latlng, v.placeId].filter((x) => x !== undefined).length ===
			1,
		{ message: 'Provide exactly one of address, latlng, or placeId' },
	);
export type GeocodingGeocodeInput = z.infer<typeof GeocodingGeocodeInputSchema>;

const GeocodingAddressQueryInputSchema = z.object({
	addressQuery: z.string().min(1),
	languageCode: z.string().optional(),
	regionCode: z.string().optional(),
});
export type GeocodingAddressQueryInput = z.infer<
	typeof GeocodingAddressQueryInputSchema
>;

const GeocodingReverseInputSchema = z.object({
	latitude: z.number(),
	longitude: z.number(),
	languageCode: z.string().optional(),
	regionCode: z.string().optional(),
});
export type GeocodingReverseInput = z.infer<typeof GeocodingReverseInputSchema>;

const GeocodingPlaceInputSchema = z.object({
	placeId: z.string().min(1),
	languageCode: z.string().optional(),
	regionCode: z.string().optional(),
});
export type GeocodingPlaceInput = z.infer<typeof GeocodingPlaceInputSchema>;

const GeocodingDestinationsInputSchema = z.object({
	/** Free-text address, place id, or lat,lng */
	destination: z.string().min(1),
	languageCode: z.string().optional(),
	regionCode: z.string().optional(),
});
export type GeocodingDestinationsInput = z.infer<
	typeof GeocodingDestinationsInputSchema
>;

const GeocodingAddressLegacyInputSchema = z.object({
	address: z.string().min(1),
	language: z.string().optional(),
	region: z.string().optional(),
	components: z.string().optional(),
});
export type GeocodingAddressLegacyInput = z.infer<
	typeof GeocodingAddressLegacyInputSchema
>;

// ── Routes ────────────────────────────────────────────────────────────

const WaypointSchema = z.object({
	address: z.string().optional(),
	placeId: z.string().optional(),
	latitude: z.number().optional(),
	longitude: z.number().optional(),
});

const RoutesComputeRoutesInputSchema = z.object({
	originAddress: z.string().optional(),
	originPlaceId: z.string().optional(),
	originLatitude: z.number().optional(),
	originLongitude: z.number().optional(),
	destinationAddress: z.string().optional(),
	destinationPlaceId: z.string().optional(),
	destinationLatitude: z.number().optional(),
	destinationLongitude: z.number().optional(),
	intermediates: z.array(WaypointSchema).optional(),
	travelMode: z
		.enum(['DRIVE', 'BICYCLE', 'WALK', 'TWO_WHEELER', 'TRANSIT'])
		.optional(),
	routingPreference: z
		.enum(['TRAFFIC_UNAWARE', 'TRAFFIC_AWARE', 'TRAFFIC_AWARE_OPTIMAL'])
		.optional(),
	computeAlternativeRoutes: z.boolean().optional(),
	languageCode: z.string().optional(),
	units: z.enum(['METRIC', 'IMPERIAL']).optional(),
	fieldMask: z.string().optional(),
});
export type RoutesComputeRoutesInput = z.infer<
	typeof RoutesComputeRoutesInputSchema
>;

const MatrixPointSchema = z.object({
	address: z.string().optional(),
	placeId: z.string().optional(),
	latitude: z.number().optional(),
	longitude: z.number().optional(),
});

const RoutesComputeRouteMatrixInputSchema = z.object({
	origins: z.array(MatrixPointSchema).min(1).max(25),
	destinations: z.array(MatrixPointSchema).min(1).max(25),
	travelMode: z
		.enum(['DRIVE', 'BICYCLE', 'WALK', 'TWO_WHEELER', 'TRANSIT'])
		.optional(),
	routingPreference: z
		.enum(['TRAFFIC_UNAWARE', 'TRAFFIC_AWARE', 'TRAFFIC_AWARE_OPTIMAL'])
		.optional(),
	languageCode: z.string().optional(),
	units: z.enum(['METRIC', 'IMPERIAL']).optional(),
	fieldMask: z.string().optional(),
});
export type RoutesComputeRouteMatrixInput = z.infer<
	typeof RoutesComputeRouteMatrixInputSchema
>;

const DirectionsGetInputSchema = z.object({
	origin: z.string().min(1),
	destination: z.string().min(1),
	mode: z.enum(['driving', 'walking', 'bicycling', 'transit']).optional(),
	waypoints: z.string().optional().describe('pipe-separated waypoints'),
	alternatives: z.boolean().optional(),
	language: z.string().optional(),
	units: z.enum(['metric', 'imperial']).optional(),
	/** Prefer modern Routes API when true (default) and credential supports it */
	preferModern: z.boolean().optional(),
});
export type DirectionsGetInput = z.infer<typeof DirectionsGetInputSchema>;

const DistanceMatrixLegacyInputSchema = z.object({
	origins: z.string().min(1).describe('pipe or | separated origins'),
	destinations: z.string().min(1),
	mode: z.enum(['driving', 'walking', 'bicycling', 'transit']).optional(),
	language: z.string().optional(),
	units: z.enum(['metric', 'imperial']).optional(),
	departureTime: z.union([z.string(), z.number()]).optional(),
	arrivalTime: z.union([z.string(), z.number()]).optional(),
});
export type DistanceMatrixLegacyInput = z.infer<
	typeof DistanceMatrixLegacyInputSchema
>;

// ── Geolocation ───────────────────────────────────────────────────────

const GeolocationGeolocateInputSchema = z.object({
	homeMobileCountryCode: z.number().optional(),
	homeMobileNetworkCode: z.number().optional(),
	radioType: z.string().optional(),
	carrier: z.string().optional(),
	considerIp: z.boolean().optional(),
	// cellTowers / wifiAccessPoints are free-form device arrays
	cellTowers: z.array(z.record(z.string(), z.unknown())).optional(),
	wifiAccessPoints: z.array(z.record(z.string(), z.unknown())).optional(),
});
export type GeolocationGeolocateInput = z.infer<
	typeof GeolocationGeolocateInputSchema
>;

// ── Tiles ─────────────────────────────────────────────────────────────

const TilesCreateSessionInputSchema = z.object({
	mapType: z
		.enum(['roadmap', 'satellite', 'terrain', 'streetview'])
		.default('roadmap'),
	language: z.string().optional(),
	region: z.string().optional(),
	imageFormat: z.enum(['png', 'jpeg']).optional(),
	scale: z.enum(['scaleFactor1x', 'scaleFactor2x', 'scaleFactor4x']).optional(),
	highDpi: z.boolean().optional(),
	layerTypes: z.array(z.string()).optional(),
	styles: z.array(z.record(z.string(), z.unknown())).optional(),
	overlay: z.boolean().optional(),
});
export type TilesCreateSessionInput = z.infer<
	typeof TilesCreateSessionInputSchema
>;

const TilesGet2dInputSchema = z.object({
	session: z.string().min(1),
	z: z.number().int().min(0).max(22),
	x: z.number().int().min(0),
	y: z.number().int().min(0),
	orientation: z.number().optional(),
});
export type TilesGet2dInput = z.infer<typeof TilesGet2dInputSchema>;

const TilesGet3dRootInputSchema = z.object({}).strict().or(z.object({}));
export type TilesGet3dRootInput = z.infer<typeof TilesGet3dRootInputSchema>;

// ── Aerial ────────────────────────────────────────────────────────────

const AerialRenderVideoInputSchema = z.object({
	address: z.string().min(1).describe('US postal address'),
});
export type AerialRenderVideoInput = z.infer<
	typeof AerialRenderVideoInputSchema
>;

const AerialLookupVideoInputSchema = z
	.object({
		address: z.string().optional(),
		videoId: z.string().optional(),
	})
	.refine((v) => Boolean(v.address || v.videoId), {
		message: 'Provide address or videoId',
	});
export type AerialLookupVideoInput = z.infer<
	typeof AerialLookupVideoInputSchema
>;

// ── Embed ─────────────────────────────────────────────────────────────

const MapsEmbedInputSchema = z.object({
	mode: z.enum(['place', 'view', 'directions', 'streetview', 'search']),
	q: z.string().optional().describe('place query or lat,lng'),
	origin: z.string().optional(),
	destination: z.string().optional(),
	center: z.string().optional(),
	zoom: z.number().int().min(0).max(21).optional(),
	maptype: z.enum(['roadmap', 'satellite']).optional(),
	language: z.string().optional(),
	region: z.string().optional(),
	heading: z.number().optional(),
	pitch: z.number().optional(),
	fov: z.number().optional(),
});
export type MapsEmbedInput = z.infer<typeof MapsEmbedInputSchema>;

const MapsEmbedOutputSchema = z.object({
	url: z.string(),
	iframeHtml: z.string(),
});
export type MapsEmbedOutput = z.infer<typeof MapsEmbedOutputSchema>;

const BinaryMediaOutputSchema = z.object({
	contentType: z.string(),
	size: z.number(),
	dataBase64: z.string(),
});

// ── Aggregate maps ────────────────────────────────────────────────────

export type GoogleMapsEndpointInputs = {
	placesTextSearch: PlacesTextSearchInput;
	placesNearbySearch: PlacesNearbySearchInput;
	placesAutocomplete: PlacesAutocompleteInput;
	placesGet: PlacesGetInput;
	placesGetPhoto: PlacesGetPhotoInput;
	geocodingGeocode: GeocodingGeocodeInput;
	geocodingAddressQuery: GeocodingAddressQueryInput;
	geocodingReverse: GeocodingReverseInput;
	geocodingPlace: GeocodingPlaceInput;
	geocodingDestinations: GeocodingDestinationsInput;
	geocodingAddressLegacy: GeocodingAddressLegacyInput;
	routesComputeRoutes: RoutesComputeRoutesInput;
	routesComputeRouteMatrix: RoutesComputeRouteMatrixInput;
	directionsGet: DirectionsGetInput;
	distanceMatrixLegacy: DistanceMatrixLegacyInput;
	geolocationGeolocate: GeolocationGeolocateInput;
	tilesCreateSession: TilesCreateSessionInput;
	tilesGet2d: TilesGet2dInput;
	tilesGet3dRoot: TilesGet3dRootInput;
	aerialRenderVideo: AerialRenderVideoInput;
	aerialLookupVideo: AerialLookupVideoInput;
	mapsEmbed: MapsEmbedInput;
};

export type GoogleMapsEndpointOutputs = {
	placesTextSearch: OpenResponse;
	placesNearbySearch: OpenResponse;
	placesAutocomplete: OpenResponse;
	placesGet: OpenResponse;
	placesGetPhoto: z.infer<typeof BinaryMediaOutputSchema> | OpenResponse;
	geocodingGeocode: OpenResponse;
	geocodingAddressQuery: OpenResponse;
	geocodingReverse: OpenResponse;
	geocodingPlace: OpenResponse;
	geocodingDestinations: OpenResponse;
	geocodingAddressLegacy: OpenResponse;
	routesComputeRoutes: OpenResponse;
	routesComputeRouteMatrix: OpenResponse;
	directionsGet: OpenResponse;
	distanceMatrixLegacy: OpenResponse;
	geolocationGeolocate: OpenResponse;
	tilesCreateSession: OpenResponse;
	tilesGet2d: z.infer<typeof BinaryMediaOutputSchema>;
	tilesGet3dRoot: OpenResponse;
	aerialRenderVideo: OpenResponse;
	aerialLookupVideo: OpenResponse;
	mapsEmbed: MapsEmbedOutput;
};

export const GoogleMapsEndpointInputSchemas = {
	placesTextSearch: PlacesTextSearchInputSchema,
	placesNearbySearch: PlacesNearbySearchInputSchema,
	placesAutocomplete: PlacesAutocompleteInputSchema,
	placesGet: PlacesGetInputSchema,
	placesGetPhoto: PlacesGetPhotoInputSchema,
	geocodingGeocode: GeocodingGeocodeInputSchema,
	geocodingAddressQuery: GeocodingAddressQueryInputSchema,
	geocodingReverse: GeocodingReverseInputSchema,
	geocodingPlace: GeocodingPlaceInputSchema,
	geocodingDestinations: GeocodingDestinationsInputSchema,
	geocodingAddressLegacy: GeocodingAddressLegacyInputSchema,
	routesComputeRoutes: RoutesComputeRoutesInputSchema,
	routesComputeRouteMatrix: RoutesComputeRouteMatrixInputSchema,
	directionsGet: DirectionsGetInputSchema,
	distanceMatrixLegacy: DistanceMatrixLegacyInputSchema,
	geolocationGeolocate: GeolocationGeolocateInputSchema,
	tilesCreateSession: TilesCreateSessionInputSchema,
	tilesGet2d: TilesGet2dInputSchema,
	tilesGet3dRoot: TilesGet3dRootInputSchema,
	aerialRenderVideo: AerialRenderVideoInputSchema,
	aerialLookupVideo: AerialLookupVideoInputSchema,
	mapsEmbed: MapsEmbedInputSchema,
} as const;

export const GoogleMapsEndpointOutputSchemas = {
	placesTextSearch: OpenResponseSchema,
	placesNearbySearch: OpenResponseSchema,
	placesAutocomplete: OpenResponseSchema,
	placesGet: OpenResponseSchema,
	placesGetPhoto: z.union([BinaryMediaOutputSchema, OpenResponseSchema]),
	geocodingGeocode: OpenResponseSchema,
	geocodingAddressQuery: OpenResponseSchema,
	geocodingReverse: OpenResponseSchema,
	geocodingPlace: OpenResponseSchema,
	geocodingDestinations: OpenResponseSchema,
	geocodingAddressLegacy: OpenResponseSchema,
	routesComputeRoutes: OpenResponseSchema,
	routesComputeRouteMatrix: OpenResponseSchema,
	directionsGet: OpenResponseSchema,
	distanceMatrixLegacy: OpenResponseSchema,
	geolocationGeolocate: OpenResponseSchema,
	tilesCreateSession: OpenResponseSchema,
	tilesGet2d: BinaryMediaOutputSchema,
	tilesGet3dRoot: OpenResponseSchema,
	aerialRenderVideo: OpenResponseSchema,
	aerialLookupVideo: OpenResponseSchema,
	mapsEmbed: MapsEmbedOutputSchema,
} as const;

// silence unused schema imports if tree-shaken oddly
void LatLngSchema;
void LatLngLiteralSchema;
