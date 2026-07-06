import { z } from 'zod';

/**
 * HeyGen wraps nearly all responses in this `{ error, data }` envelope (confirmed across
 * v1 and v2 endpoints in HeyGen's official docs/SDK samples). `data` shapes below are kept
 * loose (z.unknown()/.catchall) wherever the exact response fields aren't documented, per
 * project convention for fallback schemas.
 */
function wrapResponse<T extends z.ZodTypeAny>(dataSchema: T) {
	return z.object({
		error: z.unknown().nullable().optional(),
		data: dataSchema,
	});
}

// ---------------------------------------------------------------------------
// Shared sub-schemas
// ---------------------------------------------------------------------------

const DimensionSchema = z.object({
	width: z.number(),
	height: z.number(),
});

// ---------------------------------------------------------------------------
// Domain 1: Videos (generation, templates, translate, personalization) — 12 ops
// ---------------------------------------------------------------------------

// Migrated to HeyGen v3 API endpoint per developers.heygen.com (POST /v3/videos). The v3
// body is a discriminated union on `type`; only fields shared across the `avatar`, `image`,
// and `cinematic_avatar` variants are modeled strictly below, the rest is passed through.
const VideosGenerateInputSchema = z
	.object({
		type: z.enum(['avatar', 'image', 'cinematic_avatar']),
		title: z.string().optional(),
		resolution: z.string().optional(),
		aspect_ratio: z.string().nullable().optional(),
		callback_url: z.string().optional(),
		callback_id: z.string().nullable().optional(),
		folder_id: z.string().optional(),
	})
	.catchall(z.unknown());
export type VideosGenerateInput = z.infer<typeof VideosGenerateInputSchema>;

const VideosGenerateResponseSchema = wrapResponse(
	z.object({
		video_id: z.string(),
		status: z.string().optional(),
		output_format: z.enum(['mp4', 'webm']).optional(),
	}),
);
export type VideosGenerateResponse = z.infer<typeof VideosGenerateResponseSchema>;

const VideosTemplateGenerateInputSchema = z.object({
	template_id: z.string(),
	title: z.string().optional(),
	caption: z.boolean().optional(),
	test: z.boolean().optional(),
	dimension: DimensionSchema.optional(),
	folder_id: z.string().optional(),
	// Keyed by template variable name; shape depends on the variable's type (text/image/
	// video/audio/voice), so the per-variable value is left permissive.
	variables: z.record(z.string(), z.unknown()).optional(),
});
export type VideosTemplateGenerateInput = z.infer<
	typeof VideosTemplateGenerateInputSchema
>;

const VideosTemplateGenerateResponseSchema = wrapResponse(
	z.object({ video_id: z.string() }),
);
export type VideosTemplateGenerateResponse = z.infer<
	typeof VideosTemplateGenerateResponseSchema
>;

// [B] Path inferred as `/v1/video.webm`, a legacy sibling of `/v1/video.list` /
// `/v1/video.delete`, distinct from the general `/v2/video/generate` endpoint.
const VideosCreateWebmInputSchema = z.object({
	avatar_id: z.string(),
	avatar_style: z.string().optional(),
	input_text: z.string().optional(),
	input_audio: z.string().optional(),
	voice_id: z.string().optional(),
	background_color: z.string().optional(),
	title: z.string().optional(),
	callback_id: z.string().nullable().optional(),
});
export type VideosCreateWebmInput = z.infer<typeof VideosCreateWebmInputSchema>;

const VideosCreateWebmResponseSchema = wrapResponse(
	z.object({ video_id: z.string() }),
);
export type VideosCreateWebmResponse = z.infer<
	typeof VideosCreateWebmResponseSchema
>;

const VideosPersonalizedAddContactInputSchema = z.object({
	project_id: z.string(),
	variables_list: z.array(
		z.object({ email: z.string().optional(), first_name: z.string().optional() }).catchall(
			z.unknown(),
		),
	),
});
export type VideosPersonalizedAddContactInput = z.infer<
	typeof VideosPersonalizedAddContactInputSchema
>;

const VideosPersonalizedAddContactResponseSchema = wrapResponse(
	// Response shape not documented beyond success/failure; kept permissive.
	z.record(z.string(), z.unknown()),
);
export type VideosPersonalizedAddContactResponse = z.infer<
	typeof VideosPersonalizedAddContactResponseSchema
>;

const VideosPersonalizedProjectDetailInputSchema = z.object({
	id: z.string(),
});
export type VideosPersonalizedProjectDetailInput = z.infer<
	typeof VideosPersonalizedProjectDetailInputSchema
>;

const VideosPersonalizedProjectDetailResponseSchema = wrapResponse(
	z
		.object({
			project_id: z.string().optional(),
			status: z.string().optional(),
		})
		.catchall(z.unknown()),
);
export type VideosPersonalizedProjectDetailResponse = z.infer<
	typeof VideosPersonalizedProjectDetailResponseSchema
>;

const VideosGetStatusInputSchema = z.object({
	video_id: z.string(),
});
export type VideosGetStatusInput = z.infer<typeof VideosGetStatusInputSchema>;

// Migrated to HeyGen v3 API endpoint per developers.heygen.com (GET /v3/videos/{video_id}).
const VideosGetStatusResponseSchema = wrapResponse(
	z.object({
		id: z.string(),
		title: z.string().nullable().optional(),
		status: z.enum(['pending', 'processing', 'completed', 'failed']),
		created_at: z.number().nullable().optional(),
		completed_at: z.number().nullable().optional(),
		video_url: z.string().nullable().optional(),
		thumbnail_url: z.string().nullable().optional(),
		gif_url: z.string().nullable().optional(),
		captioned_video_url: z.string().nullable().optional(),
		subtitle_url: z.string().nullable().optional(),
		duration: z.number().nullable().optional(),
		folder_id: z.string().nullable().optional(),
		output_language: z.string().nullable().optional(),
		failure_code: z.string().nullable().optional(),
		failure_message: z.string().nullable().optional(),
		video_page_url: z.string().nullable().optional(),
	}),
);
export type VideosGetStatusResponse = z.infer<typeof VideosGetStatusResponseSchema>;

// Migrated to HeyGen v3 API endpoint per developers.heygen.com (POST /v3/video-translations).
const VideoTranslationSourceSchema = z.union([
	z.object({ type: z.literal('url'), url: z.string() }),
	z.object({ type: z.literal('asset_id'), asset_id: z.string() }),
]);

const VideosTranslateInputSchema = z.object({
	video: VideoTranslationSourceSchema,
	output_languages: z.array(z.string()).min(1),
	title: z.string().optional(),
	audio: VideoTranslationSourceSchema.nullable().optional(),
	input_language: z.string().nullable().optional(),
	translate_audio_only: z.boolean().optional(),
	speaker_num: z.number().nullable().optional(),
	mode: z.enum(['speed', 'precision']).optional(),
	callback_url: z.string().nullable().optional(),
	callback_id: z.string().nullable().optional(),
	enable_caption: z.boolean().optional(),
	folder_id: z.string().nullable().optional(),
});
export type VideosTranslateInput = z.infer<typeof VideosTranslateInputSchema>;

const VideosTranslateResponseSchema = wrapResponse(
	z.object({ video_translation_ids: z.array(z.string()) }),
);
export type VideosTranslateResponse = z.infer<typeof VideosTranslateResponseSchema>;

const VideosTranslateStatusInputSchema = z.object({
	video_translate_id: z.string(),
});
export type VideosTranslateStatusInput = z.infer<
	typeof VideosTranslateStatusInputSchema
>;

// Migrated to HeyGen v3 API endpoint per developers.heygen.com (GET /v3/video-translations/{id}).
const VideosTranslateStatusResponseSchema = wrapResponse(
	z.object({
		id: z.string(),
		status: z.enum(['pending', 'running', 'completed', 'failed']),
		title: z.string().nullable().optional(),
		output_language: z.string().nullable().optional(),
		input_language: z.string().nullable().optional(),
		duration: z.number().nullable().optional(),
		translate_audio_only: z.boolean().nullable().optional(),
		video_url: z.string().nullable().optional(),
		audio_url: z.string().nullable().optional(),
		srt_caption_url: z.string().nullable().optional(),
		vtt_caption_url: z.string().nullable().optional(),
		callback_id: z.string().nullable().optional(),
		created_at: z.number().nullable().optional(),
		failure_message: z.string().nullable().optional(),
	}),
);
export type VideosTranslateStatusResponse = z.infer<
	typeof VideosTranslateStatusResponseSchema
