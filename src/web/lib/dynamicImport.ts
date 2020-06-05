import { initialise, load } from '@guardian/shimport';

/* eslint-disable no-restricted-globals */
declare global {
    interface Window {
        __import__: (url: string) => Promise<any>;
        __shimport__: any; // added as side effect of shimport.initialise()
    }
}

// Adds __import__ as a browser-safe dynamic import. For modern browsers this is
// just an alias to native import, but older browsers receive a polyfilled
// version instead.
export const initialiseDynamicImport = (): void => {
    try {
        // eslint-disable-next-line no-new-func
        self.__import__ = new Function('url', `return import(url)`) as (
            url: string,
        ) => Promise<any>;
    } catch (_) {
        // load script and listen to result
        initialise();
        self.__import__ = load;
    }
};
