import { z } from 'zod';

const VideoObjectSchema = z.object({
	id: z.string(),
	object: z.literal('video'),
	created_at: z.number(),
	status: z.enum(['queued', 'in_progress', 'completed', 'failed']),
	model: z.string().optional(),
	progress: z.number().optional(),
	seconds: z.string().optional(),
	size: z.string().optional(),
	remixed_from_video_id: z.string().nullable().optional(),
	error: z
		.object({ code: z.string(), message: z.string() })
		.nullable()
		.optional(),
});
export type VideoObject = z.infer<typeof VideoObjectSchema>;

export const VideosCreateInputSchema = z.object({
	prompt: z.string(),
	model: z.string().optional(),
	size: z.string().optional(),
	seconds: z.string().optional(),
	inputReference: z.union([z.instanceof(Blob), z.string()]).optional(),
	inputReferenceFileName: z.string().optional(),
});
export type VideosCreateInput = z.infer<typeof VideosCreateInputSchema>;

export const VideosCreateResponseSchema = VideoObjectSchema;
export type VideosCreateResponse = z.infer<typeof VideosCreateResponseSchema>;

export const VideosListInputSchema = z.object({
	limit: z.number().optional(),
	order: z.enum(['asc', 'desc']).optional(),
	after: z.string().optional(),
});
export type VideosListInput = z.infer<typeof VideosListInputSchema>;

export const VideosListResponseSchema = z.object({
	object: z.literal('list'),
	data: z.array(VideoObjectSchema),
	first_id: z.string().optional(),
	last_id: z.string().optional(),
	has_more: z.boolean(),
});
export type VideosListResponse = z.infer<typeof VideosListResponseSchema>;

export const VideosRetrieveInputSchema = z.object({
	videoId: z.string(),
});
export type VideosRetrieveInput = z.infer<typeof VideosRetrieveInputSchema>;

export const VideosRetrieveResponseSchema = VideoObjectSchema;
export type VideosRetrieveResponse = z.infer<
	typeof VideosRetrieveResponseSchema
>;

export const VideosDeleteInputSchema = z.object({
	videoId: z.string(),
});
export type VideosDeleteInput = z.infer<typeof VideosDeleteInputSchema>;

export const VideosDeleteResponseSchema = z.object({
	id: z.string(),
	object: z.literal('video.deleted'),
	deleted: z.boolean(),
});
export type VideosDeleteResponse = z.infer<typeof VideosDeleteResponseSchema>;

export const VideosCreateRemixInputSchema = z.object({
	videoId: z.string(),
	prompt: z.string(),
});
export type VideosCreateRemixInput = z.infer<
	typeof VideosCreateRemixInputSchema
>;

export const VideosCreateRemixResponseSchema = VideoObjectSchema;
export type VideosCreateRemixResponse = z.infer<
	typeof VideosCreateRemixResponseSchema
>;

export const VideosDownloadInputSchema = z.object({
	videoId: z.string(),
});
export type VideosDownloadInput = z.infer<typeof VideosDownloadInputSchema>;

export const VideosDownloadResponseSchema = z.object({
	videoId: z.string(),
	contentBase64: z.string(),
});
export type VideosDownloadResponse = z.infer<
	typeof VideosDownloadResponseSchema
>;
