import { getCookie } from '@guardian/libs';

export const ALLOW_REJECT_ALL_COOKIE = 'gu_allow_reject_all';

export const allowRejectAll = (): boolean => getAllowRejectAllCookie() !== null;

export const getAllowRejectAllCookie = (): string | null =>
	getCookie({ name: ALLOW_REJECT_ALL_COOKIE });
