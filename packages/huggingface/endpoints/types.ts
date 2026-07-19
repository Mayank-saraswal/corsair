import { z } from 'zod';

// Hugging Face Hub responses are open-ended; validate structure lightly.
// Callers should treat unknown fields as optional extension data.
const OpenResponseSchema = z.unknown();

const GetWhoamiInputSchema = z.object({});

export type GetWhoamiInput = z.infer<typeof GetWhoamiInputSchema>;

export type GetWhoamiResponse = unknown;

const ListNotificationsInputSchema = z.object({
	read: z.boolean().optional(),
	type: z.string().optional(),
	page: z.number().int().optional(),
});

export type ListNotificationsInput = z.infer<
	typeof ListNotificationsInputSchema
>;

export type ListNotificationsResponse = unknown;

const DeleteNotificationsInputSchema = z.object({
	discussionIds: z.array(z.string()).optional(),
	applyToAll: z.boolean().optional(),
	filter: z.record(z.string(), z.unknown()).optional(),
});

export type DeleteNotificationsInput = z.infer<
	typeof DeleteNotificationsInputSchema
>;

export type DeleteNotificationsResponse = unknown;

const UpdateNotificationSettingsInputSchema = z.object({
	settings: z.record(z.string(), z.unknown()),
});

export type UpdateNotificationSettingsInput = z.infer<
	typeof UpdateNotificationSettingsInputSchema
>;

export type UpdateNotificationSettingsResponse = unknown;

const UpdateWatchSettingsInputSchema = z.object({
	add: z.array(z.record(z.string(), z.unknown())).optional(),
	remove: z.array(z.record(z.string(), z.unknown())).optional(),
});

export type UpdateWatchSettingsInput = z.infer<
	typeof UpdateWatchSettingsInputSchema
>;

export type UpdateWatchSettingsResponse = unknown;

const GetMcpSettingsInputSchema = z.object({});

export type GetMcpSettingsInput = z.infer<typeof GetMcpSettingsInputSchema>;

export type GetMcpSettingsResponse = unknown;

const GetBillingUsageV2InputSchema = z.object({
	from: z.number().int().optional(),
	to: z.number().int().optional(),
});

export type GetBillingUsageV2Input = z.infer<
	typeof GetBillingUsageV2InputSchema
>;

export type GetBillingUsageV2Response = unknown;

const GetJobsUsageInputSchema = z.object({});

export type GetJobsUsageInput = z.infer<typeof GetJobsUsageInputSchema>;

export type GetJobsUsageResponse = unknown;

const GetLiveBillingUsageInputSchema = z.object({});

export type GetLiveBillingUsageInput = z.infer<
	typeof GetLiveBillingUsageInputSchema
>;

export type GetLiveBillingUsageResponse = unknown;

const ListWebhooksInputSchema = z.object({});

export type ListWebhooksInput = z.infer<typeof ListWebhooksInputSchema>;

export type ListWebhooksResponse = unknown;

const GetWebhookInputSchema = z.object({ webhookId: z.string() });

export type GetWebhookInput = z.infer<typeof GetWebhookInputSchema>;

export type GetWebhookResponse = unknown;

const CreateWebhookInputSchema = z.object({
	url: z.string().url(),
	watched: z.array(z.record(z.string(), z.unknown())).optional(),
	domains: z.array(z.string()).optional(),
	secret: z.string().optional(),
	extra: z.record(z.string(), z.unknown()).optional(),
});

export type CreateWebhookInput = z.infer<typeof CreateWebhookInputSchema>;

export type CreateWebhookResponse = unknown;

const UpdateWebhookInputSchema = z.object({
	webhookId: z.string(),
	url: z.string().url().optional(),
	watched: z.array(z.record(z.string(), z.unknown())).optional(),
	domains: z.array(z.string()).optional(),
	extra: z.record(z.string(), z.unknown()).optional(),
});

export type UpdateWebhookInput = z.infer<typeof UpdateWebhookInputSchema>;

export type UpdateWebhookResponse = unknown;

const DeleteWebhookInputSchema = z.object({ webhookId: z.string() });

export type DeleteWebhookInput = z.infer<typeof DeleteWebhookInputSchema>;

export type DeleteWebhookResponse = unknown;

const UpdateWebhookStatusInputSchema = z.object({
	webhookId: z.string(),
	action: z.enum(['enable', 'disable']),
});

export type UpdateWebhookStatusInput = z.infer<
	typeof UpdateWebhookStatusInputSchema
>;

export type UpdateWebhookStatusResponse = unknown;

const ModelsListInputSchema = z.object({
	search: z.string().optional(),
	author: z.string().optional(),
	filter: z.string().optional(),
	sort: z.string().optional(),
	direction: z.union([z.literal(-1), z.literal(1), z.string()]).optional(),
	limit: z.number().int().positive().max(1000).optional(),
	full: z.boolean().optional(),
	config: z.boolean().optional(),
});

export type ModelsListInput = z.infer<typeof ModelsListInputSchema>;

export type ModelsListResponse = unknown;

const ModelsGetInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().optional(),
	full: z.boolean().optional(),
});

export type ModelsGetInput = z.infer<typeof ModelsGetInputSchema>;

export type ModelsGetResponse = unknown;

const ModelsGetScanInputSchema = z.object({
	repoId: z.string().describe('namespace/repo'),
});

export type ModelsGetScanInput = z.infer<typeof ModelsGetScanInputSchema>;

export type ModelsGetScanResponse = unknown;

const ModelsGetCompareInputSchema = z.object({
	repoId: z.string(),
	compare: z.string().describe('e.g. main...other or sha1...sha2'),
});

export type ModelsGetCompareInput = z.infer<typeof ModelsGetCompareInputSchema>;

export type ModelsGetCompareResponse = unknown;

const ModelsListCommitsInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	limit: z.number().int().optional(),
	p: z.number().int().optional(),
});

export type ModelsListCommitsInput = z.infer<
	typeof ModelsListCommitsInputSchema
>;

export type ModelsListCommitsResponse = unknown;

const ModelsListRefsInputSchema = z.object({
	repoId: z.string(),
	includePullRequests: z.boolean().optional(),
});

export type ModelsListRefsInput = z.infer<typeof ModelsListRefsInputSchema>;

export type ModelsListRefsResponse = unknown;

const ModelsListPathsInfoInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	paths: z.array(z.string()),
	expand: z.boolean().optional(),
});

export type ModelsListPathsInfoInput = z.infer<
	typeof ModelsListPathsInfoInputSchema
>;

export type ModelsListPathsInfoResponse = unknown;

const ModelsGetTreeSizeInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	path: z.string().default(''),
});

export type ModelsGetTreeSizeInput = z.infer<
	typeof ModelsGetTreeSizeInputSchema
>;

export type ModelsGetTreeSizeResponse = unknown;

const ModelsGetJwtInputSchema = z.object({
	repoId: z.string(),
	write: z.boolean().optional(),
	expireAt: z.number().optional(),
});

export type ModelsGetJwtInput = z.infer<typeof ModelsGetJwtInputSchema>;

export type ModelsGetJwtResponse = unknown;

const ModelsGetXetReadTokenInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
});

export type ModelsGetXetReadTokenInput = z.infer<
	typeof ModelsGetXetReadTokenInputSchema
>;

export type ModelsGetXetReadTokenResponse = unknown;

const ModelsGetNotebookInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	path: z.string().default(''),
});

export type ModelsGetNotebookInput = z.infer<
	typeof ModelsGetNotebookInputSchema
>;

export type ModelsGetNotebookResponse = unknown;

const ModelsGetResolveInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	path: z.string(),
	xetFileInfo: z.boolean().optional(),
});

export type ModelsGetResolveInput = z.infer<typeof ModelsGetResolveInputSchema>;

export type ModelsGetResolveResponse = unknown;

const ModelsGetResolveCacheInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	path: z.string(),
	xetFileInfo: z.boolean().optional(),
});

export type ModelsGetResolveCacheInput = z.infer<
	typeof ModelsGetResolveCacheInputSchema
>;

export type ModelsGetResolveCacheResponse = unknown;

const ModelsCreateBranchInputSchema = z.object({
	repoId: z.string(),
	branch: z.string(),
	revision: z.string().default('main'),
	startingPoint: z.string().optional(),
});

export type ModelsCreateBranchInput = z.infer<
	typeof ModelsCreateBranchInputSchema
>;

export type ModelsCreateBranchResponse = unknown;

const ModelsDeleteBranchInputSchema = z.object({
	repoId: z.string(),
	branch: z.string(),
});

export type ModelsDeleteBranchInput = z.infer<
	typeof ModelsDeleteBranchInputSchema
>;

export type ModelsDeleteBranchResponse = unknown;

const ModelsCreateCommitInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	summary: z.string().optional(),
	description: z.string().optional(),
	operations: z.array(z.record(z.string(), z.unknown())),
	parentCommit: z.string().optional(),
	createPr: z.boolean().optional(),
});

export type ModelsCreateCommitInput = z.infer<
	typeof ModelsCreateCommitInputSchema
>;

export type ModelsCreateCommitResponse = unknown;

const ModelsCreateTagInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	tag: z.string(),
	message: z.string().optional(),
});

export type ModelsCreateTagInput = z.infer<typeof ModelsCreateTagInputSchema>;

export type ModelsCreateTagResponse = unknown;

const ModelsDeleteTagInputSchema = z.object({
	repoId: z.string(),
	tag: z.string(),
});

export type ModelsDeleteTagInput = z.infer<typeof ModelsDeleteTagInputSchema>;

export type ModelsDeleteTagResponse = unknown;

const ModelsCheckUploadMethodInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	files: z.array(z.record(z.string(), z.unknown())),
});

