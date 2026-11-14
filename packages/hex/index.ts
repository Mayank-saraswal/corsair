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
import type { HexEndpointInputs, HexEndpointOutputs } from './endpoints/types';
import { HexEndpointInputSchemas, HexEndpointOutputSchemas } from './endpoints/types';
import type {
	HexWebhookOutputs,
	ExampleEvent,
} from './webhooks/types';
import { ExampleEventSchema } from './webhooks/types';
import { Example } from './endpoints';
import { HexSchema } from './schema';
import { ExampleWebhooks } from './webhooks';
import { errorHandlers } from './error-handlers';
import { matchHexTenantWebhook } from './webhooks/tenant-matcher';
import { resolveHexOAuthWebhookTenantLink } from './webhooks/oauth-tenant-link';

export type HexPluginOptions = {
	authType?: PickAuth<'api_key' | 'oauth_2'>;
	key?: string;
	webhookSecret?: string;
	hooks?: InternalHexPlugin['hooks'];
	webhookHooks?: InternalHexPlugin['webhookHooks'];
	errorHandlers?: CorsairErrorHandler;
	permissions?: PluginPermissionsConfig<typeof hexEndpointsNested>;
};

export type HexContext = CorsairPluginContext<
	typeof HexSchema,
	HexPluginOptions
>;

export type HexKeyBuilderContext = KeyBuilderContext<HexPluginOptions>;

export type HexBoundEndpoints = BindEndpoints<typeof hexEndpointsNested>;

type HexEndpoint<
	K extends keyof HexEndpointOutputs,
> = CorsairEndpoint<
	HexContext,
	HexEndpointInputs[K],
	HexEndpointOutputs[K]
>;

export type HexEndpoints = {
	exampleGet: HexEndpoint<'exampleGet'>;
};

type HexWebhook<
	K extends keyof HexWebhookOutputs,
	TEvent,
> = CorsairWebhook<HexContext, TEvent, HexWebhookOutputs[K]>;

export type HexWebhooks = {
	example: HexWebhook<'example', ExampleEvent>;
};

export type HexBoundWebhooks = BindWebhooks<HexWebhooks>;

const hexEndpointsNested = {
	example: {
		get: Example.get,
	},
} as const;

const hexWebhooksNested = {
	example: {
		example: ExampleWebhooks.example,
	},
} as const;

export const hexEndpointSchemas = {
	'example.get': {
		input: HexEndpointInputSchemas.exampleGet,
		output: HexEndpointOutputSchemas.exampleGet,
	},
} as const satisfies RequiredPluginEndpointSchemas<typeof hexEndpointsNested>;

const hexWebhookSchemas = {
	'example.example': {
		description: 'An example webhook event',
		payload: ExampleEventSchema,
		response: ExampleEventSchema,
	},
} as const satisfies RequiredPluginWebhookSchemas<typeof hexWebhooksNested>;

const defaultAuthType: AuthTypes = 'api_key' as const;

const hexEndpointMeta = {
	'example.get': {
		riskLevel: 'read',
		description: 'Get an example resource by ID',
	},
} as const satisfies RequiredPluginEndpointMeta<typeof hexEndpointsNested>;

export const hexAuthConfig = {
	api_key: {
		account: ['tenant_external_id'] as const,
	},
	oauth_2: {
		account: ['tenant_external_id'] as const,
	},
} as const satisfies PluginAuthConfig;

export type BaseHexPlugin<T extends HexPluginOptions> = CorsairPlugin<
	'hex',
	typeof HexSchema,
	typeof hexEndpointsNested,
	typeof hexWebhooksNested,
	T,
	typeof defaultAuthType
>;

export type InternalHexPlugin = BaseHexPlugin<HexPluginOptions>;

export type ExternalHexPlugin<T extends HexPluginOptions> =
	BaseHexPlugin<T>;

export function hex<const T extends HexPluginOptions>(
	incomingOptions: HexPluginOptions & T = {} as HexPluginOptions & T,
): ExternalHexPlugin<T> {
	const options = {
		...incomingOptions,
		authType: incomingOptions.authType ?? defaultAuthType,
	};
	return {
		id: 'hex',
		authConfig: hexAuthConfig,
		schema: HexSchema,
		options: options,
		hooks: options.hooks,
		webhookHooks: options.webhookHooks,
		endpoints: hexEndpointsNested,
		webhooks: hexWebhooksNested,
		endpointMeta: hexEndpointMeta,
		endpointSchemas: hexEndpointSchemas,
		webhookSchemas: hexWebhookSchemas,
		pluginWebhookMatcher: (request) => {
			const headers = request.headers;
			// TODO: Update to match your webhook signature headers
			return 'x-hex-signature' in headers;
		},
		pluginTenantWebhookMatcher: matchHexTenantWebhook,
		oauthWebhookTenantLinkResolver: resolveHexOAuthWebhookTenantLink,
		errorHandlers: {
			...errorHandlers,
			...options.errorHandlers,
		},
		keyBuilder: async (ctx: HexKeyBuilderContext, source) => {
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
	} satisfies InternalHexPlugin;
}

export type {
	ExampleEvent,
	HexWebhookOutputs,
} from './webhooks/types';

export type {
	HexEndpointInputs,
	HexEndpointOutputs,
	ExampleGetInput,
	ExampleGetResponse,
} from './endpoints/types';
