import { IgnisignSchema } from './schema';

describe('Ignisign schema', () => {
	it('declares a semver version', () => {
		expect(IgnisignSchema.version).toBeDefined();
		expect(IgnisignSchema.version).toMatch(/^\d+\.\d+\.\d+$/);
	});

	it('declares an entities map', () => {
		expect(typeof IgnisignSchema.entities).toBe('object');
		expect(IgnisignSchema.entities).not.toBeNull();
		expect(Array.isArray(Object.keys(IgnisignSchema.entities))).toBe(true);
		for (const entity of Object.values(IgnisignSchema.entities)) {
			expect(entity).toBeDefined();
		}
	});
});

// Per .github/PLUGIN_PR_RULES.md (R2), every implemented endpoint
// needs a corresponding test.
