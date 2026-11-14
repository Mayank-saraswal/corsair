import type {
	BindEndpoints,
	BindWebhooks,
	CorsairEndpoint,
	CorsairErrorHandler,
	CorsairPlugin,
	CorsairPluginContext,
	CorsairWebhook,
	KeyBuilderContext,
	PickAuth,
	PluginAuthConfig,
	PluginPermissionsConfig,
	RequiredPluginEndpointMeta,
	RequiredPluginEndpointSchemas,
	RequiredPluginWebhookSchemas,
} from 'corsair/core';
import type { AuthTypes } from 'corsair/core';
import type { HelpwiseEndpointInputs, HelpwiseEndpointOutputs } from './endpoints/types';
import { HelpwiseEndpointInputSchemas, HelpwiseEndpointOutputSchemas } from './endpoints/types';
import type {
	HelpwiseWebhookOutputs,
	ExampleEvent,
} from './webhooks/types';
import { ExampleEventSchema } from './webhooks/types';
import { Example } from './endpoints';
import { HelpwiseSchema } from './schema';
import { ExampleWebhooks } from './webhooks';
import { errorHandlers } from './error-handlers';
import { matchHelpwiseTenantWebhook } from './webhooks/tenant-matcher';
import { resolveHelpwiseOAuthWebhookTenantLink } from './webhooks/oauth-tenant-link';

export type HelpwisePluginOptions = {
	authType?: PickAuth<'api_key' | 'oauth_2'>;
	key?: string;
	webhookSecret?: string;
	hooks?: InternalHelpwisePlugin['hooks'];
	webhookHooks?: InternalHelpwisePlugin['webhookHooks'];
	errorHandlers?: CorsairErrorHandler;
	permissions?: PluginPermissionsConfig<typeof helpwiseEndpointsNested>;
};

export type HelpwiseContext = CorsairPluginContext<
	typeof HelpwiseSchema,
	HelpwisePluginOptions
>;

export type HelpwiseKeyBuilderContext = KeyBuilderContext<HelpwisePluginOptions>;

export type HelpwiseBoundEndpoints = BindEndpoints<typeof helpwiseEndpointsNested>;

type HelpwiseEndpoint<
	K extends keyof HelpwiseEndpointOutputs,
> = CorsairEndpoint<
	HelpwiseContext,
	HelpwiseEndpointInputs[K],
	HelpwiseEndpointOutputs[K]
>;

export type HelpwiseEndpoints = {
	exampleGet: HelpwiseEndpoint<'exampleGet'>;
};

type HelpwiseWebhook<
	K extends keyof HelpwiseWebhookOutputs,
	TEvent,
> = CorsairWebhook<HelpwiseContext, TEvent, HelpwiseWebhookOutputs[K]>;

export type HelpwiseWebhooks = {
	example: HelpwiseWebhook<'example', ExampleEvent>;
};

export type HelpwiseBoundWebhooks = BindWebhooks<HelpwiseWebhooks>;

const helpwiseEndpointsNested = {
	example: {
		get: Example.get,
	},
} as const;

const helpwiseWebhooksNested = {
	example: {
		example: ExampleWebhooks.example,
	},
} as const;

export const helpwiseEndpointSchemas = {
	'example.get': {
		input: HelpwiseEndpointInputSchemas.exampleGet,
		output: HelpwiseEndpointOutputSchemas.exampleGet,
	},
} as const satisfies RequiredPluginEndpointSchemas<typeof helpwiseEndpointsNested>;

const helpwiseWebhookSchemas = {
	'example.example': {
		description: 'An example webhook event',
		payload: ExampleEventSchema,
		response: ExampleEventSchema,
	},
} as const satisfies RequiredPluginWebhookSchemas<typeof helpwiseWebhooksNested>;

const defaultAuthType: AuthTypes = 'api_key' as const;

const helpwiseEndpointMeta = {
	'example.get': {
		riskLevel: 'read',
		description: 'Get an example resource by ID',
	},
} as const satisfies RequiredPluginEndpointMeta<typeof helpwiseEndpointsNested>;

export const helpwiseAuthConfig = {
	api_key: {
		account: ['tenant_external_id'] as const,
	},
	oauth_2: {
		account: ['tenant_external_id'] as const,
	},
} as const satisfies PluginAuthConfig;

export type BaseHelpwisePlugin<T extends HelpwisePluginOptions> = CorsairPlugin<
	'helpwise',
	typeof HelpwiseSchema,
	typeof helpwiseEndpointsNested,
	typeof helpwiseWebhooksNested,
	T,
	typeof defaultAuthType
>;

export type InternalHelpwisePlugin = BaseHelpwisePlugin<HelpwisePluginOptions>;

export type ExternalHelpwisePlugin<T extends HelpwisePluginOptions> =
	BaseHelpwisePlugin<T>;

export function helpwise<const T extends HelpwisePluginOptions>(
	incomingOptions: HelpwisePluginOptions & T = {} as HelpwisePluginOptions & T,
): ExternalHelpwisePlugin<T> {
	const options = {
		...incomingOptions,
		authType: incomingOptions.authType ?? defaultAuthType,
	};
	return {
		id: 'helpwise',
		authConfig: helpwiseAuthConfig,
		schema: HelpwiseSchema,
		options: options,
		hooks: options.hooks,
		webhookHooks: options.webhookHooks,
		endpoints: helpwiseEndpointsNested,
		webhooks: helpwiseWebhooksNested,
		endpointMeta: helpwiseEndpointMeta,
		endpointSchemas: helpwiseEndpointSchemas,
		webhookSchemas: helpwiseWebhookSchemas,
		pluginWebhookMatcher: (request) => {
			const headers = request.headers;
			// TODO: Update to match your webhook signature headers
			return 'x-helpwise-signature' in headers;
		},
		pluginTenantWebhookMatcher: matchHelpwiseTenantWebhook,
		oauthWebhookTenantLinkResolver: resolveHelpwiseOAuthWebhookTenantLink,
		errorHandlers: {
			...errorHandlers,
			...options.errorHandlers,
		},
		keyBuilder: async (ctx: HelpwiseKeyBuilderContext, source) => {
			if (source === 'webhook' && options.webhookSecret) {
				return options.webhookSecret;
			}

			if (source === 'webhook') {
				const res = await ctx.keys.get_webhook_signature();
				return res ?? '';
			}

			if (source === 'endpoint' && options.key) {
				return options.key;
			}

			if (source === 'endpoint' && ctx.authType === 'api_key') {
				const res = await ctx.keys.get_api_key();
				return res ?? '';
			}

			if (source === 'endpoint' && ctx.authType === 'oauth_2') {
				const res = await ctx.keys.get_access_token();
				return res ?? '';
			}

			return '';
		},
	} satisfies InternalHelpwisePlugin;
}

export type {
	ExampleEvent,
	HelpwiseWebhookOutputs,
} from './webhooks/types';

export type {
	HelpwiseEndpointInputs,
	HelpwiseEndpointOutputs,
	ExampleGetInput,
	ExampleGetResponse,
} from './endpoints/types';
