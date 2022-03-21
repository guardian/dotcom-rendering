import type { ABTest } from '@guardian/ab-core';

export const commercialLazyLoadMargin: ABTest = {
	id: 'CommercialLazyLoadMargin',
	author: 'Zeke Hunter-Green (@zekehuntergreen)',
	description:
		'Test various margins at which ads are lazily-loaded in order to find the optimal one',
	start: '2022-03-22',
	// test should be in place for a minimum of 14 days
	expiry: '2022-04-06',
	audience: 5 / 100,
	audienceOffset: 11 / 100,
	audienceCriteria: 'All pageviews',
	successMeasure: 'Ad ratio, viewability, and CLS remain constant or improve',
	idealOutcome:
		'One of the variants shows a marked improvement in all of the metrics that we are considering',
	variants: [
		{ id: 'control', test: (): void => {} },
		{ id: 'variant', test: (): void => {} },
	],
	canRun: () => true,
};
