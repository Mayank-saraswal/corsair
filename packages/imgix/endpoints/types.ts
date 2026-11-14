import { z } from 'zod';

// ==========================================
// Shared JSON:API Schemas
// ==========================================

export const JsonApiVersionSchema = z
	.object({
		version: z.string().optional(),
	})
	// `passthrough` because the JSON:API specification allows arbitrary metadata in the jsonapi object
	.passthrough();

export const JsonApiMetaSchema = z
	.object({
		total: z.number().optional(),
		cursor: z
			.object({
				current: z.string().nullable().optional(),
				next: z.string().nullable().optional(),
				has_next: z.boolean().optional(),
			})
			.optional(),
		page: z
			.object({
				current: z.number().optional(),
				size: z.number().optional(),
				total: z.number().optional(),
			})
			.optional(),
	})
	// `passthrough` because providers include arbitrary pagination and account metadata
	.passthrough();

// ==========================================
// 1. Sources Schemas
// ==========================================

export const DeploymentTypeSchema = z.enum([
	's3',
	'webfolder',
	'gcs',
	'azure',
	'webproxy',
	's3_compatible',
]);

export const SourceDeploymentSchema = z
	.object({
		type: DeploymentTypeSchema.optional(),
		s3_bucket: z.string().optional(),
		s3_prefix: z.string().optional(),
		s3_access_key: z.string().optional(),
		s3_secret_key: z.string().optional(),
		webfolder_base_url: z.string().optional(),
		gcs_bucket: z.string().optional(),
		gcs_prefix: z.string().optional(),
		gcs_project_id: z.string().optional(),
		gcs_client_email: z.string().optional(),
		gcs_private_key: z.string().optional(),
		azure_account_name: z.string().optional(),
		azure_container_name: z.string().optional(),
		azure_access_key: z.string().optional(),
		webproxy_base_url: z.string().optional(),
		imgix_subdomains: z.array(z.string()).optional(),
		custom_domains: z.array(z.string()).optional(),
		default_params: z.string().optional(),
		secure_url_token: z.string().optional(),
		cache_ttl_value: z.number().optional(),
		cache_ttl_error: z.number().optional(),
	})
	// `passthrough` because source deployment attributes can contain provider-specific configuration
	.passthrough();

export const SourceAttributesSchema = z
	.object({
		name: z.string().optional(),
		deployment_status: z.string().optional(),
		enabled: z.boolean().optional(),
		deployment: SourceDeploymentSchema.optional(),
		created_at: z.number().or(z.string()).optional(),
		updated_at: z.number().or(z.string()).optional(),
	})
	// `passthrough` because Imgix source attributes can vary across deployment types
	.passthrough();

export const SourceResourceSchema = z
	.object({
		id: z.string(),
		type: z.literal('sources'),
		attributes: SourceAttributesSchema,
	})
	// `passthrough` because JSON:API resources can contain relationships and links
	.passthrough();

export const SourcesListInputSchema = z
	.object({
		filter_name: z.string().optional(),
		filter_deployment_type: DeploymentTypeSchema.optional(),
		filter_enabled: z.boolean().optional(),
		sort: z.string().optional(),
		fields: z.string().optional(),
		page_number: z.number().int().min(0).optional(),
		page_size: z.number().int().min(1).max(100).optional(),
	})
	.strict();

export const SourcesListOutputSchema = z
	.object({
		data: z.array(SourceResourceSchema),
		meta: JsonApiMetaSchema.optional(),
		jsonapi: JsonApiVersionSchema.optional(),
	})
	// `passthrough` because JSON:API responses may include top-level links or included arrays
	.passthrough();

export const SourcesCreateInputSchema = z
	.object({
		name: z.string().min(1),
		deployment_type: DeploymentTypeSchema,
		s3_bucket: z.string().optional(),
		s3_prefix: z.string().optional(),
		s3_access_key: z.string().optional(),
		s3_secret_key: z.string().optional(),
		webfolder_base_url: z.string().optional(),
		gcs_bucket: z.string().optional(),
		gcs_prefix: z.string().optional(),
		gcs_project_id: z.string().optional(),
		gcs_client_email: z.string().optional(),
		gcs_private_key: z.string().optional(),
		azure_account_name: z.string().optional(),
		azure_container_name: z.string().optional(),
		azure_access_key: z.string().optional(),
		webproxy_base_url: z.string().optional(),
		imgix_subdomains: z.array(z.string()).optional(),
		custom_domains: z.array(z.string()).optional(),
		default_params: z.string().optional(),
		secure_url_token: z.string().optional(),
		cache_ttl_value: z.number().int().optional(),
		cache_ttl_error: z.number().int().optional(),
	})
	.strict();

