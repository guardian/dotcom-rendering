import { getCookie, removeCookie, setCookie } from '@guardian/libs';

export const ALLOW_REJECT_ALL_COOKIE = 'gu_allow_reject_all';

export const getAllowRejectAllCookie = (): string | null =>
	getCookie({ name: ALLOW_REJECT_ALL_COOKIE });

export const setAllowRejectAllCookie = (daysToLive = 1): void => {
	const expires = new Date();
	expires.setMonth(expires.getMonth() + 6);
	setCookie({
		name: ALLOW_REJECT_ALL_COOKIE,
		value: expires.getTime().toString(),
		daysToLive,
	});
};

export const removeAllowRejectAllCookie = (): void =>
	removeCookie({ name: ALLOW_REJECT_ALL_COOKIE });

export const allowRejectAll = (): boolean => {
	const cookieVal = getAllowRejectAllCookie();
	if (!cookieVal) return false;
	return !Number.isNaN(parseInt(cookieVal, 10));
};