>;

const VideosTranslateTargetLanguagesInputSchema = z.object({});
export type VideosTranslateTargetLanguagesInput = z.infer<
	typeof VideosTranslateTargetLanguagesInputSchema
>;

// Migrated to HeyGen v3 API endpoint per developers.heygen.com (GET /v3/video-translations/languages).
const VideosTranslateTargetLanguagesResponseSchema = wrapResponse(
	z.object({ languages: z.array(z.string()) }),
);
export type VideosTranslateTargetLanguagesResponse = z.infer<
	typeof VideosTranslateTargetLanguagesResponseSchema
>;

// [B] Path inferred as `/v1/video/share`; HeyGen's docs describe the behavior (a public,
// unauthenticated share link) but no longer expose the concrete path/method.
const VideosGetSharableUrlInputSchema = z.object({
	video_id: z.string(),
});
export type VideosGetSharableUrlInput = z.infer<
	typeof VideosGetSharableUrlInputSchema
>;

const VideosGetSharableUrlResponseSchema = wrapResponse(
	z.object({ share_url: z.string() }).catchall(z.unknown()),
);
export type VideosGetSharableUrlResponse = z.infer<
	typeof VideosGetSharableUrlResponseSchema
>;

const VideosDeleteInputSchema = z.object({
	video_id: z.string(),
});
export type VideosDeleteInput = z.infer<typeof VideosDeleteInputSchema>;

const VideosDeleteResponseSchema = wrapResponse(
	z.record(z.string(), z.unknown()),
);
export type VideosDeleteResponse = z.infer<typeof VideosDeleteResponseSchema>;

const VideosListInputSchema = z.object({
	limit: z.number().optional(),
	token: z.string().optional(),
});
export type VideosListInput = z.infer<typeof VideosListInputSchema>;

const VideosListResponseSchema = wrapResponse(
	z.object({
		videos: z.array(z.record(z.string(), z.unknown())),
		token: z.string().optional(),
	}),
);
export type VideosListResponse = z.infer<typeof VideosListResponseSchema>;

// ---------------------------------------------------------------------------
// Domain 2: Avatars, Looks & Talking Photos — 18 ops
// ---------------------------------------------------------------------------

// Migrated to HeyGen v3 API endpoint per developers.heygen.com (GET /v3/avatars).
const AvatarsListInputSchema = z.object({
	ownership: z.enum(['public', 'private']).optional(),
	limit: z.number().optional(),
	token: z.string().optional(),
});
export type AvatarsListInput = z.infer<typeof AvatarsListInputSchema>;

const AvatarsListResponseSchema = wrapResponse(
	z.object({
		data: z.array(z.record(z.string(), z.unknown())),
		has_more: z.boolean(),
		next_token: z.string().nullable(),
	}),
);
export type AvatarsListResponse = z.infer<typeof AvatarsListResponseSchema>;

// [B] Path inferred as `/v2/avatar/{id}/details`, mirroring the `/details` suffix pattern
// used by other HeyGen "retrieve details" operations.
const AvatarsGetDetailsInputSchema = z.object({
	avatar_id: z.string(),
});
export type AvatarsGetDetailsInput = z.infer<typeof AvatarsGetDetailsInputSchema>;

const AvatarsGetDetailsResponseSchema = wrapResponse(
	z
		.object({ avatar_id: z.string().optional() })
		.catchall(z.unknown()),
);
export type AvatarsGetDetailsResponse = z.infer<
	typeof AvatarsGetDetailsResponseSchema
>;

// [B] Path inferred as `/v2/avatar_group/list`.
const AvatarsListGroupsInputSchema = z.object({});
export type AvatarsListGroupsInput = z.infer<typeof AvatarsListGroupsInputSchema>;

const AvatarsListGroupsResponseSchema = wrapResponse(
	z.object({ avatar_group_list: z.array(z.record(z.string(), z.unknown())) }),
);
export type AvatarsListGroupsResponse = z.infer<
	typeof AvatarsListGroupsResponseSchema
>;

const AvatarsListGroupAvatarsInputSchema = z.object({
	group_id: z.string(),
});
export type AvatarsListGroupAvatarsInput = z.infer<
	typeof AvatarsListGroupAvatarsInputSchema
>;

const AvatarsListGroupAvatarsResponseSchema = wrapResponse(
	z.object({ avatar_list: z.array(z.record(z.string(), z.unknown())) }),
);
export type AvatarsListGroupAvatarsResponse = z.infer<
	typeof AvatarsListGroupAvatarsResponseSchema
>;

// [B] Path inferred as `/v2/avatar_group/search_public`.
const AvatarsSearchPublicGroupsInputSchema = z.object({
	keyword: z.string().optional(),
	page: z.number().optional(),
	limit: z.number().optional(),
});
export type AvatarsSearchPublicGroupsInput = z.infer<
	typeof AvatarsSearchPublicGroupsInputSchema
>;

const AvatarsSearchPublicGroupsResponseSchema = wrapResponse(
	z.object({ avatar_group_list: z.array(z.record(z.string(), z.unknown())) }),
);
export type AvatarsSearchPublicGroupsResponse = z.infer<
	typeof AvatarsSearchPublicGroupsResponseSchema
>;

const AvatarsCreatePhotoGroupInputSchema = z.object({
	name: z.string(),
	image_key: z.string(),
	generation_id: z.string().optional(),
});
export type AvatarsCreatePhotoGroupInput = z.infer<
	typeof AvatarsCreatePhotoGroupInputSchema
>;

const AvatarsCreatePhotoGroupResponseSchema = wrapResponse(
	z.object({
		id: z.string(),
		image_url: z.string().optional(),
		name: z.string().optional(),
		status: z.string().optional(),
	}),
);
export type AvatarsCreatePhotoGroupResponse = z.infer<
	typeof AvatarsCreatePhotoGroupResponseSchema
>;

const AvatarsGeneratePhotosInputSchema = z.object({
	name: z.string(),
	age: z.string(),
	gender: z.string(),
	ethnicity: z.string(),
	orientation: z.string(),
	pose: z.string(),
	style: z.string(),
	appearance: z.string(),
});
export type AvatarsGeneratePhotosInput = z.infer<
	typeof AvatarsGeneratePhotosInputSchema
>;

const AvatarsGeneratePhotosResponseSchema = wrapResponse(
	z.object({ generation_id: z.string() }),
);
export type AvatarsGeneratePhotosResponse = z.infer<
	typeof AvatarsGeneratePhotosResponseSchema
>;

const AvatarsAddLooksInputSchema = z.object({
	group_id: z.string(),
	image_keys: z.array(z.string()),
	name: z.string().optional(),
	generation_id: z.string().optional(),
});
export type AvatarsAddLooksInput = z.infer<typeof AvatarsAddLooksInputSchema>;

const AvatarsAddLooksResponseSchema = wrapResponse(
	z.object({ generation_id: z.string().optional() }).catchall(z.unknown()),
);
export type AvatarsAddLooksResponse = z.infer<typeof AvatarsAddLooksResponseSchema>;

const AvatarsCheckLookStatusInputSchema = z.object({
	generation_id: z.string(),
});
export type AvatarsCheckLookStatusInput = z.infer<
	typeof AvatarsCheckLookStatusInputSchema
>;

const AvatarsCheckLookStatusResponseSchema = wrapResponse(
	z
		.object({
			generation_id: z.string().optional(),
			status: z.string().optional(),
			image_url_list: z.array(z.string()).optional(),
		})
		.catchall(z.unknown()),
);
export type AvatarsCheckLookStatusResponse = z.infer<
	typeof AvatarsCheckLookStatusResponseSchema
>;

// [B] Path inferred as `/v2/photo_avatar/train/status/{group_id}`.
const AvatarsGetTrainingStatusInputSchema = z.object({
	group_id: z.string(),
});
export type AvatarsGetTrainingStatusInput = z.infer<
	typeof AvatarsGetTrainingStatusInputSchema
