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
import type { LaunchDarklyEndpointInputs, LaunchDarklyEndpointOutputs } from './endpoints/types';
import { LaunchDarklyEndpointInputSchemas, LaunchDarklyEndpointOutputSchemas } from './endpoints/types';
import type {
	LaunchDarklyWebhookOutputs,
	ExampleEvent,
} from './webhooks/types';
import { ExampleEventSchema } from './webhooks/types';
import { Example } from './endpoints';
import { LaunchDarklySchema } from './schema';
import { ExampleWebhooks } from './webhooks';
import { errorHandlers } from './error-handlers';
import { matchLaunchDarklyTenantWebhook } from './webhooks/tenant-matcher';
import { resolveLaunchDarklyOAuthWebhookTenantLink } from './webhooks/oauth-tenant-link';

export type LaunchDarklyPluginOptions = {
	authType?: PickAuth<'api_key' | 'oauth_2'>;
	key?: string;
	webhookSecret?: string;
	hooks?: InternalLaunchDarklyPlugin['hooks'];
	webhookHooks?: InternalLaunchDarklyPlugin['webhookHooks'];
	errorHandlers?: CorsairErrorHandler;
	permissions?: PluginPermissionsConfig<typeof launchDarklyEndpointsNested>;
};

export type LaunchDarklyContext = CorsairPluginContext<
	typeof LaunchDarklySchema,
	LaunchDarklyPluginOptions
>;

export type LaunchDarklyKeyBuilderContext = KeyBuilderContext<LaunchDarklyPluginOptions>;

export type LaunchDarklyBoundEndpoints = BindEndpoints<typeof launchDarklyEndpointsNested>;

type LaunchDarklyEndpoint<
	K extends keyof LaunchDarklyEndpointOutputs,
> = CorsairEndpoint<
	LaunchDarklyContext,
	LaunchDarklyEndpointInputs[K],
	LaunchDarklyEndpointOutputs[K]
>;

export type LaunchDarklyEndpoints = {
	exampleGet: LaunchDarklyEndpoint<'exampleGet'>;
};

type LaunchDarklyWebhook<
	K extends keyof LaunchDarklyWebhookOutputs,
	TEvent,
> = CorsairWebhook<LaunchDarklyContext, TEvent, LaunchDarklyWebhookOutputs[K]>;

export type LaunchDarklyWebhooks = {
	example: LaunchDarklyWebhook<'example', ExampleEvent>;
};

export type LaunchDarklyBoundWebhooks = BindWebhooks<LaunchDarklyWebhooks>;

const launchDarklyEndpointsNested = {
	example: {
		get: Example.get,
	},
} as const;

const launchDarklyWebhooksNested = {
	example: {
		example: ExampleWebhooks.example,
	},
} as const;

export const launchDarklyEndpointSchemas = {
	'example.get': {
		input: LaunchDarklyEndpointInputSchemas.exampleGet,
		output: LaunchDarklyEndpointOutputSchemas.exampleGet,
	},
} as const satisfies RequiredPluginEndpointSchemas<typeof launchDarklyEndpointsNested>;

const launchDarklyWebhookSchemas = {
	'example.example': {
		description: 'An example webhook event',
		payload: ExampleEventSchema,
		response: ExampleEventSchema,
	},
} as const satisfies RequiredPluginWebhookSchemas<typeof launchDarklyWebhooksNested>;

const defaultAuthType: AuthTypes = 'api_key' as const;

const launchDarklyEndpointMeta = {
	'example.get': {
		riskLevel: 'read',
		description: 'Get an example resource by ID',
	},
} as const satisfies RequiredPluginEndpointMeta<typeof launchDarklyEndpointsNested>;

export const launchDarklyAuthConfig = {
	api_key: {
		account: ['tenant_external_id'] as const,
	},
	oauth_2: {
		account: ['tenant_external_id'] as const,
	},
} as const satisfies PluginAuthConfig;

export type BaseLaunchDarklyPlugin<T extends LaunchDarklyPluginOptions> = CorsairPlugin<
	'launchdarkly',
	typeof LaunchDarklySchema,
	typeof launchDarklyEndpointsNested,
	typeof launchDarklyWebhooksNested,
	T,
	typeof defaultAuthType
>;

export type InternalLaunchDarklyPlugin = BaseLaunchDarklyPlugin<LaunchDarklyPluginOptions>;

export type ExternalLaunchDarklyPlugin<T extends LaunchDarklyPluginOptions> =
	BaseLaunchDarklyPlugin<T>;

export function launchdarkly<const T extends LaunchDarklyPluginOptions>(
	incomingOptions: LaunchDarklyPluginOptions & T = {} as LaunchDarklyPluginOptions & T,
): ExternalLaunchDarklyPlugin<T> {
	const options = {
		...incomingOptions,
		authType: incomingOptions.authType ?? defaultAuthType,
	};
	return {
		id: 'launchdarkly',
		authConfig: launchDarklyAuthConfig,
		schema: LaunchDarklySchema,
		options: options,
		hooks: options.hooks,
		webhookHooks: options.webhookHooks,
		endpoints: launchDarklyEndpointsNested,
		webhooks: launchDarklyWebhooksNested,
		endpointMeta: launchDarklyEndpointMeta,
		endpointSchemas: launchDarklyEndpointSchemas,
		webhookSchemas: launchDarklyWebhookSchemas,
		pluginWebhookMatcher: (request) => {
			const headers = request.headers;
			// TODO: Update to match your webhook signature headers
			return 'x-launchdarkly-signature' in headers;
		},
		pluginTenantWebhookMatcher: matchLaunchDarklyTenantWebhook,
		oauthWebhookTenantLinkResolver: resolveLaunchDarklyOAuthWebhookTenantLink,
		errorHandlers: {
			...errorHandlers,
			...options.errorHandlers,
		},
		keyBuilder: async (ctx: LaunchDarklyKeyBuilderContext, source) => {
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
	} satisfies InternalLaunchDarklyPlugin;
}

export type {
	ExampleEvent,
	LaunchDarklyWebhookOutputs,
} from './webhooks/types';

export type {
	LaunchDarklyEndpointInputs,
	LaunchDarklyEndpointOutputs,
	ExampleGetInput,
	ExampleGetResponse,
} from './endpoints/types';
