import { isObject, isString, isUndefined, storage } from '@guardian/libs';

const localStorageKey = `gu.prefs.sign-in-gate`;

/** We use this key for storing the date the gate was dismissed against */
const localStorageDismissedDateKey = (
	variant: string,
	name: string,
): string => {
	return `${name}-${variant}`;
};

/** We use this key for storing the gate dismissed count against */
const localStorageDismissedCountKey = (
	variant: string,
	name: string,
): string => {
	return `gate-dismissed-count-${name}-${variant}`;
};

const isKeyValuePair = (
	object: Record<string | number | symbol, unknown>,
): object is Record<string, string | number> =>
	Object.entries(object).every(
		([key, value]) =>
			isString(key) && ['string', 'number'].includes(typeof value),
	);

// Invalid json stored against `localStorageKey` should not break signin gate for a user forever
const getSigninGatePrefsSafely = (): Record<string, string | number> => {
	const prefs = storage.local.get(localStorageKey);
	return isObject(prefs) && isKeyValuePair(prefs) ? prefs : {};
};

const setSigninGatePrefs = (prefs: Record<string, string | number>) => {
	storage.local.set(localStorageKey, prefs);
};

/**
 * set in user preferences that the user has dismissed the gate, set the value to the current ISO date string
 * name is optional, but can be used to differentiate between multiple sign in gate tests
 *
 *
 * This is set in local storage with the following shape:
 *
 * key:   gu.prefs.sign-in-gate
 * value: {"testVariantName":"2020-07-01T10:55:09.085Z"}
 *
 * We set the value using the key, which remains constant
 * and add an entry to the object with the testname and variant, and use current ISO date string as the value
 */
export const setUserDismissedGate = (variant: string, name: string): void => {
	const prefs = getSigninGatePrefsSafely();
	prefs[localStorageDismissedDateKey(variant, name)] =
		new Date().toISOString();
	setSigninGatePrefs(prefs);
};

export const unsetUserDismissedGate = (variant: string, name: string): void => {
	const prefs = getSigninGatePrefsSafely();
	delete prefs[localStorageDismissedDateKey(variant, name)];
	setSigninGatePrefs(prefs);
};

/**
 * Check if the user has dismissed the gate by checking the user preferences,
 * name is optional, but can be used to differentiate between multiple sign in gate tests
 *
 * This is set in local storage with the following shape:
 *
 * key:   gu.prefs.sign-in-gate
 * value: {"testVariantName":"2020-07-01T10:55:09.085Z"}
 *
 * We extract the value using the key, which remains constant
 * and the from within the value object we look up the variant we are looking for
 */
export const hasUserDismissedGate = (
	variant: string,
	name: string,
	dismissalWindow?: number, // represents hours - only use if the gate should reshow after X hrs (dismissal window)
): boolean => {
	const prefs = getSigninGatePrefsSafely();
	const pref = prefs[localStorageDismissedDateKey(variant, name)];
	// checks if a dismissal occurred within a given window timeframe in hours
	if (dismissalWindow !== undefined) {
		// checks if prefs is empty, ie. the user has not dismissed gate before.
		if (isUndefined(pref) || typeof pref === 'number') {
			return false;
		}

		const hours = (Date.now() - new Date(pref).getTime()) / 36e5; //  36e5 is the scientific notation for 60*60*1000, which converts the milliseconds difference into hours.

		if (hours >= dismissalWindow) {
			unsetUserDismissedGate(variant, name);
			return false;
		}
		return true;
	}

	return !(pref == null);
};

const retrieveDismissedCount = (variant: string, name: string): number => {
	const prefs = getSigninGatePrefsSafely();
	const dismissed = prefs[localStorageDismissedCountKey(variant, name)];

	return typeof dismissed === 'number' && dismissed > 0 ? dismissed : 0;
};

/** Test whether the user has dismissed the gate variant more than `count` times */
export const hasUserDismissedGateMoreThanCount = (
	variant: string,
	name: string,
	count: number,
): boolean => {
	return retrieveDismissedCount(variant, name) > count;
};

/** Increment the number of times a user has dismissed this gate variant */
export const incrementUserDismissedGateCount = (
	variant: string,
	name: string,
): void => {
	const prefs = getSigninGatePrefsSafely();
	const key = localStorageDismissedCountKey(variant, name);
	prefs[key] = retrieveDismissedCount(variant, name) + 1;
	setSigninGatePrefs(prefs);
};
