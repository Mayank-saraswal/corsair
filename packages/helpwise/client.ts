import { AuthMissingError } from 'corsair/core';
import type { ApiRequestOptions, OpenAPIConfig } from 'corsair/http';
import { request } from 'corsair/http';

export class HelpwiseAPIError extends Error {
	constructor(
		message: string,
		public readonly code?: string,
	) {
		super(message);
		this.name = 'HelpwiseAPIError';
	}
}

export const HELPWISE_API_BASE = 'https://apis.helpwise.io';
export const HELPWISE_APP_BASE = 'https://app.helpwise.io';

export type HelpwiseCredentials = {
	apiKey: string;
	apiSecret: string;
};

/**
 * Parses Helpwise credentials from either JSON `{"apiKey": "...", "apiSecret": "..."}`
 * or colon-separated `"API_KEY:API_SECRET"`.
 */
export function splitKeyAndSecret(value: string): HelpwiseCredentials | null {
	if (!value) return null;

	const trimmed = value.trim();
	if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
		try {
			// `unknown` because JSON parsing yields untrusted payload that must be checked.
			const parsed: unknown = JSON.parse(trimmed);
			if (
				parsed &&
				typeof parsed === 'object' &&
				'apiKey' in parsed &&
				'apiSecret' in parsed &&
				typeof (parsed as { apiKey: unknown }).apiKey === 'string' &&
				typeof (parsed as { apiSecret: unknown }).apiSecret === 'string'
			) {
				const creds = parsed as HelpwiseCredentials;
				if (creds.apiKey.trim() && creds.apiSecret.trim()) {
					return {
						apiKey: creds.apiKey.trim(),
						apiSecret: creds.apiSecret.trim(),
					};
				}
			}
		} catch {
			// Invalid JSON
		}
		return null;
	}

	const colon = trimmed.indexOf(':');
	if (colon <= 0 || colon === trimmed.length - 1) {
		return null;
	}

	const apiKey = trimmed.slice(0, colon).trim();
	const apiSecret = trimmed.slice(colon + 1).trim();
	if (!apiKey || !apiSecret) {
		return null;
	}

	return { apiKey, apiSecret };
}

export type HelpwiseRequestOptions = {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	// `unknown` because request bodies vary by endpoint and are validated by Zod schemas prior to this call.
	body?: Record<string, unknown> | unknown[];
	query?: Record<string, string | number | boolean | undefined>;
	headers?: Record<string, string>;
	baseUrl?: string;
};

export async function makeHelpwiseRequest<T>(
	endpoint: string,
	credentialsString?: string,
	options: HelpwiseRequestOptions = {},
): Promise<T> {
	const { method = 'GET', body, query, headers = {}, baseUrl } = options;

	if (credentialsString !== undefined && credentialsString.length === 0) {
		throw new AuthMissingError('helpwise', 'api_key');
	}

	if (!credentialsString) {
		throw new AuthMissingError('helpwise', 'api_key');
	}

	const credentials = splitKeyAndSecret(credentialsString);
	if (!credentials) {
		throw new AuthMissingError('helpwise', 'api_key');
	}

	const config: OpenAPIConfig = {
		BASE: baseUrl ?? HELPWISE_API_BASE,
		VERSION: '1.0.0',
		WITH_CREDENTIALS: false,
		CREDENTIALS: 'omit',
		USERNAME: credentials.apiKey,
		PASSWORD: credentials.apiSecret,
		HEADERS: {
			'Content-Type': 'application/json',
			...headers,
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
		if (error instanceof Error) {
			throw error;
		}
		throw new HelpwiseAPIError('Unknown error');
	}
}
