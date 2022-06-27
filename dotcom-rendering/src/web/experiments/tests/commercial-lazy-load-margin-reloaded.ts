import type { ABTest } from '@guardian/ab-core';

export const commercialLazyLoadMarginReloaded: ABTest = {
	id: 'CommercialLazyLoadMarginReloaded',
	author: 'Simon Byford',
	description:
		'Once again test various margins at which ads are lazily-loaded in order to find the optimal one, this time using values between 0% and 70% of the viewport height',
	start: '2022-06-20',
	expiry: '2022-07-04',
	audience: 20 / 100,
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
	],
	canRun: () => true,
};
