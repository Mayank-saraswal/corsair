import type { TeamworkJsonValue } from './operation-types';

type TeamworkV1Output_TeamPickerObject = TeamworkV1Output_TeamSingleObject & {
	isInPrivacy?: boolean;
	isResponsible?: boolean;
	isFollowingChanges?: boolean;
	isFollowingComments?: boolean;
	hasAccess?: boolean;
} & Record<string, TeamworkJsonValue>;
type TeamworkV1Output_TeamSingleObject = {
	createdByUserId?: string;
	name?: string;
	logoIcon?: string;
	deletedDate?: string;
	handle?: string;
	dateUpdated?: string;
	company?: { name?: string; id?: string } & Record<string, TeamworkJsonValue>;
	parentTeam?: { name?: string; handle?: string; id?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	rootTeam?: { name?: string; handle?: string; id?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	numMembers?: string;
	projectId?: string;
	logoUrl?: string;
	members?: Array<
		{ id?: string; name?: string } & Record<string, TeamworkJsonValue>
	>;
	logoColor?: string;
	numDirectChildren?: string;
	canEdit?: boolean;
	updatedByUserId?: string;
	isPrivate?: boolean;
	id?: string;
	dateCreated?: string;
	defaultProjectIds?: string;
	numSubteams?: string;
	deleted?: boolean;
} & Record<string, TeamworkJsonValue>;
type TeamworkV1Output_TeamsMultipleResponse = {
	STATUS?: string;
	teams?: Array<TeamworkV1Output_TeamSingleObject>;
	users?: Record<string, TeamworkJsonValue>;
	projects?: Record<string, TeamworkJsonValue>;
} & Record<string, TeamworkJsonValue>;
type TeamworkV1Output_TeamsPickerResponse = {
	STATUS?: string;
	included?: Array<TeamworkV1Output_TeamPickerObject>;
	teams?: Array<TeamworkV1Output_TeamPickerObject>;
	users?: Record<string, TeamworkJsonValue>;
	projects?: Record<string, TeamworkJsonValue>;
} & Record<string, TeamworkJsonValue>;
type TeamworkV1Output_TeamsSingleResponse = {
	STATUS?: string;
	team?: TeamworkV1Output_TeamSingleObject;
	users?: Record<string, TeamworkJsonValue>;
	projects?: Record<string, TeamworkJsonValue>;
} & Record<string, TeamworkJsonValue>;

export type TeamworkV1Inputs = {
	v1_get_projects_json: {
		path?: Record<string, never>;
		query?: {
			status?: 'all' | 'active' | 'archived' | 'current' | 'late' | 'completed';
			updatedAfterDate?: string;
			orderby?: 'companyName' | 'name' | 'lastActivityDate';
			createdAfterDate?: string;
			createdAfterTime?: string;
			catId?: number;
			includePeople?: boolean;
			includeProjectOwner?: boolean;
			page?: number;
			pageSize?: number;
			orderMode?: 'asc' | 'desc';
			onlyStarredProjects?: boolean;
			companyId?: string;
			projectOwnerIds?: string;
			searchTerm?: string;
			getDeleted?: boolean;
			includeTags?: boolean;
			userId?: string;
			updatedAfterDateTime?: string;
		};
		body?: never;
	};
	v1_post_projects_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: {
			project?: {
				name?: string;
				'use-tasks'?: boolean;
				'use-milestones'?: boolean;
				'use-messages'?: boolean;
				'use-files'?: boolean;
				'use-time'?: boolean;
				'use-notebook'?: boolean;
				'use-riskregister'?: boolean;
				'use-links'?: boolean;
				'use-billing'?: boolean;
				'use-comments'?: boolean;
				'category-id'?: number;
				'start-date'?: string;
				'end-date'?: string;
				tagIds?: string;
				onboarding?: boolean;
				'grant-access-to'?: string;
				private?: boolean;
				customFields?: Array<{ customFieldId?: number; value?: string }>;
				people?: number;
				projectOwnerId?: number;
				companyId?: number;
			};
		};
	};
	v1_get_projects_id_json: {
		path: { id: string };
		query?: {
			includePeople?: boolean;
			projectOwnerIds?: string;
			projectHealth?: string;
			includeProjectOwner?: boolean;
			userId?: string;
		};
		body?: never;
	};
	v1_put_projects_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			project?: {
				name?: string;
				'use-tasks'?: boolean;
				'use-milestones'?: boolean;
				'use-messages'?: boolean;
				'use-files'?: boolean;
				'use-time'?: boolean;
				'use-notebook'?: boolean;
				'use-riskregister'?: boolean;
				'use-links'?: boolean;
				'use-billing'?: boolean;
				'use-comments'?: boolean;
				'category-id'?: number;
				'start-date'?: string;
				'end-date'?: string;
				tagIds?: string;
				onboarding?: boolean;
				templateDateTargetDefault?: string;
				'grant-access-to'?: string;
				private?: boolean;
				customFields?: Array<{ customFieldId?: number; value?: string }>;
				people?: string;
				projectOwnerId?: string;
				companyId?: number;
			};
		};
	};
	v1_delete_projects_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_post_projects_id_clone_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			cloneProjectName?: string;
			cloneProjectAction?: 'COPY' | 'MOVE';
			companyId?: number;
			copyFiles?: boolean;
			copyMessages?: boolean;
			copyMilestones?: boolean;
			copyTasks?: boolean;
			copyTasklists?: boolean;
			copyNotebooks?: boolean;
			copyLinks?: boolean;
			copyComments?: boolean;
			copyFollowers?: boolean;
			copyInvoices?: boolean;
			copyTimelogs?: boolean;
			copyExpenses?: boolean;
			copyWebhooks?: boolean;
			copyProjectRoles?: boolean;
			copyCustomFields?: boolean;
			copyCustomItems?: boolean;
			copyProjectUpdates?: boolean;
			copyRisks?: boolean;
			copyForms?: boolean;
			copyAutomations?: boolean;
			copyPeople?: boolean;
			copyProjectPrivacy?: boolean;
			copyBudgets?: boolean;
			copyAllocations?: boolean;
			copyLogo?: boolean;
			copyProjectPrefs?: boolean;
			newFromTemplate?: boolean;
			toTemplate?: boolean;
			templateDateTarget?: 'start' | 'end';
			targetDate?: string;
			daysOffset?: number;
		};
	};
	v1_get_companies_id_projects_json: {
		path: { id: string };
		query?: { includePeople?: boolean };
		body?: never;
	};
	v1_get_projects_starred_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projects_id_rates_json: {
		path: { id: string };
		query?: { page?: number; pageSize?: number };
		body?: never;
	};
	v1_post_projects_id_rates_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			rates?: {
				users?: { '12345'?: { rate?: number }; '12346'?: { rate?: number } };
				'project-default'?: number;
			};
		};
	};
	v1_get_projects_id_stats_json: {
		path: { id: string };
		query?: {
			'responsible-party-ids'?: string;
			onlymyprojects?: boolean;
			forStarredProjects?: boolean;
			onlyMyEvents?: boolean;
			getPermissions?: boolean;
			eventsInNext?: number;
		};
		body?: never;
	};
	v1_put_projects_id_star_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projectcategories_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: never;
	};
	v1_post_projectcategories_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: { category?: { name?: string; 'parent-id'?: string } };
	};
	v1_get_projectcategories_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_projectcategories_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { category?: { name?: string; 'parent-id'?: string } };
	};
	v1_delete_projectcategories_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projectcategories_categoryid_tasks_json: {
		path: { categoryId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_projects_projectid_json: {
		path: { projectId: string };
		query?: Record<string, never>;
		body?: { project?: { projectOwnerId?: string } };
	};
	v1_get_milestones_json: {
		path?: Record<string, never>;
		query?: {
			pageSize?: number;
			page?: number;
			find?: string;
			getProgress?: boolean;
			projectType?: string;
		};
		body?: never;
	};
	v1_get_projects_id_milestones_json: {
		path: { id: string };
		query?: {
			pageSize?: number;
			page?: number;
			find?: string;
			getProgress?: boolean;
		};
		body?: never;
	};
	v1_post_projects_id_milestones_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			milestone?: {
				changeFollowerIds?: string;
				deadline?: string;
				notify?: boolean;
				'responsible-party-ids'?: string;
				tagIds?: string;
				reminder?: boolean;
				taskListIds?: Array<string>;
				'grant-access-to'?: string;
				private?: boolean;
			};
			'move-upcoming-milestones'?: boolean;
			'move-upcoming-milestones-off-weekends'?: boolean;
		};
	};
	v1_get_milestones_id_json: {
		path: { id: string };
		query?: { showTaskLists?: boolean; getProgress?: boolean };
		body?: never;
	};
	v1_put_milestones_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			milestone?: {
				changeFollowerIds?: string;
				deadline?: string;
				notify?: boolean;
				'responsible-party-ids'?: string;
				tagIds?: string;
				reminder?: boolean;
				taskListIds?: Array<string>;
				'grant-access-to'?: string;
				private?: boolean;
			};
			'move-upcoming-milestones'?: boolean;
			'move-upcoming-milestones-off-weekends'?: boolean;
		};
	};
	v1_delete_milestones_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_milestones_id_complete_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_milestones_id_uncomplete_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_tasklists_json: {
		path?: Record<string, never>;
		query?: {
			status?: 'all' | 'active' | 'completed';
			page?: string;
			pageSize?: string;
			showDeleted?: boolean;
			includeArchivedProjects?: boolean;
		};
		body?: never;
	};
	v1_get_projects_id_tasklists_json: {
		path: { id: string };
		query?: {
			'responsible-party-id'?: string;
			getOverdueCount?: boolean;
			status?: 'all' | 'active' | 'completed';
			showMilestones?: boolean;
			getCompletedCount?: boolean;
			filter?: string;
			updatedAfterDate?: string;
			sortby?:
				| 'name'
				| 'status'
				| 'duedateDESC'
				| 'dateCreatedASC'
				| 'dateCreatedDESC'
				| 'dateUpdatedASC'
				| 'dateUpdatedDESC'
				| 'projectNameASC'
				| 'projectNameDESC'
				| 'displayOrder';
			searchTerm?: string;
			projectStatus?: string;
			showCompleted?: boolean;
			showDeleted?: boolean;
		};
		body?: never;
	};
	v1_post_projects_id_tasklists_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			applyDefaultsToExistingTasks?: boolean;
			'todo-list'?: {
				'new-task-defaults'?: {
					'start-date-offset'?: string;
					'due-date-offset'?: string;
					'responsible-party-id'?: string;
					priority?: number;
					priorityText?: string;
					'estimated-minutes'?: number;
					tags?: Array<{
						id?: number;
						color?: string;
						name?: string;
						projectId?: number;
					}>;
					'column-id'?: number;
					reminders?: Array<{
						'user-id'?: number;
						type?: string;
						note?: string;
						'people-assigned'?: boolean;
						isRelative?: boolean;
						'relative-number-days'?: number;
						usingOffSetDueDate?: boolean;
						time?: string;
					}>;
					removeAllReminders?: boolean;
					'comment-follower-ids'?: string;
					'change-follower-ids'?: string;
					'grant-access-to'?: string;
					private?: boolean;
					customFields?: Array<{ customFieldId?: number; value?: string }>;
					pendingFileAttachments?: Array<Record<string, never>>;
				};
			};
		};
	};
	v1_get_tasklists_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_tasklists_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			applyDefaultsToExistingTasks?: boolean;
			'todo-list'?: {
				'new-task-defaults'?: {
					'start-date-offset'?: string;
					'due-date-offset'?: string;
					'responsible-party-id'?: string;
					priority?: number;
					priorityText?: string;
					'estimated-minutes'?: number;
					tags?: Array<{
						id?: number;
						color?: string;
						name?: string;
						projectId?: number;
					}>;
					'column-id'?: number;
					reminders?: Array<{
						'user-id'?: number;
						type?: string;
						note?: string;
						'people-assigned'?: boolean;
						isRelative?: boolean;
						'relative-number-days'?: number;
						usingOffSetDueDate?: boolean;
						time?: string;
					}>;
					removeAllReminders?: boolean;
					'comment-follower-ids'?: string;
					'change-follower-ids'?: string;
					'grant-access-to'?: string;
					private?: boolean;
					customFields?: Array<{ customFieldId?: number; value?: string }>;
					pendingFileAttachments?: Array<Record<string, never>>;
				};
			};
		};
	};
	v1_delete_tasklists_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_tasklists_templates_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_projects_id_tasklists_reorder_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { 'todo-lists'?: Array<{ 'todo-list'?: { id?: string } }> };
	};
	v1_put_tasklist_id_copy_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { projectId?: number; includeCompletedTasks?: number };
	};
	v1_put_tasklist_id_move_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { projectId: string };
	};
	v1_get_tasks_json: {
		path?: Record<string, never>;
		query?: {
			filter?: string;
			page?: number;
			pageSize?: number;
			startDate?: string;
			endDate?: string;
			updatedAfterDate?: string;
			completedAfterDate?: string;
			completedBeforeDate?: string;
			showDeleted?: string;
			includeCompletedTasks?: boolean;
			includeCompletedSubtasks?: boolean;
			'creator-ids'?: string;
			include?: string;
			'responsible-party-ids'?: string;
			sort?:
				| 'duedate'
				| 'duedateDESC'
				| 'startdate'
				| 'dateadded'
				| 'priority'
				| 'project'
				| 'manual'
				| 'duestartdate'
				| 'duestartdatedesc'
				| 'alldates'
				| 'alldatesdesc'
				| 'completedDateDESC'
				| 'flattenedtasklist'
				| 'company'
				| 'dateupdated';
			getSubTasks?: string;
			nestSubTasks?: string;
			getFiles?: boolean;
			includeToday?: boolean;
			'ignore-start-dates'?: boolean;
			'tag-ids'?: string;
			includeTasksWithoutDueDates?: boolean;
			includeTasksFromDeletedLists?: boolean;
			includeArchivedProjects?: boolean;
			dateupdatedASC?:
				| 'duedate'
				| 'duedateDESC'
				| 'startdate'
				| 'dateadded'
				| 'priority'
				| 'project'
				| 'manual'
				| 'duestartdate'
				| 'duestartdatedesc'
				| 'alldates'
				| 'alldatesdesc'
				| 'completedDateDESC'
				| 'flattenedtasklist'
				| 'company'
				| 'dateupdated';
			projectIds?: string;
			includeCompletedPredecessors?: boolean;
			includeLoggedTime?: boolean;
			includeReminders?: boolean;
			includeTaskId?: boolean;
			includeUntaggedTasks?: boolean;
		};
		body?: never;
	};
	v1_get_projects_id_tasks_json: {
		path: { id: string };
		query?: {
			filter?: string;
			page?: number;
			pageSize?: number;
			startDate?: string;
			endDate?: string;
			updatedAfterDate?: string;
			completedAfterDate?: string;
			completedBeforeDate?: string;
			showDeleted?: string;
			includeCompletedTasks?: boolean;
			includeCompletedSubtasks?: boolean;
			'creator-ids'?: string;
			include?: string;
			'responsible-party-ids'?: string;
			sort?:
				| 'duedate'
				| 'duedateDESC'
				| 'startdate'
				| 'dateadded'
				| 'priority'
				| 'project'
				| 'manual'
				| 'duestartdate'
				| 'duestartdatedesc'
				| 'alldates'
				| 'alldatesdesc'
				| 'completedDateDESC'
				| 'flattenedtasklist'
				| 'company'
				| 'dateupdated';
			getSubTasks?: string;
			nestSubTasks?: string;
			getFiles?: boolean;
			includeToday?: boolean;
			'ignore-start-dates'?: boolean;
			'tag-ids'?: string;
			dateupdatedASC?:
				| 'duedate'
				| 'duedateDESC'
				| 'startdate'
				| 'dateadded'
				| 'priority'
				| 'project'
				| 'manual'
				| 'duestartdate'
				| 'duestartdatedesc'
				| 'alldates'
				| 'alldatesdesc'
				| 'completedDateDESC'
				| 'flattenedtasklist'
				| 'company'
				| 'dateupdated';
		};
		body?: never;
	};
	v1_post_projects_id_tasks_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			'todo-item'?: {
				'use-defaults'?: boolean;
				completed?: boolean;
				content?: string;
				tasklistId?: number;
				'creator-id'?: number;
				notify?: boolean;
				'responsible-party-id'?: string;
				'start-date'?: string;
				'due-date'?: string;
				priority?: string;
				progress?: number;
				parentTaskId?: number;
				tagIds?: string;
				'everyone-must-do'?: boolean;
				predecessors?: Array<Record<string, never>>;
				reminders?: Array<Record<string, never>>;
				columnId?: number;
				commentFollowerIds?: string;
				changeFollowerIds?: string;
				'grant-access-to'?: string;
				private?: boolean;
				customFields?: Array<{ customFieldId?: number; value?: string }>;
				'estimated-minutes'?: number;
				pendingFileAttachments?: Array<Record<string, never>>;
				updateFiles?: boolean;
				attachments?: string;
				removeOtherFiles?: boolean;
				attachmentsCategoryIds?: string;
				pendingFileAttachmentsCategoryIds?: string;
				repeatOptions?: {
					selecteddays?: string;
					editRecurringOption?: string;
					repeatEndDate?: string;
					repeatsFreq?: string;
					monthlyRepeatType?: string;
				};
			};
		};
	};
	v1_get_tasklists_id_tasks_json: {
		path: { id: string };
		query?: {
			filter?: string;
			page?: number;
			pageSize?: number;
			startDate?: string;
			endDate?: string;
			updatedAfterDate?: string;
			completedAfterDate?: string;
			completedBeforeDate?: string;
			showDeleted?: string;
			includeCompletedTasks?: boolean;
			includeCompletedSubtasks?: boolean;
			'creator-ids'?: string;
			include?: string;
			'responsible-party-ids'?: string;
			sort?:
				| 'duedate'
				| 'duedateDESC'
				| 'startdate'
				| 'dateadded'
				| 'priority'
				| 'project'
				| 'manual'
				| 'duestartdate'
				| 'duestartdatedesc'
				| 'alldates'
				| 'alldatesdesc'
				| 'completedDateDESC'
				| 'flattenedtasklist'
				| 'company'
				| 'dateupdated';
			getSubTasks?: string;
			nestSubTasks?: string;
			getFiles?: boolean;
			includeToday?: boolean;
			'ignore-start-dates'?: boolean;
			'tag-ids'?: string;
			dateupdatedASC?:
				| 'duedate'
				| 'duedateDESC'
				| 'startdate'
				| 'dateadded'
				| 'priority'
				| 'project'
				| 'manual'
				| 'duestartdate'
				| 'duestartdatedesc'
				| 'alldates'
				| 'alldatesdesc'
				| 'completedDateDESC'
				| 'flattenedtasklist'
				| 'company'
				| 'dateupdated';
		};
		body?: never;
	};
	v1_post_tasklists_id_tasks_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			'todo-item'?: {
				'use-defaults'?: boolean;
				completed?: boolean;
				content?: string;
				tasklistId?: number;
				'creator-id'?: number;
				notify?: boolean;
				'responsible-party-id'?: string;
				'start-date'?: string;
				'due-date'?: string;
				priority?: string;
				progress?: number;
				parentTaskId?: number;
				tagIds?: string;
				'everyone-must-do'?: boolean;
				predecessors?: Array<{
					id?: number;
					name?: string;
					type?: string;
					status?: string;
					parentTaskId?: number;
				}>;
				reminders?: Array<{
					'user-id'?: number;
					'date-time-utc'?: string;
					type?: string;
					note?: string;
					'people-assigned'?: boolean;
					isRelative?: boolean;
					'relative-number-days'?: number;
					usingOffSetDueDate?: boolean;
				}>;
				columnId?: number;
				commentFollowerIds?: string;
				changeFollowerIds?: string;
				'grant-access-to'?: string;
				private?: boolean;
				customFields?: Array<{ customFieldId?: number; value?: string }>;
				'estimated-minutes'?: number;
				pendingFileAttachments?: Array<Record<string, never>>;
				updateFiles?: boolean;
				attachments?: string;
				removeOtherFiles?: boolean;
				attachmentsCategoryIds?: string;
				pendingFileAttachmentsCategoryIds?: string;
				repeatOptions?: {
					selecteddays?: string;
					repeatEndDate?: string;
					repeatsFreq?: string;
					monthlyRepeatType?: string;
				};
			};
		};
	};
	v1_get_tasks_id_json: {
		path: { id: string };
		query?: {
			getFiles?: boolean;
			nestSubTasks?: boolean;
			includeCompletedSubtasks?: boolean;
		};
		body?: never;
	};
	v1_post_tasks_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			'todo-item'?: {
				content: string;
				notify?: boolean;
				'due-date'?: string;
				'start-date'?: string;
				'estimated-minutes'?: string;
				private?: number;
				'grant-access-to'?: string;
				priority?: string;
				progress?: string;
				attachments?: Array<{ ''?: string }>;
				pendingFileAttachments?: string;
				'responsible-party-id'?: number;
				predecessors?: Array<{ id?: number; type?: string }>;
				tags?: string;
				commentFollowerIds?: string;
				changeFollowerIds?: string;
				positionAfterTask?: number;
				columnId?: string;
				parentTaskId?: string;
			};
		};
	};
	v1_get_tasks_id_dependencies_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_completedtasks_json: {
		path?: Record<string, never>;
		query?: {
			page?: number;
			pageSize?: number;
			startdate?: string;
			enddate?: string;
			includeArchivedProjects?: boolean;
		};
		body?: never;
	};
	v1_get_tasks_id_predecessors_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_tasks_parenttaskid_subtasks_json: {
		path: { parentTaskId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_tasks_taskid_recurring_json: {
		path: { taskId: string };
		query?: { onlyFutureDates?: boolean };
		body?: never;
	};
	v1_post_tasks_id_quickadd_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			content?: string;
			tasklistId?: number;
			'creator-id'?: number;
			notify?: boolean;
			private?: boolean;
			'todo-item'?: {
				'responsible-party-id'?: string;
				'start-date'?: string;
				'due-date'?: string;
				priority?: string;
			};
		};
	};
	v1_post_projects_projectid_tasks_quickadd_json: {
		path: { projectId: string };
		query?: Record<string, never>;
		body?: {
			content: string;
			tasklistId?: number;
			'creator-id'?: number;
			notify?: boolean;
			private?: boolean;
			'todo-item'?: {
				'responsible-party-id'?: string;
				'start-date'?: string;
				'due-date'?: string;
				priority?: string;
			};
		};
	};
	v1_put_tasks_id_complete_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_tasks_id_uncomplete_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_tasklists_id_tasks_reorder_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { 'todo-items'?: Array<{ 'todo-item'?: { id?: string } }> };
	};
	v1_put_tasks_taskid_move_json: {
		path: { taskId: string };
		query?: Record<string, never>;
		body?: { taskId?: number; projectId?: number; tasklistId?: number };
	};
	v1_put_tasks_taskid_copy_json: {
		path: { taskId: string };
		query?: Record<string, never>;
		body?: { taskId?: number; projectId?: number; tasklistId?: number };
	};
	v1_get_tasks_id_reminders_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_post_tasks_id_reminders_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			reminder?: {
				note: string;
				'date-time-utc': string;
				'user-id': string;
				type?: string;
			};
		};
	};
	v1_put_taskreminders_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			reminder?: {
				note?: string;
				'date-time-utc'?: string;
				'user-id'?: string;
				type?: string;
			};
		};
	};
	v1_delete_taskreminders_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_companies_json: {
		path?: Record<string, never>;
		query?: { page?: number; pageSize?: number };
		body?: never;
	};
	v1_post_companies_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: {
			company: {
				name: string;
				address_one?: string;
				address_two?: string;
				zip?: string;
				city?: string;
				state?: string;
				countrycode?: string;
				phone?: string;
				fax?: string;
				email_one?: string;
				email_two?: string;
				email_three?: string;
				website?: string;
			};
		};
	};
	v1_get_projects_id_companies_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_companies_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_companies_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			company?: {
				name?: string;
				address_one?: string;
				address_two?: string;
				city?: string;
				state?: string;
				countrycode?: string;
				zip?: string;
				email_one?: string;
				email_two?: string;
				email_three?: string;
				website?: string;
				cid?: string;
				fax?: string;
				phone?: string;
				industryCatId?: string;
				tagIds?: string;
				logoPendingFileRef?: string;
				removeLogo?: boolean;
				profile?: string;
				privateNotes?: string;
			};
		};
	};
	v1_delete_companies_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_people_json: {
		path?: Record<string, never>;
		query?: {
			projectId?: number;
			page?: number;
			pageSize?: number;
			groupByCompany?: boolean;
			sort?:
				| 'company'
				| 'logincount'
				| 'lastlogin'
				| 'projectlastactive'
				| 'firstName'
				| 'lastName'
				| 'title'
				| 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			fullprofile?: boolean;
			onlyids?: boolean;
			getProjectRoles?: boolean;
			userIds?: string;
			includeTags?: boolean;
			projectCompanyId?: number;
			countOnly?: boolean;
			includeCompanyDetails?: boolean;
			getCounts?: boolean;
			includeObservers?: boolean;
			getWorkingHours?: string;
			updatedAfterDate?: string;
		};
		body?: never;
	};
	v1_post_people_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: {
			person?: {
				startPage?: string;
				'email-address'?: string;
				'first-name'?: string;
				'last-name'?: string;
				'company-id'?: number;
				sendInvite?: boolean;
				'phone-number-office'?: string;
				'phone-number-office-ext'?: string;
				'phone-number-mobile-countrycode'?: string;
				'phone-number-mobile-prefix'?: string;
				'phone-number-mobile'?: string;
				'phone-number-home'?: string;
				'phone-number-fax'?: string;
				'email-alt-1'?: string;
				'email-alt-2'?: string;
				'email-alt-3'?: string;
				address?: {
					line1?: string;
					line2?: string;
					city?: string;
					state?: string;
					zipcode?: string;
					countrycode?: string;
				};
				profile?: string;
				userTwitterName?: string;
				userLinkedin?: string;
				userFacebook?: string;
				userWebsite?: string;
				'im-service'?: string;
				'im-handle'?: string;
				language?: string;
				dateFormatId?: number;
				timeFormatId?: number;
				timezoneId?: number;
				calendarStartsOnSunday?: string;
				lengthOfDay?: number;
				workingHours?: {
					entries?: Array<{ weekday?: string; taskHours?: number }>;
				};
				changeForEveryone?: boolean;
				administrator?: boolean;
				canAddProjects?: boolean;
				canManagePeople?: boolean;
				autoGiveProjectAccess?: boolean;
				canAccessCalendar?: boolean;
				canAccessTemplates?: boolean;
				canAccessPortfolio?: boolean;
				canManageCustomFields?: boolean;
				canManagePortfolio?: boolean;
				canManageProjectTemplates?: boolean;
				canViewProjectTemplates?: boolean;
				notifyOnTaskComplete?: boolean;
				'notify-on-added-as-follower'?: boolean;
				'notify-on-status-update'?: boolean;
				textFormat?: string;
				useShorthandDurations?: boolean;
				userReceiveNotifyWarnings?: boolean;
				userReceiveMyNotificationsOnly?: boolean;
				receiveDailyReports?: boolean;
				receiveDailyReportsAtWeekend?: boolean;
				receiveDailyReportsIfEmpty?: boolean;
				soundAlertsEnabled?: boolean;
				dailyReportSort?: string;
				receiveDailyReportsAtTime?: string;
				dailyReportEventsType?: string;
				dailyReportDaysFilter?: number;
				avatarPendingFileRef?: string;
				removeAvatar?: boolean;
				allowEmailNotifications?: boolean;
				'user-type'?: string;
				privateNotes?: string;
				getUserDetails?: boolean;
			};
		};
	};
	v1_get_calendarevents_eventid_availablepeople_json: {
		path: { eventId: string };
		query: { privacy: string };
		body?: never;
	};
	v1_get_projects_projectid_messages_availablepeople_json: {
		path: { projectId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projects_projectid_milestones_availablepeople_json: {
		path: { projectId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projects_projectid_notebooks_availablepeople_json: {
		path: { projectId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projects_projectid_tasks_availablepeople_json: {
		path: { projectId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projects_projectid_files_availablepeople_json: {
		path: { projectId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projects_projectid_links_availablepeople_json: {
		path: { projectId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projects_projectid_people_json: {
		path: { projectId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_companies_id_people_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_me_json: {
		path?: Record<string, never>;
		query?: {
			getPreferences?: boolean;
			fullProfile?: boolean;
			getDefaultFilters?: boolean;
			sharedFilter?: boolean;
			getAccounts?: boolean;
			includeAuth?: boolean;
			cleanPreferences?: boolean;
			includeClockIn?: boolean;
			includeTeamIds?: boolean;
			includeCompanyTimesheetsPermissions?: boolean;
			getNumActiveProjects?: boolean;
		};
		body?: never;
	};
	v1_get_stats_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_people_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_people_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			person?: {
				startPage?: string;
				'email-address'?: string;
				'first-name'?: string;
				'last-name'?: string;
				'company-id'?: number;
				sendInvite?: boolean;
				'phone-number-office'?: string;
				'phone-number-office-ext'?: string;
				'phone-number-mobile-countrycode'?: string;
				'phone-number-mobile-prefix'?: string;
				'phone-number-mobile'?: string;
				'phone-number-home'?: string;
				'phone-number-fax'?: string;
				'email-alt-1'?: string;
				'email-alt-2'?: string;
				'email-alt-3'?: string;
				address?: {
					line1?: string;
					line2?: string;
					city?: string;
					state?: string;
					zipcode?: string;
					countrycode?: string;
				};
				profile?: string;
				userTwitterName?: string;
				userLinkedin?: string;
				userFacebook?: string;
				userWebsite?: string;
				'im-service'?: string;
				'im-handle'?: string;
				language?: string;
				dateFormatId?: number;
				timeFormatId?: number;
				timezoneId?: number;
				calendarStartsOnSunday?: string;
				lengthOfDay?: number;
				workingHours?: {
					entries?: Array<{ weekday?: string; taskHours?: number }>;
				};
				changeForEveryone?: boolean;
				administrator?: boolean;
				canAddProjects?: boolean;
				canManagePeople?: boolean;
				autoGiveProjectAccess?: boolean;
				canAccessCalendar?: boolean;
				canAccessTemplates?: boolean;
				canAccessPortfolio?: boolean;
				canManageCustomFields?: boolean;
				canManagePortfolio?: boolean;
				canManageProjectTemplates?: boolean;
				canViewProjectTemplates?: boolean;
				notifyOnTaskComplete?: boolean;
				'notify-on-added-as-follower'?: boolean;
				'notify-on-status-update'?: boolean;
				textFormat?: string;
				useShorthandDurations?: boolean;
				userReceiveNotifyWarnings?: boolean;
				userReceiveMyNotificationsOnly?: boolean;
				receiveDailyReports?: boolean;
				receiveDailyReportsAtWeekend?: boolean;
				receiveDailyReportsIfEmpty?: boolean;
				soundAlertsEnabled?: boolean;
				dailyReportSort?: string;
				receiveDailyReportsAtTime?: string;
				dailyReportEventsType?: string;
				dailyReportDaysFilter?: number;
				avatarPendingFileRef?: string;
				removeAvatar?: boolean;
				allowEmailNotifications?: boolean;
				'user-type'?: string;
				privateNotes?: string;
				getUserDetails?: boolean;
			};
		};
	};
	v1_delete_people_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_people_apikeys_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_people_deleted_json: {
		path?: Record<string, never>;
		query?: { groupByCompany?: boolean };
		body?: never;
	};
	v1_get_statuses_json: {
		path?: Record<string, never>;
		query?: { includeClockin?: boolean };
		body?: never;
	};
	v1_get_people_id_status_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_post_people_id_status_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			userStatus?: {
				status?: string;
				notify?: boolean;
				notifyIds?: Array<Record<string, never>>;
			};
		};
	};
	v1_get_me_status_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_me_status_id_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: {
			userStatus?: {
				status?: string;
				notify?: boolean;
				notifyIds?: Array<Record<string, never>>;
			};
		};
	};
	v1_put_people_personid_status_statusid_json: {
		path: { personId: string; statusId: string };
		query?: Record<string, never>;
		body?: { userstatus?: { status?: string; notify?: string } };
	};
	v1_delete_people_personid_status_statusid_json: {
		path: { personId: string; statusId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_people_status_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { userstatus?: { status?: string; notify?: string } };
	};
	v1_delete_people_status_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_delete_me_status_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_tasks_id_files_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_post_tasks_id_files_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			task?: {
				pendingFileAttachments?: Array<string>;
				updateFiles?: boolean;
				removeOtherFiles?: boolean;
				attachments?: string;
				attachmentsCategoryIds?: string;
				pendingFileAttachmentsCategoryIds?: string;
			};
		};
	};
	v1_get_projects_id_files_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_post_projects_id_files_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			file?: {
				name?: string;
				private?: number;
				'category-id'?: number;
				'category-name'?: string;
				pendingFileRef?: string;
				tags?: Array<string>;
				notify?: string;
				notifyCurrentUser?: boolean;
				autoNewVersion?: boolean;
				'grant-access-to'?: string;
				tagIds?: Array<number>;
			};
		};
	};
	v1_post_files_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { fileversion?: { pendingFileRef?: string } };
	};
	v1_delete_files_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_files_id_sharedlink_json: {
		path: { id: string };
		query?: { version?: string };
		body?: never;
	};
	v1_put_files_id_copy_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { projectId?: number };
	};
	v1_get_projects_id_filecategories_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_post_projects_id_filecategories_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { category?: { name?: string; 'parent-id'?: string } };
	};
	v1_get_filecategories_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_filecategories_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { category?: { name?: string; 'parent-id'?: string } };
	};
	v1_delete_filecategories_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_notebooks_json: {
		path?: Record<string, never>;
		query?: { includeContent?: boolean };
		body?: never;
	};
	v1_get_projects_id_notebooks_json: {
		path: { id: string };
		query?: { includeContent?: boolean };
		body?: never;
	};
	v1_post_projects_id_notebooks_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			notebook?: {
				name?: string;
				content?: string;
				'category-id'?: number;
				locked?: boolean;
				'notebook-type'?: string;
				notify?: string;
				'notify-current-user'?: boolean;
				secureContent?: boolean;
				'grant-access-to'?: string;
				private?: number;
				tagIds?: string;
			};
		};
	};
	v1_get_notebookcategories_id_notebooks_json: {
		path: { id: string };
		query?: { includeContent?: boolean };
		body?: never;
	};
	v1_get_notebooks_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_notebooks_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			notebook?: {
				name?: string;
				content?: string;
				'category-id'?: number;
				locked?: boolean;
				'notebook-type'?: string;
				notify?: string;
				'notify-current-user'?: boolean;
				secureContent?: boolean;
				'grant-access-to'?: string;
				private?: number;
				tagIds?: string;
				'new-version'?: boolean;
			};
		};
	};
	v1_delete_notebooks_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_notebooks_id_lock_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_notebooks_id_unlock_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_notebooks_id_copy_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { projectId?: number };
	};
	v1_put_notebooks_id_move_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { projectId?: number };
	};
	v1_get_projects_id_notebookcategories_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_post_projects_id_notebookcategories_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { category?: { name?: string; 'parent-id'?: string } };
	};
	v1_get_notebookcategories_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_notebookcategories_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { category?: { name?: string; 'parent-id'?: string } };
	};
	v1_delete_notebookcategories_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projects_id_links_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_post_projects_id_links_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			link?: {
				notify?: string;
				'notify-current-user'?: boolean;
				code?: string;
				'category-id'?: number;
				width?: string;
				height?: string;
				name?: string;
				tagIds?: string;
				'grant-access-to'?: string;
				private?: boolean;
			};
		};
	};
	v1_get_links_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_links_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_links_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			link?: {
				notify?: string;
				'notify-current-user'?: boolean;
				code?: string;
				'category-id'?: number;
				width?: string;
				height?: string;
				name?: string;
				tagIds?: string;
				'grant-access-to'?: string;
				private?: boolean;
			};
		};
	};
	v1_delete_links_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projects_id_linkcategories_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_post_projects_id_linkcategories_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { category?: { name?: string; 'parent-id'?: string } };
	};
	v1_get_linkcategories_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_delete_linkcategories_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_time_entries_json: {
		path?: Record<string, never>;
		query?: {
			fromdate?: string;
			fromtime?: string;
			todate?: string;
			totime?: string;
			sortby?: string;
			sortorder?: 'asc' | 'desc';
			userId?: number;
			billableType?: string;
			invoicedType?: string;
			projectType?: string;
			showDeleted?: string;
			tagIds?: string;
			updatedAfterDate?: string;
			page?: number;
			pageSize?: number;
			taskTagIds?: string;
		};
		body?: never;
	};
	v1_get_projects_id_time_entries_json: {
		path: { id: string };
		query?: {
			page?: number;
			fromdate?: string;
			fromtime?: string;
			todate?: string;
			totime?: string;
			sortby?: string;
			sortorder?: 'asc' | 'desc';
			userId?: number;
			billableType?: string;
			invoicedType?: string;
			projectType?: string;
			showDeleted?: string;
			tagIds?: string;
			updatedAfterDate?: string;
			pageSize?: number;
			taskTagIds?: string;
		};
		body?: never;
	};
	v1_post_projects_id_time_entries_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			'time-entry'?: {
				'person-id'?: number;
				date: string;
				time: string;
				hours: number;
				minutes: number;
				isbillable?: boolean;
				tags?: string;
			};
		};
	};
	v1_get_tasks_id_time_entries_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_post_tasks_id_time_entries_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			'time-entry'?: {
				'person-id'?: number;
				date: string;
				time: string;
				hours: number;
				minutes: number;
				isbillable?: boolean;
				tags?: string;
			};
		};
	};
	v1_get_time_entries_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_time_entries_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			'time-entry'?: {
				'person-id'?: string;
				date: string;
				time: string;
				hours: string;
				minutes: string;
				isbillable?: string;
				tags?: string;
			};
		};
	};
	v1_delete_time_entries_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projects_id_time_total_json: {
		path: { id: string };
		query?: {
			fromDate?: string;
			fromTime?: string;
			toDate?: string;
			toTime?: string;
			userId?: number;
			projectType?: string;
			page?: number;
			pageSize?: number;
		};
		body?: never;
	};
	v1_get_time_total_json: {
		path?: Record<string, never>;
		query?: {
			fromDate?: string;
			fromTime?: string;
			toDate?: string;
			toTime?: string;
			userId?: number;
			projectType?: string;
		};
		body?: never;
	};
	v1_get_projects_time_total_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projects_estimatedtime_total_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_tasklists_id_time_total_json: {
		path: { id: string };
		query?: {
			fromDate?: string;
			fromTime?: string;
			toDate?: string;
			toTime?: string;
			userId?: number;
			projectType?: string;
		};
		body?: never;
	};
	v1_get_tasks_id_time_total_json: {
		path: { id: string };
		query?: {
			fromDate?: string;
			fromTime?: string;
			toDate?: string;
			toTime?: string;
			userId?: number;
			projectType?: string;
		};
		body?: never;
	};
	v1_get_people_id_loggedtime_json: {
		path: { id: string };
		query?: { m?: string; y?: string; page?: number; pageSize?: number };
		body?: never;
	};
	v1_get_timers_json: {
		path?: Record<string, never>;
		query?: {
			projectId?: string;
			taskId?: string;
			runningTimersOnly?: boolean;
		};
		body?: never;
	};
	v1_get_me_timers_json: {
		path?: Record<string, never>;
		query?: {
			projectId?: string;
			taskId?: string;
			runningTimersOnly?: boolean;
		};
		body?: never;
	};
	v1_get_people_id_timers_json: {
		path: { id: string };
		query?: {
			projectId?: string;
			taskId?: string;
			runningTimersOnly?: boolean;
		};
		body?: never;
	};
	v1_put_tasks_id_estimatedtime_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { taskId?: number; taskEstimatedMinutes?: number };
	};
	v1_delete_comments_id_json: {
		path: { id: number };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_comments_id_json: {
		path: { id: number };
		query?: Record<string, never>;
		body?: {
			comment: {
				body: string;
				notify?: string;
				isprivate?: boolean;
				pendingFileAttachments?: string;
				'content-type'?: string;
			};
		};
	};
	v1_get_resource_resourceid_comments_json: {
		path: { resource: string; resourceId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_post_resource_resourceid_comments_json: {
		path: { resource: string; resourceId: string };
		query?: Record<string, never>;
		body?: {
			comment?: {
				body?: string;
				notify?: string;
				isprivate?: boolean;
				pendingFileAttachments?: string;
				'content-type'?: string;
			};
		};
	};
	v1_get_comments_json: {
		path?: Record<string, never>;
		query?: {
			page?: number;
			pageSize?: number;
			objectType?: string;
			userId?: string;
			orderBy?: string;
			sortOrder?: 'asc' | 'desc';
			updatedAfterDate?: string;
			getLikes?: boolean;
			getReactions?: boolean;
			projectStatuses?: string;
			projectCompanyIds?: number;
			projectCategoryIds?: number;
			projectOwnerIds?: number;
			onlyStarredProjects?: boolean;
			includeArchivedProjects?: boolean;
		};
		body?: never;
	};
	v1_put_comments_id_markread_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projects_id_boards_columns_json: {
		path: { id: number };
		query?: {
			page?: number;
			pageSize?: number;
			showDeleted?: boolean;
			sortBy?: string;
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			getEmoji?: boolean;
			includeDefaults?: boolean;
			get?: string;
			updatedAfterDate?: string;
			getStats?: boolean;
		};
		body?: never;
	};
	v1_post_projects_id_boards_columns_json: {
		path: { id: number };
		query?: Record<string, never>;
		body?: { column?: { name?: string; color?: string } };
	};
	v1_get_boards_columns_id_cards_json: {
		path: { id: string };
		query?: {
			page?: number;
			pageSize?: number;
			showDeleted?: boolean;
			deletedAfterDate?: string;
			updatedAfterDate?: string;
			searchTerm?: string;
		};
		body?: never;
	};
	v1_put_boards_columns_cards_id_move_json: {
		path: { id: number };
		query?: Record<string, never>;
		body?: { cardId?: number; positionAfterId?: number; columnId?: number };
	};
	v1_put_boards_columns_cards_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			card?: {
				content?: string;
				taskListId?: string;
				'start-date'?: string;
				'due-date'?: string;
				'responsible-party-id'?: string;
				'estimated-minutes'?: number;
				priority?: string;
				progress?: string;
				tags?: string;
			};
		};
	};
	v1_delete_boards_columns_cards_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_boards_columns_cards_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_delete_boards_columns_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_boards_columns_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { column?: { name?: string; color?: string } };
	};
	v1_get_boards_columns_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_portfolio_boards_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: never;
	};
	v1_post_portfolio_boards_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: { board?: { name?: string; color?: string } };
	};
	v1_put_portfolio_boards_boardid_json: {
		path: { boardId: string };
		query?: Record<string, never>;
		body?: { board?: { name?: string; color?: string } };
	};
	v1_delete_portfolio_boards_boardid_json: {
		path: { boardId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_portfolio_boards_boardid_columns_json: {
		path: { boardId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_post_portfolio_boards_boardid_columns_json: {
		path: { boardId: string };
		query?: Record<string, never>;
		body?: { column?: { color?: string; name?: string } };
	};
	v1_get_portfolio_columns_columnid_cards_json: {
		path: { columnId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_post_portfolio_columns_columnid_cards_json: {
		path: { columnId: string };
		query?: Record<string, never>;
		body?: { card?: { projectId?: string } };
	};
	v1_get_portfolio_cards_cardid_json: {
		path: { cardId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_delete_portfolio_cards_cardid_json: {
		path: { cardId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_portfolio_cards_cardid_move_json: {
		path: { cardId: string };
		query?: Record<string, never>;
		body?: {
			cardId?: string;
			positionAfterId?: number;
			columnId?: string;
			oldColumnId?: string;
		};
	};
	v1_delete_portfolio_columns_columnid_json: {
		path: { columnId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_portfolio_columns_columnid_json: {
		path: { columnId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projects_projectid_updates_json: {
		path: { projectId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projects_projectid_update_json: {
		path: { projectId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_post_projects_projectid_update_json: {
		path: { projectId: string };
		query?: Record<string, never>;
		body?: { update?: { text?: string; health?: string }; notifyIds?: string };
	};
	v1_put_projects_updates_updateid_json: {
		path: { updateId: string };
		query?: Record<string, never>;
		body?: { update?: { text?: string }; notifyIds?: string };
	};
	v1_delete_projects_updates_updateid_json: {
		path: { updateId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_projects_projectid_update_request_json: {
		path: { projectId: string };
		query?: Record<string, never>;
		body?: { userId?: string; content?: string };
	};
	v1_post_projects_projectid_people_personid_json: {
		path: { projectId: number; personId: number };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_projects_projectid_people_personid_json: {
		path: { projectId: number; personId: number };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projects_projectid_people_personid_json: {
		path: { projectId: number; personId: number };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_projects_id_roles_json: {
		path: { id: number };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_roles_id_json: {
		path: { id: number };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_roles_id_json: {
		path: { id: number };
		query?: Record<string, never>;
		body?: { role?: { users?: string; name?: string } };
	};
	v1_delete_roles_id_json: {
		path: { id: number };
		query?: Record<string, never>;
		body?: never;
	};
	v1_get_comments_commentid_reactions_json: {
		path: { commentId: string };
		query: { reactionType: string };
		body?: never;
	};
	v1_get_projects_updates_updateid_reactions_json: {
		path: { updateId: string };
		query: { getReactions: string };
		body?: { getReactions?: boolean };
	};
	v1_put_comments_commentid_react_json: {
		path: { commentId: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_projects_updates_updateid_react_json: {
		path: { updateId: string };
		query?: Record<string, never>;
		body?: { reactionType?: string; get?: string };
	};
	v1_put_resource_id_unreact_json: {
		path: { resource: string; id: string };
		query?: Record<string, never>;
		body?: { reactionType?: string; get?: string };
	};
	v1_post_projects_template_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: {
			project?: {
				name?: string;
				'use-tasks'?: boolean;
				'use-milestones'?: boolean;
				'use-messages'?: boolean;
				'use-files'?: boolean;
				'use-time'?: boolean;
				'use-notebook'?: boolean;
				'use-riskregister'?: boolean;
				'use-links'?: boolean;
				'use-billing'?: boolean;
				'use-comments'?: boolean;
				'category-id'?: number;
				tags?: string;
				templateDateTargetDefault: string;
				people?: string;
				projectOwnerId?: string;
				companyId?: number;
				'grant-access-to'?: string;
			};
		};
	};
	v1_get_teams_json: {
		path?: Record<string, never>;
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			excludeProjectId?: number;
			excludeDefaultProjectIds?: string;
			projectCompanyId?: number;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includePrivateTeams?: boolean;
			includeSubteams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
			format?: 'list' | 'tree';
			isInPrivacyOfProjectId?: number;
		};
		body?: never;
	};
	v1_post_teams_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: {
			person?: {
				parentTeamId?: number;
				name?: string;
				logoPendingFileRef?: string;
				logoIcon?: string;
				logoColor?: string;
				handle?: string;
				companyId?: number;
				projectId?: number;
				userIds?: string;
				defaultProjectIds?: string;
				isPrivate?: boolean;
				get?: string;
			};
		};
	};
	v1_delete_teams_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: { teamIds?: string };
	};
	v1_get_teams_id_json: {
		path: { id: string };
		query?: {
			includeSubteams?: boolean;
			include?: 'members';
			showDeleted?: boolean;
			getEmoji?: boolean;
		};
		body?: never;
	};
	v1_put_teams_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			person?: {
				parentTeamId?: number;
				name?: string;
				logoPendingFileRef?: string;
				logoIcon?: string;
				logoColor?: string;
				handle?: string;
				companyId?: number;
				projectId?: number;
				userIds?: string;
				defaultProjectIds?: string;
				isPrivate?: boolean;
				removeLogo?: boolean;
				get?: string;
			};
		};
	};
	v1_delete_teams_id_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: never;
	};
	v1_put_teams_id_people_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: { userIds?: string; action?: 'add' | 'replace' };
	};
	v1_get_projects_id_teams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			excludeProjectId?: number;
			excludeDefaultProjectIds?: string;
			projectCompanyId?: number;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includePrivateTeams?: boolean;
			includeSubteams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
			format?: 'list' | 'tree';
			isInPrivacyOfProjectId?: number;
		};
		body?: never;
	};
	v1_post_projects_id_teams_json: {
		path: { id: string };
		query?: Record<string, never>;
		body?: {
			person?: {
				parentTeamId?: number;
				name?: string;
				logoPendingFileRef?: string;
				logoIcon?: string;
				logoColor?: string;
				handle?: string;
				userIds?: string;
				defaultProjectIds?: string;
				isPrivate?: boolean;
				get?: string;
			};
		};
	};
	v1_get_companies_id_teams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			excludeProjectId?: number;
			excludeDefaultProjectIds?: string;
			projectCompanyId?: number;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includeSubteams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
			format?: 'list' | 'tree';
			isInPrivacyOfProjectId?: number;
		};
		body?: never;
	};
	v1_get_milestones_id_teams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			accessList?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includePrivateTeams?: boolean;
			includeSubteams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
		};
		body?: never;
	};
	v1_get_notebooks_id_teams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			accessList?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includePrivateTeams?: boolean;
			includeSubteams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
		};
		body?: never;
	};
	v1_get_tasks_id_teams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			accessList?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includePrivateTeams?: boolean;
			includeSubteams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
		};
		body?: never;
	};
	v1_get_files_id_teams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			accessList?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includePrivateTeams?: boolean;
			includeSubteams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
		};
		body?: never;
	};
	v1_get_tasklists_id_teams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			accessList?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includePrivateTeams?: boolean;
			includeSubteams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
		};
		body?: never;
	};
	v1_get_links_id_teams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			accessList?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includePrivateTeams?: boolean;
			includeSubteams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
		};
		body?: never;
	};
	v1_get_portfolio_boards_id_teams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			accessList?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includePrivateTeams?: boolean;
			includeSubteams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
		};
		body?: never;
	};
	v1_get_comments_id_teams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			accessList?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includePrivateTeams?: boolean;
			includeSubteams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
		};
		body?: never;
	};
	v1_get_teams_id_subteams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			excludeTeamIds?: string;
			excludeProjectId?: number;
			excludeDefaultProjectIds?: string;
			projectCompanyId?: number;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includePrivateTeams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
			format?: 'list' | 'tree';
			isInPrivacyOfProjectId?: number;
		};
		body?: never;
	};
	v1_get_people_id_teams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			excludeProjectId?: number;
			excludeDefaultProjectIds?: string;
			projectCompanyId?: number;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includePrivateTeams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
			format?: 'list' | 'tree';
			isInPrivacyOfProjectId?: number;
		};
		body?: never;
	};
	v1_get_milestones_id_comments_teams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			accessList?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includePrivateTeams?: boolean;
			includeSubteams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
		};
		body?: never;
	};
	v1_get_notebooks_id_comments_teams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			accessList?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includePrivateTeams?: boolean;
			includeSubteams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
		};
		body?: never;
	};
	v1_get_tasks_id_comments_teams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			accessList?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includePrivateTeams?: boolean;
			includeSubteams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
		};
		body?: never;
	};
	v1_get_files_id_comments_teams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			accessList?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includePrivateTeams?: boolean;
			includeSubteams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
		};
		body?: never;
	};
	v1_get_tasklists_id_comments_teams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			accessList?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includePrivateTeams?: boolean;
			includeSubteams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
		};
		body?: never;
	};
	v1_get_links_id_comments_teams_json: {
		path: { id: string };
		query?: {
			include?: string;
			page?: number;
			pageSize?: number;
			sortBy?: 'name' | 'picker' | 'dateAdded';
			sortOrder?: 'asc' | 'desc';
			searchTerm?: string;
			accessList?: string;
			getEmoji?: boolean;
			showDeleted?: boolean;
			updatedAfterDate?: string;
			projectIds?: string;
			userIds?: string;
			teamIds?: string;
			companyIds?: string;
			parentTeamIds?: string;
			excludeTeamIds?: string;
			includeGlobalTeams?: boolean;
			includeCompanyTeams?: boolean;
			includeProjectTeams?: boolean;
			includePrivateTeams?: boolean;
			includeSubteams?: boolean;
			onlyGlobalTeamsWithProjectMembers?: boolean;
		};
		body?: never;
	};
	v1_get_teams_users_json: {
		path?: Record<string, never>;
		query?: Record<string, never>;
		body?: never;
	};
};

