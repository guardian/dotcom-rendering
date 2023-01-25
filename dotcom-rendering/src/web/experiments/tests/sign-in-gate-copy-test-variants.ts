import { ABTest } from '@guardian/ab-core';

export const signInGateCopyTestVariants: ABTest = {
	id: 'SignInGateCopyTestVariants',
	start: '2023-01-23',
	expiry: '2025-12-01',
	author: 'Lindsey Dew',
	description: 'TODO',
	audience: 0.0,
	audienceOffset: 0.0,
	successMeasure: 'Users sign in or create a Guardian account',
	audienceCriteria: 'TODO',
	dataLinkNames: 'SignInGateCopyTest',
	idealOutcome:
		'Increase the number of users signed in whilst running at a reasonable scale',
	showForSensitive: false,
	canRun: () => true,
	variants: [
		{
			id: 'sign-in-gate-copy-1',
			test: (): void => {},
		},
		{
			id: 'sign-in-gate-copy-2',
			test: (): void => {},
		},
		{
			id: 'sign-in-gate-copy-3',
			test: (): void => {},
		},
	],
};
