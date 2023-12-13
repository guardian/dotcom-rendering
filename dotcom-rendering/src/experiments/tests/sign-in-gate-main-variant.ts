import type { ABTest } from '@guardian/ab-core';

export const signInGateMainVariant: ABTest = {
	id: 'SignInGateMainVariant',
	start: '2020-06-09',
	expiry: '2025-12-01',
	author: 'Mahesh Makani',
	description:
		'Show sign in gate to 100% of users on 3rd article view of simple article templates, and show a further 5 times after the first dismissal, with higher priority over banners and epic. Main/Variant Audience.',
	audience: 0.82,
	audienceOffset: 0.0,
	successMeasure: 'Users sign in or create a Guardian account',
	audienceCriteria:
		'3rd article of the day, lower priority than consent banner, simple articles (not gallery, live etc.), not signed in, not shown after dismiss, not on help, info sections etc. Exclude iOS 9 and guardian-live-australia. Suppresses other banners, and appears over epics',
	dataLinkNames: 'SignInGateMain',
	idealOutcome:
		'Increase the number of users signed in whilst running at a reasonable scale',
	showForSensitive: false,
	canRun: () => true,
	variants: [
		{
			id: 'main-variant-5',
			test: (): void => {},
		},
	],
};
