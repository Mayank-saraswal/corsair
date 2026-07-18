import { logEventFromContext } from 'corsair/core';
import { DEFAULT_REMOTE_CONTROL_BASE, makeEpicGamesRequest } from '../client';
import type { EpicGamesEndpoints } from '../index';
import type { EpicGamesEndpointOutputs } from './types';

function remoteBase(ctx: {
	options: { remoteControlBaseUrl?: string };
}): string {
	return ctx.options.remoteControlBaseUrl ?? DEFAULT_REMOTE_CONTROL_BASE;
}

function remoteOpts(ctx: {
	key: string;
	options: { remoteControlBaseUrl?: string; remoteControlBearer?: boolean };
}) {
	return {
		baseUrl: remoteBase(ctx),
		// Local UE Remote Control is often open; optional Bearer when configured.
		bearer: ctx.options.remoteControlBearer ?? Boolean(ctx.key),
	};
}

export const initiateSession: EpicGamesEndpoints['remoteInitiateSession'] =
	async (ctx, input) => {
		const result = await makeEpicGamesRequest<
			EpicGamesEndpointOutputs['remoteInitiateSession']
		>('/remote/control/session', ctx.key, {
			method: 'PUT',
			body: input,
			...remoteOpts(ctx),
		});
		await logEventFromContext(
			ctx,
			'epicgames.remote.initiateSession',
			{},
			'completed',
		);
		return result;
	};

export const batch: EpicGamesEndpoints['remoteBatch'] = async (ctx, input) => {
	const result = await makeEpicGamesRequest<
		EpicGamesEndpointOutputs['remoteBatch']
	>('/remote/batch', ctx.key, {
		method: 'PUT',
		body: { Requests: input.requests },
		...remoteOpts(ctx),
	});
	await logEventFromContext(
		ctx,
		'epicgames.remote.batch',
		{ itemCount: input.requests.length },
		'completed',
	);
	return result;
};

export const corsPreflight: EpicGamesEndpoints['remoteCorsPreflight'] = async (
	ctx,
) => {
	const result = await makeEpicGamesRequest<
		EpicGamesEndpointOutputs['remoteCorsPreflight']
	>('/remote', ctx.key, {
		method: 'OPTIONS',
		...remoteOpts(ctx),
	});
	await logEventFromContext(
		ctx,
		'epicgames.remote.corsPreflight',
		{},
		'completed',
	);
	return result;
};

export const getPreset: EpicGamesEndpoints['remoteGetPreset'] = async (
	ctx,
	input,
) => {
	const result = await makeEpicGamesRequest<
		EpicGamesEndpointOutputs['remoteGetPreset']
	>(`/remote/preset/${encodeURIComponent(input.presetName)}`, ctx.key, {
		method: 'GET',
		...remoteOpts(ctx),
	});
	await logEventFromContext(
		ctx,
		'epicgames.remote.getPreset',
		{ presetName: input.presetName },
		'completed',
	);
	return result;
};

export const getPresetMetadata: EpicGamesEndpoints['remoteGetPresetMetadata'] =
	async (ctx, input) => {
		const result = await makeEpicGamesRequest<
			EpicGamesEndpointOutputs['remoteGetPresetMetadata']
		>(
			`/remote/preset/${encodeURIComponent(input.presetName)}/metadata`,
			ctx.key,
			{ method: 'GET', ...remoteOpts(ctx) },
		);
		await logEventFromContext(
			ctx,
			'epicgames.remote.getPresetMetadata',
			{ presetName: input.presetName },
			'completed',
		);
		return result;
	};

