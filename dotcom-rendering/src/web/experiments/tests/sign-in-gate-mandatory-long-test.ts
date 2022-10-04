import type { ABTest } from '@guardian/ab-core';
import { CountryCode } from '@guardian/libs';
import { getCountryCodeSync } from '../../lib/getCountryCode';
import { setOrUseParticipations } from '../lib/ab-exclusions';

// Flag to determine whether the canRun function 'setOrUseParticipations' will set a participation (true)
// or use localstorage participation key to decide canRun result (false)
const setParticipationsFlag = true;

const EuropeList: (CountryCode | '')[] = [
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
];

const sharedTestData = {
	start: '2022-10-04',
	expiry: '2023-01-18',
	author: 'vlbee',
	description:
		'Long-running mandatory sign in gate - Show gate to global users on 3rd article view of simple article templates, with higher priority over banners and epic.',
	audienceCriteria:
		'Restricted by region, 3rd article of the day, lower priority than consent banner, simple articles (not gallery, live etc.), not signed in, not shown after dismiss, not on help, info sections etc. Exclude iOS 9 and guardian-live-australia. Suppresses other banners, and appears over epics',
	successMeasure:
		'Primary metric will be the average attention time per browser. Secondary: Average page views per browser, Sessions per browser, Gate conversion rate, Average days between visits, Engagement score, Reader revenue, Programmatic ad revenue',
	idealOutcome:
		'Significantly grow the number of registered and signed in users amongst this cohort, with appropriate permissions but achieve this without meaningfully denting engagement with our journalism or long-term ad revenue',
	showForSensitive: false,
	canRun: (): boolean => true,
};

export const signInGateMandatoryLongTestControlUk = {
	...sharedTestData,
	id: 'SignInGateMandatoryLongTestControlUk',
	audience: 0.0358,
	audienceOffset: 0,
	dataLinkNames: 'SignInGateMandatoryLongTestControlUk',
	variants: [
		{
			id: 'mandatory-long-test-control-uk',
			test: (): void => {},
			canRun: (): boolean =>
				['GB'].includes(getCountryCodeSync() ?? '') &&
				setOrUseParticipations(
					setParticipationsFlag,
					'SignInGateMandatoryLongTestControlUk', // test id
					'mandatory-long-test-control-uk', // variant id - can only be used for single variant test
				),
		},
	],
};

export const signInGateMandatoryLongTestVariantUk = {
	...sharedTestData,
	id: 'SignInGateMandatoryLongTestVariantUk',
	audience: 0.0165,
	audienceOffset: 0.8373,
	dataLinkNames: 'SignInGateMandatoryLongTestVariantUk',
	variants: [
		{
			id: 'mandatory-long-test-variant-uk',
			test: (): void => {},
			canRun: (): boolean =>
				['GB'].includes(getCountryCodeSync() ?? '') &&
				setOrUseParticipations(
					setParticipationsFlag,
					'SignInGateMandatoryLongTestVariantUk', // test id
					'mandatory-long-test-variant-uk', // variant id - can only be used for single variant test
				),
		},
	],
};

export const signInGateMandatoryLongTestControlNa = {
	...sharedTestData,
	id: 'SignInGateMandatoryLongTestControlNa',
	audience: 0.0919,
	audienceOffset: 0,
	dataLinkNames: 'SignInGateMandatoryLongTestControlNA',
	variants: [
		{
			id: 'mandatory-long-test-control-na',
			test: (): void => {},
			canRun: (): boolean =>
				['US', 'CA'].includes(getCountryCodeSync() ?? '') &&
				setOrUseParticipations(
					setParticipationsFlag,
					'SignInGateMandatoryLongTestControlNa', // test id
					'mandatory-long-test-control-na', // variant id - can only be used for single variant test
				),
		},
	],
};

export const signInGateMandatoryLongTestVariantNa = {
	...sharedTestData,
	id: 'SignInGateMandatoryLongTestVariantNa',
	audience: 0.042,
	audienceOffset: 0.8373,
	dataLinkNames: 'SignInGateMandatoryLongTestVariantNA',
	variants: [
		{
			id: 'mandatory-long-test-variant-na',
			test: (): void => {},
			canRun: (): boolean =>
				['US', 'CA'].includes(getCountryCodeSync() ?? '') &&
				setOrUseParticipations(
					setParticipationsFlag,
					'SignInGateMandatoryLongTestVariantNa', // test id
					'mandatory-long-test-variant-na', // variant id - can only be used for single variant test
				),
		},
	],
};

export const signInGateMandatoryLongTestControlAunz = {
	...sharedTestData,
	id: 'SignInGateMandatoryLongTestControlAunz',
	audience: 0.1254,
	audienceOffset: 0,
	dataLinkNames: 'SignInGateMandatoryLongTestControlAunz',
	variants: [
		{
			id: 'mandatory-long-test-control-aunz',
			test: (): void => {},
			canRun: (): boolean =>
				['AU', 'NZ'].includes(getCountryCodeSync() ?? '') &&
				setOrUseParticipations(
					setParticipationsFlag,
					'SignInGateMandatoryLongTestControlAunz', // test id
					'mandatory-long-test-control-aunz', // variant id - can only be used for single variant test
				),
		},
	],
};

export const signInGateMandatoryLongTestVariantAunz = {
	...sharedTestData,
	id: 'SignInGateMandatoryLongTestVariantAunz',
	audience: 0.0627,
	audienceOffset: 0.8373,
	dataLinkNames: 'SignInGateMandatoryLongTestVariantAunz',
	variants: [
		{
			id: 'mandatory-long-test-variant-aunz',
			test: (): void => {},
			canRun: (): boolean =>
				['AU', 'NZ'].includes(getCountryCodeSync() ?? '') &&
				setOrUseParticipations(
					setParticipationsFlag,
					'SignInGateMandatoryLongTestVariantAunz', // test id
					'mandatory-long-test-variant-aunz', // variant id - can only be used for single variant test
				),
		},
	],
};

export const signInGateMandatoryLongTestControlEu = {
	...sharedTestData,
	id: 'SignInGateMandatoryLongTestControlEu',
	audience: 0.0773,
	audienceOffset: 0,
	dataLinkNames: 'SignInGateMandatoryLongTestControlEu',
	variants: [
		{
			id: 'mandatory-long-test-control-eu',
			test: (): void => {},
			canRun: (): boolean =>
				[...EuropeList].includes(getCountryCodeSync() ?? '') &&
				setOrUseParticipations(
					setParticipationsFlag,
					'SignInGateMandatoryLongTestControlEu', // test id
					'mandatory-long-test-control-eu', // variant id - can only be used for single variant test
				),
		},
	],
};

export const signInGateMandatoryLongTestVariantEu: ABTest = {
	...sharedTestData,
	id: 'SignInGateMandatoryLongTestVariantEu',
	audience: 0.0365,
	audienceOffset: 0.8373,
	dataLinkNames: 'SignInGateMandatoryLongTestVariantEu',
	variants: [
		{
			id: 'mandatory-long-test-variant-eu',
			test: (): void => {},
			canRun: (): boolean =>
				[...EuropeList].includes(getCountryCodeSync() ?? '') &&
				setOrUseParticipations(
					setParticipationsFlag,
					'SignInGateMandatoryLongTestVariantEu', // test id
					'mandatory-long-test-variant-eu', // variant id - can only be used for single variant test
				),
		},
	],
};
