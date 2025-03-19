import {
	getCookie,
	isUndefined,
	onConsentChange,
	storage,
} from '@guardian/libs';
import type { HeaderPayload } from '@guardian/support-dotcom-components/dist/dotcom/types';
import { useEffect, useState } from 'react';
import { hideSupportMessaging } from '../client/userFeatures/cookies/hideSupportMessaging';
import { userBenefitsDataIsUpToDate } from '../client/userFeatures/cookies/userBenefitsExpiry';
import type { FootballMatchListPage } from '../footballDataPage';
import type { ArticleDeprecated } from '../types/article';
import type { Front } from '../types/front';
import type { DCRNewslettersPageType } from '../types/newslettersPage';
import type { TagPage } from '../types/tagPage';

// User Attributes API cookies (created on sign-in)
export const RECURRING_CONTRIBUTOR_COOKIE = 'gu_recurring_contributor';
export const OPT_OUT_OF_ARTICLE_COUNT_COOKIE = 'gu_article_count_opt_out';

// Support Frontend cookie (created when a contribution is made)
export const SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE =
	'gu.contributions.contrib-timestamp';

//  Local storage keys
const WEEKLY_ARTICLE_COUNT_KEY = 'gu.history.weeklyArticleCount';
export const NO_RR_BANNER_KEY = 'gu.noRRBanner';

// See https://github.com/guardian/support-dotcom-components/blob/main/module-versions.md
export const MODULES_VERSION = 'v3';

// Returns true if we should hide support messaging because the user is a supporter.
// Checks the cookie that is set by the user benefits API upon signing in.
// Value computed server-side and looks at all of the user's active products,
// including but not limited to recurring & one-off contributions,
// paper & digital subscriptions, as well as user tiers (GU supporters/staff/partners/patrons).
// https://github.com/guardian/support-service-lambdas/blob/6e6865f47af54c5b0e7af6408ad53500d18847e0/modules/product-benefits/src/productBenefit.ts#L25
export const hasHideSupportMessagingCookie = (
	isSignedIn: boolean,
): boolean | 'Pending' => {
	if (hideSupportMessaging()) {
		return true;
	} else if (isSignedIn && !userBenefitsDataIsUpToDate()) {
		/**
		 * If the user is signed in, but we don't have data from the user-benefits API yet,
		 * we do not want to show any messaging.
		 * This is because of a race condition on the first page view after signing in, where
		 * we may be awaiting the response from the API to find out if they're a supporter.
		 */
		return 'Pending';
	}
	return false;
};

// looks at the SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE (set by support-frontend when making one-off contribution)
// and returns a Unix epoch int of the date if it exists.
export const getLastOneOffContributionTimestamp = (): number | undefined => {
	// Support cookies - expects Unix epoch
	const contributionDateFromSupport = getCookie({
		name: SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE,
	});

	if (!contributionDateFromSupport) {
		return undefined;
	}

	// Parse dates into common a number
	const parsedDateFromSupport = contributionDateFromSupport
		? parseInt(contributionDateFromSupport, 10)
		: 0;

	return parsedDateFromSupport || undefined; // This guards against 'parsedDateFromSupport' being NaN
};

const dateDiffDays = (from: number, to: number): number => {
	const oneDayMs = 1000 * 60 * 60 * 24;
	const diffMs = to - from;
	return Math.floor(diffMs / oneDayMs);
};

const AskPauseDays = 90;

export const isRecentOneOffContributor = (): boolean => {
	const lastContributionDate = getLastOneOffContributionTimestamp();
	if (!isUndefined(lastContributionDate)) {
		const now = Date.now();
		return dateDiffDays(lastContributionDate, now) <= AskPauseDays;
	}

	return false;
};

export const shouldHideSupportMessaging = (
	isSignedIn: boolean,
): boolean | 'Pending' => {
	const hasCookie = hasHideSupportMessagingCookie(isSignedIn);
	if (hasCookie === 'Pending') {
		return 'Pending';
	} else {
		return hasCookie || isRecentOneOffContributor();
	}
};

export const REQUIRED_CONSENTS_FOR_ARTICLE_COUNT = [1, 3, 7];
const REQUIRED_CONSENTS_FOR_BROWSER_ID = [1, 3, 5, 7];

export const hasArticleCountOptOutCookie = (): boolean =>
	getCookie({ name: OPT_OUT_OF_ARTICLE_COUNT_COOKIE }) !== null;

const removeWeeklyArticleCountsFromLocalStorage = () =>
	storage.local.remove(WEEKLY_ARTICLE_COUNT_KEY);

export const hasCmpConsentForWeeklyArticleCount = (): Promise<boolean> => {
	return new Promise((resolve) => {
		if (getCookie({ name: 'gu-cmp-disabled', shouldMemoize: true })) {
			resolve(true);
		}
		onConsentChange(({ usnat, tcfv2, aus }) => {
			if (usnat ?? aus) {
				resolve(true);
			} else if (tcfv2) {
				const hasRequiredConsents =
					REQUIRED_CONSENTS_FOR_ARTICLE_COUNT.every(
						(consent) => tcfv2.consents[consent],
					);

				if (!hasRequiredConsents) {
					removeWeeklyArticleCountsFromLocalStorage();
				}
				resolve(hasRequiredConsents);
			}
		});
	});
};

export const hasOptedOutOfArticleCount = async (): Promise<boolean> => {
	const hasCmpConsent = await hasCmpConsentForWeeklyArticleCount();
	return !hasCmpConsent || hasArticleCountOptOutCookie();
};

export const hasOptedOutOfWeeklyArticleCount = async (): Promise<boolean> => {
	const hasCmpConsent = await hasCmpConsentForWeeklyArticleCount();
	return !hasCmpConsent || hasArticleCountOptOutCookie();
};

// A hook to find out if a user has opted out of article counting
export const useHasOptedOutOfArticleCount = (): boolean | 'Pending' => {
	const [hasOptedOut, setHasOptedOut] = useState<boolean | 'Pending'>(
		'Pending',
	);

	useEffect(() => {
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
		onConsentChange(({ usnat, tcfv2, aus }) => {
			if (usnat ?? aus) {
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
export const withinLocalNoBannerCachePeriod = (): boolean =>
	!!storage.local.get(NO_RR_BANNER_KEY);

export const setLocalNoBannerCachePeriod = (now: number = Date.now()): void =>
	storage.local.set(NO_RR_BANNER_KEY, true, now + twentyMins);

// Returns true if banner was closed in the last hour
const ONE_HOUR_IN_MS = 1000 * 60 * 60;
export const recentlyClosedBanner = (
	lastClosedAt?: string,
	now = Date.now(),
): boolean => {
	if (lastClosedAt) {
		return now - new Date(lastClosedAt).getTime() < ONE_HOUR_IN_MS;
	}
	return false;
};

export const getContributionsServiceUrl = (
	config:
		| ArticleDeprecated
		| Front
		| TagPage
		| DCRNewslettersPageType
		| FootballMatchListPage,
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
