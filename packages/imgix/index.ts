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
import type { ImgixEndpointInputs, ImgixEndpointOutputs } from './endpoints/types';
import { ImgixEndpointInputSchemas, ImgixEndpointOutputSchemas } from './endpoints/types';
import type {
	ImgixWebhookOutputs,
	ExampleEvent,
} from './webhooks/types';
import { ExampleEventSchema } from './webhooks/types';
import { Example } from './endpoints';
import { ImgixSchema } from './schema';
import { ExampleWebhooks } from './webhooks';
import { errorHandlers } from './error-handlers';
import { matchImgixTenantWebhook } from './webhooks/tenant-matcher';
import { resolveImgixOAuthWebhookTenantLink } from './webhooks/oauth-tenant-link';

export type ImgixPluginOptions = {
	authType?: PickAuth<'api_key' | 'oauth_2'>;
	key?: string;
	webhookSecret?: string;
	hooks?: InternalImgixPlugin['hooks'];
	webhookHooks?: InternalImgixPlugin['webhookHooks'];
	errorHandlers?: CorsairErrorHandler;
	permissions?: PluginPermissionsConfig<typeof imgixEndpointsNested>;
};

export type ImgixContext = CorsairPluginContext<
	typeof ImgixSchema,
	ImgixPluginOptions
>;

export type ImgixKeyBuilderContext = KeyBuilderContext<ImgixPluginOptions>;

export type ImgixBoundEndpoints = BindEndpoints<typeof imgixEndpointsNested>;

type ImgixEndpoint<
	K extends keyof ImgixEndpointOutputs,
> = CorsairEndpoint<
	ImgixContext,
	ImgixEndpointInputs[K],
	ImgixEndpointOutputs[K]
>;

export type ImgixEndpoints = {
	exampleGet: ImgixEndpoint<'exampleGet'>;
};

type ImgixWebhook<
	K extends keyof ImgixWebhookOutputs,
	TEvent,
> = CorsairWebhook<ImgixContext, TEvent, ImgixWebhookOutputs[K]>;

export type ImgixWebhooks = {
	example: ImgixWebhook<'example', ExampleEvent>;
};

export type ImgixBoundWebhooks = BindWebhooks<ImgixWebhooks>;

const imgixEndpointsNested = {
	example: {
		get: Example.get,
	},
} as const;

const imgixWebhooksNested = {
	example: {
		example: ExampleWebhooks.example,
	},
} as const;

export const imgixEndpointSchemas = {
	'example.get': {
		input: ImgixEndpointInputSchemas.exampleGet,
		output: ImgixEndpointOutputSchemas.exampleGet,
	},
} as const satisfies RequiredPluginEndpointSchemas<typeof imgixEndpointsNested>;

const imgixWebhookSchemas = {
	'example.example': {
		description: 'An example webhook event',
		payload: ExampleEventSchema,
		response: ExampleEventSchema,
	},
} as const satisfies RequiredPluginWebhookSchemas<typeof imgixWebhooksNested>;

const defaultAuthType: AuthTypes = 'api_key' as const;

const imgixEndpointMeta = {
	'example.get': {
		riskLevel: 'read',
		description: 'Get an example resource by ID',
	},
} as const satisfies RequiredPluginEndpointMeta<typeof imgixEndpointsNested>;

export const imgixAuthConfig = {
	api_key: {
		account: ['tenant_external_id'] as const,
	},
	oauth_2: {
		account: ['tenant_external_id'] as const,
	},
} as const satisfies PluginAuthConfig;

export type BaseImgixPlugin<T extends ImgixPluginOptions> = CorsairPlugin<
	'imgix',
	typeof ImgixSchema,
	typeof imgixEndpointsNested,
	typeof imgixWebhooksNested,
	T,
	typeof defaultAuthType
>;

export type InternalImgixPlugin = BaseImgixPlugin<ImgixPluginOptions>;

export type ExternalImgixPlugin<T extends ImgixPluginOptions> =
	BaseImgixPlugin<T>;

export function imgix<const T extends ImgixPluginOptions>(
	incomingOptions: ImgixPluginOptions & T = {} as ImgixPluginOptions & T,
): ExternalImgixPlugin<T> {
	const options = {
		...incomingOptions,
		authType: incomingOptions.authType ?? defaultAuthType,
	};
	return {
		id: 'imgix',
		authConfig: imgixAuthConfig,
		schema: ImgixSchema,
		options: options,
		hooks: options.hooks,
		webhookHooks: options.webhookHooks,
		endpoints: imgixEndpointsNested,
		webhooks: imgixWebhooksNested,
		endpointMeta: imgixEndpointMeta,
		endpointSchemas: imgixEndpointSchemas,
		webhookSchemas: imgixWebhookSchemas,
		pluginWebhookMatcher: (request) => {
			const headers = request.headers;
			// TODO: Update to match your webhook signature headers
			return 'x-imgix-signature' in headers;
		},
		pluginTenantWebhookMatcher: matchImgixTenantWebhook,
		oauthWebhookTenantLinkResolver: resolveImgixOAuthWebhookTenantLink,
		errorHandlers: {
			...errorHandlers,
			...options.errorHandlers,
		},
		keyBuilder: async (ctx: ImgixKeyBuilderContext, source) => {
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
	} satisfies InternalImgixPlugin;
}

export type {
	ExampleEvent,
	ImgixWebhookOutputs,
} from './webhooks/types';

export type {
	ImgixEndpointInputs,
	ImgixEndpointOutputs,
	ExampleGetInput,
	ExampleGetResponse,
} from './endpoints/types';