export type ModelsCheckUploadMethodInput = z.infer<
	typeof ModelsCheckUploadMethodInputSchema
>;

export type ModelsCheckUploadMethodResponse = unknown;

const ModelsUpdateSettingsInputSchema = z.object({
	repoId: z.string(),
	private: z.boolean().optional(),
	gated: z.union([z.boolean(), z.string()]).optional(),
	discussionsDisabled: z.boolean().optional(),
	extra: z.record(z.string(), z.unknown()).optional(),
});

export type ModelsUpdateSettingsInput = z.infer<
	typeof ModelsUpdateSettingsInputSchema
>;

export type ModelsUpdateSettingsResponse = unknown;

const DatasetsListInputSchema = z.object({
	search: z.string().optional(),
	author: z.string().optional(),
	filter: z.string().optional(),
	sort: z.string().optional(),
	direction: z.union([z.literal(-1), z.literal(1), z.string()]).optional(),
	limit: z.number().int().positive().max(1000).optional(),
	full: z.boolean().optional(),
	config: z.boolean().optional(),
});

export type DatasetsListInput = z.infer<typeof DatasetsListInputSchema>;

export type DatasetsListResponse = unknown;

const DatasetsGetInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().optional(),
	full: z.boolean().optional(),
});

export type DatasetsGetInput = z.infer<typeof DatasetsGetInputSchema>;

export type DatasetsGetResponse = unknown;

const DatasetsGetScanInputSchema = z.object({
	repoId: z.string().describe('namespace/repo'),
});

export type DatasetsGetScanInput = z.infer<typeof DatasetsGetScanInputSchema>;

export type DatasetsGetScanResponse = unknown;

const DatasetsGetCompareInputSchema = z.object({
	repoId: z.string(),
	compare: z.string().describe('e.g. main...other or sha1...sha2'),
});

export type DatasetsGetCompareInput = z.infer<
	typeof DatasetsGetCompareInputSchema
>;

export type DatasetsGetCompareResponse = unknown;

const DatasetsListCommitsInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	limit: z.number().int().optional(),
	p: z.number().int().optional(),
});

export type DatasetsListCommitsInput = z.infer<
	typeof DatasetsListCommitsInputSchema
>;

export type DatasetsListCommitsResponse = unknown;

const DatasetsListRefsInputSchema = z.object({
	repoId: z.string(),
	includePullRequests: z.boolean().optional(),
});

export type DatasetsListRefsInput = z.infer<typeof DatasetsListRefsInputSchema>;

export type DatasetsListRefsResponse = unknown;

const DatasetsListPathsInfoInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	paths: z.array(z.string()),
	expand: z.boolean().optional(),
});

export type DatasetsListPathsInfoInput = z.infer<
	typeof DatasetsListPathsInfoInputSchema
>;

export type DatasetsListPathsInfoResponse = unknown;

const DatasetsGetTreeSizeInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	path: z.string().default(''),
});

export type DatasetsGetTreeSizeInput = z.infer<
	typeof DatasetsGetTreeSizeInputSchema
>;

export type DatasetsGetTreeSizeResponse = unknown;

const DatasetsGetJwtInputSchema = z.object({
	repoId: z.string(),
	write: z.boolean().optional(),
	expireAt: z.number().optional(),
});

export type DatasetsGetJwtInput = z.infer<typeof DatasetsGetJwtInputSchema>;

export type DatasetsGetJwtResponse = unknown;

const DatasetsGetXetReadTokenInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
});

export type DatasetsGetXetReadTokenInput = z.infer<
	typeof DatasetsGetXetReadTokenInputSchema
>;

export type DatasetsGetXetReadTokenResponse = unknown;

const DatasetsGetNotebookInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	path: z.string().default(''),
});

export type DatasetsGetNotebookInput = z.infer<
	typeof DatasetsGetNotebookInputSchema
>;

export type DatasetsGetNotebookResponse = unknown;

const DatasetsGetResolveInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	path: z.string(),
	xetFileInfo: z.boolean().optional(),
});

export type DatasetsGetResolveInput = z.infer<
	typeof DatasetsGetResolveInputSchema
>;

export type DatasetsGetResolveResponse = unknown;

const DatasetsGetResolveCacheInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	path: z.string(),
	xetFileInfo: z.boolean().optional(),
});

export type DatasetsGetResolveCacheInput = z.infer<
	typeof DatasetsGetResolveCacheInputSchema
>;

export type DatasetsGetResolveCacheResponse = unknown;

const DatasetsCreateBranchInputSchema = z.object({
	repoId: z.string(),
	branch: z.string(),
	revision: z.string().default('main'),
	startingPoint: z.string().optional(),
});

export type DatasetsCreateBranchInput = z.infer<
	typeof DatasetsCreateBranchInputSchema
>;

export type DatasetsCreateBranchResponse = unknown;

const DatasetsDeleteBranchInputSchema = z.object({
	repoId: z.string(),
	branch: z.string(),
});

export type DatasetsDeleteBranchInput = z.infer<
	typeof DatasetsDeleteBranchInputSchema
>;

export type DatasetsDeleteBranchResponse = unknown;

const DatasetsCreateCommitInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	summary: z.string().optional(),
	description: z.string().optional(),
	operations: z.array(z.record(z.string(), z.unknown())),
	parentCommit: z.string().optional(),
	createPr: z.boolean().optional(),
});

export type DatasetsCreateCommitInput = z.infer<
	typeof DatasetsCreateCommitInputSchema
>;

export type DatasetsCreateCommitResponse = unknown;

const DatasetsCreateTagInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	tag: z.string(),
	message: z.string().optional(),
});

export type DatasetsCreateTagInput = z.infer<
	typeof DatasetsCreateTagInputSchema
>;

export type DatasetsCreateTagResponse = unknown;

const DatasetsDeleteTagInputSchema = z.object({
	repoId: z.string(),
	tag: z.string(),
});

export type DatasetsDeleteTagInput = z.infer<
	typeof DatasetsDeleteTagInputSchema
>;

export type DatasetsDeleteTagResponse = unknown;

const DatasetsCheckUploadMethodInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	files: z.array(z.record(z.string(), z.unknown())),
});

export type DatasetsCheckUploadMethodInput = z.infer<
	typeof DatasetsCheckUploadMethodInputSchema
>;

export type DatasetsCheckUploadMethodResponse = unknown;

const DatasetsUpdateSettingsInputSchema = z.object({
	repoId: z.string(),
	private: z.boolean().optional(),
	gated: z.union([z.boolean(), z.string()]).optional(),
	discussionsDisabled: z.boolean().optional(),
	extra: z.record(z.string(), z.unknown()).optional(),
});

export type DatasetsUpdateSettingsInput = z.infer<
	typeof DatasetsUpdateSettingsInputSchema
>;

export type DatasetsUpdateSettingsResponse = unknown;

const SpacesListInputSchema = z.object({
	search: z.string().optional(),
	author: z.string().optional(),
	filter: z.string().optional(),
	sort: z.string().optional(),
	direction: z.union([z.literal(-1), z.literal(1), z.string()]).optional(),
	limit: z.number().int().positive().max(1000).optional(),
	full: z.boolean().optional(),
	config: z.boolean().optional(),
});

export type SpacesListInput = z.infer<typeof SpacesListInputSchema>;

export type SpacesListResponse = unknown;

const SpacesGetInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().optional(),
	full: z.boolean().optional(),
});

export type SpacesGetInput = z.infer<typeof SpacesGetInputSchema>;

export type SpacesGetResponse = unknown;

const SpacesGetScanInputSchema = z.object({
	repoId: z.string().describe('namespace/repo'),
});

export type SpacesGetScanInput = z.infer<typeof SpacesGetScanInputSchema>;

export type SpacesGetScanResponse = unknown;

const SpacesGetCompareInputSchema = z.object({
	repoId: z.string(),
	compare: z.string().describe('e.g. main...other or sha1...sha2'),
});

export type SpacesGetCompareInput = z.infer<typeof SpacesGetCompareInputSchema>;

export type SpacesGetCompareResponse = unknown;

const SpacesListCommitsInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	limit: z.number().int().optional(),
	p: z.number().int().optional(),
});

export type SpacesListCommitsInput = z.infer<
	typeof SpacesListCommitsInputSchema
>;

export type SpacesListCommitsResponse = unknown;

const SpacesListRefsInputSchema = z.object({
	repoId: z.string(),
	includePullRequests: z.boolean().optional(),
});

export type SpacesListRefsInput = z.infer<typeof SpacesListRefsInputSchema>;

export type SpacesListRefsResponse = unknown;

const SpacesListPathsInfoInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	paths: z.array(z.string()),
	expand: z.boolean().optional(),
});

export type SpacesListPathsInfoInput = z.infer<
	typeof SpacesListPathsInfoInputSchema
>;

export type SpacesListPathsInfoResponse = unknown;

const SpacesGetTreeSizeInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	path: z.string().default(''),
});

export type SpacesGetTreeSizeInput = z.infer<
	typeof SpacesGetTreeSizeInputSchema
>;

export type SpacesGetTreeSizeResponse = unknown;

const SpacesGetJwtInputSchema = z.object({
	repoId: z.string(),
	write: z.boolean().optional(),
	expireAt: z.number().optional(),
});

export type SpacesGetJwtInput = z.infer<typeof SpacesGetJwtInputSchema>;

export type SpacesGetJwtResponse = unknown;

const SpacesGetXetReadTokenInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
});

export type SpacesGetXetReadTokenInput = z.infer<
	typeof SpacesGetXetReadTokenInputSchema
>;

export type SpacesGetXetReadTokenResponse = unknown;

const SpacesGetNotebookInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	path: z.string().default(''),
});

export type SpacesGetNotebookInput = z.infer<
	typeof SpacesGetNotebookInputSchema
>;

export type SpacesGetNotebookResponse = unknown;

const SpacesGetResolveInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	path: z.string(),
	xetFileInfo: z.boolean().optional(),
});

export type SpacesGetResolveInput = z.infer<typeof SpacesGetResolveInputSchema>;

export type SpacesGetResolveResponse = unknown;

const SpacesGetResolveCacheInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	path: z.string(),
	xetFileInfo: z.boolean().optional(),
});

export type SpacesGetResolveCacheInput = z.infer<
	typeof SpacesGetResolveCacheInputSchema
>;

export type SpacesGetResolveCacheResponse = unknown;

const SpacesCreateBranchInputSchema = z.object({
	repoId: z.string(),
	branch: z.string(),
	revision: z.string().default('main'),
	startingPoint: z.string().optional(),
});

export type SpacesCreateBranchInput = z.infer<
	typeof SpacesCreateBranchInputSchema
>;

export type SpacesCreateBranchResponse = unknown;

const SpacesDeleteBranchInputSchema = z.object({
	repoId: z.string(),
	branch: z.string(),
});

export type SpacesDeleteBranchInput = z.infer<
	typeof SpacesDeleteBranchInputSchema
>;

export type SpacesDeleteBranchResponse = unknown;

const SpacesCreateCommitInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	summary: z.string().optional(),
	description: z.string().optional(),
	operations: z.array(z.record(z.string(), z.unknown())),
	parentCommit: z.string().optional(),
	createPr: z.boolean().optional(),
});

export type SpacesCreateCommitInput = z.infer<
	typeof SpacesCreateCommitInputSchema
>;

export type SpacesCreateCommitResponse = unknown;

const SpacesCreateTagInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	tag: z.string(),
	message: z.string().optional(),
});

export type SpacesCreateTagInput = z.infer<typeof SpacesCreateTagInputSchema>;

export type SpacesCreateTagResponse = unknown;

const SpacesDeleteTagInputSchema = z.object({
	repoId: z.string(),
	tag: z.string(),
});

export type SpacesDeleteTagInput = z.infer<typeof SpacesDeleteTagInputSchema>;

export type SpacesDeleteTagResponse = unknown;

const SpacesCheckUploadMethodInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	files: z.array(z.record(z.string(), z.unknown())),
});

export type SpacesCheckUploadMethodInput = z.infer<
	typeof SpacesCheckUploadMethodInputSchema
>;

export type SpacesCheckUploadMethodResponse = unknown;

const SpacesUpdateSettingsInputSchema = z.object({
	repoId: z.string(),
	private: z.boolean().optional(),
	gated: z.union([z.boolean(), z.string()]).optional(),
	discussionsDisabled: z.boolean().optional(),
	extra: z.record(z.string(), z.unknown()).optional(),
});

export type SpacesUpdateSettingsInput = z.infer<
	typeof SpacesUpdateSettingsInputSchema
>;

export type SpacesUpdateSettingsResponse = unknown;

const ModelsGetTagsByTypeInputSchema = z.object({
	type: z.string().optional(),
});

export type ModelsGetTagsByTypeInput = z.infer<
	typeof ModelsGetTagsByTypeInputSchema
>;

export type ModelsGetTagsByTypeResponse = unknown;

const DatasetsGetTagsByTypeInputSchema = z.object({
	type: z.string().optional(),
});

export type DatasetsGetTagsByTypeInput = z.infer<
	typeof DatasetsGetTagsByTypeInputSchema
>;

export type DatasetsGetTagsByTypeResponse = unknown;

const DatasetsGetLeaderboardInputSchema = z.object({
	repoId: z.string().describe('namespace/repo'),
});

export type DatasetsGetLeaderboardInput = z.infer<
	typeof DatasetsGetLeaderboardInputSchema
>;

export type DatasetsGetLeaderboardResponse = unknown;

const DatasetsSquashCommitsInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	message: z.string(),
});

export type DatasetsSquashCommitsInput = z.infer<
	typeof DatasetsSquashCommitsInputSchema
>;

export type DatasetsSquashCommitsResponse = unknown;

const DatasetsListAccessRequestsInputSchema = z.object({
	repoId: z.string(),
	status: z.enum(['pending', 'accepted', 'rejected']).default('pending'),
});

export type DatasetsListAccessRequestsInput = z.infer<
	typeof DatasetsListAccessRequestsInputSchema
>;

export type DatasetsListAccessRequestsResponse = unknown;

const DatasetsHandleAccessRequestInputSchema = z.object({
	repoId: z.string(),
	user: z.string().optional(),
	userId: z.string().optional(),
	status: z.enum(['accepted', 'rejected', 'pending']),
});

export type DatasetsHandleAccessRequestInput = z.infer<
	typeof DatasetsHandleAccessRequestInputSchema
>;

export type DatasetsHandleAccessRequestResponse = unknown;

const DatasetsCheckValidityInputSchema = z.object({
	dataset: z.string(),
	config: z.string().optional(),
	split: z.string().optional(),
});

export type DatasetsCheckValidityInput = z.infer<
	typeof DatasetsCheckValidityInputSchema
>;

export type DatasetsCheckValidityResponse = unknown;

const DatasetsGetCroissantInputSchema = z.object({
	dataset: z.string(),
	config: z.string().optional(),
	split: z.string().optional(),
});

export type DatasetsGetCroissantInput = z.infer<
	typeof DatasetsGetCroissantInputSchema
>;

export type DatasetsGetCroissantResponse = unknown;

const DatasetsGetInfoInputSchema = z.object({
	dataset: z.string(),
	config: z.string().optional(),
	split: z.string().optional(),
});

export type DatasetsGetInfoInput = z.infer<typeof DatasetsGetInfoInputSchema>;

export type DatasetsGetInfoResponse = unknown;

const DatasetsGetSizeInputSchema = z.object({
	dataset: z.string(),
	config: z.string().optional(),
	split: z.string().optional(),
});

export type DatasetsGetSizeInput = z.infer<typeof DatasetsGetSizeInputSchema>;

export type DatasetsGetSizeResponse = unknown;

const DatasetsListSplitsInputSchema = z.object({
	dataset: z.string(),
	config: z.string().optional(),
	split: z.string().optional(),
});

export type DatasetsListSplitsInput = z.infer<
	typeof DatasetsListSplitsInputSchema
>;

export type DatasetsListSplitsResponse = unknown;

const DatasetsListParquetFilesInputSchema = z.object({
	dataset: z.string(),
	config: z.string().optional(),
	split: z.string().optional(),
});

export type DatasetsListParquetFilesInput = z.infer<
	typeof DatasetsListParquetFilesInputSchema
>;

export type DatasetsListParquetFilesResponse = unknown;

const DatasetsGetFirstRowsInputSchema = z.object({
	dataset: z.string(),
	config: z.string(),
	split: z.string(),
});

export type DatasetsGetFirstRowsInput = z.infer<
	typeof DatasetsGetFirstRowsInputSchema
>;

export type DatasetsGetFirstRowsResponse = unknown;

const DatasetsGetRowsInputSchema = z.object({
	dataset: z.string(),
	config: z.string(),
	split: z.string(),
	offset: z.number().int().min(0).default(0),
	length: z.number().int().positive().max(100).default(100),
});

export type DatasetsGetRowsInput = z.infer<typeof DatasetsGetRowsInputSchema>;

export type DatasetsGetRowsResponse = unknown;

const DatasetsGetStatisticsInputSchema = z.object({
	dataset: z.string(),
	config: z.string(),
	split: z.string(),
});

export type DatasetsGetStatisticsInput = z.infer<
	typeof DatasetsGetStatisticsInputSchema
>;

export type DatasetsGetStatisticsResponse = unknown;

const DatasetsFilterRowsInputSchema = z.object({
	dataset: z.string(),
	config: z.string(),
	split: z.string(),
	where: z.string(),
	orderby: z.string().optional(),
	offset: z.number().int().optional(),
	length: z.number().int().optional(),
});

export type DatasetsFilterRowsInput = z.infer<
	typeof DatasetsFilterRowsInputSchema
>;

export type DatasetsFilterRowsResponse = unknown;

const DatasetsSearchInputSchema = z.object({
	dataset: z.string(),
	config: z.string(),
	split: z.string(),
	query: z.string(),
	offset: z.number().int().optional(),
	length: z.number().int().optional(),
});

export type DatasetsSearchInput = z.infer<typeof DatasetsSearchInputSchema>;

export type DatasetsSearchResponse = unknown;

const DatasetsCreateSqlConsoleEmbedInputSchema = z.object({
	repoId: z.string(),
	repoType: z.enum(['dataset']).default('dataset'),
	title: z.string().optional(),
	sql: z.string(),
	private: z.boolean().optional(),
});

export type DatasetsCreateSqlConsoleEmbedInput = z.infer<
	typeof DatasetsCreateSqlConsoleEmbedInputSchema
>;

export type DatasetsCreateSqlConsoleEmbedResponse = unknown;

const DatasetsUpdateSqlConsoleEmbedInputSchema = z.object({
	repoId: z.string(),
	repoType: z.enum(['dataset']).default('dataset'),
	embedId: z.string(),
	title: z.string().optional(),
	sql: z.string().optional(),
	private: z.boolean().optional(),
});

export type DatasetsUpdateSqlConsoleEmbedInput = z.infer<
	typeof DatasetsUpdateSqlConsoleEmbedInputSchema
>;

export type DatasetsUpdateSqlConsoleEmbedResponse = unknown;

