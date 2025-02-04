import { getCookie } from '@guardian/libs';
import { cookieIsValid } from './cookieHelpers';

export const AD_FREE_USER_COOKIE = 'GU_AF1';

export const adFreeDataIsPresent = (): boolean =>
	cookieIsValid(AD_FREE_USER_COOKIE);

export const getAdFreeCookie = (): string | null =>
	getCookie({ name: AD_FREE_USER_COOKIE });
