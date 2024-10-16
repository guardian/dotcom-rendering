import type { ABTest } from '@guardian/ab-core';

export const UsaExpandableMarketingCard: ABTest = {
	id: 'UsaExpandableMarketingCard',
	start: '2024-10-02',
	expiry: '2024-12-18',
	author: 'dotcom.platform@guardian.co.uk',
	description:
		'Test the impact of showing the user a component that highlights the Guardians journalism.',
	audience: 0 / 100,
	audienceOffset: 0 / 100,
	audienceCriteria: 'US-based users that see the US edition.',
	successMeasure: 'Users are more likely to engage with the site.',
	canRun: () => true,
	variants: [
		{
			id: 'control',
			test: (): void => {
				/* no-op */
			},
		},
		{
			id: 'variant-free',
			test: (): void => {
				/* no-op */
			},
		},
		{
			id: 'variant-bubble',
			test: (): void => {
				/* no-op */
			},
		},
	],
};
