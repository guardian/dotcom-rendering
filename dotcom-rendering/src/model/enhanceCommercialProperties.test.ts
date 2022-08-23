import { Labs } from '../../fixtures/generated/articles/Labs';
import { Standard } from '../../fixtures/generated/articles/Standard';
import type { CommercialProperties } from '../types/commercial';
import { enhanceCommercialProperties } from './enhanceCommercialProperties';

const isNumber = (width: unknown): width is number => typeof width === 'number';

describe('Enhance Branding', () => {
	it('does not change properties if they have no branding', () => {
		const { commercialProperties } = Standard;
		expect(enhanceCommercialProperties(commercialProperties)).toEqual(
			commercialProperties,
		);
	});

	it('should have no widths above 140', () => {
		const { commercialProperties: partial } = Labs;
		const commercialProperties: CommercialProperties = {
			...partial,
			US: {
				...partial.US,
				branding: {
					brandingType: {
						name: 'paid-content',
					},
					sponsorName: 'Amazon',
					logo: {
						src: 'https://static.theguardian.com/commercial/sponsor/04/Oct/2018/6b15ba78-da66-415d-8540-a34cc4d3156b-romanoffs_TT_PO-center.png',
						dimensions: {
							width: 280,
							height: 180,
						},
						link: 'https://www.amazon.com/dp/B07FV6K8HF',
						label: 'Paid for by',
					},
					aboutThisLink:
						'https://www.theguardian.com/info/2016/jan/25/content-funding',
				},
			},
		};

		const dimensionsFail = Object.values(commercialProperties)
			.map((p) => p.branding?.logo.dimensions.width)
			.filter(isNumber);

		expect(Math.max(...dimensionsFail)).toBeGreaterThan(140);

		const dimensionsPass = Object.values(
			enhanceCommercialProperties(commercialProperties),
		)
			.map((p) => p.branding?.logo.dimensions.width)
			.filter(isNumber);

		expect(Math.max(...dimensionsPass)).toBeLessThanOrEqual(140);
	});
});
