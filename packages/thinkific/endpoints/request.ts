import type { EventLoggingContext } from 'corsair/core';
import { AuthMissingError, logEventFromContext } from 'corsair/core';
import type { z } from 'zod';
import type { ThinkificHttpMethod, ThinkificQuery } from '../client';
import { makeThinkificRequest } from '../client';

export type ThinkificOperationContext = EventLoggingContext & {
	key: string;
	keys: {
		get_tenant_external_id: () => Promise<string | null | undefined>;
	};
};

export type ThinkificOperationRequest = {
	operation: string;
	method: ThinkificHttpMethod;
	path: string;
	query?: ThinkificQuery;
	// `unknown` because endpoint request bodies have distinct Zod-inferred shapes and are parsed before this helper.
	body?: unknown;
};

export async function runThinkificOperation<OutputSchema extends z.ZodType>(
	ctx: ThinkificOperationContext,
	options: ThinkificOperationRequest & { outputSchema: OutputSchema },
): Promise<z.output<OutputSchema>> {
	const subdomain = await ctx.keys.get_tenant_external_id();
	if (!subdomain) {
		throw new AuthMissingError('thinkific', 'api_key');
	}

	// `unknown` because provider JSON is untrusted until the operation's output schema validates it.
	const response: unknown = await makeThinkificRequest(
		options.path,
		ctx.key,
		subdomain,
		{
			method: options.method,
			query: options.query,
			body: options.body,
		},
	);
	const parsedResponse = options.outputSchema.parse(response);
	await logEventFromContext(
		ctx,
		`thinkific.${options.operation}`,
		{},
		'completed',
	);
	return parsedResponse;
}
