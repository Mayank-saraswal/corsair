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
import type { IgnisignEndpointInputs, IgnisignEndpointOutputs } from './endpoints/types';
import { IgnisignEndpointInputSchemas, IgnisignEndpointOutputSchemas } from './endpoints/types';
import type {
	IgnisignWebhookOutputs,
	ExampleEvent,
} from './webhooks/types';
import { ExampleEventSchema } from './webhooks/types';
import { Example } from './endpoints';
import { IgnisignSchema } from './schema';
import { ExampleWebhooks } from './webhooks';
import { errorHandlers } from './error-handlers';
import { matchIgnisignTenantWebhook } from './webhooks/tenant-matcher';
import { resolveIgnisignOAuthWebhookTenantLink } from './webhooks/oauth-tenant-link';

export type IgnisignPluginOptions = {
	authType?: PickAuth<'api_key' | 'oauth_2'>;
	key?: string;
	webhookSecret?: string;
	hooks?: InternalIgnisignPlugin['hooks'];
	webhookHooks?: InternalIgnisignPlugin['webhookHooks'];
	errorHandlers?: CorsairErrorHandler;
	permissions?: PluginPermissionsConfig<typeof ignisignEndpointsNested>;
};

export type IgnisignContext = CorsairPluginContext<
	typeof IgnisignSchema,
	IgnisignPluginOptions
>;

export type IgnisignKeyBuilderContext = KeyBuilderContext<IgnisignPluginOptions>;

export type IgnisignBoundEndpoints = BindEndpoints<typeof ignisignEndpointsNested>;

type IgnisignEndpoint<
	K extends keyof IgnisignEndpointOutputs,
> = CorsairEndpoint<
	IgnisignContext,
	IgnisignEndpointInputs[K],
	IgnisignEndpointOutputs[K]
>;

export type IgnisignEndpoints = {
	exampleGet: IgnisignEndpoint<'exampleGet'>;
};

type IgnisignWebhook<
	K extends keyof IgnisignWebhookOutputs,
	TEvent,
> = CorsairWebhook<IgnisignContext, TEvent, IgnisignWebhookOutputs[K]>;

export type IgnisignWebhooks = {
	example: IgnisignWebhook<'example', ExampleEvent>;
};

export type IgnisignBoundWebhooks = BindWebhooks<IgnisignWebhooks>;

const ignisignEndpointsNested = {
	example: {
		get: Example.get,
	},
} as const;

const ignisignWebhooksNested = {
	example: {
		example: ExampleWebhooks.example,
	},
} as const;

export const ignisignEndpointSchemas = {
	'example.get': {
		input: IgnisignEndpointInputSchemas.exampleGet,
		output: IgnisignEndpointOutputSchemas.exampleGet,
	},
} as const satisfies RequiredPluginEndpointSchemas<typeof ignisignEndpointsNested>;

const ignisignWebhookSchemas = {
	'example.example': {
		description: 'An example webhook event',
		payload: ExampleEventSchema,
		response: ExampleEventSchema,
	},
} as const satisfies RequiredPluginWebhookSchemas<typeof ignisignWebhooksNested>;

const defaultAuthType: AuthTypes = 'api_key' as const;

const ignisignEndpointMeta = {
	'example.get': {
		riskLevel: 'read',
		description: 'Get an example resource by ID',
	},
} as const satisfies RequiredPluginEndpointMeta<typeof ignisignEndpointsNested>;

export const ignisignAuthConfig = {
	api_key: {
		account: ['tenant_external_id'] as const,
	},
	oauth_2: {
		account: ['tenant_external_id'] as const,
	},
} as const satisfies PluginAuthConfig;

export type BaseIgnisignPlugin<T extends IgnisignPluginOptions> = CorsairPlugin<
	'ignisign',
	typeof IgnisignSchema,
	typeof ignisignEndpointsNested,
	typeof ignisignWebhooksNested,
	T,
	typeof defaultAuthType
>;

export type InternalIgnisignPlugin = BaseIgnisignPlugin<IgnisignPluginOptions>;

export type ExternalIgnisignPlugin<T extends IgnisignPluginOptions> =
	BaseIgnisignPlugin<T>;

export function ignisign<const T extends IgnisignPluginOptions>(
	incomingOptions: IgnisignPluginOptions & T = {} as IgnisignPluginOptions & T,
): ExternalIgnisignPlugin<T> {
	const options = {
		...incomingOptions,
		authType: incomingOptions.authType ?? defaultAuthType,
	};
	return {
		id: 'ignisign',
		authConfig: ignisignAuthConfig,
		schema: IgnisignSchema,
		options: options,
		hooks: options.hooks,
		webhookHooks: options.webhookHooks,
		endpoints: ignisignEndpointsNested,
		webhooks: ignisignWebhooksNested,
		endpointMeta: ignisignEndpointMeta,
		endpointSchemas: ignisignEndpointSchemas,
		webhookSchemas: ignisignWebhookSchemas,
		pluginWebhookMatcher: (request) => {
			const headers = request.headers;
			// TODO: Update to match your webhook signature headers
			return 'x-ignisign-signature' in headers;
		},
		pluginTenantWebhookMatcher: matchIgnisignTenantWebhook,
		oauthWebhookTenantLinkResolver: resolveIgnisignOAuthWebhookTenantLink,
		errorHandlers: {
			...errorHandlers,
			...options.errorHandlers,
		},
		keyBuilder: async (ctx: IgnisignKeyBuilderContext, source) => {
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
	} satisfies InternalIgnisignPlugin;
}

export type {
	ExampleEvent,
	IgnisignWebhookOutputs,
} from './webhooks/types';

export type {
	IgnisignEndpointInputs,
	IgnisignEndpointOutputs,
	ExampleGetInput,
	ExampleGetResponse,
} from './endpoints/types';
