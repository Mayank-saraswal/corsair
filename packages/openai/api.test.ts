import 'dotenv/config';
import { makeOpenaiRequest } from './client';
import {
	OpenaiEndpointInputSchemas,
	OpenaiEndpointOutputSchemas,
} from './endpoints/types';
import type { ChatCreateCompletionResponse } from './schema/chat';
import type { EmbeddingsCreateResponse } from './schema/embeddings';
import type { ModelsListResponse } from './schema/models';

const TEST_API_KEY = process.env.OPENAI_API_KEY;
const describeIfApiKey = TEST_API_KEY ? describe : describe.skip;

describeIfApiKey('OpenAI API Type Tests', () => {
	describe('models', () => {
		it('list returns correct type', async () => {
			const response = await makeOpenaiRequest<ModelsListResponse>(
				'models',
				TEST_API_KEY!,
				{ method: 'GET' },
			);

			OpenaiEndpointOutputSchemas.modelsList.parse(response);
			expect(response.data.length).toBeGreaterThan(0);
		});
	});

	describe('chat', () => {
		it('createCompletion returns correct type', async () => {
			const response = await makeOpenaiRequest<ChatCreateCompletionResponse>(
				'chat/completions',
				TEST_API_KEY!,
				{
					method: 'POST',
					body: {
						model: 'gpt-4o-mini',
						messages: [{ role: 'user', content: 'Say "hi" and nothing else.' }],
						max_completion_tokens: 16,
						stream: false,
					},
				},
			);

			OpenaiEndpointOutputSchemas.chatCreateCompletion.parse(response);
			expect(response.choices.length).toBeGreaterThan(0);
		});
	});

	describe('embeddings', () => {
		it('create returns correct type', async () => {
			const response = await makeOpenaiRequest<EmbeddingsCreateResponse>(
				'embeddings',
				TEST_API_KEY!,
				{
					method: 'POST',
					body: {
						model: 'text-embedding-3-small',
						input: 'corsair openai plugin test',
					},
				},
			);

			OpenaiEndpointOutputSchemas.embeddingsCreate.parse(response);
			expect(response.data.length).toBeGreaterThan(0);
		});
	});
});

describe('OpenAI offline schema smoke', () => {
	it('registers input and output schemas for every endpoint key', () => {
		// Ensures all ~129 operations stay wired in types.ts (catches missing schema maps)
		const inputKeys = Object.keys(OpenaiEndpointInputSchemas);
		const outputKeys = Object.keys(OpenaiEndpointOutputSchemas);
		expect(inputKeys.length).toBeGreaterThan(50);
		expect(outputKeys.length).toBe(inputKeys.length);
		for (const key of inputKeys) {
			expect(
				OpenaiEndpointInputSchemas[
					key as keyof typeof OpenaiEndpointInputSchemas
				],
			).toBeDefined();
			expect(
				OpenaiEndpointOutputSchemas[
					key as keyof typeof OpenaiEndpointOutputSchemas
				],
			).toBeDefined();
		}
	});

	it('chat input schema accepts a minimal completion request', () => {
		const result = OpenaiEndpointInputSchemas.chatCreateCompletion.safeParse({
			model: 'gpt-4o-mini',
			messages: [{ role: 'user', content: 'hi' }],
		});
		expect(result.success).toBe(true);
	});

	it('embeddings input schema accepts a minimal request', () => {
		const result = OpenaiEndpointInputSchemas.embeddingsCreate.safeParse({
			model: 'text-embedding-3-small',
			input: 'test',
		});
		expect(result.success).toBe(true);
	});

	it('models list input schema accepts empty object', () => {
		const result = OpenaiEndpointInputSchemas.modelsList.safeParse({});
		expect(result.success).toBe(true);
	});

	it('files list input schema accepts empty object', () => {
		const result = OpenaiEndpointInputSchemas.filesList.safeParse({});
		expect(result.success).toBe(true);
	});

	it('vectorStores list input schema accepts empty object', () => {
		const result = OpenaiEndpointInputSchemas.vectorStoresList.safeParse({});
		expect(result.success).toBe(true);
	});

	it('batches list input schema accepts empty object', () => {
		const result = OpenaiEndpointInputSchemas.batchesList.safeParse({});
		expect(result.success).toBe(true);
	});

	it('rejects invalid chat input', () => {
		const result = OpenaiEndpointInputSchemas.chatCreateCompletion.safeParse(
			{},
		);
		expect(result.success).toBe(false);
	});

	it('rejects invalid embeddings input', () => {
		const result = OpenaiEndpointInputSchemas.embeddingsCreate.safeParse({});
		expect(result.success).toBe(false);
	});
});