export const getPresetMetadataKey: EpicGamesEndpoints['remoteGetPresetMetadataKey'] =
	async (ctx, input) => {
		const result = await makeEpicGamesRequest<
			EpicGamesEndpointOutputs['remoteGetPresetMetadataKey']
		>(
			`/remote/preset/${encodeURIComponent(input.presetName)}/metadata/${encodeURIComponent(input.key)}`,
			ctx.key,
			{ method: 'GET', ...remoteOpts(ctx) },
		);
		await logEventFromContext(
			ctx,
			'epicgames.remote.getPresetMetadataKey',
			{ presetName: input.presetName },
			'completed',
		);
		return result;
	};

export const putPresetMetadataKey: EpicGamesEndpoints['remotePutPresetMetadataKey'] =
	async (ctx, input) => {
		const result = await makeEpicGamesRequest<
			EpicGamesEndpointOutputs['remotePutPresetMetadataKey']
		>(
			`/remote/preset/${encodeURIComponent(input.presetName)}/metadata/${encodeURIComponent(input.key)}`,
			ctx.key,
			{
				method: 'PUT',
				body: { Value: input.value },
				...remoteOpts(ctx),
			},
		);
		await logEventFromContext(
			ctx,
			'epicgames.remote.putPresetMetadataKey',
			{ presetName: input.presetName },
			'completed',
		);
		return result;
	};

export const deletePresetMetadataKey: EpicGamesEndpoints['remoteDeletePresetMetadataKey'] =
	async (ctx, input) => {
		const result = await makeEpicGamesRequest<
			EpicGamesEndpointOutputs['remoteDeletePresetMetadataKey']
		>(
			`/remote/preset/${encodeURIComponent(input.presetName)}/metadata/${encodeURIComponent(input.key)}`,
			ctx.key,
			{ method: 'DELETE', ...remoteOpts(ctx) },
		);
		await logEventFromContext(
			ctx,
			'epicgames.remote.deletePresetMetadataKey',
			{ presetName: input.presetName },
			'completed',
		);
		return result;
	};

export const getPresetProperty: EpicGamesEndpoints['remoteGetPresetProperty'] =
	async (ctx, input) => {
		const result = await makeEpicGamesRequest<
			EpicGamesEndpointOutputs['remoteGetPresetProperty']
		>(
			`/remote/preset/${encodeURIComponent(input.presetName)}/property/${encodeURIComponent(input.propertyName)}`,
			ctx.key,
			{ method: 'GET', ...remoteOpts(ctx) },
		);
		await logEventFromContext(
			ctx,
			'epicgames.remote.getPresetProperty',
			{ presetName: input.presetName },
			'completed',
		);
		return result;
	};

export const updatePresetProperty: EpicGamesEndpoints['remoteUpdatePresetProperty'] =
	async (ctx, input) => {
		const result = await makeEpicGamesRequest<
			EpicGamesEndpointOutputs['remoteUpdatePresetProperty']
		>(
			`/remote/preset/${encodeURIComponent(input.presetName)}/property/${encodeURIComponent(input.propertyName)}`,
			ctx.key,
			{
				method: 'PUT',
				// value is free-form property payload from the preset
				body: {
					PropertyValue: input.value as Record<string, unknown>,
				},
				...remoteOpts(ctx),
			},
		);
		await logEventFromContext(
			ctx,
			'epicgames.remote.updatePresetProperty',
			{ presetName: input.presetName },
			'completed',
		);
		return result;
	};

export const invokePresetFunction: EpicGamesEndpoints['remoteInvokePresetFunction'] =
	async (ctx, input) => {
		const result = await makeEpicGamesRequest<
			EpicGamesEndpointOutputs['remoteInvokePresetFunction']
		>(
			`/remote/preset/${encodeURIComponent(input.presetName)}/function/${encodeURIComponent(input.functionName)}`,
			ctx.key,
			{
				method: 'PUT',
				body: { Parameters: input.parameters ?? {} },
				...remoteOpts(ctx),
			},
		);
		await logEventFromContext(
			ctx,
			'epicgames.remote.invokePresetFunction',
			{ presetName: input.presetName },
			'completed',
		);
		return result;
	};

