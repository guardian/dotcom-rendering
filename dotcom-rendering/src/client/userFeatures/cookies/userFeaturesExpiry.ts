import { getCookie, removeCookie, setCookie } from '@guardian/libs';

const USER_FEATURES_EXPIRY_COOKIE = 'gu_user_features_expiry';

export const getUserFeaturesExpiryCookie = (): string | null =>
	getCookie({ name: USER_FEATURES_EXPIRY_COOKIE });

export const setUserFeaturesExpiryCookie = (expiryTime: string): void =>
	setCookie({ name: USER_FEATURES_EXPIRY_COOKIE, value: expiryTime });

export const removeUserFeaturesExpiryCookie = (): void =>
	removeCookie({ name: USER_FEATURES_EXPIRY_COOKIE });

export const featuresDataIsOld = (): boolean => {
	const cookie = getUserFeaturesExpiryCookie();
	if (!cookie) return true;
	const expiryTime = parseInt(cookie, 10);
	const timeNow = new Date().getTime();
	return timeNow >= expiryTime;
};
