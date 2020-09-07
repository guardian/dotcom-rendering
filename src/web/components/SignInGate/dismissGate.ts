// TODO: Add localstorage lib from https://github.com/guardian/libs/pull/1 when it is merged
const localStorageKey = `gu.prefs.sign-in-gate`;

const localStorageLookupKey = (variant: string, name: string): string => {
    return `${name}-${variant}`;
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
        const prefs = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
        prefs[localStorageLookupKey(variant, name)] = new Date().toISOString();
        localStorage.setItem(localStorageKey, JSON.stringify(prefs));
    } catch (error) {
        // Alas, sometimes localstorage isn't available
    }
};

export const unsetUserDismissedGate = (variant: string, name: string): void => {
    try {
        const prefs = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
        delete prefs[localStorageLookupKey(variant, name)]
        localStorage.setItem(localStorageKey, JSON.stringify(prefs));
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
        const prefs = JSON.parse(localStorage.getItem(localStorageKey) || '{}');

        // checks if a dismissal occured within a given window timeframe in hours
        if (window) {
            // checks if prefs is empty, ie. the user has not dismissed gate before.
            if (!prefs[localStorageLookupKey(variant, name)]) {

                return false;
            }

            const dismissalTZ = Date.parse(prefs[localStorageLookupKey(variant, name)]);
            const hours = (Date.now() - dismissalTZ) / 36e5; //  36e5 is the scientific notation for 60*60*1000, which converts the milliseconds difference into hours.

            if (hours >= window) {
                unsetUserDismissedGate(variant, name)
                return false
            }
            return true
        }

        return !!prefs[localStorageLookupKey(variant, name)];
    } catch (error) {
        // Alas, sometimes localstorage isn't available. Please have a sign in gate as an apology
        return false;
    }

};
