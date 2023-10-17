import { onConsentChange } from '@guardian/consent-management-platform';
import { getCookie } from '@guardian/libs';
import type { HeaderPayload } from '@guardian/support-dotcom-components/dist/dotcom/src/types';
import { useState } from 'react';
import type { DCRFrontType } from '../types/front';
import type { DCRArticle } from '../types/frontend';
import type { IdApiUserData } from './getIdapiUserData';
import { getIdApiUserData } from './getIdapiUserData';
import { reportErrorToSentry } from './reportErrorToSentry';
import { eitherInOktaTestOrElse } from './useAuthStatus';
import { useOnce } from './useOnce';

// User Atributes API cookies (dropped on sign-in)
export const HIDE_SUPPORT_MESSAGING_COOKIE = 'gu_hide_support_messaging';
export const RECURRING_CONTRIBUTOR_COOKIE = 'gu_recurring_contributor';
export const ONE_OFF_CONTRIBUTION_DATE_COOKIE = 'gu_one_off_contribution_date';
export const OPT_OUT_OF_ARTICLE_COUNT_COOKIE = 'gu_article_count_opt_out';

// Support Frontend cookies (dropped when contribution is made)
export const SUPPORT_RECURRING_CONTRIBUTOR_MONTHLY_COOKIE =
	'gu.contributions.recurring.contrib-timestamp.Monthly';
export const SUPPORT_RECURRING_CONTRIBUTOR_ANNUAL_COOKIE =
	'gu.contributions.recurring.contrib-timestamp.Annual';
export const SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE =
	'gu.contributions.contrib-timestamp';

//  Local storage keys
const DAILY_ARTICLE_COUNT_KEY = 'gu.history.dailyArticleCount';
const WEEKLY_ARTICLE_COUNT_KEY = 'gu.history.weeklyArticleCount';
export const NO_RR_BANNER_TIMESTAMP_KEY = 'gu.noRRBannerTimestamp'; // timestamp of when we were last told not to show a RR banner

// See https://github.com/guardian/support-dotcom-components/blob/main/module-versions.md
export const MODULES_VERSION = 'v3';

// Cookie set by the User Attributes API upon signing in.
// Value computed server-side and looks at all of the user's active products,
// including but not limited to recurring & one-off contributions,
// paper & digital subscriptions, as well as user tiers (GU supporters/staff/partners/patrons).
// https://github.com/guardian/members-data-api/blob/3a72dc00b9389968d91e5930686aaf34d8040c52/membership-attribute-service/app/models/Attributes.scala
const shouldShowSupportMessaging = (): boolean => {
	const hideSupportMessaging =
		getCookie({ name: HIDE_SUPPORT_MESSAGING_COOKIE }) === 'true';

	return !hideSupportMessaging;
};

// Determine if user is a recurring contributor by checking if they are signed in
// AND have at least one of the relevant cookies.
// We need to look at both User Attributes and Frontend Support cookies
// as the former might not reflect the latest contributor status, since it's set upon signing in.
// Frontend Support cookies are set when a contribution is made.
export const isRecurringContributor = (isSignedIn: boolean): boolean => {
	// Attributes cookie - we want this to have a specific value
	const isRecurringContributorFromAttrs =
		getCookie({ name: RECURRING_CONTRIBUTOR_COOKIE }) === 'true';

	// Support cookies - we only care whether these exist
	const hasMonthlyContributionCookie =
		getCookie({
			name: SUPPORT_RECURRING_CONTRIBUTOR_MONTHLY_COOKIE,
			shouldMemoize: true,
		}) !== null;
	const hasAnnualContributionCookie =
		getCookie({
			name: SUPPORT_RECURRING_CONTRIBUTOR_ANNUAL_COOKIE,
			shouldMemoize: true,
		}) !== null;

	return (
		isSignedIn &&
		(isRecurringContributorFromAttrs ||
			hasMonthlyContributionCookie ||
			hasAnnualContributionCookie)
	);
};

// looks at attribute and support cookies
// ONE_OFF_CONTRIBUTION_DATE_COOKIE (attributes cookie, when loggin in)
// SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE (support cookie, when making one-off contribution)
// Get the date of the latest one-off contribution by looking at the two relevant cookies
// and returning a Unix epoch string of the latest date found.
export const getLastOneOffContributionTimestamp = (): number | undefined => {
	// Attributes cookie - expects YYYY-MM-DD
	const contributionDateFromAttributes = getCookie({
		name: ONE_OFF_CONTRIBUTION_DATE_COOKIE,
	});

	// Support cookies - expects Unix epoch
	const contributionDateFromSupport = getCookie({
		name: SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE,
	});

	if (!contributionDateFromAttributes && !contributionDateFromSupport) {
		return undefined;
	}

	// Parse dates into common format so they can be compared
	const parsedDateFromAttributes = contributionDateFromAttributes
		? Date.parse(contributionDateFromAttributes)
		: 0;
	const parsedDateFromSupport = contributionDateFromSupport
		? parseInt(contributionDateFromSupport, 10)
		: 0;

	// Return most recent date
	// Condition only passed if 'parsedDateFromAttributes' is NOT NaN
	if (parsedDateFromAttributes > parsedDateFromSupport) {
		return parsedDateFromAttributes;
	}

	return parsedDateFromSupport || undefined; // This guards against 'parsedDateFromSupport' being NaN
};

export const getLastOneOffContributionDate = (): string | undefined => {
	const timestamp = getLastOneOffContributionTimestamp();

	if (timestamp === undefined) {
		return undefined;
	}

	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');

	return `${year}-${month}-${day}`;
};

