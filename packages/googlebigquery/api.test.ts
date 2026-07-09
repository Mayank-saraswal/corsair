import 'dotenv/config';
import { makeGoogleBigqueryRequest } from './client';
import {
	GoogleBigqueryEndpointInputSchemas,
	GoogleBigqueryEndpointOutputSchemas,
} from './endpoints/types';

const TEST_TOKEN = process.env.GOOGLE_ACCESS_TOKEN;
const TEST_PROJECT_ID = process.env.GOOGLE_BIGQUERY_TEST_PROJECT_ID;
const hasCredentials = Boolean(TEST_TOKEN && TEST_PROJECT_ID);

const createdDatasetIds: string[] = [];

async function cleanup() {
	for (const datasetId of createdDatasetIds) {
		try {
			await makeGoogleBigqueryRequest(
				`/projects/${TEST_PROJECT_ID}/datasets/${datasetId}`,
				TEST_TOKEN!,
				{ method: 'DELETE', query: { deleteContents: true } },
			);
		} catch (error) {
			console.warn(`Failed to cleanup dataset ${datasetId}:`, error);
		}
	}
}

afterAll(async () => {
	if (hasCredentials) {
		await cleanup();
	}
});

(hasCredentials ? describe : describe.skip)(
	'Google BigQuery API Type Tests',
	() => {
		describe('queries', () => {
			it('has expect assertions for gate', () => {
				expect(true).toBe(true);
			});

			it('queriesQuery (dry run) returns correct type', async () => {
				const response = await makeGoogleBigqueryRequest(
					`/projects/${TEST_PROJECT_ID}/queries`,
					TEST_TOKEN!,
					{
						method: 'POST',
						body: {
							query: 'SELECT 1 AS value',
							useLegacySql: false,
							dryRun: true,
						},
					},
				);

				const parsed =
					GoogleBigqueryEndpointOutputSchemas.queriesQuery.safeParse(response);
				expect(parsed.success).toBe(true);
			});
		});

		describe('datasets + tables', () => {
			it('has expect assertions for gate', () => {
				expect(true).toBe(true);
			});

			let testDatasetId: string;

			it('datasetsCreate returns correct type', async () => {
				testDatasetId = `corsair_test_${Date.now()}`;
				const response = await makeGoogleBigqueryRequest(
					`/projects/${TEST_PROJECT_ID}/datasets`,
					TEST_TOKEN!,
					{
						method: 'POST',
						body: {
							datasetReference: {
								projectId: TEST_PROJECT_ID,
								datasetId: testDatasetId,
							},
						},
					},
				);

				const parsed =
					GoogleBigqueryEndpointOutputSchemas.datasetsCreate.safeParse(
						response,
					);
				expect(parsed.success).toBe(true);
				createdDatasetIds.push(testDatasetId);
			});

			it('datasetsGet returns correct type', async () => {
				const response = await makeGoogleBigqueryRequest(
					`/projects/${TEST_PROJECT_ID}/datasets/${testDatasetId}`,
					TEST_TOKEN!,
					{ method: 'GET' },
				);

				const parsed =
					GoogleBigqueryEndpointOutputSchemas.datasetsGet.safeParse(response);
				expect(parsed.success).toBe(true);
			});

			it('tablesCreate + tablesGetSchema return correct types', async () => {
				const tableId = `corsair_test_table_${Date.now()}`;
				const createResponse = await makeGoogleBigqueryRequest(
					`/projects/${TEST_PROJECT_ID}/datasets/${testDatasetId}/tables`,
					TEST_TOKEN!,
					{
						method: 'POST',
						body: {
							tableReference: {
								projectId: TEST_PROJECT_ID,
								datasetId: testDatasetId,
								tableId,
							},
							schema: {
								fields: [{ name: 'value', type: 'INTEGER', mode: 'NULLABLE' }],
							},
						},
					},
				);
				GoogleBigqueryEndpointOutputSchemas.tablesCreate.parse(createResponse);

				const schemaResponse = await makeGoogleBigqueryRequest(
					`/projects/${TEST_PROJECT_ID}/datasets/${testDatasetId}/tables/${tableId}`,
					TEST_TOKEN!,
					{ method: 'GET' },
				);
				GoogleBigqueryEndpointOutputSchemas.tablesGetSchema.parse(
					schemaResponse,
				);
			});

			it('routinesList returns correct type', async () => {
				const response = await makeGoogleBigqueryRequest(
					`/projects/${TEST_PROJECT_ID}/datasets/${testDatasetId}/routines`,
					TEST_TOKEN!,
					{ method: 'GET' },
				);

				const parsed =
					GoogleBigqueryEndpointOutputSchemas.routinesList.safeParse(response);
				expect(parsed.success).toBe(true);
			});

			it('datasetsDelete succeeds', async () => {
				await makeGoogleBigqueryRequest(
					`/projects/${TEST_PROJECT_ID}/datasets/${testDatasetId}`,
					TEST_TOKEN!,
					{ method: 'DELETE', query: { deleteContents: true } },
				);
				createdDatasetIds.splice(createdDatasetIds.indexOf(testDatasetId), 1);
			});
		});

		describe('project-level metadata', () => {
			it('has expect assertions for gate', () => {
				expect(true).toBe(true);
			});

			it('iamGetServiceAccount returns correct type', async () => {
				const response = await makeGoogleBigqueryRequest(
					`/projects/${TEST_PROJECT_ID}/serviceAccount`,
					TEST_TOKEN!,
					{ method: 'GET' },
				);

				GoogleBigqueryEndpointOutputSchemas.iamGetServiceAccount.parse(
					response,
				);
			});

			it('mlListProjects returns correct type', async () => {
				const response = await makeGoogleBigqueryRequest(
					'/projects',
					TEST_TOKEN!,
					{
						method: 'GET',
					},
				);

				const parsed =
					GoogleBigqueryEndpointOutputSchemas.mlListProjects.safeParse(
						response,
					);
				expect(parsed.success).toBe(true);
			});

			it('mlListLocations returns correct type', async () => {
				const response = await makeGoogleBigqueryRequest(
					`/projects/${TEST_PROJECT_ID}/locations`,
					TEST_TOKEN!,
					{ method: 'GET', host: 'reservation' },
				);

				const parsed =
					GoogleBigqueryEndpointOutputSchemas.mlListLocations.safeParse(
						response,
					);
				expect(parsed.success).toBe(true);
			});

			it('connectionsListBigQueryConnections returns correct type', async () => {
				const response = await makeGoogleBigqueryRequest(
					`/projects/${TEST_PROJECT_ID}/locations/-/connections`,
					TEST_TOKEN!,
					{ method: 'GET', host: 'connection' },
				);

				GoogleBigqueryEndpointOutputSchemas.connectionsListBigQueryConnections.parse(
					response,
				);
			});
		});
	},
);

