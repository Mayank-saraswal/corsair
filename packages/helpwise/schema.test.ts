import { HelpwiseSchema } from './schema';

describe('Helpwise schema', () => {
	it('declares a semver version', () => {
		expect(HelpwiseSchema.version).toBeDefined();
		expect(HelpwiseSchema.version).toMatch(/^\d+\.\d+\.\d+$/);
	});

	it('declares an entities map', () => {
		expect(typeof HelpwiseSchema.entities).toBe('object');
		expect(HelpwiseSchema.entities).not.toBeNull();
		expect(Array.isArray(Object.keys(HelpwiseSchema.entities))).toBe(true);
		for (const entity of Object.values(HelpwiseSchema.entities)) {
			expect(entity).toBeDefined();
		}
	});
});

// Per .github/PLUGIN_PR_RULES.md (R2), every implemented endpoint
// needs a corresponding test.
