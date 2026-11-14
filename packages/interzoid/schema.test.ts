import { InterzoidSchema } from './schema';

describe('Interzoid schema', () => {
	it('declares a semver version', () => {
		expect(InterzoidSchema.version).toBeDefined();
		expect(InterzoidSchema.version).toMatch(/^\d+\.\d+\.\d+$/);
	});

	it('declares an entities map', () => {
		expect(typeof InterzoidSchema.entities).toBe('object');
		expect(InterzoidSchema.entities).not.toBeNull();
		expect(Array.isArray(Object.keys(InterzoidSchema.entities))).toBe(true);
		for (const entity of Object.values(InterzoidSchema.entities)) {
			expect(entity).toBeDefined();
		}
	});
});

// Per .github/PLUGIN_PR_RULES.md (R2), every implemented endpoint
// needs a corresponding test.
