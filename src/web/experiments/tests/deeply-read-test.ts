import { ABTest } from '@guardian/ab-core';

export const deeplyReadTest: ABTest = {
	id: 'DeeplyReadTest',
	start: '2021-01-05',
	expiry: '2021-01-25',
	author: 'nitro-marky',
	description:
		'Tests an onward hypothesis by replacing the second tab in the Most Popular container with deeply read items.',
	audience: 0.25,
	audienceOffset: 0,
	successMeasure: 'Increased CTR on article pages',
	audienceCriteria: 'Everyone',
	idealOutcome:
		'An increase in CTR compared to the standard onward container',
	showForSensitive: true,
	canRun: () => true,
	variants: [
		{
			id: 'control',
			test: (): void => {},
			impression: (impression) => {
				impression();
			},
			success: (success) => {
				success();
			},
		},
		{
			id: 'variant',
			test: (): void => {},
			impression: (impression) => {
				impression();
			},
			success: (success) => {
				success();
			},
		},
	],
};
