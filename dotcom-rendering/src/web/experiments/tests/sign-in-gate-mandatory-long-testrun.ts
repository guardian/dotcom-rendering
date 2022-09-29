import type { ABTest } from '@guardian/ab-core';
import { getCountryCodeSync } from '../../lib/getCountryCode';
import { setOrUseParticipations } from '../lib/ab-exclusions';

// Flag to determine whether the canRun function 'setOrUseParticipations' will set a participation (true)
// or use localstorage participation key to decide canRun result (false)
const setParticipationsFlag = false;

export const signInGateMandatoryLongTestRunUk: ABTest = {
	id: 'SignInGateMandatoryLongTestRunUk',
	start: '2022-09-20',
	expiry: '2022-10-01',
	author: 'vlbee',
	description:
		'Test run for long mandatory test - Show sign in gate to global users on 3rd article view of simple article templates, with higher priority over banners and epic.',
	audience: 0.0025,
	audienceOffset: 0.89, // 890001 - 892500
	successMeasure: 'Users sign in or create a Guardian account',
	audienceCriteria:
		'Global, 3rd article of the day, lower priority than consent banner, simple articles (not gallery, live etc.), not signed in, not shown after dismiss, not on help, info sections etc. Exclude iOS 9 and guardian-live-australia. Suppresses other banners, and appears over epics',
	dataLinkNames: 'SignInGateMandatoryLongTestRunUk',
	idealOutcome:
		'Increase the number of users signed in whilst running at a reasonable scale',
	showForSensitive: false,
	canRun: () => true,
	variants: [
		{
			id: 'mandatory-long-testrun-uk',
			test: (): void => {},
			canRun: () =>
				['GB'].includes(getCountryCodeSync() ?? '') &&
				setOrUseParticipations(
					setParticipationsFlag,
					'SignInGateMandatoryLongTestRunUk', // test id
					'mandatory-long-testrun-uk', // variant id - can only be used for single variant test
				),
		},
	],
};

export const signInGateMandatoryLongTestRunNa: ABTest = {
	id: 'SignInGateMandatoryLongTestRunNa',
	start: '2022-09-20',
	expiry: '2022-10-01',
	author: 'vlbee',
	description:
		'Test run for long mandatory test - Show sign in gate to global users on 3rd article view of simple article templates, with higher priority over banners and epic.',
	audience: 0.0025,
	audienceOffset: 0.8925, // 892501 - 895000
	successMeasure: 'Users sign in or create a Guardian account',
	audienceCriteria:
		'Global, 3rd article of the day, lower priority than consent banner, simple articles (not gallery, live etc.), not signed in, not shown after dismiss, not on help, info sections etc. Exclude iOS 9 and guardian-live-australia. Suppresses other banners, and appears over epics',
	dataLinkNames: 'SignInGateMandatoryLongTestRunNa',
	idealOutcome:
		'Increase the number of users signed in whilst running at a reasonable scale',
	showForSensitive: false,
	canRun: () => true,
	variants: [
		{
			id: 'mandatory-long-testrun-na',
			test: (): void => {},
			canRun: () =>
				['US', 'CA'].includes(getCountryCodeSync() ?? '') &&
				setOrUseParticipations(
					setParticipationsFlag,
					'SignInGateMandatoryLongTestRunNa', // test id
					'mandatory-long-testrun-na', // variant id - can only be used for single variant test
				),
		},
	],
};

export const signInGateMandatoryLongTestRunAunz: ABTest = {
	id: 'SignInGateMandatoryLongTestRunAunz',
	start: '2022-09-20',
	expiry: '2022-10-01',
	author: 'vlbee',
	description:
		'Test run for long mandatory test - Show sign in gate to global users on 3rd article view of simple article templates, with higher priority over banners and epic.',
	audience: 0.0025,
	audienceOffset: 0.895, // 895001 - 897500
	successMeasure: 'Users sign in or create a Guardian account',
	audienceCriteria:
		'Global, 3rd article of the day, lower priority than consent banner, simple articles (not gallery, live etc.), not signed in, not shown after dismiss, not on help, info sections etc. Exclude iOS 9 and guardian-live-australia. Suppresses other banners, and appears over epics',
	dataLinkNames: 'SignInGateMandatoryLongTestRunAunz',
	idealOutcome:
		'Increase the number of users signed in whilst running at a reasonable scale',
	showForSensitive: false,
	canRun: () => true,
	variants: [
		{
			id: 'mandatory-long-testrun-aunz',
			test: (): void => {},
			canRun: () =>
				['AU', 'NZ'].includes(getCountryCodeSync() ?? '') &&
				setOrUseParticipations(
					setParticipationsFlag,
					'SignInGateMandatoryLongTestRunAunz', // test id
					'mandatory-long-testrun-aunz', // variant id - can only be used for single variant test
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

export const signInGateMandatoryLongTestRunEu: ABTest = {
	id: 'SignInGateMandatoryLongTestRunEu',
	start: '2022-09-20',
	expiry: '2022-10-01',
	author: 'vlbee',
	description:
		'Test run for long mandatory test - Show sign in gate to global users on 3rd article view of simple article templates, with higher priority over banners and epic.',
	audience: 0.0025,
	audienceOffset: 0.8975, // 897501 - 900000
	successMeasure: 'Users sign in or create a Guardian account',
	audienceCriteria:
		'Global, 3rd article of the day, lower priority than consent banner, simple articles (not gallery, live etc.), not signed in, not shown after dismiss, not on help, info sections etc. Exclude iOS 9 and guardian-live-australia. Suppresses other banners, and appears over epics',
	dataLinkNames: 'SignInGateMandatoryLongTestRunEu',
	idealOutcome:
		'Increase the number of users signed in whilst running at a reasonable scale',
	showForSensitive: false,
	canRun: () => true,
	variants: [
		{
			id: 'mandatory-long-testrun-eu',
			test: (): void => {},
			canRun: () =>
				[...EuropeList].includes(getCountryCodeSync() ?? '') &&
				setOrUseParticipations(
					setParticipationsFlag,
					'SignInGateMandatoryLongTestRunEu', // test id
					'mandatory-long-testrun-eu', // variant id - can only be used for single variant test
				),
		},
	],
};
