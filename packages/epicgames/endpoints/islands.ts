import { logEventFromContext } from 'corsair/core';
import { makeEpicGamesRequest } from '../client';
import type { EpicGamesEndpoints } from '../index';
import type { EpicGamesEndpointOutputs } from './types';

/**
 * Fortnite Data API paths (official OpenAPI):
 *   GET /islands
 *   GET /islands/{code}
 *   GET /islands/{code}/metrics
 *   GET /islands/{code}/metrics/{interval}
 *   GET /islands/{code}/metrics/{interval}/{metric}
 *
 * Docs: https://api.fortnite.com/ecosystem/v1/docs
 */

function metricRangeQuery(input: { from?: string; to?: string }) {
	return {
		from: input.from,
		to: input.to,
	};
}

function metricInterval(input: { interval?: string }): string {
	return input.interval ?? 'day';
}

export const list: EpicGamesEndpoints['islandsList'] = async (ctx, input) => {
	const result = await makeEpicGamesRequest<
		EpicGamesEndpointOutputs['islandsList']
	>('/islands', ctx.key, {
		method: 'GET',
		query: {
			size: input.size,
			after: input.after,
			before: input.before,
		},
		bearer: true,
	});

	await logEventFromContext(ctx, 'epicgames.islands.list', {}, 'completed');
	return result;
};

export const get: EpicGamesEndpoints['islandsGet'] = async (ctx, input) => {
	const result = await makeEpicGamesRequest<
		EpicGamesEndpointOutputs['islandsGet']
	>(`/islands/${encodeURIComponent(input.code)}`, ctx.key, {
		method: 'GET',
		bearer: true,
	});

	await logEventFromContext(
		ctx,
		'epicgames.islands.get',
		{ code: input.code },
		'completed',
	);
	return result;
};

export const getMetricsByInterval: EpicGamesEndpoints['islandsGetMetricsByInterval'] =
	async (ctx, input) => {
		const { code, interval, from, to, metrics, ...rest } = input;
		const intervalSeg = interval ?? 'day';
		// With explicit interval → /metrics/{interval}; default day also has /metrics
		const path =
			interval === undefined
				? `/islands/${encodeURIComponent(code)}/metrics`
				: `/islands/${encodeURIComponent(code)}/metrics/${encodeURIComponent(intervalSeg)}`;

		const metricsParam = Array.isArray(metrics) ? metrics.join(',') : metrics;

		const result = await makeEpicGamesRequest<
			EpicGamesEndpointOutputs['islandsGetMetricsByInterval']
		>(path, ctx.key, {
			method: 'GET',
			query: {
				...metricRangeQuery({ from, to }),
				metrics: metricsParam,
				// remaining free-form filters (provider may ignore unknown keys)
				...(rest as Record<string, string | number | boolean | undefined>),
			},
			bearer: true,
		});

		await logEventFromContext(
			ctx,
			'epicgames.islands.getMetricsByInterval',
			{ code },
			'completed',
		);
		return result;
	};

async function islandMetric(
	ctx: Parameters<EpicGamesEndpoints['islandsGetPlays']>[0],
	input: {
		code: string;
		interval?: 'day' | 'hour' | 'minute';
		from?: string;
		to?: string;
	},
	metric: string,
	event: string,
) {
	const interval = metricInterval(input);
	const result = await makeEpicGamesRequest(
		`/islands/${encodeURIComponent(input.code)}/metrics/${encodeURIComponent(interval)}/${metric}`,
		ctx.key,
		{
			method: 'GET',
			query: metricRangeQuery(input),
			bearer: true,
		},
	);
	await logEventFromContext(ctx, event, { code: input.code }, 'completed');
	return result;
}

export const getPlays: EpicGamesEndpoints['islandsGetPlays'] = async (
	ctx,
	input,
) =>
	islandMetric(ctx, input, 'plays', 'epicgames.islands.getPlays') as Promise<
		EpicGamesEndpointOutputs['islandsGetPlays']
	>;

export const getUniquePlayers: EpicGamesEndpoints['islandsGetUniquePlayers'] =
	async (ctx, input) =>
		islandMetric(
			ctx,
			input,
			'unique-players',
			'epicgames.islands.getUniquePlayers',
		) as Promise<EpicGamesEndpointOutputs['islandsGetUniquePlayers']>;

export const getMinutesPlayed: EpicGamesEndpoints['islandsGetMinutesPlayed'] =
	async (ctx, input) =>
		islandMetric(
			ctx,
			input,
			'minutes-played',
			'epicgames.islands.getMinutesPlayed',
		) as Promise<EpicGamesEndpointOutputs['islandsGetMinutesPlayed']>;

export const getAvgMinutesPerPlayer: EpicGamesEndpoints['islandsGetAvgMinutesPerPlayer'] =
	async (ctx, input) =>
		islandMetric(
			ctx,
			input,
			// OpenAPI path segment is average-minutes-per-player (not avg-*)
			'average-minutes-per-player',
			'epicgames.islands.getAvgMinutesPerPlayer',
		) as Promise<EpicGamesEndpointOutputs['islandsGetAvgMinutesPerPlayer']>;

export const getPeakCcu: EpicGamesEndpoints['islandsGetPeakCcu'] = async (
	ctx,
	input,
) =>
	islandMetric(
		ctx,
		input,
		'peak-ccu',
		'epicgames.islands.getPeakCcu',
	) as Promise<EpicGamesEndpointOutputs['islandsGetPeakCcu']>;

export const getFavorites: EpicGamesEndpoints['islandsGetFavorites'] = async (
	ctx,
	input,
) =>
	islandMetric(
		ctx,
		input,
		'favorites',
		'epicgames.islands.getFavorites',
	) as Promise<EpicGamesEndpointOutputs['islandsGetFavorites']>;

export const getRecommendations: EpicGamesEndpoints['islandsGetRecommendations'] =
	async (ctx, input) =>
		islandMetric(
			ctx,
			input,
			'recommendations',
			'epicgames.islands.getRecommendations',
		) as Promise<EpicGamesEndpointOutputs['islandsGetRecommendations']>;

export const getRetention: EpicGamesEndpoints['islandsGetRetention'] = async (
	ctx,
	input,
) =>
	islandMetric(
		ctx,
		input,
		'retention',
		'epicgames.islands.getRetention',
	) as Promise<EpicGamesEndpointOutputs['islandsGetRetention']>;
