import * as CorsairCore from 'corsair/core';
import * as Client from './client';
import {
	ImagesEndpoints,
	OrganizationsEndpoints,
	RepositoriesEndpoints,
	TagsEndpoints,
	TeamsEndpoints,
	WebhooksEndpoints,
} from './endpoints';
import type { DockerHubEndpoints } from './index';

const mockReq = jest.spyOn(Client, 'makeDockerHubRequest');
const logSpy = jest.spyOn(CorsairCore, 'logEventFromContext');
logSpy.mockImplementation(async () => null);

type HandlerCtx = Parameters<DockerHubEndpoints['repositoriesList']>[0];

function ctx(key = 'dckr_pat_test'): HandlerCtx {
	const partial = {
		key,
		db: {},
		authType: 'api_key' as const,
		options: { username: 'testuser' },
		keys: {
			get_api_key: async () => key,
		},
	};
	// Handler unit tests only need key + keys; cast through unknown to avoid
	// constructing a full CorsairPluginContext (database, hooks, etc.).
	return partial as unknown as HandlerCtx;
}

function lastCall() {
	const call = mockReq.mock.calls.at(-1);
	if (!call) throw new Error('makeDockerHubRequest was not called');
	return call;
}

function expectPath(path: string) {
	expect(lastCall()[0]).toBe(path);
}

beforeEach(() => {
	mockReq.mockReset();
	mockReq.mockResolvedValue({ results: [], id: 99 });
	logSpy.mockClear();
	logSpy.mockImplementation(async () => null);
});

describe('handler path construction', () => {
	it('repositories.list', async () => {
		await RepositoriesEndpoints.list(ctx(), {
			namespace: 'library',
			pageSize: 10,
		});
		expectPath('/repositories/library/');
		expect(lastCall()[2]).toEqual(
			expect.objectContaining({
				query: expect.objectContaining({ page_size: 10 }),
			}),
		);
	});

	it('repositories.get', async () => {
		await RepositoriesEndpoints.get(ctx(), {
			namespace: 'library',
			name: 'hello-world',
		});
		expectPath('/repositories/library/hello-world/');
	});

	it('repositories.create', async () => {
		await RepositoriesEndpoints.create(ctx(), {
			namespace: 'me',
			name: 'app',
		});
		expectPath('/repositories/');
		expect(lastCall()[2]?.method).toBe('POST');
	});

	it('tags.list', async () => {
		await TagsEndpoints.list(ctx(), {
			namespace: 'library',
			name: 'alpine',
		});
		expectPath('/repositories/library/alpine/tags');
	});

	it('tags.get', async () => {
		await TagsEndpoints.get(ctx(), {
			namespace: 'library',
			name: 'alpine',
			tag: 'latest',
		});
		expectPath('/repositories/library/alpine/tags/latest');
	});

	it('images.list uses tags endpoint', async () => {
		mockReq.mockResolvedValue({
			results: [
				{
					name: 'latest',
					images: [
						{ digest: 'sha256:aaa', architecture: 'amd64', os: 'linux' },
					],
				},
			],
		});
		const res = await ImagesEndpoints.list(ctx(), {
			namespace: 'library',
			name: 'alpine',
		});
		expectPath('/repositories/library/alpine/tags');
		expect((res as { count: number }).count).toBe(1);
	});

	it('images.delete bulk path', async () => {
		await ImagesEndpoints.delete(ctx(), {
			namespace: 'myuser',
			manifests: [{ repository: 'app', digest: 'sha256:x' }],
		});
		expectPath('/namespaces/myuser/delete-images');
	});

	it('organizations.list', async () => {
		await OrganizationsEndpoints.list(ctx(), {});
		expectPath('/user/orgs/');
	});

	it('organizations.listMembers', async () => {
		await OrganizationsEndpoints.listMembers(ctx(), { orgname: 'acme' });
		expectPath('/orgs/acme/members/');
	});

	it('teams.list uses groups', async () => {
		await TeamsEndpoints.list(ctx(), { orgname: 'acme' });
		expectPath('/orgs/acme/groups/');
	});

	it('teams.get', async () => {
		await TeamsEndpoints.get(ctx(), {
			orgname: 'acme',
			teamname: 'devs',
		});
		expectPath('/orgs/acme/groups/devs/');
	});

	it('webhooks.list', async () => {
		await WebhooksEndpoints.list(ctx(), {
			namespace: 'me',
			name: 'app',
		});
		expectPath('/repositories/me/app/webhook_pipeline/');
	});

	it('webhooks.create two-step', async () => {
		mockReq
			.mockResolvedValueOnce({ id: 7, name: 'deploy' })
			.mockResolvedValueOnce({ hook_url: 'https://example.com/h' });
		await WebhooksEndpoints.create(ctx(), {
			namespace: 'me',
			name: 'app',
			webhookName: 'deploy',
			hookUrl: 'https://example.com/h',
		});
		expect(mockReq).toHaveBeenCalledTimes(2);
		expect(mockReq.mock.calls[0]?.[0]).toBe(
			'/repositories/me/app/webhook_pipeline/',
		);
		expect(mockReq.mock.calls[1]?.[0]).toBe(
			'/repositories/me/app/webhook_pipeline/7/hooks/',
		);
	});
});
