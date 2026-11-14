import type {
	BindEndpoints,
	CorsairErrorHandler,
	CorsairPlugin,
	CorsairPluginContext,
	KeyBuilderContext,
	PickAuth,
	PluginAuthConfig,
	PluginPermissionsConfig,
	RequiredPluginEndpointMeta,
	RequiredPluginEndpointSchemas,
} from 'corsair/core';
import { AuthMissingError } from 'corsair/core';
import {
	thinkificEndpointMeta as generatedThinkificEndpointMeta,
	thinkificEndpointSchemas as generatedThinkificEndpointSchemas,
	thinkificEndpointsNested,
} from './endpoints';
import type {
	ThinkificEndpointInputs,
	ThinkificEndpointOutputs,
} from './endpoints/types';
import { errorHandlers } from './error-handlers';
import { ThinkificSchema } from './schema';

export const thinkificAuthConfig = {
	api_key: {
		account: ['tenant_external_id'] as const,
	},
} as const satisfies PluginAuthConfig;

export const thinkificEndpointSchemas =
	generatedThinkificEndpointSchemas satisfies RequiredPluginEndpointSchemas<
		typeof thinkificEndpointsNested
	>;

export const thinkificEndpointMeta =
	generatedThinkificEndpointMeta satisfies RequiredPluginEndpointMeta<
		typeof thinkificEndpointsNested
	>;

export type ThinkificPluginOptions = {
	authType?: PickAuth<'api_key'>;
	key?: string;
	hooks?: InternalThinkificPlugin['hooks'];
	errorHandlers?: CorsairErrorHandler;
	permissions?: PluginPermissionsConfig<typeof thinkificEndpointsNested>;
};

export type ThinkificContext = CorsairPluginContext<
	typeof ThinkificSchema,
	ThinkificPluginOptions,
	typeof thinkificEndpointsNested,
	typeof thinkificAuthConfig
>;

export type ThinkificKeyBuilderContext = KeyBuilderContext<
	ThinkificPluginOptions,
	typeof thinkificAuthConfig
>;

export type ThinkificBoundEndpoints = BindEndpoints<
	typeof thinkificEndpointsNested
>;

const defaultAuthType = 'api_key' as const;

export type BaseThinkificPlugin<T extends ThinkificPluginOptions> =
	CorsairPlugin<
		'thinkific',
		typeof ThinkificSchema,
		typeof thinkificEndpointsNested,
		Record<string, never>,
		T,
		typeof defaultAuthType,
		typeof thinkificAuthConfig
	>;

export type InternalThinkificPlugin =
	BaseThinkificPlugin<ThinkificPluginOptions>;

export type ExternalThinkificPlugin<T extends ThinkificPluginOptions> =
	BaseThinkificPlugin<T>;

export function thinkific<const T extends ThinkificPluginOptions>(
	incomingOptions: ThinkificPluginOptions & T = {} as ThinkificPluginOptions &
		T,
): ExternalThinkificPlugin<T> {
	const options = {
		...incomingOptions,
		authType: incomingOptions.authType ?? defaultAuthType,
	};
	const { DEFAULT: builtInDefault, ...builtInHandlers } = errorHandlers;
	const { DEFAULT: callerDefault, ...callerHandlers } =
		options.errorHandlers ?? {};

	return {
		id: 'thinkific',
		authConfig: thinkificAuthConfig,
		schema: ThinkificSchema,
		options,
		hooks: options.hooks,
		endpoints: thinkificEndpointsNested,
		webhooks: {},
		endpointMeta: thinkificEndpointMeta,
		endpointSchemas: thinkificEndpointSchemas,
		errorHandlers: {
			...callerHandlers,
			...builtInHandlers,
			DEFAULT: callerDefault ?? builtInDefault,
		},
		keyBuilder: async (ctx: ThinkificKeyBuilderContext, source) => {
			if (source !== 'endpoint') return '';

			const subdomain = await ctx.keys.get_tenant_external_id();
			const apiKey = options.key ?? (await ctx.keys.get_api_key());
			if (!subdomain || !apiKey) {
				throw new AuthMissingError('thinkific', 'api_key');
			}
			return apiKey;
		},
	} satisfies InternalThinkificPlugin;
}

export type { ThinkificEndpointInputs, ThinkificEndpointOutputs };

export { ThinkificComponentSchemas } from './endpoints/schemas';
