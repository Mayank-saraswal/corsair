import { logEventFromContext } from 'corsair/core';
import type { IgnisignWebhooks } from '..';
import { createIgnisignMatch, verifyIgnisignWebhookSignature } from './types';

export const example: IgnisignWebhooks['example'] = {
	match: createIgnisignMatch('example'),

	handler: async (ctx, request) => {
		const verification = verifyIgnisignWebhookSignature(request, ctx.key);
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

		await logEventFromContext(ctx, 'ignisign.webhook.example', { ...event }, 'completed');

		return { success: true, data: event };
	},
};
