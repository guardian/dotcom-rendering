const componentName = 'sign-in-gate';

const localStorageKey = `gu.${componentName}`;

const localStorageLookupKey = (variant: string, name?: string): string => {
    return `${name ? `${name}-` : ''}${variant}`;
};

// Check if the user has dismissed the gate by checking the user preferences,
// name is optional, but can be used to differentiate between multiple sign in gate tests
//
// This is set in local storage with the following shape:
//
// key:   gu.sign-in-gate
// value: {"testVariantName":"2020-07-01T10:55:09.085Z"}
//
// We extract the value using the key, which remains constant
// and the from within the value object we look up the variant we are looking for

export const hasUserDismissedGate = (
    variant: string,
    name?: string,
): boolean => {
    try {
        const prefs = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
        return !!prefs[localStorageLookupKey(variant, name)];
    } catch (error) {
        // Alas, sometimes localstorage isn't available. Please have a sign in gate as an apology
        return false;
    }
};

// set in user preferences that the user has dismissed the gate, set the value to the current ISO date string
// name is optional, but can be used to differentiate between multiple sign in gate tests
//
//
// This is set in local storage with the following shape:
//
// key:   gu.sign-in-gate
// value: {"testVariantName":"2020-07-01T10:55:09.085Z"}
//
// We set the value using the key, which remains constant
// and add an entry to the object with the testname and variant, and use current ISO date string as the value
export const setUserDismissedGate = (variant: string, name?: string): void => {
    try {
        const prefs = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
        prefs[localStorageLookupKey(variant, name)] = new Date().toISOString();
        localStorage.setItem(localStorageKey, JSON.stringify(prefs));
    } catch (error) {
        // Alas, sometimes localstorage isn't available
    }
};
