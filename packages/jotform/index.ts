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
import type { JotformEndpointInputs, JotformEndpointOutputs } from './endpoints/types';
import { JotformEndpointInputSchemas, JotformEndpointOutputSchemas } from './endpoints/types';
import type {
	JotformWebhookOutputs,
	ExampleEvent,
} from './webhooks/types';
import { ExampleEventSchema } from './webhooks/types';
import { Example } from './endpoints';
import { JotformSchema } from './schema';
import { ExampleWebhooks } from './webhooks';
import { errorHandlers } from './error-handlers';
import { matchJotformTenantWebhook } from './webhooks/tenant-matcher';
import { resolveJotformOAuthWebhookTenantLink } from './webhooks/oauth-tenant-link';

export type JotformPluginOptions = {
	authType?: PickAuth<'api_key' | 'oauth_2'>;
	key?: string;
	webhookSecret?: string;
	hooks?: InternalJotformPlugin['hooks'];
	webhookHooks?: InternalJotformPlugin['webhookHooks'];
	errorHandlers?: CorsairErrorHandler;
	permissions?: PluginPermissionsConfig<typeof jotformEndpointsNested>;
};

export type JotformContext = CorsairPluginContext<
	typeof JotformSchema,
	JotformPluginOptions
>;

export type JotformKeyBuilderContext = KeyBuilderContext<JotformPluginOptions>;

export type JotformBoundEndpoints = BindEndpoints<typeof jotformEndpointsNested>;

type JotformEndpoint<
	K extends keyof JotformEndpointOutputs,
> = CorsairEndpoint<
	JotformContext,
	JotformEndpointInputs[K],
	JotformEndpointOutputs[K]
>;

export type JotformEndpoints = {
	exampleGet: JotformEndpoint<'exampleGet'>;
};

type JotformWebhook<
	K extends keyof JotformWebhookOutputs,
	TEvent,
> = CorsairWebhook<JotformContext, TEvent, JotformWebhookOutputs[K]>;

export type JotformWebhooks = {
	example: JotformWebhook<'example', ExampleEvent>;
};

export type JotformBoundWebhooks = BindWebhooks<JotformWebhooks>;

const jotformEndpointsNested = {
	example: {
		get: Example.get,
	},
} as const;

const jotformWebhooksNested = {
	example: {
		example: ExampleWebhooks.example,
	},
} as const;

export const jotformEndpointSchemas = {
	'example.get': {
		input: JotformEndpointInputSchemas.exampleGet,
		output: JotformEndpointOutputSchemas.exampleGet,
	},
} as const satisfies RequiredPluginEndpointSchemas<typeof jotformEndpointsNested>;

const jotformWebhookSchemas = {
	'example.example': {
		description: 'An example webhook event',
		payload: ExampleEventSchema,
		response: ExampleEventSchema,
	},
} as const satisfies RequiredPluginWebhookSchemas<typeof jotformWebhooksNested>;

const defaultAuthType: AuthTypes = 'api_key' as const;

const jotformEndpointMeta = {
	'example.get': {
		riskLevel: 'read',
		description: 'Get an example resource by ID',
	},
} as const satisfies RequiredPluginEndpointMeta<typeof jotformEndpointsNested>;

export const jotformAuthConfig = {
	api_key: {
		account: ['tenant_external_id'] as const,
	},
	oauth_2: {
		account: ['tenant_external_id'] as const,
	},
} as const satisfies PluginAuthConfig;

export type BaseJotformPlugin<T extends JotformPluginOptions> = CorsairPlugin<
	'jotform',
	typeof JotformSchema,
	typeof jotformEndpointsNested,
	typeof jotformWebhooksNested,
	T,
	typeof defaultAuthType
>;

export type InternalJotformPlugin = BaseJotformPlugin<JotformPluginOptions>;

export type ExternalJotformPlugin<T extends JotformPluginOptions> =
	BaseJotformPlugin<T>;

export function jotform<const T extends JotformPluginOptions>(
	incomingOptions: JotformPluginOptions & T = {} as JotformPluginOptions & T,
): ExternalJotformPlugin<T> {
	const options = {
		...incomingOptions,
		authType: incomingOptions.authType ?? defaultAuthType,
	};
	return {
		id: 'jotform',
		authConfig: jotformAuthConfig,
		schema: JotformSchema,
		options: options,
		hooks: options.hooks,
		webhookHooks: options.webhookHooks,
		endpoints: jotformEndpointsNested,
		webhooks: jotformWebhooksNested,
		endpointMeta: jotformEndpointMeta,
		endpointSchemas: jotformEndpointSchemas,
		webhookSchemas: jotformWebhookSchemas,
		pluginWebhookMatcher: (request) => {
			const headers = request.headers;
			// TODO: Update to match your webhook signature headers
			return 'x-jotform-signature' in headers;
		},
		pluginTenantWebhookMatcher: matchJotformTenantWebhook,
		oauthWebhookTenantLinkResolver: resolveJotformOAuthWebhookTenantLink,
		errorHandlers: {
			...errorHandlers,
			...options.errorHandlers,
		},
		keyBuilder: async (ctx: JotformKeyBuilderContext, source) => {
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
	} satisfies InternalJotformPlugin;
}

export type {
	ExampleEvent,
	JotformWebhookOutputs,
} from './webhooks/types';

export type {
	JotformEndpointInputs,
	JotformEndpointOutputs,
	ExampleGetInput,
	ExampleGetResponse,
} from './endpoints/types';
