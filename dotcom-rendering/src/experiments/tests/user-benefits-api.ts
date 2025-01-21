import type { ABTest } from '@guardian/ab-core';

export const userBenefitsApi: ABTest = {
	id: 'UserBenefitsApi',
	start: '2020-05-20',
	expiry: '2025-12-01',
	author: 'Rupert Bates',
	description:
		'This test is being used to roll out the user benefits API in a gradual manner',
	audience: 2 / 100, // 2%
	audienceOffset: 0,
	successMeasure:
		'There are no new client side errors and the user benefits API copes with the load',
	audienceCriteria: 'Everyone',
	showForSensitive: true,
	canRun: () => true,
	variants: [
		{
			id: 'control',
			test: (): void => {
				/* no-op */
			},
		},
		{
			id: 'variant',
			test: (): void => {
				/* no-op */
			},
		},
	],
};
