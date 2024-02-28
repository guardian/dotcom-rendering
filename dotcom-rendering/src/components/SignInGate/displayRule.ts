// use the dailyArticleCount from the local storage to see how many articles the user has viewed in a day
import { onConsent } from '@guardian/consent-management-platform';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import type { CountryCode } from '@guardian/libs';
import type { DailyArticle } from '../../lib/dailyArticleCount';
import { getDailyArticleCount } from '../../lib/dailyArticleCount';
import type { TagType } from '../../types/tag';
import { hasUserDismissedGateMoreThanCount } from './dismissGate';
import type { CanShowGateProps } from './types';

// in our case if this is the n-numbered article or higher the user has viewed then set the gate
export const isNPageOrHigherPageView = (n = 2): boolean => {
	// get daily read article count array from local storage
	const [dailyCount = {} as DailyArticle] = getDailyArticleCount() ?? [];

	const { count = 0 } = dailyCount;

	return count >= n;
};

// determine if the useragent is running iOS 9 (known to be buggy for sign in flow)
export const isIOS9 = (): boolean => {
	// get the browser user agent
	const ua = navigator.userAgent;
	// check useragent if the device is an iOS device
	const appleDevice = /(iPhone|iPod|iPad)/i.test(ua);
	// check useragent if the os is version 9
	const os = /(CPU OS 9_)/i.test(ua);

	// if both true, then it's an apple ios 9 device
	return appleDevice && os;
};

// hide the sign in gate on article types that are not supported
export const isValidContentType = (contentType: string): boolean => {
	// It's safer to definitively *include* types as we
	// know new types will not break the sign-in-gate going forward
	const validTypes = ['Article'];

	return validTypes.some((type: string): boolean => contentType === type);
};

// hide the sign in gate on certain sections of the site, e.g info, about, help etc.
export const isValidSection = (sectionId?: string): boolean => {
	const invalidSections = [
		'about',
		'info',
		'membership',
		'help',
		'guardian-live-australia',
		'gnm-archive',
	];

	// we check for invalid section by reducing the above array, and then NOT the result so we know
	// its a valid section
	return !invalidSections.some(
		(section: string): boolean => sectionId === section,
	);
};

// hide the sign in gate for certain tags on the site
export const isValidTag = (tags: TagType[]): boolean => {
	const invalidTags = ['info/newsletter-sign-up'];

	return !invalidTags.some((invalidTag) =>
		tags.map((tag) => tag.id).includes(invalidTag),
	);
};

// check CMP banner consents
export const hasRequiredConsents = (): Promise<boolean> =>
	onConsent()
		.then(({ canTarget }: ConsentState) => canTarget)
		.catch(() => false);

export const canShowSignInGate = ({
	isSignedIn,
	currentTest,
	contentType,
	sectionId,
	tags,
	isPaidContent,
	isPreview,
}: CanShowGateProps): Promise<boolean> =>
	Promise.resolve(
		!isSignedIn &&
			!hasUserDismissedGateMoreThanCount(
				currentTest.variant,
				currentTest.name,
				5,
			) &&
			isNPageOrHigherPageView(3) &&
			isValidContentType(contentType) &&
			isValidSection(sectionId) &&
			isValidTag(tags) &&
			// hide the sign in gate on isPaidContent
			!isPaidContent &&
			// hide the sign in gate on internal tools preview &&
			!isPreview &&
			!isIOS9(),
	);

export const canShowSignInGateMandatory: ({
	isSignedIn,
	currentTest,
	contentType,
	sectionId,
	tags,
	isPaidContent,
	isPreview,
	currentLocaleCode,
}: CanShowGateProps) => Promise<boolean> = async ({
	isSignedIn,
	currentTest,
	contentType,
	sectionId,
	tags,
	isPaidContent,
	isPreview,
	currentLocaleCode,
}: CanShowGateProps) => {
	return (
		(await hasRequiredConsents()) &&
		(await canShowSignInGate({
			isSignedIn,
			currentTest,
			contentType,
			sectionId,
			tags,
			isPaidContent,
			isPreview,
			currentLocaleCode,
		}))
	);
};

