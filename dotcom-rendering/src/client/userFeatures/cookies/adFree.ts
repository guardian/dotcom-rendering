import { getCookie, removeCookie, setCookie } from '@guardian/libs';

const AD_FREE_USER_COOKIE = 'GU_AF1';

export const getAdFreeCookie = (): string | null =>
	getCookie({ name: AD_FREE_USER_COOKIE });

/*
 * Set the ad free cookie
 *
 * @param daysToLive - number of days the cookie should be valid
 */
export const setAdFreeCookie = (daysToLive = 1): void => {
	const expires = new Date();
	expires.setMonth(expires.getMonth() + 6);
	setCookie({
		name: AD_FREE_USER_COOKIE,
		value: expires.getTime().toString(),
		daysToLive,
	});
};

export const adFreeDataIsPresent = (): boolean => {
	const cookieVal = getAdFreeCookie();
	if (!cookieVal) return false;
	return !Number.isNaN(parseInt(cookieVal, 10));
};

export const removeAdFreeCookie = (): void =>
	removeCookie({ name: AD_FREE_USER_COOKIE });
