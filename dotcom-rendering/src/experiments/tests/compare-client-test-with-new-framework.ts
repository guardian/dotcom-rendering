import type { ABTest } from '@guardian/ab-core';

export const compareClientTestWithNewFramework: ABTest = {
	id: 'CompareClientTestWithNewFramework',
	start: '2025-10-08',
	expiry: '2025-11-01',
	author: 'Commercial Dev',
	description:
		'A test to compare the old and new AB testing frameworks in DCR',
	audience: 10 / 100,
	audienceOffset: 0,
	successMeasure:
		'No success measure, this is just to compare the two frameworks',
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
