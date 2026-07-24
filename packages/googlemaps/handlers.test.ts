import * as CorsairCore from 'corsair/core';
import * as Client from './client';
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
import type { GoogleMapsEndpoints } from './index';

const mockReq = jest.spyOn(Client, 'makeGoogleMapsRequest');
const mockBin = jest.spyOn(Client, 'makeGoogleMapsBinaryRequest');
const logSpy = jest.spyOn(CorsairCore, 'logEventFromContext');
logSpy.mockImplementation(async () => null);

type HandlerCtx = Parameters<GoogleMapsEndpoints['placesTextSearch']>[0];

function ctx(
	key = 'test-key',
	authType: 'api_key' | 'oauth_2' = 'api_key',
): HandlerCtx {
	const partial = {
		key,
		db: {},
		authType,
		options: {},
		keys: {
			get_api_key: async () => key,
			get_access_token: async () => key,
		},
	};
	// Handler unit tests only need key + authType; cast through unknown
	return partial as unknown as HandlerCtx;
}

function lastCall() {
	const call = mockReq.mock.calls.at(-1);
	if (!call) throw new Error('makeGoogleMapsRequest was not called');
	return call;
}

beforeEach(() => {
	mockReq.mockReset();
	mockReq.mockResolvedValue({ ok: true });
	mockBin.mockReset();
	mockBin.mockResolvedValue({
		contentType: 'image/png',
		size: 4,
		dataBase64: 'AAAA',
	});
	logSpy.mockClear();
	logSpy.mockImplementation(async () => null);
});

