import type { ABTest } from '@guardian/ab-core';

export const deeplyReadRightColumn: ABTest = {
	id: 'DeeplyReadRightColumn',
	author: '@dotcom-platform',
	start: '2024-05-01',
	expiry: '2024-05-31',
	audience: 0.01,
	audienceOffset: 0.5,
	audienceCriteria: '',
	successMeasure: 'Improved CTR',
	description:
		'Test the impact of adding deeply read component to the right column.',
	variants: [
		{
			id: 'control',
			test: (): void => {},
		},
		{
			id: 'deeply-read-and-most-read',
			test: (): void => {},
		},
		{
			id: 'deeply-read-only',
			test: (): void => {},
		},
	],
	canRun: () => true,
};
