import { logEventFromContext } from 'corsair/core';
import type { HexEndpoints } from '..';
import { makeHexRequest } from '../client';
import type { HexEndpointOutputs } from './types';
import { HexEndpointInputSchemas, HexEndpointOutputSchemas } from './types';

/** Use this endpoint to add or remove a status (including endorsements) from datasets and views within a semantic project */
export const semanticUpdate: HexEndpoints['semanticUpdate'] = async (
	ctx,
	input,
) => {
	const parsedInput = HexEndpointInputSchemas.semanticUpdate.parse(input);
	const response = await makeHexRequest<HexEndpointOutputs['semanticUpdate']>(
		`/v1/semantic-projects/${encodeURIComponent(String(parsedInput.semanticProjectId))}`,
		ctx.key,
		{
			method: 'PATCH',
			body: {
				updates: parsedInput.updates,
			},
		},
	);
	const parsed = HexEndpointOutputSchemas.semanticUpdate.parse(response);
	await logEventFromContext(
		ctx,
		'hex.semantic.update',
		{ operation: 'semantic.update' },
		'completed',
	);
	return parsed;
};

/** Ingest a semantic project from a zip file. */
export const semanticIngest: HexEndpoints['semanticIngest'] = async (
	ctx,
	input,
) => {
	const parsedInput = HexEndpointInputSchemas.semanticIngest.parse(input);
	const response = await makeHexRequest<HexEndpointOutputs['semanticIngest']>(
		`/v1/semantic-projects/${encodeURIComponent(String(parsedInput.semanticProjectId))}/ingest`,
		ctx.key,
		{
			method: 'POST',
			body: {
				verbose: parsedInput.verbose,
				debug: parsedInput.debug,
				dryRun: parsedInput.dryRun,
			},
		},
	);
	const parsed = HexEndpointOutputSchemas.semanticIngest.parse(response);
	await logEventFromContext(
		ctx,
		'hex.semantic.ingest',
		{ operation: 'semantic.ingest' },
		'completed',
	);
	return parsed;
};
