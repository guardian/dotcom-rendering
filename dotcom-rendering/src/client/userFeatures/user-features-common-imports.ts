import { getCookie, setCookie } from '@guardian/libs';

// from lib/cookie
const timeInDaysFromNow = (daysFromNow: number): string => {
	const tmpDate = new Date();
	tmpDate.setDate(tmpDate.getDate() + daysFromNow);
	return tmpDate.getTime().toString();
};

const cookieIsExpiredOrMissing = (cookieName: string): boolean => {
	const expiryDateFromCookie = getCookie({ name: cookieName });
	if (!expiryDateFromCookie) return true;
	const expiryTime = parseInt(expiryDateFromCookie, 10);
	const timeNow = new Date().getTime();
	return timeNow >= expiryTime;
};

// from manage-ad-free-cookies

const AD_FREE_USER_COOKIE = 'GU_AF1';

const getAdFreeCookie = (): string | null =>
	getCookie({ name: AD_FREE_USER_COOKIE });

const adFreeDataIsPresent = (): boolean => {
	const cookieVal = getAdFreeCookie();
	if (!cookieVal) return false;
	return !Number.isNaN(parseInt(cookieVal, 10));
};

/*
 * Set the ad free cookie
 *
 * @param daysToLive - number of days the cookie should be valid
 */
const setAdFreeCookie = (daysToLive = 1): void => {
	const expires = new Date();
	expires.setMonth(expires.getMonth() + 6);
	setCookie({
		name: AD_FREE_USER_COOKIE,
		value: expires.getTime().toString(),
		daysToLive,
	});
};

// from lib/utils/fetch-json

/**
 * Check that path is a path-absolute-URL string as described in https://url.spec.whatwg.org/#path-absolute-url-string
 * A path-absolute-URL string is U+002F (/) followed by a path-relative-URL string, for instance `/plop` or `/plop/plop`
 */
function isPathAbsoluteURL(path: string): boolean {
	return !RegExp('^(https?:)?//').exec(path);
}

const fetchJson = async (
	resource: string,
	init: RequestInit = {},
): Promise<unknown> => {
	if (typeof resource !== 'string') {
		throw new Error('First argument should be of type `string`');
	}

	let path = resource;
	if (isPathAbsoluteURL(path)) {
		path = window.guardian.config.page.ajaxUrl + resource;
		init.mode = 'cors';
	}

	const resp = await fetch(path, init);
	if (resp.ok) {
		switch (resp.status) {
			case 204:
				return {};
			default:
				try {
					return resp.json();
				} catch (ex) {
					throw new Error(
						`Fetch error while requesting ${path}: Invalid JSON response`,
					);
				}
		}
	}
	throw new Error(`Fetch error while requesting ${path}: ${resp.statusText}`);
};

// from noop.ts -- lib/utils/noop
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- they’re discarded
const noop = (..._args: unknown[]): void => {
	// do nothing
};

// from lib/utils/time-utils
// from and to should be Epoch time in milliseconds
const dateDiffDays = (from: number, to: number): number => {
	const oneDayMs = 1000 * 60 * 60 * 24;
	const diffMs = to - from;
	return Math.floor(diffMs / oneDayMs);
};

const isExpired = (testExpiry: string): boolean => {
	// new Date(test.expiry) sets the expiry time to 00:00:00
	// Using SetHours allows a test to run until the END of the expiry day
	const startOfToday = new Date().setHours(0, 0, 0, 0);
	const expiryDate = new Date(testExpiry).getTime();
	return startOfToday > expiryDate;
};

// from types/dates

const dates = {
	1: '01',
	2: '02',
	3: '03',
	4: '04',
	5: '05',
	6: '06',
	7: '07',
	8: '08',
	9: '09',
	10: '10',
	11: '11',
	12: '12',
	13: '13',
	14: '14',
	15: '15',
	16: '16',
	17: '17',
	18: '18',
	19: '19',
	20: '20',
	21: '21',
	22: '22',
	23: '23',
	24: '24',
	25: '25',
	26: '26',
	27: '27',
	28: '28',
	29: '29',
	30: '30',
	31: '31',
} as const;

const months = {
	1: '01',
	2: '02',
	3: '03',
	4: '04',
	5: '05',
	6: '06',
	7: '07',
	8: '08',
	9: '09',
	10: '10',
	11: '11',
	12: '12',
} as const;

type LocalDate =
	`${number}-${(typeof months)[keyof typeof months]}-${(typeof dates)[keyof typeof dates]}`;

const getLocalDate = (year: number, month: number, date: number): LocalDate => {
	return `${year}-${months[month as keyof typeof months]}-${
		dates[date as keyof typeof dates]
	}`;
};

// from types/membership'
/**
 * This type is manually kept in sync with the Membership API:
 * https://github.com/guardian/members-data-api/blob/a48acdebed6a334ceb4336ece275b9cf9b3d6bb7/membership-attribute-service/app/models/Attributes.scala#L134-L151
 */
export type UserFeaturesResponse = {
	userId: string;
	tier?: string;
	recurringContributionPaymentPlan?: string;
	oneOffContributionDate?: LocalDate;
	membershipJoinDate?: LocalDate;
	digitalSubscriptionExpiryDate?: LocalDate;
	paperSubscriptionExpiryDate?: LocalDate;
	guardianWeeklyExpiryDate?: LocalDate;
	liveAppSubscriptionExpiryDate?: LocalDate;
	alertAvailableFor?: string;
	showSupportMessaging: boolean;
	contentAccess: {
		member: boolean;
		paidMember: boolean;
		recurringContributor: boolean;
		digitalPack: boolean;
		paperSubscriber: boolean;
		guardianWeeklySubscriber: boolean;
	};
};

export type { LocalDate };

export {
	dateDiffDays,
	isExpired,
	getLocalDate,
	noop,
	fetchJson,
	setAdFreeCookie,
	getAdFreeCookie,
	adFreeDataIsPresent,
	timeInDaysFromNow,
	cookieIsExpiredOrMissing,
};
