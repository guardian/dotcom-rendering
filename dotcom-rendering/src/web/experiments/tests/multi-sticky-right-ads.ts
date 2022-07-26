import type { ABTest } from '@guardian/ab-core';

export const multiStickyRightAds: ABTest = {
	id: 'MultiStickyRightAds',
	author: 'Chris Jones (@chrislomaxjones)',
	start: '2022-06-9',
	expiry: '2022-08-02',
	audience: 0 / 100,
	audienceOffset: 50 / 100,
	audienceCriteria: 'All pageviews',
	successMeasure:
		'Sticky ads in the right column leads to an increase in revenue per 1000 pageviews with no significant impact on page health / performance',
	description:
		'Test the commercial and performance impact of sticky ads in the right column',
	variants: [
		{ id: 'control', test: (): void => {} },
		{ id: 'variant', test: (): void => {} },
	],
	canRun: () => true,
};
