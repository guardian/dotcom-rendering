import type { ABTest } from '@guardian/ab-core';

export const commercialLazyLoadMargin: ABTest = {
	id: 'CommercialLazyLoadMargin',
	author: 'Zeke Hunter-Green (@zekehuntergreen)',
	description:
		'Test various margins at which ads are lazily-loaded in order to find the optimal one',
	start: '2022-03-29',
	// test should be in place for a minimum of 16 days
	expiry: '2022-05-01',
	audience: 10 / 100,
	audienceOffset: 10 / 100,
	audienceCriteria: 'All pageviews',
	successMeasure: 'Ad ratio, viewability, and CLS remain constant or improve',
	idealOutcome:
		'One of the variants shows a marked improvement in all of the metrics that we are considering',
	variants: [
		{
			id: 'control',
			test: (): void => {},
		},
		{
			id: 'variant-1',
			test: (): void => {},
		},
		{
			id: 'variant-2',
			test: (): void => {},
		},
		{
			id: 'variant-3',
			test: (): void => {},
		},
		{
			id: 'variant-4',
			test: (): void => {},
		},
		{
			id: 'variant-5',
			test: (): void => {},
		},
		{
			id: 'variant-6',
			test: (): void => {},
		},
		{
			id: 'variant-7',
			test: (): void => {},
		},
		{
			id: 'variant-8',
			test: (): void => {},
		},
	],
	canRun: () => true,
};
