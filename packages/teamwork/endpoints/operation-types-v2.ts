import type { TeamworkJsonValue } from './operation-types';

export type TeamworkV2Inputs = {
	v2_get_projects_api_v2_projects_templates_json: {
		path?: Record<string, never>;
		query?: {
			searchTerm?: string;
			orderBy?: string;
			projectOwnerIds?: string;
			projectTagIds?: string;
		};
		body?: never;
	};
	v2_get_projects_api_v2_projects_id_predecessors_json: {
		path: { id: number };
		query?: {
			includeDependencies?: boolean;
			onlyDependencies?: boolean;
			onlyBasicFields?: boolean;
			onlyActionable?: boolean;
			dataSet?: string;
			page?: string;
			pageSize?: string;
		};
		body?: never;
	};
	v2_get_projects_api_v2_tasklists_id_taskids_json: {
		path: { id: number };
		query?: {
			filter?:
				| 'all'
				| 'anytime'
				| 'overdue'
				| 'today'
				| 'yesterday'
				| 'tomorrow'
				| 'thisweek'
				| 'within7'
				| 'within14'
				| 'within30'
				| 'within365'
				| 'nodate'
				| 'noduedate'
				| 'started'
				| 'nostartdate'
				| 'completed'
				| 'created'
				| 'newTaskDefaults'
				| 'hasDate';
			filterText?: Array<string>;
			responsiblePartyIds?: Array<number>;
			creatorIds?: Array<number>;
			ignoreStartDates?: boolean;
			useStartDatesForTodaysTasks?: boolean;
			include?: string;
			includeToday?: boolean;
			includeBlockedTasks?: boolean;
			updatedAfterDate?: string;
			completedAfterDate?: string;
			completedBeforeDate?: string;
			sort?: string;
			sortOrder?: string;
			page?: number;
			pageSize?: number;
			offsetCount?: number;
			startDate?: string;
			endDate?: string;
			showDeleted?: boolean;
			includeTasksFromDeletedLists?: boolean;
			deletedAfterDate?: string;
			showCompletedLists?: boolean;
			includeCompletedSubtasks?: boolean;
			getSubTasks?: boolean;
			includeCompletedTasks?: boolean;
			includeTaskId?: number;
			projectIds?: Array<number>;
			projectStatus?: string;
			includeArchivedProjects?: boolean;
			projectHealths?: Array<number>;
			projectCategoryIds?: Array<number>;
			projectCompanyIds?: Array<number>;
			projectOwnerIds?: Array<number>;
			projectTagIds?: Array<number>;
			matchAllProjectTags?: boolean;
			onlyStarredProjects?: boolean;
			'follower-ids'?: Array<string>;
			tagIds?: Array<number>;
			createdAfterDate?: string;
			createdBeforeDate?: string;
			onlyTasksWithTickets?: boolean;
			onlyTasksWithUnreadComments?: boolean;
			includeUntaggedTasks?: boolean;
			onlyUntaggedTasks?: boolean;
			priority?: string;
			excludeTagIds?: Array<number>;
			onlyTasksWithEstimatedTime?: boolean;
			includeTasksWithoutDueDates?: boolean;
			assigneeCompanyIds?: Array<number>;
		};
		body?: never;
	};
	v2_get_projects_api_v2_projects_id_taskids_json: {
		path: { id: number };
		query?: {
			filter?:
				| 'all'
				| 'anytime'
				| 'overdue'
				| 'today'
				| 'yesterday'
				| 'tomorrow'
				| 'thisweek'
				| 'within7'
				| 'within14'
				| 'within30'
				| 'within365'
				| 'nodate'
				| 'noduedate'
				| 'started'
				| 'nostartdate'
				| 'completed'
				| 'created'
				| 'newTaskDefaults'
				| 'hasDate';
			filterText?: Array<string>;
			responsiblePartyIds?: Array<number>;
			creatorIds?: Array<number>;
			ignoreStartDates?: boolean;
			useStartDatesForTodaysTasks?: boolean;
			include?: string;
			includeToday?: boolean;
			includeBlockedTasks?: boolean;
			updatedAfterDate?: string;
			completedAfterDate?: string;
			completedBeforeDate?: string;
			sort?: string;
			sortOrder?: string;
			page?: number;
			pageSize?: number;
			offsetCount?: number;
			startDate?: string;
			endDate?: string;
			showDeleted?: boolean;
			includeTasksFromDeletedLists?: boolean;
			deletedAfterDate?: string;
			showCompletedLists?: boolean;
			includeCompletedSubtasks?: boolean;
			getSubTasks?: boolean;
			includeCompletedTasks?: boolean;
			includeTaskId?: number;
			projectIds?: Array<number>;
			projectStatus?: string;
			includeArchivedProjects?: boolean;
			projectHealths?: Array<number>;
			projectCategoryIds?: Array<number>;
			projectCompanyIds?: Array<number>;
			projectOwnerIds?: Array<number>;
			projectTagIds?: Array<number>;
			matchAllProjectTags?: boolean;
			onlyStarredProjects?: boolean;
			'follower-ids'?: Array<string>;
			tagIds?: Array<number>;
			createdAfterDate?: string;
			createdBeforeDate?: string;
			onlyTasksWithTickets?: boolean;
			onlyTasksWithUnreadComments?: boolean;
			includeUntaggedTasks?: boolean;
			onlyUntaggedTasks?: boolean;
			priority?: string;
			excludeTagIds?: Array<number>;
			onlyTasksWithEstimatedTime?: boolean;
			includeTasksWithoutDueDates?: boolean;
			assigneeCompanyIds?: Array<number>;
		};
		body?: never;
	};
	v2_get_projects_api_v2_projects_json: {
		path?: Record<string, never>;
		query: { page?: number; pageSize?: number; includeCustomFields: boolean };
		body?: never;
	};
	v2_get_projects_api_v2_tasks_json: {
		path?: Record<string, never>;
		query: { page?: number; pageSize?: number; includeCustomFields: boolean };
		body?: never;
	};
	v2_get_projects_api_v2_tasks_taskid_json: {
		path: { taskId: string };
		query: { includeCustomFields: boolean };
		body?: never;
	};
	v2_get_projects_api_v2_projects_projectid_json: {
		path: { projectId: string };
		query: { includeCustomFields: boolean };
		body?: never;
	};
};

