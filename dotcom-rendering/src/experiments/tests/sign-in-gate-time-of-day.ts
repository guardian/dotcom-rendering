import type { ABTest } from '@guardian/ab-core';

export const signInGateTimesOfDay: ABTest = {
	id: 'SignInGateTimesOfDay',
	start: '2023-12-04',
	expiry: '2023-12-09',
	author: 'Lindsey Dew',
	description: 'Show sign in gate more frequently to users in the morning',
	audience: 0.45,
	audienceOffset: 0.45,
	successMeasure: 'Increase registration and sign ins by 5%',
	audienceCriteria:
		'1st article of the day, max 5 articles, lower priority than consent banner, simple articles (not gallery, live etc.), not signed in, not shown after dismiss, not on help, info sections etc. Exclude iOS 9 and guardian-live-australia. Suppresses other banners, and appears over epics',
	dataLinkNames: 'SignInGateTimesOfDay',
	showForSensitive: false,
	canRun: () => true,
	variants: [
		{
			id: 'morning',
			test: (): void => {},
		},
	],
};
