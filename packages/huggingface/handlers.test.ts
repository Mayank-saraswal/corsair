import * as CorsairCore from 'corsair/core';
import * as Client from './client';
import {
	AccountEndpoints,
	CollectionsEndpoints,
	DatasetsEndpoints,
	DocsEndpoints,
	InferenceEndpoints,
	ModelsEndpoints,
	ReposEndpoints,
	TrendingEndpoints,
} from './endpoints';

const mockReq = jest.spyOn(Client, 'makeHuggingFaceRequest');
// Unit tests only assert HTTP path construction — skip real event logging.
jest.spyOn(CorsairCore, 'logEventFromContext').mockResolvedValue(null as never);

function ctx(key = 'hf_test') {
	return {
		key,
		db: {},
		authType: 'api_key' as const,
		keys: {
			get_api_key: async () => key,
			get_access_token: async () => key,
		},
	} as never;
}

function lastCall() {
	const call = mockReq.mock.calls.at(-1);
	if (!call) throw new Error('makeHuggingFaceRequest was not called');
	return call;
}

beforeEach(() => {
	mockReq.mockReset();
	mockReq.mockResolvedValue({ ok: true });
});

describe('handler path construction', () => {
	it('account.getWhoami → /api/whoami-v2', async () => {
		await AccountEndpoints.getWhoami(ctx(), {});
		expect(mockReq).toHaveBeenCalledWith(
			'/api/whoami-v2',
			'hf_test',
			expect.objectContaining({ method: 'GET' }),
		);
	});

	it('models.list → /api/models', async () => {
		await ModelsEndpoints.list(ctx(), { limit: 5 });
		expect(mockReq).toHaveBeenCalledWith(
			'/api/models',
			'hf_test',
			expect.objectContaining({
				method: 'GET',
				query: expect.objectContaining({ limit: 5 }),
			}),
		);
	});

	it('models.get → /api/models/ns/repo', async () => {
		await ModelsEndpoints.get(ctx(), { repoId: 'gpt2/small' });
		expect(lastCall()[0]).toBe('/api/models/gpt2/small');
	});

	it('datasets.checkValidity uses datasets-server', async () => {
		await DatasetsEndpoints.checkValidity(ctx(), {
			dataset: 'nyu-mll/glue',
		});
		const call = lastCall();
		expect(call[0]).toBe('/is-valid');
		expect(call[2]).toEqual(
			expect.objectContaining({
				baseUrl: Client.HF_DATASETS_SERVER_BASE,
			}),
		);
	});

	it('trending.get → /api/trending', async () => {
		await TrendingEndpoints.get(ctx(), { type: 'model' });
		expect(lastCall()[0]).toBe('/api/trending');
	});

	it('docs.search → /api/docs/search', async () => {
		await DocsEndpoints.search(ctx(), { q: 'hub' });
		expect(lastCall()[0]).toBe('/api/docs/search');
	});

	it('collections.list → /api/collections', async () => {
		await CollectionsEndpoints.list(ctx(), { limit: 3 });
		expect(lastCall()[0]).toBe('/api/collections');
	});

	it('inference.chatCompletion uses inference base', async () => {
		await InferenceEndpoints.chatCompletion(ctx(), {
			model: 'm',
			messages: [{ role: 'user', content: 'hi' }],
		});
		const call = lastCall();
		expect(call[0]).toBe('/v1/chat/completions');
		expect(call[2]?.baseUrl).toBe(Client.HF_INFERENCE_BASE);
	});

	it('repos.create → /api/repos/create', async () => {
		await ReposEndpoints.create(ctx(), {
			name: 'x',
			type: 'model',
		});
		expect(lastCall()[0]).toBe('/api/repos/create');
	});
});
