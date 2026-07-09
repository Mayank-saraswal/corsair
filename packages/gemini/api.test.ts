import 'dotenv/config';
import { makeGeminiRequest } from './client';
import {
	buildImageGenerationConfig,
	extractImagesFromCandidates,
} from './endpoints/image-utils';
import { stripMarkdownFences } from './endpoints/text-utils';
import type {
	CountTokensResponse,
	EmbedContentResponse,
	GenerateContentResponse,
	ListModelsResponse,
} from './endpoints/types';
import {
	GeminiEndpointInputSchemas,
	GeminiEndpointOutputSchemas,
} from './endpoints/types';
import type { VideoOperation } from './schema/videos';

const TEST_API_KEY = process.env.GEMINI_API_KEY;
const describeIfApiKey = TEST_API_KEY ? describe : describe.skip;

describe('Gemini offline unit tests', () => {
	it('stripMarkdownFences removes a single leading/trailing fence', () => {
		const raw = '```html\n<div>hello</div>\n```';
		expect(stripMarkdownFences(raw)).toBe('<div>hello</div>');
	});

	it('stripMarkdownFences leaves plain text unchanged', () => {
		expect(stripMarkdownFences('hello world')).toBe('hello world');
	});

	it('buildImageGenerationConfig always forces responseModalities IMAGE', () => {
		const config = buildImageGenerationConfig({
			temperature: 0.5,
			// Attempt to override IMAGE with TEXT — must not win
			responseModalities: ['TEXT'],
		});
		expect(config.responseModalities).toEqual(['IMAGE']);
		expect(config.temperature).toBe(0.5);
	});

	it('extractImagesFromCandidates maps inlineData parts to images', () => {
		const images = extractImagesFromCandidates([
			{
				content: {
					parts: [
						{ text: 'ignore me' },
						{ inlineData: { mimeType: 'image/png', data: 'abc123' } },
					],
				},
			},
		]);
		expect(images).toEqual([
			{ mimeType: 'image/png', contentBase64: 'abc123' },
		]);
	});

	it('extractImagesFromCandidates returns empty array when no candidates', () => {
		expect(extractImagesFromCandidates(undefined)).toEqual([]);
	});

	it('countTokens input schema accepts a minimal payload', () => {
		const result = GeminiEndpointInputSchemas.countTokens.safeParse({
			model: 'gemini-2.5-flash',
			contents: [{ role: 'user', parts: [{ text: 'hi' }] }],
		});
		expect(result.success).toBe(true);
	});

	it('generateContent input schema rejects missing contents', () => {
		const result = GeminiEndpointInputSchemas.generateContent.safeParse({
			model: 'gemini-2.5-flash',
		});
		expect(result.success).toBe(false);
	});

	it('listModels input schema accepts empty object', () => {
		const result = GeminiEndpointInputSchemas.listModels.safeParse({});
		expect(result.success).toBe(true);
	});

	it('generateImage input schema accepts prompt + model', () => {
		const result = GeminiEndpointInputSchemas.generateImage.safeParse({
			model: 'gemini-2.5-flash-image',
			prompt: 'a cat',
		});
		expect(result.success).toBe(true);
	});

	it('getVideosOperation input schema accepts operationName', () => {
		const result = GeminiEndpointInputSchemas.getVideosOperation.safeParse({
			operationName: 'models/veo/operations/123',
		});
		expect(result.success).toBe(true);
	});

	it('waitForVideo input schema accepts operationName', () => {
		const result = GeminiEndpointInputSchemas.waitForVideo.safeParse({
			operationName: 'models/veo/operations/123',
		});
		expect(result.success).toBe(true);
	});
});

describeIfApiKey('Gemini API Type Tests', () => {
	describe('models.listModels', () => {
		it('listModels returns correct type', async () => {
			const response = await makeGeminiRequest<ListModelsResponse>(
				'/models',
				TEST_API_KEY!,
				{ method: 'GET' },
			);

			GeminiEndpointOutputSchemas.listModels.parse(response);
			expect(response.models.length).toBeGreaterThan(0);
		});
	});

	describe('content.countTokens', () => {
		it('countTokens returns correct type', async () => {
			const response = await makeGeminiRequest<CountTokensResponse>(
				// Must include /models/ — matches production endpoint paths
				'/models/gemini-2.5-flash:countTokens',
				TEST_API_KEY!,
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
				'/models/gemini-embedding-001:embedContent',
				TEST_API_KEY!,
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
				'/models/gemini-2.5-flash:generateContent',
				TEST_API_KEY!,
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
				'/models/veo-2.0-generate-001:predictLongRunning',
				TEST_API_KEY!,
				{
					method: 'POST',
					body: { instances: [{ prompt: 'A calm ocean at sunrise' }] },
				},
			);

			expect(typeof response.name).toBe('string');
		});
	});
});
