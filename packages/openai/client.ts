import type { ApiRequestOptions, OpenAPIConfig } from 'corsair/http';
import { request } from 'corsair/http';

export class OpenaiAPIError extends Error {
	constructor(
		message: string,
		public readonly code?: string,
	) {
		super(message);
		this.name = 'OpenaiAPIError';
	}
}

const OPENAI_API_BASE = 'https://api.openai.com/v1';

export async function makeOpenaiRequest<T>(
	endpoint: string,
	apiKey: string,
	options: {
		method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
		body?: Record<string, unknown>;
		query?: Record<string, string | number | boolean | undefined>;
		headers?: Record<string, string>;
	} = {},
): Promise<T> {
	const { method = 'GET', body, query, headers } = options;

	const config: OpenAPIConfig = {
		BASE: OPENAI_API_BASE,
		VERSION: '1.0.0',
		WITH_CREDENTIALS: false,
		CREDENTIALS: 'omit',
		TOKEN: apiKey,
		HEADERS: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
	};

	const requestOptions: ApiRequestOptions = {
		method,
		url: endpoint,
		headers,
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
			throw new OpenaiAPIError(error.message);
		}
		throw new OpenaiAPIError('Unknown error');
	}
}

const buildUrl = (endpoint: string): string => {
	const baseUrl = OPENAI_API_BASE.endsWith('/')
		? OPENAI_API_BASE.slice(0, -1)
		: OPENAI_API_BASE;
	const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
	return `${baseUrl}/${path}`;
};

/**
 * OpenAI's multipart endpoints (e.g. POST /files) need an explicit filename on the
 * uploaded blob part — corsair/http's shared formData builder doesn't pass one through
 * to FormData.append, so this bypasses it with a direct fetch, mirroring
 * packages/box/client.ts's makeBoxUploadRequest.
 */
export async function uploadOpenaiFile<T>(
	endpoint: string,
	apiKey: string,
	options: {
		file: Blob | string;
		fileName: string;
		fields: Record<string, string | undefined>;
	},
): Promise<T> {
	const { file, fileName, fields } = options;
	const blob = typeof file === 'string' ? new Blob([file]) : file;

	const formData = new FormData();
	formData.append('file', blob, fileName);
	for (const [key, value] of Object.entries(fields)) {
		if (value !== undefined) formData.append(key, value);
	}

	const response = await fetch(buildUrl(endpoint), {
		method: 'POST',
		headers: { Authorization: `Bearer ${apiKey}` },
		body: formData,
	});

	if (!response.ok) {
		const text = await response.text();
		throw new OpenaiAPIError(
			`Generic Error: status: ${response.status}; status text: ${response.statusText}; body: "${text}"`,
		);
	}

	return response.json() as Promise<T>;
}

/**
 * File content downloads (e.g. GET /files/{id}/content) return raw bytes, not JSON —
 * fetch directly instead of going through the JSON-oriented request() helper.
 */
export async function downloadOpenaiFile(
	endpoint: string,
	apiKey: string,
): Promise<ArrayBuffer> {
	const response = await fetch(buildUrl(endpoint), {
		method: 'GET',
		headers: { Authorization: `Bearer ${apiKey}` },
	});

	if (!response.ok) {
		const text = await response.text();
		throw new OpenaiAPIError(
			`Generic Error: status: ${response.status}; status text: ${response.statusText}; body: "${text}"`,
		);
	}

	return response.arrayBuffer();
}

/**
 * Endpoints that accept one or more file parts alongside plain fields
 * (audio transcription/translation, image edits/variations, skill uploads,
 * container files). Bypasses corsair/http's shared formData builder for the
 * same filename reason as uploadOpenaiFile.
 */
export async function multipartOpenaiRequest<T>(
	endpoint: string,
	apiKey: string,
	options: {
		files: Array<{ field: string; file: Blob | string; fileName: string }>;
		fields?: Record<string, string | undefined>;
	},
): Promise<T> {
	const { files, fields = {} } = options;

	const formData = new FormData();
	for (const { field, file, fileName } of files) {
		const blob = typeof file === 'string' ? new Blob([file]) : file;
		formData.append(field, blob, fileName);
	}
	for (const [key, value] of Object.entries(fields)) {
		if (value !== undefined) formData.append(key, value);
	}

	const response = await fetch(buildUrl(endpoint), {
		method: 'POST',
		headers: { Authorization: `Bearer ${apiKey}` },
		body: formData,
	});

	if (!response.ok) {
		const text = await response.text();
		throw new OpenaiAPIError(
			`Generic Error: status: ${response.status}; status text: ${response.statusText}; body: "${text}"`,
		);
	}

	return response.json() as Promise<T>;
}

/**
 * Endpoints whose response is raw bytes rather than JSON even though the
 * request itself is a normal JSON POST (e.g. text-to-speech audio output).
 */
export async function requestOpenaiBinary(
	endpoint: string,
	apiKey: string,
	options: { body: Record<string, unknown> },
): Promise<ArrayBuffer> {
	const response = await fetch(buildUrl(endpoint), {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(options.body),
	});

	if (!response.ok) {
		const text = await response.text();
		throw new OpenaiAPIError(
			`Generic Error: status: ${response.status}; status text: ${response.statusText}; body: "${text}"`,
		);
	}

	return response.arrayBuffer();
}
