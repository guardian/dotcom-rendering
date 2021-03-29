import { ABTest } from '@guardian/ab-core';

export const stickyNavTest: ABTest = {
	id: 'StickyNavTest',
	start: '2021-02-10',
	expiry: '2021-05-03',
	author: 'nlong',
	description: 'Tests sticky nav behaviour.',
	audience: 0.01,
	audienceOffset: 0,
	successMeasure:
		'Increased CTR on sticky variant, more visits to fronts, increase in number of pillars visited per user.',
	audienceCriteria: 'Everyone',
	idealOutcome:
		'Significant increase in the metrics mentioned, consistent with hypothesis that sticky nav improves pillar understanding and engagement.',
	showForSensitive: true,
	canRun: () => true,
	variants: [
		{
			id: 'control',
			test: (): void => {},
		},
		{
			id: 'sticky-nav-anchor',
			test: (): void => {},
		},
		{
			id: 'sticky-nav-backscroll',
			test: (): void => {},
		},
	],
};
