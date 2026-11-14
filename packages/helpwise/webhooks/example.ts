import { logEventFromContext } from 'corsair/core';
import type { HelpwiseWebhooks } from '..';
import { createHelpwiseMatch, verifyHelpwiseWebhookSignature } from './types';

export const example: HelpwiseWebhooks['example'] = {
	match: createHelpwiseMatch('example'),

	handler: async (ctx, request) => {
		const verification = verifyHelpwiseWebhookSignature(request, ctx.key);
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

		await logEventFromContext(ctx, 'helpwise.webhook.example', { ...event }, 'completed');

		return { success: true, data: event };
	},
};
