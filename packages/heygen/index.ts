import type {
	AuthTypes,
	BindEndpoints,
	CorsairEndpoint,
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
	Assets,
	Avatars,
	KnowledgeBases,
	Streaming,
	Videos,
	Voices,
	WebhooksQuota,
} from './endpoints';
import type { HeygenEndpointInputs, HeygenEndpointOutputs } from './endpoints/types';
import {
	HeygenEndpointInputSchemas,
	HeygenEndpointOutputSchemas,
} from './endpoints/types';
import { errorHandlers } from './error-handlers';
import { HeygenSchema } from './schema';

export type HeygenPluginOptions = {
	authType?: PickAuth<'api_key'>;
	key?: string;
	hooks?: InternalHeygenPlugin['hooks'];
	errorHandlers?: CorsairErrorHandler;
	permissions?: PluginPermissionsConfig<typeof heygenEndpointsNested>;
};

export type HeygenContext = CorsairPluginContext<
	typeof HeygenSchema,
	HeygenPluginOptions
>;

export type HeygenKeyBuilderContext = KeyBuilderContext<HeygenPluginOptions>;

export type HeygenBoundEndpoints = BindEndpoints<typeof heygenEndpointsNested>;

type HeygenEndpoint<K extends keyof HeygenEndpointOutputs> = CorsairEndpoint<
	HeygenContext,
	HeygenEndpointInputs[K],
	HeygenEndpointOutputs[K]
>;

export type HeygenEndpoints = {
	videosGenerate: HeygenEndpoint<'videosGenerate'>;
	videosTemplateGenerate: HeygenEndpoint<'videosTemplateGenerate'>;
	videosCreateWebm: HeygenEndpoint<'videosCreateWebm'>;
	videosPersonalizedAddContact: HeygenEndpoint<'videosPersonalizedAddContact'>;
	videosPersonalizedProjectDetail: HeygenEndpoint<'videosPersonalizedProjectDetail'>;
	videosGetStatus: HeygenEndpoint<'videosGetStatus'>;
	videosTranslate: HeygenEndpoint<'videosTranslate'>;
	videosTranslateStatus: HeygenEndpoint<'videosTranslateStatus'>;
	videosTranslateTargetLanguages: HeygenEndpoint<'videosTranslateTargetLanguages'>;
	videosGetSharableUrl: HeygenEndpoint<'videosGetSharableUrl'>;
	videosDelete: HeygenEndpoint<'videosDelete'>;
	videosList: HeygenEndpoint<'videosList'>;

	avatarsList: HeygenEndpoint<'avatarsList'>;
	avatarsGetDetails: HeygenEndpoint<'avatarsGetDetails'>;
	avatarsListGroups: HeygenEndpoint<'avatarsListGroups'>;
	avatarsListGroupAvatars: HeygenEndpoint<'avatarsListGroupAvatars'>;
	avatarsSearchPublicGroups: HeygenEndpoint<'avatarsSearchPublicGroups'>;
	avatarsCreatePhotoGroup: HeygenEndpoint<'avatarsCreatePhotoGroup'>;
	avatarsGeneratePhotos: HeygenEndpoint<'avatarsGeneratePhotos'>;
	avatarsAddLooks: HeygenEndpoint<'avatarsAddLooks'>;
	avatarsCheckLookStatus: HeygenEndpoint<'avatarsCheckLookStatus'>;
	avatarsGetTrainingStatus: HeygenEndpoint<'avatarsGetTrainingStatus'>;
	avatarsGetPhotoDetails: HeygenEndpoint<'avatarsGetPhotoDetails'>;
	avatarsDeletePhotoGroup: HeygenEndpoint<'avatarsDeletePhotoGroup'>;
	avatarsDeletePhoto: HeygenEndpoint<'avatarsDeletePhoto'>;
	avatarsAddMotion: HeygenEndpoint<'avatarsAddMotion'>;
	avatarsUpscale: HeygenEndpoint<'avatarsUpscale'>;
	avatarsListTalkingPhotos: HeygenEndpoint<'avatarsListTalkingPhotos'>;
	avatarsUploadTalkingPhoto: HeygenEndpoint<'avatarsUploadTalkingPhoto'>;
	avatarsDeleteTalkingPhoto: HeygenEndpoint<'avatarsDeleteTalkingPhoto'>;

	voicesGenerateSpeech: HeygenEndpoint<'voicesGenerateSpeech'>;
	voicesGeneratePreview: HeygenEndpoint<'voicesGeneratePreview'>;
	voicesListTts: HeygenEndpoint<'voicesListTts'>;
	voicesListLocales: HeygenEndpoint<'voicesListLocales'>;
	voicesListV2: HeygenEndpoint<'voicesListV2'>;
	voicesListV1: HeygenEndpoint<'voicesListV1'>;
	voicesListBrandVoices: HeygenEndpoint<'voicesListBrandVoices'>;

	streamingNewSession: HeygenEndpoint<'streamingNewSession'>;
	streamingCreateToken: HeygenEndpoint<'streamingCreateToken'>;
	streamingStart: HeygenEndpoint<'streamingStart'>;
	streamingStop: HeygenEndpoint<'streamingStop'>;
	streamingInterrupt: HeygenEndpoint<'streamingInterrupt'>;
	streamingKeepAlive: HeygenEndpoint<'streamingKeepAlive'>;
	streamingTask: HeygenEndpoint<'streamingTask'>;
	streamingIce: HeygenEndpoint<'streamingIce'>;
	streamingNew: HeygenEndpoint<'streamingNew'>;
	streamingList: HeygenEndpoint<'streamingList'>;
	streamingListAvatars: HeygenEndpoint<'streamingListAvatars'>;
	streamingListSessionHistory: HeygenEndpoint<'streamingListSessionHistory'>;

	knowledgeBasesCreate: HeygenEndpoint<'knowledgeBasesCreate'>;
	knowledgeBasesList: HeygenEndpoint<'knowledgeBasesList'>;
	knowledgeBasesUpdate: HeygenEndpoint<'knowledgeBasesUpdate'>;
	knowledgeBasesDelete: HeygenEndpoint<'knowledgeBasesDelete'>;

	assetsListTemplates: HeygenEndpoint<'assetsListTemplates'>;
	assetsGetTemplate: HeygenEndpoint<'assetsGetTemplate'>;
	assetsGetTemplateDetailsV3: HeygenEndpoint<'assetsGetTemplateDetailsV3'>;
	assetsUploadAsset: HeygenEndpoint<'assetsUploadAsset'>;
	assetsListAssets: HeygenEndpoint<'assetsListAssets'>;
	assetsListAssets2: HeygenEndpoint<'assetsListAssets2'>;
	assetsDeleteAsset: HeygenEndpoint<'assetsDeleteAsset'>;
	assetsCreateFolder: HeygenEndpoint<'assetsCreateFolder'>;
	assetsListFolders: HeygenEndpoint<'assetsListFolders'>;
	assetsUpdateFolder: HeygenEndpoint<'assetsUpdateFolder'>;
	assetsTrashFolder: HeygenEndpoint<'assetsTrashFolder'>;
	assetsRestoreFolder: HeygenEndpoint<'assetsRestoreFolder'>;

	webhooksQuotaAddEndpoint: HeygenEndpoint<'webhooksQuotaAddEndpoint'>;
	webhooksQuotaListEndpoints: HeygenEndpoint<'webhooksQuotaListEndpoints'>;
	webhooksQuotaListEventTypes: HeygenEndpoint<'webhooksQuotaListEventTypes'>;
	webhooksQuotaUpdateEndpoint: HeygenEndpoint<'webhooksQuotaUpdateEndpoint'>;
	webhooksQuotaDeleteEndpoint: HeygenEndpoint<'webhooksQuotaDeleteEndpoint'>;
	webhooksQuotaGetCurrentUser: HeygenEndpoint<'webhooksQuotaGetCurrentUser'>;
	webhooksQuotaRemainingQuota: HeygenEndpoint<'webhooksQuotaRemainingQuota'>;
};