export const SourcesCreateOutputSchema = z
	.object({
		data: SourceResourceSchema,
		jsonapi: JsonApiVersionSchema.optional(),
	})
	// `passthrough` because JSON:API responses include standard top-level fields
	.passthrough();

export const SourcesGetInputSchema = z
	.object({
		source_id: z.string().min(1),
		fields: z.string().optional(),
	})
	.strict();

export const SourcesGetOutputSchema = z
	.object({
		data: SourceResourceSchema,
		jsonapi: JsonApiVersionSchema.optional(),
	})
	// `passthrough` because JSON:API responses include standard top-level fields
	.passthrough();

export const SourcesUpdateInputSchema = z
	.object({
		source_id: z.string().min(1),
		name: z.string().optional(),
		enabled: z.boolean().optional(),
		default_params: z.string().optional(),
		custom_domains: z.array(z.string()).optional(),
		cache_ttl_value: z.number().int().optional(),
		cache_ttl_error: z.number().int().optional(),
		secure_url_token: z.string().optional(),
	})
	.strict();

export const SourcesUpdateOutputSchema = z
	.object({
		data: SourceResourceSchema,
		jsonapi: JsonApiVersionSchema.optional(),
	})
	// `passthrough` because JSON:API responses include standard top-level fields
	.passthrough();

// ==========================================
// 2. Assets Schemas
// ==========================================

export const AssetAttributesSchema = z
	.object({
		origin_path: z.string().optional(),
		content_type: z.string().optional(),
		file_size: z.number().optional(),
		width: z.number().optional(),
		height: z.number().optional(),
		dpi_width: z.number().optional(),
		dpi_height: z.number().optional(),
		color_model: z.string().optional(),
		color_profile: z.string().optional(),
		has_alpha: z.boolean().optional(),
		// `unknown` because custom_fields can store arbitrary user-defined metadata values
		custom_fields: z.record(z.string(), z.unknown()).optional(),
		created_at: z.number().or(z.string()).optional(),
		updated_at: z.number().or(z.string()).optional(),
	})
	// `passthrough` because asset attributes contain variable technical and EXIF metadata
	.passthrough();

export const AssetResourceSchema = z
	.object({
		id: z.string(),
		type: z.literal('assets').or(z.string()),
		attributes: AssetAttributesSchema,
	})
	// `passthrough` because JSON:API resources can include relationships and links
	.passthrough();

export const AssetsListInputSchema = z
	.object({
		source_id: z.string().min(1),
		filter: z.string().optional(),
		sort: z.string().optional(),
		fields: z.string().optional(),
		page_cursor: z.string().optional(),
		page_number: z.number().int().min(0).optional(),
		page_size: z.number().int().min(1).max(100).optional(),
	})
	.strict();

export const AssetsListOutputSchema = z
	.object({
		data: z.array(AssetResourceSchema),
		meta: JsonApiMetaSchema.optional(),
		jsonapi: JsonApiVersionSchema.optional(),
	})
	// `passthrough` because JSON:API responses include metadata and links
	.passthrough();

export const AssetsGetInputSchema = z
	.object({
		source_id: z.string().min(1),
		origin_path: z.string().min(1),
		fields: z.string().optional(),
	})
	.strict();

export const AssetsGetOutputSchema = z
	.object({
		data: AssetResourceSchema,
		jsonapi: JsonApiVersionSchema.optional(),
	})
	// `passthrough` because JSON:API responses include metadata and links
	.passthrough();

export const AssetsUpdateInputSchema = z
	.object({
		source_id: z.string().min(1),
		origin_path: z.string().min(1),
		// `unknown` because custom fields accept arbitrary user-defined JSON values
		custom_fields: z.record(z.string(), z.unknown()),
	})
	.strict();

export const AssetsUpdateOutputSchema = z
	.object({
		data: AssetResourceSchema,
		jsonapi: JsonApiVersionSchema.optional(),
	})
	// `passthrough` because JSON:API responses include metadata and links
	.passthrough();

