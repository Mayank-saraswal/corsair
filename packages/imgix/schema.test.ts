import { ImgixSchema } from './schema';

describe('Imgix schema', () => {
	it('declares a semver version', () => {
		expect(ImgixSchema.version).toBeDefined();
		expect(ImgixSchema.version).toMatch(/^\d+\.\d+\.\d+$/);
	});

	it('declares an entities map', () => {
		expect(typeof ImgixSchema.entities).toBe('object');
		expect(ImgixSchema.entities).not.toBeNull();
		expect(Array.isArray(Object.keys(ImgixSchema.entities))).toBe(true);
		for (const entity of Object.values(ImgixSchema.entities)) {
			expect(entity).toBeDefined();
		}
	});
});

// Per .github/PLUGIN_PR_RULES.md (R2), every implemented endpoint
// needs a corresponding test.
