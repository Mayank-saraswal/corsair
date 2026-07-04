import 'dotenv/config';
import { makeGeminiRequest } from './client';
import type {
	CountTokensResponse,
	EmbedContentResponse,
	GenerateContentResponse,
	ListModelsResponse,
} from './endpoints/types';
import { GeminiEndpointOutputSchemas } from './endpoints/types';
import type { VideoOperation } from './schema/videos';

const TEST_API_KEY = process.env.GEMINI_API_KEY!;

describe('Gemini API Type Tests', () => {
	describe('models.listModels', () => {
		it('listModels returns correct type', async () => {
			const response = await makeGeminiRequest<ListModelsResponse>(
				'/models',
				TEST_API_KEY,
				{
					method: 'GET',
				},
			);

			GeminiEndpointOutputSchemas.listModels.parse(response);
			expect(response.models.length).toBeGreaterThan(0);
		});
	});

	describe('content.countTokens', () => {
		it('countTokens returns correct type', async () => {
			const response = await makeGeminiRequest<CountTokensResponse>(
				'/gemini-2.5-flash:countTokens',
				TEST_API_KEY,
				{
					method: 'POST',
					body: {
						contents: [{ role: 'user', parts: [{ text: 'Hello, Gemini!' }] }],
					},
				},
			);

			GeminiEndpointOutputSchemas.countTokens.parse(response);
			expect(response.totalTokens).toBeGreaterThan(0);
		});
	});

	describe('content.embedContent', () => {
		it('embedContent returns correct type', async () => {
			const response = await makeGeminiRequest<EmbedContentResponse>(
				'/gemini-embedding-001:embedContent',
				TEST_API_KEY,
				{
					method: 'POST',
					body: {
						content: { parts: [{ text: 'Corsair plugin integration test' }] },
					},
				},
			);

			GeminiEndpointOutputSchemas.embedContent.parse(response);
			expect(response.embedding.values.length).toBeGreaterThan(0);
		});
	});

	describe('content.generateContent', () => {
		it('generateContent returns correct type', async () => {
			const response = await makeGeminiRequest<GenerateContentResponse>(
				'/gemini-2.5-flash:generateContent',
				TEST_API_KEY,
				{
					method: 'POST',
					body: {
						contents: [
							{
								role: 'user',
								parts: [{ text: 'Reply with exactly one word: pong' }],
							},
						],
					},
				},
			);

			GeminiEndpointOutputSchemas.generateContent
				.omit({ text: true })
				.parse(response);
			expect(response.candidates?.length).toBeGreaterThan(0);
		});
	});

	describe('videos.generateVideos', () => {
		it('generateVideos kicks off an operation with correct type', async () => {
			const response = await makeGeminiRequest<VideoOperation>(
				'/veo-2.0-generate-001:predictLongRunning',
				TEST_API_KEY,
				{
					method: 'POST',
					body: { instances: [{ prompt: 'A calm ocean at sunrise' }] },
				},
			);

			expect(typeof response.name).toBe('string');
		});
	});
});
