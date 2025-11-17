import type { ABTest } from '@guardian/ab-core';

export const personalisedHighlights: ABTest = {
	id: 'PersonalisedHighlights',
	start: '2025-11-17',
	expiry: '2025-12-01',
	author: 'Anna Beddow',
	description:
		'Allow user behaviour to personalise the ordering of cards in the highlights container.',
	audience: 0.75,
	audienceOffset: 0,
	successMeasure: '',
	audienceCriteria: '',
	idealOutcome: '',
	showForSensitive: true,
	canRun: () => true,
	variants: [
		{
			id: 'control',
			test: (): void => {
				/* no-op */
			},
		},
		{
			id: 'click-tracking',
			test: (): void => {
				/* no-op */
			},
		},
		{
			id: 'view-tracking',
			test: (): void => {
				/* no-op */
			},
		},
		{
			id: 'click-and-view-tracking',
			test: (): void => {
				/* no-op */
			},
		},
	],
};