const heygenEndpointsNested = {
	videos: {
		generate: Videos.generate,
		templateGenerate: Videos.templateGenerate,
		createWebm: Videos.createWebm,
		personalizedAddContact: Videos.personalizedAddContact,
		personalizedProjectDetail: Videos.personalizedProjectDetail,
		getStatus: Videos.getStatus,
		translate: Videos.translate,
		translateStatus: Videos.translateStatus,
		translateTargetLanguages: Videos.translateTargetLanguages,
		getSharableUrl: Videos.getSharableUrl,
		delete: Videos.deleteVideo,
		list: Videos.list,
	},
	avatars: {
		list: Avatars.list,
		getDetails: Avatars.getDetails,
		listGroups: Avatars.listGroups,
		listGroupAvatars: Avatars.listGroupAvatars,
		searchPublicGroups: Avatars.searchPublicGroups,
		createPhotoGroup: Avatars.createPhotoGroup,
		generatePhotos: Avatars.generatePhotos,
		addLooks: Avatars.addLooks,
		checkLookStatus: Avatars.checkLookStatus,
		getTrainingStatus: Avatars.getTrainingStatus,
		getPhotoDetails: Avatars.getPhotoDetails,
		deletePhotoGroup: Avatars.deletePhotoGroup,
		deletePhoto: Avatars.deletePhoto,
		addMotion: Avatars.addMotion,
		upscale: Avatars.upscale,
		listTalkingPhotos: Avatars.listTalkingPhotos,
		uploadTalkingPhoto: Avatars.uploadTalkingPhoto,
		deleteTalkingPhoto: Avatars.deleteTalkingPhoto,
	},
	voices: {
		generateSpeech: Voices.generateSpeech,
		generatePreview: Voices.generatePreview,
		listTts: Voices.listTts,
		listLocales: Voices.listLocales,
		listV2: Voices.listV2,
		listV1: Voices.listV1,
		listBrandVoices: Voices.listBrandVoices,
	},
	streaming: {
		newSession: Streaming.newSession,
		createToken: Streaming.createToken,
		start: Streaming.start,
		stop: Streaming.stop,
		interrupt: Streaming.interrupt,
		keepAlive: Streaming.keepAlive,
		task: Streaming.task,
		ice: Streaming.ice,
		new: Streaming.streamingNew,
		list: Streaming.list,
		listAvatars: Streaming.listAvatars,
		listSessionHistory: Streaming.listSessionHistory,
	},
	knowledgeBases: {
		create: KnowledgeBases.create,
		list: KnowledgeBases.list,
		update: KnowledgeBases.update,
		delete: KnowledgeBases.deleteKnowledgeBase,
	},
	assets: {
		listTemplates: Assets.listTemplates,
		getTemplate: Assets.getTemplate,
		getTemplateDetailsV3: Assets.getTemplateDetailsV3,
		uploadAsset: Assets.uploadAsset,
		listAssets: Assets.listAssets,
		listAssets2: Assets.listAssets2,
		deleteAsset: Assets.deleteAsset,
		createFolder: Assets.createFolder,
		listFolders: Assets.listFolders,
		updateFolder: Assets.updateFolder,
		trashFolder: Assets.trashFolder,
		restoreFolder: Assets.restoreFolder,
	},
	webhooksQuota: {
		addEndpoint: WebhooksQuota.addEndpoint,
		listEndpoints: WebhooksQuota.listEndpoints,
		listEventTypes: WebhooksQuota.listEventTypes,
		updateEndpoint: WebhooksQuota.updateEndpoint,
		deleteEndpoint: WebhooksQuota.deleteEndpoint,
		getCurrentUser: WebhooksQuota.getCurrentUser,
		remainingQuota: WebhooksQuota.remainingQuota,
	},
} as const;

