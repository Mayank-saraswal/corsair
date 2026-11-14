import { AuthMissingError } from 'corsair/core';
import { ApiError } from 'corsair/http';
import { makeTrustpilotRequest } from './client';

const apiKey = 'trustpilot-test-api-key';
const accessToken = 'trustpilot-test-access-token';

describe('Trustpilot HTTP client', () => {
	afterEach(() => jest.restoreAllMocks());

	it('uses the business API base and the documented apikey header', async () => {
		const fetchMock = jest
			.spyOn(global, 'fetch')
			.mockResolvedValue(new Response('{"id":"unit-1"}', { status: 200 }));
		await makeTrustpilotRequest(
			'/v1/business-units/unit-1',
			apiKey,
			'business',
			'api_key',
		);
		const call = fetchMock.mock.calls[0];
		expect(String(call?.[0])).toBe(
			'https://api.trustpilot.com/v1/business-units/unit-1',
		);
		expect(new Headers(call?.[1]?.headers).get('apikey')).toBe(apiKey);
		expect(new Headers(call?.[1]?.headers).get('authorization')).toBeNull();
	});

	it('uses Bearer authorization and the invitations API host for protected calls', async () => {
		const fetchMock = jest
			.spyOn(global, 'fetch')
			.mockResolvedValue(new Response('{"templates":[]}', { status: 200 }));
		await makeTrustpilotRequest(
			'/v1/private/business-units/unit-1/templates',
			accessToken,
			'invitations',
			'oauth_2',
		);
		const call = fetchMock.mock.calls[0];
		expect(String(call?.[0])).toBe(
			'https://invitations-api.trustpilot.com/v1/private/business-units/unit-1/templates',
		);
		expect(new Headers(call?.[1]?.headers).get('authorization')).toBe(
			`Bearer ${accessToken}`,
		);
		expect(new Headers(call?.[1]?.headers).get('apikey')).toBeNull();
	});

	it('uses the separate Data Solutions host and serializes repeated query values', async () => {
		const fetchMock = jest
			.spyOn(global, 'fetch')
			.mockResolvedValue(new Response('{"businessUnits":[]}', { status: 200 }));
		await makeTrustpilotRequest(
			'/v1/business-units/search',
			apiKey,
			'dataSolutions',
			'api_key',
			{
				query: { query: 'example.org', perPage: 20 },
			},
		);
		const url = new URL(String(fetchMock.mock.calls[0]?.[0]));
		expect(url.origin).toBe('https://datasolutions.trustpilot.com');
		expect(url.searchParams.get('query')).toBe('example.org');
		expect(url.searchParams.get('perPage')).toBe('20');
	});

	it('fails fast for an explicitly empty credential', async () => {
		const fetchMock = jest.spyOn(global, 'fetch');
		await expect(
			makeTrustpilotRequest('/v1/reviews/latest', '', 'business', 'api_key'),
		).rejects.toBeInstanceOf(AuthMissingError);
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it('redacts provider text and PII-bearing request details while preserving HTTP status', async () => {
		jest.spyOn(global, 'fetch').mockResolvedValue(
			new Response('{"message":"Private contact john@example.invalid"}', {
				status: 400,
				statusText: 'Bad Request',
				headers: { 'Content-Type': 'application/json' },
			}),
		);
		const rejection = await makeTrustpilotRequest(
			'/v1/private/reviews/review-id',
			accessToken,
			'business',
			'oauth_2',
			{
				method: 'POST',
				body: {
					consumerEmail: 'john@example.invalid',
					message: 'private text',
				},
			},
		).catch((caught: unknown) => caught); // `unknown` because a rejected promise may carry any value.
		expect(rejection).toBeInstanceOf(ApiError);
		if (rejection instanceof ApiError) {
			expect(rejection.status).toBe(400);
			expect(rejection.message).toBe('Trustpilot request failed');
			expect(rejection.body).toBeUndefined();
			expect(JSON.stringify(rejection.request)).not.toContain(
				'john@example.invalid',
			);
		}
	});

	it('uses the real Corsair transport and preserves Retry-After with one attempt', async () => {
		const actualHttp =
			jest.requireActual<typeof import('corsair/http')>('corsair/http');
		expect(actualHttp.request).toBeDefined();
		const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(
			new Response('{"message":"limited"}', {
				status: 429,
				statusText: 'Too Many Requests',
				headers: { 'Content-Type': 'application/json', 'Retry-After': '4' },
			}),
		);
		const rejection = await makeTrustpilotRequest(
			'/v1/reviews/latest',
			apiKey,
			'business',
			'api_key',
		).catch((caught: unknown) => caught); // `unknown` because a rejected promise may carry any value.
		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(rejection).toBeInstanceOf(ApiError);
		if (rejection instanceof ApiError) {
			expect(rejection.status).toBe(429);
			expect(rejection.retryAfter).toBe(4000);
			expect(rejection.message).toBe('Trustpilot request failed');
		}
	});
});
