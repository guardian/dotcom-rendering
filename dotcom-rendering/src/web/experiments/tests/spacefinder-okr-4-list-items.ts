import type { ABTest } from '@guardian/ab-core';

export const spacefinderOkr4ListItems: ABTest = {
	id: 'SpacefinderOkr4ListItems',
	author: 'Simon Byford (@simonbyford)',
	start: '2022-03-07',
	expiry: '2022-04-01',
	audience: 10 / 100,
	audienceOffset: 50 / 100,
	audienceCriteria: 'All pageviews',
	successMeasure:
		'Fixing the bug leads to an increase in inline programmatic revenue per 1000 pageviews',
	description:
		'Check whether considering list items as candidates in spacefinder leads to an increase in inline programmatic revenue per 1000 pageviews',
	variants: [
		{ id: 'control', test: (): void => {} },
		{ id: 'variant', test: (): void => {} },
	],
	canRun: () => true,
};