>;

const AvatarsGetTrainingStatusResponseSchema = wrapResponse(
	z.object({ status: z.string() }).catchall(z.unknown()),
);
export type AvatarsGetTrainingStatusResponse = z.infer<
	typeof AvatarsGetTrainingStatusResponseSchema
>;

// [B] Path inferred as `/v2/photo_avatar/{id}`.
const AvatarsGetPhotoDetailsInputSchema = z.object({
	id: z.string(),
});
export type AvatarsGetPhotoDetailsInput = z.infer<
	typeof AvatarsGetPhotoDetailsInputSchema
>;

const AvatarsGetPhotoDetailsResponseSchema = wrapResponse(
	z.object({ id: z.string().optional() }).catchall(z.unknown()),
);
export type AvatarsGetPhotoDetailsResponse = z.infer<
	typeof AvatarsGetPhotoDetailsResponseSchema
>;

// [B] Path inferred as `/v2/photo_avatar/avatar_group/{group_id}`.
const AvatarsDeletePhotoGroupInputSchema = z.object({
	group_id: z.string(),
});
export type AvatarsDeletePhotoGroupInput = z.infer<
	typeof AvatarsDeletePhotoGroupInputSchema
>;

const AvatarsDeletePhotoGroupResponseSchema = wrapResponse(
	z.record(z.string(), z.unknown()),
);
export type AvatarsDeletePhotoGroupResponse = z.infer<
	typeof AvatarsDeletePhotoGroupResponseSchema
>;

// [B] Path inferred as `/v2/photo_avatar/{id}`.
const AvatarsDeletePhotoInputSchema = z.object({
	id: z.string(),
});
export type AvatarsDeletePhotoInput = z.infer<typeof AvatarsDeletePhotoInputSchema>;

const AvatarsDeletePhotoResponseSchema = wrapResponse(
	z.record(z.string(), z.unknown()),
);
export type AvatarsDeletePhotoResponse = z.infer<
	typeof AvatarsDeletePhotoResponseSchema
>;

const AvatarsAddMotionInputSchema = z.object({
	id: z.string(),
});
export type AvatarsAddMotionInput = z.infer<typeof AvatarsAddMotionInputSchema>;

const AvatarsAddMotionResponseSchema = wrapResponse(
	z.object({ id: z.string().optional() }).catchall(z.unknown()),
);
export type AvatarsAddMotionResponse = z.infer<typeof AvatarsAddMotionResponseSchema>;

// [B] Path inferred as `/v2/photo_avatar/upscale`.
const AvatarsUpscaleInputSchema = z.object({
	id: z.string(),
});
export type AvatarsUpscaleInput = z.infer<typeof AvatarsUpscaleInputSchema>;

const AvatarsUpscaleResponseSchema = wrapResponse(
	z.object({ id: z.string().optional() }).catchall(z.unknown()),
);
export type AvatarsUpscaleResponse = z.infer<typeof AvatarsUpscaleResponseSchema>;

const AvatarsListTalkingPhotosInputSchema = z.object({});
export type AvatarsListTalkingPhotosInput = z.infer<
	typeof AvatarsListTalkingPhotosInputSchema
>;

const AvatarsListTalkingPhotosResponseSchema = wrapResponse(
	z.array(z.record(z.string(), z.unknown())),
);
export type AvatarsListTalkingPhotosResponse = z.infer<
	typeof AvatarsListTalkingPhotosResponseSchema
>;

const AvatarsUploadTalkingPhotoInputSchema = z.object({
	// Raw image bytes, base64-encoded for transport through the plugin boundary; the
	// client sends them as the raw request body with the given content type.
	imageBase64: z.string(),
	contentType: z.string(),
});
export type AvatarsUploadTalkingPhotoInput = z.infer<
	typeof AvatarsUploadTalkingPhotoInputSchema
>;

const AvatarsUploadTalkingPhotoResponseSchema = wrapResponse(
	z.object({ talking_photo_id: z.string() }).catchall(z.unknown()),
);
export type AvatarsUploadTalkingPhotoResponse = z.infer<
	typeof AvatarsUploadTalkingPhotoResponseSchema
>;

const AvatarsDeleteTalkingPhotoInputSchema = z.object({
	talking_photo_id: z.string(),
});
export type AvatarsDeleteTalkingPhotoInput = z.infer<
	typeof AvatarsDeleteTalkingPhotoInputSchema
>;

const AvatarsDeleteTalkingPhotoResponseSchema = wrapResponse(
	z.record(z.string(), z.unknown()),
);
export type AvatarsDeleteTalkingPhotoResponse = z.infer<
	typeof AvatarsDeleteTalkingPhotoResponseSchema
>;

// ---------------------------------------------------------------------------
// Domain 3: Starfish Voice & TTS — 7 ops
// ---------------------------------------------------------------------------

// [B] Path inferred as `/v1/voice/generate`.
const VoicesGenerateSpeechInputSchema = z.object({
	text: z.string(),
	voice_id: z.string(),
	speed: z.number().optional(),
	pitch: z.number().optional(),
	locale: z.string().optional(),
	input_type: z.enum(['text', 'ssml']).optional(),
});
export type VoicesGenerateSpeechInput = z.infer<
	typeof VoicesGenerateSpeechInputSchema
>;

const VoicesGenerateSpeechResponseSchema = wrapResponse(
	z
		.object({ audio_url: z.string().optional(), duration: z.number().optional() })
		.catchall(z.unknown()),
);
export type VoicesGenerateSpeechResponse = z.infer<
	typeof VoicesGenerateSpeechResponseSchema
>;

// [B] Path inferred as `/v1/voice/preview` (Enterprise Beta feature per CLAUDE.md).
const VoicesGeneratePreviewInputSchema = z.object({
	voice_id: z.string(),
	text: z.string().optional(),
});
export type VoicesGeneratePreviewInput = z.infer<
	typeof VoicesGeneratePreviewInputSchema
>;

const VoicesGeneratePreviewResponseSchema = wrapResponse(
	z.object({ audio_url: z.string().optional() }).catchall(z.unknown()),
);
export type VoicesGeneratePreviewResponse = z.infer<
	typeof VoicesGeneratePreviewResponseSchema
>;

// [B] Path inferred as `/v1/voice/list_tts`.
const VoicesListTtsInputSchema = z.object({
	language: z.string().optional(),
	gender: z.string().optional(),
});
export type VoicesListTtsInput = z.infer<typeof VoicesListTtsInputSchema>;

const VoicesListTtsResponseSchema = wrapResponse(
	z.object({ voices: z.array(z.record(z.string(), z.unknown())) }),
);
export type VoicesListTtsResponse = z.infer<typeof VoicesListTtsResponseSchema>;

// [B] Path inferred as `/v1/voice/locale.list`.
const VoicesListLocalesInputSchema = z.object({});
export type VoicesListLocalesInput = z.infer<typeof VoicesListLocalesInputSchema>;

const VoicesListLocalesResponseSchema = wrapResponse(
	z.object({ locales: z.array(z.record(z.string(), z.unknown())) }),
);
export type VoicesListLocalesResponse = z.infer<
	typeof VoicesListLocalesResponseSchema
>;

const VoicesListV2InputSchema = z.object({});
export type VoicesListV2Input = z.infer<typeof VoicesListV2InputSchema>;

const VoicesListV2ResponseSchema = wrapResponse(
	z.object({ voices: z.array(z.record(z.string(), z.unknown())) }),
);
export type VoicesListV2Response = z.infer<typeof VoicesListV2ResponseSchema>;

const VoicesListV1InputSchema = z.object({});
export type VoicesListV1Input = z.infer<typeof VoicesListV1InputSchema>;

const VoicesListV1ResponseSchema = wrapResponse(
	z.object({ voices: z.array(z.record(z.string(), z.unknown())) }),
);
export type VoicesListV1Response = z.infer<typeof VoicesListV1ResponseSchema>;

// [B] Path inferred as `/v1/voice/brand.list`.
const VoicesListBrandVoicesInputSchema = z.object({});
export type VoicesListBrandVoicesInput = z.infer<
	typeof VoicesListBrandVoicesInputSchema