export const describeObject: EpicGamesEndpoints['remoteDescribeObject'] =
	async (ctx, input) => {
		const result = await makeEpicGamesRequest<
			EpicGamesEndpointOutputs['remoteDescribeObject']
		>('/remote/object/describe', ctx.key, {
			method: 'PUT',
			body: { objectPath: input.objectPath },
			...remoteOpts(ctx),
		});
		await logEventFromContext(
			ctx,
			'epicgames.remote.describeObject',
			{},
			'completed',
		);
		return result;
	};

export const callObjectFunction: EpicGamesEndpoints['remoteCallObjectFunction'] =
	async (ctx, input) => {
		const result = await makeEpicGamesRequest<
			EpicGamesEndpointOutputs['remoteCallObjectFunction']
		>('/remote/object/call', ctx.key, {
			method: 'PUT',
			body: {
				objectPath: input.objectPath,
				functionName: input.functionName,
				parameters: input.parameters ?? {},
				generateTransaction: input.generateTransaction,
			},
			...remoteOpts(ctx),
		});
		await logEventFromContext(
			ctx,
			'epicgames.remote.callObjectFunction',
			{},
			'completed',
		);
		return result;
	};

export const putObjectProperty: EpicGamesEndpoints['remotePutObjectProperty'] =
	async (ctx, input) => {
		const { objectPath, access, propertyValues, ...rest } = input;
		const result = await makeEpicGamesRequest<
			EpicGamesEndpointOutputs['remotePutObjectProperty']
		>('/remote/object/property', ctx.key, {
			method: 'PUT',
			body: {
				objectPath,
				access: access ?? 'READ_ACCESS',
				// free-form property bag from UE Remote Control
				...(propertyValues ?? {}),
				...rest,
			},
			...remoteOpts(ctx),
		});
		await logEventFromContext(
			ctx,
			'epicgames.remote.putObjectProperty',
			{},
			'completed',
		);
		return result;
	};

export const getObjectThumbnail: EpicGamesEndpoints['remoteGetObjectThumbnail'] =
	async (ctx, input) => {
		const result = await makeEpicGamesRequest<
			EpicGamesEndpointOutputs['remoteGetObjectThumbnail']
		>('/remote/object/thumbnail', ctx.key, {
			method: 'PUT',
			body: { objectPath: input.objectPath },
			...remoteOpts(ctx),
		});
		await logEventFromContext(
			ctx,
			'epicgames.remote.getObjectThumbnail',
			{},
			'completed',
		);
		return result;
	};

export const listBlueprintCallableFunctions: EpicGamesEndpoints['remoteListBlueprintCallableFunctions'] =
	async (ctx, input) => {
		// Derived from object describe; list is extracted when present.
		const described = await makeEpicGamesRequest<
			EpicGamesEndpointOutputs['remoteListBlueprintCallableFunctions']
		>('/remote/object/describe', ctx.key, {
			method: 'PUT',
			body: { objectPath: input.objectPath },
			...remoteOpts(ctx),
		});
		await logEventFromContext(
			ctx,
			'epicgames.remote.listBlueprintCallableFunctions',
			{},
			'completed',
		);
		return described;
	};

export const waitForObjectEvent: EpicGamesEndpoints['remoteWaitForObjectEvent'] =
	async (ctx, input) => {
		// Experimental: requires WebControl.EnableExperimentalRoutes=1 in UE.
		const { objectPath, eventName, ...rest } = input;
		const result = await makeEpicGamesRequest<
			EpicGamesEndpointOutputs['remoteWaitForObjectEvent']
		>('/remote/object/event', ctx.key, {
			method: 'PUT',
			body: {
				objectPath,
				eventName,
				...rest,
			},
			...remoteOpts(ctx),
		});
		await logEventFromContext(
			ctx,
			'epicgames.remote.waitForObjectEvent',
			{},
			'completed',
		);
		return result;
	};
