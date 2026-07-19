import type { ApiRequestOptions, OpenAPIConfig } from 'corsair/http';
import { ApiError, request } from 'corsair/http';

export class HuggingFaceAPIError extends Error {
	constructor(
		message: string,
		public readonly code?: string,
	) {
		super(message);
		this.name = 'HuggingFaceAPIError';
	}
}

/** Hub REST API host (paths include `/api/...`). */
export const HF_HUB_BASE = 'https://huggingface.co';

/** Datasets Server (rows, stats, search, parquet). */
export const HF_DATASETS_SERVER_BASE = 'https://datasets-server.huggingface.co';

/** OpenAI-compatible Inference Providers router. */
export const HF_INFERENCE_BASE = 'https://router.huggingface.co';

/** Inference Endpoints management API. */
export const HF_ENDPOINTS_BASE = 'https://api.endpoints.huggingface.cloud';

export type HuggingFaceQueryValue =
	| string
	| number
	| boolean
	| string[]
	| undefined;

export type HuggingFaceRequestOptions = {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	// body shape varies per endpoint; validated by callers via typed Zod input schemas
	body?: Record<string, unknown> | unknown[];
	query?: Record<string, HuggingFaceQueryValue>;
	/** Override base URL (default Hub). */
	baseUrl?: string;
	/** Extra headers (e.g. Accept for XET / resolve). */
	headers?: Record<string, string>;
	/**
	 * When true (default), send Authorization Bearer if token is non-empty.
	 * Public Hub GETs work without a token.
	 */
	bearer?: boolean;
	/**
	 * When true, do not follow redirects (useful for resolve endpoints).
	 */
	rawText?: boolean;
};

/**
 * HTTP helper for Hugging Face Hub, Datasets Server, and Inference surfaces.
 * Auth: HF user access token or OAuth access token as `Authorization: Bearer`.
 */
export async function makeHuggingFaceRequest<T>(
	endpoint: string,
	accessToken: string | undefined,
	options: HuggingFaceRequestOptions = {},
): Promise<T> {
	const {
		method = 'GET',
		body,
		query,
		baseUrl = HF_HUB_BASE,
		headers: extraHeaders,
		bearer = true,
		rawText = false,
	} = options;

	const headers: Record<string, string> = {
		Accept: 'application/json',
		...extraHeaders,
	};
	if (
		method === 'POST' ||
		method === 'PUT' ||
		method === 'PATCH' ||
		method === 'DELETE'
	) {
		if (!headers['Content-Type'] && body !== undefined) {
			headers['Content-Type'] = 'application/json';
		}
	}
	if (bearer && accessToken) {
		headers.Authorization = `Bearer ${accessToken}`;
	}

	if (rawText) {
		return rawFetch<T>(baseUrl, endpoint, method, headers, body, query);
	}

	const config: OpenAPIConfig = {
		BASE: baseUrl.replace(/\/$/, ''),
		VERSION: '1.0.0',
		WITH_CREDENTIALS: false,
		CREDENTIALS: 'omit',
		HEADERS: headers,
	};

	const requestOptions: ApiRequestOptions = {
		method,
		url: endpoint.startsWith('/') ? endpoint : `/${endpoint}`,
		body:
			method === 'POST' ||
			method === 'PUT' ||
			method === 'PATCH' ||
			// HF DELETE secrets/variables/notifications send a JSON body
			(method === 'DELETE' && body !== undefined)
				? // cast: RequestOptions.body is Record | array; ApiRequestOptions.body is Record
					(body as Record<string, unknown>)
				: undefined,
		mediaType: 'application/json; charset=utf-8',
		query: query as Record<string, string | number | boolean | undefined>,
	};

	try {
		return await request<T>(config, requestOptions);
	} catch (error) {
		// Preserve ApiError so error-handlers can inspect status / Retry-After.
		if (error instanceof ApiError) {
			throw error;
		}
		if (error instanceof Error) {
			throw new HuggingFaceAPIError(error.message);
		}
		throw new HuggingFaceAPIError('Unknown Hugging Face API error');
	}
}

async function rawFetch<T>(
	baseUrl: string,
	endpoint: string,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
	headers: Record<string, string>,
	body: Record<string, unknown> | unknown[] | undefined,
	query: Record<string, HuggingFaceQueryValue> | undefined,
): Promise<T> {
	const url = new URL(
		endpoint.startsWith('http')
			? endpoint
			: `${baseUrl.replace(/\/$/, '')}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`,
	);
	if (query) {
		for (const [k, v] of Object.entries(query)) {
			if (v === undefined || v === null) continue;
			if (Array.isArray(v)) {
				for (const item of v) url.searchParams.append(k, String(item));
			} else {
				url.searchParams.set(k, String(v));
			}
		}
	}
	const res = await fetch(url, {
		method,
		headers,
		body:
			body !== undefined && method !== 'GET' && method !== 'DELETE'
				? JSON.stringify(body)
				: undefined,
		redirect: 'manual',
	});
	const text = await res.text();
	// unknown: body may be JSON, plain text, or a synthetic redirect object
	let parsed: unknown = text;
	try {
		parsed = text ? JSON.parse(text) : {};
	} catch {
		parsed = {
			status: res.status,
			location: res.headers.get('location') ?? undefined,
			// raw body for non-JSON resolve responses
			raw: text.slice(0, 2000),
		};
	}
	if (res.status >= 400) {
		throw new ApiError(
			{ method, url: endpoint },
			{
				url: url.toString(),
				ok: false,
				status: res.status,
				statusText: res.statusText,
				body: text,
			},
			`Hugging Face request failed: ${res.status}`,
		);
	}
	// cast: resolve/SSE/raw responses are validated by endpoint Zod output schemas
	return parsed as T;
}

/** Split `owner/name` repo ids used across Hub APIs. */
export function splitRepoId(repoId: string): {
	namespace: string;
	repo: string;
} {
	const parts = repoId.split('/');
	if (parts.length < 2 || !parts[0] || !parts[1]) {
		throw new HuggingFaceAPIError(
			`Invalid repoId "${repoId}"; expected "namespace/repo"`,
		);
	}
	return {
		namespace: parts[0],
		repo: parts.slice(1).join('/'),
	};
}

export function encodePath(segment: string): string {
	return segment
		.split('/')
		.map((s) => encodeURIComponent(s))
		.join('/');
}
