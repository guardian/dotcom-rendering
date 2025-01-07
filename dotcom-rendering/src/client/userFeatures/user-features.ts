/**
 * @file Sets the user subscription and ad free cookies
 * This file was migrated from:
 * https://github.com/guardian/commercial/blob/1a429d6be05657f20df4ca909df7d01a5c3d7402/src/lib/user-features.ts
 */

import { getCookie, removeCookie, setCookie } from '@guardian/libs';
import { getAuthStatus, isUserLoggedInOktaRefactor } from '../../lib/identity';
import { syncDataFromMembersDataApi } from './membersDataApi';
import type { UserBenefits } from './user-features-lib';
import {
	adFreeDataIsPresent,
	cookieIsExpiredOrMissing,
	getAdFreeCookie,
	setAdFreeCookie,
	timeInDaysFromNow,
} from './user-features-lib';

export const USER_FEATURES_EXPIRY_COOKIE = 'gu_user_features_expiry';
export const HIDE_SUPPORT_MESSAGING_COOKIE = 'gu_hide_support_messaging';
export const AD_FREE_USER_COOKIE = 'GU_AF1';

export const forcedAdFreeMode = !!/[#&]noadsaf(&.*)?$/.exec(
	window.location.hash,
);

const userHasData = () => {
	const cookie =
		getAdFreeCookie() ??
		getCookie({ name: USER_FEATURES_EXPIRY_COOKIE }) ??
		getCookie({ name: HIDE_SUPPORT_MESSAGING_COOKIE });
	return !!cookie;
};
const persistResponse = (userBenefitsResponse: UserBenefits) => {
	setCookie({
		name: USER_FEATURES_EXPIRY_COOKIE,
		value: timeInDaysFromNow(1),
	});
	setCookie({
		name: HIDE_SUPPORT_MESSAGING_COOKIE,
		value: String(userBenefitsResponse.hideSupportMessaging),
	});

	if (userBenefitsResponse.adFree) {
		setAdFreeCookie(2);
	} else if (adFreeDataIsPresent() && !forcedAdFreeMode) {
		removeCookie({ name: AD_FREE_USER_COOKIE });
	}
};

const deleteOldData = (): void => {
	removeCookie({ name: AD_FREE_USER_COOKIE });
	removeCookie({ name: USER_FEATURES_EXPIRY_COOKIE });
	removeCookie({ name: HIDE_SUPPORT_MESSAGING_COOKIE });
};

const requestNewData = () => {
	return getAuthStatus()
		.then((authStatus) =>
			authStatus.kind === 'SignedInWithCookies' ||
			authStatus.kind === 'SignedInWithOkta'
				? authStatus
				: Promise.reject('The user is not signed in'),
		)
		.then((signedInAuthStatus) => {
			return syncDataFromMembersDataApi(signedInAuthStatus).then(
				persistResponse,
			);
		});
};

const featuresDataIsOld = () =>
	cookieIsExpiredOrMissing(USER_FEATURES_EXPIRY_COOKIE);

const userHasDataAfterSignout = async (): Promise<boolean> =>
	!(await isUserLoggedInOktaRefactor()) && userHasData();

const refresh = async (): Promise<void> => {
	if ((await isUserLoggedInOktaRefactor()) && featuresDataIsOld()) {
		return requestNewData();
	} else if ((await userHasDataAfterSignout()) && !forcedAdFreeMode) {
		deleteOldData();
	}
	return Promise.resolve();
};

export { refresh };