const SpacesListHardwareInputSchema = z.object({});

export type SpacesListHardwareInput = z.infer<
	typeof SpacesListHardwareInputSchema
>;

export type SpacesListHardwareResponse = unknown;

const SpacesGetMetricsInputSchema = z.object({
	repoId: z.string().describe('namespace/repo'),
});

export type SpacesGetMetricsInput = z.infer<typeof SpacesGetMetricsInputSchema>;

export type SpacesGetMetricsResponse = unknown;

const SpacesGetEventsInputSchema = z.object({
	repoId: z.string().describe('namespace/repo'),
});

export type SpacesGetEventsInput = z.infer<typeof SpacesGetEventsInputSchema>;

export type SpacesGetEventsResponse = unknown;

const SpacesListLfsFilesInputSchema = z.object({
	repoId: z.string(),
	cursor: z.string().optional(),
	limit: z.number().int().optional(),
});

export type SpacesListLfsFilesInput = z.infer<
	typeof SpacesListLfsFilesInputSchema
>;

export type SpacesListLfsFilesResponse = unknown;

const SpacesGetXetWriteTokenInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
});

export type SpacesGetXetWriteTokenInput = z.infer<
	typeof SpacesGetXetWriteTokenInputSchema
>;

export type SpacesGetXetWriteTokenResponse = unknown;

const SpacesSquashCommitsInputSchema = z.object({
	repoId: z.string(),
	revision: z.string().default('main'),
	message: z.string(),
});

export type SpacesSquashCommitsInput = z.infer<
	typeof SpacesSquashCommitsInputSchema
>;

export type SpacesSquashCommitsResponse = unknown;

const SpacesCreateSecretInputSchema = z.object({
	repoId: z.string(),
	key: z.string(),
	value: z.string(),
	description: z.string().optional(),
});

export type SpacesCreateSecretInput = z.infer<
	typeof SpacesCreateSecretInputSchema
>;

export type SpacesCreateSecretResponse = unknown;

const SpacesDeleteSecretInputSchema = z.object({
	repoId: z.string(),
	key: z.string(),
});

export type SpacesDeleteSecretInput = z.infer<
	typeof SpacesDeleteSecretInputSchema
>;

export type SpacesDeleteSecretResponse = unknown;

const SpacesCreateVariableInputSchema = z.object({
	repoId: z.string(),
	key: z.string(),
	value: z.string(),
	description: z.string().optional(),
});

export type SpacesCreateVariableInput = z.infer<
	typeof SpacesCreateVariableInputSchema
>;

export type SpacesCreateVariableResponse = unknown;

const SpacesDeleteVariableInputSchema = z.object({
	repoId: z.string(),
	key: z.string(),
});

export type SpacesDeleteVariableInput = z.infer<
	typeof SpacesDeleteVariableInputSchema
>;

export type SpacesDeleteVariableResponse = unknown;

const CollectionsCreateInputSchema = z.object({
	title: z.string(),
	namespace: z.string().optional(),
	description: z.string().optional(),
	private: z.boolean().optional(),
});

export type CollectionsCreateInput = z.infer<
	typeof CollectionsCreateInputSchema
>;

export type CollectionsCreateResponse = unknown;

const CollectionsListInputSchema = z.object({
	owner: z.string().optional(),
	item: z.string().optional(),
	sort: z.string().optional(),
	limit: z.number().int().optional(),
	q: z.string().optional(),
});

export type CollectionsListInput = z.infer<typeof CollectionsListInputSchema>;

export type CollectionsListResponse = unknown;

const DiscussionsListInputSchema = z.object({
	repoType: z.enum(['model', 'dataset', 'space']),
	repoId: z.string(),
	status: z.enum(['open', 'closed', 'all']).optional(),
	type: z.enum(['discussion', 'pull_request']).optional(),
	p: z.number().int().optional(),
});

export type DiscussionsListInput = z.infer<typeof DiscussionsListInputSchema>;

export type DiscussionsListResponse = unknown;

const DiscussionsGetInputSchema = z.object({
	repoType: z.enum(['model', 'dataset', 'space']),
	repoId: z.string(),
	discussionNum: z.number().int().positive(),
});

export type DiscussionsGetInput = z.infer<typeof DiscussionsGetInputSchema>;

export type DiscussionsGetResponse = unknown;

const DiscussionsCreateInputSchema = z.object({
	repoType: z.enum(['model', 'dataset', 'space']),
	repoId: z.string(),
	title: z.string(),
	content: z.string().optional(),
	pullRequest: z.boolean().optional(),
});

export type DiscussionsCreateInput = z.infer<
	typeof DiscussionsCreateInputSchema
>;

export type DiscussionsCreateResponse = unknown;

const DiscussionsCreateCommentInputSchema = z.object({
	repoType: z.enum(['model', 'dataset', 'space']),
	repoId: z.string(),
	discussionNum: z.number().int().positive(),
	comment: z.string(),
});

export type DiscussionsCreateCommentInput = z.infer<
	typeof DiscussionsCreateCommentInputSchema
>;

export type DiscussionsCreateCommentResponse = unknown;

const DiscussionsChangeStatusInputSchema = z.object({
	repoType: z.enum(['model', 'dataset', 'space']),
	repoId: z.string(),
	discussionNum: z.number().int().positive(),
	status: z.enum(['open', 'closed']),
});

export type DiscussionsChangeStatusInput = z.infer<
	typeof DiscussionsChangeStatusInputSchema
>;

export type DiscussionsChangeStatusResponse = unknown;

const DiscussionsUpdateTitleInputSchema = z.object({
	repoType: z.enum(['model', 'dataset', 'space']),
	repoId: z.string(),
	discussionNum: z.number().int().positive(),
	title: z.string(),
});

export type DiscussionsUpdateTitleInput = z.infer<
	typeof DiscussionsUpdateTitleInputSchema
>;

export type DiscussionsUpdateTitleResponse = unknown;

const DiscussionsPinInputSchema = z.object({
	repoType: z.enum(['model', 'dataset', 'space']),
	repoId: z.string(),
	discussionNum: z.number().int().positive(),
	pinned: z.boolean(),
});

export type DiscussionsPinInput = z.infer<typeof DiscussionsPinInputSchema>;

export type DiscussionsPinResponse = unknown;

const DiscussionsDeleteInputSchema = z.object({
	repoType: z.enum(['model', 'dataset', 'space']),
	repoId: z.string(),
	discussionNum: z.number().int().positive(),
});

export type DiscussionsDeleteInput = z.infer<
	typeof DiscussionsDeleteInputSchema
>;

export type DiscussionsDeleteResponse = unknown;

const PapersGetDailyInputSchema = z.object({ date: z.string().optional() });

export type PapersGetDailyInput = z.infer<typeof PapersGetDailyInputSchema>;

export type PapersGetDailyResponse = unknown;

const PapersSearchInputSchema = z.object({
	q: z.string(),
	limit: z.number().int().optional(),
});

export type PapersSearchInput = z.infer<typeof PapersSearchInputSchema>;

export type PapersSearchResponse = unknown;

const PapersCreateIndexInputSchema = z.object({ paperId: z.string() });

export type PapersCreateIndexInput = z.infer<
	typeof PapersCreateIndexInputSchema
>;

export type PapersCreateIndexResponse = unknown;

const PapersClaimAuthorshipInputSchema = z.object({
	paperId: z.string(),
	extra: z.record(z.string(), z.unknown()).optional(),
});

export type PapersClaimAuthorshipInput = z.infer<
	typeof PapersClaimAuthorshipInputSchema
>;

export type PapersClaimAuthorshipResponse = unknown;

const PapersCreateCommentInputSchema = z.object({
	paperId: z.string(),
	comment: z.string(),
});

export type PapersCreateCommentInput = z.infer<
	typeof PapersCreateCommentInputSchema
>;

export type PapersCreateCommentResponse = unknown;

const PapersCreateCommentReplyInputSchema = z.object({
	paperId: z.string(),
	commentId: z.string(),
	comment: z.string(),
});

export type PapersCreateCommentReplyInput = z.infer<
	typeof PapersCreateCommentReplyInputSchema
>;

export type PapersCreateCommentReplyResponse = unknown;

const DocsListInputSchema = z.object({});

export type DocsListInput = z.infer<typeof DocsListInputSchema>;

export type DocsListResponse = unknown;

const DocsSearchInputSchema = z.object({
	q: z.string(),
	product: z.string().optional(),
});

export type DocsSearchInput = z.infer<typeof DocsSearchInputSchema>;

export type DocsSearchResponse = unknown;

const ReposCreateInputSchema = z.object({
	name: z.string(),
	type: z.enum(['model', 'dataset', 'space']),
	private: z.boolean().optional(),
	sdk: z.string().optional(),
	hardware: z.string().optional(),
	organization: z.string().optional(),
	extra: z.record(z.string(), z.unknown()).optional(),
});

export type ReposCreateInput = z.infer<typeof ReposCreateInputSchema>;

export type ReposCreateResponse = unknown;

const ReposListFilesInputSchema = z.object({
	repoType: z.enum(['model', 'dataset', 'space']),
	repoId: z.string(),
	revision: z.string().default('main'),
	path: z.string().default(''),
	recursive: z.boolean().optional(),
	expand: z.boolean().optional(),
	cursor: z.string().optional(),
	limit: z.number().int().optional(),
});

export type ReposListFilesInput = z.infer<typeof ReposListFilesInputSchema>;

export type ReposListFilesResponse = unknown;

const ReposGetResolveInputSchema = z.object({
	repoType: z.enum(['model', 'dataset', 'space']),
	repoId: z.string(),
	revision: z.string().default('main'),
	path: z.string(),
	xetFileInfo: z.boolean().optional(),
});

