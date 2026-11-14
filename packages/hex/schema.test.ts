import { HexSchema } from './schema';

describe('Hex schema', () => {
	it('declares a semver version', () => {
		expect(HexSchema.version).toBeDefined();
		expect(HexSchema.version).toMatch(/^\d+\.\d+\.\d+$/);
	});

	it('declares an entities map', () => {
		expect(typeof HexSchema.entities).toBe('object');
		expect(HexSchema.entities).not.toBeNull();
		expect(Array.isArray(Object.keys(HexSchema.entities))).toBe(true);
		for (const entity of Object.values(HexSchema.entities)) {
			expect(entity).toBeDefined();
		}
	});
});

// Per .github/PLUGIN_PR_RULES.md (R2), every implemented endpoint
// needs a corresponding test.
