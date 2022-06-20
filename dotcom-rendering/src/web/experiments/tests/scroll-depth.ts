import type { ABTest } from '@guardian/ab-core';

export const scrollDepth: ABTest = {
	id: 'scrollDepth',
	start: '2022-06-20',
	expiry: '2022-07-01',
	author: 'mxdvl',
	description:
		'Record scroll depth for a subset of readers, using the logs.guardianapis.com endpoint',
	audience: 20 / 100,
	audienceOffset: 30 / 100,
	successMeasure: '',
	audienceCriteria: 'Everyone',
	showForSensitive: true,
	canRun: () => true,
	variants: [
		{
			id: 'control',
			test: (): void => {},
		},
		{
			id: 'variant',
			test: (): void => {},
		},
	],
};
