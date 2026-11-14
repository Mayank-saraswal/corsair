import { logEventFromContext } from 'corsair/core';
import type { JungleScoutWebhooks } from '..';
import { createJungleScoutMatch, verifyJungleScoutWebhookSignature } from './types';

export const example: JungleScoutWebhooks['example'] = {
	match: createJungleScoutMatch('example'),

	handler: async (ctx, request) => {
		const verification = verifyJungleScoutWebhookSignature(request, ctx.key);
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

		await logEventFromContext(ctx, 'junglescout.webhook.example', { ...event }, 'completed');

		return { success: true, data: event };
	},
};
