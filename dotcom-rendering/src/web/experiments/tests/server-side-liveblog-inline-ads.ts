import type { ABTest } from '@guardian/ab-core';

export const serverSideLiveblogInlineAds: ABTest = {
	id: 'ServerSideLiveblogInlineAds',
	author: '@commercial-dev',
	start: '2022-12-01',
	expiry: '2023-01-01',
	description:
		'Test whether we can load liveblog inline ads server-side without negative effects on user experience or revenue.',
	audience: 0 / 100,
	audienceOffset: 0 / 100,
	audienceCriteria: 'All users',
	successMeasure:
		'There are no negative effects to user experience and there is no reduction in revenue.',
	variants: [
		{ id: 'control', test: (): void => {} },
		{ id: 'variant', test: (): void => {} },
	],
	canRun: () => true,
};
