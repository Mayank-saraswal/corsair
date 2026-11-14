import { AuthMissingError } from 'corsair/core';
import { ApiError, request } from 'corsair/http';
import { IMGIX_API_BASE, ImgixAPIError, makeImgixRequest } from './client';
import { errorHandlers } from './error-handlers';

jest.mock('corsair/http', () => {
	const actual = jest.requireActual('corsair/http');
	return { ...actual, request: jest.fn() };
});

const mockedRequest = jest.mocked(request);

function makeApiError(status: number, message: string, retryAfter?: number) {
	return new ApiError(
		{ method: 'GET', url: 'sources' },
		{
			url: 'https://api.imgix.com/api/v1/sources',
			ok: false,
			status,
			statusText: message,
			body: { message },
		},
		message,
		retryAfter === undefined ? undefined : { retryAfter },
	);
}

beforeEach(() => {
	mockedRequest.mockReset();
});

describe('makeImgixRequest', () => {
	it('uses the v1 base URL and Authorization: Bearer <key>', async () => {
		mockedRequest.mockResolvedValue({ data: [] });

		await makeImgixRequest('fixture-key', {
			method: 'GET',
			path: 'sources',
		});

		expect(mockedRequest).toHaveBeenCalledTimes(1);
		expect(mockedRequest.mock.calls[0]?.[0]).toMatchObject({
			BASE: IMGIX_API_BASE,
			VERSION: '1.0.0',
			HEADERS: expect.objectContaining({
				Authorization: 'Bearer fixture-key',
				'Content-Type': 'application/vnd.api+json',
				Accept: 'application/vnd.api+json, application/json',
			}),
		});
		expect(mockedRequest.mock.calls[0]?.[1]).toEqual(
			expect.objectContaining({
				method: 'GET',
				url: 'sources',
			}),
		);
	});

	it('omits Authorization header when apiKey is undefined', async () => {
		mockedRequest.mockResolvedValue({ data: [] });

		await makeImgixRequest(undefined, {
			method: 'GET',
			path: 'sources',
		});

		expect(mockedRequest.mock.calls[0]?.[0]?.HEADERS).not.toHaveProperty(
			'Authorization',
		);
	});

	it('throws AuthMissingError when apiKey is explicitly empty without sending request', async () => {
		await expect(
			makeImgixRequest('', { method: 'GET', path: 'sources' }),
		).rejects.toThrow(AuthMissingError);

		expect(mockedRequest).not.toHaveBeenCalled();
	});

	it('passes custom query, body, and octet-stream headers correctly', async () => {
		mockedRequest.mockResolvedValue({ data: {} });
		const buffer = Buffer.from('test-image-binary');

		await makeImgixRequest('fixture-key', {
			method: 'POST',
			path: 'sources/src_123/upload/image.png',
			query: { overwrite: true },
			body: buffer,
			headers: { 'Content-Type': 'application/octet-stream' },
		});

		expect(mockedRequest.mock.calls[0]?.[0]?.HEADERS).toMatchObject({
			'Content-Type': 'application/octet-stream',
		});
		expect(mockedRequest.mock.calls[0]?.[1]).toEqual(
			expect.objectContaining({
				method: 'POST',
				url: 'sources/src_123/upload/image.png',
				body: buffer,
				mediaType: 'application/octet-stream',
				query: { overwrite: true },
			}),
		);
	});

	it('preserves 429 status and retryAfter on rate limit error', async () => {
		const error = makeApiError(429, 'Too Many Requests', 2500);
		mockedRequest.mockRejectedValue(error);

		// `unknown` because the thrown error type is untrusted until narrowed
		const caught: unknown = await makeImgixRequest('fixture-key', {
			method: 'GET',
			path: 'sources',
		}).catch((e: unknown) => e);

		expect(caught).toBe(error);
		expect(errorHandlers.RATE_LIMIT_ERROR.match(error)).toBe(true);
		await expect(errorHandlers.RATE_LIMIT_ERROR.handler()).resolves.toEqual({
			maxRetries: 0,
		});
	});

	it('redacts sensitive credentials from request body in propagated ApiError', async () => {
		const requestBody = {
			name: 'My S3 Source',
			deployment: {
				type: 's3',
				s3_bucket: 'my-bucket',
				s3_access_key: 'AKIAEXAMPLEKEY',
				s3_secret_key: 'top-secret-s3-key',
				azure_access_key: 'azure-key-123',
				private_key: 'rsa-private-key-data',
				token: 'secret-token-val',
			},
		};

		const error = new ApiError(
			{ method: 'POST', url: 'sources', body: requestBody },
			{
				url: 'https://api.imgix.com/api/v1/sources',
				ok: false,
				status: 422,
				statusText: 'Unprocessable Entity',
				body: { errors: [{ title: 'Invalid deployment' }] },
			},
			'Unprocessable Entity',
			{
				retryAfter: 1200,
				rateLimitReset: 1_700_000_000,
				rateLimitRemaining: 5,
				rateLimitLimit: 100,
			},
		);
		mockedRequest.mockRejectedValue(error);

		// `unknown` because a rejected value is only narrowed by assertions below
		let propagated: unknown;
		try {
			await makeImgixRequest('fixture-key', {
				method: 'POST',
				path: 'sources',
				body: requestBody,
			});
		} catch (err: unknown) {
			propagated = err;
		}

		expect(propagated).toBeInstanceOf(ApiError);
		if (propagated instanceof ApiError) {
			expect(propagated.status).toBe(422);
			expect(propagated.retryAfter).toBe(1200);
			expect(propagated.request.body).toEqual({
				name: 'My S3 Source',
				deployment: {
					type: 's3',
					s3_bucket: 'my-bucket',
					s3_access_key: '[REDACTED]',
					s3_secret_key: '[REDACTED]',
					azure_access_key: '[REDACTED]',
					private_key: '[REDACTED]',
					token: '[REDACTED]',
				},
			});
		}
	});

	it('rethrows generic Error instances unchanged', async () => {
		const error = new Error('Network timeout');
		mockedRequest.mockRejectedValue(error);

		await expect(
			makeImgixRequest('fixture-key', { method: 'GET', path: 'sources' }),
		).rejects.toBe(error);
	});

	it('wraps non-Error rejections in ImgixAPIError', async () => {
		mockedRequest.mockRejectedValue('unexpected string rejection');

		await expect(
			makeImgixRequest('fixture-key', { method: 'GET', path: 'sources' }),
		).rejects.toThrow(ImgixAPIError);
	});

	it('uses real transport to parse 429 Retry-After correctly', async () => {
		const actualHttp = jest.requireActual('corsair/http') as {
			request: typeof request;
		};

		const mockResponse = {
			ok: false,
			status: 429,
			statusText: 'Too Many Requests',
			headers: {
				get: (name: string) => {
					if (name.toLowerCase() === 'retry-after') return '4';
					return null;
				},
			},
			json: async () => ({ error: 'rate limited' }),
			text: async () => JSON.stringify({ error: 'rate limited' }),
			clone: function () {
				return this;
			},
		};

		const originalFetch = global.fetch;
		global.fetch = jest.fn().mockResolvedValue(mockResponse);

		try {
			// `unknown` because the rejection reason has no static type until narrowed
			const err: unknown = await actualHttp
				.request(
					{
						BASE: IMGIX_API_BASE,
						VERSION: '1.0.0',
						WITH_CREDENTIALS: false,
						CREDENTIALS: 'omit',
						HEADERS: { 'Content-Type': 'application/json' },
					},
					{
						method: 'GET',
						url: 'sources',
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
				)
				.catch((e: unknown) => e);

			expect(err).toBeInstanceOf(ApiError);
			if (err instanceof ApiError) {
				expect(err.status).toBe(429);
				expect(err.retryAfter).toBe(4000);
			}
		} finally {
			global.fetch = originalFetch;
		}
	});
});
