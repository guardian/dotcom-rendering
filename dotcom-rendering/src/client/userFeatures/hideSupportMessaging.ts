import { getCookie, removeCookie, setCookie } from '@guardian/libs';

const HIDE_SUPPORT_MESSAGING_COOKIE = 'gu_hide_support_messaging';

export const getHideSupportMessagingCookie = (): string | null =>
	getCookie({ name: HIDE_SUPPORT_MESSAGING_COOKIE });

export const setHideSupportMessagingCookie = (value: boolean): void => {
	setCookie({
		name: HIDE_SUPPORT_MESSAGING_COOKIE,
		value: String(value),
	});
};

export const removeHideSupportMessagingCookie = (): void =>
	removeCookie({ name: HIDE_SUPPORT_MESSAGING_COOKIE });
