import type { ABTest } from '@guardian/ab-core';
import { getCountryCodeSync } from '../../lib/getCountryCode';

export const removePrebidA9Canada: ABTest = {
	id: 'RemovePrebidA9Canada',
	author: '@commercial-dev',
	start: '2022-11-01',
	expiry: '2023-01-31',
	audience: 10 / 100,
	audienceOffset: 20 / 100,
	audienceCriteria: 'Canada users only',
	successMeasure:
		'There are significant benefits of not initialising Prebid and A9 in Canada',
	description:
		'Testing the benefits of not initialising Prebid and A9 in Canada',
	variants: [
		{ id: 'control', test: (): void => {} },
		{ id: 'variant', test: (): void => {} },
	],
	canRun: () => getCountryCodeSync() == 'CA',
};
