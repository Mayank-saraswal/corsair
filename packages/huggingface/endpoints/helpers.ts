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
 */
export function summarize(input: unknown): Record<string, unknown> {
	if (!input || typeof input !== 'object') return {};
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
