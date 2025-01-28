/**
 * @file Sets the user subscription and ad free cookies
 * This file was migrated from:
 * https://github.com/guardian/commercial/blob/1a429d6be05657f20df4ca909df7d01a5c3d7402/src/lib/user-features.ts
 */

import { getAuthStatus, isUserLoggedInOktaRefactor } from '../../lib/identity';
import {
	adFreeDataIsPresent,
	getAdFreeCookie,
	removeAdFreeCookie,
	setAdFreeCookie,
} from './cookies/adFree';
import {
	getAllowRejectAllCookie,
	removeAllowRejectAllCookie,
	setAllowRejectAllCookie,
} from './cookies/allowRejectAll';
import {
	getHideSupportMessagingCookie,
	removeHideSupportMessagingCookie,
	setHideSupportMessagingCookie,
} from './cookies/hideSupportMessaging';
import {
	featuresDataIsOld,
	getUserFeaturesExpiryCookie,
	removeUserFeaturesExpiryCookie,
	setUserFeaturesExpiryCookie,
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
	if ((await isUserLoggedInOktaRefactor()) && featuresDataIsOld()) {
		return requestNewData();
	} else if ((await userHasDataAfterSignOut()) && !forcedAdFreeMode) {
		deleteAllCookies();
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

const timeInDaysFromNow = (daysFromNow: number): string => {
	const tmpDate = new Date();
	tmpDate.setDate(tmpDate.getDate() + daysFromNow);
	return tmpDate.getTime().toString();
};

const persistResponse = (userBenefitsResponse: UserBenefits) => {
	setUserFeaturesExpiryCookie(timeInDaysFromNow(1));
	setHideSupportMessagingCookie(userBenefitsResponse.hideSupportMessaging);

	if (userBenefitsResponse.adFree) {
		setAdFreeCookie(2);
	} else if (adFreeDataIsPresent() && !forcedAdFreeMode) {
		removeAdFreeCookie();
	}
	if (userBenefitsResponse.allowRejectAll) {
		setAllowRejectAllCookie(2);
	} else {
		removeAllowRejectAllCookie();
	}
};

export const deleteAllCookies = (): void => {
	removeAdFreeCookie();
	removeHideSupportMessagingCookie();
	removeUserFeaturesExpiryCookie();
	removeAllowRejectAllCookie();
};

export { refresh };
