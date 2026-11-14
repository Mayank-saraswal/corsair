import {
	adminListAgentUsage,
	adminListTopics,
	adminListCreditGrants,
} from './admin';
import {
	cellsList,
	cellsCreate,
	cellsDelete,
	cellsGet,
	cellsUpdate,
	cellsGetChartImage,
	cellsGetOutput,
} from './cells';
import {
	collectionsList,
	collectionsCreate,
	collectionsGet,
	collectionsUpdate,
} from './collections';
import {
	dataConnectionsList,
	dataConnectionsCreate,
	dataConnectionsGet,
	dataConnectionsUpdate,
	dataConnectionsUpdateSchema,
} from './data-connections';
import { embeddingCreatePresignedUrl } from './embedding';
import {
	groupsList,
	groupsCreate,
	groupsDelete,
	groupsGet,
	groupsUpdate,
} from './groups';
import {
	guidesUpsertDraft,
	guidesDeleteDraft,
	guidesListDrafts,
	guidesPublish,
} from './guides';
import {
	projectsList,
	projectsCreate,
	projectsGet,
	projectsUpdate,
	projectsGetQueriedTables,
	projectsEditSharingCollections,
	projectsEditSharingGroups,
	projectsEditSharingUsers,
	projectsEditSharingOrgAndPublic,
	projectsBatchUpdateComputeProfile,
	projectsExport,
} from './projects';
import {
	projectRunsList,
	projectRunsRun,
	projectRunsCancel,
	projectRunsGetStatus,
	projectRunsGetChartImage,
} from './project-runs';
import { semanticUpdate, semanticIngest } from './semantic';
import {
	suggestionsList,
	suggestionsGet,
	suggestionsUpdate,
	suggestionsUpdateChange,
	suggestionsTriggerReview,
	suggestionsGetV2,
} from './suggestions';
import {
	threadsList,
	threadsCreate,
	threadsGet,
	threadsContinue,
	threadsGetMessages,
} from './threads';
import { usersList, usersDeactivate, usersMe } from './users';

export const Admin = {
	listAgentUsage: adminListAgentUsage,
	listTopics: adminListTopics,
	listCreditGrants: adminListCreditGrants,
} as const;

export const Cells = {
	list: cellsList,
	create: cellsCreate,
	delete: cellsDelete,
	get: cellsGet,
	update: cellsUpdate,
	getChartImage: cellsGetChartImage,
	getOutput: cellsGetOutput,
} as const;

export const Collections = {
	list: collectionsList,
	create: collectionsCreate,
	get: collectionsGet,
	update: collectionsUpdate,
} as const;

export const DataConnections = {
	list: dataConnectionsList,
	create: dataConnectionsCreate,
	get: dataConnectionsGet,
	update: dataConnectionsUpdate,
	updateSchema: dataConnectionsUpdateSchema,
} as const;

export const Embedding = {
	createPresignedUrl: embeddingCreatePresignedUrl,
} as const;

export const Groups = {
	list: groupsList,
	create: groupsCreate,
	delete: groupsDelete,
	get: groupsGet,
	update: groupsUpdate,
} as const;

export const Guides = {
	upsertDraft: guidesUpsertDraft,
	deleteDraft: guidesDeleteDraft,
	listDrafts: guidesListDrafts,
	publish: guidesPublish,
} as const;

export const Projects = {
	list: projectsList,
	create: projectsCreate,
	get: projectsGet,
	update: projectsUpdate,
	getQueriedTables: projectsGetQueriedTables,
	editSharingCollections: projectsEditSharingCollections,
	editSharingGroups: projectsEditSharingGroups,
	editSharingUsers: projectsEditSharingUsers,
	editSharingOrgAndPublic: projectsEditSharingOrgAndPublic,
	batchUpdateComputeProfile: projectsBatchUpdateComputeProfile,
	export: projectsExport,
} as const;

export const ProjectRuns = {
	list: projectRunsList,
	run: projectRunsRun,
	cancel: projectRunsCancel,
	getStatus: projectRunsGetStatus,
	getChartImage: projectRunsGetChartImage,
} as const;

export const Semantic = {
	update: semanticUpdate,
	ingest: semanticIngest,
} as const;

export const Suggestions = {
	list: suggestionsList,
	get: suggestionsGet,
	update: suggestionsUpdate,
	updateChange: suggestionsUpdateChange,
	triggerReview: suggestionsTriggerReview,
	getV2: suggestionsGetV2,
} as const;

export const Threads = {
	list: threadsList,
	create: threadsCreate,
	get: threadsGet,
	continue: threadsContinue,
	getMessages: threadsGetMessages,
} as const;

export const Users = {
	list: usersList,
	deactivate: usersDeactivate,
	me: usersMe,
} as const;

export * from './types';
