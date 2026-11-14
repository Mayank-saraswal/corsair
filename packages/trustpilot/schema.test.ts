import {
	TrustpilotEndpointInputSchemas,
	TrustpilotEndpointOutputSchemas,
} from './endpoints/types';
import { TrustpilotSchema } from './schema';

describe('Trustpilot plugin and endpoint schemas', () => {
	it('declares a semver schema and no local entities', () => {
		expect(TrustpilotSchema.version).toMatch(/^\d+\.\d+\.\d+$/);
		expect(TrustpilotSchema.entities).toEqual({});
	});

	it('keeps strict input and output schema registries aligned', () => {
		expect(Object.keys(TrustpilotEndpointInputSchemas).sort()).toEqual(
			Object.keys(TrustpilotEndpointOutputSchemas).sort(),
		);
		expect(Object.keys(TrustpilotEndpointInputSchemas)).toHaveLength(53);
	});

	it('rejects undocumented fields for every endpoint input', () => {
		for (const schema of Object.values(TrustpilotEndpointInputSchemas)) {
			expect(
				schema.safeParse({ undocumentedCallback: 'https://example.invalid' })
					.success,
			).toBe(false);
		}
	});

	it('rejects invalid scalar output data for every endpoint output', () => {
		for (const schema of Object.values(TrustpilotEndpointOutputSchemas)) {
			expect(schema.safeParse(42).success).toBe(false);
		}
	});

	it('rejects undocumented fields and invalid cross-field combinations', () => {
		expect(
			TrustpilotEndpointInputSchemas['businessUnits.find'].safeParse({
				name: 'shop.example',
				callbackUrl: 'https://example.invalid',
			}).success,
		).toBe(false);
		expect(
			TrustpilotEndpointInputSchemas['productReviews.summary'].safeParse({
				businessUnitId: 'unit-1',
			}).success,
		).toBe(false);
		expect(
			TrustpilotEndpointInputSchemas['productReviews.summary'].safeParse({
				businessUnitId: 'unit-1',
				sku: ['SKU-1'],
				customerProductId: 'product-1',
			}).success,
		).toBe(false);
		expect(
			TrustpilotEndpointInputSchemas['businessUnits.privateReviews'].safeParse({
				businessUnitId: 'unit-1',
				noLocation: true,
				internalLocationId: 'location-1',
			}).success,
		).toBe(false);
	});

	it('enforces Data Solutions pagination bounds and latest-review limit', () => {
		expect(
			TrustpilotEndpointInputSchemas[
				'dataSolutions.searchBusinessUnits'
			].safeParse({ query: 'shop', perPage: 101 }).success,
		).toBe(false);
		expect(
			TrustpilotEndpointInputSchemas['dataSolutions.latestReviews'].safeParse({
				businessUnitId: 'unit-1',
				limit: 6,
			}).success,
		).toBe(false);
		expect(
			TrustpilotEndpointInputSchemas['dataSolutions.latestReviews'].safeParse({
				businessUnitId: 'unit-1',
				limit: 5,
			}).success,
		).toBe(true);
	});
});