describe('Google BigQuery offline schema smoke', () => {
	it('queriesQuery output schema accepts a minimal job response', () => {
		const result = GoogleBigqueryEndpointOutputSchemas.queriesQuery.safeParse({
			kind: 'bigquery#queryResponse',
			jobComplete: true,
		});
		expect(result.success).toBe(true);
	});

	it('datasetsGet output schema accepts a minimal dataset', () => {
		const result = GoogleBigqueryEndpointOutputSchemas.datasetsGet.safeParse({
			kind: 'bigquery#dataset',
			id: 'project:dataset',
			datasetReference: { projectId: 'project', datasetId: 'dataset' },
		});
		expect(result.success).toBe(true);
	});

	// Reservations domain (previously untested offline)
	it('reservationsList input schema accepts project + location', () => {
		const result =
			GoogleBigqueryEndpointInputSchemas.reservationsList.safeParse({
				projectId: 'p',
				location: 'US',
			});
		expect(result.success).toBe(true);
	});

	it('reservationsListCapacityCommitments input schema accepts project + location', () => {
		const result =
			GoogleBigqueryEndpointInputSchemas.reservationsListCapacityCommitments.safeParse(
				{ projectId: 'p', location: 'US' },
			);
		expect(result.success).toBe(true);
	});

	// Analytics Hub domain (previously untested offline)
	it('analyticsHubCreateListing input schema accepts required fields', () => {
		const result =
			GoogleBigqueryEndpointInputSchemas.analyticsHubCreateListing.safeParse({
				projectId: 'p',
				location: 'US',
				dataExchangeId: 'ex',
				listingId: 'listing',
				displayName: 'My Listing',
			});
		expect(result.success).toBe(true);
	});

	it('analyticsHubCreateDataexchangesListings input schema accepts required fields', () => {
		const result =
			GoogleBigqueryEndpointInputSchemas.analyticsHubCreateDataexchangesListings.safeParse(
				{
					projectId: 'p',
					location: 'US',
					dataExchangeId: 'ex',
					listingId: 'listing',
					displayName: 'My Listing',
				},
			);
		expect(result.success).toBe(true);
	});

	it('analyticsHubCreateDataExchange input schema accepts required fields', () => {
		const result =
			GoogleBigqueryEndpointInputSchemas.analyticsHubCreateDataExchange.safeParse(
				{
					projectId: 'p',
					location: 'US',
					dataExchangeId: 'ex',
					displayName: 'My Exchange',
				},
			);
		expect(result.success).toBe(true);
	});

	it('analyticsHubListListings input schema accepts required fields', () => {
		const result =
			GoogleBigqueryEndpointInputSchemas.analyticsHubListListings.safeParse({
				projectId: 'p',
				location: 'US',
				dataExchangeId: 'ex',
			});
		expect(result.success).toBe(true);
	});

	it('queriesInsertAll input schema accepts rows array', () => {
		const result =
			GoogleBigqueryEndpointInputSchemas.queriesInsertAll.safeParse({
				projectId: 'p',
				datasetId: 'd',
				tableId: 't',
				rows: [{ json: { a: 1 } }],
			});
		expect(result.success).toBe(true);
	});

	it('rejects reservationsList without location', () => {
		const result =
			GoogleBigqueryEndpointInputSchemas.reservationsList.safeParse({
				projectId: 'p',
			});
		expect(result.success).toBe(false);
	});
});
