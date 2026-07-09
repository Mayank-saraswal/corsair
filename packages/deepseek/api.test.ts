import { makeDeepseekRequest } from './client';
import type {
	AnthropicCreateMessageResponse,
	ChatCreateCompletionResponse,
	GetUserBalanceResponse,
	ListModelsResponse,
} from './endpoints/types';
import {
	DeepseekEndpointInputSchemas,
	DeepseekEndpointOutputSchemas,
} from './endpoints/types';

declare const describe: {
	(name: string, fn: () => void): void;
	skip(name: string, fn: () => void): void;
};
declare const it: (name: string, fn: () => void | Promise<void>) => void;
declare const expect: {
	(
		actual: unknown,
	): {
		toBe(expected: unknown): void;
		toBeDefined(): void;
		toBeGreaterThan(n: number): void;
		toEqual(expected: unknown): void;
	};
};

const TEST_API_KEY = process.env.DEEPSEEK_API_KEY;
const describeIfApiKey = TEST_API_KEY ? describe : describe.skip;

describe('Deepseek schemas', () => {
	it('parses chat createCompletion input and response', () => {
		const input = DeepseekEndpointInputSchemas.chatCreateCompletion.safeParse({
			model: 'deepseek-chat',
			messages: [{ role: 'user', content: 'Hello' }],
		});
		expect(input.success).toBe(true);

		const output = DeepseekEndpointOutputSchemas.chatCreateCompletion.safeParse(
			{
				id: 'chatcmpl-1',
				object: 'chat.completion',
				created: 1700000000,
				model: 'deepseek-chat',
				choices: [
					{
						index: 0,
						message: { role: 'assistant', content: 'Hi there' },
						finish_reason: 'stop',
					},
				],
			},
		);
		expect(output.success).toBe(true);
	});

	it('parses anthropic createMessage input and response', () => {
		const input = DeepseekEndpointInputSchemas.anthropicCreateMessage.safeParse(
			{
				model: 'deepseek-chat',
				maxTokens: 1024,
				messages: [{ role: 'user', content: 'Hello' }],
			},
		);
		expect(input.success).toBe(true);

		const output =
			DeepseekEndpointOutputSchemas.anthropicCreateMessage.safeParse({
				id: 'msg-1',
				type: 'message',
				role: 'assistant',
				model: 'deepseek-chat',
				content: [{ type: 'text', text: 'Hi there' }],
				stop_reason: 'end_turn',
				usage: { input_tokens: 10, output_tokens: 5 },
			});
		expect(output.success).toBe(true);
	});

	it('parses user getBalance input and response', () => {
		const input = DeepseekEndpointInputSchemas.userGetBalance.safeParse({});
		expect(input.success).toBe(true);

		const output = DeepseekEndpointOutputSchemas.userGetBalance.safeParse({
			is_available: true,
			balance_infos: [
				{
					currency: 'USD',
					total_balance: '10.00',
					granted_balance: '5.00',
					topped_up_balance: '5.00',
				},
			],
		});
		expect(output.success).toBe(true);
	});

	it('parses models list input and response', () => {
		const input = DeepseekEndpointInputSchemas.modelsList.safeParse({});
		expect(input.success).toBe(true);

		const output = DeepseekEndpointOutputSchemas.modelsList.safeParse({
			object: 'list',
			data: [{ id: 'deepseek-chat', object: 'model', owned_by: 'deepseek' }],
		});
		expect(output.success).toBe(true);
	});

	it('rejects invalid chat createCompletion input', () => {
		const invalid = DeepseekEndpointInputSchemas.chatCreateCompletion.safeParse(
			{
				model: 'deepseek-chat',
				// messages required — empty object should fail
			},
		);
		expect(invalid.success).toBe(false);
	});
});

describeIfApiKey('Deepseek API type tests', () => {
	it('chat completion returns the expected shape', async () => {
		const response = await makeDeepseekRequest<ChatCreateCompletionResponse>(
			'chat/completions',
			TEST_API_KEY!,
			{
				method: 'POST',
				body: {
					model: 'deepseek-chat',
					messages: [{ role: 'user', content: 'Say hello in one word.' }],
					stream: false,
				},
			},
		);

		const parsed =
			DeepseekEndpointOutputSchemas.chatCreateCompletion.safeParse(response);
		expect(parsed.success).toBe(true);
	});

	it('anthropic message returns the expected shape', async () => {
		const response = await makeDeepseekRequest<AnthropicCreateMessageResponse>(
			'anthropic/v1/messages',
			TEST_API_KEY!,
			{
				method: 'POST',
				body: {
					model: 'deepseek-chat',
					max_tokens: 64,
					messages: [{ role: 'user', content: 'Say hello in one word.' }],
					stream: false,
				},
			},
		);

		const parsed =
			DeepseekEndpointOutputSchemas.anthropicCreateMessage.safeParse(response);
		expect(parsed.success).toBe(true);
	});

	it('user balance returns the expected shape', async () => {
		const response = await makeDeepseekRequest<GetUserBalanceResponse>(
			'user/balance',
			TEST_API_KEY!,
			{ method: 'GET' },
		);

		const parsed =
			DeepseekEndpointOutputSchemas.userGetBalance.safeParse(response);
		expect(parsed.success).toBe(true);
	});

	it('models list returns the expected shape', async () => {
		const response = await makeDeepseekRequest<ListModelsResponse>(
			'models',
			TEST_API_KEY!,
			{ method: 'GET' },
		);

		const parsed = DeepseekEndpointOutputSchemas.modelsList.safeParse(response);
		expect(parsed.success).toBe(true);
	});
});
