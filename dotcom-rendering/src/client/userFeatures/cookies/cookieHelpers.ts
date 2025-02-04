import { getCookie, removeCookie, setCookie } from '@guardian/libs';

export const timeInDaysFromNow = (daysFromNow: number): number => {
	const tmpDate = new Date();
	tmpDate.setDate(tmpDate.getDate() + daysFromNow);
	return tmpDate.getTime();
};

export const setUserBenefitCookie = (
	cookieName: string,
	daysTillExpiry: number,
): void => {
	const expiresValue = timeInDaysFromNow(daysTillExpiry);
	setCookie({
		name: cookieName,
		value: expiresValue.toString(),
		daysToLive: 30,
	});
};

// Extend the expiry date of the cookie by 1 day unless it already has a longer expiry date
export const renewUserBenefitCookie = (cookieName: string): void => {
	const newExpiresValue = timeInDaysFromNow(1);
	const existingExpiresValue = getCookieExpiry(cookieName);
	if (
		existingExpiresValue == undefined ||
		newExpiresValue > existingExpiresValue
	) {
		setUserBenefitCookie(cookieName, 1);
	}
};

export const getCookieExpiry = (cookieName: string): number | undefined => {
	const cookieValue = getCookie({ name: cookieName });
	if (!cookieValue) return;
	return parseInt(cookieValue, 10);
};

export const cookieIsExpired = (cookieName: string): boolean =>
	!cookieIsValid(cookieName);

export const cookieIsValid = (cookieName: string): boolean => {
	const timeNow = new Date().getTime();
	const expiryTime = getCookieExpiry(cookieName);
	return expiryTime !== undefined && timeNow < expiryTime;
};

export const removeCookieIfExpired = (cookieName: string): void => {
	if (cookieIsExpired(cookieName)) {
		removeCookie({ name: cookieName });
	}
};
