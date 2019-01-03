// This should be the only module accessing the window.guardian.app.data object directly
// because this is the one that gets imported to all other modules
export const appData = window.guardian.app.data;

// get allows you to safely get items from window.guardian.app.data using a query of
// dot or bracket notation, with optional default fallback
export const get = (path: string = '', defaultValue?: any): any => {
    const value = path
        .replace(/\[(.+?)\]/g, '.$1')
        .split('.')
        .reduce((o, key) => o && o[key], appData);

    if (typeof value !== 'undefined') {
        return value;
    }

    return defaultValue;
};

// these should be used for testing purposes only
export const testHelpers = {
    // set allows you to safely set items in window.guardian.app.data
    set(path: string, value: any): void {
        const pathSegments: string[] = path.split('.');
        const last: string | undefined = pathSegments.pop();
        if (!last) {
            return;
        }
        pathSegments.reduce((obj, subpath) => {
            if (typeof obj[subpath] === 'object') {
                return obj[subpath];
            }
            obj[subpath] = {};
            return obj[subpath];
        }, appData)[last] = value;
    },
};
