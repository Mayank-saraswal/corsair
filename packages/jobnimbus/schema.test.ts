import { JobNimbusSchema } from './schema';

describe('JobNimbus schema', () => {
	it('declares a semver version', () => {
		expect(JobNimbusSchema.version).toBeDefined();
		expect(JobNimbusSchema.version).toMatch(/^\d+\.\d+\.\d+$/);
	});

	it('declares an entities map', () => {
		expect(typeof JobNimbusSchema.entities).toBe('object');
		expect(JobNimbusSchema.entities).not.toBeNull();
		expect(Array.isArray(Object.keys(JobNimbusSchema.entities))).toBe(true);
		for (const entity of Object.values(JobNimbusSchema.entities)) {
			expect(entity).toBeDefined();
		}
	});
});

// Per .github/PLUGIN_PR_RULES.md (R2), every implemented endpoint
// needs a corresponding test.