>;

const VoicesListBrandVoicesResponseSchema = wrapResponse(
	z.object({ brand_voices: z.array(z.record(z.string(), z.unknown())) }),
);
export type VoicesListBrandVoicesResponse = z.infer<
	typeof VoicesListBrandVoicesResponseSchema
>;

// ---------------------------------------------------------------------------
// Domain 4: Real-Time Interactive Streaming Avatars — 12 ops
// ---------------------------------------------------------------------------

const StreamingNewSessionInputSchema = z.object({
	quality: z.string().optional(),
	avatar_id: z.string().optional(),
	voice: z.record(z.string(), z.unknown()).optional(),
	knowledge_base_id: z.string().optional(),
	version: z.string().optional(),
});
export type StreamingNewSessionInput = z.infer<
	typeof StreamingNewSessionInputSchema
>;

const StreamingNewSessionResponseSchema = wrapResponse(
	z
		.object({
			session_id: z.string(),
			sdp: z.unknown().optional(),
			access_token: z.string().optional(),
			url: z.string().optional(),
			ice_servers: z.unknown().optional(),
			session_duration_limit: z.number().optional(),
		})
		.catchall(z.unknown()),
);
export type StreamingNewSessionResponse = z.infer<
	typeof StreamingNewSessionResponseSchema
>;

const StreamingCreateTokenInputSchema = z.object({});
export type StreamingCreateTokenInput = z.infer<
	typeof StreamingCreateTokenInputSchema
>;

const StreamingCreateTokenResponseSchema = wrapResponse(
	z.object({ token: z.string() }),
);
export type StreamingCreateTokenResponse = z.infer<
	typeof StreamingCreateTokenResponseSchema
>;

const StreamingStartInputSchema = z.object({
	session_id: z.string(),
	sdp: z.object({ type: z.string(), sdp: z.string() }),
});
export type StreamingStartInput = z.infer<typeof StreamingStartInputSchema>;

const StreamingStartResponseSchema = wrapResponse(
	z.object({ sdp: z.unknown().optional() }).catchall(z.unknown()),
);
export type StreamingStartResponse = z.infer<typeof StreamingStartResponseSchema>;

const StreamingStopInputSchema = z.object({
	session_id: z.string(),
});
export type StreamingStopInput = z.infer<typeof StreamingStopInputSchema>;

const StreamingStopResponseSchema = wrapResponse(
	z.record(z.string(), z.unknown()),
);
export type StreamingStopResponse = z.infer<typeof StreamingStopResponseSchema>;

const StreamingInterruptInputSchema = z.object({
	session_id: z.string(),
});
export type StreamingInterruptInput = z.infer<
	typeof StreamingInterruptInputSchema
>;

const StreamingInterruptResponseSchema = wrapResponse(
	z.record(z.string(), z.unknown()),
);
export type StreamingInterruptResponse = z.infer<
	typeof StreamingInterruptResponseSchema
>;

// [B] Path inferred as `/v1/streaming.keep_alive`, mirroring the dot-style naming of
// sibling streaming.* endpoints.
const StreamingKeepAliveInputSchema = z.object({
	session_id: z.string(),
});
export type StreamingKeepAliveInput = z.infer<
	typeof StreamingKeepAliveInputSchema
>;

const StreamingKeepAliveResponseSchema = wrapResponse(
	z.record(z.string(), z.unknown()),
);
export type StreamingKeepAliveResponse = z.infer<
	typeof StreamingKeepAliveResponseSchema
>;

const StreamingTaskInputSchema = z.object({
	session_id: z.string(),
	text: z.string(),
	task_type: z.enum(['talk', 'repeat']).optional(),
});
export type StreamingTaskInput = z.infer<typeof StreamingTaskInputSchema>;

const StreamingTaskResponseSchema = wrapResponse(
	z.object({ duration_ms: z.number().optional() }).catchall(z.unknown()),
);
export type StreamingTaskResponse = z.infer<typeof StreamingTaskResponseSchema>;

const StreamingIceInputSchema = z.object({
	session_id: z.string(),
	candidate: z.object({
		candidate: z.string(),
		sdpMLineIndex: z.union([z.string(), z.number()]).optional(),
		sdpMid: z.string().optional(),
		usernameFragment: z.string().optional(),
	}),
});
export type StreamingIceInput = z.infer<typeof StreamingIceInputSchema>;

const StreamingIceResponseSchema = wrapResponse(
	z.record(z.string(), z.unknown()),
);
export type StreamingIceResponse = z.infer<typeof StreamingIceResponseSchema>;

const StreamingNewInputSchema = z.object({
	quality: z.string().optional(),
});
export type StreamingNewInput = z.infer<typeof StreamingNewInputSchema>;

const StreamingNewResponseSchema = wrapResponse(
	z
		.object({ session_id: z.string(), sdp: z.unknown().optional() })
		.catchall(z.unknown()),
);
export type StreamingNewResponse = z.infer<typeof StreamingNewResponseSchema>;

const StreamingListInputSchema = z.object({});
export type StreamingListInput = z.infer<typeof StreamingListInputSchema>;

const StreamingListResponseSchema = wrapResponse(
	z.object({ sessions: z.array(z.record(z.string(), z.unknown())) }),
);
export type StreamingListResponse = z.infer<typeof StreamingListResponseSchema>;

const StreamingListAvatarsInputSchema = z.object({});
export type StreamingListAvatarsInput = z.infer<
	typeof StreamingListAvatarsInputSchema
>;

const StreamingListAvatarsResponseSchema = wrapResponse(
	z.array(z.record(z.string(), z.unknown())),
);
export type StreamingListAvatarsResponse = z.infer<
	typeof StreamingListAvatarsResponseSchema
>;

// [B] Path inferred as `/v1/streaming.history`, distinguishing past sessions from the
// active-session list at `/v1/streaming.list`.
const StreamingListSessionHistoryInputSchema = z.object({
	page: z.number().optional(),
	limit: z.number().optional(),
});
export type StreamingListSessionHistoryInput = z.infer<
	typeof StreamingListSessionHistoryInputSchema
>;

const StreamingListSessionHistoryResponseSchema = wrapResponse(
	z.object({ sessions: z.array(z.record(z.string(), z.unknown())) }),
);
export type StreamingListSessionHistoryResponse = z.infer<
	typeof StreamingListSessionHistoryResponseSchema
>;

// ---------------------------------------------------------------------------
// Domain 5: Knowledge Bases — 4 ops
// [B] All four paths inferred under the `/v1/streaming/knowledge_base/*` base confirmed
// by HeyGen's "Knowledge Base Management Endpoints" changelog entry; the exact per-action
// sub-paths are not published, so create/update/delete/list are modeled as sibling actions.
// ---------------------------------------------------------------------------

const KnowledgeBasesCreateInputSchema = z.object({
	name: z.string(),
	opening: z.string().optional(),
	prompt: z.string().optional(),
});
export type KnowledgeBasesCreateInput = z.infer<
	typeof KnowledgeBasesCreateInputSchema
>;

const KnowledgeBasesCreateResponseSchema = wrapResponse(
	z.object({ knowledge_base_id: z.string() }).catchall(z.unknown()),
);
export type KnowledgeBasesCreateResponse = z.infer<
	typeof KnowledgeBasesCreateResponseSchema
>;

const KnowledgeBasesListInputSchema = z.object({});
export type KnowledgeBasesListInput = z.infer<
	typeof KnowledgeBasesListInputSchema
>;

const KnowledgeBasesListResponseSchema = wrapResponse(
	z.object({ list: z.array(z.record(z.string(), z.unknown())) }),
);
export type KnowledgeBasesListResponse = z.infer<
	typeof KnowledgeBasesListResponseSchema
>;

const KnowledgeBasesUpdateInputSchema = z.object({
	knowledge_base_id: z.string(),
	name: z.string().optional(),
	opening: z.string().optional(),
	prompt: z.string().optional(),
});
export type KnowledgeBasesUpdateInput = z.infer<
	typeof KnowledgeBasesUpdateInputSchema
>;

const KnowledgeBasesUpdateResponseSchema = wrapResponse(
	z.record(z.string(), z.unknown()),
);
export type KnowledgeBasesUpdateResponse = z.infer<
	typeof KnowledgeBasesUpdateResponseSchema
