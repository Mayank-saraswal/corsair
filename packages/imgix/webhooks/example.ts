import { logEventFromContext } from 'corsair/core';
import type { ImgixWebhooks } from '..';
import { createImgixMatch, verifyImgixWebhookSignature } from './types';

export const example: ImgixWebhooks['example'] = {
	match: createImgixMatch('example'),

	handler: async (ctx, request) => {
		const verification = verifyImgixWebhookSignature(request, ctx.key);
		if (!verification.valid) {
			return {
				success: false,
				statusCode: 401,
				error: verification.error || 'Signature verification failed',
			};
		}

		const event = request.payload;
		if (event.type !== 'example') {
			return { success: true, data: undefined };
		}

		await logEventFromContext(ctx, 'imgix.webhook.example', { ...event }, 'completed');

		return { success: true, data: event };
	},
};
