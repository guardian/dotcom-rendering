import type { ABTest } from '@guardian/ab-core';

export const limitInlineMerch: ABTest = {
	id: 'LimitInlineMerch',
	start: '2023-06-23',
	expiry: '2023-09-01',
	author: '@chrislomaxjones',
	description:
		'Test the impact of limiting the eligibility of inline merchandising ad slots',
	audience: 20 / 100,
	audienceOffset: 40 / 100,
	audienceCriteria:
		'Article pages eligible for rendering an inline merchandising ad slot',
	successMeasure:
		'Limiting the presence of inline merchandising ad slots increases ad-ratio on eligible article pages',
	canRun: () => !!window.guardian.config.page.hasInlineMerchandise,
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
};