export const AssetsAddFromOriginInputSchema = z
	.object({
		source_id: z.string().min(1),
		origin_path: z.string().min(1),
	})
	.strict();

export const AssetsAddFromOriginOutputSchema = z
	.object({
		data: z
			.object({
				id: z.string().optional(),
				type: z.string().optional(),
				// `unknown` because add response attributes can vary
				attributes: z.record(z.string(), z.unknown()).optional(),
			})
			.passthrough()
			.optional(),
		jsonapi: JsonApiVersionSchema.optional(),
	})
	// `passthrough` because add response may include top-level status or attributes
	.passthrough();

export const AssetsUploadInputSchema = z
	.object({
		source_id: z.string().min(1),
		origin_path: z.string().min(1),
		content_base64: z.string().min(1),
		content_type: z.string().optional(),
		overwrite: z.boolean().optional(),
	})
	.strict();

export const AssetsUploadOutputSchema = z
	.object({
		data: AssetResourceSchema.optional(),
		jsonapi: JsonApiVersionSchema.optional(),
	})
	// `passthrough` because upload returns JSON:API asset response
	.passthrough();

// ==========================================
// 3. Upload Sessions Schemas
// ==========================================

export const UploadSessionsCreateInputSchema = z
	.object({
		source_id: z.string().min(1),
		origin_path: z.string().min(1),
	})
	.strict();

export const UploadSessionsCreateOutputSchema = z
	.object({
		data: z
			.object({
				id: z.string(),
				type: z.string().optional(),
				attributes: z
					.object({
						url: z.string().url(),
						session_id: z.string().optional(),
						expires_at: z.number().or(z.string()).optional(),
					})
					// `passthrough` because presigned upload session attributes may include storage details
					.passthrough(),
			})
			.passthrough(),
		jsonapi: JsonApiVersionSchema.optional(),
	})
	// `passthrough` because JSON:API responses include standard top-level fields
	.passthrough();

export const UploadSessionsGetStatusInputSchema = z
	.object({
		source_id: z.string().min(1),
		session_id: z.string().min(1),
	})
	.strict();

export const UploadSessionsGetStatusOutputSchema = z
	.object({
		data: z
			.object({
				id: z.string(),
				type: z.string().optional(),
				attributes: z
					.object({
						status: z
							.enum(['PENDING', 'CLOSED', 'COMPLETE', 'CANCELED'])
							.or(z.string()),
						origin_path: z.string().optional(),
					})
					// `passthrough` because status attributes may include error or timing details
					.passthrough(),
			})
			.passthrough(),
		jsonapi: JsonApiVersionSchema.optional(),
	})
	// `passthrough` because JSON:API responses include standard top-level fields
	.passthrough();

export const UploadSessionsCloseInputSchema = z
	.object({
		source_id: z.string().min(1),
		session_id: z.string().min(1),
	})
	.strict();

export const UploadSessionsCloseOutputSchema = z
	.object({
		data: z
			.object({
				id: z.string().optional(),
				type: z.string().optional(),
				// `unknown` because add response attributes can vary
				attributes: z.record(z.string(), z.unknown()).optional(),
			})
			.passthrough()
			.optional(),
		jsonapi: JsonApiVersionSchema.optional(),
	})
	// `passthrough` because close response can return session state or asset reference
	.passthrough();

export const UploadSessionsCancelInputSchema = z
	.object({
		source_id: z.string().min(1),
		session_id: z.string().min(1),
	})
	.strict();

export const UploadSessionsCancelOutputSchema = z
	.object({
		data: z
			.object({
				id: z.string().optional(),
				type: z.string().optional(),
				// `unknown` because add response attributes can vary
				attributes: z.record(z.string(), z.unknown()).optional(),
			})
			.passthrough()
			.optional(),
		jsonapi: JsonApiVersionSchema.optional(),
	})
	// `passthrough` because cancel response confirms session cancellation
	.passthrough();

// ==========================================
// 4. Purges Schemas
// ==========================================

export const PurgesCreateInputSchema = z
	.object({
		url: z.string().url(),
		source_id: z.string().optional(),
		sub_image: z.boolean().optional(),
	})
	.strict();

