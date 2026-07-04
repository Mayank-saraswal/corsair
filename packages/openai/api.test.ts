import 'dotenv/config';
import { makeOpenaiRequest } from './client';
import { OpenaiEndpointOutputSchemas } from './endpoints/types';
import type { ChatCreateCompletionResponse } from './schema/chat';
import type { EmbeddingsCreateResponse } from './schema/embeddings';
import type { ModelsListResponse } from './schema/models';

const TEST_API_KEY = process.env.OPENAI_API_KEY!;

describe('OpenAI API Type Tests', () => {
	describe('models', () => {
		it('list returns correct type', async () => {
			const response = await makeOpenaiRequest<ModelsListResponse>(
				'models',
				TEST_API_KEY,
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
				TEST_API_KEY,
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
				TEST_API_KEY,
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
