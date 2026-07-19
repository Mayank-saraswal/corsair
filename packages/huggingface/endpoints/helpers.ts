import type { HuggingFaceRequestOptions } from '../client';
import { makeHuggingFaceRequest } from '../client';

/**
 * Shared request helper for endpoint modules (token from plugin keyBuilder).
 */
export async function req<T>(
	ctx: { key: string },
	endpoint: string,
	options: HuggingFaceRequestOptions = {},
): Promise<T> {
	return makeHuggingFaceRequest<T>(endpoint, ctx.key || undefined, options);
}

/**
 * Redact sensitive fields before logEventFromContext (secrets, chat, commit ops).
 * `input` is unknown because handlers receive Zod-inferred objects of many shapes.
 */
export function summarize(
	// endpoint inputs vary per op; accept unknown and narrow for redaction
	input: unknown,
): Record<string, unknown> {
	if (!input || typeof input !== 'object') return {};
	// cast: object branch after typeof check — entries need a string-key record
	const out: Record<string, unknown> = {};
	for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
		if (
			k === 'value' ||
			k === 'secret' ||
			k === 'messages' ||
			k === 'operations' ||
			k === 'files'
		) {
			out[k] = '[redacted]';
		} else {
			out[k] = v;
		}
	}
	return out;
}