export type ReposGetResolveInput = z.infer<typeof ReposGetResolveInputSchema>;

export type ReposGetResolveResponse = unknown;

const ReposRequestAccessInputSchema = z.object({
	repoType: z.enum(['model', 'dataset', 'space']),
	repoId: z.string(),
	fields: z.record(z.string(), z.unknown()).optional(),
});

export type ReposRequestAccessInput = z.infer<
	typeof ReposRequestAccessInputSchema
>;

export type ReposRequestAccessResponse = unknown;

const UsersGetAvatarInputSchema = z.object({ username: z.string() });

export type UsersGetAvatarInput = z.infer<typeof UsersGetAvatarInputSchema>;

export type UsersGetAvatarResponse = unknown;

const UsersGetOverviewInputSchema = z.object({ username: z.string() });

export type UsersGetOverviewInput = z.infer<typeof UsersGetOverviewInputSchema>;

export type UsersGetOverviewResponse = unknown;

const UsersGetSocialsInputSchema = z.object({ username: z.string() });

export type UsersGetSocialsInput = z.infer<typeof UsersGetSocialsInputSchema>;

export type UsersGetSocialsResponse = unknown;

const OrganizationsGetAvatarInputSchema = z.object({ name: z.string() });

export type OrganizationsGetAvatarInput = z.infer<
	typeof OrganizationsGetAvatarInputSchema
>;

export type OrganizationsGetAvatarResponse = unknown;

const OrganizationsGetMembersInputSchema = z.object({
	name: z.string(),
	search: z.string().optional(),
	limit: z.number().int().optional(),
	page: z.number().int().optional(),
});

export type OrganizationsGetMembersInput = z.infer<
	typeof OrganizationsGetMembersInputSchema
>;

export type OrganizationsGetMembersResponse = unknown;

const OrganizationsGetSocialsInputSchema = z.object({ name: z.string() });

export type OrganizationsGetSocialsInput = z.infer<
	typeof OrganizationsGetSocialsInputSchema
>;

export type OrganizationsGetSocialsResponse = unknown;

const TrendingGetInputSchema = z.object({
	type: z.enum(['model', 'dataset', 'space']).optional(),
	limit: z.number().int().optional(),
});

export type TrendingGetInput = z.infer<typeof TrendingGetInputSchema>;

export type TrendingGetResponse = unknown;

const InferenceChatCompletionInputSchema = z.object({
	model: z.string(),
	messages: z.array(z.record(z.string(), z.unknown())),
	temperature: z.number().optional(),
	maxTokens: z.number().int().optional(),
	stream: z.boolean().optional(),
	extra: z.record(z.string(), z.unknown()).optional(),
});

export type InferenceChatCompletionInput = z.infer<
	typeof InferenceChatCompletionInputSchema
>;

export type InferenceChatCompletionResponse = unknown;

const InferenceEmbeddingsInputSchema = z.object({
	model: z.string(),
	input: z.union([z.string(), z.array(z.string())]),
	extra: z.record(z.string(), z.unknown()).optional(),
});

export type InferenceEmbeddingsInput = z.infer<
	typeof InferenceEmbeddingsInputSchema
>;

export type InferenceEmbeddingsResponse = unknown;

const JobsGetHardwareInputSchema = z.object({});

export type JobsGetHardwareInput = z.infer<typeof JobsGetHardwareInputSchema>;

export type JobsGetHardwareResponse = unknown;

const EndpointsListInputSchema = z.object({
	namespace: z.string(),
	name: z.string().optional(),
});

export type EndpointsListInput = z.infer<typeof EndpointsListInputSchema>;

export type EndpointsListResponse = unknown;

const EndpointsListVendorsInputSchema = z.object({});

export type EndpointsListVendorsInput = z.infer<
	typeof EndpointsListVendorsInputSchema
>;

export type EndpointsListVendorsResponse = unknown;

const EndpointsDeleteNetworkCidrInputSchema = z.object({
	namespace: z.string(),
	cidr: z.string(),
});

export type EndpointsDeleteNetworkCidrInput = z.infer<
	typeof EndpointsDeleteNetworkCidrInputSchema
>;

export type EndpointsDeleteNetworkCidrResponse = unknown;

export type HuggingFaceEndpointInputs = {
	getWhoami: GetWhoamiInput;
	listNotifications: ListNotificationsInput;
	deleteNotifications: DeleteNotificationsInput;
	updateNotificationSettings: UpdateNotificationSettingsInput;
	updateWatchSettings: UpdateWatchSettingsInput;
	getMcpSettings: GetMcpSettingsInput;
	getBillingUsageV2: GetBillingUsageV2Input;
	getJobsUsage: GetJobsUsageInput;
	getLiveBillingUsage: GetLiveBillingUsageInput;
	listWebhooks: ListWebhooksInput;
	getWebhook: GetWebhookInput;
	createWebhook: CreateWebhookInput;
	updateWebhook: UpdateWebhookInput;
	deleteWebhook: DeleteWebhookInput;
	updateWebhookStatus: UpdateWebhookStatusInput;
	modelsList: ModelsListInput;
	modelsGet: ModelsGetInput;
	modelsGetScan: ModelsGetScanInput;
	modelsGetCompare: ModelsGetCompareInput;
	modelsListCommits: ModelsListCommitsInput;
	modelsListRefs: ModelsListRefsInput;
	modelsListPathsInfo: ModelsListPathsInfoInput;
	modelsGetTreeSize: ModelsGetTreeSizeInput;
	modelsGetJwt: ModelsGetJwtInput;
	modelsGetXetReadToken: ModelsGetXetReadTokenInput;
	modelsGetNotebook: ModelsGetNotebookInput;
	modelsGetResolve: ModelsGetResolveInput;
	modelsGetResolveCache: ModelsGetResolveCacheInput;
	modelsCreateBranch: ModelsCreateBranchInput;
	modelsDeleteBranch: ModelsDeleteBranchInput;
	modelsCreateCommit: ModelsCreateCommitInput;
	modelsCreateTag: ModelsCreateTagInput;
	modelsDeleteTag: ModelsDeleteTagInput;
	modelsCheckUploadMethod: ModelsCheckUploadMethodInput;
	modelsUpdateSettings: ModelsUpdateSettingsInput;
	datasetsList: DatasetsListInput;
	datasetsGet: DatasetsGetInput;
	datasetsGetScan: DatasetsGetScanInput;
	datasetsGetCompare: DatasetsGetCompareInput;
	datasetsListCommits: DatasetsListCommitsInput;
	datasetsListRefs: DatasetsListRefsInput;
	datasetsListPathsInfo: DatasetsListPathsInfoInput;
	datasetsGetTreeSize: DatasetsGetTreeSizeInput;
	datasetsGetJwt: DatasetsGetJwtInput;
	datasetsGetXetReadToken: DatasetsGetXetReadTokenInput;
	datasetsGetNotebook: DatasetsGetNotebookInput;
	datasetsGetResolve: DatasetsGetResolveInput;
	datasetsGetResolveCache: DatasetsGetResolveCacheInput;
	datasetsCreateBranch: DatasetsCreateBranchInput;
	datasetsDeleteBranch: DatasetsDeleteBranchInput;
	datasetsCreateCommit: DatasetsCreateCommitInput;
	datasetsCreateTag: DatasetsCreateTagInput;
	datasetsDeleteTag: DatasetsDeleteTagInput;
	datasetsCheckUploadMethod: DatasetsCheckUploadMethodInput;
	datasetsUpdateSettings: DatasetsUpdateSettingsInput;
	spacesList: SpacesListInput;
	spacesGet: SpacesGetInput;
	spacesGetScan: SpacesGetScanInput;
	spacesGetCompare: SpacesGetCompareInput;
	spacesListCommits: SpacesListCommitsInput;
	spacesListRefs: SpacesListRefsInput;
	spacesListPathsInfo: SpacesListPathsInfoInput;
	spacesGetTreeSize: SpacesGetTreeSizeInput;
	spacesGetJwt: SpacesGetJwtInput;
	spacesGetXetReadToken: SpacesGetXetReadTokenInput;
	spacesGetNotebook: SpacesGetNotebookInput;
	spacesGetResolve: SpacesGetResolveInput;
	spacesGetResolveCache: SpacesGetResolveCacheInput;
	spacesCreateBranch: SpacesCreateBranchInput;
	spacesDeleteBranch: SpacesDeleteBranchInput;
	spacesCreateCommit: SpacesCreateCommitInput;
	spacesCreateTag: SpacesCreateTagInput;
	spacesDeleteTag: SpacesDeleteTagInput;
	spacesCheckUploadMethod: SpacesCheckUploadMethodInput;
	spacesUpdateSettings: SpacesUpdateSettingsInput;
	modelsGetTagsByType: ModelsGetTagsByTypeInput;
	datasetsGetTagsByType: DatasetsGetTagsByTypeInput;
	datasetsGetLeaderboard: DatasetsGetLeaderboardInput;
	datasetsSquashCommits: DatasetsSquashCommitsInput;
	datasetsListAccessRequests: DatasetsListAccessRequestsInput;
	datasetsHandleAccessRequest: DatasetsHandleAccessRequestInput;
	datasetsCheckValidity: DatasetsCheckValidityInput;
	datasetsGetCroissant: DatasetsGetCroissantInput;
	datasetsGetInfo: DatasetsGetInfoInput;
	datasetsGetSize: DatasetsGetSizeInput;
	datasetsListSplits: DatasetsListSplitsInput;
	datasetsListParquetFiles: DatasetsListParquetFilesInput;
	datasetsGetFirstRows: DatasetsGetFirstRowsInput;
	datasetsGetRows: DatasetsGetRowsInput;
	datasetsGetStatistics: DatasetsGetStatisticsInput;
	datasetsFilterRows: DatasetsFilterRowsInput;
	datasetsSearch: DatasetsSearchInput;
	datasetsCreateSqlConsoleEmbed: DatasetsCreateSqlConsoleEmbedInput;
	datasetsUpdateSqlConsoleEmbed: DatasetsUpdateSqlConsoleEmbedInput;
	spacesListHardware: SpacesListHardwareInput;
	spacesGetMetrics: SpacesGetMetricsInput;
	spacesGetEvents: SpacesGetEventsInput;
	spacesListLfsFiles: SpacesListLfsFilesInput;
	spacesGetXetWriteToken: SpacesGetXetWriteTokenInput;
	spacesSquashCommits: SpacesSquashCommitsInput;
	spacesCreateSecret: SpacesCreateSecretInput;
	spacesDeleteSecret: SpacesDeleteSecretInput;
	spacesCreateVariable: SpacesCreateVariableInput;
	spacesDeleteVariable: SpacesDeleteVariableInput;
	collectionsCreate: CollectionsCreateInput;
	collectionsList: CollectionsListInput;
	discussionsList: DiscussionsListInput;
	discussionsGet: DiscussionsGetInput;
	discussionsCreate: DiscussionsCreateInput;
	discussionsCreateComment: DiscussionsCreateCommentInput;
	discussionsChangeStatus: DiscussionsChangeStatusInput;
	discussionsUpdateTitle: DiscussionsUpdateTitleInput;
	discussionsPin: DiscussionsPinInput;
	discussionsDelete: DiscussionsDeleteInput;
	papersGetDaily: PapersGetDailyInput;
	papersSearch: PapersSearchInput;
	papersCreateIndex: PapersCreateIndexInput;
	papersClaimAuthorship: PapersClaimAuthorshipInput;
	papersCreateComment: PapersCreateCommentInput;
	papersCreateCommentReply: PapersCreateCommentReplyInput;
	docsList: DocsListInput;
	docsSearch: DocsSearchInput;
	reposCreate: ReposCreateInput;
	reposListFiles: ReposListFilesInput;
	reposGetResolve: ReposGetResolveInput;
	reposRequestAccess: ReposRequestAccessInput;
	usersGetAvatar: UsersGetAvatarInput;
	usersGetOverview: UsersGetOverviewInput;
	usersGetSocials: UsersGetSocialsInput;
	organizationsGetAvatar: OrganizationsGetAvatarInput;
	organizationsGetMembers: OrganizationsGetMembersInput;
	organizationsGetSocials: OrganizationsGetSocialsInput;
	trendingGet: TrendingGetInput;
	inferenceChatCompletion: InferenceChatCompletionInput;
	inferenceEmbeddings: InferenceEmbeddingsInput;
	jobsGetHardware: JobsGetHardwareInput;
	endpointsList: EndpointsListInput;
	endpointsListVendors: EndpointsListVendorsInput;
	endpointsDeleteNetworkCidr: EndpointsDeleteNetworkCidrInput;
};