const dateDiffDays = (from: number, to: number): number => {
	const oneDayMs = 1000 * 60 * 60 * 24;
	const diffMs = to - from;
	return Math.floor(diffMs / oneDayMs);
};

const AskPauseDays = 90;

export const isRecentOneOffContributor = (): boolean => {
	const lastContributionDate = getLastOneOffContributionTimestamp();
	if (lastContributionDate !== undefined) {
		const now = Date.now();
		return dateDiffDays(lastContributionDate, now) <= AskPauseDays;
	}

	return false;
};

export const shouldHideSupportMessaging = (isSignedIn = false): boolean =>
	!shouldShowSupportMessaging() ||
	isRecurringContributor(isSignedIn) ||
	isRecentOneOffContributor();

export const REQUIRED_CONSENTS_FOR_ARTICLE_COUNT = [1, 3, 7];
const REQUIRED_CONSENTS_FOR_BROWSER_ID = [1, 3, 5, 7];

export const hasArticleCountOptOutCookie = (): boolean =>
	getCookie({ name: OPT_OUT_OF_ARTICLE_COUNT_COOKIE }) !== null;

const removeArticleCountsFromLocalStorage = () => {
	window.localStorage.removeItem(DAILY_ARTICLE_COUNT_KEY);
	window.localStorage.removeItem(WEEKLY_ARTICLE_COUNT_KEY);
};

export const hasCmpConsentForArticleCount = (): Promise<boolean> => {
	return new Promise((resolve) => {
		if (getCookie({ name: 'gu-cmp-disabled', shouldMemoize: true })) {
			resolve(true);
		}
		onConsentChange(({ ccpa, tcfv2, aus }) => {
			if (ccpa || aus) {
				resolve(true);
			} else if (tcfv2) {
				const hasRequiredConsents =
					REQUIRED_CONSENTS_FOR_ARTICLE_COUNT.every(
						(consent) => tcfv2.consents[consent],
					);

				if (!hasRequiredConsents) {
					removeArticleCountsFromLocalStorage();
				}
				resolve(hasRequiredConsents);
			}
		});
	});
};

export const hasOptedOutOfArticleCount = async (): Promise<boolean> => {
	const hasCmpConsent = await hasCmpConsentForArticleCount();
	return !hasCmpConsent || hasArticleCountOptOutCookie();
};

// A hook to find out if a user has opted out of article counting
export const useHasOptedOutOfArticleCount = (): boolean | 'Pending' => {
	const [hasOptedOut, setHasOptedOut] = useState<boolean | 'Pending'>(
		'Pending',
	);

	useOnce(() => {
		hasOptedOutOfArticleCount()
			.then(setHasOptedOut)
			.catch(() => setHasOptedOut(true));
	}, []);

	return hasOptedOut;
};

export const hasCmpConsentForBrowserId = (): Promise<boolean> =>
	new Promise((resolve) => {
		if (getCookie({ name: 'gu-cmp-disabled', shouldMemoize: true })) {
			resolve(true);
		}
		onConsentChange(({ ccpa, tcfv2, aus }) => {
			if (ccpa || aus) {
				resolve(true);
			} else if (tcfv2) {
				const hasRequiredConsents =
					REQUIRED_CONSENTS_FOR_BROWSER_ID.every(
						(consent) => tcfv2.consents[consent],
					);
				resolve(hasRequiredConsents);
			}
		});
	});

const twentyMins = 20 * 60000;
export const withinLocalNoBannerCachePeriod = (): boolean => {
	const item = window.localStorage.getItem(NO_RR_BANNER_TIMESTAMP_KEY);
	if (item && !Number.isNaN(parseInt(item, 10))) {
		const withinCachePeriod = parseInt(item, 10) + twentyMins > Date.now();
		if (!withinCachePeriod) {
			// Expired
			window.localStorage.removeItem(NO_RR_BANNER_TIMESTAMP_KEY);
		}
		return withinCachePeriod;
	}
	return false;
};

export const setLocalNoBannerCachePeriod = (): void =>
	window.localStorage.setItem(NO_RR_BANNER_TIMESTAMP_KEY, `${Date.now()}`);

const getEmail = async (ajaxUrl: string): Promise<string | undefined> =>
	// TODO Okta: Remove either when at 100% in oktaVariant test, and just use idToken
	eitherInOktaTestOrElse(
		(authState) => authState.idToken?.claims.email,
		() =>
			getIdApiUserData(ajaxUrl)
				.then((data: IdApiUserData) => data.user?.primaryEmailAddress)
				.catch((error) => {
					reportErrorToSentry(error, 'getEmail');
					return undefined;
				}),
	);

export const lazyFetchEmailWithTimeout =
	(idapiUrl: string): (() => Promise<string | null>) =>
	() => {
		return new Promise((resolve) => {
			setTimeout(() => resolve(null), 1000);
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			getEmail(idapiUrl).then((email) => {
				if (email) {
					resolve(email);
				} else {
					resolve(null);
				}
			});
		});
	};

export const getContributionsServiceUrl = (
	config: DCRArticle | DCRFrontType,
): string => process.env.SDC_URL ?? config.contributionsServiceUrl;

type PurchaseInfo = HeaderPayload['targeting']['purchaseInfo'];
export const getPurchaseInfo = (): PurchaseInfo => {
	const purchaseInfoRaw = getCookie({
		name: 'GU_CO_COMPLETE',
		shouldMemoize: true,
	});

	if (!purchaseInfoRaw) {
		return undefined;
	}

	let purchaseInfo: PurchaseInfo;

	try {
		purchaseInfo = JSON.parse(decodeURIComponent(purchaseInfoRaw));
	} catch {} // eslint-disable-line no-empty -- silently handle error

	return purchaseInfo;
};
