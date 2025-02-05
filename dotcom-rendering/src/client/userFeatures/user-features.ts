/**
 * @file Sets the user subscription and ad free cookies
 * This file was migrated from:
 * https://github.com/guardian/commercial/blob/1a429d6be05657f20df4ca909df7d01a5c3d7402/src/lib/user-features.ts
 */

import { removeCookie } from '@guardian/libs';
import { getAuthStatus, isUserLoggedInOktaRefactor } from '../../lib/identity';
import { AD_FREE_USER_COOKIE, getAdFreeCookie } from './cookies/adFree';
import {
	ALLOW_REJECT_ALL_COOKIE,
	getAllowRejectAllCookie,
} from './cookies/allowRejectAll';
import {
	cookieIsExpired,
	removeCookieIfExpired,
	renewUserBenefitCookie,
} from './cookies/cookieHelpers';
import {
	getHideSupportMessagingCookie,
	HIDE_SUPPORT_MESSAGING_COOKIE,
} from './cookies/hideSupportMessaging';
import {
	getUserFeaturesExpiryCookie,
	USER_FEATURES_EXPIRY_COOKIE,
} from './cookies/userFeaturesExpiry';
import { syncDataFromUserBenefitsApi } from './userBenefitsApi';

export type UserBenefits = {
	adFree: boolean;
	hideSupportMessaging: boolean;
	allowRejectAll: boolean;
};

const userHasData = () => {
	const cookie =
		getAdFreeCookie() ??
		getUserFeaturesExpiryCookie() ??
		getHideSupportMessagingCookie() ??
		getAllowRejectAllCookie();
	return !!cookie;
};

const userHasDataAfterSignOut = async (): Promise<boolean> =>
	!(await isUserLoggedInOktaRefactor()) && userHasData();

export const forcedAdFreeMode = !!/[#&]noadsaf(&.*)?$/.exec(
	window.location.hash,
);
const refresh = async (): Promise<void> => {
	if (
		(await isUserLoggedInOktaRefactor()) &&
		cookieIsExpired(USER_FEATURES_EXPIRY_COOKIE)
	) {
		return requestNewData();
	} else if (await userHasDataAfterSignOut()) {
		removeExpiredUserBenefitsCookies();
	}
};

const requestNewData = async () => {
	const authStatus = await getAuthStatus();
	if (
		authStatus.kind !== 'SignedInWithCookies' &&
		authStatus.kind !== 'SignedInWithOkta'
	) {
		return Promise.reject('The user is not signed in');
	}
	return syncDataFromUserBenefitsApi(authStatus).then(persistResponse);
};

const persistResponse = (userBenefitsResponse: UserBenefits) => {
	renewUserBenefitCookie(USER_FEATURES_EXPIRY_COOKIE);
	if (userBenefitsResponse.hideSupportMessaging) {
		renewUserBenefitCookie(HIDE_SUPPORT_MESSAGING_COOKIE);
	} else {
		removeCookieIfExpired(HIDE_SUPPORT_MESSAGING_COOKIE);
	}
	if (userBenefitsResponse.allowRejectAll) {
		renewUserBenefitCookie(ALLOW_REJECT_ALL_COOKIE);
	} else {
		removeCookieIfExpired(ALLOW_REJECT_ALL_COOKIE);
	}
	if (userBenefitsResponse.adFree) {
		renewUserBenefitCookie(AD_FREE_USER_COOKIE);
	} else if (!forcedAdFreeMode) {
		removeCookieIfExpired(AD_FREE_USER_COOKIE);
	}
};

export const removeExpiredUserBenefitsCookies = (): void => {
	removeCookieIfExpired(USER_FEATURES_EXPIRY_COOKIE);
	removeCookieIfExpired(AD_FREE_USER_COOKIE);
	removeCookieIfExpired(HIDE_SUPPORT_MESSAGING_COOKIE);
	removeCookieIfExpired(ALLOW_REJECT_ALL_COOKIE);
};

export const deleteAllCookies = (): void => {
	removeCookie({ name: USER_FEATURES_EXPIRY_COOKIE });
	removeCookie({ name: AD_FREE_USER_COOKIE });
	removeCookie({ name: HIDE_SUPPORT_MESSAGING_COOKIE });
	removeCookie({ name: ALLOW_REJECT_ALL_COOKIE });
};

export { refresh };
