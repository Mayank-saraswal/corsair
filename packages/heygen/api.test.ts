import 'dotenv/config';
import { makeHeygenRequest } from './client';
import {
	HeygenEndpointInputSchemas,
	HeygenEndpointOutputSchemas,
} from './endpoints/types';
import type { HeygenEndpointInputs, HeygenEndpointOutputs } from './endpoints/types';

declare const describe: {
	(name: string, fn: () => void): void;
	skip(name: string, fn: () => void): void;
};
declare const it: (name: string, fn: () => void | Promise<void>) => void;

const TEST_API_KEY = process.env.HEYGEN_API_KEY;
const describeIfApiKey = TEST_API_KEY ? describe : describe.skip;

// Fixtures paired per endpoint: a valid input sample and a valid response-envelope
// sample (HeyGen's `{ error, data }` wrapper). Every fixture is round-tripped through
// both the input and output Zod schemas below.
const FIXTURES: {
	[K in keyof HeygenEndpointInputs]: {
		input: HeygenEndpointInputs[K];
		// output shape varies across all 72 test fixtures and is dynamically verified against each operation schema at runtime
		output: unknown;
	};
} = {
	videosGenerate: {
		input: {
			video_inputs: [
				{
					character: { type: 'avatar', avatar_id: 'avatar_123' },
					voice: { type: 'text', voice_id: 'voice_123', input_text: 'Hello' },
				},
			],
			title: 'My Title',
		},
		output: { error: null, data: { video_id: 'vid_123' } },
	},
	videosTemplateGenerate: {
		input: { template_id: 'tmpl_123', variables: { first_name: { name: 'first_name' } } },
		output: { error: null, data: { video_id: 'vid_123' } },
	},
	videosCreateWebm: {
		input: { avatar_id: 'avatar_123', input_text: 'Hello' },
		output: { error: null, data: { video_id: 'vid_123' } },
	},
	videosPersonalizedAddContact: {
		input: {
			project_id: 'proj_123',
			variables_list: [{ email: 'john@mail.com', first_name: 'John' }],
		},
		output: { error: null, data: {} },
	},
	videosPersonalizedProjectDetail: {
		input: { id: 'proj_123' },
		output: { error: null, data: { project_id: 'proj_123', status: 'active' } },
	},
	videosGetStatus: {
		input: { video_id: 'vid_123' },
		output: { error: null, data: { status: 'completed', video_url: 'https://x' } },
	},
	videosTranslate: {
		input: { video_url: 'https://x/video.mp4', output_language: 'English' },
		output: { error: null, data: { video_translate_id: 'trans_123' } },
	},
	videosTranslateStatus: {
		input: { video_translate_id: 'trans_123' },
		output: { error: null, data: { status: 'processing' } },
	},
	videosTranslateTargetLanguages: {
		input: {},
		output: { error: null, data: { languages: ['English', 'Spanish'] } },
	},
	videosGetSharableUrl: {
		input: { video_id: 'vid_123' },
		output: { error: null, data: { share_url: 'https://app.heygen.com/share/vid_123' } },
	},
	videosDelete: {
		input: { video_id: 'vid_123' },
		output: { error: null, data: {} },
	},
	videosList: {
		input: { limit: 10 },
		output: { error: null, data: { videos: [{ video_id: 'vid_123' }] } },
	},

	avatarsList: {
		input: {},
		output: { error: null, data: { avatars: [{ avatar_id: 'avatar_123' }] } },
	},
	avatarsGetDetails: {
		input: { avatar_id: 'avatar_123' },
		output: { error: null, data: { avatar_id: 'avatar_123' } },
	},
	avatarsListGroups: {
		input: {},
		output: { error: null, data: { avatar_group_list: [{ id: 'group_123' }] } },
	},
	avatarsListGroupAvatars: {
		input: { group_id: 'group_123' },
		output: { error: null, data: { avatar_list: [{ avatar_id: 'avatar_123' }] } },
	},
	avatarsSearchPublicGroups: {
		input: { keyword: 'business' },
		output: { error: null, data: { avatar_group_list: [{ id: 'group_123' }] } },
	},
	avatarsCreatePhotoGroup: {
		input: { name: 'My Group', image_key: 'image_key_123' },
		output: { error: null, data: { id: 'group_123', name: 'My Group' } },
	},
	avatarsGeneratePhotos: {
		input: {
			name: 'Alex',
			age: 'Young Adult',
			gender: 'Woman',
			ethnicity: 'White',
			orientation: 'square',
			pose: 'half_body',
			style: 'Realistic',
			appearance: 'Business casual',
		},
		output: { error: null, data: { generation_id: 'gen_123' } },
	},
	avatarsAddLooks: {
		input: { group_id: 'group_123', image_keys: ['image_key_1', 'image_key_2'] },
		output: { error: null, data: { generation_id: 'gen_123' } },
	},
	avatarsCheckLookStatus: {
		input: { generation_id: 'gen_123' },
		output: { error: null, data: { generation_id: 'gen_123', status: 'success' } },
	},
	avatarsGetTrainingStatus: {
		input: { group_id: 'group_123' },
		output: { error: null, data: { status: 'ready' } },
	},
	avatarsGetPhotoDetails: {
		input: { id: 'avatar_123' },
		output: { error: null, data: { id: 'avatar_123' } },
	},
	avatarsDeletePhotoGroup: {
		input: { group_id: 'group_123' },
		output: { error: null, data: {} },
	},
	avatarsDeletePhoto: {
		input: { id: 'avatar_123' },
		output: { error: null, data: {} },
	},
	avatarsAddMotion: {
		input: { id: 'avatar_123' },
		output: { error: null, data: { id: 'avatar_123' } },
	},
	avatarsUpscale: {
		input: { id: 'avatar_123' },
		output: { error: null, data: { id: 'avatar_123' } },
	},
	avatarsListTalkingPhotos: {
		input: {},
		output: { error: null, data: [{ talking_photo_id: 'tp_123' }] },
	},
	avatarsUploadTalkingPhoto: {
		input: { imageBase64: 'aGVsbG8=', contentType: 'image/jpeg' },
		output: { error: null, data: { talking_photo_id: 'tp_123' } },
	},
	avatarsDeleteTalkingPhoto: {
		input: { talking_photo_id: 'tp_123' },
		output: { error: null, data: {} },
	},

	voicesGenerateSpeech: {
		input: { text: 'Hello world', voice_id: 'voice_123' },
		output: { error: null, data: { audio_url: 'https://x/audio.mp3' } },
	},
	voicesGeneratePreview: {
		input: { voice_id: 'voice_123' },
		output: { error: null, data: { audio_url: 'https://x/preview.mp3' } },
	},
	voicesListTts: {
		input: {},
		output: { error: null, data: { voices: [{ voice_id: 'voice_123' }] } },
	},
	voicesListLocales: {
		input: {},
		output: { error: null, data: { locales: [{ locale: 'en-US' }] } },
	},
	voicesListV2: {
		input: {},
		output: { error: null, data: { voices: [{ voice_id: 'voice_123' }] } },
	},
	voicesListV1: {
		input: {},
		output: { error: null, data: { voices: [{ voice_id: 'voice_123' }] } },
	},
	voicesListBrandVoices: {
		input: {},
		output: { error: null, data: { brand_voices: [{ id: 'brand_123' }] } },
	},

	streamingNewSession: {
		input: { quality: 'medium', avatar_id: 'avatar_123' },
		output: { error: null, data: { session_id: 'session_123' } },
	},
	streamingCreateToken: {
		input: {},
		output: { error: null, data: { token: 'token_123' } },
	},
	streamingStart: {
		input: { session_id: 'session_123', sdp: { type: 'offer', sdp: 'v=0...' } },
		output: { error: null, data: {} },
	},
	streamingStop: {
		input: { session_id: 'session_123' },
		output: { error: null, data: {} },
	},
	streamingInterrupt: {
		input: { session_id: 'session_123' },
		output: { error: null, data: {} },
	},
	streamingKeepAlive: {
		input: { session_id: 'session_123' },
		output: { error: null, data: {} },
	},
	streamingTask: {
		input: { session_id: 'session_123', text: 'Hey there' },
		output: { error: null, data: { duration_ms: 1200 } },
	},
	streamingIce: {
		input: {
			session_id: 'session_123',
			candidate: { candidate: 'candidate:1', sdpMid: '0' },
		},
		output: { error: null, data: {} },
	},
	streamingNew: {
		input: { quality: 'medium' },
		output: { error: null, data: { session_id: 'session_123' } },
	},
	streamingList: {
		input: {},
		output: { error: null, data: { sessions: [{ session_id: 'session_123' }] } },
	},
	streamingListAvatars: {
		input: {},
		output: { error: null, data: [{ avatar_id: 'avatar_123' }] },
	},
	streamingListSessionHistory: {
		input: { page: 1 },
		output: { error: null, data: { sessions: [{ session_id: 'session_123' }] } },
	},

	knowledgeBasesCreate: {
		input: { name: 'Support Bot', opening: 'Hi!', prompt: 'Be helpful' },
		output: { error: null, data: { knowledge_base_id: 'kb_123' } },
	},
	knowledgeBasesList: {
		input: {},
		output: { error: null, data: { list: [{ id: 'kb_123' }] } },
	},
	knowledgeBasesUpdate: {
		input: { knowledge_base_id: 'kb_123', name: 'Updated Bot' },
		output: { error: null, data: {} },
	},
	knowledgeBasesDelete: {
		input: { knowledge_base_id: 'kb_123' },
		output: { error: null, data: {} },
	},

	assetsListTemplates: {
		input: {},
		output: { error: null, data: { templates: [{ template_id: 'tmpl_123' }] } },
	},
	assetsGetTemplate: {
		input: { template_id: 'tmpl_123' },
		output: { error: null, data: { template_id: 'tmpl_123' } },
	},
	assetsGetTemplateDetailsV3: {
		input: { template_id: 'tmpl_123' },
		output: { error: null, data: { template_id: 'tmpl_123' } },
	},
	assetsUploadAsset: {
		input: { fileBase64: 'aGVsbG8=', contentType: 'image/png' },
		output: { error: null, data: { id: 'asset_123', url: 'https://x/asset.png' } },
	},
	assetsListAssets: {
		input: { page: 1 },
		output: { error: null, data: { assets: [{ id: 'asset_123' }] } },
	},
	assetsListAssets2: {
		input: { cursor: 'cursor_123' },
		output: { error: null, data: { assets: [{ id: 'asset_123' }] } },
	},
	assetsDeleteAsset: {
		input: { asset_id: 'asset_123' },
		output: { error: null, data: {} },
	},
	assetsCreateFolder: {
		input: { name: 'My Folder' },
		output: { error: null, data: { folder_id: 'folder_123' } },
	},
	assetsListFolders: {
		input: { page: 1 },
		output: { error: null, data: { folders: [{ folder_id: 'folder_123' }] } },
	},
	assetsUpdateFolder: {
		input: { folder_id: 'folder_123', name: 'Renamed Folder' },
		output: { error: null, data: {} },
	},
	assetsTrashFolder: {
		input: { folder_id: 'folder_123' },
		output: { error: null, data: {} },
	},
	assetsRestoreFolder: {
		input: { folder_id: 'folder_123' },
		output: { error: null, data: {} },
	},

	webhooksQuotaAddEndpoint: {
		input: { url: 'https://example.com/webhook', events: ['avatar_video.success'] },
		output: { error: null, data: { endpoint_id: 'endpoint_123' } },
	},
	webhooksQuotaListEndpoints: {
		input: {},
		output: { error: null, data: [{ endpoint_id: 'endpoint_123' }] },
	},
	webhooksQuotaListEventTypes: {
		input: {},
		output: { error: null, data: [{ event: 'avatar_video.success' }] },
	},
	webhooksQuotaUpdateEndpoint: {
		input: { endpoint_id: 'endpoint_123', url: 'https://example.com/new-webhook' },
		output: { error: null, data: {} },
	},
	webhooksQuotaDeleteEndpoint: {
		input: { endpoint_id: 'endpoint_123' },
		output: { error: null, data: {} },
	},
	webhooksQuotaGetCurrentUser: {
		input: {},
		output: { error: null, data: { email: 'user@example.com' } },
	},
	webhooksQuotaRemainingQuota: {
		input: {},
		output: { error: null, data: { remaining_quota: 1000 } },
	},
};

