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
import type { JobNimbusEndpointInputs, JobNimbusEndpointOutputs } from './endpoints/types';
import { JobNimbusEndpointInputSchemas, JobNimbusEndpointOutputSchemas } from './endpoints/types';
import type {
	JobNimbusWebhookOutputs,
	ExampleEvent,
} from './webhooks/types';
import { ExampleEventSchema } from './webhooks/types';
import { Example } from './endpoints';
import { JobNimbusSchema } from './schema';
import { ExampleWebhooks } from './webhooks';
import { errorHandlers } from './error-handlers';
import { matchJobNimbusTenantWebhook } from './webhooks/tenant-matcher';
import { resolveJobNimbusOAuthWebhookTenantLink } from './webhooks/oauth-tenant-link';

export type JobNimbusPluginOptions = {
	authType?: PickAuth<'api_key' | 'oauth_2'>;
	key?: string;
	webhookSecret?: string;
	hooks?: InternalJobNimbusPlugin['hooks'];
	webhookHooks?: InternalJobNimbusPlugin['webhookHooks'];
	errorHandlers?: CorsairErrorHandler;
	permissions?: PluginPermissionsConfig<typeof jobNimbusEndpointsNested>;
};

export type JobNimbusContext = CorsairPluginContext<
	typeof JobNimbusSchema,
	JobNimbusPluginOptions
>;

export type JobNimbusKeyBuilderContext = KeyBuilderContext<JobNimbusPluginOptions>;

export type JobNimbusBoundEndpoints = BindEndpoints<typeof jobNimbusEndpointsNested>;

type JobNimbusEndpoint<
	K extends keyof JobNimbusEndpointOutputs,
> = CorsairEndpoint<
	JobNimbusContext,
	JobNimbusEndpointInputs[K],
	JobNimbusEndpointOutputs[K]
>;

export type JobNimbusEndpoints = {
	exampleGet: JobNimbusEndpoint<'exampleGet'>;
};

type JobNimbusWebhook<
	K extends keyof JobNimbusWebhookOutputs,
	TEvent,
> = CorsairWebhook<JobNimbusContext, TEvent, JobNimbusWebhookOutputs[K]>;

export type JobNimbusWebhooks = {
	example: JobNimbusWebhook<'example', ExampleEvent>;
};

export type JobNimbusBoundWebhooks = BindWebhooks<JobNimbusWebhooks>;

const jobNimbusEndpointsNested = {
	example: {
		get: Example.get,
	},
} as const;

const jobNimbusWebhooksNested = {
	example: {
		example: ExampleWebhooks.example,
	},
} as const;

export const jobNimbusEndpointSchemas = {
	'example.get': {
		input: JobNimbusEndpointInputSchemas.exampleGet,
		output: JobNimbusEndpointOutputSchemas.exampleGet,
	},
} as const satisfies RequiredPluginEndpointSchemas<typeof jobNimbusEndpointsNested>;

const jobNimbusWebhookSchemas = {
	'example.example': {
		description: 'An example webhook event',
		payload: ExampleEventSchema,
		response: ExampleEventSchema,
	},
} as const satisfies RequiredPluginWebhookSchemas<typeof jobNimbusWebhooksNested>;

const defaultAuthType: AuthTypes = 'api_key' as const;

const jobNimbusEndpointMeta = {
	'example.get': {
		riskLevel: 'read',
		description: 'Get an example resource by ID',
	},
} as const satisfies RequiredPluginEndpointMeta<typeof jobNimbusEndpointsNested>;

export const jobNimbusAuthConfig = {
	api_key: {
		account: ['tenant_external_id'] as const,
	},
	oauth_2: {
		account: ['tenant_external_id'] as const,
	},
} as const satisfies PluginAuthConfig;

export type BaseJobNimbusPlugin<T extends JobNimbusPluginOptions> = CorsairPlugin<
	'jobnimbus',
	typeof JobNimbusSchema,
	typeof jobNimbusEndpointsNested,
	typeof jobNimbusWebhooksNested,
	T,
	typeof defaultAuthType
>;

export type InternalJobNimbusPlugin = BaseJobNimbusPlugin<JobNimbusPluginOptions>;

export type ExternalJobNimbusPlugin<T extends JobNimbusPluginOptions> =
	BaseJobNimbusPlugin<T>;

export function jobnimbus<const T extends JobNimbusPluginOptions>(
	incomingOptions: JobNimbusPluginOptions & T = {} as JobNimbusPluginOptions & T,
): ExternalJobNimbusPlugin<T> {
	const options = {
		...incomingOptions,
		authType: incomingOptions.authType ?? defaultAuthType,
	};
	return {
		id: 'jobnimbus',
		authConfig: jobNimbusAuthConfig,
		schema: JobNimbusSchema,
		options: options,
		hooks: options.hooks,
		webhookHooks: options.webhookHooks,
		endpoints: jobNimbusEndpointsNested,
		webhooks: jobNimbusWebhooksNested,
		endpointMeta: jobNimbusEndpointMeta,
		endpointSchemas: jobNimbusEndpointSchemas,
		webhookSchemas: jobNimbusWebhookSchemas,
		pluginWebhookMatcher: (request) => {
			const headers = request.headers;
			// TODO: Update to match your webhook signature headers
			return 'x-jobnimbus-signature' in headers;
		},
		pluginTenantWebhookMatcher: matchJobNimbusTenantWebhook,
		oauthWebhookTenantLinkResolver: resolveJobNimbusOAuthWebhookTenantLink,
		errorHandlers: {
			...errorHandlers,
			...options.errorHandlers,
		},
		keyBuilder: async (ctx: JobNimbusKeyBuilderContext, source) => {
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
	} satisfies InternalJobNimbusPlugin;
}

export type {
	ExampleEvent,
	JobNimbusWebhookOutputs,
} from './webhooks/types';

export type {
	JobNimbusEndpointInputs,
	JobNimbusEndpointOutputs,
	ExampleGetInput,
	ExampleGetResponse,
} from './endpoints/types';
