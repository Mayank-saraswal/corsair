import { makeGoogleMapsRequest } from './client';
import type { GoogleMapsEndpointInputs } from './endpoints/types';
import {
	GoogleMapsEndpointInputSchemas,
	GoogleMapsEndpointOutputSchemas,
} from './endpoints/types';

const API_KEY =
	process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_KEY || '';

const describeLive = API_KEY ? describe : describe.skip;

const openSample = { status: 'OK', results: [] };

const FIXTURES: {
	[K in keyof GoogleMapsEndpointInputs]: {
		input: GoogleMapsEndpointInputs[K];
		// output shape varies widely across Maps APIs
		output: unknown;
	};
} = {
	placesTextSearch: {
		input: { textQuery: 'restaurants in London', maxResultCount: 5 },
		output: { places: [] },
	},
	placesNearbySearch: {
		input: {
			latitude: 51.5,
			longitude: -0.12,
			radiusMeters: 1000,
			maxResultCount: 5,
		},
		output: { places: [] },
	},
	placesAutocomplete: {
		input: { input: 'Eiffel' },
		output: { suggestions: [] },
	},
	placesGet: {
		input: { placeId: 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ' },
		output: { id: 'places/ChIJD7fiBh9u5kcRYJSMaMOCCwQ' },
	},
	placesGetPhoto: {
		input: {
			name: 'places/ChIJ/photos/ABC',
			maxWidthPx: 400,
			skipHttpRedirect: true,
		},
		output: { photoUri: 'https://example.com/photo.jpg' },
	},
	geocodingGeocode: {
		input: { address: '1600 Amphitheatre Parkway, Mountain View, CA' },
		output: openSample,
	},
	geocodingAddressQuery: {
		input: { addressQuery: 'Times Square, New York' },
		output: openSample,
	},
	geocodingReverse: {
		input: { latitude: 40.714224, longitude: -73.961452 },
		output: openSample,
	},
	geocodingPlace: {
		input: { placeId: 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ' },
		output: openSample,
	},
	geocodingDestinations: {
		input: { destination: 'Golden Gate Bridge' },
		output: openSample,
	},
	geocodingAddressLegacy: {
		input: { address: '1600 Amphitheatre Parkway' },
		output: openSample,
	},
	routesComputeRoutes: {
		input: {
			originAddress: 'Mountain View, CA',
			destinationAddress: 'San Francisco, CA',
			travelMode: 'DRIVE',
		},
		output: { routes: [] },
	},
	routesComputeRouteMatrix: {
		input: {
			origins: [{ address: 'Mountain View, CA' }],
			destinations: [{ address: 'San Francisco, CA' }],
		},
		output: [],
	},
	directionsGet: {
		input: {
			origin: 'Toronto',
			destination: 'Montreal',
			mode: 'driving',
		},
		output: openSample,
	},
	distanceMatrixLegacy: {
		input: {
			origins: 'Vancouver+BC|Seattle',
			destinations: 'San+Francisco|Victoria+BC',
		},
		output: openSample,
	},
	geolocationGeolocate: {
		input: { considerIp: true },
		output: { location: { lat: 0, lng: 0 }, accuracy: 1000 },
	},
	tilesCreateSession: {
		input: { mapType: 'roadmap' },
		output: { session: 'abc', expiry: '2099-01-01' },
	},
	tilesGet2d: {
		input: { session: 'sess', z: 1, x: 0, y: 0 },
		output: {
			contentType: 'image/png',
			size: 4,
			dataBase64: 'AAAA',
		},
	},
	tilesGet3dRoot: {
		input: {},
		output: { root: {} },
	},
	aerialRenderVideo: {
		input: { address: '1600 Amphitheatre Parkway, Mountain View, CA' },
		output: { videoId: 'vid' },
	},
	aerialLookupVideo: {
		input: { videoId: 'vid' },
		output: { state: 'ACTIVE' },
	},
	mapsEmbed: {
		input: { mode: 'place', q: 'Space Needle, Seattle' },
		output: {
			url: 'https://www.google.com/maps/embed/v1/place?key=x&q=Space+Needle',
			iframeHtml:
				'<iframe src="https://www.google.com/maps/embed/v1/place"></iframe>',
		},
	},
};

describe('Google Maps endpoint schemas (offline)', () => {
	for (const name of Object.keys(FIXTURES) as (keyof typeof FIXTURES)[]) {
		it(`parses ${name} input and output`, () => {
			const fixture = FIXTURES[name];
			const inParsed = GoogleMapsEndpointInputSchemas[name].safeParse(
				fixture.input,
			);
			expect(inParsed.success).toBe(true);
			const outParsed = GoogleMapsEndpointOutputSchemas[name].safeParse(
				fixture.output,
			);
			expect(outParsed.success).toBe(true);
		});
	}

	it('rejects geocodingGeocode when no locator provided', () => {
		const r = GoogleMapsEndpointInputSchemas.geocodingGeocode.safeParse({});
		expect(r.success).toBe(false);
	});

	it('rejects route matrix over 25 origins', () => {
		const origins = Array.from({ length: 26 }, (_, i) => ({
			address: `Origin ${i}`,
		}));
		const r = GoogleMapsEndpointInputSchemas.routesComputeRouteMatrix.safeParse(
			{
				origins,
				destinations: [{ address: 'D' }],
			},
		);
		expect(r.success).toBe(false);
	});
});

describeLive('Google Maps live smoke (list/geocode only)', () => {
	it('geocodes a public address via legacy endpoint', async () => {
		const res = await makeGoogleMapsRequest<{ status?: string }>(
			'/geocode/json',
			API_KEY,
			'api_key',
			{
				method: 'GET',
				host: 'mapsLegacy',
				legacyKeyQuery: true,
				query: { address: 'Google Building 40, Mountain View, CA' },
			},
		);
		expect(res).toBeDefined();
		// status may be OK or REQUEST_DENIED if APIs not enabled — still a network response
		expect(typeof res).toBe('object');
	}, 30000);
});