export const PurgesCreateOutputSchema = z
	.object({
		data: z
			.object({
				id: z.string().optional(),
				type: z.literal('purges').or(z.string()).optional(),
				attributes: z
					.object({
						url: z.string().optional(),
						status: z.string().optional(),
					})
					// `passthrough` because purge attributes can include provider timestamp and status
					.passthrough()
					.optional(),
			})
			.passthrough()
			.optional(),
		jsonapi: JsonApiVersionSchema.optional(),
	})
	// `passthrough` because JSON:API responses include standard top-level fields
	.passthrough();

// ==========================================
// 5. Reports Schemas
// ==========================================

export const ReportAttributesSchema = z
	.object({
		completed: z.boolean(),
		files: z.array(z.string()),
		period_start: z.number(),
		period_end: z.number(),
		report_key: z.string(),
		report_type: z.string(),
	})
	// `passthrough` because report attributes can contain extra analytics metadata
	.passthrough();

export const ReportResourceSchema = z
	.object({
		id: z.string(),
		type: z.literal('reports').or(z.string()),
		attributes: ReportAttributesSchema,
	})
	// `passthrough` because JSON:API resources can include relationships and links
	.passthrough();

export const ReportsListInputSchema = z
	.object({
		completed: z.boolean().optional(),
		report_type: z
			.enum(['cdn_logs', 'credit_analytics_daily'])
			.or(z.string())
			.optional(),
		sort: z.string().optional(),
		page_number: z.number().int().min(0).optional(),
		page_size: z.number().int().min(1).max(100).optional(),
	})
	.strict();

export const ReportsListOutputSchema = z
	.object({
		data: z.array(ReportResourceSchema),
		meta: JsonApiMetaSchema.optional(),
		jsonapi: JsonApiVersionSchema.optional(),
	})
	// `passthrough` because JSON:API responses include standard top-level fields
	.passthrough();

export const ReportsGetInputSchema = z
	.object({
		report_id: z.string().min(1),
	})
	.strict();

export const ReportsGetOutputSchema = z
	.object({
		data: ReportResourceSchema,
		jsonapi: JsonApiVersionSchema.optional(),
	})
	// `passthrough` because JSON:API responses include standard top-level fields
	.passthrough();

// ==========================================
// 6. Generations (Video & AI) Schemas
// ==========================================

export const GenerationsCreateVideoInputSchema = z
	.object({
		prompt: z.string().min(1),
		source: z.string().url(),
		duration: z.number().positive().optional(),
		aspect_ratio: z.string().optional(),
	})
	.strict();

export const GenerationsCreateVideoOutputSchema = z
	.object({
		job_id: z.string(),
		status: z
			.enum(['pending', 'processing', 'ready', 'errored'])
			.or(z.string()),
		created_at: z.string().optional(),
	})
	// `passthrough` because generation job payloads can include progress or model details
	.passthrough();

export const GenerationsGetVideoJobInputSchema = z
	.object({
		job_id: z.string().min(1),
	})
	.strict();

export const GenerationsGetVideoJobOutputSchema = z
	.object({
		job_id: z.string(),
		status: z
			.enum(['pending', 'processing', 'ready', 'errored'])
			.or(z.string()),
		url: z.string().url().nullable().optional(),
		error: z.string().nullable().optional(),
	})
	// `passthrough` because completed job payloads include video resolution and metadata
	.passthrough();

export const GenerationsGetAltTextInputSchema = z
	.object({
		url: z.string().url().optional(),
		url64: z.string().optional(),
		language: z.string().optional(),
		regenerate: z.boolean().optional(),
	})
	.strict();

export const GenerationsGetAltTextOutputSchema = z
	.object({
		alt_text: z.record(z.string(), z.string()),
	})
	// `passthrough` because response may include detected language or confidence scores
	.passthrough();

export const GenerationsOverrideAltTextInputSchema = z
	.object({
		url: z.string().url().optional(),
		url64: z.string().optional(),
		alt_text: z.record(z.string(), z.string()),
	})
	.strict();

export const GenerationsOverrideAltTextOutputSchema = z
	.object({
		alt_text: z.record(z.string(), z.string()),
	})
	// `passthrough` because response echoes updated overrides and metadata
	.passthrough();

// ==========================================
// Inferred TypeScript Types
// ==========================================

