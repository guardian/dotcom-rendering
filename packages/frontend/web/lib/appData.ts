// This should be the only module accessing the window.guardian.app.data object directly
// because this is the one that gets imported to all other modules
export const appData = window.guardian.app.data;

// allows you to safely get items from config using a query of
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