export type TeamworkV1Outputs = {
	v1_get_projects_json: {
		STATUS?: string;
		projects?: Array<
			{
				startDate?: string;
				'last-changed-on'?: string;
				logo?: string;
				'created-on'?: string;
				privacyEnabled?: boolean;
				status?: string;
				boardData?: Record<string, TeamworkJsonValue>;
				replyByEmailEnabled?: boolean;
				'harvest-timers-enabled'?: boolean;
				category?: { color?: string; id?: string; name?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				id?: string;
				'overview-start-page'?: string;
				'start-page'?: string;
				integrations?: {
					xero?: {
						basecurrency?: string;
						countrycode?: string;
						enabled?: boolean;
						connected?: string;
						organisation?: string;
					} & Record<string, TeamworkJsonValue>;
					sharepoint?: {
						account?: string;
						foldername?: string;
						enabled?: boolean;
						folder?: string;
					} & Record<string, TeamworkJsonValue>;
					microsoftConnectors?: { enabled?: boolean } & Record<
						string,
						TeamworkJsonValue
					>;
					onedrivebusiness?: {
						account?: string;
						foldername?: string;
						enabled?: boolean;
						folder?: string;
					} & Record<string, TeamworkJsonValue>;
				} & Record<string, TeamworkJsonValue>;
				defaults?: { privacy?: string } & Record<string, TeamworkJsonValue>;
				notifyeveryone?: boolean;
				filesAutoNewVersion?: boolean;
				defaultPrivacy?: string;
				'tasks-start-page'?: string;
				starred?: boolean;
				announcementHTML?: string;
				isProjectAdmin?: boolean;
				name?: string;
				company?: { 'is-owner'?: string; id?: string; name?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				endDate?: string;
				announcement?: string;
				'show-announcement'?: boolean;
				subStatus?: string;
				tags?: Array<Record<string, TeamworkJsonValue>>;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_projects_json: { id?: string; STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_projects_id_json: {
		project?: {
			replyByEmailEnabled?: boolean;
			starred?: boolean;
			'show-announcement'?: boolean;
			'harvest-timers-enabled'?: boolean;
			subStatus?: string;
			status?: string;
			integrations?: {
				xero?: {
					countrycode?: string;
					enabled?: boolean;
					connected?: string;
					organisation?: string;
					basecurrency?: string;
				} & Record<string, TeamworkJsonValue>;
				sharepoint?: {
					enabled?: boolean;
					folder?: string;
					account?: string;
					foldername?: string;
				} & Record<string, TeamworkJsonValue>;
				microsoftConnectors?: { enabled?: boolean } & Record<
					string,
					TeamworkJsonValue
				>;
				onedrivebusiness?: { enabled?: boolean } & Record<
					string,
					TeamworkJsonValue
				>;
			} & Record<string, TeamworkJsonValue>;
			defaultPrivacy?: string;
			'created-on'?: string;
			filesAutoNewVersion?: boolean;
			category?: { name?: string; id?: string; color?: string } & Record<
				string,
				TeamworkJsonValue
			>;
			tags?: Array<Record<string, TeamworkJsonValue>>;
			'overview-start-page'?: string;
			logo?: string;
			startDate?: string;
			id?: string;
			'last-changed-on'?: string;
			portfolioBoards?: Array<Record<string, TeamworkJsonValue>>;
			type?: string;
			endDate?: string;
			company?: { name?: string; id?: string } & Record<
				string,
				TeamworkJsonValue
			>;
			'tasks-start-page'?: string;
			'active-pages'?: {
				links?: string;
				tasks?: string;
				time?: string;
				billing?: string;
				notebooks?: string;
				files?: string;
				comments?: string;
				riskRegister?: string;
				milestones?: string;
				messages?: string;
			} & Record<string, TeamworkJsonValue>;
			name?: string;
			privacyEnabled?: boolean;
			announcement?: string;
			directFileUploadsEnabled?: boolean;
			'start-page'?: string;
			skipWeekends?: boolean;
			notifyeveryone?: boolean;
			boardData?: Record<string, TeamworkJsonValue>;
			announcementHTML?: string;
		} & Record<string, TeamworkJsonValue>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_put_projects_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_projects_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_post_projects_id_clone_json: { projectId?: number } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_companies_id_projects_json: {
		STATUS?: string;
		projects?: Array<
			{
				company?: { name?: string; 'is-owner'?: string; id?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				starred?: boolean;
				name?: string;
				'show-announcement'?: boolean;
				announcement?: string;
				status?: string;
				isProjectAdmin?: boolean;
				'created-on'?: string;
				category?: { name?: string; id?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				'start-page'?: string;
				startDate?: string;
				logo?: string;
				notifyeveryone?: boolean;
				id?: string;
				'last-changed-on'?: string;
				endDate?: string;
				'harvest-timers-enabled'?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_starred_json: {
		STATUS?: string;
		projects?: Array<
			{
				company?: { name?: string; 'is-owner'?: string; id?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				starred?: boolean;
				name?: string;
				'show-announcement'?: boolean;
				announcement?: string;
				status?: string;
				isProjectAdmin?: boolean;
				'created-on'?: string;
				category?: { name?: string; id?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				'start-page'?: string;
				startDate?: string;
				logo?: string;
				notifyeveryone?: boolean;
				id?: string;
				'last-changed-on'?: string;
				endDate?: string;
				'harvest-timers-enabled'?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_id_rates_json: {
		rates?: {
			users?: {
				'12345'?: { source?: string; rate?: string } & Record<
					string,
					TeamworkJsonValue
				>;
			} & Record<string, TeamworkJsonValue>;
			'account-default'?: string;
			'project-default'?: string;
		} & Record<string, TeamworkJsonValue>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_post_projects_id_rates_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_projects_id_stats_json: {
		STATUS?: string;
		stats?: {
			tasks?: {
				nodate?: string;
				today?: string;
				late?: string;
				complete?: string;
				upcoming?: string;
				active?: string;
			} & Record<string, TeamworkJsonValue>;
			columns?: { count?: string } & Record<string, TeamworkJsonValue>;
			billing?: { completed?: string; active?: string } & Record<
				string,
				TeamworkJsonValue
			>;
			events?: { today?: string; count?: string; hasEvents?: boolean } & Record<
				string,
				TeamworkJsonValue
			>;
			milestones?: {
				today?: string;
				late?: string;
				complete?: string;
				upcoming?: string;
				active?: string;
			} & Record<string, TeamworkJsonValue>;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_put_projects_id_star_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_projectcategories_json: {
		categories?: Array<
			{
				'parent-id'?: string;
				name?: string;
				count?: string;
				'elements-count'?: string;
				id?: string;
				color?: string;
				type?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_projectcategories_json: {
		categoryId?: string;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projectcategories_id_json: {
		category?: {
			'parent-id'?: string;
			name?: string;
			count?: string;
			id?: string;
			elements_count?: string;
			color?: string;
			type?: string;
		} & Record<string, TeamworkJsonValue>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_put_projectcategories_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_projectcategories_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_projectcategories_categoryid_tasks_json: {
		'todo-items'?: Array<
			{
				canComplete?: boolean;
				'project-id'?: string;
				'creator-lastname'?: string;
				'has-reminders'?: boolean;
				'tasklist-isTemplate'?: boolean;
				'has-unread-comments'?: boolean;
				'todo-list-name'?: string;
				hasTickets?: boolean;
				'due-date-base'?: string;
				order?: string;
				'comments-count'?: string;
				userFollowingComments?: boolean;
				private?: string;
				status?: string;
				'todo-list-id'?: string;
				predecessors?: Array<Record<string, TeamworkJsonValue>>;
				'created-on'?: string;
				tags?: Array<Record<string, TeamworkJsonValue>>;
				canEdit?: boolean;
				content?: string;
				'has-predecessors'?: string;
				'creator-firstname'?: string;
				id?: string;
				'company-name'?: string;
				'last-changed-on'?: string;
				'due-date'?: string;
				'has-dependencies'?: string;
				completed?: boolean;
				position?: string;
				userFollowingChanges?: boolean;
				'estimated-minutes'?: string;
				'attachments-count'?: string;
				progress?: string;
				priority?: string;
				'harvest-enabled'?: boolean;
				viewEstimatedTime?: boolean;
				parentTaskId?: string;
				'creator-avatar-url'?: string;
				'tasklist-lockdownId'?: string;
				'company-id'?: string;
				canLogTime?: boolean;
				'creator-id'?: string;
				'project-name'?: string;
				'start-date'?: string;
				'tasklist-private'?: boolean;
				timeIsLogged?: string;
				lockdownId?: string;
			} & Record<string, TeamworkJsonValue>
		>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_put_projects_projectid_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_milestones_json: {
		milestones?: Array<
			{
				'project-id'?: string;
				canComplete?: boolean;
				'responsible-party-id'?: string;
				'completer-id'?: string;
				'comments-count'?: string;
				private?: boolean;
				status?: string;
				'completed-on'?: string;
				'created-on'?: string;
				canEdit?: boolean;
				'responsible-party-type'?: string;
				isprivate?: string;
				'company-name'?: string;
				id?: string;
				'last-changed-on'?: string;
				completed?: boolean;
				reminder?: string;
				tasklists?: Array<Record<string, TeamworkJsonValue>>;
				'responsible-party-firstname'?: string;
				'completer-firstname'?: string;
				'responsible-party-ids'?: string;
				'responsible-party-names'?: string;
				'responsible-party-lastname'?: string;
				'company-id'?: string;
				'creator-id'?: string;
				'completer-lastname'?: string;
				'project-name'?: string;
				deadline?: string;
				_isprivate?: { deprecated?: boolean } & Record<
					string,
					TeamworkJsonValue
				>;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_id_milestones_json: {
		milestones?: Array<
			{
				'project-id'?: string;
				canComplete?: boolean;
				'responsible-party-id'?: string;
				'completer-id'?: string;
				'comments-count'?: string;
				private?: boolean;
				status?: string;
				'completed-on'?: string;
				'created-on'?: string;
				canEdit?: boolean;
				'responsible-party-type'?: string;
				isprivate?: string;
				'company-name'?: string;
				id?: string;
				'last-changed-on'?: string;
				completed?: boolean;
				reminder?: string;
				tasklists?: Array<Record<string, TeamworkJsonValue>>;
				'responsible-party-firstname'?: string;
				'completer-firstname'?: string;
				'responsible-party-ids'?: string;
				'responsible-party-names'?: string;
				'responsible-party-lastname'?: string;
				'company-id'?: string;
				'creator-id'?: string;
				'completer-lastname'?: string;
				'project-name'?: string;
				deadline?: string;
				_isprivate?: { deprecated?: boolean } & Record<
					string,
					TeamworkJsonValue
				>;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_projects_id_milestones_json: {
		milestoneid?: number;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_milestones_id_json: {
		milestone?: {
			'project-id'?: string;
			canComplete?: boolean;
			'creator-lastname'?: string;
			'responsible-party-id'?: string;
			responsiblePartyFullNames?: string;
			commentNotifyIds?: string;
			private?: boolean;
			'comments-count'?: string;
			userFollowingComments?: boolean;
			status?: string;
			changeFollowerIds?: string;
			'created-on'?: string;
			tags?: Array<Record<string, TeamworkJsonValue>>;
			canEdit?: boolean;
			isprivate?: string;
			'creator-firstname'?: string;
			id?: string;
			'last-changed-on'?: string;
			commentFollowerIds?: string;
			completed?: boolean;
			reminder?: string;
			userFollowingChanges?: boolean;
			'responsible-party-firstname'?: string;
			'responsible-party-ids'?: string;
			'responsible-party-names'?: string;
			'responsible-party-lastname'?: string;
			'creator-avatar-url'?: string;
			'creator-id'?: string;
			'project-name'?: string;
			deadline?: string;
		} & Record<string, TeamworkJsonValue>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_put_milestones_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_milestones_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_milestones_id_complete_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_milestones_id_uncomplete_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_tasklists_json: {
		STATUS?: string;
		tasklists?: Array<
			{
				id?: string;
				name?: string;
				position?: number;
				projectId?: string;
				projectName?: string;
				updatedAfter?: string;
				private?: boolean;
				isTemplate?: boolean;
				tags?: Array<Record<string, TeamworkJsonValue>>;
				'milestone-id'?: string;
				pinned?: boolean;
				complete?: boolean;
				'uncompleted-count'?: number;
				status?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_id_tasklists_json: {
		STATUS?: string;
		tasklists?: Array<
			{
				name?: string;
				pinned?: boolean;
				'milestone-id'?: string;
				'uncompleted-count'?: number;
				id?: string;
				complete?: boolean;
				private?: boolean;
				isTemplate?: boolean;
				position?: number;
				status?: string;
				projectId?: string;
				projectName?: string;
				DLM?: number;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_projects_id_tasklists_json: {
		TASKLISTID?: string;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_tasklists_id_json: {
		STATUS?: string;
		'todo-list'?: {
			id?: string;
			name?: string;
			position?: number;
			projectId?: string;
			projectName?: string;
			lastUpdated?: string;
			private?: boolean;
			isTemplate?: boolean;
			tags?: Array<Record<string, TeamworkJsonValue>>;
			tasks?: string;
			'milestone-id'?: string;
			pinned?: boolean;
			complete?: boolean;
			'uncompleted-count'?: number;
			status?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_put_tasklists_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_tasklists_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_tasklists_templates_json: {
		tasklists?: Array<
			{
				name?: string;
				'uncompleted-count'?: string;
				id?: string;
				complete?: boolean;
				private?: boolean;
				position?: string;
			} & Record<string, TeamworkJsonValue>
		>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_put_projects_id_tasklists_reorder_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_tasklist_id_copy_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_tasklist_id_move_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_tasks_json: {
		STATUS?: string;
		'todo-items'?: Array<
			{
				id?: number;
				boardColumn?: { id?: number; name?: string; color?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				canComplete?: boolean;
				'comments-count'?: number;
				'has-reminders'?: boolean;
				'has-unread-comments'?: boolean;
				private?: number;
				content?: string;
				order?: number;
				'project-id'?: number;
				'project-name'?: string;
				'todo-list-id'?: number;
				'todo-list-name'?: string;
				'tasklist-private'?: boolean;
				'tasklist-isTemplate'?: boolean;
				status?: string;
				'company-name'?: string;
				'company-id'?: number;
				'creator-id'?: number;
				'creator-firstname'?: string;
				'creator-lastname'?: string;
				'updater-id'?: number;
				'updater-firstname'?: string;
				'updater-lastname'?: string;
				completed?: boolean;
				'start-date'?: string;
				'due-date-base'?: string;
				'due-date'?: string;
				'created-on'?: string;
				'last-changed-on'?: string;
				position?: number;
				'estimated-minutes'?: number;
				priority?: string;
				progress?: number;
				'harvest-enabled'?: boolean;
				parentTaskId?: string;
				lockdownId?: string;
				'tasklist-lockdownId'?: string;
				'has-dependencies'?: number;
				'has-predecessors'?: number;
				hasTickets?: boolean;
				timeIsLogged?: string;
				'attachments-count'?: number;
				predecessors?: Array<Record<string, TeamworkJsonValue>>;
				canEdit?: boolean;
				viewEstimatedTime?: boolean;
				'creator-avatar-url'?: string;
				canLogTime?: boolean;
				userFollowingComments?: boolean;
				userFollowingChanges?: boolean;
				DLM?: number;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_id_tasks_json: {
		STATUS?: string;
		'todo-items'?: Array<
			{
				id?: number;
				canComplete?: boolean;
				'comments-count'?: number;
				'has-reminders'?: boolean;
				'has-unread-comments'?: boolean;
				private?: number;
				content?: string;
				order?: number;
				'project-id'?: number;
				'project-name'?: string;
				'todo-list-id'?: number;
				'todo-list-name'?: string;
				'tasklist-private'?: boolean;
				'tasklist-isTemplate'?: boolean;
				status?: string;
				'company-name'?: string;
				'company-id'?: number;
				'creator-id'?: number;
				'creator-firstname'?: string;
				'creator-lastname'?: string;
				completed?: boolean;
				'start-date'?: string;
				'due-date-base'?: string;
				'due-date'?: string;
				'created-on'?: string;
				'last-changed-on'?: string;
				position?: number;
				'estimated-minutes'?: number;
				priority?: string;
				progress?: number;
				'harvest-enabled'?: boolean;
				parentTaskId?: string;
				lockdownId?: string;
				'tasklist-lockdownId'?: string;
				'has-dependencies'?: number;
				'has-predecessors'?: number;
				hasTickets?: boolean;
				tags?: Array<
					{ id?: number; name?: string; color?: string } & Record<
						string,
						TeamworkJsonValue
					>
				>;
				timeIsLogged?: string;
				'attachments-count'?: number;
				'responsible-party-ids'?: string;
				'responsible-party-id'?: string;
				'responsible-party-names'?: string;
				'responsible-party-type'?: string;
				'responsible-party-firstname'?: string;
				'responsible-party-lastname'?: string;
				'responsible-party-summary'?: string;
				predecessors?: Array<Record<string, TeamworkJsonValue>>;
				canEdit?: boolean;
				viewEstimatedTime?: boolean;
				'creator-avatar-url'?: string;
				canLogTime?: boolean;
				userFollowingComments?: boolean;
				userFollowingChanges?: boolean;
				DLM?: number;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_projects_id_tasks_json: {
		affectedTaskIds?: string;
		id?: string;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_tasklists_id_tasks_json: {
		STATUS?: string;
		'todo-items'?: Array<
			{
				id?: number;
				canComplete?: boolean;
				'comments-count'?: number;
				'has-reminders'?: boolean;
				'has-unread-comments'?: boolean;
				private?: number;
				content?: string;
				order?: number;
				'project-id'?: number;
				'project-name'?: string;
				'todo-list-id'?: number;
				'todo-list-name'?: string;
				'tasklist-private'?: boolean;
				'tasklist-isTemplate'?: boolean;
				status?: string;
				'company-name'?: string;
				'company-id'?: number;
				'creator-id'?: number;
				'creator-firstname'?: string;
				'creator-lastname'?: string;
				completed?: boolean;
				'start-date'?: string;
				'due-date-base'?: string;
				'due-date'?: string;
				'created-on'?: string;
				'last-changed-on'?: string;
				position?: number;
				'estimated-minutes'?: number;
				priority?: string;
				progress?: number;
				'harvest-enabled'?: boolean;
				parentTaskId?: string;
				lockdownId?: string;
				'tasklist-lockdownId'?: string;
				'has-dependencies'?: number;
				'has-predecessors'?: number;
				hasTickets?: boolean;
				tags?: Array<
					{ id?: number; name?: string; color?: string } & Record<
						string,
						TeamworkJsonValue
					>
				>;
				timeIsLogged?: string;
				'attachments-count'?: number;
				'responsible-party-ids'?: string;
				'responsible-party-id'?: string;
				'responsible-party-names'?: string;
				'responsible-party-type'?: string;
				'responsible-party-firstname'?: string;
				'responsible-party-lastname'?: string;
				'responsible-party-summary'?: string;
				predecessors?: Array<Record<string, TeamworkJsonValue>>;
				canEdit?: boolean;
				viewEstimatedTime?: boolean;
				'creator-avatar-url'?: string;
				canLogTime?: boolean;
				userFollowingComments?: boolean;
				userFollowingChanges?: boolean;
				DLM?: number;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_tasklists_id_tasks_json: {
		affectedTaskIds?: string;
		id?: string;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_tasks_id_json: {
		STATUS?: string;
		'todo-item'?: {
			id?: number;
			canComplete?: boolean;
			'comments-count'?: number;
			'has-reminders'?: boolean;
			'has-unread-comments'?: boolean;
			private?: number;
			content?: string;
			order?: number;
			'project-id'?: number;
			'project-name'?: string;
			'todo-list-id'?: number;
			'todo-list-name'?: string;
			'tasklist-private'?: boolean;
			'tasklist-isTemplate'?: boolean;
			status?: string;
			'company-name'?: string;
			'company-id'?: number;
			'creator-id'?: number;
			'creator-firstname'?: string;
			'creator-lastname'?: string;
			'updater-id'?: number;
			'updater-firstname'?: string;
			'updater-lastname'?: string;
			completed?: boolean;
			'start-date'?: string;
			'due-date-base'?: string;
			'due-date'?: string;
			'created-on'?: string;
			'last-changed-on'?: string;
			position?: number;
			'estimated-minutes'?: number;
			priority?: string;
			progress?: number;
			'harvest-enabled'?: boolean;
			parentTaskId?: string;
			lockdownId?: string;
			'tasklist-lockdownId'?: string;
			'has-dependencies'?: number;
			'has-predecessors'?: number;
			hasTickets?: boolean;
			tags?: Array<
				{
					id?: number;
					name?: string;
					color?: string;
					projectId?: number;
				} & Record<string, TeamworkJsonValue>
			>;
			timeIsLogged?: string;
			'attachments-count'?: number;
			'responsible-party-ids'?: string;
			'responsible-party-id'?: string;
			'responsible-party-names'?: string;
			'responsible-party-type'?: string;
			'responsible-party-firstname'?: string;
			'responsible-party-lastname'?: string;
			'responsible-party-summary'?: string;
			predecessors?: Array<Record<string, TeamworkJsonValue>>;
			canEdit?: boolean;
			viewEstimatedTime?: boolean;
			'creator-avatar-url'?: string;
			canLogTime?: boolean;
			commentFollowerSummary?: string;
			changeFollowerSummary?: string;
			commentFollowerIds?: string;
			changeFollowerIds?: string;
			userFollowingComments?: boolean;
			userFollowingChanges?: boolean;
			DLM?: number;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_tasks_id_json: { id?: number; STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_tasks_id_dependencies_json: {
		dependents?: Array<
			{
				'responsible-party-id'?: string;
				predecessorMust?: string;
				name?: string;
				id?: string;
				hardness?: string;
				projectId?: string;
				dependentCant?: string;
				'responsible-party-summary'?: string;
				'responsible-party-names'?: string;
			} & Record<string, TeamworkJsonValue>
		>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_completedtasks_json: {
		tasks?: Array<
			{
				canComplete?: boolean;
				lastChangedOn?: string;
				dueDate?: string;
				harvestEnabled?: boolean;
				tasklistId?: string;
				canViewOthersTime?: boolean;
				creatorId?: string;
				numEstMins?: string;
				canViewEstTime?: boolean;
				creatorFirstName?: string;
				projectId?: string;
				private?: string;
				dueDateBase?: string;
				tags?: Array<Record<string, TeamworkJsonValue>>;
				canEdit?: boolean;
				startDate?: string;
				content?: string;
				createdOn?: string;
				id?: string;
				completed?: boolean;
				completerId?: string;
				position?: string;
				tasklistName?: string;
				tasklistDescription?: string;
				companyName?: string;
				priority?: string;
				progress?: string;
				completerFirstName?: string;
				projectName?: string;
				completedOn?: string;
				creatorLastName?: string;
				projectStatus?: string;
				canLogTime?: boolean;
				projectDescription?: string;
				totalBillableTimeLogged?: string;
				creatorAvatarUrl?: string;
				completerLastName?: string;
				totalTimeLogged?: string;
				completerAvatarUrl?: string;
				lockdownId?: string;
				companyId?: string;
			} & Record<string, TeamworkJsonValue>
		>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_tasks_id_predecessors_json: {
		predecessors?: Array<
			{
				'responsible-party-id'?: string;
				predecessorMust?: string;
				name?: string;
				id?: string;
				hardness?: string;
				projectType?: string;
				projectId?: string;
				dependentCant?: string;
				'responsible-party-summary'?: string;
				'responsible-party-names'?: string;
			} & Record<string, TeamworkJsonValue>
		>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_tasks_parenttaskid_subtasks_json: {
		STATUS?: string;
		'todo-items'?: Array<
			{
				id?: number;
				canComplete?: boolean;
				'comments-count'?: number;
				'has-reminders'?: boolean;
				'has-unread-comments'?: boolean;
				private?: number;
				content?: string;
				order?: number;
				'project-id'?: number;
				'project-name'?: string;
				'todo-list-id'?: number;
				'todo-list-name'?: string;
				'tasklist-private'?: boolean;
				'tasklist-isTemplate'?: boolean;
				status?: string;
				'company-name'?: string;
				'company-id'?: number;
				'creator-id'?: number;
				'creator-firstname'?: string;
				'creator-lastname'?: string;
				'updater-id'?: number;
				'updater-firstname'?: string;
				'updater-lastname'?: string;
				completed?: boolean;
				'start-date'?: string;
				'due-date-base'?: string;
				'due-date'?: string;
				'created-on'?: string;
				'last-changed-on'?: string;
				position?: number;
				'estimated-minutes'?: number;
				priority?: string;
				progress?: number;
				'harvest-enabled'?: boolean;
				parentTaskId?: string;
				lockdownId?: string;
				'tasklist-lockdownId'?: string;
				'has-dependencies'?: number;
				'has-predecessors'?: number;
				hasTickets?: boolean;
				timeIsLogged?: string;
				'attachments-count'?: number;
				'responsible-party-ids'?: string;
				'responsible-party-id'?: string;
				'responsible-party-names'?: string;
				'responsible-party-type'?: string;
				'responsible-party-firstname'?: string;
				'responsible-party-lastname'?: string;
				'responsible-party-summary'?: string;
				predecessors?: Array<Record<string, TeamworkJsonValue>>;
				'parent-task'?: { content?: string; id?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				canEdit?: boolean;
				viewEstimatedTime?: boolean;
				'creator-avatar-url'?: string;
				canLogTime?: boolean;
				userFollowingComments?: boolean;
				userFollowingChanges?: boolean;
				DLM?: number;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_tasks_taskid_recurring_json: {
		'recurring-dates'?: Array<string>;
		'dates-set'?: Record<string, TeamworkJsonValue>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_post_tasks_id_quickadd_json: {
		tasklistId?: string;
		success?: string;
		taskIds?: string;
		STATUS?: string;
		failed?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_post_projects_projectid_tasks_quickadd_json: {
		tasklistId?: string;
		success?: string;
		taskIds?: string;
		STATUS?: string;
		failed?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_put_tasks_id_complete_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_tasks_id_uncomplete_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_tasklists_id_tasks_reorder_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_tasks_taskid_move_json: {
		STATUS?: string;
		affectedTaskIds?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_put_tasks_taskid_copy_json: {
		STATUS?: string;
		affectedTaskIds?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_tasks_id_reminders_json: {
		STATUS?: string;
		reminders?: Array<
			{
				'created-by-user-firstname'?: string;
				'was-sent'?: string;
				'created-date-time'?: string;
				'user-lastname'?: string;
				note?: string;
				'user-firstname'?: string;
				'date-time-utc'?: string;
				'created-by-user-id'?: string;
				'created-by-user-lastname'?: string;
				'user-id'?: string;
				'task-id'?: string;
				id?: string;
				type?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_tasks_id_reminders_json: { id?: number; STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_taskreminders_id_json: { id?: number; STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_taskreminders_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_companies_json: {
		companies?: Array<
			{
				state?: string;
				name?: string;
				address_two?: string;
				email_one?: string;
				country?: string;
				isowner?: string;
				email_three?: string;
				contacts?: string;
				industry?: string;
				'logo-URL'?: string;
				address_one?: string;
				website?: string;
				cid?: string;
				email_two?: string;
				accounts?: string;
				phone?: string;
				company_name_url?: string;
				countrycode?: string;
				can_see_private?: boolean;
				zip?: string;
				id?: string;
				city?: string;
				fax?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_companies_json: { id?: string; STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_projects_id_companies_json: {
		companies?: Array<
			{
				state?: string;
				name?: string;
				address_two?: string;
				email_one?: string;
				country?: string;
				isowner?: string;
				email_three?: string;
				contacts?: string;
				industry?: string;
				'logo-URL'?: string;
				address_one?: string;
				website?: string;
				cid?: string;
				email_two?: string;
				accounts?: string;
				phone?: string;
				company_name_url?: string;
				countrycode?: string;
				can_see_private?: boolean;
				zip?: string;
				id?: string;
				city?: string;
				fax?: string;
			} & Record<string, TeamworkJsonValue>
		>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_companies_id_json: {
		company?: {
			state?: string;
			email_one?: string;
			'profile-text'?: string;
			email_three?: string;
			contacts?: string;
			website?: string;
			'logo-URL'?: string;
			email_two?: string;
			cid?: string;
			phone?: string;
			accounts?: string;
			company_name_url?: string;
			can_see_private?: boolean;
			zip?: string;
			tags?: Array<Record<string, TeamworkJsonValue>>;
			industryId?: string;
			id?: string;
			fax?: string;
			address_two?: string;
			name?: string;
			country?: string;
			isowner?: string;
			'private-notes-text'?: string;
			industry?: string;
			address_one?: string;
			countrycode?: string;
			city?: string;
		} & Record<string, TeamworkJsonValue>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_put_companies_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_companies_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_people_json: {
		STATUS?: string;
		people?: Array<
			{
				permissions?: {
					'can-access-templates'?: boolean;
					'can-add-projects'?: boolean;
					canManagePortfolio?: boolean;
					'can-manage-people'?: boolean;
					canAccessPortfolio?: boolean;
				} & Record<string, TeamworkJsonValue>;
				'avatar-url'?: string;
				'last-changed-on'?: string;
				'email-address'?: string;
				'last-login'?: string;
				'address-country'?: string;
				textFormat?: string;
				'user-name'?: string;
				id?: string;
				'phone-number-fax'?: string;
				'site-owner'?: boolean;
				'address-city'?: string;
				'company-name'?: string;
				'user-invited-date'?: string;
				'user-type'?: string;
				'phone-number-mobile'?: string;
				useShorthandDurations?: boolean;
				'address-zip'?: string;
				openId?: string;
				address?: {
					city?: string;
					country?: string;
					countrycode?: string;
					zipcode?: string;
					state?: string;
					line1?: string;
					line2?: string;
				} & Record<string, TeamworkJsonValue>;
				'phone-number-office'?: string;
				'im-handle'?: string;
				twoFactorAuthEnabled?: boolean;
				tags?: Array<Record<string, TeamworkJsonValue>>;
				'has-access-to-new-projects'?: boolean;
				'last-active'?: string;
				'im-service'?: string;
				deleted?: boolean;
				notes?: string;
				'in-owner-company'?: boolean;
				'user-invited-status'?: string;
				profile?: string;
				userUUID?: string;
				'user-invited'?: string;
				'created-at': string;
				companyId?: string;
				'phone-number-home'?: string;
				'profile-text'?: string;
				'company-id'?: string;
				pid?: string;
				'phone-number-mobile-parts'?: {
					countryCode?: string;
					prefix?: string;
					phone?: string;
				} & Record<string, TeamworkJsonValue>;
				'address-line-2'?: string;
				'address-state'?: string;
				'login-count'?: string;
				'address-line-1'?: string;
				administrator?: boolean;
				'email-alt-1'?: string;
				'email-alt-2'?: string;
				'email-alt-3'?: string;
				'last-name'?: string;
				'first-name'?: string;
				'phone-number-office-ext'?: string;
				twitter?: string;
				lengthOfDay?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_people_json: {
		id?: string;
		STATUS?: string;
		user?: {
			avatarUrl?: string;
			firstName?: string;
			id?: string;
			lastName?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_calendarevents_eventid_availablepeople_json: {
		people?: Array<
			{
				'first-name'?: string;
				'avatar-url'?: string;
				'company-name'?: string;
				id?: string;
				email?: string;
				'last-name'?: string;
				'company-id'?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_projectid_messages_availablepeople_json: {
		people?: Array<
			{
				avatarUrl?: string;
				isAdministrator?: boolean;
				roleIds?: Array<Record<string, TeamworkJsonValue>>;
				companyName?: string;
				isResponsible?: boolean;
				isUnsubscribed?: boolean;
				isInOwnerCompany?: boolean;
				isFollowingComments?: boolean;
				firstName?: string;
				isProjectAdministrator?: boolean;
				isObserving?: boolean;
				isInNotifyDefaults?: boolean;
				isInPrivacy?: boolean;
				id?: string;
				doesReceiveProjectEmails?: boolean;
				companyId?: string;
				isFollowingChanges?: boolean;
				lastName?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_projectid_milestones_availablepeople_json: {
		people?: Array<
			{
				avatarUrl?: string;
				isAdministrator?: boolean;
				roleIds?: Array<Record<string, TeamworkJsonValue>>;
				companyName?: string;
				isResponsible?: boolean;
				isUnsubscribed?: boolean;
				isInOwnerCompany?: boolean;
				isFollowingComments?: boolean;
				firstName?: string;
				isProjectAdministrator?: boolean;
				isObserving?: boolean;
				isInNotifyDefaults?: boolean;
				isInPrivacy?: boolean;
				id?: string;
				doesReceiveProjectEmails?: boolean;
				companyId?: string;
				isFollowingChanges?: boolean;
				lastName?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_projectid_notebooks_availablepeople_json: {
		people?: Array<
			{
				avatarUrl?: string;
				isAdministrator?: boolean;
				roleIds?: Array<Record<string, TeamworkJsonValue>>;
				companyName?: string;
				isResponsible?: boolean;
				isUnsubscribed?: boolean;
				isInOwnerCompany?: boolean;
				isFollowingComments?: boolean;
				firstName?: string;
				isProjectAdministrator?: boolean;
				isObserving?: boolean;
				isInNotifyDefaults?: boolean;
				isInPrivacy?: boolean;
				id?: string;
				doesReceiveProjectEmails?: boolean;
				companyId?: string;
				isFollowingChanges?: boolean;
				lastName?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_projectid_tasks_availablepeople_json: {
		people?: Array<
			{
				avatarUrl?: string;
				isAdministrator?: boolean;
				roleIds?: Array<Record<string, TeamworkJsonValue>>;
				companyName?: string;
				isResponsible?: boolean;
				isUnsubscribed?: boolean;
				isInOwnerCompany?: boolean;
				isFollowingComments?: boolean;
				firstName?: string;
				isProjectAdministrator?: boolean;
				isObserving?: boolean;
				isInNotifyDefaults?: boolean;
				isInPrivacy?: boolean;
				id?: string;
				doesReceiveProjectEmails?: boolean;
				companyId?: string;
				isFollowingChanges?: boolean;
				lastName?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_projectid_files_availablepeople_json: {
		people?: Array<
			{
				avatarUrl?: string;
				isAdministrator?: boolean;
				roleIds?: Array<Record<string, TeamworkJsonValue>>;
				companyName?: string;
				isResponsible?: boolean;
				isUnsubscribed?: boolean;
				isInOwnerCompany?: boolean;
				isFollowingComments?: boolean;
				firstName?: string;
				isProjectAdministrator?: boolean;
				isObserving?: boolean;
				isInNotifyDefaults?: boolean;
				isInPrivacy?: boolean;
				id?: string;
				doesReceiveProjectEmails?: boolean;
				companyId?: string;
				isFollowingChanges?: boolean;
				lastName?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_projectid_links_availablepeople_json: {
		people?: Array<
			{
				avatarUrl?: string;
				isAdministrator?: boolean;
				roleIds?: Array<Record<string, TeamworkJsonValue>>;
				companyName?: string;
				isResponsible?: boolean;
				isUnsubscribed?: boolean;
				isInOwnerCompany?: boolean;
				isFollowingComments?: boolean;
				firstName?: string;
				isProjectAdministrator?: boolean;
				isObserving?: boolean;
				isInNotifyDefaults?: boolean;
				isInPrivacy?: boolean;
				id?: string;
				doesReceiveProjectEmails?: boolean;
				companyId?: string;
				isFollowingChanges?: boolean;
				lastName?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_projectid_people_json: {
		people?: Array<
			{
				'site-owner'?: boolean;
				twitter?: string;
				'last-name'?: string;
				useShorthandDurations?: boolean;
				profile?: string;
				userUUID?: string;
				'user-name'?: string;
				id?: string;
				'phone-number-office'?: string;
				'last-active'?: string;
				'phone-number-mobile'?: string;
				'first-name'?: string;
				'user-type'?: string;
				'im-service'?: string;
				'im-handle'?: string;
				'login-count'?: string;
				openId?: string;
				'phone-number-office-ext'?: string;
				'company-id'?: string;
				'has-access-to-new-projects'?: boolean;
				'address-zip'?: string;
				'phone-number-fax'?: string;
				'last-login'?: string;
				companyId?: string;
				administrator?: boolean;
				'address-city'?: string;
				pid?: string;
				'profile-text'?: string;
				'phone-number-home'?: string;
				'email-address'?: string;
				lengthOfDay?: string;
				tags?: Array<Record<string, TeamworkJsonValue>>;
				'company-name'?: string;
				'last-changed-on'?: string;
				deleted?: boolean;
				'address-state'?: string;
				'address-country'?: string;
				notes?: string;
				'phone-number-mobile-parts'?: {
					phone?: string;
					prefix?: string;
					countryCode?: string;
				} & Record<string, TeamworkJsonValue>;
				permissions?: {
					'can-manage-people'?: boolean;
					canManagePortfolio?: boolean;
					'can-add-projects'?: boolean;
					'can-access-templates'?: boolean;
					canAccessPortfolio?: boolean;
				} & Record<string, TeamworkJsonValue>;
				'user-invited-status'?: string;
				address?: {
					zipcode?: string;
					countrycode?: string;
					state?: string;
					line1?: string;
					country?: string;
					line2?: string;
					city?: string;
				} & Record<string, TeamworkJsonValue>;
				'address-line-2'?: string;
				'address-line-1'?: string;
				'created-at'?: string;
				textFormat?: string;
				'user-invited-date'?: string;
				'avatar-url'?: string;
				'in-owner-company'?: boolean;
				'user-invited'?: string;
				'email-alt-1'?: string;
				'email-alt-2'?: string;
				'email-alt-3'?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_companies_id_people_json: {
		STATUS?: string;
		people?: Array<
			{
				permissions?: {
					'can-access-templates'?: boolean;
					'can-add-projects'?: boolean;
					canManagePortfolio?: boolean;
					'can-manage-people'?: boolean;
					canAccessPortfolio?: boolean;
				} & Record<string, TeamworkJsonValue>;
				'avatar-url'?: string;
				'last-changed-on'?: string;
				'email-address'?: string;
				'last-login'?: string;
				'address-country'?: string;
				textFormat?: string;
				'user-name'?: string;
				id?: string;
				'phone-number-fax'?: string;
				'site-owner'?: boolean;
				'address-city'?: string;
				'company-name'?: string;
				'user-invited-date'?: string;
				'user-type'?: string;
				'phone-number-mobile'?: string;
				useShorthandDurations?: boolean;
				'address-zip'?: string;
				openId?: string;
				address?: {
					city?: string;
					country?: string;
					countrycode?: string;
					zipcode?: string;
					state?: string;
					line1?: string;
					line2?: string;
				} & Record<string, TeamworkJsonValue>;
				'phone-number-office'?: string;
				'im-handle'?: string;
				twoFactorAuthEnabled?: boolean;
				tags?: Array<Record<string, TeamworkJsonValue>>;
				'has-access-to-new-projects'?: boolean;
				'last-active'?: string;
				'im-service'?: string;
				deleted?: boolean;
				notes?: string;
				'in-owner-company'?: boolean;
				'user-invited-status'?: string;
				profile?: string;
				userUUID?: string;
				'user-invited'?: string;
				'created-at'?: string;
				companyId?: string;
				'phone-number-home'?: string;
				'profile-text'?: string;
				'company-id'?: string;
				pid?: string;
				'phone-number-mobile-parts'?: {
					countryCode?: string;
					prefix?: string;
					phone?: string;
				} & Record<string, TeamworkJsonValue>;
				'address-line-2'?: string;
				'address-state'?: string;
				'login-count'?: string;
				'address-line-1'?: string;
				administrator?: boolean;
				'email-alt-1'?: string;
				'email-alt-2'?: string;
				'email-alt-3'?: string;
				'last-name'?: string;
				'first-name'?: string;
				'phone-number-office-ext'?: string;
				twitter?: string;
				lengthOfDay?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_me_json: {
		person?: {
			startPage?: string;
			administrator?: boolean;
			pid?: string;
			'site-owner'?: boolean;
			twitter?: string;
			'phone-number-home'?: string;
			'last-name'?: string;
			'email-address'?: string;
			profile?: string;
			userUUID?: string;
			'user-name'?: string;
			id?: string;
			'company-name'?: string;
			'last-changed-on'?: string;
			'phone-number-office'?: string;
			deleted?: boolean;
			privateNotes?: string;
			'phone-number-mobile'?: string;
			'first-name'?: string;
			'user-type'?: string;
			permissions?: {
				administrator?: boolean;
				'can-manage-people'?: boolean;
				'can-add-projects'?: boolean;
				'can-access-templates'?: boolean;
				'has-access-to-new-projects'?: boolean;
				isAdminOnAProject?: boolean;
				canAccessCalendar?: boolean;
				canAccessCustomReports?: boolean;
				canAccessPortfolio?: boolean;
				canAddCustomReports?: boolean;
				canApproveTime?: boolean;
				canEditWorkflows?: boolean;
				canManageCustomFields?: boolean;
				canManageFixedFeeBudgets?: boolean;
				canManagePortfolio?: boolean;
				canManageProjectTemplates?: boolean;
				canManagePublicHolidays?: boolean;
				canManageQuotes?: boolean;
				canManageSchedule?: boolean;
				canManageTimeReminders?: boolean;
				canViewProjectTemplates?: boolean;
				canViewSchedule?: boolean;
				canViewWorkflows?: boolean;
			} & Record<string, TeamworkJsonValue>;
			'im-service'?: string;
			address?: {
				zipcode?: string;
				countrycode?: string;
				state?: string;
				line1?: string;
				country?: string;
				line2?: string;
				city?: string;
			} & Record<string, TeamworkJsonValue>;
			'im-handle'?: string;
			'created-at': string;
			'phone-number-office-ext'?: string;
			'company-id'?: string;
			'has-access-to-new-projects'?: boolean;
			'phone-number-fax'?: string;
			'avatar-url'?: string;
			'in-owner-company'?: string;
			'last-login'?: string;
			'email-alt-1'?: string;
			'email-alt-2'?: string;
			'email-alt-3'?: string;
			companyId?: string;
			installationId?: string;
			marketoId?: string;
			personaType?: string;
			companyRoleId?: string;
			'user-invited'?: string;
			'user-invited-date'?: string;
			'user-invite-accepted-date'?: string;
			'user-invited-status'?: string;
			'user-hash'?: string;
			'ld-hash'?: string;
			openId?: string;
			'login-count'?: string;
			lengthOfDay?: string;
			utilizationTarget?: string;
			textFormat?: string;
			'phone-number-mobile-parts'?: {
				prefix?: string;
				countryCode?: string;
				phone?: string;
			} & Record<string, TeamworkJsonValue>;
			'private-notes'?: string;
			'private-notes-text'?: string;
			'profile-text'?: string;
			notes?: string;
			APIEnabled?: boolean;
			twoFactorAuthEnabled?: boolean;
			isClientUser?: boolean;
			isServiceAccount?: boolean;
			isPlaceholder?: boolean;
			'has-desk-account'?: boolean;
			'has-feature-updates'?: boolean;
			'feature-updates-count'?: string;
			documentEditorInstalled?: boolean;
			useShorthandDurations?: boolean;
			isClockedIn?: boolean;
			teamIds?: Array<string>;
			companyTimesheetsPermissions?: { canAccess?: boolean } & Record<
				string,
				TeamworkJsonValue
			>;
			tags?: Array<Record<string, TeamworkJsonValue>>;
			workingHours?: {
				monday?: {
					startTime?: string;
					endTime?: string;
					taskHours?: string;
					timezone?: string;
				} & Record<string, TeamworkJsonValue>;
				tuesday?: {
					startTime?: string;
					endTime?: string;
					taskHours?: string;
					timezone?: string;
				} & Record<string, TeamworkJsonValue>;
				wednesday?: {
					startTime?: string;
					endTime?: string;
					taskHours?: string;
					timezone?: string;
				} & Record<string, TeamworkJsonValue>;
				thursday?: {
					startTime?: string;
					endTime?: string;
					taskHours?: string;
					timezone?: string;
				} & Record<string, TeamworkJsonValue>;
				friday?: {
					startTime?: string;
					endTime?: string;
					taskHours?: string;
					timezone?: string;
				} & Record<string, TeamworkJsonValue>;
				saturday?: {
					startTime?: string;
					endTime?: string;
					taskHours?: string;
					timezone?: string;
				} & Record<string, TeamworkJsonValue>;
				sunday?: {
					startTime?: string;
					endTime?: string;
					taskHours?: string;
					timezone?: string;
				} & Record<string, TeamworkJsonValue>;
			} & Record<string, TeamworkJsonValue>;
			localization?: {
				language?: string;
				languageCode?: string;
				timezone?: string;
				timezoneId?: string;
				timezoneJavaRefCode?: string;
				timezoneUTCOffsetMins?: string;
				dateFormat?: string;
				dateFormatId?: string;
				timeFormat?: string;
				timeFormatId?: string;
				'start-on-sunday'?: boolean;
			} & Record<string, TeamworkJsonValue>;
			notifications?: {
				'notify-on-status-update'?: boolean;
				'notify-on-task-complete'?: boolean;
				'notify-on-added-as-follower'?: boolean;
				'receive-my-notifications-only'?: boolean;
				'receive-notify-warnings'?: boolean;
				'sound-alerts-enabled'?: boolean;
				'receive-daily-reports'?: boolean;
				'receive-daily-reports-if-empty'?: boolean;
				'receive-daily-reports-at-weekend'?: boolean;
				'receive-daily-reports-at-time'?: string;
				'daily-report-days-filter'?: string;
				'daily-report-sort-by'?: string;
				receiveTimeApprovalsEmails?: boolean;
			} & Record<string, TeamworkJsonValue>;
			integrations?: {
				microsoftConnector?: { enabled?: boolean } & Record<
					string,
					TeamworkJsonValue
				>;
			} & Record<string, TeamworkJsonValue>;
			social?: {
				linkedin?: string;
				facebook?: string;
				twitter?: string;
				website?: string;
			} & Record<string, TeamworkJsonValue>;
			'home-tabs'?: Array<
				{
					tabIdentifier?: string;
					pendoLabel?: string;
					icon?: string;
					path?: string;
					url?: string;
					embedCode?: string;
					draggable?: string;
					enabled?: string;
					displayOrder?: string;
				} & Record<string, TeamworkJsonValue>
			>;
			auth?: { token?: string; apikey?: string; timestamp?: string } & Record<
				string,
				TeamworkJsonValue
			>;
			preferences?: Record<string, TeamworkJsonValue>;
			defaultFilters?: Record<
				string,
				{
					id?: string;
					section?: string;
					userId?: string;
					projectId?: string;
					color?: string;
					displayOrder?: string;
					deleted?: boolean;
					isTemporary?: boolean;
					isProjectSpecific?: boolean;
					shared?: boolean;
					sharedState?: boolean;
					includesSort?: boolean;
					shareLink?: string;
					dateCreated?: string;
					dateUpdated?: string;
					dateDeleted?: string;
					parameters?: Record<string, TeamworkJsonValue>;
					fulldata?: Record<string, TeamworkJsonValue>;
				} & Record<string, TeamworkJsonValue>
			>;
			currentFeatureAnnouncement?: Record<string, TeamworkJsonValue>;
		} & Record<string, TeamworkJsonValue>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_stats_json: {
		STATUS?: string;
		stats?: {
			tasks?: { today?: string; late?: string; upcoming?: string } & Record<
				string,
				TeamworkJsonValue
			>;
			permissions?: {
				canLogTime?: boolean;
				canAddMilestones?: boolean;
				canAddTasks?: boolean;
				canAddMessages?: boolean;
			} & Record<string, TeamworkJsonValue>;
			events?: { count?: string; hasEvents?: boolean } & Record<
				string,
				TeamworkJsonValue
			>;
			milestones?: {
				today?: string;
				late?: string;
				complete?: string;
				upcoming?: string;
				active?: string;
			} & Record<string, TeamworkJsonValue>;
			projects?: {
				starred?: string;
				late?: string;
				count?: string;
				archived?: string;
				upcoming?: string;
				completed?: string;
				current?: string;
			} & Record<string, TeamworkJsonValue>;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_people_id_json: {
		person?: {
			startPage?: string;
			'site-owner'?: boolean;
			twitter?: string;
			'last-name'?: string;
			profile?: string;
			userUUID?: string;
			marketoId?: string;
			'user-name'?: string;
			id?: string;
			'phone-number-office'?: string;
			'phone-number-mobile'?: string;
			'user-type'?: string;
			'first-name'?: string;
			'im-service'?: string;
			'login-count'?: string;
			'im-handle'?: string;
			openId?: string;
			'private-notes-text'?: string;
			'phone-number-office-ext'?: string;
			twoFactorAuthEnabled?: boolean;
			'company-id'?: string;
			documentEditorInstalled?: boolean;
			'has-access-to-new-projects'?: boolean;
			'phone-number-fax'?: string;
			'last-login'?: string;
			companyId?: string;
			administrator?: boolean;
			pid?: string;
			'profile-text'?: string;
			'phone-number-home'?: string;
			integrations?: {
				microsoftConnector?: { enabled?: boolean } & Record<
					string,
					TeamworkJsonValue
				>;
			} & Record<string, TeamworkJsonValue>;
			'email-address'?: string;
			lengthOfDay?: string;
			tags?: Array<Record<string, TeamworkJsonValue>>;
			'private-notes'?: string;
			'company-name'?: string;
			'last-changed-on'?: string;
			deleted?: boolean;
			notes?: string;
			'phone-number-mobile-parts'?: {
				phone?: string;
				prefix?: string;
				countryCode?: string;
			} & Record<string, TeamworkJsonValue>;
			permissions?: {
				'can-manage-people'?: boolean;
				'can-add-projects'?: boolean;
				'can-access-templates'?: boolean;
				canAccessCalendar?: boolean;
				canViewProjectTemplates?: boolean;
				canManageCustomFields?: boolean;
				canManageProjectTemplates?: boolean;
			} & Record<string, TeamworkJsonValue>;
			'user-invited-status'?: string;
			address?: {
				zipcode?: string;
				countrycode?: string;
				state?: string;
				line1?: string;
				country?: string;
				line2?: string;
				city?: string;
			} & Record<string, TeamworkJsonValue>;
			'has-desk-account'?: boolean;
			'created-at': string;
			'user-invited-date'?: string;
			'avatar-url'?: string;
			'in-owner-company'?: string;
			'user-invited'?: string;
			'email-alt-1'?: string;
			'email-alt-2'?: string;
			'email-alt-3'?: string;
		} & Record<string, TeamworkJsonValue>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_put_people_id_json: { id?: number; STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_people_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_people_apikeys_json: {
		people?: Array<
			{
				userAPIKey?: string;
				'first-name'?: string;
				'company-name'?: string;
				id?: string;
				'in-owner-company'?: boolean;
				'last-name'?: string;
				companyId?: string;
				'email-address'?: string;
				'company-id'?: string;
			} & Record<string, TeamworkJsonValue>
		>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_people_deleted_json: {
		people?: Array<
			{
				avatarUrl?: string;
				deletedByUserFirstName?: string;
				companyName?: string;
				deletedByUserId?: string;
				deletedByUserLastName?: string;
				isInOwnerCompany?: boolean;
				firstName?: string;
				userType?: string;
				id?: string;
				deletedDateTime?: string;
				emailAddress?: string;
				companyId?: string;
				lastName?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_statuses_json: {
		userStatuses?: Array<
			{
				geoipLocation?: string;
				'posted-on'?: string;
				'first-name'?: string;
				'avatar-url'?: string;
				id?: string;
				'last-changed-on'?: string;
				status?: string;
				'last-name'?: string;
				userId?: string;
				isClockedIn?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_people_id_status_json: {
		userStatus?: {
			'first-name'?: string;
			'avatar-url'?: string;
			id?: string;
			status?: string;
			'last-name'?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_people_id_status_json: Record<string, TeamworkJsonValue>;
	v1_get_me_status_json: {
		userStatus?: {
			'first-name'?: string;
			'avatar-url'?: string;
			id?: string;
			status?: string;
			'last-name'?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_put_me_status_id_json: {
		userstatus?: { status?: string; notify?: string } & Record<
			string,
			TeamworkJsonValue
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_put_people_personid_status_statusid_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_people_personid_status_statusid_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_people_status_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_people_status_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_me_status_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_tasks_id_files_json: {
		project?: {
			company?: string;
			name?: string;
			files?: Array<
				{
					'project-id'?: string;
					filenameOnDisk?: string;
					'can-upload-new-version'?: boolean;
					'uploaded-date'?: string;
					'read-comments-count'?: string;
					extraData?: string;
					private?: string;
					'version-id'?: string;
					userFollowingComments?: boolean;
					'comments-count'?: string;
					status?: string;
					changeFollowerIds?: string;
					tags?: Array<Record<string, TeamworkJsonValue>>;
					version?: string;
					id?: string;
					'last-changed-on'?: string;
					commentFollowerIds?: string;
					shareable?: boolean;
					versions?: Array<Record<string, TeamworkJsonValue>>;
					thumbURL?: string;
					'uploaded-by-user-first-name'?: string;
					'uploaded-by-user-last-name'?: string;
					name?: string;
					'uploaded-by-userId'?: string;
					userFollowingChanges?: boolean;
					'category-id'?: string;
					originalName?: string;
					size?: string;
					'file-source'?: string;
					'category-name'?: string;
				} & Record<string, TeamworkJsonValue>
			>;
			id?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_tasks_id_files_json: {
		affectedTaskIds?: string;
		assignedFileIds?: Array<string>;
		STATUS?: string;
		existingFileIds?: Array<string>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_id_files_json: {
		project?: {
			company?: string;
			name?: string;
			files?: Array<
				{
					'project-id'?: string;
					'uploaded-by-user-last-name'?: string;
					name?: string;
					'uploaded-date'?: string;
					'uploaded-by-userId'?: string;
					extraData?: string;
					'comments-count'?: string;
					'version-id'?: string;
					private?: string;
					status?: string;
					'category-id'?: string;
					version?: string;
					originalName?: string;
					id?: string;
					'last-changed-on'?: string;
					size?: string;
					versions?: Array<Record<string, TeamworkJsonValue>>;
					thumbURL?: string;
					'file-source'?: string;
					'uploaded-by-user-first-name'?: string;
					'category-name'?: string;
				} & Record<string, TeamworkJsonValue>
			>;
			id?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_projects_id_files_json: { id?: string; STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_post_files_id_json: { id?: string; STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_files_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_files_id_sharedlink_json: { STATUS?: string; url?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_files_id_copy_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_projects_id_filecategories_json: {
		categories?: Array<
			{
				'project-id'?: string;
				'parent-id'?: string;
				name?: string;
				count?: string;
				id?: string;
				elements_count?: string;
				type?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_projects_id_filecategories_json: {
		id?: string;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_filecategories_id_json: {
		category?: {
			'project-id'?: string;
			'parent-id'?: string;
			name?: string;
			count?: string;
			id?: string;
			elements_count?: string;
			type?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_put_filecategories_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_filecategories_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_notebooks_json: {
		projects?: Array<
			{
				notebooks?: Array<
					{
						'project-id'?: string;
						'updated-by-userId'?: string;
						'read-comments-count'?: string;
						name?: string;
						'created-by-userfirstname'?: string;
						'comments-count'?: string;
						'version-id'?: string;
						private?: string;
						'lockdown-id'?: string;
						'updated-by-userlastname'?: string;
						'updated-date'?: string;
						'created-by-userId'?: string;
						'created-by-userlastname'?: string;
						'category-id'?: string;
						version?: string;
						'user-display-updated-date'?: string;
						'user-display-updated-time'?: string;
						id?: string;
						'nr-comments'?: string;
						'updated-by-userfirstname'?: string;
						'created-date'?: string;
						locked?: string;
						'category-name'?: string;
					} & Record<string, TeamworkJsonValue>
				>;
				name?: string;
				id?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_id_notebooks_json: {
		project?: {
			notebooks?: Array<
				{
					'project-id'?: string;
					'updated-by-userId'?: string;
					'read-comments-count'?: string;
					name?: string;
					'created-by-userfirstname'?: string;
					'comments-count'?: string;
					'version-id'?: string;
					private?: string;
					'lockdown-id'?: string;
					'updated-by-userlastname'?: string;
					'updated-date'?: string;
					'created-by-userId'?: string;
					'created-by-userlastname'?: string;
					'category-id'?: string;
					version?: string;
					'user-display-updated-date'?: string;
					'user-display-updated-time'?: string;
					id?: string;
					'nr-comments'?: string;
					'updated-by-userfirstname'?: string;
					'created-date'?: string;
					locked?: string;
					'category-name'?: string;
				} & Record<string, TeamworkJsonValue>
			>;
			name?: string;
			id?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_projects_id_notebooks_json: {
		id?: string;
		notebookId?: string;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_notebookcategories_id_notebooks_json: {
		projects?: Array<
			{
				notebooks?: Array<
					{
						'project-id'?: string;
						'updated-by-userId'?: string;
						'read-comments-count'?: string;
						name?: string;
						'created-by-userfirstname'?: string;
						'comments-count'?: string;
						'version-id'?: string;
						private?: string;
						'lockdown-id'?: string;
						'updated-by-userlastname'?: string;
						'updated-date'?: string;
						'created-by-userId'?: string;
						'created-by-userlastname'?: string;
						'category-id'?: string;
						version?: string;
						'user-display-updated-date'?: string;
						'user-display-updated-time'?: string;
						id?: string;
						'nr-comments'?: string;
						'updated-by-userfirstname'?: string;
						'created-date'?: string;
						locked?: string;
						'category-name'?: string;
					} & Record<string, TeamworkJsonValue>
				>;
				name?: string;
				id?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_notebooks_id_json: {
		notebook?: {
			'project-id'?: string;
			versionCreatedByUserFirstName?: string;
			'read-comments-count'?: string;
			versionCreatedDateTime?: string;
			commentNotifyIds?: string;
			'created-by-userfirstname'?: string;
			'comments-count'?: string;
			userFollowingComments?: boolean;
			'version-id'?: string;
			private?: string;
			'lockdown-id'?: string;
			'is-project-admin'?: string;
			'updated-date'?: string;
			changeFollowerIds?: string;
			'created-by-userlastname'?: string;
			grantAccessTo?: string;
			versionUpdatedDateTime?: string;
			tags?: Array<Record<string, TeamworkJsonValue>>;
			version?: string;
			'user-display-updated-date'?: string;
			content?: string;
			'user-display-updated-time'?: string;
			id?: string;
			commentFollowerIds?: string;
			'nr-comments'?: string;
			versionCreatedByUserId?: string;
			'created-date'?: string;
			'updated-by-userId'?: string;
			name?: string;
			userFollowingChanges?: boolean;
			combinedFollowersCount?: string;
			secureContent?: boolean;
			'updated-by-userlastname'?: string;
			'created-by-userId'?: string;
			'project-status'?: string;
			'category-id'?: string;
			'project-name'?: string;
			versionCreatedByUserLastName?: string;
			'notebook-type'?: string;
			'updated-by-userfirstname'?: string;
			versionCount?: string;
			locked?: string;
			'category-name'?: string;
		} & Record<string, TeamworkJsonValue>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_put_notebooks_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_notebooks_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_notebooks_id_lock_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_notebooks_id_unlock_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_notebooks_id_copy_json: { id?: string; STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_notebooks_id_move_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_projects_id_notebookcategories_json: {
		categories?: Array<
			{
				'project-id'?: string;
				'parent-id'?: string;
				name?: string;
				count?: string;
				id?: string;
				elements_count?: string;
				type?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_projects_id_notebookcategories_json: {
		id?: string;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_notebookcategories_id_json: {
		category?: {
			'project-id'?: string;
			'parent-id'?: string;
			name?: string;
			count?: string;
			id?: string;
			elements_count?: string;
			type?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_put_notebookcategories_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_notebookcategories_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_projects_id_links_json: {
		project?: {
			links?: Array<
				{
					'project-id'?: string;
					name?: string;
					'created-by-userfirstname'?: string;
					height?: string;
					private?: string;
					width?: string;
					'created-by-userId'?: string;
					'created-by-userlastname'?: string;
					'category-id'?: string;
					'open-in-new-window'?: string;
					id?: string;
					provider?: string;
					'created-date'?: string;
					'category-name'?: string;
					code?: string;
				} & Record<string, TeamworkJsonValue>
			>;
			name?: string;
			id?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_projects_id_links_json: {
		link?: {
			notify?: string;
			'notify-current-user'?: boolean;
			code?: string;
			'category-id'?: number;
			width?: string;
			height?: string;
			name?: string;
			tagIds?: string;
			'grant-access-to'?: string;
			private?: boolean;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_links_json: {
		projects?: Array<
			{
				links?: Array<
					{
						'project-id'?: string;
						name?: string;
						'created-by-userfirstname'?: string;
						height?: string;
						private?: string;
						width?: string;
						'created-by-userId'?: string;
						'created-by-userlastname'?: string;
						'category-id'?: string;
						'open-in-new-window'?: string;
						id?: string;
						provider?: string;
						'created-date'?: string;
						'category-name'?: string;
						code?: string;
					} & Record<string, TeamworkJsonValue>
				>;
				name?: string;
				id?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_links_id_json: {
		link?: {
			'project-id'?: string;
			commentNotifyIds?: string;
			'created-by-userfirstname'?: string;
			height?: string;
			'comments-count'?: string;
			private?: string;
			userFollowingComments?: boolean;
			'updated-date'?: string;
			changeFollowerIds?: string;
			'created-by-userlastname'?: string;
			tags?: Array<Record<string, TeamworkJsonValue>>;
			canEdit?: boolean;
			userDisplayUpdatedTime?: string;
			id?: string;
			commentFollowerIds?: string;
			'created-date'?: string;
			code?: string;
			userDisplayUpdatedDate?: string;
			name?: string;
			userFollowingChanges?: boolean;
			combinedFollowersCount?: string;
			width?: string;
			'created-by-userId'?: string;
			'category-id'?: string;
			'project-name'?: string;
			'open-in-new-window'?: string;
			provider?: string;
			lockdownId?: string;
			'category-name'?: string;
		} & Record<string, TeamworkJsonValue>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_put_links_id_json: { STATUS?: string } & Record<string, TeamworkJsonValue>;
	v1_delete_links_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_projects_id_linkcategories_json: {
		categories?: Array<
			{
				'project-id'?: string;
				'parent-id'?: string;
				name?: string;
				count?: string;
				id?: string;
				elements_count?: string;
				type?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_projects_id_linkcategories_json: {
		id?: string;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_linkcategories_id_json: {
		category?: {
			'project-id'?: string;
			'parent-id'?: string;
			name?: string;
			count?: string;
			id?: string;
			elements_count?: string;
			type?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_delete_linkcategories_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_time_entries_json: {
		'time-entries'?: Array<
			{
				'project-id'?: string;
				isbillable?: string;
				tasklistId?: string;
				'todo-list-name'?: string;
				'todo-item-name'?: string;
				isbilled?: string;
				'updated-date'?: string;
				'todo-list-id'?: string;
				tags?: Array<Record<string, TeamworkJsonValue>>;
				canEdit?: boolean;
				taskEstimatedTime?: string;
				'company-name'?: string;
				id?: string;
				invoiceNo?: string;
				'person-last-name'?: string;
				parentTaskName?: string;
				dateUserPerspective?: string;
				minutes?: string;
				'person-first-name'?: string;
				'ticket-id'?: string;
				createdAt?: string;
				taskIsPrivate?: string;
				parentTaskId?: string;
				'company-id'?: string;
				'project-status'?: string;
				'person-id'?: string;
				'project-name'?: string;
				'task-tags'?: Array<Record<string, TeamworkJsonValue>>;
				taskIsSubTask?: string;
				'todo-item-id'?: string;
				date?: string;
				'has-start-time'?: string;
				hours?: string;
			} & Record<string, TeamworkJsonValue>
		>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_id_time_entries_json: {
		'time-entries'?: Array<
			{
				'project-id'?: string;
				minutes?: string;
				isbillable?: string;
				'person-first-name'?: string;
				'todo-list-name'?: string;
				'todo-item-name'?: string;
				'todo-list-id'?: string;
				tags?: Array<
					{ name?: string; id?: string; color?: string } & Record<
						string,
						TeamworkJsonValue
					>
				>;
				'company-id'?: string;
				'person-id'?: string;
				'project-status'?: string;
				'project-name'?: string;
				'company-name'?: string;
				id?: string;
				date?: string;
				'todo-item-id'?: string;
				invoiceNo?: string;
				'person-last-name'?: string;
				'has-start-time'?: string;
				hours?: string;
			} & Record<string, TeamworkJsonValue>
		>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_post_projects_id_time_entries_json: {
		timeLogId?: string;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_tasks_id_time_entries_json: {
		'time-entries'?: Array<
			{
				'project-id'?: string;
				isbillable?: string;
				tasklistId?: string;
				'todo-list-name'?: string;
				'todo-item-name'?: string;
				isbilled?: string;
				'updated-date'?: string;
				'todo-list-id'?: string;
				tags?: Array<Record<string, TeamworkJsonValue>>;
				canEdit?: boolean;
				taskEstimatedTime?: string;
				'company-name'?: string;
				id?: string;
				invoiceNo?: string;
				'person-last-name'?: string;
				parentTaskName?: string;
				dateUserPerspective?: string;
				minutes?: string;
				'person-first-name'?: string;
				'ticket-id'?: string;
				createdAt?: string;
				taskIsPrivate?: string;
				parentTaskId?: string;
				'company-id'?: string;
				'project-status'?: string;
				'person-id'?: string;
				'project-name'?: string;
				'task-tags'?: Array<Record<string, TeamworkJsonValue>>;
				taskIsSubTask?: string;
				'todo-item-id'?: string;
				date?: string;
				'has-start-time'?: string;
				hours?: string;
			} & Record<string, TeamworkJsonValue>
		>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_post_tasks_id_time_entries_json: { id?: number; STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_time_entries_id_json: {
		STATUS?: string;
		'time-entry'?: {
			isbillable?: string;
			'project-id'?: string;
			tasklistId?: string;
			'todo-list-name'?: string;
			'todo-item-name'?: string;
			isbilled?: string;
			'updated-date'?: string;
			'todo-list-id'?: string;
			canEdit?: boolean;
			tags?: Array<
				{ name?: string; id?: string; color?: string } & Record<
					string,
					TeamworkJsonValue
				>
			>;
			taskEstimatedTime?: string;
			'company-name'?: string;
			id?: string;
			invoiceNo?: string;
			'person-last-name'?: string;
			parentTaskName?: string;
			dateUserPerspective?: string;
			minutes?: string;
			'person-first-name'?: string;
			'ticket-id'?: string;
			createdAt?: string;
			taskIsPrivate?: string;
			parentTaskId?: string;
			'company-id'?: string;
			'project-status'?: string;
			'person-id'?: string;
			'project-name'?: string;
			'task-tags'?: Array<Record<string, TeamworkJsonValue>>;
			taskIsSubTask?: string;
			date?: string;
			'todo-item-id'?: string;
			'has-start-time'?: string;
			hours?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_put_time_entries_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_time_entries_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_projects_id_time_total_json: {
		STATUS?: string;
		projects?: Array<
			{
				company?: { name?: string; id?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				'time-estimates'?: {
					'filtered-estimated-hours-sum'?: string;
					'total-hours-estimated'?: string;
					'active-mins-estimated'?: string;
					'total-mins-estimated'?: string;
					totalWithTimeLoggedEstimatedMins?: string;
					'active-hours-estimated'?: string;
					'filtered-estimated-mins-sum'?: string;
					'completed-hours-estimated'?: string;
					'completed-mins-estimated'?: string;
					totalWithTimeLoggedEstimatedDecimal?: string;
				} & Record<string, TeamworkJsonValue>;
				name?: string;
				id?: string;
				'time-totals'?: {
					'total-mins-sum'?: string;
					'non-billed-mins-sum'?: string;
					'filtered-estimated-hours-sum'?: string;
					'non-billable-hours-sum'?: string;
					'total-hours-sum'?: string;
					'billed-mins-sum'?: string;
					'billed-hours-sum'?: string;
					'billable-hours-sum'?: string;
					'filtered-estimated-mins-sum'?: string;
					'non-billable-mins-sum'?: string;
					'non-billed-hours-sum'?: string;
					'billable-mins-sum'?: string;
				} & Record<string, TeamworkJsonValue>;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_time_total_json: {
		STATUS?: string;
		'time-totals'?: {
			'total-mins-sum'?: string;
			'non-billed-mins-sum'?: string;
			'non-billable-hours-sum'?: string;
			'total-hours-sum'?: string;
			'billed-mins-sum'?: string;
			'billed-hours-sum'?: string;
			'billable-hours-sum'?: string;
			'non-billable-mins-sum'?: string;
			'non-billed-hours-sum'?: string;
			'billable-mins-sum'?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_time_total_json: {
		STATUS?: string;
		projects?: Array<
			{
				company?: { name?: string; id?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				name?: string;
				totalNonBilledMins?: string;
				totalBillableHours?: string;
				totalBillableMins?: string;
				totalNonBillableMins?: string;
				totalMins?: string;
				totalNonBillableHours?: string;
				totalBilledHours?: string;
				totalHours?: string;
				totalNonBilledHours?: string;
				id?: string;
				totalBilledTime?: string;
				totalBilledMins?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_estimatedtime_total_json: {
		STATUS?: string;
		projects?: Array<
			{
				company?: { name?: string; id?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				name?: string;
				totalEstimatedMins?: string;
				totalEstimatedHours?: string;
				id?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_tasklists_id_time_total_json: {
		STATUS?: string;
		projects?: Array<
			{
				company?: { name?: string; id?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				name?: string;
				tasklist?: {
					'time-estimates'?: {
						'total-hours-estimated'?: string;
						'active-mins-estimated'?: string;
						'total-mins-estimated'?: string;
						'active-hours-estimated'?: string;
						'completed-hours-estimated'?: string;
						'completed-mins-estimated'?: string;
					} & Record<string, TeamworkJsonValue>;
					name?: string;
					id?: string;
					'time-totals'?: {
						'total-mins-sum'?: string;
						'non-billed-mins-sum'?: string;
						'non-billable-hours-sum'?: string;
						'total-hours-sum'?: string;
						'billed-mins-sum'?: string;
						'billed-hours-sum'?: string;
						'billable-hours-sum'?: string;
						'non-billable-mins-sum'?: string;
						'non-billed-hours-sum'?: string;
						'billable-mins-sum'?: string;
					} & Record<string, TeamworkJsonValue>;
				} & Record<string, TeamworkJsonValue>;
				id?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_tasks_id_time_total_json: {
		STATUS?: string;
		projects?: Array<
			{
				company?: { name?: string; id?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				name?: string;
				tasklist?: {
					name?: string;
					task?: {
						'time-estimates'?: {
							'total-hours-estimated'?: string;
							'active-mins-estimated'?: string;
							'total-mins-estimated'?: string;
							'active-hours-estimated'?: string;
							'completed-hours-estimated'?: string;
							'completed-mins-estimated'?: string;
						} & Record<string, TeamworkJsonValue>;
						name?: string;
						id?: string;
						'time-totals'?: {
							'total-mins-sum'?: string;
							'non-billed-mins-sum'?: string;
							'non-billable-hours-sum'?: string;
							'total-hours-sum'?: string;
							'billed-mins-sum'?: string;
							'billed-hours-sum'?: string;
							'billable-hours-sum'?: string;
							'non-billable-mins-sum'?: string;
							'non-billed-hours-sum'?: string;
							'billable-mins-sum'?: string;
						} & Record<string, TeamworkJsonValue>;
					} & Record<string, TeamworkJsonValue>;
					id?: string;
				} & Record<string, TeamworkJsonValue>;
				id?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_people_id_loggedtime_json: {
		STATUS?: string;
		user?: {
			billable?: Array<Record<string, TeamworkJsonValue>>;
			firstname?: string;
			nonbillable?: Array<Record<string, TeamworkJsonValue>>;
			endepoch?: string;
			id?: string;
			startepoch?: string;
			lastname?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_timers_json: {
		timers?: Array<
			{
				dateDeleted?: string;
				serverTime?: string;
				intervals?: Array<
					{
						to?: string;
						from?: string;
						id?: string;
						duration?: string;
					} & Record<string, TeamworkJsonValue>
				>;
				dateUpdated?: string;
				projectName?: string;
				projectId?: string;
				billable?: boolean;
				running?: boolean;
				id?: string;
				taskName?: string;
				lastStartedAt?: string;
				taskId?: string;
				dateCreated?: string;
				duration?: string;
				deleted?: boolean;
				userId?: string;
			} & Record<string, TeamworkJsonValue>
		>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_me_timers_json: {
		timers?: Array<
			{
				dateDeleted?: string;
				serverTime?: string;
				intervals?: Array<
					{
						to?: string;
						from?: string;
						id?: string;
						duration?: string;
					} & Record<string, TeamworkJsonValue>
				>;
				dateUpdated?: string;
				projectName?: string;
				projectId?: string;
				billable?: boolean;
				running?: boolean;
				id?: string;
				taskName?: string;
				lastStartedAt?: string;
				taskId?: string;
				dateCreated?: string;
				duration?: string;
				deleted?: boolean;
				userId?: string;
			} & Record<string, TeamworkJsonValue>
		>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_people_id_timers_json: {
		timers?: Array<
			{
				dateDeleted?: string;
				serverTime?: string;
				intervals?: Array<
					{
						to?: string;
						from?: string;
						id?: string;
						duration?: string;
					} & Record<string, TeamworkJsonValue>
				>;
				dateUpdated?: string;
				projectName?: string;
				projectId?: string;
				billable?: boolean;
				running?: boolean;
				id?: string;
				taskName?: string;
				lastStartedAt?: string;
				taskId?: string;
				dateCreated?: string;
				duration?: string;
				deleted?: boolean;
				userId?: string;
			} & Record<string, TeamworkJsonValue>
		>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_put_tasks_id_estimatedtime_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_comments_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_comments_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_resource_resourceid_comments_json: {
		comments?: Array<
			{
				'project-id'?: string;
				attachments_count?: string;
				'author-lastname'?: string;
				'commentable-id'?: string;
				commentable_type?: string;
				'emailed-from'?: string;
				isRead?: string;
				private?: string;
				'lockdown-id'?: string;
				datetime?: string;
				'author-avatar-url'?: string;
				author_id?: string;
				id?: string;
				'company-name'?: string;
				'last-changed-on'?: string;
				'content-type'?: string;
				'nr-notified-people'?: string;
				type?: string;
				'item-name'?: string;
				'attachments-count'?: string;
				_author_id?: { deprecated?: boolean } & Record<
					string,
					TeamworkJsonValue
				>;
				'company-id'?: string;
				'html-body'?: string;
				'project-name'?: string;
				body?: string;
				commentNo?: string;
				attachments?: Array<Record<string, TeamworkJsonValue>>;
				'author-firstname'?: string;
				'comment-link'?: string;
				'author-id'?: string;
			} & Record<string, TeamworkJsonValue>
		>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_post_resource_resourceid_comments_json: {
		id?: string;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_comments_json: {
		comments?: Array<
			{
				'project-id'?: string;
				attachments_count?: string;
				'author-lastname'?: string;
				'commentable-id'?: string;
				commentable_type?: string;
				'emailed-from'?: string;
				isRead?: string;
				private?: string;
				'lockdown-id'?: string;
				datetime?: string;
				'author-avatar-url'?: string;
				author_id?: string;
				id?: string;
				'company-name'?: string;
				'last-changed-on'?: string;
				'content-type'?: string;
				'nr-notified-people'?: string;
				type?: string;
				'item-name'?: string;
				'attachments-count'?: string;
				_author_id?: { deprecated?: boolean } & Record<
					string,
					TeamworkJsonValue
				>;
				'company-id'?: string;
				'html-body'?: string;
				'project-name'?: string;
				body?: string;
				commentNo?: string;
				attachments?: Array<Record<string, TeamworkJsonValue>>;
				'author-firstname'?: string;
				'comment-link'?: string;
				'author-id'?: string;
			} & Record<string, TeamworkJsonValue>
		>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_put_comments_id_markread_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_projects_id_boards_columns_json: {
		columns?: Array<
			{
				name?: string;
				displayOrder?: string;
				sortOrder?: string;
				deletedDate?: string;
				dateUpdated?: string;
				settings?: {
					avatar?: boolean;
					time?: boolean;
					name?: boolean;
					files?: boolean;
					comments?: boolean;
					priority?: boolean;
					progress?: boolean;
					subtasktext?: boolean;
					tasklist?: boolean;
					private?: boolean;
					reminders?: boolean;
					assignee?: boolean;
					dependencies?: boolean;
					tags?: boolean;
					estimatedtime?: boolean;
					startdate?: boolean;
					tickets?: boolean;
					followers?: boolean;
					recurring?: boolean;
					subtasklabel?: boolean;
					parenttask?: boolean;
					enddate?: boolean;
				} & Record<string, TeamworkJsonValue>;
				defaultTasklist?: {
					newTaskDefaults?: Record<string, TeamworkJsonValue>;
					name?: string;
					id?: string;
				} & Record<string, TeamworkJsonValue>;
				projectId?: string;
				stats?: {
					estimatedTime?: string;
					total?: string;
					completed?: string;
					active?: string;
				} & Record<string, TeamworkJsonValue>;
				hasTriggers?: boolean;
				sort?: string;
				canEdit?: boolean;
				triggers?: Array<Record<string, TeamworkJsonValue>>;
				id?: string;
				dateCreated?: string;
				color?: string;
				deleted?: boolean;
				canAddCards?: boolean;
			} & Record<string, TeamworkJsonValue>
		>;
		people?: {
			'123'?: {
				company?: { name?: string; id?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				avatarUrl?: string;
				firstName?: string;
				id?: string;
				lastName?: string;
			} & Record<string, TeamworkJsonValue>;
		} & Record<string, TeamworkJsonValue>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_post_projects_id_boards_columns_json: {
		id?: string;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_boards_columns_id_cards_json: {
		people?: {
			'12345'?: {
				company?: { name?: string; id?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				avatarUrl?: string;
				firstName?: string;
				id?: string;
				lastName?: string;
			} & Record<string, TeamworkJsonValue>;
		} & Record<string, TeamworkJsonValue>;
		STATUS?: string;
		column?: { name?: string; id?: string; color?: string } & Record<
			string,
			TeamworkJsonValue
		>;
		cards?: Array<
			{
				dueDate?: string;
				canComplete?: boolean;
				numComments?: string;
				taskListId?: string;
				displayOrder?: string;
				hasTickets?: boolean;
				archived?: boolean;
				deletedDate?: string;
				dateUpdated?: string;
				dateCompleted?: string;
				private?: string;
				projectId?: string;
				status?: string;
				numPredecessors?: string;
				numDependencies?: string;
				numAttachments?: string;
				canEdit?: boolean;
				tags?: Array<Record<string, TeamworkJsonValue>>;
				startDate?: string;
				id?: string;
				hasLoggedTime?: boolean;
				dateCreated?: string;
				completed?: boolean;
				estimatedMinutes?: string;
				deleted?: boolean;
				taskListName?: string;
				taskStatus?: string;
				columnId?: string;
				name?: string;
				priority?: string;
				progress?: string;
				parentTaskId?: string;
				numActiveSubTasks?: string;
				assignedPeople?: Array<string>;
				taskId?: string;
				isRecurring?: boolean;
				hasUnreadComments?: boolean;
				archivedDate?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_put_boards_columns_cards_id_move_json: Record<string, TeamworkJsonValue>;
	v1_put_boards_columns_cards_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_boards_columns_cards_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_boards_columns_cards_id_json: {
		card?: {
			dueDate?: string;
			canComplete?: boolean;
			numComments?: string;
			taskListId?: string;
			displayOrder?: string;
			hasTickets?: boolean;
			archived?: boolean;
			deletedDate?: string;
			dateCompleted?: string;
			dateUpdated?: string;
			private?: string;
			projectId?: string;
			status?: string;
			numPredecessors?: string;
			numDependencies?: string;
			numAttachments?: string;
			tags?: Array<Record<string, TeamworkJsonValue>>;
			canEdit?: boolean;
			startDate?: string;
			id?: string;
			hasLoggedTime?: boolean;
			dateCreated?: string;
			completed?: boolean;
			estimatedMinutes?: string;
			deleted?: boolean;
			taskStatus?: string;
			taskListName?: string;
			columnId?: string;
			name?: string;
			progress?: string;
			priority?: string;
			projectName?: string;
			hasReminders?: boolean;
			parentTaskId?: string;
			column?: { name?: string; id?: string; color?: string } & Record<
				string,
				TeamworkJsonValue
			>;
			hasRemindersForUser?: boolean;
			numActiveSubTasks?: string;
			assignedPeople?: Array<string>;
			taskId?: string;
			isRecurring?: boolean;
			hasUnreadComments?: boolean;
			archivedDate?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_delete_boards_columns_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_boards_columns_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_boards_columns_id_json: {
		STATUS?: string;
		column?: {
			name?: string;
			displayOrder?: string;
			sortOrder?: string;
			deletedDate?: string;
			dateUpdated?: string;
			settings?: {
				time?: boolean;
				avatar?: boolean;
				name?: boolean;
				files?: boolean;
				comments?: boolean;
				priority?: boolean;
				progress?: boolean;
				subtasktext?: boolean;
				tasklist?: boolean;
				private?: boolean;
				reminders?: boolean;
				assignee?: boolean;
				dependencies?: boolean;
				tags?: boolean;
				estimatedtime?: boolean;
				startdate?: boolean;
				tickets?: boolean;
				followers?: boolean;
				recurring?: boolean;
				subtasklabel?: boolean;
				enddate?: boolean;
			} & Record<string, TeamworkJsonValue>;
			defaultTasklist?: {
				newTaskDefaults?: Record<string, TeamworkJsonValue>;
				name?: string;
				id?: string;
			} & Record<string, TeamworkJsonValue>;
			projectId?: string;
			hasTriggers?: boolean;
			sort?: string;
			canEdit?: boolean;
			id?: string;
			dateCreated?: string;
			color?: string;
			deleted?: boolean;
			canAddCards?: boolean;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_portfolio_boards_json: {
		STATUS?: string;
		boards?: Array<
			{
				canEdit?: boolean;
				name?: string;
				displayOrder?: string;
				deletedDate?: string;
				id?: string;
				dateCreated?: string;
				color?: string;
				stats?: { projects?: string } & Record<string, TeamworkJsonValue>;
				deleted?: boolean;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_portfolio_boards_json: { STATUS?: string; id?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_portfolio_boards_boardid_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_portfolio_boards_boardid_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_portfolio_boards_boardid_columns_json: {
		columns?: Array<
			{
				name?: string;
				displayOrder?: string;
				sortOrder?: string;
				deletedDate?: string;
				dateUpdated?: string;
				settings?: {
					company?: boolean;
					category?: boolean;
					starred?: boolean;
					tags?: boolean;
					name?: boolean;
					dates?: boolean;
				} & Record<string, TeamworkJsonValue>;
				hasTriggers?: boolean;
				sort?: string;
				canEdit?: boolean;
				id?: string;
				dateCreated?: string;
				color?: string;
				deleted?: boolean;
			} & Record<string, TeamworkJsonValue>
		>;
		board?: {
			name?: string;
			id?: string;
			color?: string;
			deleted?: boolean;
		} & Record<string, TeamworkJsonValue>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_post_portfolio_boards_boardid_columns_json: {
		id?: string;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_portfolio_columns_columnid_cards_json: {
		STATUS?: string;
		column?: { name?: string; id?: string; color?: string } & Record<
			string,
			TeamworkJsonValue
		>;
		cards?: Array<
			{
				company?: { name?: string; id?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				starred?: boolean;
				name?: string;
				columnId?: string;
				boardId?: string;
				displayOrder?: string;
				archived?: boolean;
				deletedDate?: string;
				dateUpdated?: string;
				projectId?: string;
				status?: string;
				category?: { name?: string; id?: string; color?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				canEdit?: boolean;
				tags?: Array<Record<string, TeamworkJsonValue>>;
				startDate?: string;
				id?: string;
				dateCreated?: string;
				deleted?: boolean;
				endDate?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_portfolio_columns_columnid_cards_json: {
		cardId?: string;
		projectId?: string;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_portfolio_cards_cardid_json: {
		STATUS?: string;
		column?: { color?: string; id?: string; name?: string } & Record<
			string,
			TeamworkJsonValue
		>;
		card?: {
			canEdit?: boolean;
			startDate?: string;
			boardId?: string;
			starred?: boolean;
			displayOrder?: string;
			deleted?: boolean;
			columnId?: string;
			name?: string;
			endDate?: string;
			company?: { id?: string; name?: string } & Record<
				string,
				TeamworkJsonValue
			>;
			dateUpdated?: string;
			status?: string;
			owner?: {
				lastName?: string;
				firstName?: string;
				id?: string;
				fullName?: string;
				avatarUrl?: string;
			} & Record<string, TeamworkJsonValue>;
			deletedDate?: string;
			projectId?: string;
			category?: { color?: string; id?: string; name?: string } & Record<
				string,
				TeamworkJsonValue
			>;
			progress?: Record<string, TeamworkJsonValue>;
			update?: {
				deletedDate?: string;
				projectId?: string;
				color?: string;
				text?: string;
				id?: string;
				health?: string;
				deleted?: boolean;
				user?: {
					lastName?: string;
					firstName?: string;
					id?: string;
					fullName?: string;
					avatarUrl?: string;
				} & Record<string, TeamworkJsonValue>;
				dateCreated?: string;
			} & Record<string, TeamworkJsonValue>;
			id?: string;
			archived?: boolean;
			dateCreated?: string;
			tags?: Array<Record<string, TeamworkJsonValue>>;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_delete_portfolio_cards_cardid_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_portfolio_cards_cardid_move_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_delete_portfolio_columns_columnid_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_portfolio_columns_columnid_json: {
		STATUS?: string;
		column?: {
			name?: string;
			displayOrder?: string;
			sortOrder?: string;
			deletedDate?: string;
			dateUpdated?: string;
			settings?: {
				company?: boolean;
				update?: boolean;
				category?: boolean;
				starred?: boolean;
				tags?: boolean;
				name?: boolean;
				progress?: boolean;
				dates?: boolean;
				owner?: boolean;
			} & Record<string, TeamworkJsonValue>;
			hasTriggers?: boolean;
			sort?: string;
			canEdit?: boolean;
			id?: string;
			dateCreated?: string;
			color?: string;
			deleted?: boolean;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_projectid_updates_json: {
		update?: {
			deletedDate?: string;
			text?: string;
			health?: string;
			id?: string;
			dateCreated?: string;
			projectId?: string;
			color?: string;
			deleted?: boolean;
			user?: {
				avatarUrl?: string;
				firstName?: string;
				fullName?: string;
				id?: string;
				lastName?: string;
			} & Record<string, TeamworkJsonValue>;
			projectStatus?: string;
		} & Record<string, TeamworkJsonValue>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_projectid_update_json: {
		update?: {
			deletedDate?: string;
			text?: string;
			health?: string;
			id?: string;
			dateCreated?: string;
			projectId?: string;
			color?: string;
			deleted?: boolean;
			user?: {
				avatarUrl?: string;
				firstName?: string;
				fullName?: string;
				id?: string;
				lastName?: string;
			} & Record<string, TeamworkJsonValue>;
			projectStatus?: string;
		} & Record<string, TeamworkJsonValue>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_post_projects_projectid_update_json: {
		updateId?: string;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_put_projects_updates_updateid_json: {
		updateId?: string;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_delete_projects_updates_updateid_json: {
		updateId?: string;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_put_projects_projectid_update_request_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_post_projects_projectid_people_personid_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_projects_projectid_people_personid_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_projects_projectid_people_personid_json: {
		people?: Array<
			{
				administrator?: boolean;
				'address-city'?: string;
				pid?: string;
				'site-owner'?: boolean;
				twitter?: string;
				'phone-number-home'?: string;
				'last-name'?: string;
				'email-address'?: string;
				userUUID?: string;
				'user-name'?: string;
				'company-name'?: string;
				id?: string;
				'last-changed-on'?: string;
				'phone-number-office'?: string;
				deleted?: boolean;
				'address-state'?: string;
				'address-country'?: string;
				notes?: string;
				'phone-number-mobile'?: string;
				'first-name'?: string;
				'user-type'?: string;
				permissions?: {
					'add-tasks'?: string;
					'view-time'?: string;
					'add-messages'?: string;
					'view-messages-and-files'?: string;
					'view-estimated-time'?: string;
					'view-tasks-and-milestones'?: string;
					'add-links'?: string;
					'view-notebooks'?: string;
					'view-invoices'?: string;
					'edit-all-tasks'?: string;
					'set-privacy'?: string;
					'add-milestones'?: string;
					'add-time'?: string;
					'is-observing'?: string;
					'view-all-time-logs'?: string;
					'add-taskLists'?: string;
					'project-administrator'?: string;
					'can-be-assigned-to-tasks-and-milestones'?: string;
					'view-links'?: string;
					'add-files'?: string;
					'can-receive-email'?: string;
					'add-notebooks'?: string;
					'add-people-to-project'?: string;
					'view-risk-register'?: string;
				} & Record<string, TeamworkJsonValue>;
				'im-service'?: string;
				'im-handle'?: string;
				'address-line-2'?: string;
				'address-line-1'?: string;
				'created-at'?: string;
				'phone-number-office-ext'?: string;
				'company-id'?: string;
				'has-access-to-new-projects'?: boolean;
				'address-zip'?: string;
				'phone-number-fax'?: string;
				'avatar-url'?: string;
				'in-owner-company'?: boolean;
				'last-login'?: string;
				'email-alt-1'?: string;
				'email-alt-2'?: string;
				companyId?: string;
				'email-alt-3'?: string;
			} & Record<string, TeamworkJsonValue>
		>;
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_id_roles_json: {
		roles?: Array<
			{
				users?: Array<
					{
						firstname?: string;
						id?: string;
						userimage?: string;
						lastname?: string;
					} & Record<string, TeamworkJsonValue>
				>;
				name?: string;
				id?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_roles_id_json: {
		role?: {
			users?: Array<
				{
					firstname?: string;
					id?: string;
					userimage?: string;
					lastname?: string;
				} & Record<string, TeamworkJsonValue>
			>;
			name?: string;
			id?: string;
			projectId?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_put_roles_id_json: { STATUS?: string } & Record<string, TeamworkJsonValue>;
	v1_delete_roles_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_comments_commentid_reactions_json: {
		STATUS?: string;
		reactions?: Array<
			{
				avatarURL?: string;
				firstName?: string;
				fullName?: string;
				reactionType?: string;
				postedOn?: string;
				companyName?: string;
				id?: string;
				companyId?: string;
				lastName?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_projects_updates_updateid_reactions_json: {
		STATUS?: string;
		update?: {
			deletedDate?: string;
			projectId?: string;
			color?: string;
			projectStatus?: string;
			text?: string;
			id?: string;
			health?: string;
			deleted?: boolean;
			user?: {
				lastName?: string;
				firstName?: string;
				id?: string;
				fullName?: string;
				avatarUrl?: string;
			} & Record<string, TeamworkJsonValue>;
			dateCreated?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_put_comments_commentid_react_json: {
		STATUS?: string;
		reactions?: {
			counts?: {
				heart?: string;
				like?: string;
				joy?: string;
				frown?: string;
				dislike?: string;
			} & Record<string, TeamworkJsonValue>;
			mine?: Array<string>;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_put_projects_updates_updateid_react_json: {
		STATUS?: string;
		reactions?: {
			counts?: {
				heart?: string;
				like?: string;
				joy?: string;
				frown?: string;
				dislike?: string;
			} & Record<string, TeamworkJsonValue>;
			mine?: Array<string>;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_put_resource_id_unreact_json: {
		STATUS?: string;
		reactions?: {
			counts?: {
				heart?: string;
				like?: string;
				joy?: string;
				frown?: string;
				dislike?: string;
			} & Record<string, TeamworkJsonValue>;
			mine?: Array<Record<string, TeamworkJsonValue>>;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v1_post_projects_template_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_teams_json: TeamworkV1Output_TeamsMultipleResponse;
	v1_post_teams_json: {
		id?: string;
		STATUS?: string;
		user?: { id?: string; name?: string; handle?: string } & Record<
			string,
			TeamworkJsonValue
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_delete_teams_json: { STATUS?: string } & Record<string, TeamworkJsonValue>;
	v1_get_teams_id_json: TeamworkV1Output_TeamsSingleResponse;
	v1_put_teams_id_json: {
		id?: string;
		STATUS?: string;
		user?: { id?: string; name?: string; handle?: string } & Record<
			string,
			TeamworkJsonValue
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_delete_teams_id_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_put_teams_id_people_json: { STATUS?: string } & Record<
		string,
		TeamworkJsonValue
	>;
	v1_get_projects_id_teams_json: TeamworkV1Output_TeamsPickerResponse;
	v1_post_projects_id_teams_json: {
		id?: string;
		STATUS?: string;
		user?: { id?: string; name?: string; handle?: string } & Record<
			string,
			TeamworkJsonValue
		>;
	} & Record<string, TeamworkJsonValue>;
	v1_get_companies_id_teams_json: TeamworkV1Output_TeamsMultipleResponse;
	v1_get_milestones_id_teams_json: TeamworkV1Output_TeamsPickerResponse;
	v1_get_notebooks_id_teams_json: TeamworkV1Output_TeamsPickerResponse;
	v1_get_tasks_id_teams_json: TeamworkV1Output_TeamsPickerResponse;
	v1_get_files_id_teams_json: TeamworkV1Output_TeamsPickerResponse;
	v1_get_tasklists_id_teams_json: TeamworkV1Output_TeamsPickerResponse;
	v1_get_links_id_teams_json: TeamworkV1Output_TeamsPickerResponse;
	v1_get_portfolio_boards_id_teams_json: TeamworkV1Output_TeamsPickerResponse;
	v1_get_comments_id_teams_json: TeamworkV1Output_TeamsPickerResponse;
	v1_get_teams_id_subteams_json: TeamworkV1Output_TeamsMultipleResponse;
	v1_get_people_id_teams_json: TeamworkV1Output_TeamsMultipleResponse;
	v1_get_milestones_id_comments_teams_json: TeamworkV1Output_TeamsPickerResponse;
	v1_get_notebooks_id_comments_teams_json: TeamworkV1Output_TeamsPickerResponse;
	v1_get_tasks_id_comments_teams_json: TeamworkV1Output_TeamsPickerResponse;
	v1_get_files_id_comments_teams_json: TeamworkV1Output_TeamsPickerResponse;
	v1_get_tasklists_id_comments_teams_json: TeamworkV1Output_TeamsPickerResponse;
	v1_get_links_id_comments_teams_json: TeamworkV1Output_TeamsPickerResponse;
	v1_get_teams_users_json: {
		teams?: { teamId?: Array<string> } & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
};
