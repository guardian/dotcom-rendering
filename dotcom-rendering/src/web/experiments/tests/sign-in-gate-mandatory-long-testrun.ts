import type { ABTest } from '@guardian/ab-core';
import { getCountryCodeSync } from '../../../web/lib/getCountryCode';
import { setOrUseParticipations } from '../lib/ab-exclusions';

// Flag to determine whether the canRun function 'setOrUseParticipations' will set a participation (true)
// or use localstorage participation key to decide canRun result (false)
const setParticipationsFlag = true;

export const signInGateMandatoryLongBucketingTestRun: ABTest = {
	id: 'SignInGateMandatoryLongBucketingTestRun',
	start: '2022-10-05',
	expiry: '2022-12-01',
	author: 'vlbee',
	description:
		'Test run for long mandatory test - Show sign in gate to global users on 3rd article view of simple article templates, with higher priority over banners and epic.',
	audience: 0.0025,
	audienceOffset: 0.89,
	successMeasure: 'Users sign in or create a Guardian account',
	audienceCriteria:
		'Global, 3rd article of the day, lower priority than consent banner, simple articles (not gallery, live etc.), not signed in, not shown after dismiss, not on help, info sections etc. Exclude iOS 9 and guardian-live-australia. Suppresses other banners, and appears over epics',
	dataLinkNames: 'SignInGateMandatoryLongBucketingTestRun',
	idealOutcome:
		'Increase the number of users signed in whilst running at a reasonable scale',
	showForSensitive: false,
	canRun: () => true,
	variants: [
		{
			id: 'mandatory-long-bucketing-testrun',
			test: (): void => {},
			canRun: () =>
				setOrUseParticipations(
					setParticipationsFlag,
					'SignInGateMandatoryLongBucketingTestRun', // test id
					'mandatory-long-bucketing-testrun', // variant id - can only be used for single variant test
				),
		},
	],
};
export const signInGateMandatoryLongBucketingTestRunUk: ABTest = {
	id: 'SignInGateMandatoryLongBucketingTestRunUk',
	start: '2022-10-05',
	expiry: '2022-12-01',
	author: 'vlbee',
	description:
		'Test run for long mandatory test - Show sign in gate to global users on 3rd article view of simple article templates, with higher priority over banners and epic.',
	audience: 0.0025,
	audienceOffset: 0.8925,
	successMeasure: 'Users sign in or create a Guardian account',
	audienceCriteria:
		'Global, 3rd article of the day, lower priority than consent banner, simple articles (not gallery, live etc.), not signed in, not shown after dismiss, not on help, info sections etc. Exclude iOS 9 and guardian-live-australia. Suppresses other banners, and appears over epics',
	dataLinkNames: 'SignInGateMandatoryLongBucketingTestRunUk',
	idealOutcome:
		'Increase the number of users signed in whilst running at a reasonable scale',
	showForSensitive: false,
	canRun: () => true,
	variants: [
		{
			id: 'mandatory-long-bucketing-testrun-uk',
			test: (): void => {},
			canRun: () =>
				['GB'].includes(getCountryCodeSync() ?? '') &&
				setOrUseParticipations(
					setParticipationsFlag,
					'SignInGateMandatoryLongBucketingTestRunUk', // test id
					'mandatory-long-bucketing-testrun-uk', // variant id - can only be used for single variant test
				),
		},
	],
};

export const signInGateMandatoryLongBucketingTestRunNa: ABTest = {
	id: 'SignInGateMandatoryLongBucketingTestRunNa',
	start: '2022-10-05',
	expiry: '2022-12-01',
	author: 'vlbee',
	description:
		'Test run for long mandatory test - Show sign in gate to global users on 3rd article view of simple article templates, with higher priority over banners and epic.',
	audience: 0.0025,
	audienceOffset: 0.895,
	successMeasure: 'Users sign in or create a Guardian account',
	audienceCriteria:
		'Global, 3rd article of the day, lower priority than consent banner, simple articles (not gallery, live etc.), not signed in, not shown after dismiss, not on help, info sections etc. Exclude iOS 9 and guardian-live-australia. Suppresses other banners, and appears over epics',
	dataLinkNames: 'SignInGateMandatoryLongBucketingTestRunNa',
	idealOutcome:
		'Increase the number of users signed in whilst running at a reasonable scale',
	showForSensitive: false,
	canRun: () => true,
	variants: [
		{
			id: 'mandatory-long-bucketing-testrun-na',
			test: (): void => {},
			canRun: () =>
				['US', 'CA'].includes(getCountryCodeSync() ?? '') &&
				setOrUseParticipations(
					setParticipationsFlag,
					'SignInGateMandatoryLongBucketingTestRunNa', // test id
					'mandatory-long-bucketing-testrun-na', // variant id - can only be used for single variant test
				),
		},
	],
};

const EuropeList = [
	'AX',
	'AL',
	'AD',
	'AT',
	'BE',
	'BG',
	'BA',
	'BY',
	'CH',
	'CZ',
	'DE',
	'DK',
	'ES',
	'EE',
	'FI',
	'FR',
	'FO',
	'GG',
	'GI',
	'GR',
	'HR',
	'HU',
	'IM',
	'IE',
	'IS',
	'IT',
	'JE',
	'LI',
	'LT',
	'LU',
	'LV',
	'MC',
	'MD',
	'MK',
	'MT',
	'ME',
	'NL',
	'NO',
	'PL',
	'PT',
	'RO',
	'RU',
	'SJ',
	'SM',
	'RS',
	'SK',
	'SI',
	'SE',
	'UA',
	'VA',
	'XK',
];

export const signInGateMandatoryLongBucketingTestRunEu: ABTest = {
	id: 'SignInGateMandatoryLongBucketingTestRunEu',
	start: '2022-10-05',
	expiry: '2022-12-01',
	author: 'vlbee',
	description:
		'Test run for long mandatory test - Show sign in gate to global users on 3rd article view of simple article templates, with higher priority over banners and epic.',
	audience: 0.0025,
	audienceOffset: 0.8975,
	successMeasure: 'Users sign in or create a Guardian account',
	audienceCriteria:
		'Global, 3rd article of the day, lower priority than consent banner, simple articles (not gallery, live etc.), not signed in, not shown after dismiss, not on help, info sections etc. Exclude iOS 9 and guardian-live-australia. Suppresses other banners, and appears over epics',
	dataLinkNames: 'SignInGateMandatoryLongBucketingTestRunEu',
	idealOutcome:
		'Increase the number of users signed in whilst running at a reasonable scale',
	showForSensitive: false,
	canRun: () => true,
	variants: [
		{
			id: 'mandatory-long-bucketing-testrun-eu',
			test: (): void => {},
			canRun: () =>
				[...EuropeList].includes(getCountryCodeSync() ?? '') &&
				setOrUseParticipations(
					setParticipationsFlag,
					'SignInGateMandatoryLongBucketingTestRunEu', // test id
					'mandatory-long-bucketing-testrun-eu', // variant id - can only be used for single variant test
				),
		},
	],
};
