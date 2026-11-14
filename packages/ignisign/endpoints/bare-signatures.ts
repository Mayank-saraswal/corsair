import { logEventFromContext } from 'corsair/core';
import type { IgnisignEndpoint } from '..';
import { makeIgnisignRequest } from '../client';
import type { BareSignatureProof } from './types';
import {
	IgnisignEndpointInputSchemas,
	IgnisignEndpointOutputSchemas,
} from './types';

export const getConfiguration: IgnisignEndpoint<
	'bareSignatures.getConfiguration'
> = async (ctx, input) => {
	const parsedInput =
		IgnisignEndpointInputSchemas['bareSignatures.getConfiguration'].parse(
			input,
		);
	const endpoint = `/v4/applications/${encodeURIComponent(parsedInput.appId)}/envs/${encodeURIComponent(parsedInput.appEnv)}/bare-signatures-configuration`;
	// `unknown` because response JSON from provider must be validated by the Zod output schema.
	const rawResponse: unknown = await makeIgnisignRequest(endpoint, ctx.key, {
		method: 'GET',
	});
	const response =
		IgnisignEndpointOutputSchemas['bareSignatures.getConfiguration'].parse(
			rawResponse,
		);
	await logEventFromContext(
		ctx,
		'ignisign.bareSignatures.getConfiguration',
		{ appId: parsedInput.appId, appEnv: parsedInput.appEnv },
		'completed',
	);
	return response;
};

export const getProofToken: IgnisignEndpoint<
	'bareSignatures.getProofToken'
> = async (ctx, input) => {
	const parsedInput =
		IgnisignEndpointInputSchemas['bareSignatures.getProofToken'].parse(input);
	const { appEnv, ...body } = parsedInput;
	const endpoint = `/v4/envs/${encodeURIComponent(appEnv)}/oauth2/proofs-token`;
	// `unknown` because response JSON from provider must be validated by the Zod output schema.
	const rawResponse: unknown = await makeIgnisignRequest(endpoint, ctx.key, {
		method: 'POST',
		body: body as Record<string, unknown>,
	});
	const response =
		IgnisignEndpointOutputSchemas['bareSignatures.getProofToken'].parse(
			rawResponse,
		);
	await logEventFromContext(
		ctx,
		'ignisign.bareSignatures.getProofToken',
		{ appEnv, tokenType: response.token_type },
		'completed',
	);
	return response;
};

export const getProofs: IgnisignEndpoint<'bareSignatures.getProofs'> = async (
	ctx,
	input,
) => {
	const parsedInput =
		IgnisignEndpointInputSchemas['bareSignatures.getProofs'].parse(input);
	const endpoint = `/v4/envs/${encodeURIComponent(parsedInput.appEnv)}/bare-signatures/proofs`;
	// Bare signature proofs endpoint accepts token via Bearer header
	const response = await makeIgnisignRequest<BareSignatureProof>(
		endpoint,
		parsedInput.proofToken,
		{
			method: 'GET',
		},
	);
	const parsed =
		IgnisignEndpointOutputSchemas['bareSignatures.getProofs'].parse(response);
	await logEventFromContext(
		ctx,
		'ignisign.bareSignatures.getProofs',
		{
			appEnv: parsedInput.appEnv,
			signatureRequestId: parsed.signatureRequestId,
		},
		'completed',
	);
	return parsed;
};

export const BareSignaturesEndpoints = {
	getConfiguration,
	getProofToken,
	getProofs,
} as const;
