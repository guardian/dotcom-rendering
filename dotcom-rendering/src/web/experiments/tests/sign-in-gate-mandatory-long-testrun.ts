import type { ABTest } from '@guardian/ab-core';
import { setOrUseParticipations } from '../lib/ab-exclusions';

// Flag to determine whether the canRun function 'setOrUseParticipations' will set a participation (true)
// or use localstorage participation key to decide canRun result (false)
const setParticipationsFlag = true;

export const signInGateMandatoryLongTestRun: ABTest = {
	id: 'SignInGateMandatoryLongTestRun',
	start: '2022-08-01',
	expiry: '2022-10-01',
	author: 'vlbee',
	description:
		'Show mandatory sign in gate to global users on 3rd article view of simple article templates, with higher priority over banners and epic.',
	audience: 0.0001, // todo
	audienceOffset: 0.0, // todo
	successMeasure: 'Users sign in or create a Guardian account',
	audienceCriteria:
		'Global, 3rd article of the day, lower priority than consent banner, simple articles (not gallery, live etc.), not signed in, not shown after dismiss, not on help, info sections etc. Exclude iOS 9 and guardian-live-australia. Suppresses other banners, and appears over epics',
	dataLinkNames: 'SignInGateMandatoryLongTestVariant',
	idealOutcome:
		'Increase the number of users signed in whilst running at a reasonable scale',
	showForSensitive: false,
	canRun: () =>
		setOrUseParticipations(
			setParticipationsFlag,
			'SignInGateMandatoryLongTestRun', // test id
			'mandatory-long-testrun', // variant id - can only be used for single variant test
		),
	variants: [
		{
			id: 'mandatory-long-testrun',
			test: (): void => {},
		},
	],
};