export const heygenEndpointSchemas = {
	'videos.generate': {
		input: HeygenEndpointInputSchemas.videosGenerate,
		output: HeygenEndpointOutputSchemas.videosGenerate,
	},
	'videos.templateGenerate': {
		input: HeygenEndpointInputSchemas.videosTemplateGenerate,
		output: HeygenEndpointOutputSchemas.videosTemplateGenerate,
	},
	'videos.createWebm': {
		input: HeygenEndpointInputSchemas.videosCreateWebm,
		output: HeygenEndpointOutputSchemas.videosCreateWebm,
	},
	'videos.personalizedAddContact': {
		input: HeygenEndpointInputSchemas.videosPersonalizedAddContact,
		output: HeygenEndpointOutputSchemas.videosPersonalizedAddContact,
	},
	'videos.personalizedProjectDetail': {
		input: HeygenEndpointInputSchemas.videosPersonalizedProjectDetail,
		output: HeygenEndpointOutputSchemas.videosPersonalizedProjectDetail,
	},
	'videos.getStatus': {
		input: HeygenEndpointInputSchemas.videosGetStatus,
		output: HeygenEndpointOutputSchemas.videosGetStatus,
	},
	'videos.translate': {
		input: HeygenEndpointInputSchemas.videosTranslate,
		output: HeygenEndpointOutputSchemas.videosTranslate,
	},
	'videos.translateStatus': {
		input: HeygenEndpointInputSchemas.videosTranslateStatus,
		output: HeygenEndpointOutputSchemas.videosTranslateStatus,
	},
	'videos.translateTargetLanguages': {
		input: HeygenEndpointInputSchemas.videosTranslateTargetLanguages,
		output: HeygenEndpointOutputSchemas.videosTranslateTargetLanguages,
	},
	'videos.getSharableUrl': {
		input: HeygenEndpointInputSchemas.videosGetSharableUrl,
		output: HeygenEndpointOutputSchemas.videosGetSharableUrl,
	},
	'videos.delete': {
		input: HeygenEndpointInputSchemas.videosDelete,
		output: HeygenEndpointOutputSchemas.videosDelete,
	},
	'videos.list': {
		input: HeygenEndpointInputSchemas.videosList,
		output: HeygenEndpointOutputSchemas.videosList,
	},

	'avatars.list': {
		input: HeygenEndpointInputSchemas.avatarsList,
		output: HeygenEndpointOutputSchemas.avatarsList,
	},
	'avatars.getDetails': {
		input: HeygenEndpointInputSchemas.avatarsGetDetails,
		output: HeygenEndpointOutputSchemas.avatarsGetDetails,
	},
	'avatars.listGroups': {
		input: HeygenEndpointInputSchemas.avatarsListGroups,
		output: HeygenEndpointOutputSchemas.avatarsListGroups,
	},
	'avatars.listGroupAvatars': {
		input: HeygenEndpointInputSchemas.avatarsListGroupAvatars,
		output: HeygenEndpointOutputSchemas.avatarsListGroupAvatars,
	},
	'avatars.searchPublicGroups': {
		input: HeygenEndpointInputSchemas.avatarsSearchPublicGroups,
		output: HeygenEndpointOutputSchemas.avatarsSearchPublicGroups,
	},
	'avatars.createPhotoGroup': {
		input: HeygenEndpointInputSchemas.avatarsCreatePhotoGroup,
		output: HeygenEndpointOutputSchemas.avatarsCreatePhotoGroup,
	},
	'avatars.generatePhotos': {
		input: HeygenEndpointInputSchemas.avatarsGeneratePhotos,
		output: HeygenEndpointOutputSchemas.avatarsGeneratePhotos,
	},
	'avatars.addLooks': {
		input: HeygenEndpointInputSchemas.avatarsAddLooks,
		output: HeygenEndpointOutputSchemas.avatarsAddLooks,
	},
	'avatars.checkLookStatus': {
		input: HeygenEndpointInputSchemas.avatarsCheckLookStatus,
		output: HeygenEndpointOutputSchemas.avatarsCheckLookStatus,
	},
	'avatars.getTrainingStatus': {
		input: HeygenEndpointInputSchemas.avatarsGetTrainingStatus,
		output: HeygenEndpointOutputSchemas.avatarsGetTrainingStatus,
	},
	'avatars.getPhotoDetails': {
		input: HeygenEndpointInputSchemas.avatarsGetPhotoDetails,
		output: HeygenEndpointOutputSchemas.avatarsGetPhotoDetails,
	},
	'avatars.deletePhotoGroup': {
		input: HeygenEndpointInputSchemas.avatarsDeletePhotoGroup,
		output: HeygenEndpointOutputSchemas.avatarsDeletePhotoGroup,
	},
	'avatars.deletePhoto': {
		input: HeygenEndpointInputSchemas.avatarsDeletePhoto,
		output: HeygenEndpointOutputSchemas.avatarsDeletePhoto,
	},
	'avatars.addMotion': {
		input: HeygenEndpointInputSchemas.avatarsAddMotion,
		output: HeygenEndpointOutputSchemas.avatarsAddMotion,
	},
	'avatars.upscale': {
		input: HeygenEndpointInputSchemas.avatarsUpscale,
		output: HeygenEndpointOutputSchemas.avatarsUpscale,
	},
	'avatars.listTalkingPhotos': {
		input: HeygenEndpointInputSchemas.avatarsListTalkingPhotos,
		output: HeygenEndpointOutputSchemas.avatarsListTalkingPhotos,
	},
	'avatars.uploadTalkingPhoto': {
		input: HeygenEndpointInputSchemas.avatarsUploadTalkingPhoto,
		output: HeygenEndpointOutputSchemas.avatarsUploadTalkingPhoto,
	},
	'avatars.deleteTalkingPhoto': {
		input: HeygenEndpointInputSchemas.avatarsDeleteTalkingPhoto,
		output: HeygenEndpointOutputSchemas.avatarsDeleteTalkingPhoto,
	},

	'voices.generateSpeech': {
		input: HeygenEndpointInputSchemas.voicesGenerateSpeech,
		output: HeygenEndpointOutputSchemas.voicesGenerateSpeech,
	},
	'voices.generatePreview': {
		input: HeygenEndpointInputSchemas.voicesGeneratePreview,
		output: HeygenEndpointOutputSchemas.voicesGeneratePreview,
	},
	'voices.listTts': {
		input: HeygenEndpointInputSchemas.voicesListTts,
		output: HeygenEndpointOutputSchemas.voicesListTts,
	},
	'voices.listLocales': {
		input: HeygenEndpointInputSchemas.voicesListLocales,
		output: HeygenEndpointOutputSchemas.voicesListLocales,
	},
	'voices.listV2': {
		input: HeygenEndpointInputSchemas.voicesListV2,
		output: HeygenEndpointOutputSchemas.voicesListV2,
	},
	'voices.listV1': {
		input: HeygenEndpointInputSchemas.voicesListV1,
		output: HeygenEndpointOutputSchemas.voicesListV1,
	},
	'voices.listBrandVoices': {
		input: HeygenEndpointInputSchemas.voicesListBrandVoices,
		output: HeygenEndpointOutputSchemas.voicesListBrandVoices,
	},

	'streaming.newSession': {
		input: HeygenEndpointInputSchemas.streamingNewSession,
		output: HeygenEndpointOutputSchemas.streamingNewSession,
	},
	'streaming.createToken': {
		input: HeygenEndpointInputSchemas.streamingCreateToken,
		output: HeygenEndpointOutputSchemas.streamingCreateToken,
	},
	'streaming.start': {
		input: HeygenEndpointInputSchemas.streamingStart,
		output: HeygenEndpointOutputSchemas.streamingStart,
	},
	'streaming.stop': {
		input: HeygenEndpointInputSchemas.streamingStop,
		output: HeygenEndpointOutputSchemas.streamingStop,
	},
	'streaming.interrupt': {
		input: HeygenEndpointInputSchemas.streamingInterrupt,
		output: HeygenEndpointOutputSchemas.streamingInterrupt,
	},
	'streaming.keepAlive': {
		input: HeygenEndpointInputSchemas.streamingKeepAlive,
		output: HeygenEndpointOutputSchemas.streamingKeepAlive,
	},
	'streaming.task': {
		input: HeygenEndpointInputSchemas.streamingTask,
		output: HeygenEndpointOutputSchemas.streamingTask,
	},
	'streaming.ice': {
		input: HeygenEndpointInputSchemas.streamingIce,
		output: HeygenEndpointOutputSchemas.streamingIce,
	},
	'streaming.new': {
		input: HeygenEndpointInputSchemas.streamingNew,
		output: HeygenEndpointOutputSchemas.streamingNew,
	},
	'streaming.list': {
		input: HeygenEndpointInputSchemas.streamingList,
		output: HeygenEndpointOutputSchemas.streamingList,
	},
	'streaming.listAvatars': {
		input: HeygenEndpointInputSchemas.streamingListAvatars,
		output: HeygenEndpointOutputSchemas.streamingListAvatars,
	},
	'streaming.listSessionHistory': {
		input: HeygenEndpointInputSchemas.streamingListSessionHistory,
		output: HeygenEndpointOutputSchemas.streamingListSessionHistory,
	},

	'knowledgeBases.create': {
		input: HeygenEndpointInputSchemas.knowledgeBasesCreate,
		output: HeygenEndpointOutputSchemas.knowledgeBasesCreate,
	},
	'knowledgeBases.list': {
		input: HeygenEndpointInputSchemas.knowledgeBasesList,
		output: HeygenEndpointOutputSchemas.knowledgeBasesList,
	},
	'knowledgeBases.update': {
		input: HeygenEndpointInputSchemas.knowledgeBasesUpdate,
		output: HeygenEndpointOutputSchemas.knowledgeBasesUpdate,
	},
	'knowledgeBases.delete': {
		input: HeygenEndpointInputSchemas.knowledgeBasesDelete,
		output: HeygenEndpointOutputSchemas.knowledgeBasesDelete,
	},

	'assets.listTemplates': {
		input: HeygenEndpointInputSchemas.assetsListTemplates,
		output: HeygenEndpointOutputSchemas.assetsListTemplates,
	},
	'assets.getTemplate': {
		input: HeygenEndpointInputSchemas.assetsGetTemplate,
		output: HeygenEndpointOutputSchemas.assetsGetTemplate,
	},
	'assets.getTemplateDetailsV3': {
		input: HeygenEndpointInputSchemas.assetsGetTemplateDetailsV3,
		output: HeygenEndpointOutputSchemas.assetsGetTemplateDetailsV3,
	},
	'assets.uploadAsset': {
		input: HeygenEndpointInputSchemas.assetsUploadAsset,
		output: HeygenEndpointOutputSchemas.assetsUploadAsset,
	},
	'assets.listAssets': {
		input: HeygenEndpointInputSchemas.assetsListAssets,
		output: HeygenEndpointOutputSchemas.assetsListAssets,
	},
	'assets.listAssets2': {
		input: HeygenEndpointInputSchemas.assetsListAssets2,
		output: HeygenEndpointOutputSchemas.assetsListAssets2,
	},
	'assets.deleteAsset': {
		input: HeygenEndpointInputSchemas.assetsDeleteAsset,
		output: HeygenEndpointOutputSchemas.assetsDeleteAsset,
	},
	'assets.createFolder': {
		input: HeygenEndpointInputSchemas.assetsCreateFolder,
		output: HeygenEndpointOutputSchemas.assetsCreateFolder,
	},
	'assets.listFolders': {
		input: HeygenEndpointInputSchemas.assetsListFolders,
		output: HeygenEndpointOutputSchemas.assetsListFolders,
	},
	'assets.updateFolder': {
		input: HeygenEndpointInputSchemas.assetsUpdateFolder,
		output: HeygenEndpointOutputSchemas.assetsUpdateFolder,
	},
	'assets.trashFolder': {
		input: HeygenEndpointInputSchemas.assetsTrashFolder,
		output: HeygenEndpointOutputSchemas.assetsTrashFolder,
	},
	'assets.restoreFolder': {
		input: HeygenEndpointInputSchemas.assetsRestoreFolder,
		output: HeygenEndpointOutputSchemas.assetsRestoreFolder,
	},

	'webhooksQuota.addEndpoint': {
		input: HeygenEndpointInputSchemas.webhooksQuotaAddEndpoint,
		output: HeygenEndpointOutputSchemas.webhooksQuotaAddEndpoint,
	},
	'webhooksQuota.listEndpoints': {
		input: HeygenEndpointInputSchemas.webhooksQuotaListEndpoints,
		output: HeygenEndpointOutputSchemas.webhooksQuotaListEndpoints,
	},
	'webhooksQuota.listEventTypes': {
		input: HeygenEndpointInputSchemas.webhooksQuotaListEventTypes,
		output: HeygenEndpointOutputSchemas.webhooksQuotaListEventTypes,
	},
	'webhooksQuota.updateEndpoint': {
		input: HeygenEndpointInputSchemas.webhooksQuotaUpdateEndpoint,
		output: HeygenEndpointOutputSchemas.webhooksQuotaUpdateEndpoint,
	},
	'webhooksQuota.deleteEndpoint': {
		input: HeygenEndpointInputSchemas.webhooksQuotaDeleteEndpoint,
		output: HeygenEndpointOutputSchemas.webhooksQuotaDeleteEndpoint,
	},
	'webhooksQuota.getCurrentUser': {
		input: HeygenEndpointInputSchemas.webhooksQuotaGetCurrentUser,
		output: HeygenEndpointOutputSchemas.webhooksQuotaGetCurrentUser,
	},
	'webhooksQuota.remainingQuota': {
		input: HeygenEndpointInputSchemas.webhooksQuotaRemainingQuota,
		output: HeygenEndpointOutputSchemas.webhooksQuotaRemainingQuota,
	},
} satisfies RequiredPluginEndpointSchemas<typeof heygenEndpointsNested>;