describe('handler path construction', () => {
	it('places.textSearch → POST /places:searchText', async () => {
		await Places.textSearch(ctx(), { textQuery: 'pizza in NYC' });
		expect(mockReq).toHaveBeenCalledWith(
			'/places:searchText',
			'test-key',
			'api_key',
			expect.objectContaining({
				method: 'POST',
				host: 'places',
				body: expect.objectContaining({ textQuery: 'pizza in NYC' }),
			}),
		);
	});

	it('places.nearbySearch → POST /places:searchNearby', async () => {
		await Places.nearbySearch(ctx(), {
			latitude: 1,
			longitude: 2,
			radiusMeters: 500,
		});
		expect(lastCall()[0]).toBe('/places:searchNearby');
		expect(lastCall()[3]).toEqual(
			expect.objectContaining({ host: 'places', method: 'POST' }),
		);
	});

	it('places.autocomplete → POST /places:autocomplete', async () => {
		await Places.autocomplete(ctx(), { input: 'Louvre' });
		expect(lastCall()[0]).toBe('/places:autocomplete');
	});

	it('places.get → GET /places/{id}', async () => {
		await Places.get(ctx(), { placeId: 'ChIJ123' });
		expect(lastCall()[0]).toBe('/places/ChIJ123');
		expect(lastCall()[3]).toEqual(
			expect.objectContaining({ method: 'GET', host: 'places' }),
		);
	});

	it('places.getPhoto binary → /media', async () => {
		await Places.getPhoto(ctx(), {
			name: 'places/p/photos/ph',
			maxWidthPx: 400,
		});
		expect(mockBin).toHaveBeenCalledWith(
			'/places/p/photos/ph/media',
			'test-key',
			'api_key',
			expect.objectContaining({ host: 'places' }),
		);
	});

	it('geocoding.geocode address → geocodeV4', async () => {
		await Geocoding.geocode(ctx(), { address: 'Paris' });
		expect(lastCall()[0]).toContain('/geocode/address/');
		expect(lastCall()[3]).toEqual(
			expect.objectContaining({ host: 'geocodeV4' }),
		);
	});

	it('geocoding.reverse → location path', async () => {
		await Geocoding.reverse(ctx(), { latitude: 1.2, longitude: 3.4 });
		expect(lastCall()[0]).toContain('/geocode/location/');
	});

	it('geocoding.addressLegacy → /geocode/json with key query', async () => {
		await Geocoding.addressLegacy(ctx(), { address: 'Berlin' });
		expect(mockReq).toHaveBeenCalledWith(
			'/geocode/json',
			'test-key',
			'api_key',
			expect.objectContaining({
				host: 'mapsLegacy',
				legacyKeyQuery: true,
			}),
		);
	});

	it('routes.computeRoutes → computeRoutes', async () => {
		await Routes.computeRoutes(ctx(), {
			originAddress: 'A',
			destinationAddress: 'B',
		});
		expect(lastCall()[0]).toBe('/directions/v2:computeRoutes');
		expect(lastCall()[3]).toEqual(
			expect.objectContaining({ host: 'routes', method: 'POST' }),
		);
	});

	it('routes.computeRouteMatrix rejects >625 elements', async () => {
		const origins = Array.from({ length: 26 }, (_, i) => ({
			address: `O${i}`,
		}));
		const destinations = Array.from({ length: 25 }, (_, i) => ({
			address: `D${i}`,
		}));
		await expect(
			Routes.computeRouteMatrix(ctx(), { origins, destinations }),
		).rejects.toThrow(/625/);
	});

	it('routes.computeRouteMatrix → matrix path', async () => {
		await Routes.computeRouteMatrix(ctx(), {
			origins: [{ address: 'A' }],
			destinations: [{ address: 'B' }],
		});
		expect(lastCall()[0]).toBe('/distanceMatrix/v2:computeRouteMatrix');
	});

	it('directions.get legacy uses mapsLegacy when api_key', async () => {
		await Directions.getDirections(ctx('k', 'api_key'), {
			origin: 'A',
			destination: 'B',
		});
		expect(lastCall()[0]).toBe('/directions/json');
		expect(lastCall()[3]).toEqual(
			expect.objectContaining({ host: 'mapsLegacy', legacyKeyQuery: true }),
		);
	});

	it('directions.get modern uses routes when oauth_2', async () => {
		await Directions.getDirections(ctx('tok', 'oauth_2'), {
			origin: 'A',
			destination: 'B',
		});
		expect(lastCall()[0]).toBe('/directions/v2:computeRoutes');
		expect(lastCall()[2]).toBe('oauth_2');
	});

	it('distanceMatrix.legacy → /distancematrix/json', async () => {
		await Directions.distanceMatrixLegacy(ctx(), {
			origins: 'A',
			destinations: 'B',
		});
		expect(lastCall()[0]).toBe('/distancematrix/json');
	});

	it('geolocation.geolocate → POST /geolocate', async () => {
		await Geolocation.geolocate(ctx(), { considerIp: true });
		expect(lastCall()[0]).toBe('/geolocate');
		expect(lastCall()[3]).toEqual(
			expect.objectContaining({ host: 'geolocation', method: 'POST' }),
		);
	});

	it('tiles.createSession → /createSession', async () => {
		await Tiles.createSession(ctx(), { mapType: 'roadmap' });
		expect(lastCall()[0]).toBe('/createSession');
		expect(lastCall()[3]).toEqual(
			expect.objectContaining({ host: 'tiles', method: 'POST' }),
		);
	});

	it('tiles.get2d binary path', async () => {
		await Tiles.get2d(ctx(), { session: 's', z: 1, x: 0, y: 0 });
		expect(mockBin).toHaveBeenCalledWith(
			'/2dtiles/1/0/0',
			'test-key',
			'api_key',
			expect.objectContaining({
				host: 'tiles',
				query: expect.objectContaining({ session: 's' }),
			}),
		);
	});

	it('tiles.get3dRoot → /3dtiles/root.json', async () => {
		await Tiles.get3dRoot(ctx(), {});
		expect(lastCall()[0]).toBe('/3dtiles/root.json');
	});

	it('aerial.renderVideo → /videos:renderVideo', async () => {
		await Aerial.renderVideo(ctx(), {
			address: '1600 Amphitheatre Parkway, Mountain View, CA',
		});
		expect(lastCall()[0]).toBe('/videos:renderVideo');
	});

	it('aerial.lookupVideo by videoId', async () => {
		await Aerial.lookupVideo(ctx(), { videoId: 'abc' });
		expect(lastCall()[0]).toBe('/videos/abc');
	});

	it('maps.embed builds URL without HTTP call', async () => {
		const res = await Embed.build(ctx('my-api-key'), {
			mode: 'place',
			q: 'Space Needle',
		});
		expect(mockReq).not.toHaveBeenCalled();
		expect(res.url).toContain('maps/embed/v1/place');
		expect(res.url).toContain('key=my-api-key');
		expect(res.iframeHtml).toContain('<iframe');
	});
});
