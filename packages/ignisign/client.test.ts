import { AuthMissingError } from 'corsair/core';
import { ApiError, request } from 'corsair/http';
import {
	IGNISIGN_API_BASE,
	makeIgnisignBinaryRequest,
	makeIgnisignRequest,
	sanitizeData,
} from './client';

jest.mock('corsair/http', () => {
	const actual = jest.requireActual('corsair/http');
	return { ...actual, request: jest.fn() };
});

const mockRequest = jest.mocked(request);

function createApiError(status: number, message: string, retryAfter?: number) {
	return new ApiError(
		{ method: 'POST', url: '/v4/signature-requests/one-call-sign' },
		{
			url: `${IGNISIGN_API_BASE}/v4/signature-requests/one-call-sign`,
			ok: false,
			status,
			statusText: message,
			body: { message, status },
		},
		message,
		retryAfter === undefined ? undefined : { retryAfter },
	);
}

beforeEach(() => {
	mockRequest.mockReset();
	jest.restoreAllMocks();
});

describe('makeIgnisignRequest', () => {
	it('sends Authorization: Bearer <apiKey> and default headers', async () => {
		mockRequest.mockResolvedValue({ _id: 'sig_123' });

		await makeIgnisignRequest(
			'/v4/signature-requests/one-call-sign',
			'sk_dev_app123_sec',
			{
				method: 'POST',
				body: { title: 'Test Request' },
			},
		);

		expect(mockRequest).toHaveBeenCalledTimes(1);
		expect(mockRequest.mock.calls[0]?.[0]).toMatchObject({
			BASE: IGNISIGN_API_BASE,
			HEADERS: {
				Authorization: 'Bearer sk_dev_app123_sec',
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
		expect(mockRequest.mock.calls[0]?.[1]).toEqual(
			expect.objectContaining({
				method: 'POST',
				url: '/v4/signature-requests/one-call-sign',
				body: { title: 'Test Request' },
			}),
		);
	});

	it('makes unauthenticated requests without Authorization header when key is undefined', async () => {
		mockRequest.mockResolvedValue({ status: 'ok' });

		await makeIgnisignRequest('/v4/applications/appId_1/context', undefined, {
			method: 'GET',
		});

		expect(mockRequest).toHaveBeenCalledTimes(1);
		expect(mockRequest.mock.calls[0]?.[0]?.HEADERS).not.toHaveProperty(
			'Authorization',
		);
	});

	it('throws AuthMissingError for an empty key without sending a request', async () => {
		mockRequest.mockResolvedValue({ valid: true });

		// `unknown` because rejection value has no static type.
		const error: unknown = await makeIgnisignRequest(
			'/v4/signature-requests/one-call-sign',
			'',
			{ method: 'POST' },
		).catch((caught: unknown) => caught);

		expect(error).toBeInstanceOf(AuthMissingError);
		expect(mockRequest).not.toHaveBeenCalled();
	});

	it('redacts sensitive fields from ApiError body on failure', async () => {
		const rawApiError = new ApiError(
			{ method: 'POST', url: '/v4/signers' },
			{
				url: `${IGNISIGN_API_BASE}/v4/signers`,
				ok: false,
				status: 400,
				statusText: 'Bad Request',
				body: {
					message: 'Validation failed',
					authSecret: 'super-secret-pass',
					nested: {
						apiKey: 'sk_test_123',
						token: 'secret-token',
					},
				},
			},
			'Validation failed',
		);
		mockRequest.mockRejectedValue(rawApiError);

		// `unknown` because rejection value has no static type; assertions narrow it.
		const error: unknown = await makeIgnisignRequest(
			'/v4/signers',
			'sk_dev_app123_sec',
			{ method: 'POST' },
		).catch((caught: unknown) => caught);

		expect(error).toBeInstanceOf(ApiError);
		const typedError = error as ApiError;
		expect(typedError.status).toBe(400);
		expect(typedError.body).toEqual({
			message: 'Validation failed',
			authSecret: '[REDACTED]',
			nested: {
				apiKey: '[REDACTED]',
				token: '[REDACTED]',
			},
		});
	});

	it('rethrows 429 ApiError preserving status and retryAfter', async () => {
		const rateLimitError = createApiError(429, 'Too many requests', 5000);
		mockRequest.mockRejectedValue(rateLimitError);

		// `unknown` because rejection value has no static type; assertions narrow it.
		const error: unknown = await makeIgnisignRequest(
			'/v4/signature-requests/one-call-sign',
			'test-key',
			{ method: 'POST' },
		).catch((caught: unknown) => caught);

		expect(error).toBeInstanceOf(ApiError);
		const typedError = error as ApiError;
		expect(typedError.status).toBe(429);
		expect(typedError.retryAfter).toBe(5000);
	});
});

describe('sanitizeData', () => {
	it('handles primitives, arrays and objects cleanly without leaking secrets', () => {
		expect(sanitizeData(null)).toBeNull();
		expect(sanitizeData(undefined)).toBeUndefined();
		expect(sanitizeData('sample')).toBe('sample');
		expect(sanitizeData(123)).toBe(123);
		expect(sanitizeData(true)).toBe(true);

		const sensitiveObj = {
			email: 'test@example.com',
			apiKey: 'secret1',
			token: 'secret2',
			authSecret: 'secret3',
			privateKey: 'secret4',
			safeField: 'visible',
		};
		expect(sanitizeData(sensitiveObj)).toEqual({
			email: 'test@example.com',
			apiKey: '[REDACTED]',
			token: '[REDACTED]',
			authSecret: '[REDACTED]',
			privateKey: '[REDACTED]',
			safeField: 'visible',
		});
	});
});

describe('makeIgnisignBinaryRequest', () => {
	it('throws AuthMissingError on empty key without fetching', async () => {
		// `unknown` because rejection value has no static type; assertions narrow it.
		const error: unknown = await makeIgnisignBinaryRequest(
			'/v4/documents/doc_1/file',
			'',
		).catch((caught: unknown) => caught);

		expect(error).toBeInstanceOf(AuthMissingError);
	});

	it('returns binary structure with base64 and contentType on successful fetch', async () => {
		const fakePdfBytes = Buffer.from('%PDF-1.4 mock content');
		const fakeResponse = new Response(fakePdfBytes, {
			status: 200,
			headers: { 'content-type': 'application/pdf' },
		});
		jest.spyOn(global, 'fetch').mockResolvedValue(fakeResponse);

		const result = await makeIgnisignBinaryRequest(
			'/v4/documents/doc_1/file',
			'sk_test_key',
		);

		expect(result).toEqual({
			kind: 'binary',
			contentType: 'application/pdf',
			base64: fakePdfBytes.toString('base64'),
			size: fakePdfBytes.byteLength,
		});
	});

	it('throws ApiError with retryAfter on HTTP 429 binary response', async () => {
		const stream = new ReadableStream({
			start(controller) {
				controller.enqueue(new Uint8Array([1, 2, 3]));
				controller.close();
			},
		});
		const cancelSpy = jest.spyOn(stream, 'cancel');
		const fakeResponse = new Response(stream, {
			status: 429,
			statusText: 'Too Many Requests',
			headers: { 'retry-after': '6' },
		});
		jest.spyOn(global, 'fetch').mockResolvedValue(fakeResponse);

		// `unknown` because rejection value has no static type; assertions narrow it.
		const error: unknown = await makeIgnisignBinaryRequest(
			'/v4/documents/doc_1/file',
			'sk_test_key',
		).catch((caught: unknown) => caught);

		expect(error).toBeInstanceOf(ApiError);
		if (error instanceof ApiError) {
			expect(error.status).toBe(429);
			expect(error.retryAfter).toBe(6000);
		}
		expect(cancelSpy).toHaveBeenCalled();
	});
});

describe('real-transport rate-limit handling', () => {
	it('extracts Retry-After correctly in real transport', async () => {
		// `unknown` because jest.requireActual returns untrusted module surface.
		const realHttp: unknown = jest.requireActual('corsair/http');
		const realRequest = (realHttp as { request: typeof request }).request;

		jest.spyOn(global, 'fetch').mockImplementation(() =>
			Promise.resolve(
				new Response(JSON.stringify({ message: 'Rate limited' }), {
					status: 429,
					statusText: 'Too Many Requests',
					headers: {
						'Content-Type': 'application/json',
						'Retry-After': '4',
					},
				}),
			),
		);

		// `unknown` because rejection value has no static type; assertions narrow it.
		const error: unknown = await realRequest(
			{
				BASE: 'https://api.ignisign.io',
				VERSION: '4.0.0',
				HEADERS: {},
			},
			{
				method: 'GET',
				url: '/v4/signature-requests',
			},
			{
				rateLimitConfig: {
					enabled: true,
					maxRetries: 0,
					initialRetryDelay: 0,
					backoffMultiplier: 1,
					headerNames: { retryAfter: 'retry-after' },
				},
			},
		).catch((caught: unknown) => caught);

		expect(error).toBeInstanceOf(ApiError);
		const typedError = error as ApiError;
		expect(typedError.status).toBe(429);
		expect(typedError.retryAfter).toBe(4000);
	});
});
