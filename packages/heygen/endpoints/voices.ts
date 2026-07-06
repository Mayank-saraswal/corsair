import { logEventFromContext } from 'corsair/core';
import { makeHeygenRequest } from '../client';
import type { HeygenEndpoints } from '../index';
import type { HeygenEndpointOutputs } from './types';

// HeyGen's v3 docs mention a Text-to-Speech (Starfish) surface, but no published v3
// replacement for these specific voice-listing/generation operations exists yet per
// developers.heygen.com/endpoint-version-comparison, so they stay on their confirmed v1/v2
// paths.

// [B] Path inferred as `/v1/voice/generate`; see endpoints/types.ts for details.
export const generateSpeech: HeygenEndpoints['voicesGenerateSpeech'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['voicesGenerateSpeech']
	>('/v1/voice/generate', ctx.key, { method: 'POST', body: input });

	// Never log `text` (the script being synthesized) — only the voice identifier.
	await logEventFromContext(
		ctx,
		'heygen.voices.generateSpeech',
		{ voiceId: input.voice_id },
		'completed',
	);
	return result;
};

// [B] Path inferred as `/v1/voice/preview`; see endpoints/types.ts for details.
export const generatePreview: HeygenEndpoints['voicesGeneratePreview'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['voicesGeneratePreview']
	>('/v1/voice/preview', ctx.key, { method: 'POST', body: input });

	await logEventFromContext(
		ctx,
		'heygen.voices.generatePreview',
		{ voiceId: input.voice_id },
		'completed',
	);
	return result;
};

// [B] Path inferred as `/v1/voice/list_tts`; see endpoints/types.ts for details.
export const listTts: HeygenEndpoints['voicesListTts'] = async (ctx, input) => {
	const result = await makeHeygenRequest<HeygenEndpointOutputs['voicesListTts']>(
		'/v1/voice/list_tts',
		ctx.key,
		{ method: 'GET', query: { language: input.language, gender: input.gender } },
	);

	await logEventFromContext(ctx, 'heygen.voices.listTts', {}, 'completed');
	return result;
};

// [B] Path inferred as `/v1/voice/locale.list`; see endpoints/types.ts for details.
export const listLocales: HeygenEndpoints['voicesListLocales'] = async (ctx) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['voicesListLocales']
	>('/v1/voice/locale.list', ctx.key, { method: 'GET' });

	await logEventFromContext(ctx, 'heygen.voices.listLocales', {}, 'completed');
	return result;
};

export const listV2: HeygenEndpoints['voicesListV2'] = async (ctx) => {
	const result = await makeHeygenRequest<HeygenEndpointOutputs['voicesListV2']>(
		'/v2/voices',
		ctx.key,
		{ method: 'GET' },
	);

	await logEventFromContext(ctx, 'heygen.voices.listV2', {}, 'completed');
	return result;
};

export const listV1: HeygenEndpoints['voicesListV1'] = async (ctx) => {
	const result = await makeHeygenRequest<HeygenEndpointOutputs['voicesListV1']>(
		'/v1/voice.list',
		ctx.key,
		{ method: 'GET' },
	);

	await logEventFromContext(ctx, 'heygen.voices.listV1', {}, 'completed');
	return result;
};

// [B] Path inferred as `/v1/voice/brand.list`; see endpoints/types.ts for details.
export const listBrandVoices: HeygenEndpoints['voicesListBrandVoices'] = async (
	ctx,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['voicesListBrandVoices']
	>('/v1/voice/brand.list', ctx.key, { method: 'GET' });

	await logEventFromContext(
		ctx,
		'heygen.voices.listBrandVoices',
		{},
		'completed',
	);
	return result;
};
