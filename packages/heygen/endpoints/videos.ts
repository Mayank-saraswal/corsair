import { logEventFromContext } from 'corsair/core';
import { makeHeygenRequest } from '../client';
import type { HeygenEndpoints } from '../index';
import type { HeygenEndpointOutputs } from './types';

export const generate: HeygenEndpoints['videosGenerate'] = async (ctx, input) => {
	const result = await makeHeygenRequest<HeygenEndpointOutputs['videosGenerate']>(
		'/v2/video/generate',
		ctx.key,
		{ method: 'POST', body: input },
	);

	await logEventFromContext(
		ctx,
		'heygen.videos.generate',
		{ itemCount: input.video_inputs.length },
		'completed',
	);
	return result;
};

export const templateGenerate: HeygenEndpoints['videosTemplateGenerate'] = async (
	ctx,
	input,
) => {
	const { template_id, ...body } = input;
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['videosTemplateGenerate']
	>(`/v2/template/${template_id}/generate`, ctx.key, { method: 'POST', body });

	await logEventFromContext(
		ctx,
		'heygen.videos.templateGenerate',
		{ templateId: template_id },
		'completed',
	);
	return result;
};

// [B] Path inferred as `/v1/video.webm`; see endpoints/types.ts for details.
export const createWebm: HeygenEndpoints['videosCreateWebm'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['videosCreateWebm']
	>('/v1/video.webm', ctx.key, { method: 'POST', body: input });

	await logEventFromContext(
		ctx,
		'heygen.videos.createWebm',
		{ avatarId: input.avatar_id },
		'completed',
	);
	return result;
};

export const personalizedAddContact: HeygenEndpoints['videosPersonalizedAddContact'] =
	async (ctx, input) => {
		const result = await makeHeygenRequest<
			HeygenEndpointOutputs['videosPersonalizedAddContact']
		>('/v1/personalized_video/add_contact', ctx.key, {
			method: 'POST',
			body: input,
		});

		await logEventFromContext(
			ctx,
			'heygen.videos.personalizedAddContact',
			{
				projectId: input.project_id,
				itemCount: input.variables_list.length,
			},
			'completed',
		);
		return result;
	};

export const personalizedProjectDetail: HeygenEndpoints['videosPersonalizedProjectDetail'] =
	async (ctx, input) => {
		const result = await makeHeygenRequest<
			HeygenEndpointOutputs['videosPersonalizedProjectDetail']
		>('/v1/personalized_video/project/detail', ctx.key, {
			method: 'GET',
			query: { id: input.id },
		});

		await logEventFromContext(
			ctx,
			'heygen.videos.personalizedProjectDetail',
			{ projectId: input.id },
			'completed',
		);
		return result;
	};

export const getStatus: HeygenEndpoints['videosGetStatus'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['videosGetStatus']
	>('/v1/video_status.get', ctx.key, {
		method: 'GET',
		query: { video_id: input.video_id },
	});

	await logEventFromContext(
		ctx,
		'heygen.videos.getStatus',
		{ videoId: input.video_id },
		'completed',
	);
	return result;
};

export const translate: HeygenEndpoints['videosTranslate'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['videosTranslate']
	>('/v2/video_translate', ctx.key, { method: 'POST', body: input });

	await logEventFromContext(
		ctx,
		'heygen.videos.translate',
		{ outputLanguage: input.output_language },
		'completed',
	);
	return result;
};

export const translateStatus: HeygenEndpoints['videosTranslateStatus'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['videosTranslateStatus']
	>(`/v2/video_translate/${input.video_translate_id}`, ctx.key, {
		method: 'GET',
	});

	await logEventFromContext(
		ctx,
		'heygen.videos.translateStatus',
		{ videoTranslateId: input.video_translate_id },
		'completed',
	);
	return result;
};

export const translateTargetLanguages: HeygenEndpoints['videosTranslateTargetLanguages'] =
	async (ctx) => {
		const result = await makeHeygenRequest<
			HeygenEndpointOutputs['videosTranslateTargetLanguages']
		>('/v2/video_translate/target_languages', ctx.key, { method: 'GET' });

		await logEventFromContext(
			ctx,
			'heygen.videos.translateTargetLanguages',
			{},
			'completed',
		);
		return result;
	};

// [B] Path inferred as `/v1/video/share`; see endpoints/types.ts for details.
export const getSharableUrl: HeygenEndpoints['videosGetSharableUrl'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['videosGetSharableUrl']
	>('/v1/video/share', ctx.key, { method: 'POST', body: input });

	await logEventFromContext(
		ctx,
		'heygen.videos.getSharableUrl',
		{ videoId: input.video_id },
		'completed',
	);
	return result;
};

export const deleteVideo: HeygenEndpoints['videosDelete'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenRequest<HeygenEndpointOutputs['videosDelete']>(
		'/v1/video.delete',
		ctx.key,
		{ method: 'DELETE', query: { video_id: input.video_id } },
	);

	await logEventFromContext(
		ctx,
		'heygen.videos.delete',
		{ videoId: input.video_id },
		'completed',
	);
	return result;
};

export const list: HeygenEndpoints['videosList'] = async (ctx, input) => {
	const result = await makeHeygenRequest<HeygenEndpointOutputs['videosList']>(
		'/v1/video.list',
		ctx.key,
		{ method: 'GET', query: { limit: input.limit, token: input.token } },
	);

	await logEventFromContext(ctx, 'heygen.videos.list', {}, 'completed');
	return result;
};