const heygenEndpointMeta = {
	'videos.generate': {
		riskLevel: 'write',
		description: 'Generate a customized avatar video with voices and character configs',
	},
	'videos.templateGenerate': {
		riskLevel: 'write',
		description: 'Generate a customized video from a pre-existing template using variable definitions',
	},
	'videos.createWebm': {
		riskLevel: 'write',
		description: 'Create a WebM format video with transparent background featuring studio avatars',
	},
	'videos.personalizedAddContact': {
		riskLevel: 'write',
		description: 'Add recipient contacts (name/email) to a personalized video project',
	},
	'videos.personalizedProjectDetail': {
		riskLevel: 'read',
		description: 'Retrieve details, status, and metadata for a personalized video project',
	},
	'videos.getStatus': {
		riskLevel: 'read',
		description: 'Retrieve asynchronous video processing status and time-limited download URLs',
	},
	'videos.translate': {
		riskLevel: 'write',
		description: 'Translate video content or audio tracks across 77+ languages',
	},
	'videos.translateStatus': {
		riskLevel: 'read',
		description: 'Retrieve current progress/status of a video translation job',
	},
	'videos.translateTargetLanguages': {
		riskLevel: 'read',
		description: 'Retrieve the list of all supported target languages for video translation',
	},
	'videos.getSharableUrl': {
		riskLevel: 'write',
		description: 'Generate a public, shareable URL for a video without authentication requirements',
	},
	'videos.delete': {
		riskLevel: 'destructive',
		irreversible: true,
		description: 'Delete a generated or translated video by ID',
	},
	'videos.list': {
		riskLevel: 'read',
		description: 'Retrieve a paginated list of videos associated with the account',
	},

	'avatars.list': {
		riskLevel: 'read',
		description: 'Retrieve a list of available public and private avatars with pagination',
	},
	'avatars.getDetails': {
		riskLevel: 'read',
		description: 'Retrieve comprehensive details, display properties, and preview media for an avatar',
	},
	'avatars.listGroups': {
		riskLevel: 'read',
		description: 'Retrieve a list of all avatar groups in the account',
	},
	'avatars.listGroupAvatars': {
		riskLevel: 'read',
		description: 'Retrieve all avatars within a specific avatar group',
	},
	'avatars.searchPublicGroups': {
		riskLevel: 'read',
		description: 'Search public avatar groups with filters and pagination',
	},
	'avatars.createPhotoGroup': {
		riskLevel: 'write',
		description: 'Create an avatar group for AI-generated and user-uploaded photos',
	},
	'avatars.generatePhotos': {
		riskLevel: 'write',
		description: 'Generate AI avatar photos based on text prompts and attributes',
	},
	'avatars.addLooks': {
		riskLevel: 'write',
		description: 'Add up to 4 image look variations to an existing photo avatar group',
	},
	'avatars.checkLookStatus': {
		riskLevel: 'read',
		description: 'Monitor the generation status/progress of photo avatar looks',
	},
	'avatars.getTrainingStatus': {
		riskLevel: 'read',
		description: 'Monitor the training progress of a photo avatar training job',
	},
	'avatars.getPhotoDetails': {
		riskLevel: 'read',
		description: 'Retrieve comprehensive metadata and configuration for a photo avatar/look',
	},
	'avatars.deletePhotoGroup': {
		riskLevel: 'destructive',
		irreversible: true,
		description: 'Delete a photo avatar group by ID',
	},
	'avatars.deletePhoto': {
		riskLevel: 'destructive',
		irreversible: true,
		description: 'Delete a photo avatar by ID',
	},
	'avatars.addMotion': {
		riskLevel: 'write',
		description: 'Animate a still photo avatar into a moving lifelike motion avatar',
	},
	'avatars.upscale': {
		riskLevel: 'write',
		description: 'Enhance the resolution and quality of an existing motion avatar',
	},
	'avatars.listTalkingPhotos': {
		riskLevel: 'read',
		description: 'Retrieve a list of existing interactive talking photo projects',
	},
	'avatars.uploadTalkingPhoto': {
		riskLevel: 'write',
		description: 'Create an interactive talking photo from an uploaded JPEG/PNG binary image',
	},
	'avatars.deleteTalkingPhoto': {
		riskLevel: 'destructive',
		irreversible: true,
		description: 'Permanently delete a specific talking photo resource',
	},

	'voices.generateSpeech': {
		riskLevel: 'write',
		description: 'Generate a speech audio file from text input using the Starfish TTS model',
	},
	'voices.generatePreview': {
		riskLevel: 'write',
		description: 'Generate a short audio preview clip (Enterprise Beta)',
	},
	'voices.listTts': {
		riskLevel: 'read',
		description: 'Retrieve public and custom voices compatible with the Starfish model',
	},
	'voices.listLocales': {
		riskLevel: 'read',
		description: 'Retrieve available locales/dialects for multilingual voices',
	},
	'voices.listV2': {
		riskLevel: 'read',
		description: 'Retrieve a comprehensive list of available voice models and characteristics',
	},
	'voices.listV1': {
		riskLevel: 'read',
		description: 'Retrieve a metadata list of all available studio voices',
	},
	'voices.listBrandVoices': {
		riskLevel: 'read',
		description: 'Retrieve brand glossaries maintaining consistent terminology/pronunciation',
	},

	'streaming.newSession': {
		riskLevel: 'write',
		description: 'Initiate a streaming session with an Interactive Avatar to get a WebSocket URL, session ID, and token',
	},
	'streaming.createToken': {
		riskLevel: 'write',
		description: 'Generate a time-limited authentication token for streaming sessions',
	},
	'streaming.start': {
		riskLevel: 'write',
		description: 'Establish a WebRTC SDP offer connection for real-time video/audio streaming',
	},
	'streaming.stop': {
		riskLevel: 'write',
		description: 'Terminate an active WebRTC streaming session and free resources',
	},
	'streaming.interrupt': {
		riskLevel: 'write',
		description: "Abruptly interrupt an avatar's ongoing action/speech for instant control",
	},
	'streaming.keepAlive': {
		riskLevel: 'write',
		description: 'Reset the idle timeout counter for an active streaming session',
	},
	'streaming.task': {
		riskLevel: 'write',
		description: 'Send a real-time text speaking task to an active streaming avatar',
	},
	'streaming.ice': {
		riskLevel: 'write',
		description: 'Submit ICE candidate information for WebRTC peer-to-peer negotiation',
	},
	'streaming.new': {
		riskLevel: 'write',
		description: 'Initiate a streaming session with specified quality settings',
	},
	'streaming.list': {
		riskLevel: 'read',
		description: 'Retrieve a list of active or available streaming sessions',
	},
	'streaming.listAvatars': {
		riskLevel: 'read',
		description: 'Retrieve a list of public and custom interactive avatars available for streaming',
	},
	'streaming.listSessionHistory': {
		riskLevel: 'read',
		description: 'Retrieve a paginated history and metadata of past streaming sessions',
	},

	'knowledgeBases.create': {
		riskLevel: 'write',
		description: 'Create a knowledge base with a custom name, opening line, and prompt for interactive sessions',
	},
	'knowledgeBases.list': {
		riskLevel: 'read',
		description: 'Retrieve a list of all existing knowledge bases',
	},
	'knowledgeBases.update': {
		riskLevel: 'write',
		description: 'Modify the opening line, prompt, or name of an existing knowledge base',
	},
	'knowledgeBases.delete': {
		riskLevel: 'destructive',
		irreversible: true,
		description: 'Permanently remove a knowledge base by ID',
	},

	'assets.listTemplates': {
		riskLevel: 'read',
		description: 'Retrieve a list of pre-designed avatar templates',
	},
	'assets.getTemplate': {
		riskLevel: 'read',
		description: 'Retrieve structure, placeholders, and avatar settings of a specific template',
	},
	'assets.getTemplateDetailsV3': {
		riskLevel: 'read',
		description: 'Retrieve comprehensive details, variables, and scene mappings for AI Studio templates',
	},
	'assets.uploadAsset': {
		riskLevel: 'write',
		description: 'Upload an image, video, or audio file asset to the platform',
	},
	'assets.listAssets': {
		riskLevel: 'read',
		description: 'Retrieve a paginated list of assets with type/folder filtering',
	},
	'assets.listAssets2': {
		riskLevel: 'read',
		description: 'Retrieve a list of uploaded assets with cursor/page pagination',
	},
	'assets.deleteAsset': {
		riskLevel: 'destructive',
		irreversible: true,
		description: 'Permanently delete a specific media asset by ID',
	},
	'assets.createFolder': {
		riskLevel: 'write',
		description: 'Create a new folder to organize videos and assets',
	},
	'assets.listFolders': {
		riskLevel: 'read',
		description: 'Retrieve a paginated list of folders in the account',
	},
	'assets.updateFolder': {
		riskLevel: 'write',
		description: 'Rename an existing folder by ID',
	},
	'assets.trashFolder': {
		riskLevel: 'write',
		description: 'Soft-delete a folder by moving it to trash (recoverable via restoreFolder)',
	},
	'assets.restoreFolder': {
		riskLevel: 'write',
		description: 'Recover a previously trashed folder',
	},

	'webhooksQuota.addEndpoint': {
		riskLevel: 'write',
		description: 'Configure a new webhook URL to receive notifications for specified events',
	},
	'webhooksQuota.listEndpoints': {
		riskLevel: 'read',
		description: 'Retrieve a list of configured webhook endpoints and status',
	},
	'webhooksQuota.listEventTypes': {
		riskLevel: 'read',
		description: 'Retrieve a complete list of supported webhook event types',
	},
	'webhooksQuota.updateEndpoint': {
		riskLevel: 'write',
		description: 'Modify the URL or subscribed events of an existing webhook endpoint',
	},
	'webhooksQuota.deleteEndpoint': {
		riskLevel: 'destructive',
		irreversible: true,
		description: 'Permanently delete a webhook endpoint configuration',
	},
	'webhooksQuota.getCurrentUser': {
		riskLevel: 'read',
		description: 'Retrieve the authenticated user profile, quotas, and subscription details',
	},
	'webhooksQuota.remainingQuota': {
		riskLevel: 'read',
		description: 'Retrieve the current remaining API credit quota and available resources',
	},
} satisfies RequiredPluginEndpointMeta<typeof heygenEndpointsNested>;

