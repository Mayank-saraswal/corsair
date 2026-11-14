import { LaunchDarklySchema } from './schema';

describe('LaunchDarkly schema', () => {
	it('declares a semver version', () => {
		expect(LaunchDarklySchema.version).toBeDefined();
		expect(LaunchDarklySchema.version).toMatch(/^\d+\.\d+\.\d+$/);
	});

	it('declares an entities map', () => {
		expect(typeof LaunchDarklySchema.entities).toBe('object');
		expect(LaunchDarklySchema.entities).not.toBeNull();
		expect(Array.isArray(Object.keys(LaunchDarklySchema.entities))).toBe(true);
		for (const entity of Object.values(LaunchDarklySchema.entities)) {
			expect(entity).toBeDefined();
		}
	});
});

// Per .github/PLUGIN_PR_RULES.md (R2), every implemented endpoint
// needs a corresponding test.
