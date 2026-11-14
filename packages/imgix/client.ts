import { AuthMissingError } from 'corsair/core';
import type { ApiRequestOptions, OpenAPIConfig } from 'corsair/http';
import { ApiError, request } from 'corsair/http';

/**
 * Base URL of the Imgix Management API v1, documented at
 * https://docs.imgix.com/apis/management
 */
export const IMGIX_API_BASE = 'https://api.imgix.com/api/v1';

export class ImgixAPIError extends Error {
	constructor(
		message: string,
		public readonly code?: string,
	) {
		super(message);
		this.name = 'ImgixAPIError';
	}
}

export type ImgixQuery = Record<string, string | number | boolean | undefined>;

export type ImgixRequest = {
	method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
	path: string;
	query?: ImgixQuery;
	// Body is endpoint-specific JSON or binary data (validated by input schemas)
	body?: unknown;
	headers?: Record<string, string>;
};

// Sensitive credential fields that may be passed when configuring sources
// (such as S3 secret access keys, Azure access keys, or GCS private keys).
const SENSITIVE_REQUEST_FIELDS = new Set([
	'accesskeyid',
	'apikey',
	'authorization',
	'azureaccesskey',
	'clientemail',
	'password',
	'privatekey',
	'projectid',
	's3accesskey',
	's3secretkey',
	'sastoken',
	'secret',
	'secretaccesskey',
	'sessiontoken',
	'storageaccesskey',
	'token',
]);

function normalizedFieldName(field: string): string {
	return field.replace(/[_-]/g, '').toLowerCase();
}

// `unknown` because provider/request JSON is untrusted until runtime-checked.
function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// `unknown` because request bodies contain arbitrary nested JSON; this helper
// walks and narrows values recursively without assuming a concrete shape.
function redactCredentialFields(value: unknown): {
	value: unknown;
	changed: boolean;
} {
	if (Array.isArray(value)) {
		const items = value.map(redactCredentialFields);
		if (!items.some((item) => item.changed)) return { value, changed: false };
		return { value: items.map((item) => item.value), changed: true };
	}
	if (!isRecord(value)) return { value, changed: false };

	let changed = false;
	const entries = Object.entries(value).map(([field, fieldValue]) => {
		if (SENSITIVE_REQUEST_FIELDS.has(normalizedFieldName(field))) {
			changed = true;
			return [field, '[REDACTED]'] as const;
		}
		const redacted = redactCredentialFields(fieldValue);
		changed ||= redacted.changed;
		return [field, redacted.value] as const;
	});
	return changed
		? { value: Object.fromEntries(entries), changed }
		: { value, changed };
}

/**
 * Sends a request to the Imgix Management API.
 *
 * Auth is `Authorization: Bearer <API key>`, documented at
 * https://docs.imgix.com/apis/management.
 */
export async function makeImgixRequest<T>(
	apiKey: string | undefined,
	{ method = 'GET', path, query, body, headers }: ImgixRequest,
): Promise<T> {
	// An explicitly empty key means no credentials are configured
	if (apiKey !== undefined && apiKey.length === 0) {
		throw new AuthMissingError('imgix', 'api_key');
	}

	const authHeaders: Record<string, string> = apiKey
		? { Authorization: `Bearer ${apiKey}` }
		: {};

	const isOctetStream =
		headers?.['Content-Type'] === 'application/octet-stream';
	const contentType = headers?.['Content-Type'] ?? 'application/vnd.api+json';

	const config: OpenAPIConfig = {
		BASE: IMGIX_API_BASE,
		VERSION: '1.0.0',
		WITH_CREDENTIALS: false,
		CREDENTIALS: 'omit',
		HEADERS: {
			'Content-Type': contentType,
			Accept: 'application/vnd.api+json, application/json',
			...authHeaders,
			...headers,
		},
	};

	const requestOptions: ApiRequestOptions = {
		method,
		url: path,
		body: method !== 'GET' && body !== undefined ? body : undefined,
		mediaType: isOctetStream
			? 'application/octet-stream'
			: 'application/json; charset=utf-8',
		query,
	};

	try {
		return await request<T>(config, requestOptions);
	} catch (error) {
		if (error instanceof ApiError) {
			const requestBody = redactCredentialFields(error.request.body);
			if (requestBody.changed) {
				const sanitizedError = new ApiError(
					{ ...error.request, body: requestBody.value },
					{
						url: error.url,
						ok: false,
						status: error.status,
						statusText: error.statusText,
						body: error.body,
					},
					error.message,
					{
						retryAfter: error.retryAfter,
						rateLimitReset: error.rateLimitReset,
						rateLimitRemaining: error.rateLimitRemaining,
						rateLimitLimit: error.rateLimitLimit,
					},
				);
				sanitizedError.stack = error.stack;
				throw sanitizedError;
			}
		}
		if (error instanceof Error) {
			throw error;
		}
		throw new ImgixAPIError('Unknown error');
	}
}