const defaultAuthType: AuthTypes = 'api_key' as const;

export const heygenAuthConfig = {
	api_key: {
		account: ['tenant_external_id'] as const,
	},
} as const satisfies PluginAuthConfig;

export type BaseHeygenPlugin<T extends HeygenPluginOptions> = CorsairPlugin<
	'heygen',
	typeof HeygenSchema,
	typeof heygenEndpointsNested,
	{},
	T,
	typeof defaultAuthType,
	typeof heygenAuthConfig
>;

export type InternalHeygenPlugin = BaseHeygenPlugin<HeygenPluginOptions>;

export type ExternalHeygenPlugin<T extends HeygenPluginOptions> =
	BaseHeygenPlugin<T>;

// The assertion is safe: HeygenPluginOptions has no required fields (all are
// optional), so an empty object satisfies the constraint at runtime even
// though TypeScript cannot verify it without the assertion.
export function heygen<const T extends HeygenPluginOptions>(
	incomingOptions: HeygenPluginOptions & T = {} as HeygenPluginOptions & T,
): ExternalHeygenPlugin<T> {
	const options = {
		...incomingOptions,
		authType: incomingOptions.authType ?? defaultAuthType,
	};

	return {
		id: 'heygen',
		schema: HeygenSchema,
		options,
		hooks: options.hooks,
		endpoints: heygenEndpointsNested,
		webhooks: {},
		endpointMeta: heygenEndpointMeta,
		endpointSchemas: heygenEndpointSchemas,
		authConfig: heygenAuthConfig,
		pluginWebhookMatcher: () => false,
		errorHandlers: {
			...errorHandlers,
			...options.errorHandlers,
		},
		keyBuilder: async (ctx: HeygenKeyBuilderContext, source) => {
			if (source === 'endpoint' && options.key) {
				return options.key;
			}

			if (source === 'endpoint' && ctx.authType === 'api_key') {
				const key = await ctx.keys.get_api_key();

				if (!key) {
					throw new AuthMissingError('heygen', 'api_key');
				}

				return key;
			}

			throw new AuthMissingError('heygen', 'api_key');
		},
	} satisfies InternalHeygenPlugin;
}

export type { HeygenEndpointInputs, HeygenEndpointOutputs } from './endpoints/types';
