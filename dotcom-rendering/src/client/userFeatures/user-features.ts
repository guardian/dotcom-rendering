/**
 * @file Sets the user subscription and ad free cookies
 * This file was migrated from:
 * https://github.com/guardian/commercial/blob/1a429d6be05657f20df4ca909df7d01a5c3d7402/src/lib/user-features.ts
 */

import {
	getCookie,
	isBoolean,
	isObject,
	removeCookie,
	setCookie,
} from '@guardian/libs';
import {
	getAuthStatus,
	getOptionsHeadersWithOkta,
	isUserLoggedInOktaRefactor,
} from '../../lib/identity';
import {
	adFreeDataIsPresent,
	cookieIsExpiredOrMissing,
	fetchJson,
	getAdFreeCookie,
	setAdFreeCookie,
	timeInDaysFromNow,
} from './user-features-lib';
import type { UserFeaturesResponse } from './user-features-lib';

const USER_FEATURES_EXPIRY_COOKIE = 'gu_user_features_expiry';
const ACTION_REQUIRED_FOR_COOKIE = 'gu_action_required_for';
const DIGITAL_SUBSCRIBER_COOKIE = 'gu_digital_subscriber';
const HIDE_SUPPORT_MESSAGING_COOKIE = 'gu_hide_support_messaging';
const AD_FREE_USER_COOKIE = 'GU_AF1';

const forcedAdFreeMode = !!/[#&]noadsaf(&.*)?$/.exec(window.location.hash);

const userHasData = () => {
	const cookie =
		getAdFreeCookie() ??
		getCookie({ name: ACTION_REQUIRED_FOR_COOKIE }) ??
		getCookie({ name: USER_FEATURES_EXPIRY_COOKIE }) ??
		getCookie({ name: DIGITAL_SUBSCRIBER_COOKIE }) ??
		getCookie({ name: HIDE_SUPPORT_MESSAGING_COOKIE });
	return !!cookie;
};

const validateResponse = (
	response: unknown,
): response is UserFeaturesResponse => {
	return (
		isObject(response) &&
		isBoolean(response.showSupportMessaging) &&
		isObject(response.contentAccess) &&
		isBoolean(response.contentAccess.paidMember) &&
		isBoolean(response.contentAccess.recurringContributor) &&
		isBoolean(response.contentAccess.digitalPack)
	);
};

const persistResponse = (JsonResponse: UserFeaturesResponse) => {
	setCookie({
		name: USER_FEATURES_EXPIRY_COOKIE,
		value: timeInDaysFromNow(1),
	});
	setCookie({
		name: DIGITAL_SUBSCRIBER_COOKIE,
		value: String(JsonResponse.contentAccess.digitalPack),
	});
	setCookie({
		name: HIDE_SUPPORT_MESSAGING_COOKIE,
		value: String(!JsonResponse.showSupportMessaging),
	});

	removeCookie({ name: ACTION_REQUIRED_FOR_COOKIE });
	if (JsonResponse.alertAvailableFor) {
		setCookie({
			name: ACTION_REQUIRED_FOR_COOKIE,
			value: JsonResponse.alertAvailableFor,
		});
	}

	if (JsonResponse.contentAccess.digitalPack) {
		setAdFreeCookie(2);
	} else if (adFreeDataIsPresent() && !forcedAdFreeMode) {
		removeCookie({ name: AD_FREE_USER_COOKIE });
	}
};

const deleteOldData = (): void => {
	removeCookie({ name: AD_FREE_USER_COOKIE });
	removeCookie({ name: USER_FEATURES_EXPIRY_COOKIE });
	removeCookie({ name: ACTION_REQUIRED_FOR_COOKIE });
	removeCookie({ name: DIGITAL_SUBSCRIBER_COOKIE });
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
			return fetchJson(
				`${
					window.guardian.config.page.userAttributesApiUrl ??
					'/USER_ATTRIBUTE_API_NOT_FOUND'
				}/me`,
				{
					mode: 'cors',
					...getOptionsHeadersWithOkta(signedInAuthStatus),
				},
			)
				.then((response) => {
					if (!validateResponse(response)) {
						throw new Error('invalid response');
					}
					return response;
				})
				.then(persistResponse)
				.catch(() => {
					// eslint-disable-next-line no-console -- error logging
					console.error('Error fetching user data');
				});
		});
};

const featuresDataIsOld = () =>
	cookieIsExpiredOrMissing(USER_FEATURES_EXPIRY_COOKIE);

const isDigitalSubscriber = (): boolean =>
	getCookie({ name: DIGITAL_SUBSCRIBER_COOKIE }) === 'true';

const userNeedsNewFeatureData = (): boolean =>
	featuresDataIsOld() || (isDigitalSubscriber() && !adFreeDataIsPresent());

const userHasDataAfterSignout = async (): Promise<boolean> =>
	!(await isUserLoggedInOktaRefactor()) && userHasData();

const refresh = async (): Promise<void> => {
	if ((await isUserLoggedInOktaRefactor()) && userNeedsNewFeatureData()) {
		return requestNewData();
	} else if ((await userHasDataAfterSignout()) && !forcedAdFreeMode) {
		deleteOldData();
	}
	return Promise.resolve();
};

export { refresh, isDigitalSubscriber };