export type SourcesListInput = z.infer<typeof SourcesListInputSchema>;
export type SourcesListOutput = z.infer<typeof SourcesListOutputSchema>;
export type SourcesCreateInput = z.infer<typeof SourcesCreateInputSchema>;
export type SourcesCreateOutput = z.infer<typeof SourcesCreateOutputSchema>;
export type SourcesGetInput = z.infer<typeof SourcesGetInputSchema>;
export type SourcesGetOutput = z.infer<typeof SourcesGetOutputSchema>;
export type SourcesUpdateInput = z.infer<typeof SourcesUpdateInputSchema>;
export type SourcesUpdateOutput = z.infer<typeof SourcesUpdateOutputSchema>;

export type AssetsListInput = z.infer<typeof AssetsListInputSchema>;
export type AssetsListOutput = z.infer<typeof AssetsListOutputSchema>;
export type AssetsGetInput = z.infer<typeof AssetsGetInputSchema>;
export type AssetsGetOutput = z.infer<typeof AssetsGetOutputSchema>;
export type AssetsUpdateInput = z.infer<typeof AssetsUpdateInputSchema>;
export type AssetsUpdateOutput = z.infer<typeof AssetsUpdateOutputSchema>;
export type AssetsAddFromOriginInput = z.infer<
	typeof AssetsAddFromOriginInputSchema
>;
export type AssetsAddFromOriginOutput = z.infer<
	typeof AssetsAddFromOriginOutputSchema
>;
export type AssetsUploadInput = z.infer<typeof AssetsUploadInputSchema>;
export type AssetsUploadOutput = z.infer<typeof AssetsUploadOutputSchema>;

export type UploadSessionsCreateInput = z.infer<
	typeof UploadSessionsCreateInputSchema
>;
export type UploadSessionsCreateOutput = z.infer<
	typeof UploadSessionsCreateOutputSchema
>;
export type UploadSessionsGetStatusInput = z.infer<
	typeof UploadSessionsGetStatusInputSchema
>;
export type UploadSessionsGetStatusOutput = z.infer<
	typeof UploadSessionsGetStatusOutputSchema
>;
export type UploadSessionsCloseInput = z.infer<
	typeof UploadSessionsCloseInputSchema
>;
export type UploadSessionsCloseOutput = z.infer<
	typeof UploadSessionsCloseOutputSchema
>;
export type UploadSessionsCancelInput = z.infer<
	typeof UploadSessionsCancelInputSchema
>;
export type UploadSessionsCancelOutput = z.infer<
	typeof UploadSessionsCancelOutputSchema
>;

export type PurgesCreateInput = z.infer<typeof PurgesCreateInputSchema>;
export type PurgesCreateOutput = z.infer<typeof PurgesCreateOutputSchema>;

export type ReportsListInput = z.infer<typeof ReportsListInputSchema>;
export type ReportsListOutput = z.infer<typeof ReportsListOutputSchema>;
export type ReportsGetInput = z.infer<typeof ReportsGetInputSchema>;
export type ReportsGetOutput = z.infer<typeof ReportsGetOutputSchema>;

export type GenerationsCreateVideoInput = z.infer<
	typeof GenerationsCreateVideoInputSchema
>;
export type GenerationsCreateVideoOutput = z.infer<
	typeof GenerationsCreateVideoOutputSchema
>;
export type GenerationsGetVideoJobInput = z.infer<
	typeof GenerationsGetVideoJobInputSchema
>;
export type GenerationsGetVideoJobOutput = z.infer<
	typeof GenerationsGetVideoJobOutputSchema
>;
export type GenerationsGetAltTextInput = z.infer<
	typeof GenerationsGetAltTextInputSchema
>;
export type GenerationsGetAltTextOutput = z.infer<
	typeof GenerationsGetAltTextOutputSchema
>;
export type GenerationsOverrideAltTextInput = z.infer<
	typeof GenerationsOverrideAltTextInputSchema
>;
export type GenerationsOverrideAltTextOutput = z.infer<
	typeof GenerationsOverrideAltTextOutputSchema
>;

// Map of all endpoint operations
export type ImgixEndpointInputs = {
	'sources.list': SourcesListInput;
	'sources.create': SourcesCreateInput;
	'sources.get': SourcesGetInput;
	'sources.update': SourcesUpdateInput;
	'assets.list': AssetsListInput;
	'assets.get': AssetsGetInput;
	'assets.update': AssetsUpdateInput;
	'assets.addFromOrigin': AssetsAddFromOriginInput;
	'assets.upload': AssetsUploadInput;
	'uploadSessions.create': UploadSessionsCreateInput;
	'uploadSessions.getStatus': UploadSessionsGetStatusInput;
	'uploadSessions.close': UploadSessionsCloseInput;
	'uploadSessions.cancel': UploadSessionsCancelInput;
	'purges.create': PurgesCreateInput;
	'reports.list': ReportsListInput;
	'reports.get': ReportsGetInput;
	'generations.createVideo': GenerationsCreateVideoInput;
	'generations.getVideoJob': GenerationsGetVideoJobInput;
	'generations.getAltText': GenerationsGetAltTextInput;
	'generations.overrideAltText': GenerationsOverrideAltTextInput;
};

