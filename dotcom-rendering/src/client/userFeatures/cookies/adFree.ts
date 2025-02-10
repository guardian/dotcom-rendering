import { getCookie } from '@guardian/libs';

export const AD_FREE_USER_COOKIE = 'GU_AF1';

export const adFreeDataIsPresent = (): boolean => getAdFreeCookie() !== null;

export const getAdFreeCookie = (): string | null =>
	getCookie({ name: AD_FREE_USER_COOKIE });
