// TODO: Add localstorage lib from https://github.com/guardian/libs/pull/1 when it is merged
const localStorageKey = `gu.prefs.sign-in-gate`;

// We use this key for storing the date the gate was dismissed against
const localStorageDismissedDateKey = (
	variant: string,
	name: string,
): string => {
	return `${name}-${variant}`;
};

// We use this key for storing the gate dismissed count against
const localStorageDismissedCountKey = (
	variant: string,
	name: string,
): string => {
	return `gate-dismissed-count-${name}-${variant}`;
};

// Invalid json stored against `localStorageKey` should not break signin gate for a user forever
const getSigninGatePrefsSafely = (): { [key: string]: any } => {
	try {
		const prefs: { [key: string]: any } = JSON.parse(
			// eslint-disable-next-line no-restricted-syntax -- FIXME-libs-storage
			localStorage.getItem(localStorageKey) ?? '{}',
		);

		if (typeof prefs === 'object' && typeof prefs.value === 'object') {
			return prefs.value;
		}
		return {};
	} catch (e) {
		return {};
	}
};

const setSigninGatePrefs = (prefs: any) => {
	// eslint-disable-next-line no-restricted-syntax -- FIXME-libs-storage
	localStorage.setItem(localStorageKey, JSON.stringify({ value: prefs }));
};

// set in user preferences that the user has dismissed the gate, set the value to the current ISO date string
// name is optional, but can be used to differentiate between multiple sign in gate tests
//
//
// This is set in local storage with the following shape:
//
// key:   gu.prefs.sign-in-gate
// value: {"testVariantName":"2020-07-01T10:55:09.085Z"}
//
// We set the value using the key, which remains constant
// and add an entry to the object with the testname and variant, and use current ISO date string as the value
export const setUserDismissedGate = (variant: string, name: string): void => {
	try {
		const prefs = getSigninGatePrefsSafely();
		prefs[localStorageDismissedDateKey(variant, name)] =
			new Date().toISOString();
		setSigninGatePrefs(prefs);
	} catch (error) {
		// Alas, sometimes localstorage isn't available
	}
};

export const unsetUserDismissedGate = (variant: string, name: string): void => {
	try {
		const prefs = getSigninGatePrefsSafely();
		delete prefs[localStorageDismissedDateKey(variant, name)];
		setSigninGatePrefs(prefs);
	} catch (error) {
		// Alas, sometimes localstorage isn't available
	}
};

// Check if the user has dismissed the gate by checking the user preferences,
// name is optional, but can be used to differentiate between multiple sign in gate tests
//
// This is set in local storage with the following shape:
//
// key:   gu.prefs.sign-in-gate
// value: {"testVariantName":"2020-07-01T10:55:09.085Z"}
//
// We extract the value using the key, which remains constant
// and the from within the value object we look up the variant we are looking for
export const hasUserDismissedGate = (
	variant: string,
	name: string,
	window?: number, // represents hours - only use if the gate should reshow after X hrs (dismissal window)
): boolean => {
	try {
		const prefs = getSigninGatePrefsSafely();
		// checks if a dismissal occurred within a given window timeframe in hours
		if (window !== undefined) {
			// checks if prefs is empty, ie. the user has not dismissed gate before.
			if (!prefs[localStorageDismissedDateKey(variant, name)]) {
				return false;
			}

			const dismissalTZ = Date.parse(
				prefs[localStorageDismissedDateKey(variant, name)],
			);
			const hours = (Date.now() - dismissalTZ) / 36e5; //  36e5 is the scientific notation for 60*60*1000, which converts the milliseconds difference into hours.

			if (hours >= window) {
				unsetUserDismissedGate(variant, name);
				return false;
			}
			return true;
		}

		return !!prefs[localStorageDismissedDateKey(variant, name)];
	} catch (error) {
		// Alas, sometimes localstorage isn't available. Please have a sign in gate as an apology
		return false;
	}
};

const retrieveDismissedCount = (variant: string, name: string): number => {
	try {
		const prefs = getSigninGatePrefsSafely();
		const dismissed: any =
			prefs[localStorageDismissedCountKey(variant, name)];

		if (Number.isFinite(dismissed)) {
			return dismissed;
		}
		return 0;
	} catch (error) {
		return 0;
	}
};

// Test whether the user has dismissed the gate variant more than `count` times
export const hasUserDismissedGateMoreThanCount = (
	variant: string,
	name: string,
	count: number,
): boolean => {
	return retrieveDismissedCount(variant, name) > count;
};

// Increment the number of times a user has dismissed this gate variant
export const incrementUserDismissedGateCount = (
	variant: string,
	name: string,
): void => {
	try {
		const prefs = getSigninGatePrefsSafely();
		prefs[localStorageDismissedCountKey(variant, name)] =
			retrieveDismissedCount(variant, name) + 1;
		setSigninGatePrefs(prefs);
	} catch (error) {
		// localstorage isn't available so show the gate
	}
};