export type ImgixEndpointOutputs = {
	'sources.list': SourcesListOutput;
	'sources.create': SourcesCreateOutput;
	'sources.get': SourcesGetOutput;
	'sources.update': SourcesUpdateOutput;
	'assets.list': AssetsListOutput;
	'assets.get': AssetsGetOutput;
	'assets.update': AssetsUpdateOutput;
	'assets.addFromOrigin': AssetsAddFromOriginOutput;
	'assets.upload': AssetsUploadOutput;
	'uploadSessions.create': UploadSessionsCreateOutput;
	'uploadSessions.getStatus': UploadSessionsGetStatusOutput;
	'uploadSessions.close': UploadSessionsCloseOutput;
	'uploadSessions.cancel': UploadSessionsCancelOutput;
	'purges.create': PurgesCreateOutput;
	'reports.list': ReportsListOutput;
	'reports.get': ReportsGetOutput;
	'generations.createVideo': GenerationsCreateVideoOutput;
	'generations.getVideoJob': GenerationsGetVideoJobOutput;
	'generations.getAltText': GenerationsGetAltTextOutput;
	'generations.overrideAltText': GenerationsOverrideAltTextOutput;
};

export const ImgixEndpointInputSchemas = {
	'sources.list': SourcesListInputSchema,
	'sources.create': SourcesCreateInputSchema,
	'sources.get': SourcesGetInputSchema,
	'sources.update': SourcesUpdateInputSchema,
	'assets.list': AssetsListInputSchema,
	'assets.get': AssetsGetInputSchema,
	'assets.update': AssetsUpdateInputSchema,
	'assets.addFromOrigin': AssetsAddFromOriginInputSchema,
	'assets.upload': AssetsUploadInputSchema,
	'uploadSessions.create': UploadSessionsCreateInputSchema,
	'uploadSessions.getStatus': UploadSessionsGetStatusInputSchema,
	'uploadSessions.close': UploadSessionsCloseInputSchema,
	'uploadSessions.cancel': UploadSessionsCancelInputSchema,
	'purges.create': PurgesCreateInputSchema,
	'reports.list': ReportsListInputSchema,
	'reports.get': ReportsGetInputSchema,
	'generations.createVideo': GenerationsCreateVideoInputSchema,
	'generations.getVideoJob': GenerationsGetVideoJobInputSchema,
	'generations.getAltText': GenerationsGetAltTextInputSchema,
	'generations.overrideAltText': GenerationsOverrideAltTextInputSchema,
} as const;

export const ImgixEndpointOutputSchemas = {
	'sources.list': SourcesListOutputSchema,
	'sources.create': SourcesCreateOutputSchema,
	'sources.get': SourcesGetOutputSchema,
	'sources.update': SourcesUpdateOutputSchema,
	'assets.list': AssetsListOutputSchema,
	'assets.get': AssetsGetOutputSchema,
	'assets.update': AssetsUpdateOutputSchema,
	'assets.addFromOrigin': AssetsAddFromOriginOutputSchema,
	'assets.upload': AssetsUploadOutputSchema,
	'uploadSessions.create': UploadSessionsCreateOutputSchema,
	'uploadSessions.getStatus': UploadSessionsGetStatusOutputSchema,
	'uploadSessions.close': UploadSessionsCloseOutputSchema,
	'uploadSessions.cancel': UploadSessionsCancelOutputSchema,
	'purges.create': PurgesCreateOutputSchema,
	'reports.list': ReportsListOutputSchema,
	'reports.get': ReportsGetOutputSchema,
	'generations.createVideo': GenerationsCreateVideoOutputSchema,
	'generations.getVideoJob': GenerationsGetVideoJobOutputSchema,
	'generations.getAltText': GenerationsGetAltTextOutputSchema,
	'generations.overrideAltText': GenerationsOverrideAltTextOutputSchema,
} as const;
