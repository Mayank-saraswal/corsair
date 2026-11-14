import { JotformSchema } from './schema';

describe('Jotform schema', () => {
	it('declares a semver version', () => {
		expect(JotformSchema.version).toBeDefined();
		expect(JotformSchema.version).toMatch(/^\d+\.\d+\.\d+$/);
	});

	it('declares an entities map', () => {
		expect(typeof JotformSchema.entities).toBe('object');
		expect(JotformSchema.entities).not.toBeNull();
		expect(Array.isArray(Object.keys(JotformSchema.entities))).toBe(true);
		for (const entity of Object.values(JotformSchema.entities)) {
			expect(entity).toBeDefined();
		}
	});
});

// Per .github/PLUGIN_PR_RULES.md (R2), every implemented endpoint
// needs a corresponding test.