>;

const KnowledgeBasesDeleteInputSchema = z.object({
	knowledge_base_id: z.string(),
});
export type KnowledgeBasesDeleteInput = z.infer<
	typeof KnowledgeBasesDeleteInputSchema
>;

const KnowledgeBasesDeleteResponseSchema = wrapResponse(
	z.record(z.string(), z.unknown()),
);
export type KnowledgeBasesDeleteResponse = z.infer<
	typeof KnowledgeBasesDeleteResponseSchema
>;

// ---------------------------------------------------------------------------
// Domain 6: Templates, Assets & Folder Organization — 12 ops
// ---------------------------------------------------------------------------

const AssetsListTemplatesInputSchema = z.object({});
export type AssetsListTemplatesInput = z.infer<
	typeof AssetsListTemplatesInputSchema
>;

const AssetsListTemplatesResponseSchema = wrapResponse(
	z.object({ templates: z.array(z.record(z.string(), z.unknown())) }),
);
export type AssetsListTemplatesResponse = z.infer<
	typeof AssetsListTemplatesResponseSchema
>;

const AssetsGetTemplateInputSchema = z.object({
	template_id: z.string(),
});
export type AssetsGetTemplateInput = z.infer<typeof AssetsGetTemplateInputSchema>;

const AssetsGetTemplateResponseSchema = wrapResponse(
	z.object({ template_id: z.string().optional() }).catchall(z.unknown()),
);
export type AssetsGetTemplateResponse = z.infer<
	typeof AssetsGetTemplateResponseSchema
>;

// HeyGen's official v1/v2 -> v3 endpoint comparison (developers.heygen.com/
// endpoint-version-comparison) lists templates as "Not yet available" in v3 — there is no
// published `/v3/template` path, so this stays on the same confirmed v2 endpoint as
// `getTemplate` above until HeyGen ships a v3 replacement.
const AssetsGetTemplateDetailsV3InputSchema = z.object({
	template_id: z.string(),
});
export type AssetsGetTemplateDetailsV3Input = z.infer<
	typeof AssetsGetTemplateDetailsV3InputSchema
>;

const AssetsGetTemplateDetailsV3ResponseSchema = wrapResponse(
	z.object({ template_id: z.string().optional() }).catchall(z.unknown()),
);
export type AssetsGetTemplateDetailsV3Response = z.infer<
	typeof AssetsGetTemplateDetailsV3ResponseSchema
>;

const AssetsUploadAssetInputSchema = z.object({
	// Raw file bytes, base64-encoded for transport through the plugin boundary.
	fileBase64: z.string(),
	contentType: z.string(),
});
export type AssetsUploadAssetInput = z.infer<typeof AssetsUploadAssetInputSchema>;

const AssetsUploadAssetResponseSchema = wrapResponse(
	z
		.object({ id: z.string().optional(), url: z.string().optional() })
		.catchall(z.unknown()),
);
export type AssetsUploadAssetResponse = z.infer<
	typeof AssetsUploadAssetResponseSchema
>;

const AssetsListAssetsInputSchema = z.object({
	file_type: z.string().optional(),
	folder_id: z.string().optional(),
	page: z.number().optional(),
	limit: z.number().optional(),
});
export type AssetsListAssetsInput = z.infer<typeof AssetsListAssetsInputSchema>;

const AssetsListAssetsResponseSchema = wrapResponse(
	z.object({ assets: z.array(z.record(z.string(), z.unknown())) }),
);
export type AssetsListAssetsResponse = z.infer<
	typeof AssetsListAssetsResponseSchema
>;

// [B] Path inferred as `/v2/assets`, a cursor-paginated sibling of the page-paginated
// `/v1/asset/list` above (HeyGen's issue lists both as distinct operations).
const AssetsListAssets2InputSchema = z.object({
	cursor: z.string().optional(),
	limit: z.number().optional(),
});
export type AssetsListAssets2Input = z.infer<typeof AssetsListAssets2InputSchema>;

const AssetsListAssets2ResponseSchema = wrapResponse(
	z.object({
		assets: z.array(z.record(z.string(), z.unknown())),
		next_cursor: z.string().optional(),
	}),
);
export type AssetsListAssets2Response = z.infer<
	typeof AssetsListAssets2ResponseSchema
>;

const AssetsDeleteAssetInputSchema = z.object({
	asset_id: z.string(),
});
export type AssetsDeleteAssetInput = z.infer<typeof AssetsDeleteAssetInputSchema>;

const AssetsDeleteAssetResponseSchema = wrapResponse(
	z.record(z.string(), z.unknown()),
);
export type AssetsDeleteAssetResponse = z.infer<
	typeof AssetsDeleteAssetResponseSchema
>;

const AssetsCreateFolderInputSchema = z.object({
	name: z.string(),
	parent_folder_id: z.string().optional(),
});
export type AssetsCreateFolderInput = z.infer<typeof AssetsCreateFolderInputSchema>;

const AssetsCreateFolderResponseSchema = wrapResponse(
	z.object({ folder_id: z.string() }).catchall(z.unknown()),
);
export type AssetsCreateFolderResponse = z.infer<
	typeof AssetsCreateFolderResponseSchema
>;

const AssetsListFoldersInputSchema = z.object({
	page: z.number().optional(),
	limit: z.number().optional(),
});
export type AssetsListFoldersInput = z.infer<typeof AssetsListFoldersInputSchema>;

const AssetsListFoldersResponseSchema = wrapResponse(
	z.object({ folders: z.array(z.record(z.string(), z.unknown())) }),
);
export type AssetsListFoldersResponse = z.infer<
	typeof AssetsListFoldersResponseSchema
>;

// [B] Path inferred as `PATCH /v1/folders/{folder_id}` (rename only).
const AssetsUpdateFolderInputSchema = z.object({
	folder_id: z.string(),
	name: z.string(),
});
export type AssetsUpdateFolderInput = z.infer<typeof AssetsUpdateFolderInputSchema>;

const AssetsUpdateFolderResponseSchema = wrapResponse(
	z.record(z.string(), z.unknown()),
);
export type AssetsUpdateFolderResponse = z.infer<
	typeof AssetsUpdateFolderResponseSchema
>;

// [B] Path inferred as `POST /v1/folders/{folder_id}/trash`.
const AssetsTrashFolderInputSchema = z.object({
	folder_id: z.string(),
});
export type AssetsTrashFolderInput = z.infer<typeof AssetsTrashFolderInputSchema>;

const AssetsTrashFolderResponseSchema = wrapResponse(
	z.record(z.string(), z.unknown()),
);
export type AssetsTrashFolderResponse = z.infer<
	typeof AssetsTrashFolderResponseSchema
>;

// [B] Path inferred as `POST /v1/folders/{folder_id}/restore`.
const AssetsRestoreFolderInputSchema = z.object({
	folder_id: z.string(),
});
export type AssetsRestoreFolderInput = z.infer<
	typeof AssetsRestoreFolderInputSchema
>;

const AssetsRestoreFolderResponseSchema = wrapResponse(
	z.record(z.string(), z.unknown()),
);
export type AssetsRestoreFolderResponse = z.infer<
	typeof AssetsRestoreFolderResponseSchema
>;

// ---------------------------------------------------------------------------
// Domain 7: Webhooks & Quota — 7 ops
// ---------------------------------------------------------------------------

const WebhooksQuotaAddEndpointInputSchema = z.object({
	url: z.string(),
	events: z.array(z.string()),
});
export type WebhooksQuotaAddEndpointInput = z.infer<
	typeof WebhooksQuotaAddEndpointInputSchema
>;

const WebhooksQuotaAddEndpointResponseSchema = wrapResponse(
	z.object({ endpoint_id: z.string() }).catchall(z.unknown()),
);
export type WebhooksQuotaAddEndpointResponse = z.infer<
	typeof WebhooksQuotaAddEndpointResponseSchema
>;

const WebhooksQuotaListEndpointsInputSchema = z.object({});
export type WebhooksQuotaListEndpointsInput = z.infer<
	typeof WebhooksQuotaListEndpointsInputSchema
>;

