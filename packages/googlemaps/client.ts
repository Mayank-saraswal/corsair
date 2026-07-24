import type { ApiRequestOptions, OpenAPIConfig } from 'corsair/http';
import { ApiError, request } from 'corsair/http';

export class GoogleMapsAPIError extends Error {
	constructor(
		message: string,
		public readonly code?: string | number,
	) {
		super(message);
		this.name = 'GoogleMapsAPIError';
	}
}

/**
 * Google Maps Platform is split across multiple hosts.
 * `host` selects which base URL a request targets.
 */
export type GoogleMapsHost =
	| 'places'
	| 'routes'
	| 'geocodeV4'
	| 'mapsLegacy'
	| 'geolocation'
	| 'tiles'
	| 'aerial';

const GOOGLEMAPS_API_BASES: Record<GoogleMapsHost, string> = {
	places: 'https://places.googleapis.com/v1',
	routes: 'https://routes.googleapis.com',
	geocodeV4: 'https://geocode.googleapis.com/v4beta',
	mapsLegacy: 'https://maps.googleapis.com/maps/api',
	geolocation: 'https://www.googleapis.com/geolocation/v1',
	tiles: 'https://tile.googleapis.com/v1',
	aerial: 'https://aerialview.googleapis.com/v1',
};

export type GoogleMapsAuthMode = 'api_key' | 'oauth_2';

export type GoogleMapsQueryValue =
	| string
	| number
	| boolean
	| (string | number)[]
	| undefined;

type GoogleMapsRequestOptions = {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	// body shape varies per endpoint; callers validate with Zod input schemas
	body?: Record<string, unknown>;
	query?: Record<string, GoogleMapsQueryValue>;
	host?: GoogleMapsHost;
	/** Extra headers (e.g. X-Goog-FieldMask for Places) */
	headers?: Record<string, string>;
	/** When true, append credential as `key` query (legacy Maps JS-style hosts) */
	legacyKeyQuery?: boolean;
};

/**
 * Auth credential is either a Google Maps API key (api_key) or an OAuth access token (oauth_2).
 * Callers pass whatever keyBuilder returned as `credential`.
 */
export async function makeGoogleMapsRequest<T>(
	endpoint: string,
	credential: string,
	authMode: GoogleMapsAuthMode,
	options: GoogleMapsRequestOptions = {},
): Promise<T> {
	const {
		method = 'GET',
		body,
		query = {},
		host = 'places',
		headers = {},
		legacyKeyQuery = false,
	} = options;

	const authHeaders: Record<string, string> = {
		'Content-Type': 'application/json',
		...headers,
	};

	const finalQuery: Record<string, GoogleMapsQueryValue> = { ...query };

	if (authMode === 'api_key') {
		authHeaders['X-Goog-Api-Key'] = credential;
		if (legacyKeyQuery) {
			finalQuery.key = credential;
		}
	} else {
		authHeaders.Authorization = `Bearer ${credential}`;
	}

	const config: OpenAPIConfig = {
		BASE: GOOGLEMAPS_API_BASES[host],
		VERSION: '1.0.0',
		WITH_CREDENTIALS: false,
		CREDENTIALS: 'omit',
		HEADERS: authHeaders,
	};

	const requestOptions: ApiRequestOptions = {
		method,
		url: endpoint,
		body:
			method === 'POST' || method === 'PUT' || method === 'PATCH'
				? body
				: undefined,
		mediaType: 'application/json; charset=utf-8',
		query: finalQuery as Record<
			string,
			string | number | boolean | (string | number)[] | undefined
		>,
	};

	try {
		// Maps APIs return free-form JSON; cast to caller-supplied T after transport parse
		return (await request(config, requestOptions)) as T;
	} catch (error) {
		if (error instanceof ApiError) throw error;
		if (error instanceof Error) {
			throw new GoogleMapsAPIError(error.message);
		}
		throw new GoogleMapsAPIError('Unknown Google Maps API error');
	}
}

/**
 * Binary GET (map tiles, place photos). Returns base64 payload for agent-safe transport.
 */
export async function makeGoogleMapsBinaryRequest(
	endpoint: string,
	credential: string,
	authMode: GoogleMapsAuthMode,
	options: {
		host?: GoogleMapsHost;
		query?: Record<string, GoogleMapsQueryValue>;
		headers?: Record<string, string>;
		legacyKeyQuery?: boolean;
	} = {},
): Promise<{
	contentType: string;
	size: number;
	dataBase64: string;
}> {
	const {
		host = 'tiles',
		query = {},
		headers = {},
		legacyKeyQuery = false,
	} = options;

	const url = new URL(endpoint, GOOGLEMAPS_API_BASES[host]);
	for (const [k, v] of Object.entries(query)) {
		if (v === undefined) continue;
		if (Array.isArray(v)) {
			for (const item of v) url.searchParams.append(k, String(item));
		} else {
			url.searchParams.set(k, String(v));
		}
	}
	if (authMode === 'api_key' && legacyKeyQuery) {
		url.searchParams.set('key', credential);
	}

	const reqHeaders: Record<string, string> = { ...headers };
	if (authMode === 'api_key') {
		reqHeaders['X-Goog-Api-Key'] = credential;
	} else {
		reqHeaders.Authorization = `Bearer ${credential}`;
	}

	const res = await fetch(url.toString(), {
		method: 'GET',
		headers: reqHeaders,
	});

	if (!res.ok) {
		const text = await res.text().catch(() => '');
		throw new GoogleMapsAPIError(
			`Google Maps binary request failed: ${res.status} ${res.statusText}${text ? ` — ${text.slice(0, 200)}` : ''}`,
			res.status,
		);
	}

	const buf = Buffer.from(await res.arrayBuffer());
	return {
		contentType: res.headers.get('content-type') ?? 'application/octet-stream',
		size: buf.byteLength,
		dataBase64: buf.toString('base64'),
	};
}

export function getAuthModeFromCredentialShape(
	authType: string | undefined,
): GoogleMapsAuthMode {
	return authType === 'oauth_2' ? 'oauth_2' : 'api_key';
}