const US_REGION_CODES: (CountryCode | undefined)[] = [
	'US',
	'AS',
	'GU',
	'MP',
	'PR',
	'VI',
];

const EU_REGION_CODES: (CountryCode | undefined)[] = [
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

const ROW_REGION_CODES: (CountryCode | undefined)[] = [
	'AW',
	'AF',
	'AO',
	'AI',
	'AE',
	'AR',
	'AM',
	'AQ',
	'TF',
	'AG',
	'AZ',
	'BI',
	'BJ',
	'BQ',
	'BF',
	'BD',
	'BH',
	'BS',
	'BL',
	'BZ',
	'BM',
	'BO',
	'BR',
	'BB',
	'BN',
	'BT',
	'BV',
	'BW',
	'CF',
	'CC',
	'CL',
	'CN',
	'CI',
	'CM',
	'CD',
	'CG',
	'CK',
	'CO',
	'KM',
	'CV',
	'CR',
	'CU',
	'CW',
	'CX',
	'KY',
	'CY',
	'DJ',
	'DM',
	'DO',
	'DZ',
	'EC',
	'EG',
	'ER',
	'EH',
	'ET',
	'FJ',
	'FK',
	'FM',
	'GA',
	'GE',
	'GH',
	'GN',
	'GP',
	'GM',
	'GW',
	'GQ',
	'GD',
	'GL',
	'GT',
	'GF',
	'GY',
	'HK',
	'HM',
	'HN',
	'HT',
	'ID',
	'IN',
	'IO',
	'IR',
	'IQ',
	'IL',
	'JM',
	'JO',
	'JP',
	'KZ',
	'KE',
	'KG',
	'KH',
	'KI',
	'KN',
	'KR',
	'KW',
	'LA',
	'LB',
	'LR',
	'LY',
	'LC',
	'LK',
	'LS',
	'MO',
	'MF',
	'MA',
	'MG',
	'MV',
	'MX',
	'MH',
	'ML',
	'MM',
	'MN',
	'MZ',
	'MR',
	'MS',
	'MQ',
	'MU',
	'MW',
	'MY',
	'YT',
	'NA',
	'NC',
	'NE',
	'NF',
	'NG',
	'NI',
	'NU',
	'NP',
	'NR',
	'OM',
	'PK',
	'PA',
	'PN',
	'PE',
	'PH',
	'PW',
	'PG',
	'KP',
	'PY',
	'PS',
	'PF',
	'QA',
	'RE',
	'RW',
	'SA',
	'SD',
	'SN',
	'SG',
	'GS',
	'SH',
	'SB',
	'SL',
	'SV',
	'SO',
	'PM',
	'SS',
	'ST',
	'SR',
	'SZ',
	'SX',
	'SC',
	'SY',
	'TC',
	'TD',
	'TG',
	'TH',
	'TJ',
	'TK',
	'TM',
	'TL',
	'TO',
	'TT',
	'TN',
	'TR',
	'TV',
	'TW',
	'TZ',
	'UG',
	'UM',
	'UY',
	'UZ',
	'VC',
	'VE',
	'VG',
	'VN',
	'VU',
	'WF',
	'WS',
	'YE',
	'ZA',
	'ZM',
	'ZW',
];

export const canShowSignInGateWithOffers = ({
	isSignedIn,
	currentTest,
	contentType,
	sectionId,
	tags,
	isPaidContent,
	isPreview,
	currentLocaleCode,
}: CanShowGateProps): Promise<boolean> =>
	Promise.resolve(
		!isSignedIn &&
			!hasUserDismissedGateMoreThanCount(
				currentTest.variant,
				currentTest.name,
				5,
			) &&
			isNPageOrHigherPageView(3) &&
			isValidContentType(contentType) &&
			isValidSection(sectionId) &&
			isValidTag(tags) &&
			// hide the sign in gate on isPaidContent
			!isPaidContent &&
			// hide the sign in gate on internal tools preview &&
			!isPreview &&
			!isIOS9() &&
			// only show the gate for UK and EU readers
			['GB', ...EU_REGION_CODES].includes(currentLocaleCode),
	);