export type HuggingFaceEndpointOutputs = {
	getWhoami: GetWhoamiResponse;
	listNotifications: ListNotificationsResponse;
	deleteNotifications: DeleteNotificationsResponse;
	updateNotificationSettings: UpdateNotificationSettingsResponse;
	updateWatchSettings: UpdateWatchSettingsResponse;
	getMcpSettings: GetMcpSettingsResponse;
	getBillingUsageV2: GetBillingUsageV2Response;
	getJobsUsage: GetJobsUsageResponse;
	getLiveBillingUsage: GetLiveBillingUsageResponse;
	listWebhooks: ListWebhooksResponse;
	getWebhook: GetWebhookResponse;
	createWebhook: CreateWebhookResponse;
	updateWebhook: UpdateWebhookResponse;
	deleteWebhook: DeleteWebhookResponse;
	updateWebhookStatus: UpdateWebhookStatusResponse;
	modelsList: ModelsListResponse;
	modelsGet: ModelsGetResponse;
	modelsGetScan: ModelsGetScanResponse;
	modelsGetCompare: ModelsGetCompareResponse;
	modelsListCommits: ModelsListCommitsResponse;
	modelsListRefs: ModelsListRefsResponse;
	modelsListPathsInfo: ModelsListPathsInfoResponse;
	modelsGetTreeSize: ModelsGetTreeSizeResponse;
	modelsGetJwt: ModelsGetJwtResponse;
	modelsGetXetReadToken: ModelsGetXetReadTokenResponse;
	modelsGetNotebook: ModelsGetNotebookResponse;
	modelsGetResolve: ModelsGetResolveResponse;
	modelsGetResolveCache: ModelsGetResolveCacheResponse;
	modelsCreateBranch: ModelsCreateBranchResponse;
	modelsDeleteBranch: ModelsDeleteBranchResponse;
	modelsCreateCommit: ModelsCreateCommitResponse;
	modelsCreateTag: ModelsCreateTagResponse;
	modelsDeleteTag: ModelsDeleteTagResponse;
	modelsCheckUploadMethod: ModelsCheckUploadMethodResponse;
	modelsUpdateSettings: ModelsUpdateSettingsResponse;
	datasetsList: DatasetsListResponse;
	datasetsGet: DatasetsGetResponse;
	datasetsGetScan: DatasetsGetScanResponse;
	datasetsGetCompare: DatasetsGetCompareResponse;
	datasetsListCommits: DatasetsListCommitsResponse;
	datasetsListRefs: DatasetsListRefsResponse;
	datasetsListPathsInfo: DatasetsListPathsInfoResponse;
	datasetsGetTreeSize: DatasetsGetTreeSizeResponse;
	datasetsGetJwt: DatasetsGetJwtResponse;
	datasetsGetXetReadToken: DatasetsGetXetReadTokenResponse;
	datasetsGetNotebook: DatasetsGetNotebookResponse;
	datasetsGetResolve: DatasetsGetResolveResponse;
	datasetsGetResolveCache: DatasetsGetResolveCacheResponse;
	datasetsCreateBranch: DatasetsCreateBranchResponse;
	datasetsDeleteBranch: DatasetsDeleteBranchResponse;
	datasetsCreateCommit: DatasetsCreateCommitResponse;
	datasetsCreateTag: DatasetsCreateTagResponse;
	datasetsDeleteTag: DatasetsDeleteTagResponse;
	datasetsCheckUploadMethod: DatasetsCheckUploadMethodResponse;
	datasetsUpdateSettings: DatasetsUpdateSettingsResponse;
	spacesList: SpacesListResponse;
	spacesGet: SpacesGetResponse;
	spacesGetScan: SpacesGetScanResponse;
	spacesGetCompare: SpacesGetCompareResponse;
	spacesListCommits: SpacesListCommitsResponse;
	spacesListRefs: SpacesListRefsResponse;
	spacesListPathsInfo: SpacesListPathsInfoResponse;
	spacesGetTreeSize: SpacesGetTreeSizeResponse;
	spacesGetJwt: SpacesGetJwtResponse;
	spacesGetXetReadToken: SpacesGetXetReadTokenResponse;
	spacesGetNotebook: SpacesGetNotebookResponse;
	spacesGetResolve: SpacesGetResolveResponse;
	spacesGetResolveCache: SpacesGetResolveCacheResponse;
	spacesCreateBranch: SpacesCreateBranchResponse;
	spacesDeleteBranch: SpacesDeleteBranchResponse;
	spacesCreateCommit: SpacesCreateCommitResponse;
	spacesCreateTag: SpacesCreateTagResponse;
	spacesDeleteTag: SpacesDeleteTagResponse;
	spacesCheckUploadMethod: SpacesCheckUploadMethodResponse;
	spacesUpdateSettings: SpacesUpdateSettingsResponse;
	modelsGetTagsByType: ModelsGetTagsByTypeResponse;
	datasetsGetTagsByType: DatasetsGetTagsByTypeResponse;
	datasetsGetLeaderboard: DatasetsGetLeaderboardResponse;
	datasetsSquashCommits: DatasetsSquashCommitsResponse;
	datasetsListAccessRequests: DatasetsListAccessRequestsResponse;
	datasetsHandleAccessRequest: DatasetsHandleAccessRequestResponse;
	datasetsCheckValidity: DatasetsCheckValidityResponse;
	datasetsGetCroissant: DatasetsGetCroissantResponse;
	datasetsGetInfo: DatasetsGetInfoResponse;
	datasetsGetSize: DatasetsGetSizeResponse;
	datasetsListSplits: DatasetsListSplitsResponse;
	datasetsListParquetFiles: DatasetsListParquetFilesResponse;
	datasetsGetFirstRows: DatasetsGetFirstRowsResponse;
	datasetsGetRows: DatasetsGetRowsResponse;
	datasetsGetStatistics: DatasetsGetStatisticsResponse;
	datasetsFilterRows: DatasetsFilterRowsResponse;
	datasetsSearch: DatasetsSearchResponse;
	datasetsCreateSqlConsoleEmbed: DatasetsCreateSqlConsoleEmbedResponse;
	datasetsUpdateSqlConsoleEmbed: DatasetsUpdateSqlConsoleEmbedResponse;
	spacesListHardware: SpacesListHardwareResponse;
	spacesGetMetrics: SpacesGetMetricsResponse;
	spacesGetEvents: SpacesGetEventsResponse;
	spacesListLfsFiles: SpacesListLfsFilesResponse;
	spacesGetXetWriteToken: SpacesGetXetWriteTokenResponse;
	spacesSquashCommits: SpacesSquashCommitsResponse;
	spacesCreateSecret: SpacesCreateSecretResponse;
	spacesDeleteSecret: SpacesDeleteSecretResponse;
	spacesCreateVariable: SpacesCreateVariableResponse;
	spacesDeleteVariable: SpacesDeleteVariableResponse;
	collectionsCreate: CollectionsCreateResponse;
	collectionsList: CollectionsListResponse;
	discussionsList: DiscussionsListResponse;
	discussionsGet: DiscussionsGetResponse;
	discussionsCreate: DiscussionsCreateResponse;
	discussionsCreateComment: DiscussionsCreateCommentResponse;
	discussionsChangeStatus: DiscussionsChangeStatusResponse;
	discussionsUpdateTitle: DiscussionsUpdateTitleResponse;
	discussionsPin: DiscussionsPinResponse;
	discussionsDelete: DiscussionsDeleteResponse;
	papersGetDaily: PapersGetDailyResponse;
	papersSearch: PapersSearchResponse;
	papersCreateIndex: PapersCreateIndexResponse;
	papersClaimAuthorship: PapersClaimAuthorshipResponse;
	papersCreateComment: PapersCreateCommentResponse;
	papersCreateCommentReply: PapersCreateCommentReplyResponse;
	docsList: DocsListResponse;
	docsSearch: DocsSearchResponse;
	reposCreate: ReposCreateResponse;
	reposListFiles: ReposListFilesResponse;
	reposGetResolve: ReposGetResolveResponse;
	reposRequestAccess: ReposRequestAccessResponse;
	usersGetAvatar: UsersGetAvatarResponse;
	usersGetOverview: UsersGetOverviewResponse;
	usersGetSocials: UsersGetSocialsResponse;
	organizationsGetAvatar: OrganizationsGetAvatarResponse;
	organizationsGetMembers: OrganizationsGetMembersResponse;
	organizationsGetSocials: OrganizationsGetSocialsResponse;
	trendingGet: TrendingGetResponse;
	inferenceChatCompletion: InferenceChatCompletionResponse;
	inferenceEmbeddings: InferenceEmbeddingsResponse;
	jobsGetHardware: JobsGetHardwareResponse;
	endpointsList: EndpointsListResponse;
	endpointsListVendors: EndpointsListVendorsResponse;
	endpointsDeleteNetworkCidr: EndpointsDeleteNetworkCidrResponse;
};

