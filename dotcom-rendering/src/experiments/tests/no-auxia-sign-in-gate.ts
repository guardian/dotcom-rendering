import type { ABTest } from '@guardian/ab-core';

/**
 * The requirement:
 * 1. keep a fixed 5% of the global audience excluded from Auxia (though they can still see gates)
 * 2. track participation of this 5% in the pageview table, regardless of whether they see gates
 *
 * The solution:
 * - On every article view, put 5% of the audience into a special NoAuxiaSignInGate AB test. This means the page tracks membership of the "test" through ophan. There are no variants in this test, it's just a way to track these browsers.
 * - The API call for the sign-in gate includes a flag indicating that the browser is in the NoAuxiaSignInGate test, and it excludes them from Auxia based on this.
 *
 * This enables us to query the pageview table for browsers in the NoAuxiaSignInGate group using the existing ab_test_array field.
 */
export const noAuxiaSignInGate: ABTest = {
	id: 'NoAuxiaSignInGate',
	start: '2025-11-01',
	expiry: '2027-11-01',
	author: 'Growth Team',
	description:
		'Defines a control group who should not have sign-in gate journeys handled by Auxia',
	audience: 0.05,
	audienceOffset: 0.95,
	audienceCriteria: 'All users',
	successMeasure: 'Control group for Auxia sign-in gate testing',
	canRun: () => true,
	variants: [
		{
			id: 'control',
			test: (): void => {},
		},
	],
};
