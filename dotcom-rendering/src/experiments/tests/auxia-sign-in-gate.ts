import type { ABTest } from '@guardian/ab-core';

export const auxiaSignInGate: ABTest = {
	id: 'AuxiaSignInGate',
	start: '2025-01-23',
	expiry: '2026-01-30',
	author: 'Pascal (Growth Team)',
	description:
		'R&D Experiment: using Auxia API to drive the behavior of the SignIn gate',
	audience: 0.1,
	audienceOffset: 0,
	successMeasure: '',
	audienceCriteria: '',
	dataLinkNames: 'AuxiaSignInGate',
	idealOutcome: '',
	showForSensitive: false,
	canRun: () => true,
	variants: [
		{
			id: 'auxia-signin-gate',
			test: (): void => {},
		},
	],
};
