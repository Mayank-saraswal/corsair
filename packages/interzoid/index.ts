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
import type { InterzoidEndpointInputs, InterzoidEndpointOutputs } from './endpoints/types';
import { InterzoidEndpointInputSchemas, InterzoidEndpointOutputSchemas } from './endpoints/types';
import type {
	InterzoidWebhookOutputs,
	ExampleEvent,
} from './webhooks/types';
import { ExampleEventSchema } from './webhooks/types';
import { Example } from './endpoints';
import { InterzoidSchema } from './schema';
import { ExampleWebhooks } from './webhooks';
import { errorHandlers } from './error-handlers';
import { matchInterzoidTenantWebhook } from './webhooks/tenant-matcher';
import { resolveInterzoidOAuthWebhookTenantLink } from './webhooks/oauth-tenant-link';

export type InterzoidPluginOptions = {
	authType?: PickAuth<'api_key' | 'oauth_2'>;
	key?: string;
	webhookSecret?: string;
	hooks?: InternalInterzoidPlugin['hooks'];
	webhookHooks?: InternalInterzoidPlugin['webhookHooks'];
	errorHandlers?: CorsairErrorHandler;
	permissions?: PluginPermissionsConfig<typeof interzoidEndpointsNested>;
};

export type InterzoidContext = CorsairPluginContext<
	typeof InterzoidSchema,
	InterzoidPluginOptions
>;

export type InterzoidKeyBuilderContext = KeyBuilderContext<InterzoidPluginOptions>;

export type InterzoidBoundEndpoints = BindEndpoints<typeof interzoidEndpointsNested>;

type InterzoidEndpoint<
	K extends keyof InterzoidEndpointOutputs,
> = CorsairEndpoint<
	InterzoidContext,
	InterzoidEndpointInputs[K],
	InterzoidEndpointOutputs[K]
>;

export type InterzoidEndpoints = {
	exampleGet: InterzoidEndpoint<'exampleGet'>;
};

type InterzoidWebhook<
	K extends keyof InterzoidWebhookOutputs,
	TEvent,
> = CorsairWebhook<InterzoidContext, TEvent, InterzoidWebhookOutputs[K]>;

export type InterzoidWebhooks = {
	example: InterzoidWebhook<'example', ExampleEvent>;
};

export type InterzoidBoundWebhooks = BindWebhooks<InterzoidWebhooks>;

const interzoidEndpointsNested = {
	example: {
		get: Example.get,
	},
} as const;

const interzoidWebhooksNested = {
	example: {
		example: ExampleWebhooks.example,
	},
} as const;

export const interzoidEndpointSchemas = {
	'example.get': {
		input: InterzoidEndpointInputSchemas.exampleGet,
		output: InterzoidEndpointOutputSchemas.exampleGet,
	},
} as const satisfies RequiredPluginEndpointSchemas<typeof interzoidEndpointsNested>;

const interzoidWebhookSchemas = {
	'example.example': {
		description: 'An example webhook event',
		payload: ExampleEventSchema,
		response: ExampleEventSchema,
	},
} as const satisfies RequiredPluginWebhookSchemas<typeof interzoidWebhooksNested>;

const defaultAuthType: AuthTypes = 'api_key' as const;

const interzoidEndpointMeta = {
	'example.get': {
		riskLevel: 'read',
		description: 'Get an example resource by ID',
	},
} as const satisfies RequiredPluginEndpointMeta<typeof interzoidEndpointsNested>;

export const interzoidAuthConfig = {
	api_key: {
		account: ['tenant_external_id'] as const,
	},
	oauth_2: {
		account: ['tenant_external_id'] as const,
	},
} as const satisfies PluginAuthConfig;

export type BaseInterzoidPlugin<T extends InterzoidPluginOptions> = CorsairPlugin<
	'interzoid',
	typeof InterzoidSchema,
	typeof interzoidEndpointsNested,
	typeof interzoidWebhooksNested,
	T,
	typeof defaultAuthType
>;

export type InternalInterzoidPlugin = BaseInterzoidPlugin<InterzoidPluginOptions>;

export type ExternalInterzoidPlugin<T extends InterzoidPluginOptions> =
	BaseInterzoidPlugin<T>;

export function interzoid<const T extends InterzoidPluginOptions>(
	incomingOptions: InterzoidPluginOptions & T = {} as InterzoidPluginOptions & T,
): ExternalInterzoidPlugin<T> {
	const options = {
		...incomingOptions,
		authType: incomingOptions.authType ?? defaultAuthType,
	};
	return {
		id: 'interzoid',
		authConfig: interzoidAuthConfig,
		schema: InterzoidSchema,
		options: options,
		hooks: options.hooks,
		webhookHooks: options.webhookHooks,
		endpoints: interzoidEndpointsNested,
		webhooks: interzoidWebhooksNested,
		endpointMeta: interzoidEndpointMeta,
		endpointSchemas: interzoidEndpointSchemas,
		webhookSchemas: interzoidWebhookSchemas,
		pluginWebhookMatcher: (request) => {
			const headers = request.headers;
			// TODO: Update to match your webhook signature headers
			return 'x-interzoid-signature' in headers;
		},
		pluginTenantWebhookMatcher: matchInterzoidTenantWebhook,
		oauthWebhookTenantLinkResolver: resolveInterzoidOAuthWebhookTenantLink,
		errorHandlers: {
			...errorHandlers,
			...options.errorHandlers,
		},
		keyBuilder: async (ctx: InterzoidKeyBuilderContext, source) => {
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
	} satisfies InternalInterzoidPlugin;
}

export type {
	ExampleEvent,
	InterzoidWebhookOutputs,
} from './webhooks/types';

export type {
	InterzoidEndpointInputs,
	InterzoidEndpointOutputs,
	ExampleGetInput,
	ExampleGetResponse,
} from './endpoints/types';
