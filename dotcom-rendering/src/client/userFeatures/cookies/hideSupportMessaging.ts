import { getCookie } from '@guardian/libs';
import { cookieIsValid } from './cookieHelpers';

export const HIDE_SUPPORT_MESSAGING_COOKIE = 'gu_hide_support_messaging';

export const hideSupportMessaging = (): boolean =>
	cookieIsValid(HIDE_SUPPORT_MESSAGING_COOKIE);

export const getHideSupportMessagingCookie = (): string | null =>
	getCookie({ name: HIDE_SUPPORT_MESSAGING_COOKIE });
