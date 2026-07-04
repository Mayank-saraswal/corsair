import { z } from 'zod';

export const RealtimeCreateCallInputSchema = z.object({
	sdp: z.string().optional(),
	session: z.record(z.string(), z.unknown()),
});
export type RealtimeCreateCallInput = z.infer<
	typeof RealtimeCreateCallInputSchema
>;

export const RealtimeCreateCallResponseSchema = z
	.object({
		id: z.string().optional(),
		sdp: z.string().optional(),
	})
	.catchall(z.unknown());
export type RealtimeCreateCallResponse = z.infer<
	typeof RealtimeCreateCallResponseSchema
>;

export const RealtimeCreateClientSecretInputSchema = z.object({
	session: z.record(z.string(), z.unknown()).optional(),
	expiresAfter: z
		.object({
			anchor: z.string(),
			seconds: z.number(),
		})
		.optional(),
});
export type RealtimeCreateClientSecretInput = z.infer<
	typeof RealtimeCreateClientSecretInputSchema
>;

export const RealtimeCreateClientSecretResponseSchema = z
	.object({
		value: z.string(),
		expires_at: z.number(),
	})
	.catchall(z.unknown());
export type RealtimeCreateClientSecretResponse = z.infer<
	typeof RealtimeCreateClientSecretResponseSchema
>;

export const RealtimeCreateSessionInputSchema = z.object({
	model: z.string().optional(),
	voice: z.string().optional(),
	modalities: z.array(z.string()).optional(),
	instructions: z.string().optional(),
});
export type RealtimeCreateSessionInput = z.infer<
	typeof RealtimeCreateSessionInputSchema
>;

export const RealtimeCreateSessionResponseSchema = z
	.object({
		id: z.string().optional(),
	})
	.catchall(z.unknown());
export type RealtimeCreateSessionResponse = z.infer<
	typeof RealtimeCreateSessionResponseSchema
>;

export const RealtimeCreateTranscriptionSessionInputSchema = z.object({
	inputAudioFormat: z.string().optional(),
	inputAudioTranscription: z.record(z.string(), z.unknown()).optional(),
});
export type RealtimeCreateTranscriptionSessionInput = z.infer<
	typeof RealtimeCreateTranscriptionSessionInputSchema
>;

export const RealtimeCreateTranscriptionSessionResponseSchema = z
	.object({
		id: z.string().optional(),
	})
	.catchall(z.unknown());
export type RealtimeCreateTranscriptionSessionResponse = z.infer<
	typeof RealtimeCreateTranscriptionSessionResponseSchema
>;
