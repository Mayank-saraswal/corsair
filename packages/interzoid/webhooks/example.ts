import { logEventFromContext } from 'corsair/core';
import type { InterzoidWebhooks } from '..';
import { createInterzoidMatch, verifyInterzoidWebhookSignature } from './types';

export const example: InterzoidWebhooks['example'] = {
	match: createInterzoidMatch('example'),

	handler: async (ctx, request) => {
		const verification = verifyInterzoidWebhookSignature(request, ctx.key);
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

		await logEventFromContext(ctx, 'interzoid.webhook.example', { ...event }, 'completed');

		return { success: true, data: event };
	},
};
