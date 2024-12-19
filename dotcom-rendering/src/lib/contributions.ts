import { getCookie, onConsentChange, storage } from '@guardian/libs';
import type { HeaderPayload } from '@guardian/support-dotcom-components/dist/dotcom/types';
import { useEffect, useState } from 'react';
import type { ArticleDeprecated } from '../types/article';
import type { DCRFrontType } from '../types/front';
import type { DCRNewslettersPageType } from '../types/newslettersPage';
import type { DCRTagPageType } from '../types/tagPage';

// User Attributes API cookie (created on sign-in)
export const HIDE_SUPPORT_MESSAGING_COOKIE = 'gu_hide_support_messaging';

export const OPT_OUT_OF_ARTICLE_COUNT_COOKIE = 'gu_article_count_opt_out';

//  Local storage keys
const WEEKLY_ARTICLE_COUNT_KEY = 'gu.history.weeklyArticleCount';
export const NO_RR_BANNER_KEY = 'gu.noRRBanner';

// See https://github.com/guardian/support-dotcom-components/blob/main/module-versions.md
export const MODULES_VERSION = 'v3';

// Returns true if we should hide support messaging because the user is a supporter.
// Checks the cookie that is set by support-frontend on checkout and the User Attributes API upon signing in.
export const shouldHideSupportMessaging = (
	isSignedIn: boolean,
): boolean | 'Pending' => {
	const cookie = getCookie({ name: HIDE_SUPPORT_MESSAGING_COOKIE });
	switch (cookie) {
		case 'true':
			return true;
		case 'false':
			return false;
		default:
			/**
			 * If cookie is not present but user is signed in, we do not want to show any messaging.
			 * This is because of a race condition on the first page view after signing in, where
			 * we may be awaiting the response from the API to find out if they're a supporter.
			 */
			if (isSignedIn) {
				return 'Pending';
			} else {
				return false;
			}
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
		| DCRFrontType
		| DCRTagPageType
		| DCRNewslettersPageType,
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
