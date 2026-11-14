import { logEventFromContext } from 'corsair/core';
import type { JotformWebhooks } from '..';
import { createJotformMatch, verifyJotformWebhookSignature } from './types';

export const example: JotformWebhooks['example'] = {
	match: createJotformMatch('example'),

	handler: async (ctx, request) => {
		const verification = verifyJotformWebhookSignature(request, ctx.key);
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

		await logEventFromContext(ctx, 'jotform.webhook.example', { ...event }, 'completed');

		return { success: true, data: event };
	},
};