export const HuggingFaceEndpointInputSchemas = {
	getWhoami: GetWhoamiInputSchema,
	listNotifications: ListNotificationsInputSchema,
	deleteNotifications: DeleteNotificationsInputSchema,
	updateNotificationSettings: UpdateNotificationSettingsInputSchema,
	updateWatchSettings: UpdateWatchSettingsInputSchema,
	getMcpSettings: GetMcpSettingsInputSchema,
	getBillingUsageV2: GetBillingUsageV2InputSchema,
	getJobsUsage: GetJobsUsageInputSchema,
	getLiveBillingUsage: GetLiveBillingUsageInputSchema,
	listWebhooks: ListWebhooksInputSchema,
	getWebhook: GetWebhookInputSchema,
	createWebhook: CreateWebhookInputSchema,
	updateWebhook: UpdateWebhookInputSchema,
	deleteWebhook: DeleteWebhookInputSchema,
	updateWebhookStatus: UpdateWebhookStatusInputSchema,
	modelsList: ModelsListInputSchema,
	modelsGet: ModelsGetInputSchema,
	modelsGetScan: ModelsGetScanInputSchema,
	modelsGetCompare: ModelsGetCompareInputSchema,
	modelsListCommits: ModelsListCommitsInputSchema,
	modelsListRefs: ModelsListRefsInputSchema,
	modelsListPathsInfo: ModelsListPathsInfoInputSchema,
	modelsGetTreeSize: ModelsGetTreeSizeInputSchema,
	modelsGetJwt: ModelsGetJwtInputSchema,
	modelsGetXetReadToken: ModelsGetXetReadTokenInputSchema,
	modelsGetNotebook: ModelsGetNotebookInputSchema,
	modelsGetResolve: ModelsGetResolveInputSchema,
	modelsGetResolveCache: ModelsGetResolveCacheInputSchema,
	modelsCreateBranch: ModelsCreateBranchInputSchema,
	modelsDeleteBranch: ModelsDeleteBranchInputSchema,
	modelsCreateCommit: ModelsCreateCommitInputSchema,
	modelsCreateTag: ModelsCreateTagInputSchema,
	modelsDeleteTag: ModelsDeleteTagInputSchema,
	modelsCheckUploadMethod: ModelsCheckUploadMethodInputSchema,
	modelsUpdateSettings: ModelsUpdateSettingsInputSchema,
	datasetsList: DatasetsListInputSchema,
	datasetsGet: DatasetsGetInputSchema,
	datasetsGetScan: DatasetsGetScanInputSchema,
	datasetsGetCompare: DatasetsGetCompareInputSchema,
	datasetsListCommits: DatasetsListCommitsInputSchema,
	datasetsListRefs: DatasetsListRefsInputSchema,
	datasetsListPathsInfo: DatasetsListPathsInfoInputSchema,
	datasetsGetTreeSize: DatasetsGetTreeSizeInputSchema,
	datasetsGetJwt: DatasetsGetJwtInputSchema,
	datasetsGetXetReadToken: DatasetsGetXetReadTokenInputSchema,
	datasetsGetNotebook: DatasetsGetNotebookInputSchema,
	datasetsGetResolve: DatasetsGetResolveInputSchema,
	datasetsGetResolveCache: DatasetsGetResolveCacheInputSchema,
	datasetsCreateBranch: DatasetsCreateBranchInputSchema,
	datasetsDeleteBranch: DatasetsDeleteBranchInputSchema,
	datasetsCreateCommit: DatasetsCreateCommitInputSchema,
	datasetsCreateTag: DatasetsCreateTagInputSchema,
	datasetsDeleteTag: DatasetsDeleteTagInputSchema,
	datasetsCheckUploadMethod: DatasetsCheckUploadMethodInputSchema,
	datasetsUpdateSettings: DatasetsUpdateSettingsInputSchema,
	spacesList: SpacesListInputSchema,
	spacesGet: SpacesGetInputSchema,
	spacesGetScan: SpacesGetScanInputSchema,
	spacesGetCompare: SpacesGetCompareInputSchema,
	spacesListCommits: SpacesListCommitsInputSchema,
	spacesListRefs: SpacesListRefsInputSchema,
	spacesListPathsInfo: SpacesListPathsInfoInputSchema,
	spacesGetTreeSize: SpacesGetTreeSizeInputSchema,
	spacesGetJwt: SpacesGetJwtInputSchema,
	spacesGetXetReadToken: SpacesGetXetReadTokenInputSchema,
	spacesGetNotebook: SpacesGetNotebookInputSchema,
	spacesGetResolve: SpacesGetResolveInputSchema,
	spacesGetResolveCache: SpacesGetResolveCacheInputSchema,
	spacesCreateBranch: SpacesCreateBranchInputSchema,
	spacesDeleteBranch: SpacesDeleteBranchInputSchema,
	spacesCreateCommit: SpacesCreateCommitInputSchema,
	spacesCreateTag: SpacesCreateTagInputSchema,
	spacesDeleteTag: SpacesDeleteTagInputSchema,
	spacesCheckUploadMethod: SpacesCheckUploadMethodInputSchema,
	spacesUpdateSettings: SpacesUpdateSettingsInputSchema,
	modelsGetTagsByType: ModelsGetTagsByTypeInputSchema,
	datasetsGetTagsByType: DatasetsGetTagsByTypeInputSchema,
	datasetsGetLeaderboard: DatasetsGetLeaderboardInputSchema,
	datasetsSquashCommits: DatasetsSquashCommitsInputSchema,
	datasetsListAccessRequests: DatasetsListAccessRequestsInputSchema,
	datasetsHandleAccessRequest: DatasetsHandleAccessRequestInputSchema,
	datasetsCheckValidity: DatasetsCheckValidityInputSchema,
	datasetsGetCroissant: DatasetsGetCroissantInputSchema,
	datasetsGetInfo: DatasetsGetInfoInputSchema,
	datasetsGetSize: DatasetsGetSizeInputSchema,
	datasetsListSplits: DatasetsListSplitsInputSchema,
	datasetsListParquetFiles: DatasetsListParquetFilesInputSchema,
	datasetsGetFirstRows: DatasetsGetFirstRowsInputSchema,
	datasetsGetRows: DatasetsGetRowsInputSchema,
	datasetsGetStatistics: DatasetsGetStatisticsInputSchema,
	datasetsFilterRows: DatasetsFilterRowsInputSchema,
	datasetsSearch: DatasetsSearchInputSchema,
	datasetsCreateSqlConsoleEmbed: DatasetsCreateSqlConsoleEmbedInputSchema,
	datasetsUpdateSqlConsoleEmbed: DatasetsUpdateSqlConsoleEmbedInputSchema,
	spacesListHardware: SpacesListHardwareInputSchema,
	spacesGetMetrics: SpacesGetMetricsInputSchema,
	spacesGetEvents: SpacesGetEventsInputSchema,
	spacesListLfsFiles: SpacesListLfsFilesInputSchema,
	spacesGetXetWriteToken: SpacesGetXetWriteTokenInputSchema,
	spacesSquashCommits: SpacesSquashCommitsInputSchema,
	spacesCreateSecret: SpacesCreateSecretInputSchema,
	spacesDeleteSecret: SpacesDeleteSecretInputSchema,
	spacesCreateVariable: SpacesCreateVariableInputSchema,
	spacesDeleteVariable: SpacesDeleteVariableInputSchema,
	collectionsCreate: CollectionsCreateInputSchema,
	collectionsList: CollectionsListInputSchema,
	discussionsList: DiscussionsListInputSchema,
	discussionsGet: DiscussionsGetInputSchema,
	discussionsCreate: DiscussionsCreateInputSchema,
	discussionsCreateComment: DiscussionsCreateCommentInputSchema,
	discussionsChangeStatus: DiscussionsChangeStatusInputSchema,
	discussionsUpdateTitle: DiscussionsUpdateTitleInputSchema,
	discussionsPin: DiscussionsPinInputSchema,
	discussionsDelete: DiscussionsDeleteInputSchema,
	papersGetDaily: PapersGetDailyInputSchema,
	papersSearch: PapersSearchInputSchema,
	papersCreateIndex: PapersCreateIndexInputSchema,
	papersClaimAuthorship: PapersClaimAuthorshipInputSchema,
	papersCreateComment: PapersCreateCommentInputSchema,
	papersCreateCommentReply: PapersCreateCommentReplyInputSchema,
	docsList: DocsListInputSchema,
	docsSearch: DocsSearchInputSchema,
	reposCreate: ReposCreateInputSchema,
	reposListFiles: ReposListFilesInputSchema,
	reposGetResolve: ReposGetResolveInputSchema,
	reposRequestAccess: ReposRequestAccessInputSchema,
	usersGetAvatar: UsersGetAvatarInputSchema,
	usersGetOverview: UsersGetOverviewInputSchema,
	usersGetSocials: UsersGetSocialsInputSchema,
	organizationsGetAvatar: OrganizationsGetAvatarInputSchema,
	organizationsGetMembers: OrganizationsGetMembersInputSchema,
	organizationsGetSocials: OrganizationsGetSocialsInputSchema,
	trendingGet: TrendingGetInputSchema,
	inferenceChatCompletion: InferenceChatCompletionInputSchema,
	inferenceEmbeddings: InferenceEmbeddingsInputSchema,
	jobsGetHardware: JobsGetHardwareInputSchema,
	endpointsList: EndpointsListInputSchema,
	endpointsListVendors: EndpointsListVendorsInputSchema,
	endpointsDeleteNetworkCidr: EndpointsDeleteNetworkCidrInputSchema,
} as const;

