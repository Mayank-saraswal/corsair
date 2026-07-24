import { logEventFromContext } from 'corsair/core';
import type { GoogleMapsAuthMode } from '../client';
import {
	getAuthModeFromCredentialShape,
	makeGoogleMapsBinaryRequest,
	makeGoogleMapsRequest,
} from '../client';
import type { GoogleMapsContext } from '../index';

export function authMode(ctx: GoogleMapsContext): GoogleMapsAuthMode {
	// authType is injected on context at runtime by the plugin binder
	const runtime = ctx as GoogleMapsContext & {
		authType?: string;
		options?: { authType?: string };
	};
	return getAuthModeFromCredentialShape(
		runtime.authType ?? runtime.options?.authType,
	);
}

export function summarize(
	input: Record<string, unknown>,
): Record<string, unknown> {
	// Log only keys + safe scalars — never full free-text queries/addresses at length
	const out: Record<string, unknown> = {};
	for (const [k, v] of Object.entries(input)) {
		if (v === undefined) continue;
		if (typeof v === 'string') {
			out[k] = v.length > 80 ? `${v.slice(0, 80)}…` : v;
		} else if (typeof v === 'number' || typeof v === 'boolean' || v === null) {
			out[k] = v;
		} else if (Array.isArray(v)) {
			out[k] = { length: v.length };
		} else {
			out[k] = '[object]';
		}
	}
	return out;
}

export async function req<T = Record<string, unknown>>(
	ctx: GoogleMapsContext,
	path: string,
	options: Parameters<typeof makeGoogleMapsRequest<T>>[3],
): Promise<T> {
	return makeGoogleMapsRequest<T>(path, ctx.key, authMode(ctx), options);
}

export async function reqBinary(
	ctx: GoogleMapsContext,
	path: string,
	options: Parameters<typeof makeGoogleMapsBinaryRequest>[3],
) {
	return makeGoogleMapsBinaryRequest(path, ctx.key, authMode(ctx), options);
}

export async function complete(
	ctx: GoogleMapsContext,
	event: string,
	input: Record<string, unknown>,
) {
	await logEventFromContext(ctx, event, summarize(input), 'completed');
}

/** Default Places field mask for list/search results */
export const PLACES_LIST_FIELD_MASK =
	'places.id,places.displayName,places.formattedAddress,places.location,places.types,places.businessStatus,places.rating,places.userRatingCount,places.googleMapsUri';

export const PLACE_DETAILS_FIELD_MASK =
	'id,displayName,formattedAddress,location,types,businessStatus,rating,userRatingCount,googleMapsUri,nationalPhoneNumber,websiteUri,regularOpeningHours,photos,addressComponents';
