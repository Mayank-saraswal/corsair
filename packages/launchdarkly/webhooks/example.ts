import { logEventFromContext } from 'corsair/core';
import type { LaunchDarklyWebhooks } from '..';
import { createLaunchDarklyMatch, verifyLaunchDarklyWebhookSignature } from './types';

export const example: LaunchDarklyWebhooks['example'] = {
	match: createLaunchDarklyMatch('example'),

	handler: async (ctx, request) => {
		const verification = verifyLaunchDarklyWebhookSignature(request, ctx.key);
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

		await logEventFromContext(ctx, 'launchdarkly.webhook.example', { ...event }, 'completed');

		return { success: true, data: event };
	},
};
