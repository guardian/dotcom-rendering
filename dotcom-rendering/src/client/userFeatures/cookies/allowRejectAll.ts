import { getCookie } from '@guardian/libs';
import { cookieIsValid } from './cookieHelpers';

export const ALLOW_REJECT_ALL_COOKIE = 'gu_allow_reject_all';

export const allowRejectAll = (): boolean =>
	cookieIsValid(ALLOW_REJECT_ALL_COOKIE);

export const getAllowRejectAllCookie = (): string | null =>
	getCookie({ name: ALLOW_REJECT_ALL_COOKIE });
