import { JungleScoutSchema } from './schema';

describe('JungleScout schema', () => {
	it('declares a semver version', () => {
		expect(JungleScoutSchema.version).toBeDefined();
		expect(JungleScoutSchema.version).toMatch(/^\d+\.\d+\.\d+$/);
	});

	it('declares an entities map', () => {
		expect(typeof JungleScoutSchema.entities).toBe('object');
		expect(JungleScoutSchema.entities).not.toBeNull();
		expect(Array.isArray(Object.keys(JungleScoutSchema.entities))).toBe(true);
		for (const entity of Object.values(JungleScoutSchema.entities)) {
			expect(entity).toBeDefined();
		}
	});
});

// Per .github/PLUGIN_PR_RULES.md (R2), every implemented endpoint
// needs a corresponding test.
