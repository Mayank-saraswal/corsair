import { AuthMissingError } from 'corsair/core';
import type {
	ApiRequestOptions,
	ApiResult,
	OpenAPIConfig,
	RateLimitConfig,
} from 'corsair/http';
import { ApiError, request } from 'corsair/http';

export const THINKIFIC_API_BASE = 'https://api.thinkific.com/api/public/v1';

export const THINKIFIC_RATE_LIMIT_CONFIG = {
	enabled: true,
	maxRetries: 3,
	initialRetryDelay: 1000,
	backoffMultiplier: 2,
	headerNames: {
		retryAfter: 'Retry-After',
		resetTime: 'RateLimit-Reset',
	},
} satisfies RateLimitConfig;

export type ThinkificHttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type ThinkificQuery = Record<
	string,
	string | number | boolean | undefined
>;

// `unknown` because the provider response remains untrusted until the operation output schema parses it.
export async function makeThinkificRequest(
	endpoint: string,
	apiKey: string | undefined,
	subdomain: string | undefined,
	options: {
		method: ThinkificHttpMethod;
		query?: ThinkificQuery;
		// `unknown` because endpoint request bodies have distinct Zod-inferred shapes and are validated before transport.
		body?: unknown;
	},
): Promise<unknown> {
	if (!apiKey) {
		throw new AuthMissingError('thinkific', 'api_key');
	}
	if (!subdomain?.trim()) {
		throw new AuthMissingError('thinkific', 'api_key');
	}

	const config: OpenAPIConfig = {
		BASE: THINKIFIC_API_BASE,
		VERSION: 'v1',
		WITH_CREDENTIALS: false,
		CREDENTIALS: 'omit',
		HEADERS: {
			'Content-Type': 'application/json',
			'X-Auth-API-Key': apiKey,
			'X-Auth-Subdomain': subdomain.trim(),
		},
	};

	const requestOptions: ApiRequestOptions = {
		method: options.method,
		url: endpoint,
		body: options.body,
		mediaType: 'application/json; charset=utf-8',
		query: options.query,
	};

	try {
		// `unknown` because the shared transport returns unvalidated provider JSON.
		return await request<unknown>(config, requestOptions, {
			rateLimitConfig: THINKIFIC_RATE_LIMIT_CONFIG,
		});
	} catch (error: unknown) {
		// `unknown` because transport failures are not guaranteed to be Error instances.
		if (error instanceof ApiError) {
			const sanitizedRequest: ApiRequestOptions = {
				...error.request,
				url: '/thinkific/request',
				path: undefined,
				query: undefined,
				cookies: undefined,
				headers: undefined,
				formData: undefined,
				body: undefined,
			};
			const sanitizedResponse: ApiResult = {
				url: '/thinkific/request',
				ok: false,
				status: error.status,
				statusText: error.statusText,
				body: undefined,
			};

			throw new ApiError(
				sanitizedRequest,
				sanitizedResponse,
				`Thinkific API request failed with status ${error.status}`,
				{
					retryAfter: error.retryAfter,
					rateLimitReset: error.rateLimitReset,
					rateLimitRemaining: error.rateLimitRemaining,
					rateLimitLimit: error.rateLimitLimit,
				},
			);
		}

		throw new Error('Thinkific API request failed');
	}
}
