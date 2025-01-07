/**
 * @file Sets the user subscription and ad free cookies
 * This file was migrated from:
 * https://github.com/guardian/commercial/blob/1a429d6be05657f20df4ca909df7d01a5c3d7402/src/lib/user-features.ts
 */

import { getCookie, setCookie } from '@guardian/libs';

const timeInDaysFromNow = (daysFromNow: number): string => {
	const tmpDate = new Date();
	tmpDate.setDate(tmpDate.getDate() + daysFromNow);
	return tmpDate.getTime().toString();
};

const cookieIsExpiredOrMissing = (cookieName: string): boolean => {
	const cookie = getCookie({ name: cookieName });
	if (!cookie) return true;
	const expiryTime = parseInt(cookie, 10);
	const timeNow = new Date().getTime();
	return timeNow >= expiryTime;
};

const AD_FREE_USER_COOKIE = 'GU_AF1';

const getAdFreeCookie = (): string | null =>
	getCookie({ name: AD_FREE_USER_COOKIE });

const adFreeDataIsPresent = (): boolean => {
	const cookieVal = getAdFreeCookie();
	if (!cookieVal) return false;
	return !Number.isNaN(parseInt(cookieVal, 10));
};

/*
 * Set the ad free cookie
 *
 * @param daysToLive - number of days the cookie should be valid
 */
const setAdFreeCookie = (daysToLive = 1): void => {
	const expires = new Date();
	expires.setMonth(expires.getMonth() + 6);
	setCookie({
		name: AD_FREE_USER_COOKIE,
		value: expires.getTime().toString(),
		daysToLive,
	});
};

/**
 * Check that path is a path-absolute-URL string as described in https://url.spec.whatwg.org/#path-absolute-url-string
 * A path-absolute-URL string is U+002F (/) followed by a path-relative-URL string, for instance `/plop` or `/plop/plop`
 */
function isPathAbsoluteURL(path: string): boolean {
	return !RegExp('^(https?:)?//').exec(path);
}

const fetchJson = async (
	resource: string,
	init: RequestInit = {},
): Promise<unknown> => {
	let path = resource;
	if (isPathAbsoluteURL(path)) {
		path = window.guardian.config.page.ajaxUrl + resource;
		init.mode = 'cors';
	}

	const resp = await fetch(path, init);
	if (resp.ok) {
		switch (resp.status) {
			case 204:
				return {};
			default:
				try {
					return resp.json();
				} catch (ex) {
					throw new Error(
						`Fetch error while requesting ${path}: Invalid JSON response`,
					);
				}
		}
	}
	throw new Error(`Fetch error while requesting ${path}: ${resp.statusText}`);
};

export type UserBenefits = {
	adFree: boolean;
	hideSupportMessaging: boolean;
};

export {
	adFreeDataIsPresent,
	cookieIsExpiredOrMissing,
	fetchJson,
	getAdFreeCookie,
	setAdFreeCookie,
	timeInDaysFromNow,
};
