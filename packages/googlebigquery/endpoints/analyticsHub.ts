import { logEventFromContext } from 'corsair/core';
import { makeAuthenticatedGoogleBigqueryRequest } from '../client';
import type { GoogleBigqueryEndpoints } from '../index';
import type { GoogleBigqueryEndpointOutputs } from './types';

export const listListings: GoogleBigqueryEndpoints['analyticsHubListListings'] =
	async (ctx, input) => {
		const { projectId, location, dataExchangeId, ...query } = input;
		const result = await makeAuthenticatedGoogleBigqueryRequest<
			GoogleBigqueryEndpointOutputs['analyticsHubListListings']
		>(
			`/projects/${projectId}/locations/${location}/dataExchanges/${dataExchangeId}/listings`,
			ctx,
			{ method: 'GET', host: 'analyticsHub', query },
		);

		await logEventFromContext(
			ctx,
			'googlebigquery.analyticsHub.listListings',
			{ ...input },
			'completed',
		);
		return result;
	};

export const listDataexchangesListings: GoogleBigqueryEndpoints['analyticsHubListDataexchangesListings'] =
	async (ctx, input) => {
		const { projectId, location, ...query } = input;
		const result = await makeAuthenticatedGoogleBigqueryRequest<
			GoogleBigqueryEndpointOutputs['analyticsHubListDataexchangesListings']
		>(`/projects/${projectId}/locations/${location}/dataExchanges`, ctx, {
			method: 'GET',
			host: 'analyticsHub',
			query,
		});

		await logEventFromContext(
			ctx,
			'googlebigquery.analyticsHub.listDataexchangesListings',
			{ ...input },
			'completed',
		);
		return result;
	};

export const createListing: GoogleBigqueryEndpoints['analyticsHubCreateListing'] =
	async (ctx, input) => {
		const { projectId, location, dataExchangeId, listingId, ...body } = input;
		const result = await makeAuthenticatedGoogleBigqueryRequest<
			GoogleBigqueryEndpointOutputs['analyticsHubCreateListing']
		>(
			`/projects/${projectId}/locations/${location}/dataExchanges/${dataExchangeId}/listings`,
			ctx,
			{ method: 'POST', host: 'analyticsHub', query: { listingId }, body },
		);

		await logEventFromContext(
			ctx,
			'googlebigquery.analyticsHub.createListing',
			{ ...input },
			'completed',
		);
		return result;
	};

export const createDataexchangesListings: GoogleBigqueryEndpoints['analyticsHubCreateDataexchangesListings'] =
	async (ctx, input) => {
		const { projectId, location, dataExchangeId, listingId, ...body } = input;
		const result = await makeAuthenticatedGoogleBigqueryRequest<
			GoogleBigqueryEndpointOutputs['analyticsHubCreateDataexchangesListings']
		>(
			`/projects/${projectId}/locations/${location}/dataExchanges/${dataExchangeId}/listings`,
			ctx,
			{ method: 'POST', host: 'analyticsHub', query: { listingId }, body },
		);

		await logEventFromContext(
			ctx,
			'googlebigquery.analyticsHub.createDataexchangesListings',
			{ ...input },
			'completed',
		);
		return result;
	};

export const createDataExchange: GoogleBigqueryEndpoints['analyticsHubCreateDataExchange'] =
	async (ctx, input) => {
		const { projectId, location, dataExchangeId, ...body } = input;
		const result = await makeAuthenticatedGoogleBigqueryRequest<
			GoogleBigqueryEndpointOutputs['analyticsHubCreateDataExchange']
		>(`/projects/${projectId}/locations/${location}/dataExchanges`, ctx, {
			method: 'POST',
			host: 'analyticsHub',
			query: { dataExchangeId },
			body,
		});

		await logEventFromContext(
			ctx,
			'googlebigquery.analyticsHub.createDataExchange',
			{ ...input },
			'completed',
		);
		return result;
	};

export const listOrganizationDataExchanges: GoogleBigqueryEndpoints['analyticsHubListOrganizationDataExchanges'] =
	async (ctx, input) => {
		const { organizationId, location, ...query } = input;
		const result = await makeAuthenticatedGoogleBigqueryRequest<
			GoogleBigqueryEndpointOutputs['analyticsHubListOrganizationDataExchanges']
		>(
			`/organizations/${organizationId}/locations/${location}/dataExchanges`,
			ctx,
			{
				method: 'GET',
				host: 'analyticsHub',
				query,
			},
		);

		await logEventFromContext(
			ctx,
			'googlebigquery.analyticsHub.listOrganizationDataExchanges',
			{ ...input },
			'completed',
		);
		return result;
	};

export const listQueryTemplates: GoogleBigqueryEndpoints['analyticsHubListQueryTemplates'] =
	async (ctx, input) => {
		const { projectId, location, dataExchangeId, ...query } = input;
		const result = await makeAuthenticatedGoogleBigqueryRequest<
			GoogleBigqueryEndpointOutputs['analyticsHubListQueryTemplates']
		>(
			`/projects/${projectId}/locations/${location}/dataExchanges/${dataExchangeId}/queryTemplates`,
			ctx,
			{ method: 'GET', host: 'analyticsHub', query },
		);

		await logEventFromContext(
			ctx,
			'googlebigquery.analyticsHub.listQueryTemplates',
			{ ...input },
			'completed',
		);
		return result;
	};

export const createQueryTemplate: GoogleBigqueryEndpoints['analyticsHubCreateQueryTemplate'] =
	async (ctx, input) => {
		const { projectId, location, dataExchangeId, ...body } = input;
		const result = await makeAuthenticatedGoogleBigqueryRequest<
			GoogleBigqueryEndpointOutputs['analyticsHubCreateQueryTemplate']
		>(
			`/projects/${projectId}/locations/${location}/dataExchanges/${dataExchangeId}/queryTemplates`,
			ctx,
			{ method: 'POST', host: 'analyticsHub', body },
		);

		await logEventFromContext(
			ctx,
			'googlebigquery.analyticsHub.createQueryTemplate',
			{ ...input },
			'completed',
		);
		return result;
	};
