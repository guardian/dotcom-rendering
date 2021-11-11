import type { ABTest } from '@guardian/ab-core';

export const prebidTimeout: ABTest = {
	id: 'PrebidTimeout',
	author: 'Chris Jones (@chrislomaxjones)',
	start: '2021-10-6',
	expiry: '2021-11-15',
	audience: 3 / 100,
	audienceOffset: 0,
	audienceCriteria: 'All users',
	description:
		'Vary the length of the prebid timeout beyond which we stop accepting bids. See if varying this timeout leads to any changes in commercial timing metrics',
	successMeasure:
		'Varying the length of the prebid timeout has an effect on commercial timing metrics',
	variants: [
		{ id: 'variant500', test: (): void => {} },
		{ id: 'variant1500', test: (): void => {} },
		{ id: 'variant4000', test: (): void => {} },
	],
	canRun: () => true,
};
