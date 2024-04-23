import type { ABTest } from '@guardian/ab-core';

export const adBlockAsk: ABTest = {
	id: 'AdBlockAsk',
	author: '@guardian/commercial-dev',
	start: '2024-04-10',
	expiry: '2024-05-31',
	audience: 0 / 100,
	audienceOffset: 0 / 100,
	audienceCriteria: '',
	successMeasure: '',
	description:
		'Show new ad block ask component in ad slots when we detect ad blocker usage',
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
	canRun: () => true,
};
