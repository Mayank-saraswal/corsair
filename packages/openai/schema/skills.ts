import { z } from 'zod';

export const SkillsCreateInputSchema = z.object({
	file: z.union([z.instanceof(Blob), z.string()]),
	fileName: z.string(),
});
export type SkillsCreateInput = z.infer<typeof SkillsCreateInputSchema>;

export const SkillsCreateResponseSchema = z
	.object({
		id: z.string(),
		object: z.literal('skill').optional(),
		created_at: z.number().optional(),
		default_version: z.number().optional(),
		latest_version: z.number().optional(),
		description: z.string().optional(),
		name: z.string().optional(),
	})
	.catchall(z.unknown());
export type SkillsCreateResponse = z.infer<typeof SkillsCreateResponseSchema>;

export const SkillsListInputSchema = z.object({
	limit: z.number().optional(),
	after: z.string().optional(),
});
export type SkillsListInput = z.infer<typeof SkillsListInputSchema>;

export const SkillsListResponseSchema = z.object({
	object: z.literal('list'),
	data: z.array(z.object({ id: z.string() }).catchall(z.unknown())),
	first_id: z.string().optional(),
	last_id: z.string().optional(),
	has_more: z.boolean(),
});
export type SkillsListResponse = z.infer<typeof SkillsListResponseSchema>;

export const SkillsDeleteInputSchema = z.object({
	skillId: z.string(),
});
export type SkillsDeleteInput = z.infer<typeof SkillsDeleteInputSchema>;

export const SkillsDeleteResponseSchema = z.object({
	id: z.string(),
	object: z.literal('skill.deleted'),
	deleted: z.boolean(),
});
export type SkillsDeleteResponse = z.infer<typeof SkillsDeleteResponseSchema>;