export type TeamworkV2Outputs = {
	v2_get_projects_api_v2_projects_templates_json: {
		projects?: Array<
			{
				activePages?: {
					billing?: boolean;
					comments?: boolean;
					files?: boolean;
					links?: boolean;
					messages?: boolean;
					milestones?: boolean;
					notebooks?: boolean;
					riskRegister?: boolean;
					tasks?: boolean;
					time?: boolean;
				} & Record<string, TeamworkJsonValue>;
				activeUserIsProjectAdmin?: boolean;
				announcement?: string;
				announcementHTML?: string;
				category?: { color?: string; id?: number; name?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				company?: { id?: number; isOwner?: boolean; name?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				createdOn?: string;
				defaultPrivacy?: string;
				defaults?: { privacy?: string } & Record<string, TeamworkJsonValue>;
				directFileUploadsEnabled?: boolean;
				filesAutoNewVersion?: boolean;
				harvestTimersEnabled?: boolean;
				id?: number;
				integrations?: {
					microsoftConnectors?: { enabled?: boolean } & Record<
						string,
						TeamworkJsonValue
					>;
					oneDriveBusiness?: {
						account?: string;
						enabled?: boolean;
						folder?: string;
						folderName?: string;
					} & Record<string, TeamworkJsonValue>;
					sharepoint?: {
						account?: string;
						enabled?: boolean;
						folder?: string;
						folderName?: string;
					} & Record<string, TeamworkJsonValue>;
					xero?: {
						baseCurrency?: string;
						connected?: boolean;
						countryCode?: string;
						enabled?: boolean;
						organisation?: string;
					} & Record<string, TeamworkJsonValue>;
				} & Record<string, TeamworkJsonValue>;
				isProjectAdmin?: boolean;
				lastChangedOn?: string;
				lastWorkedOn?: string;
				logo?: string;
				logoFromCompany?: boolean;
				milestones?: Record<string, TeamworkJsonValue>;
				minMaxAvailableDates?: {
					deadlinesFound?: boolean;
					suggestedEndDate?: string;
					suggestedStartDate?: string;
				} & Record<string, TeamworkJsonValue>;
				name?: string;
				notifyEveryone?: boolean;
				overviewStartPage?: string;
				privacyEnabled?: boolean;
				projectOwnerId?: number;
				replyByEmailEnabled?: boolean;
				showAnnouncement?: boolean;
				skipWeekends?: boolean;
				starred?: boolean;
				startPage?: string;
				status?: string;
				subStatus?: string;
				tags?: Array<
					{
						id?: number;
						name?: string;
						color?: string;
						projectId?: number;
					} & Record<string, TeamworkJsonValue>
				>;
				tasksStartPage?: string;
				templateDateTargetDefault?: string;
				type?: string;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v2_get_projects_api_v2_projects_id_predecessors_json: {
		STATUS?: string;
	} & Record<string, TeamworkJsonValue>;
	v2_get_projects_api_v2_tasklists_id_taskids_json: {
		STATUS?: string;
		taskids?: Array<number>;
	} & Record<string, TeamworkJsonValue>;
	v2_get_projects_api_v2_projects_id_taskids_json: {
		STATUS?: string;
		taskids?: Array<number>;
	} & Record<string, TeamworkJsonValue>;
	v2_get_projects_api_v2_projects_json: {
		STATUS?: string;
		customFields?: {
			customFieldId?: {
				id?: number;
				projectId?: number;
				entity?: string;
				name?: string;
				type?: string;
				options?: Record<string, TeamworkJsonValue>;
				visibilities?: Array<Record<string, TeamworkJsonValue>>;
				isPrivate?: boolean;
				required?: boolean;
				createdAt?: string;
				createdByUserId?: number;
				updatedAt?: string;
				updatedByUserId?: number;
				deleted?: boolean;
				deletedAt?: string;
				deletedByUserId?: number;
			} & Record<string, TeamworkJsonValue>;
		} & Record<string, TeamworkJsonValue>;
		projects?: Array<
			{
				activePages?: {
					billing?: boolean;
					comments?: boolean;
					files?: boolean;
					links?: boolean;
					messages?: boolean;
					milestones?: boolean;
					notebooks?: boolean;
					riskRegister?: boolean;
					tasks?: boolean;
					time?: boolean;
				} & Record<string, TeamworkJsonValue>;
				activeUserIsProjectAdmin?: boolean;
				announcement?: string;
				announcementHTML?: string;
				company?: { id?: number; isOwner?: boolean; name?: string } & Record<
					string,
					TeamworkJsonValue
				>;
				createdOn?: string;
				defaultPrivacy?: string;
				defaults?: { privacy?: string } & Record<string, TeamworkJsonValue>;
				directFileUploadsEnabled?: boolean;
				filesAutoNewVersion?: boolean;
				harvestTimersEnabled?: boolean;
				id?: number;
				integrations?: {
					onedrivebusiness?: {
						account?: string;
						enabled?: boolean;
						folder?: string;
						folderName?: string;
					} & Record<string, TeamworkJsonValue>;
					sharepoint?: {
						account?: string;
						enabled?: boolean;
						folder?: string;
						folderName?: string;
					} & Record<string, TeamworkJsonValue>;
					xero?: {
						baseCurrency?: string;
						connected?: boolean;
						countryCode?: string;
						enabled?: boolean;
						organisation?: string;
					} & Record<string, TeamworkJsonValue>;
				} & Record<string, TeamworkJsonValue>;
				isOnBoardingProject?: boolean;
				isProjectAdmin?: boolean;
				isSampleProject?: boolean;
				lastChangedOn?: string;
				lastWorkedOn?: string;
				logo?: string;
				name?: string;
				notifyEveryone?: boolean;
				overviewStartPage?: string;
				privacyEnabled?: boolean;
				projectOwnerId?: number;
				replyByEmailEnabled?: boolean;
				showAnnouncement?: boolean;
				skipWeekends?: boolean;
				starred?: boolean;
				startPage?: string;
				status?: string;
				subStatus?: string;
				tasksStartPage?: string;
				type?: string;
				customFields?: Array<
					{ id?: number; customFieldId?: number; value?: string } & Record<
						string,
						TeamworkJsonValue
					>
				>;
			} & Record<string, TeamworkJsonValue>
		>;
	} & Record<string, TeamworkJsonValue>;
	v2_get_projects_api_v2_tasks_json: {
		STATUS?: string;
		tasks?: Array<
			{
				id?: number;
				name?: string;
				priority?: string;
				status?: string;
				parentTaskId?: number;
				canViewEstTime?: boolean;
				updatedBy?: {
					id?: number;
					firstName?: string;
					lastName?: string;
					avatarUrl?: string;
				} & Record<string, TeamworkJsonValue>;
				createdBy?: {
					id?: number;
					firstName?: string;
					lastName?: string;
					avatarUrl?: string;
				} & Record<string, TeamworkJsonValue>;
				dateCreated?: string;
				dateChanged?: string;
				dateLastModified?: string;
				hasFollowers?: boolean;
				hasLoggedTime?: boolean;
				hasReminders?: boolean;
				hasRemindersForUser?: boolean;
				hasRelativeReminders?: boolean;
				hasTemplateReminders?: boolean;
				hasTickets?: boolean;
				isPrivate?: boolean;
				installationId?: number;
				privacyIsInherited?: boolean;
				lockdownId?: number;
				numMinutesLogged?: number;
				numActiveSubTasks?: number;
				numAttachments?: number;
				numComments?: number;
				numCommentsRead?: number;
				numCompletedSubTasks?: number;
				numDependencies?: number;
				numEstMins?: number;
				numPredecessors?: number;
				position?: number;
				projectId?: number;
				startDate?: string;
				dueDate?: string;
				dueDateFromMilestone?: boolean;
				taskListId?: number;
				progress?: number;
				crmDealIds?: number;
				followingChanges?: boolean;
				followingComments?: boolean;
				changeFollowerIds?: string;
				commentFollowerIds?: string;
				teamsFollowingChanges?: boolean;
				teamsFollowingComments?: boolean;
				companiesFollowingChanges?: boolean;
				companiesFollowingComments?: boolean;
				order?: number;
				canComplete?: boolean;
				canEdit?: boolean;
				canLogTime?: boolean;
				canAddSubtasks?: boolean;
				placeholder?: boolean;
				DLM?: number;
				customFields?: Array<
					{ id?: number; customFieldId?: number; value?: number } & Record<
						string,
						TeamworkJsonValue
					>
				>;
				assignedTo?: Array<
					{ id?: number; firstName?: string; lastName?: string } & Record<
						string,
						TeamworkJsonValue
					>
				>;
			} & Record<string, TeamworkJsonValue>
		>;
		customFields?: {
			customFieldId?: {
				id?: number;
				projectId?: number;
				entity?: string;
				name?: string;
				type?: string;
				options?: Record<string, TeamworkJsonValue>;
				visibilities?: Array<Record<string, TeamworkJsonValue>>;
				isPrivate?: boolean;
				required?: boolean;
				createdAt?: string;
				createdByUserId?: number;
				updatedAt?: string;
				updatedByUserId?: number;
				deleted?: boolean;
				deletedAt?: string;
				deletedByUserId?: number;
			} & Record<string, TeamworkJsonValue>;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v2_get_projects_api_v2_tasks_taskid_json: {
		STATUS?: string;
		task?: {
			id?: number;
			name?: string;
			priority?: string;
			status?: string;
			parentTaskId?: number;
			canViewEstTime?: boolean;
			updatedBy?: {
				id?: number;
				firstName?: string;
				lastName?: string;
				avatarUrl?: string;
			} & Record<string, TeamworkJsonValue>;
			createdBy?: {
				id?: number;
				firstName?: string;
				lastName?: string;
				avatarUrl?: string;
			} & Record<string, TeamworkJsonValue>;
			dateCreated?: string;
			dateChanged?: string;
			dateLastModified?: string;
			hasFollowers?: boolean;
			hasLoggedTime?: boolean;
			hasReminders?: boolean;
			hasRemindersForUser?: boolean;
			hasRelativeReminders?: boolean;
			hasTemplateReminders?: boolean;
			hasTickets?: boolean;
			isPrivate?: boolean;
			installationId?: number;
			privacyIsInherited?: boolean;
			lockdownId?: number;
			numMinutesLogged?: number;
			numActiveSubTasks?: number;
			numAttachments?: number;
			numComments?: number;
			numCommentsRead?: number;
			numCompletedSubTasks?: number;
			numDependencies?: number;
			numEstMins?: number;
			numPredecessors?: number;
			position?: number;
			projectId?: number;
			startDate?: string;
			dueDate?: string;
			dueDateFromMilestone?: boolean;
			taskListId?: number;
			progress?: number;
			customFields?: Array<
				{ id?: number; customFieldId?: number; value?: string } & Record<
					string,
					TeamworkJsonValue
				>
			>;
			crmDealIds?: number;
			followingChanges?: boolean;
			followingComments?: boolean;
			changeFollowerIds?: string;
			commentFollowerIds?: string;
			teamsFollowingChanges?: boolean;
			teamsFollowingComments?: boolean;
			companiesFollowingChanges?: boolean;
			companiesFollowingComments?: boolean;
			order?: number;
			canComplete?: boolean;
			canEdit?: boolean;
			canLogTime?: boolean;
			canAddSubtasks?: boolean;
			placeholder?: boolean;
			DLM?: number;
		} & Record<string, TeamworkJsonValue>;
		customFields?: {
			customFieldId?: {
				id?: number;
				projectId?: number;
				entity?: string;
				name?: string;
				type?: string;
				options?: {
					choices?: Array<
						{ value?: string; color?: string } & Record<
							string,
							TeamworkJsonValue
						>
					>;
				} & Record<string, TeamworkJsonValue>;
				visibilities?: Array<Record<string, TeamworkJsonValue>>;
				isPrivate?: boolean;
				required?: boolean;
				createdAt?: string;
				createdByUserId?: number;
				updatedAt?: string;
				updatedByUserId?: number;
				deleted?: boolean;
				deletedAt?: string;
				deletedByUserId?: number;
			} & Record<string, TeamworkJsonValue>;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
	v2_get_projects_api_v2_projects_projectid_json: {
		customFields?: {
			customFieldId?: {
				id?: number;
				projectId?: number;
				entity?: string;
				name?: string;
				type?: string;
				options?: Record<string, TeamworkJsonValue>;
				visibilities?: Array<Record<string, TeamworkJsonValue>>;
				isPrivate?: boolean;
				required?: boolean;
				createdAt?: string;
				createdByUserId?: number;
				updatedAt?: string;
				updatedByUserId?: number;
				deleted?: boolean;
				deletedAt?: string;
				deletedByUserId?: number;
			} & Record<string, TeamworkJsonValue>;
		} & Record<string, TeamworkJsonValue>;
		project?: {
			activePages?: {
				billing?: boolean;
				comments?: boolean;
				files?: boolean;
				links?: boolean;
				messages?: boolean;
				milestones?: boolean;
				notebooks?: boolean;
				riskRegister?: boolean;
				tasks?: boolean;
				time?: boolean;
			} & Record<string, TeamworkJsonValue>;
			activeUserIsProjectAdmin?: boolean;
			announcement?: string;
			announcementHTML?: string;
			company?: { id?: number; isOwner?: boolean; name?: string } & Record<
				string,
				TeamworkJsonValue
			>;
			createdOn?: string;
			customFields?: Array<
				{ id?: number; customFieldId?: number; value?: string } & Record<
					string,
					TeamworkJsonValue
				>
			>;
			defaultPrivacy?: string;
			defaults?: { privacy?: string } & Record<string, TeamworkJsonValue>;
			directFileUploadsEnabled?: boolean;
			filesAutoNewVersion?: boolean;
			harvestTimersEnabled?: boolean;
			id?: number;
			integrations?: {
				onedrivebusiness?: {
					account?: string;
					enabled?: boolean;
					folder?: string;
					folderName?: string;
				} & Record<string, TeamworkJsonValue>;
				sharepoint?: {
					account?: string;
					enabled?: boolean;
					folder?: string;
					folderName?: string;
				} & Record<string, TeamworkJsonValue>;
				xero?: {
					baseCurrency?: string;
					connected?: boolean;
					countryCode?: string;
					enabled?: boolean;
					organisation?: string;
				} & Record<string, TeamworkJsonValue>;
			} & Record<string, TeamworkJsonValue>;
			isOnBoardingProject?: boolean;
			isPrivate?: boolean;
			isProjectAdmin?: boolean;
			isSampleProject?: boolean;
			lastChangeOn?: string;
			logo?: string;
			member?: boolean;
			name?: string;
			notifyEveryone?: boolean;
			overviewStartPage?: string;
			privacyEnabled?: boolean;
			projectOwnerId?: number;
			replyByEmailEnabled?: boolean;
			showAnnouncement?: boolean;
			skipWeekends?: boolean;
			starred?: boolean;
			startPage?: string;
			status?: string;
			subStatus?: string;
			tasksStartPage?: string;
			type?: string;
		} & Record<string, TeamworkJsonValue>;
	} & Record<string, TeamworkJsonValue>;
};
