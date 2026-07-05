import 'dotenv/config';
import { makeGoogleBigqueryRequest } from './client';
import { GoogleBigqueryEndpointOutputSchemas } from './endpoints/types';

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

				GoogleBigqueryEndpointOutputSchemas.queriesQuery.parse(response);
			});
		});

		describe('datasets + tables', () => {
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

				GoogleBigqueryEndpointOutputSchemas.datasetsCreate.parse(response);
				createdDatasetIds.push(testDatasetId);
			});

			it('datasetsGet returns correct type', async () => {
				const response = await makeGoogleBigqueryRequest(
					`/projects/${TEST_PROJECT_ID}/datasets/${testDatasetId}`,
					TEST_TOKEN!,
					{ method: 'GET' },
				);

				GoogleBigqueryEndpointOutputSchemas.datasetsGet.parse(response);
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

				GoogleBigqueryEndpointOutputSchemas.routinesList.parse(response);
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

				GoogleBigqueryEndpointOutputSchemas.mlListProjects.parse(response);
			});

			it('mlListLocations returns correct type', async () => {
				const response = await makeGoogleBigqueryRequest(
					`/projects/${TEST_PROJECT_ID}/locations`,
					TEST_TOKEN!,
					{ method: 'GET', host: 'reservation' },
				);

				GoogleBigqueryEndpointOutputSchemas.mlListLocations.parse(response);
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