const WebhooksQuotaListEndpointsResponseSchema = wrapResponse(
	z.array(z.record(z.string(), z.unknown())),
);
export type WebhooksQuotaListEndpointsResponse = z.infer<
	typeof WebhooksQuotaListEndpointsResponseSchema
>;

const WebhooksQuotaListEventTypesInputSchema = z.object({});
export type WebhooksQuotaListEventTypesInput = z.infer<
	typeof WebhooksQuotaListEventTypesInputSchema
>;

const WebhooksQuotaListEventTypesResponseSchema = wrapResponse(
	z.array(z.record(z.string(), z.unknown())),
);
export type WebhooksQuotaListEventTypesResponse = z.infer<
	typeof WebhooksQuotaListEventTypesResponseSchema
>;

// [B] Path inferred as `PATCH /v1/webhook/endpoint.update`.
const WebhooksQuotaUpdateEndpointInputSchema = z.object({
	endpoint_id: z.string(),
	url: z.string().optional(),
	events: z.array(z.string()).optional(),
});
export type WebhooksQuotaUpdateEndpointInput = z.infer<
	typeof WebhooksQuotaUpdateEndpointInputSchema
>;

const WebhooksQuotaUpdateEndpointResponseSchema = wrapResponse(
	z.record(z.string(), z.unknown()),
);
export type WebhooksQuotaUpdateEndpointResponse = z.infer<
	typeof WebhooksQuotaUpdateEndpointResponseSchema
>;

const WebhooksQuotaDeleteEndpointInputSchema = z.object({
	endpoint_id: z.string(),
});
export type WebhooksQuotaDeleteEndpointInput = z.infer<
	typeof WebhooksQuotaDeleteEndpointInputSchema
>;

const WebhooksQuotaDeleteEndpointResponseSchema = wrapResponse(
	z.record(z.string(), z.unknown()),
);
export type WebhooksQuotaDeleteEndpointResponse = z.infer<
	typeof WebhooksQuotaDeleteEndpointResponseSchema
>;

// Migrated to HeyGen v3 API endpoint per developers.heygen.com (GET /v3/users/me).
const WebhooksQuotaGetCurrentUserInputSchema = z.object({});
export type WebhooksQuotaGetCurrentUserInput = z.infer<
	typeof WebhooksQuotaGetCurrentUserInputSchema
>;

const WebhooksQuotaGetCurrentUserResponseSchema = wrapResponse(
	z.object({
		username: z.string(),
		email: z.string().nullable(),
		first_name: z.string().nullable(),
		last_name: z.string().nullable(),
		billing_type: z.enum(['wallet', 'subscription', 'usage_based']).nullable().optional(),
		// Exactly one of these is populated depending on `billing_type`; shapes vary per tier
		// so they're left permissive rather than fully modeled.
		wallet: z.record(z.string(), z.unknown()).optional(),
		subscription: z.record(z.string(), z.unknown()).optional(),
		usage_based: z.record(z.string(), z.unknown()).optional(),
	}),
);
export type WebhooksQuotaGetCurrentUserResponse = z.infer<
	typeof WebhooksQuotaGetCurrentUserResponseSchema
>;

const WebhooksQuotaRemainingQuotaInputSchema = z.object({});
export type WebhooksQuotaRemainingQuotaInput = z.infer<
	typeof WebhooksQuotaRemainingQuotaInputSchema
>;

const WebhooksQuotaRemainingQuotaResponseSchema = wrapResponse(
	z
		.object({ remaining_quota: z.number().optional() })
		.catchall(z.unknown()),
);
export type WebhooksQuotaRemainingQuotaResponse = z.infer<
	typeof WebhooksQuotaRemainingQuotaResponseSchema
>;

// ---------------------------------------------------------------------------
// Aggregated maps
// ---------------------------------------------------------------------------

export type HeygenEndpointInputs = {
	videosGenerate: VideosGenerateInput;
	videosTemplateGenerate: VideosTemplateGenerateInput;
	videosCreateWebm: VideosCreateWebmInput;
	videosPersonalizedAddContact: VideosPersonalizedAddContactInput;
	videosPersonalizedProjectDetail: VideosPersonalizedProjectDetailInput;
	videosGetStatus: VideosGetStatusInput;
	videosTranslate: VideosTranslateInput;
	videosTranslateStatus: VideosTranslateStatusInput;
	videosTranslateTargetLanguages: VideosTranslateTargetLanguagesInput;
	videosGetSharableUrl: VideosGetSharableUrlInput;
	videosDelete: VideosDeleteInput;
	videosList: VideosListInput;

	avatarsList: AvatarsListInput;
	avatarsGetDetails: AvatarsGetDetailsInput;
	avatarsListGroups: AvatarsListGroupsInput;
	avatarsListGroupAvatars: AvatarsListGroupAvatarsInput;
	avatarsSearchPublicGroups: AvatarsSearchPublicGroupsInput;
	avatarsCreatePhotoGroup: AvatarsCreatePhotoGroupInput;
	avatarsGeneratePhotos: AvatarsGeneratePhotosInput;
	avatarsAddLooks: AvatarsAddLooksInput;
	avatarsCheckLookStatus: AvatarsCheckLookStatusInput;
	avatarsGetTrainingStatus: AvatarsGetTrainingStatusInput;
	avatarsGetPhotoDetails: AvatarsGetPhotoDetailsInput;
	avatarsDeletePhotoGroup: AvatarsDeletePhotoGroupInput;
	avatarsDeletePhoto: AvatarsDeletePhotoInput;
	avatarsAddMotion: AvatarsAddMotionInput;
	avatarsUpscale: AvatarsUpscaleInput;
	avatarsListTalkingPhotos: AvatarsListTalkingPhotosInput;
	avatarsUploadTalkingPhoto: AvatarsUploadTalkingPhotoInput;
	avatarsDeleteTalkingPhoto: AvatarsDeleteTalkingPhotoInput;

	voicesGenerateSpeech: VoicesGenerateSpeechInput;
	voicesGeneratePreview: VoicesGeneratePreviewInput;
	voicesListTts: VoicesListTtsInput;
	voicesListLocales: VoicesListLocalesInput;
	voicesListV2: VoicesListV2Input;
	voicesListV1: VoicesListV1Input;
	voicesListBrandVoices: VoicesListBrandVoicesInput;

	streamingNewSession: StreamingNewSessionInput;
	streamingCreateToken: StreamingCreateTokenInput;
	streamingStart: StreamingStartInput;
	streamingStop: StreamingStopInput;
	streamingInterrupt: StreamingInterruptInput;
	streamingKeepAlive: StreamingKeepAliveInput;
	streamingTask: StreamingTaskInput;
	streamingIce: StreamingIceInput;
	streamingNew: StreamingNewInput;
	streamingList: StreamingListInput;
	streamingListAvatars: StreamingListAvatarsInput;
	streamingListSessionHistory: StreamingListSessionHistoryInput;

	knowledgeBasesCreate: KnowledgeBasesCreateInput;
	knowledgeBasesList: KnowledgeBasesListInput;
	knowledgeBasesUpdate: KnowledgeBasesUpdateInput;
	knowledgeBasesDelete: KnowledgeBasesDeleteInput;

	assetsListTemplates: AssetsListTemplatesInput;
	assetsGetTemplate: AssetsGetTemplateInput;
	assetsGetTemplateDetailsV3: AssetsGetTemplateDetailsV3Input;
	assetsUploadAsset: AssetsUploadAssetInput;
	assetsListAssets: AssetsListAssetsInput;
	assetsListAssets2: AssetsListAssets2Input;
	assetsDeleteAsset: AssetsDeleteAssetInput;
	assetsCreateFolder: AssetsCreateFolderInput;
	assetsListFolders: AssetsListFoldersInput;
	assetsUpdateFolder: AssetsUpdateFolderInput;
	assetsTrashFolder: AssetsTrashFolderInput;
	assetsRestoreFolder: AssetsRestoreFolderInput;

	webhooksQuotaAddEndpoint: WebhooksQuotaAddEndpointInput;
	webhooksQuotaListEndpoints: WebhooksQuotaListEndpointsInput;
	webhooksQuotaListEventTypes: WebhooksQuotaListEventTypesInput;
	webhooksQuotaUpdateEndpoint: WebhooksQuotaUpdateEndpointInput;
	webhooksQuotaDeleteEndpoint: WebhooksQuotaDeleteEndpointInput;
	webhooksQuotaGetCurrentUser: WebhooksQuotaGetCurrentUserInput;
	webhooksQuotaRemainingQuota: WebhooksQuotaRemainingQuotaInput;
};

