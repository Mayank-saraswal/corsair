import { logEventFromContext } from 'corsair/core';
import { base64ToBlob, makeHeygenRequest, makeHeygenUploadRequest } from '../client';
import type { HeygenEndpoints } from '../index';
import type { HeygenEndpointOutputs } from './types';

export const listTemplates: HeygenEndpoints['assetsListTemplates'] = async (
	ctx,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['assetsListTemplates']
	>('/v2/templates', ctx.key, { method: 'GET' });

	await logEventFromContext(ctx, 'heygen.assets.listTemplates', {}, 'completed');
	return result;
};

export const getTemplate: HeygenEndpoints['assetsGetTemplate'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['assetsGetTemplate']
	>(`/v2/template/${input.template_id}`, ctx.key, { method: 'GET' });

	await logEventFromContext(
		ctx,
		'heygen.assets.getTemplate',
		{ templateId: input.template_id },
		'completed',
	);
	return result;
};

// [B] Path inferred as `/v3/templates/{id}`; see endpoints/types.ts for details.
export const getTemplateDetailsV3: HeygenEndpoints['assetsGetTemplateDetailsV3'] =
	async (ctx, input) => {
		const result = await makeHeygenRequest<
			HeygenEndpointOutputs['assetsGetTemplateDetailsV3']
		>(`/v3/templates/${input.template_id}`, ctx.key, { method: 'GET' });

		await logEventFromContext(
			ctx,
			'heygen.assets.getTemplateDetailsV3',
			{ templateId: input.template_id },
			'completed',
		);
		return result;
	};

export const uploadAsset: HeygenEndpoints['assetsUploadAsset'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenUploadRequest<
		HeygenEndpointOutputs['assetsUploadAsset']
	>('/v1/asset', ctx.key, {
		method: 'POST',
		body: base64ToBlob(input.fileBase64, input.contentType),
		contentType: input.contentType,
	});

	await logEventFromContext(ctx, 'heygen.assets.uploadAsset', {}, 'completed');
	return result;
};

export const listAssets: HeygenEndpoints['assetsListAssets'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['assetsListAssets']
	>('/v1/asset/list', ctx.key, {
		method: 'GET',
		query: {
			file_type: input.file_type,
			folder_id: input.folder_id,
			page: input.page,
			limit: input.limit,
		},
	});

	await logEventFromContext(ctx, 'heygen.assets.listAssets', {}, 'completed');
	return result;
};

// [B] Path inferred as `/v2/assets` (cursor-paginated variant); see endpoints/types.ts.
export const listAssets2: HeygenEndpoints['assetsListAssets2'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['assetsListAssets2']
	>('/v2/assets', ctx.key, {
		method: 'GET',
		query: { cursor: input.cursor, limit: input.limit },
	});

	await logEventFromContext(ctx, 'heygen.assets.listAssets2', {}, 'completed');
	return result;
};

export const deleteAsset: HeygenEndpoints['assetsDeleteAsset'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['assetsDeleteAsset']
	>(`/v1/asset/${input.asset_id}/delete`, ctx.key, { method: 'DELETE' });

	await logEventFromContext(
		ctx,
		'heygen.assets.deleteAsset',
		{ assetId: input.asset_id },
		'completed',
	);
	return result;
};

export const createFolder: HeygenEndpoints['assetsCreateFolder'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['assetsCreateFolder']
	>('/v1/folders', ctx.key, { method: 'POST', body: input });

	await logEventFromContext(ctx, 'heygen.assets.createFolder', {}, 'completed');
	return result;
};

export const listFolders: HeygenEndpoints['assetsListFolders'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['assetsListFolders']
	>('/v1/folders', ctx.key, {
		method: 'GET',
		query: { page: input.page, limit: input.limit },
	});

	await logEventFromContext(ctx, 'heygen.assets.listFolders', {}, 'completed');
	return result;
};

// [B] Path inferred as `PATCH /v1/folders/{folder_id}`; see endpoints/types.ts.
export const updateFolder: HeygenEndpoints['assetsUpdateFolder'] = async (
	ctx,
	input,
) => {
	const { folder_id, ...body } = input;
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['assetsUpdateFolder']
	>(`/v1/folders/${folder_id}`, ctx.key, { method: 'PATCH', body });

	await logEventFromContext(
		ctx,
		'heygen.assets.updateFolder',
		{ folderId: folder_id },
		'completed',
	);
	return result;
};

// [B] Path inferred as `POST /v1/folders/{folder_id}/trash`; see endpoints/types.ts.
export const trashFolder: HeygenEndpoints['assetsTrashFolder'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['assetsTrashFolder']
	>(`/v1/folders/${input.folder_id}/trash`, ctx.key, { method: 'POST' });

	await logEventFromContext(
		ctx,
		'heygen.assets.trashFolder',
		{ folderId: input.folder_id },
		'completed',
	);
	return result;
};

// [B] Path inferred as `POST /v1/folders/{folder_id}/restore`; see endpoints/types.ts.
export const restoreFolder: HeygenEndpoints['assetsRestoreFolder'] = async (
	ctx,
	input,
) => {
	const result = await makeHeygenRequest<
		HeygenEndpointOutputs['assetsRestoreFolder']
	>(`/v1/folders/${input.folder_id}/restore`, ctx.key, { method: 'POST' });

	await logEventFromContext(
		ctx,
		'heygen.assets.restoreFolder',
		{ folderId: input.folder_id },
		'completed',
	);
	return result;
};
