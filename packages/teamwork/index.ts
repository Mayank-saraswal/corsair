import type {
	AuthTypes,
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
	teamworkInputSchemas,
	teamworkOutputSchemas,
} from './endpoints/openapi-schema';
import type { TeamworkOperationEndpoint } from './endpoints/operations';
import { teamworkOperationsNested } from './endpoints/operations';
import type {
	TeamworkEndpointInputs,
	TeamworkEndpointOutputs,
} from './endpoints/types';
import { teamworkOperations } from './endpoints/types';
import { errorHandlers } from './error-handlers';
import { TeamworkSchema } from './schema';

const teamworkEndpointsNested = teamworkOperationsNested;

export type TeamworkPluginOptions = {
	authType?: PickAuth<'api_key'>;
	key?: string;
	siteName?: string;
	hooks?: InternalTeamworkPlugin['hooks'];
	errorHandlers?: CorsairErrorHandler;
	permissions?: PluginPermissionsConfig<typeof teamworkEndpointsNested>;
};

export type TeamworkContext = CorsairPluginContext<
	typeof TeamworkSchema,
	TeamworkPluginOptions
>;

export type TeamworkKeyBuilderContext =
	KeyBuilderContext<TeamworkPluginOptions>;

export type TeamworkBoundEndpoints = BindEndpoints<
	typeof teamworkEndpointsNested
>;
export type TeamworkEndpoints = Record<string, TeamworkOperationEndpoint>;

export const teamworkEndpointSchemas = Object.fromEntries(
	teamworkOperations.map((operation) => [
		operation.id,
		{
			input: teamworkInputSchemas[operation.id],
			output: teamworkOutputSchemas[operation.id],
		},
	]),
) satisfies RequiredPluginEndpointSchemas<typeof teamworkEndpointsNested>;

const teamworkEndpointMeta = Object.fromEntries(
	teamworkOperations.map((operation) => [
		operation.id,
		{
			riskLevel:
				operation.method === 'GET'
					? 'read'
					: operation.method === 'DELETE' ||
							/\b(delete|remove)\b|convert.*currency/i.test(operation.summary)
						? 'destructive'
						: 'write',
			description: operation.summary,
		},
	]),
) satisfies RequiredPluginEndpointMeta<typeof teamworkEndpointsNested>;

const defaultAuthType: AuthTypes = 'api_key' as const;

export const teamworkAuthConfig = {
	api_key: {
		account: ['tenant_external_id'] as const,
	},
} as const satisfies PluginAuthConfig;

export type BaseTeamworkPlugin<T extends TeamworkPluginOptions> = CorsairPlugin<
	'teamwork',
	typeof TeamworkSchema,
	typeof teamworkEndpointsNested,
	Record<string, never>,
	T,
	typeof defaultAuthType
>;

export type InternalTeamworkPlugin = BaseTeamworkPlugin<TeamworkPluginOptions>;
export type ExternalTeamworkPlugin<T extends TeamworkPluginOptions> =
	BaseTeamworkPlugin<T>;

export function teamwork<const T extends TeamworkPluginOptions>(
	incomingOptions: TeamworkPluginOptions & T = {} as TeamworkPluginOptions & T,
): ExternalTeamworkPlugin<T> {
	const options = {
		...incomingOptions,
		authType: incomingOptions.authType ?? defaultAuthType,
	};
	return {
		id: 'teamwork',
		authConfig: teamworkAuthConfig,
		schema: TeamworkSchema,
		options,
		hooks: options.hooks,
		endpoints: teamworkOperationsNested,
		webhooks: {},
		endpointMeta: teamworkEndpointMeta,
		endpointSchemas: teamworkEndpointSchemas,
		errorHandlers: {
			...errorHandlers,
			...options.errorHandlers,
		},
		keyBuilder: async (ctx: TeamworkKeyBuilderContext, source) => {
			if (source !== 'endpoint') return '';
			if (options.key !== undefined) return options.key;
			if (!ctx.keys) throw new AuthMissingError('teamwork', 'api_key');
			const apiKey = await ctx.keys.get_api_key();
			if (!apiKey) throw new AuthMissingError('teamwork', 'api_key');
			return apiKey;
		},
	} satisfies InternalTeamworkPlugin;
}

export { TeamworkSchema };
export type { TeamworkEndpointInputs, TeamworkEndpointOutputs };
export { teamworkOperations, teamworkInputSchemas, teamworkOutputSchemas };
