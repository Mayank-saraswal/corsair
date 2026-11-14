import { AuthMissingError } from 'corsair/core';
import type { ApiRequestOptions, OpenAPIConfig } from 'corsair/http';
import { ApiError, request } from 'corsair/http';

export class IgnisignAPIError extends Error {
	constructor(
		message: string,
		public readonly code?: string,
	) {
		super(message);
		this.name = 'IgnisignAPIError';
	}
}

export const IGNISIGN_API_BASE = 'https://api.ignisign.io';
export const IGNISIGN_TIMEOUT_MS = 30000;

// Set of field names to sanitize in error outputs and request logs.
const SENSITIVE_FIELD_NAMES = new Set([
	'apikey',
	'token',
	'secret',
	'password',
	'authorization',
	'privatekey',
	'codeverifier',
	'clientsecret',
	'authsecret',
]);

// `unknown` because untrusted input is inspected recursively before narrowing.
export function sanitizeData(value: unknown): unknown {
	if (value === null || value === undefined) {
		return value;
	}
	if (typeof value === 'string') {
		return value;
	}
	if (typeof value === 'number' || typeof value === 'boolean') {
		return value;
	}
	if (Array.isArray(value)) {
		// `unknown` because array elements must be sanitized recursively.
		return value.map((item: unknown) => sanitizeData(item));
	}
	if (typeof value === 'object') {
		const result: Record<string, unknown> = {};
		// `unknown` because object values must be sanitized recursively.
		for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
			const normalizedKey = key.toLowerCase().replace(/[-_]/g, '');
			if (SENSITIVE_FIELD_NAMES.has(normalizedKey)) {
				result[key] = '[REDACTED]';
			} else {
				result[key] = sanitizeData(val);
			}
		}
		return result;
	}
	return value;
}

// `unknown` because error bodies returned from the provider are untrusted JSON.
function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseRetryAfterMs(headerValue: string | null): number | undefined {
	if (!headerValue) return undefined;
	const seconds = Number.parseInt(headerValue, 10);
	if (Number.isFinite(seconds) && seconds >= 0) {
		return seconds * 1000;
	}
	const dateMs = Date.parse(headerValue);
	if (Number.isFinite(dateMs)) {
		const diff = dateMs - Date.now();
		return diff > 0 ? diff : 0;
	}
	return undefined;
}

export type BinaryResponse = {
	kind: 'binary';
	contentType: string;
	base64: string;
	size?: number;
};

export async function makeIgnisignRequest<T>(
	endpoint: string,
	apiKey?: string,
	options: {
		method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
		// Bodies are endpoint-specific JSON validated by Zod schemas before send.
		body?: Record<string, unknown>;
		query?: Record<string, string | number | boolean | undefined>;
	} = {},
): Promise<T> {
	const { method = 'GET', body, query } = options;

	// An explicitly empty key means missing credentials.
	if (apiKey !== undefined && apiKey.length === 0) {
		throw new AuthMissingError('ignisign', 'api_key');
	}

	const authHeaders: Record<string, string> = apiKey
		? { Authorization: `Bearer ${apiKey}` }
		: {};

	const config: OpenAPIConfig = {
		BASE: IGNISIGN_API_BASE,
		VERSION: '4.0.0',
		WITH_CREDENTIALS: false,
		CREDENTIALS: 'omit',
		HEADERS: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			...authHeaders,
		},
	};

	const requestOptions: ApiRequestOptions = {
		method,
		url: endpoint,
		body:
			method === 'POST' || method === 'PUT' || method === 'PATCH'
				? body
				: undefined,
		mediaType: 'application/json; charset=utf-8',
		query,
	};

	try {
		return await request<T>(config, requestOptions);
	} catch (error) {
		if (error instanceof ApiError) {
			// `unknown` because error.body has no static type from corsair/http.
			const rawBody: unknown = error.body;
			const sanitizedBody = sanitizeData(rawBody);
			let errorMessage = error.message;
			if (
				isRecord(sanitizedBody) &&
				typeof sanitizedBody.message === 'string'
			) {
				errorMessage = sanitizedBody.message;
			}
			throw new ApiError(
				{ method, url: endpoint },
				{
					url: `${config.BASE}${endpoint}`,
					ok: false,
					status: error.status,
					statusText: error.statusText,
					body: sanitizedBody,
				},
				errorMessage,
				{
					retryAfter: error.retryAfter,
					rateLimitReset: error.rateLimitReset,
					rateLimitRemaining: error.rateLimitRemaining,
					rateLimitLimit: error.rateLimitLimit,
				},
			);
		}
		if (error instanceof Error) {
			throw error;
		}
		throw new IgnisignAPIError('Unknown error');
	}
}

export async function makeIgnisignBinaryRequest(
	endpoint: string,
	apiKey?: string,
	options: {
		method?: 'GET' | 'POST';
		query?: Record<string, string | number | boolean | undefined>;
	} = {},
): Promise<BinaryResponse> {
	const { method = 'GET', query } = options;

	if (apiKey !== undefined && apiKey.length === 0) {
		throw new AuthMissingError('ignisign', 'api_key');
	}

	const url = new URL(`${IGNISIGN_API_BASE}${endpoint}`);
	if (query) {
		for (const [key, val] of Object.entries(query)) {
			if (val !== undefined) {
				url.searchParams.set(key, String(val));
			}
		}
	}

	const headers: Record<string, string> = {
		Accept: '*/*',
	};
	if (apiKey) {
		headers.Authorization = `Bearer ${apiKey}`;
	}

	const response = await fetch(url.toString(), {
		method,
		headers,
		signal: AbortSignal.timeout(IGNISIGN_TIMEOUT_MS),
	});

	if (!response.ok) {
		const retryAfter =
			response.status === 429
				? parseRetryAfterMs(response.headers.get('retry-after'))
				: undefined;

		// Best-effort body cancellation so stream is released.
		// `unknown` because cancellation rejection has no static type.
		await response.body?.cancel().catch((_e: unknown) => undefined);

		throw new ApiError(
			{ method, url: endpoint },
			{
				url: url.toString(),
				ok: false,
				status: response.status,
				statusText: response.statusText,
				body: { status: response.status, statusText: response.statusText },
			},
			`Ignisign binary download failed with status ${response.status}`,
			retryAfter !== undefined ? { retryAfter } : undefined,
		);
	}

	const buffer = Buffer.from(await response.arrayBuffer());
	const contentType =
		response.headers.get('content-type') || 'application/octet-stream';

	return {
		kind: 'binary',
		contentType,
		base64: buffer.toString('base64'),
		size: buffer.byteLength,
	};
}
