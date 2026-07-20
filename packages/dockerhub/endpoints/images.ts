import { logEventFromContext } from 'corsair/core';
import type { DockerHubEndpoints } from '../index';
import { pageQuery, req, summarize } from './helpers';

type TagResult = {
	name?: string;
	images?: Array<{
		architecture?: string;
		os?: string;
		digest?: string;
		size?: number;
		status?: string;
		last_pulled?: string;
		last_pushed?: string;
	}>;
	last_updated?: string;
	full_size?: number;
};

type TagsPage = {
	count?: number;
	next?: string | null;
	results?: TagResult[];
};

/**
 * Collect platform-specific image variants from tag pages (dedupe by digest).
 */
export const list: DockerHubEndpoints['imagesList'] = async (ctx, input) => {
	const page = await req<TagsPage>(
		ctx,
		`/repositories/${encodeURIComponent(input.namespace)}/${encodeURIComponent(input.name)}/tags`,
		{ method: 'GET', query: pageQuery(input) },
	);
	const byDigest = new Map<string, Record<string, unknown>>();
	for (const tag of page.results ?? []) {
		for (const img of tag.images ?? []) {
			if (!img.digest) continue;
			if (!byDigest.has(img.digest)) {
				byDigest.set(img.digest, {
					digest: img.digest,
					architecture: img.architecture,
					os: img.os,
					size: img.size,
					status: img.status,
					tag: tag.name,
					last_pulled: img.last_pulled,
					last_pushed: img.last_pushed,
				});
			}
		}
	}
	const response = {
		count: byDigest.size,
		namespace: input.namespace,
		repository: input.name,
		results: [...byDigest.values()],
		// pass through pagination hints from tags page
		next: page.next ?? null,
		tagCount: page.count,
	};
	await logEventFromContext(
		ctx,
		'dockerhub.images.list',
		summarize(input),
		'completed',
	);
	return response;
};

export const get: DockerHubEndpoints['imagesGet'] = async (ctx, input) => {
	const page = await req<TagsPage>(
		ctx,
		`/repositories/${encodeURIComponent(input.namespace)}/${encodeURIComponent(input.name)}/tags`,
		{ method: 'GET', query: pageQuery(input) },
	);
	const digest = input.digest.startsWith('sha256:')
		? input.digest
		: `sha256:${input.digest}`;
	for (const tag of page.results ?? []) {
		for (const img of tag.images ?? []) {
			if (img.digest === digest || img.digest === input.digest) {
				const response = {
					digest: img.digest,
					architecture: img.architecture,
					os: img.os,
					size: img.size,
					status: img.status,
					tag: tag.name,
					namespace: input.namespace,
					repository: input.name,
					last_pulled: img.last_pulled,
					last_pushed: img.last_pushed,
				};
				await logEventFromContext(
					ctx,
					'dockerhub.images.get',
					summarize(input),
					'completed',
				);
				return response;
			}
		}
	}
	await logEventFromContext(
		ctx,
		'dockerhub.images.get',
		summarize(input),
		'failed',
	);
	throw new Error(
		`Image digest not found on current tags page: ${input.digest}`,
	);
};

/**
 * Bulk-delete images by digest for a namespace you own.
 * POST /v2/namespaces/{namespace}/delete-images
 */
export const deleteImages: DockerHubEndpoints['imagesDelete'] = async (
	ctx,
	input,
) => {
	if (input.namespace === 'library') {
		throw new Error('Cannot delete images from the official library namespace');
	}
	const response = await req(
		ctx,
		`/namespaces/${encodeURIComponent(input.namespace)}/delete-images`,
		{
			method: 'POST',
			body: {
				dry_run: input.dryRun ?? false,
				manifests: input.manifests.map((m) => ({
					repository: m.repository,
					digest: m.digest,
				})),
			},
		},
	);
	await logEventFromContext(
		ctx,
		'dockerhub.images.delete',
		summarize(input),
		'completed',
	);
	return response;
};