export const HuggingFaceEndpointOutputSchemas = {
	getWhoami: OpenResponseSchema,
	listNotifications: OpenResponseSchema,
	deleteNotifications: OpenResponseSchema,
	updateNotificationSettings: OpenResponseSchema,
	updateWatchSettings: OpenResponseSchema,
	getMcpSettings: OpenResponseSchema,
	getBillingUsageV2: OpenResponseSchema,
	getJobsUsage: OpenResponseSchema,
	getLiveBillingUsage: OpenResponseSchema,
	listWebhooks: OpenResponseSchema,
	getWebhook: OpenResponseSchema,
	createWebhook: OpenResponseSchema,
	updateWebhook: OpenResponseSchema,
	deleteWebhook: OpenResponseSchema,
	updateWebhookStatus: OpenResponseSchema,
	modelsList: OpenResponseSchema,
	modelsGet: OpenResponseSchema,
	modelsGetScan: OpenResponseSchema,
	modelsGetCompare: OpenResponseSchema,
	modelsListCommits: OpenResponseSchema,
	modelsListRefs: OpenResponseSchema,
	modelsListPathsInfo: OpenResponseSchema,
	modelsGetTreeSize: OpenResponseSchema,
	modelsGetJwt: OpenResponseSchema,
	modelsGetXetReadToken: OpenResponseSchema,
	modelsGetNotebook: OpenResponseSchema,
	modelsGetResolve: OpenResponseSchema,
	modelsGetResolveCache: OpenResponseSchema,
	modelsCreateBranch: OpenResponseSchema,
	modelsDeleteBranch: OpenResponseSchema,
	modelsCreateCommit: OpenResponseSchema,
	modelsCreateTag: OpenResponseSchema,
	modelsDeleteTag: OpenResponseSchema,
	modelsCheckUploadMethod: OpenResponseSchema,
	modelsUpdateSettings: OpenResponseSchema,
	datasetsList: OpenResponseSchema,
	datasetsGet: OpenResponseSchema,
	datasetsGetScan: OpenResponseSchema,
	datasetsGetCompare: OpenResponseSchema,
	datasetsListCommits: OpenResponseSchema,
	datasetsListRefs: OpenResponseSchema,
	datasetsListPathsInfo: OpenResponseSchema,
	datasetsGetTreeSize: OpenResponseSchema,
	datasetsGetJwt: OpenResponseSchema,
	datasetsGetXetReadToken: OpenResponseSchema,
	datasetsGetNotebook: OpenResponseSchema,
	datasetsGetResolve: OpenResponseSchema,
	datasetsGetResolveCache: OpenResponseSchema,
	datasetsCreateBranch: OpenResponseSchema,
	datasetsDeleteBranch: OpenResponseSchema,
	datasetsCreateCommit: OpenResponseSchema,
	datasetsCreateTag: OpenResponseSchema,
	datasetsDeleteTag: OpenResponseSchema,
	datasetsCheckUploadMethod: OpenResponseSchema,
	datasetsUpdateSettings: OpenResponseSchema,
	spacesList: OpenResponseSchema,
	spacesGet: OpenResponseSchema,
	spacesGetScan: OpenResponseSchema,
	spacesGetCompare: OpenResponseSchema,
	spacesListCommits: OpenResponseSchema,
	spacesListRefs: OpenResponseSchema,
	spacesListPathsInfo: OpenResponseSchema,
	spacesGetTreeSize: OpenResponseSchema,
	spacesGetJwt: OpenResponseSchema,
	spacesGetXetReadToken: OpenResponseSchema,
	spacesGetNotebook: OpenResponseSchema,
	spacesGetResolve: OpenResponseSchema,
	spacesGetResolveCache: OpenResponseSchema,
	spacesCreateBranch: OpenResponseSchema,
	spacesDeleteBranch: OpenResponseSchema,
	spacesCreateCommit: OpenResponseSchema,
	spacesCreateTag: OpenResponseSchema,
	spacesDeleteTag: OpenResponseSchema,
	spacesCheckUploadMethod: OpenResponseSchema,
	spacesUpdateSettings: OpenResponseSchema,
	modelsGetTagsByType: OpenResponseSchema,
	datasetsGetTagsByType: OpenResponseSchema,
	datasetsGetLeaderboard: OpenResponseSchema,
	datasetsSquashCommits: OpenResponseSchema,
	datasetsListAccessRequests: OpenResponseSchema,
	datasetsHandleAccessRequest: OpenResponseSchema,
	datasetsCheckValidity: OpenResponseSchema,
	datasetsGetCroissant: OpenResponseSchema,
	datasetsGetInfo: OpenResponseSchema,
	datasetsGetSize: OpenResponseSchema,
	datasetsListSplits: OpenResponseSchema,
	datasetsListParquetFiles: OpenResponseSchema,
	datasetsGetFirstRows: OpenResponseSchema,
	datasetsGetRows: OpenResponseSchema,
	datasetsGetStatistics: OpenResponseSchema,
	datasetsFilterRows: OpenResponseSchema,
	datasetsSearch: OpenResponseSchema,
	datasetsCreateSqlConsoleEmbed: OpenResponseSchema,
	datasetsUpdateSqlConsoleEmbed: OpenResponseSchema,
	spacesListHardware: OpenResponseSchema,
	spacesGetMetrics: OpenResponseSchema,
	spacesGetEvents: OpenResponseSchema,
	spacesListLfsFiles: OpenResponseSchema,
	spacesGetXetWriteToken: OpenResponseSchema,
	spacesSquashCommits: OpenResponseSchema,
	spacesCreateSecret: OpenResponseSchema,
	spacesDeleteSecret: OpenResponseSchema,
	spacesCreateVariable: OpenResponseSchema,
	spacesDeleteVariable: OpenResponseSchema,
	collectionsCreate: OpenResponseSchema,
	collectionsList: OpenResponseSchema,
	discussionsList: OpenResponseSchema,
	discussionsGet: OpenResponseSchema,
	discussionsCreate: OpenResponseSchema,
	discussionsCreateComment: OpenResponseSchema,
	discussionsChangeStatus: OpenResponseSchema,
	discussionsUpdateTitle: OpenResponseSchema,
	discussionsPin: OpenResponseSchema,
	discussionsDelete: OpenResponseSchema,
	papersGetDaily: OpenResponseSchema,
	papersSearch: OpenResponseSchema,
	papersCreateIndex: OpenResponseSchema,
	papersClaimAuthorship: OpenResponseSchema,
	papersCreateComment: OpenResponseSchema,
	papersCreateCommentReply: OpenResponseSchema,
	docsList: OpenResponseSchema,
	docsSearch: OpenResponseSchema,
	reposCreate: OpenResponseSchema,
	reposListFiles: OpenResponseSchema,
	reposGetResolve: OpenResponseSchema,
	reposRequestAccess: OpenResponseSchema,
	usersGetAvatar: OpenResponseSchema,
	usersGetOverview: OpenResponseSchema,
	usersGetSocials: OpenResponseSchema,
	organizationsGetAvatar: OpenResponseSchema,
	organizationsGetMembers: OpenResponseSchema,
	organizationsGetSocials: OpenResponseSchema,
	trendingGet: OpenResponseSchema,
	inferenceChatCompletion: OpenResponseSchema,
	inferenceEmbeddings: OpenResponseSchema,
	jobsGetHardware: OpenResponseSchema,
	endpointsList: OpenResponseSchema,
	endpointsListVendors: OpenResponseSchema,
	endpointsDeleteNetworkCidr: OpenResponseSchema,
} as const;
