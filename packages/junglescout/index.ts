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
import type { JungleScoutEndpointInputs, JungleScoutEndpointOutputs } from './endpoints/types';
import { JungleScoutEndpointInputSchemas, JungleScoutEndpointOutputSchemas } from './endpoints/types';
import type {
	JungleScoutWebhookOutputs,
	ExampleEvent,
} from './webhooks/types';
import { ExampleEventSchema } from './webhooks/types';
import { Example } from './endpoints';
import { JungleScoutSchema } from './schema';
import { ExampleWebhooks } from './webhooks';
import { errorHandlers } from './error-handlers';
import { matchJungleScoutTenantWebhook } from './webhooks/tenant-matcher';
import { resolveJungleScoutOAuthWebhookTenantLink } from './webhooks/oauth-tenant-link';

export type JungleScoutPluginOptions = {
	authType?: PickAuth<'api_key' | 'oauth_2'>;
	key?: string;
	webhookSecret?: string;
	hooks?: InternalJungleScoutPlugin['hooks'];
	webhookHooks?: InternalJungleScoutPlugin['webhookHooks'];
	errorHandlers?: CorsairErrorHandler;
	permissions?: PluginPermissionsConfig<typeof jungleScoutEndpointsNested>;
};

export type JungleScoutContext = CorsairPluginContext<
	typeof JungleScoutSchema,
	JungleScoutPluginOptions
>;

export type JungleScoutKeyBuilderContext = KeyBuilderContext<JungleScoutPluginOptions>;

export type JungleScoutBoundEndpoints = BindEndpoints<typeof jungleScoutEndpointsNested>;

type JungleScoutEndpoint<
	K extends keyof JungleScoutEndpointOutputs,
> = CorsairEndpoint<
	JungleScoutContext,
	JungleScoutEndpointInputs[K],
	JungleScoutEndpointOutputs[K]
>;

export type JungleScoutEndpoints = {
	exampleGet: JungleScoutEndpoint<'exampleGet'>;
};

type JungleScoutWebhook<
	K extends keyof JungleScoutWebhookOutputs,
	TEvent,
> = CorsairWebhook<JungleScoutContext, TEvent, JungleScoutWebhookOutputs[K]>;

export type JungleScoutWebhooks = {
	example: JungleScoutWebhook<'example', ExampleEvent>;
};

export type JungleScoutBoundWebhooks = BindWebhooks<JungleScoutWebhooks>;

const jungleScoutEndpointsNested = {
	example: {
		get: Example.get,
	},
} as const;

const jungleScoutWebhooksNested = {
	example: {
		example: ExampleWebhooks.example,
	},
} as const;

export const jungleScoutEndpointSchemas = {
	'example.get': {
		input: JungleScoutEndpointInputSchemas.exampleGet,
		output: JungleScoutEndpointOutputSchemas.exampleGet,
	},
} as const satisfies RequiredPluginEndpointSchemas<typeof jungleScoutEndpointsNested>;

const jungleScoutWebhookSchemas = {
	'example.example': {
		description: 'An example webhook event',
		payload: ExampleEventSchema,
		response: ExampleEventSchema,
	},
} as const satisfies RequiredPluginWebhookSchemas<typeof jungleScoutWebhooksNested>;

const defaultAuthType: AuthTypes = 'api_key' as const;

const jungleScoutEndpointMeta = {
	'example.get': {
		riskLevel: 'read',
		description: 'Get an example resource by ID',
	},
} as const satisfies RequiredPluginEndpointMeta<typeof jungleScoutEndpointsNested>;

export const jungleScoutAuthConfig = {
	api_key: {
		account: ['tenant_external_id'] as const,
	},
	oauth_2: {
		account: ['tenant_external_id'] as const,
	},
} as const satisfies PluginAuthConfig;

export type BaseJungleScoutPlugin<T extends JungleScoutPluginOptions> = CorsairPlugin<
	'junglescout',
	typeof JungleScoutSchema,
	typeof jungleScoutEndpointsNested,
	typeof jungleScoutWebhooksNested,
	T,
	typeof defaultAuthType
>;

export type InternalJungleScoutPlugin = BaseJungleScoutPlugin<JungleScoutPluginOptions>;

export type ExternalJungleScoutPlugin<T extends JungleScoutPluginOptions> =
	BaseJungleScoutPlugin<T>;

export function junglescout<const T extends JungleScoutPluginOptions>(
	incomingOptions: JungleScoutPluginOptions & T = {} as JungleScoutPluginOptions & T,
): ExternalJungleScoutPlugin<T> {
	const options = {
		...incomingOptions,
		authType: incomingOptions.authType ?? defaultAuthType,
	};
	return {
		id: 'junglescout',
		authConfig: jungleScoutAuthConfig,
		schema: JungleScoutSchema,
		options: options,
		hooks: options.hooks,
		webhookHooks: options.webhookHooks,
		endpoints: jungleScoutEndpointsNested,
		webhooks: jungleScoutWebhooksNested,
		endpointMeta: jungleScoutEndpointMeta,
		endpointSchemas: jungleScoutEndpointSchemas,
		webhookSchemas: jungleScoutWebhookSchemas,
		pluginWebhookMatcher: (request) => {
			const headers = request.headers;
			// TODO: Update to match your webhook signature headers
			return 'x-junglescout-signature' in headers;
		},
		pluginTenantWebhookMatcher: matchJungleScoutTenantWebhook,
		oauthWebhookTenantLinkResolver: resolveJungleScoutOAuthWebhookTenantLink,
		errorHandlers: {
			...errorHandlers,
			...options.errorHandlers,
		},
		keyBuilder: async (ctx: JungleScoutKeyBuilderContext, source) => {
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
	} satisfies InternalJungleScoutPlugin;
}

export type {
	ExampleEvent,
	JungleScoutWebhookOutputs,
} from './webhooks/types';

export type {
	JungleScoutEndpointInputs,
	JungleScoutEndpointOutputs,
	ExampleGetInput,
	ExampleGetResponse,
} from './endpoints/types';
