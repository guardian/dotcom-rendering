import type { ABTest } from '@guardian/ab-core';

export const feastContextualNudge: ABTest = {
	id: 'FeastContextualNudge',
	start: '2026-04-24',
	expiry: '2027-01-01',
	author: 'feast-team',
	description:
		'Shows a contextual nudge on recipe article pages to drive Feast app installs (non-subscribers) and activate HVS Supporter Plus benefits.',
	audience: 0.5, // 50% — split evenly between control and variant
	audienceOffset: 0,
	successMeasure:
		'Nudge click-through rate, Feast app installs, HVS activation rate',
	audienceCriteria: 'Users landing on recipe article pages',
	idealOutcome:
		'Increased Feast app installs and Supporter Plus activation, without negative impact on reader satisfaction scores',
	showForSensitive: false,
	canRun: () => true,
	variants: [
		{
			id: 'control',
			test: (): void => {},
		},
		{
			id: 'variant',
			test: (): void => {},
		},
	],
};