export type HeygenEndpointOutputs = {
	videosGenerate: VideosGenerateResponse;
	videosTemplateGenerate: VideosTemplateGenerateResponse;
	videosCreateWebm: VideosCreateWebmResponse;
	videosPersonalizedAddContact: VideosPersonalizedAddContactResponse;
	videosPersonalizedProjectDetail: VideosPersonalizedProjectDetailResponse;
	videosGetStatus: VideosGetStatusResponse;
	videosTranslate: VideosTranslateResponse;
	videosTranslateStatus: VideosTranslateStatusResponse;
	videosTranslateTargetLanguages: VideosTranslateTargetLanguagesResponse;
	videosGetSharableUrl: VideosGetSharableUrlResponse;
	videosDelete: VideosDeleteResponse;
	videosList: VideosListResponse;

	avatarsList: AvatarsListResponse;
	avatarsGetDetails: AvatarsGetDetailsResponse;
	avatarsListGroups: AvatarsListGroupsResponse;
	avatarsListGroupAvatars: AvatarsListGroupAvatarsResponse;
	avatarsSearchPublicGroups: AvatarsSearchPublicGroupsResponse;
	avatarsCreatePhotoGroup: AvatarsCreatePhotoGroupResponse;
	avatarsGeneratePhotos: AvatarsGeneratePhotosResponse;
	avatarsAddLooks: AvatarsAddLooksResponse;
	avatarsCheckLookStatus: AvatarsCheckLookStatusResponse;
	avatarsGetTrainingStatus: AvatarsGetTrainingStatusResponse;
	avatarsGetPhotoDetails: AvatarsGetPhotoDetailsResponse;
	avatarsDeletePhotoGroup: AvatarsDeletePhotoGroupResponse;
	avatarsDeletePhoto: AvatarsDeletePhotoResponse;
	avatarsAddMotion: AvatarsAddMotionResponse;
	avatarsUpscale: AvatarsUpscaleResponse;
	avatarsListTalkingPhotos: AvatarsListTalkingPhotosResponse;
	avatarsUploadTalkingPhoto: AvatarsUploadTalkingPhotoResponse;
	avatarsDeleteTalkingPhoto: AvatarsDeleteTalkingPhotoResponse;

	voicesGenerateSpeech: VoicesGenerateSpeechResponse;
	voicesGeneratePreview: VoicesGeneratePreviewResponse;
	voicesListTts: VoicesListTtsResponse;
	voicesListLocales: VoicesListLocalesResponse;
	voicesListV2: VoicesListV2Response;
	voicesListV1: VoicesListV1Response;
	voicesListBrandVoices: VoicesListBrandVoicesResponse;

	streamingNewSession: StreamingNewSessionResponse;
	streamingCreateToken: StreamingCreateTokenResponse;
	streamingStart: StreamingStartResponse;
	streamingStop: StreamingStopResponse;
	streamingInterrupt: StreamingInterruptResponse;
	streamingKeepAlive: StreamingKeepAliveResponse;
	streamingTask: StreamingTaskResponse;
	streamingIce: StreamingIceResponse;
	streamingNew: StreamingNewResponse;
	streamingList: StreamingListResponse;
	streamingListAvatars: StreamingListAvatarsResponse;
	streamingListSessionHistory: StreamingListSessionHistoryResponse;

	knowledgeBasesCreate: KnowledgeBasesCreateResponse;
	knowledgeBasesList: KnowledgeBasesListResponse;
	knowledgeBasesUpdate: KnowledgeBasesUpdateResponse;
	knowledgeBasesDelete: KnowledgeBasesDeleteResponse;

	assetsListTemplates: AssetsListTemplatesResponse;
	assetsGetTemplate: AssetsGetTemplateResponse;
	assetsGetTemplateDetailsV3: AssetsGetTemplateDetailsV3Response;
	assetsUploadAsset: AssetsUploadAssetResponse;
	assetsListAssets: AssetsListAssetsResponse;
	assetsListAssets2: AssetsListAssets2Response;
	assetsDeleteAsset: AssetsDeleteAssetResponse;
	assetsCreateFolder: AssetsCreateFolderResponse;
	assetsListFolders: AssetsListFoldersResponse;
	assetsUpdateFolder: AssetsUpdateFolderResponse;
	assetsTrashFolder: AssetsTrashFolderResponse;
	assetsRestoreFolder: AssetsRestoreFolderResponse;

	webhooksQuotaAddEndpoint: WebhooksQuotaAddEndpointResponse;
	webhooksQuotaListEndpoints: WebhooksQuotaListEndpointsResponse;
	webhooksQuotaListEventTypes: WebhooksQuotaListEventTypesResponse;
	webhooksQuotaUpdateEndpoint: WebhooksQuotaUpdateEndpointResponse;
	webhooksQuotaDeleteEndpoint: WebhooksQuotaDeleteEndpointResponse;
	webhooksQuotaGetCurrentUser: WebhooksQuotaGetCurrentUserResponse;
	webhooksQuotaRemainingQuota: WebhooksQuotaRemainingQuotaResponse;
};

export const HeygenEndpointInputSchemas = {
	videosGenerate: VideosGenerateInputSchema,
	videosTemplateGenerate: VideosTemplateGenerateInputSchema,
	videosCreateWebm: VideosCreateWebmInputSchema,
	videosPersonalizedAddContact: VideosPersonalizedAddContactInputSchema,
	videosPersonalizedProjectDetail: VideosPersonalizedProjectDetailInputSchema,
	videosGetStatus: VideosGetStatusInputSchema,
	videosTranslate: VideosTranslateInputSchema,
	videosTranslateStatus: VideosTranslateStatusInputSchema,
	videosTranslateTargetLanguages: VideosTranslateTargetLanguagesInputSchema,
	videosGetSharableUrl: VideosGetSharableUrlInputSchema,
	videosDelete: VideosDeleteInputSchema,
	videosList: VideosListInputSchema,

	avatarsList: AvatarsListInputSchema,
	avatarsGetDetails: AvatarsGetDetailsInputSchema,
	avatarsListGroups: AvatarsListGroupsInputSchema,
	avatarsListGroupAvatars: AvatarsListGroupAvatarsInputSchema,
	avatarsSearchPublicGroups: AvatarsSearchPublicGroupsInputSchema,
	avatarsCreatePhotoGroup: AvatarsCreatePhotoGroupInputSchema,
	avatarsGeneratePhotos: AvatarsGeneratePhotosInputSchema,
	avatarsAddLooks: AvatarsAddLooksInputSchema,
	avatarsCheckLookStatus: AvatarsCheckLookStatusInputSchema,
	avatarsGetTrainingStatus: AvatarsGetTrainingStatusInputSchema,
	avatarsGetPhotoDetails: AvatarsGetPhotoDetailsInputSchema,
	avatarsDeletePhotoGroup: AvatarsDeletePhotoGroupInputSchema,
	avatarsDeletePhoto: AvatarsDeletePhotoInputSchema,
	avatarsAddMotion: AvatarsAddMotionInputSchema,
	avatarsUpscale: AvatarsUpscaleInputSchema,
	avatarsListTalkingPhotos: AvatarsListTalkingPhotosInputSchema,
	avatarsUploadTalkingPhoto: AvatarsUploadTalkingPhotoInputSchema,
	avatarsDeleteTalkingPhoto: AvatarsDeleteTalkingPhotoInputSchema,

	voicesGenerateSpeech: VoicesGenerateSpeechInputSchema,
	voicesGeneratePreview: VoicesGeneratePreviewInputSchema,
	voicesListTts: VoicesListTtsInputSchema,
	voicesListLocales: VoicesListLocalesInputSchema,
	voicesListV2: VoicesListV2InputSchema,
	voicesListV1: VoicesListV1InputSchema,
	voicesListBrandVoices: VoicesListBrandVoicesInputSchema,

	streamingNewSession: StreamingNewSessionInputSchema,
	streamingCreateToken: StreamingCreateTokenInputSchema,
	streamingStart: StreamingStartInputSchema,
	streamingStop: StreamingStopInputSchema,
	streamingInterrupt: StreamingInterruptInputSchema,
	streamingKeepAlive: StreamingKeepAliveInputSchema,
	streamingTask: StreamingTaskInputSchema,
	streamingIce: StreamingIceInputSchema,
	streamingNew: StreamingNewInputSchema,
	streamingList: StreamingListInputSchema,
	streamingListAvatars: StreamingListAvatarsInputSchema,
	streamingListSessionHistory: StreamingListSessionHistoryInputSchema,

	knowledgeBasesCreate: KnowledgeBasesCreateInputSchema,
	knowledgeBasesList: KnowledgeBasesListInputSchema,
	knowledgeBasesUpdate: KnowledgeBasesUpdateInputSchema,
	knowledgeBasesDelete: KnowledgeBasesDeleteInputSchema,

	assetsListTemplates: AssetsListTemplatesInputSchema,
	assetsGetTemplate: AssetsGetTemplateInputSchema,
	assetsGetTemplateDetailsV3: AssetsGetTemplateDetailsV3InputSchema,
	assetsUploadAsset: AssetsUploadAssetInputSchema,
	assetsListAssets: AssetsListAssetsInputSchema,
	assetsListAssets2: AssetsListAssets2InputSchema,
	assetsDeleteAsset: AssetsDeleteAssetInputSchema,
	assetsCreateFolder: AssetsCreateFolderInputSchema,
	assetsListFolders: AssetsListFoldersInputSchema,
	assetsUpdateFolder: AssetsUpdateFolderInputSchema,
	assetsTrashFolder: AssetsTrashFolderInputSchema,
	assetsRestoreFolder: AssetsRestoreFolderInputSchema,

	webhooksQuotaAddEndpoint: WebhooksQuotaAddEndpointInputSchema,
	webhooksQuotaListEndpoints: WebhooksQuotaListEndpointsInputSchema,
	webhooksQuotaListEventTypes: WebhooksQuotaListEventTypesInputSchema,
	webhooksQuotaUpdateEndpoint: WebhooksQuotaUpdateEndpointInputSchema,
	webhooksQuotaDeleteEndpoint: WebhooksQuotaDeleteEndpointInputSchema,
	webhooksQuotaGetCurrentUser: WebhooksQuotaGetCurrentUserInputSchema,
	webhooksQuotaRemainingQuota: WebhooksQuotaRemainingQuotaInputSchema,
} as const;