describe('HeyGen endpoint schemas', () => {
	for (const key of Object.keys(FIXTURES) as (keyof HeygenEndpointInputs)[]) {
		it(`parses ${key} input and output`, () => {
			const fixture = FIXTURES[key];
			HeygenEndpointInputSchemas[key].parse(fixture.input);
			HeygenEndpointOutputSchemas[key].parse(fixture.output);
		});
	}
});

describeIfApiKey('HeyGen API live smoke tests', () => {
	it('lists avatars', async () => {
		const response = await makeHeygenRequest<HeygenEndpointOutputs['avatarsList']>(
			'/v1/avatar.list',
			TEST_API_KEY!,
			{ method: 'GET' },
		);

		HeygenEndpointOutputSchemas.avatarsList.parse(response);
	});

	it('lists v2 voices', async () => {
		const response = await makeHeygenRequest<HeygenEndpointOutputs['voicesListV2']>(
			'/v2/voices',
			TEST_API_KEY!,
			{ method: 'GET' },
		);

		HeygenEndpointOutputSchemas.voicesListV2.parse(response);
	});

	it('retrieves remaining quota', async () => {
		const response = await makeHeygenRequest<
			HeygenEndpointOutputs['webhooksQuotaRemainingQuota']
		>('/v2/user/remaining_quota', TEST_API_KEY!, { method: 'GET' });

		HeygenEndpointOutputSchemas.webhooksQuotaRemainingQuota.parse(response);
	});
});
