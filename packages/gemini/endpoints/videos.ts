import { logEventFromContext } from 'corsair/core';
import type { GeminiEndpoints } from '..';
import { makeGeminiRequest } from '../client';
import type { VideoFile, VideoOperation } from '../schema/videos';
import type { GetVideosOperationResponse } from './types';

type VideoFileResult =
	| { ok: true; videoFile: VideoFile }
	| { ok: false; code?: number; message?: string };

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

export const generateVideos: GeminiEndpoints['generateVideos'] = async (
	ctx,
	input,
) => {
	const response = await makeGeminiRequest<VideoOperation>(
		`/${input.model}:predictLongRunning`,
		ctx.key,
		{
			method: 'POST',
			body: {
				instances: [{ prompt: input.prompt, image: input.image }],
				parameters: input.parameters,
			},
		},
	);

	await logEventFromContext(
		ctx,
		'gemini.videos.generateVideos',
		{ ...input },
		'completed',
	);
	return { operationName: response.name, done: response.done };
};

export const getVideosOperation: GeminiEndpoints['getVideosOperation'] = async (
	ctx,
	input,
) => {
	const response = await makeGeminiRequest<GetVideosOperationResponse>(
		`/${input.operationName}`,
		ctx.key,
		{ method: 'GET' },
	);

	await logEventFromContext(
		ctx,
		'gemini.videos.getVideosOperation',
		{ ...input },
		'completed',
	);
	return response;
};

async function fetchVideoFile(
	uri: string,
	apiKey: string,
): Promise<VideoFileResult> {
	const downloadUrl = uri.startsWith('http')
		? uri
		: `${GEMINI_API_BASE}/${uri}`;
	const videoResponse = await fetch(downloadUrl, {
		headers: { 'x-goog-api-key': apiKey },
	});
	if (!videoResponse.ok) {
		return {
			ok: false,
			code: videoResponse.status,
			message: `Failed to download generated video: ${videoResponse.statusText}`,
		};
	}

	const bytes = await videoResponse.arrayBuffer();
	const contentBase64 = Buffer.from(bytes).toString('base64');
	const mimeType = videoResponse.headers.get('content-type') ?? 'video/mp4';
	return { ok: true, videoFile: { mimeType, contentBase64 } };
}

export const waitForVideo: GeminiEndpoints['waitForVideo'] = async (
	ctx,
	input,
) => {
	const deadline = Date.now() + input.timeoutMs;

	let operation = await makeGeminiRequest<GetVideosOperationResponse>(
		`/${input.operationName}`,
		ctx.key,
		{ method: 'GET' },
	);

	while (
		!operation.done &&
		!operation.error &&
		Date.now() + input.pollIntervalMs <= deadline
	) {
		await new Promise((resolve) => setTimeout(resolve, input.pollIntervalMs));
		operation = await makeGeminiRequest<GetVideosOperationResponse>(
			`/${input.operationName}`,
			ctx.key,
			{ method: 'GET' },
		);
	}

	await logEventFromContext(
		ctx,
		'gemini.videos.waitForVideo',
		{ ...input },
		'completed',
	);

	if (operation.error) {
		return {
			operationName: input.operationName,
			done: true,
			error: operation.error,
		};
	}

	if (!operation.done) {
		return { operationName: input.operationName, done: false };
	}

	const uri =
		operation.response?.generateVideoResponse?.generatedSamples?.[0]?.video
			?.uri;
	if (!uri) {
		return { operationName: input.operationName, done: true };
	}

	const fileResult = await fetchVideoFile(uri, ctx.key);
	if (fileResult.ok) {
		return {
			operationName: input.operationName,
			done: true,
			data: { video_file: fileResult.videoFile },
		};
	}
	return {
		operationName: input.operationName,
		done: true,
		error: { code: fileResult.code, message: fileResult.message },
	};
};