export const HeygenEndpointOutputSchemas = {
	videosGenerate: VideosGenerateResponseSchema,
	videosTemplateGenerate: VideosTemplateGenerateResponseSchema,
	videosCreateWebm: VideosCreateWebmResponseSchema,
	videosPersonalizedAddContact: VideosPersonalizedAddContactResponseSchema,
	videosPersonalizedProjectDetail: VideosPersonalizedProjectDetailResponseSchema,
	videosGetStatus: VideosGetStatusResponseSchema,
	videosTranslate: VideosTranslateResponseSchema,
	videosTranslateStatus: VideosTranslateStatusResponseSchema,
	videosTranslateTargetLanguages: VideosTranslateTargetLanguagesResponseSchema,
	videosGetSharableUrl: VideosGetSharableUrlResponseSchema,
	videosDelete: VideosDeleteResponseSchema,
	videosList: VideosListResponseSchema,

	avatarsList: AvatarsListResponseSchema,
	avatarsGetDetails: AvatarsGetDetailsResponseSchema,
	avatarsListGroups: AvatarsListGroupsResponseSchema,
	avatarsListGroupAvatars: AvatarsListGroupAvatarsResponseSchema,
	avatarsSearchPublicGroups: AvatarsSearchPublicGroupsResponseSchema,
	avatarsCreatePhotoGroup: AvatarsCreatePhotoGroupResponseSchema,
	avatarsGeneratePhotos: AvatarsGeneratePhotosResponseSchema,
	avatarsAddLooks: AvatarsAddLooksResponseSchema,
	avatarsCheckLookStatus: AvatarsCheckLookStatusResponseSchema,
	avatarsGetTrainingStatus: AvatarsGetTrainingStatusResponseSchema,
	avatarsGetPhotoDetails: AvatarsGetPhotoDetailsResponseSchema,
	avatarsDeletePhotoGroup: AvatarsDeletePhotoGroupResponseSchema,
	avatarsDeletePhoto: AvatarsDeletePhotoResponseSchema,
	avatarsAddMotion: AvatarsAddMotionResponseSchema,
	avatarsUpscale: AvatarsUpscaleResponseSchema,
	avatarsListTalkingPhotos: AvatarsListTalkingPhotosResponseSchema,
	avatarsUploadTalkingPhoto: AvatarsUploadTalkingPhotoResponseSchema,
	avatarsDeleteTalkingPhoto: AvatarsDeleteTalkingPhotoResponseSchema,

	voicesGenerateSpeech: VoicesGenerateSpeechResponseSchema,
	voicesGeneratePreview: VoicesGeneratePreviewResponseSchema,
	voicesListTts: VoicesListTtsResponseSchema,
	voicesListLocales: VoicesListLocalesResponseSchema,
	voicesListV2: VoicesListV2ResponseSchema,
	voicesListV1: VoicesListV1ResponseSchema,
	voicesListBrandVoices: VoicesListBrandVoicesResponseSchema,

	streamingNewSession: StreamingNewSessionResponseSchema,
	streamingCreateToken: StreamingCreateTokenResponseSchema,
	streamingStart: StreamingStartResponseSchema,
	streamingStop: StreamingStopResponseSchema,
	streamingInterrupt: StreamingInterruptResponseSchema,
	streamingKeepAlive: StreamingKeepAliveResponseSchema,
	streamingTask: StreamingTaskResponseSchema,
	streamingIce: StreamingIceResponseSchema,
	streamingNew: StreamingNewResponseSchema,
	streamingList: StreamingListResponseSchema,
	streamingListAvatars: StreamingListAvatarsResponseSchema,
	streamingListSessionHistory: StreamingListSessionHistoryResponseSchema,

	knowledgeBasesCreate: KnowledgeBasesCreateResponseSchema,
	knowledgeBasesList: KnowledgeBasesListResponseSchema,
	knowledgeBasesUpdate: KnowledgeBasesUpdateResponseSchema,
	knowledgeBasesDelete: KnowledgeBasesDeleteResponseSchema,

	assetsListTemplates: AssetsListTemplatesResponseSchema,
	assetsGetTemplate: AssetsGetTemplateResponseSchema,
	assetsGetTemplateDetailsV3: AssetsGetTemplateDetailsV3ResponseSchema,
	assetsUploadAsset: AssetsUploadAssetResponseSchema,
	assetsListAssets: AssetsListAssetsResponseSchema,
	assetsListAssets2: AssetsListAssets2ResponseSchema,
	assetsDeleteAsset: AssetsDeleteAssetResponseSchema,
	assetsCreateFolder: AssetsCreateFolderResponseSchema,
	assetsListFolders: AssetsListFoldersResponseSchema,
	assetsUpdateFolder: AssetsUpdateFolderResponseSchema,
	assetsTrashFolder: AssetsTrashFolderResponseSchema,
	assetsRestoreFolder: AssetsRestoreFolderResponseSchema,

	webhooksQuotaAddEndpoint: WebhooksQuotaAddEndpointResponseSchema,
	webhooksQuotaListEndpoints: WebhooksQuotaListEndpointsResponseSchema,
	webhooksQuotaListEventTypes: WebhooksQuotaListEventTypesResponseSchema,
	webhooksQuotaUpdateEndpoint: WebhooksQuotaUpdateEndpointResponseSchema,
	webhooksQuotaDeleteEndpoint: WebhooksQuotaDeleteEndpointResponseSchema,
	webhooksQuotaGetCurrentUser: WebhooksQuotaGetCurrentUserResponseSchema,
	webhooksQuotaRemainingQuota: WebhooksQuotaRemainingQuotaResponseSchema,
} as const;
