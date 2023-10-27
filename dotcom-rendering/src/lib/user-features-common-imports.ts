import type {
	AccessToken,
	AccessTokenClaims,
	IDToken,
} from '@guardian/identity-auth';
import { getCookie, setCookie } from '@guardian/libs';
// API IMPORTS
//Transient deps
import EventEmitter from 'wolfy87-eventemitter'; //  add to Package.json	"wolfy87-eventemitter": "^5.2.9"

type CustomClaimValue = string | boolean | number;
type CustomClaims = Record<string, CustomClaimValue | CustomClaimValue[]>;
type CustomIdTokenClaims = CustomClaims & {
	email: string;
	google_tag_id: string;
};

const mediator = new EventEmitter();

//from /lib/cookie
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

// -------- manage-ad-free-cookies-DS
// cookie to trigger server-side ad-freeness
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

// fetch.json.ts - DS --lib/utils/fetch-json

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
		path = (window.guardian.config.page.ajaxUrl ?? '') + resource;
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

// from time-utils.ts -- lib/utils/time-utils
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

// TYPES!!!! imports
// types/dates

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

// API IMPORTS

// Types info coming from https://github.com/guardian/discussion-rendering/blob/fc14c26db73bfec8a04ff7a503ed9f90f1a1a8ad/src/types.ts

type IdentityUserFromCache = {
	dates: { accountCreatedDate: string };
	publicFields: {
		displayName: string;
	};
	statusFields: {
		userEmailValidated: boolean;
	};
	id: number;
	rawResponse: string;
} | null;

type SignedOutWithCookies = { kind: 'SignedOutWithCookies' };
type SignedInWithCookies = { kind: 'SignedInWithCookies' };
type SignedOutWithOkta = { kind: 'SignedOutWithOkta' };
type SignedInWithOkta = {
	kind: 'SignedInWithOkta';
	accessToken: AccessToken<AccessTokenClaims>;
	idToken: IDToken<CustomIdTokenClaims>;
};

type AuthStatus =
	| SignedOutWithCookies
	| SignedInWithCookies
	| SignedOutWithOkta
	| SignedInWithOkta;

let userFromCookieCache: IdentityUserFromCache = null;

const useOkta = !!window.guardian.config.switches.okta;

const cookieName = 'GU_U';

const idApiRoot =
	window.guardian.config.page.idApiUrl ?? '/ID_API_ROOT_URL_NOT_FOUND';

mediator.emit('module:identity:api:loaded');

const decodeBase64 = (str: string): string =>
	decodeURIComponent(
		escape(
			window.atob(
				str.replace(/-/g, '+').replace(/_/g, '/').replace(/,/g, '='),
			),
		),
	);

const getUserCookie = (): string | null => getCookie({ name: cookieName });

const getUserFromCookie = (): IdentityUserFromCache => {
	if (userFromCookieCache === null) {
		const cookieData = getUserCookie();

		if (cookieData) {
			const userData = JSON.parse(
				decodeBase64(cookieData.split('.')[0] ?? ''),
			) as string[];

			const id = parseInt(userData[0] ?? '', 10);
			const displayName = decodeURIComponent(userData[2] ?? '');
			const accountCreatedDate = userData[6];
			const userEmailValidated = Boolean(userData[7]);

			if (id && accountCreatedDate) {
				userFromCookieCache = {
					id,
					publicFields: {
						displayName,
					},
					dates: { accountCreatedDate },
					statusFields: {
						userEmailValidated,
					},
					rawResponse: cookieData,
				};
			}
		}
	}

	return userFromCookieCache;
};

/**
 * Fetch the logged in user's Google Tag ID from IDAPI
 * @returns one of:
 * - string - the user's Google Tag ID
 * - null - if the request failed
 */
const fetchGoogleTagIdFromApi = (): Promise<string | null> =>
	fetch(`${idApiRoot}/user/me/identifiers`, {
		mode: 'cors',
		credentials: 'include',
	})
		.then((resp) => {
			if (resp.status === 200) {
				return resp.json() as Promise<{ googleTagId: string }>;
			}
			throw resp.status;
		})
		.then((json) => json.googleTagId)
		.catch((e) => {
			console.log('failed to get Identity user identifiers', e);
			return null;
		});

const isUserLoggedIn = (): boolean => getUserFromCookie() !== null;

const getAuthStatus = async (): Promise<AuthStatus> => {
	if (useOkta) {
		try {
			const { isSignedInWithOktaAuthState } = await import(
				'./identity/okta'
			);
			const authState = await isSignedInWithOktaAuthState();
			if (authState.isAuthenticated) {
				return {
					kind: 'SignedInWithOkta',
					accessToken: authState.accessToken,
					idToken: authState.idToken,
				};
			}
		} catch (e) {
			console.error(e);
		}

		return {
			kind: 'SignedOutWithOkta',
		};
	}
	if (isUserLoggedIn()) {
		return {
			kind: 'SignedInWithCookies',
		};
	}
	return {
		kind: 'SignedOutWithCookies',
	};
};

const isUserLoggedInOktaRefactor = (): Promise<boolean> =>
	getAuthStatus().then((authStatus) =>
		authStatus.kind === 'SignedInWithCookies' ||
		authStatus.kind === 'SignedInWithOkta'
			? true
			: false,
	);

/**
 * Decide request options based on an {@link AuthStatus}. Requests to authenticated APIs require different options depending on whether
 * you are in the Okta experiment or not.
 * @param authStatus
 * @returns where `authStatus` is:
 *
 * `SignedInWithCookies`:
 * - set the `credentials` option to `"include"`
 *
 * `SignedInWithOkta`:
 * - set the `Authorization` header with a Bearer Access Token
 * - set the `X-GU-IS-OAUTH` header to `true`
 */
const getOptionsHeadersWithOkta = (
	authStatus: SignedInWithCookies | SignedInWithOkta,
): RequestInit => {
	if (authStatus.kind === 'SignedInWithCookies') {
		return {
			credentials: 'include',
		};
	}

	return {
		headers: {
			Authorization: `Bearer ${authStatus.accessToken.accessToken}`,
			'X-GU-IS-OAUTH': 'true',
		},
	};
};

/**
 * Get the user's Google Tag ID
 *
 * If enrolled in the Okta experiment, return the value from the ID token
 * `google_tag_id` claim
 * Otherwise, fetch the Google Tag ID from IDAPI
 * @returns one of:
 * - string, if the user is enrolled in the Okta experiment or the fetch to
 *   IDAPI was successful
 * - null, if the user is signed out or the fetch to IDAPI failed
 */
const getGoogleTagId = (): Promise<string | null> =>
	getAuthStatus().then((authStatus) => {
		switch (authStatus.kind) {
			case 'SignedInWithCookies':
				return fetchGoogleTagIdFromApi();
			case 'SignedInWithOkta':
				return authStatus.idToken.claims.google_tag_id;
			default:
				return null;
		}
	});

// from membership.ts - from types/membership';
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

export {
	isUserLoggedIn,
	getAuthStatus,
	getOptionsHeadersWithOkta,
	isUserLoggedInOktaRefactor,
	getGoogleTagId,
};
export type { AuthStatus };

export type { LocalDate };

export { getLocalDate };

export { dateDiffDays, isExpired };

export { noop };

export { fetchJson };

export { setAdFreeCookie, getAdFreeCookie, adFreeDataIsPresent };

export { timeInDaysFromNow, cookieIsExpiredOrMissing };
