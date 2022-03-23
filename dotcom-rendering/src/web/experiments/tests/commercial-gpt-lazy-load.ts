import type { ABTest } from '@guardian/ab-core';

export const commercialGptLazyLoad: ABTest = {
	id: 'CommercialGptLazyLoad',
	author: 'Zeke Hunter-Green (@zekehuntergreen)',
	start: '2022-03-24',
	expiry: '2022-04-01',
	audience: 1 / 100,
	audienceOffset: 10 / 100,
	audienceCriteria: 'All pageviews',
	successMeasure: 'Ad ratio and viewability remain constant or improve',
	description:
		'This test compares GPT enableLazyLoad to our custom-built lazy load solution',
	variants: [
		{ id: 'control', test: (): void => {} },
		{ id: 'variant', test: (): void => {} },
	],
	canRun: () => true,
};
