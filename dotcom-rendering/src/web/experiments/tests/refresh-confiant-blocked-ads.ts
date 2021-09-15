import type { ABTest } from '@guardian/ab-core';

export const refreshConfiantBlockedAds: ABTest = {
	id: 'RefreshConfiantBlockedAds',
	author: 'Max Duval (@mxdvl)',
	start: '2021-09-07',
	expiry: '2021-10-01',
	audience: 1,
	audienceOffset: 0,
	audienceCriteria: 'All users',
	successMeasure: 'Refreshing blocked slots lead to revenue uplift',
	description: 'Check whether refreshing blocked ads lead to revenue uplift',
	variants: [
		{ id: 'control', test: () => undefined },
		{ id: 'variant', test: () => undefined },
	],
	canRun: () => true,
};
