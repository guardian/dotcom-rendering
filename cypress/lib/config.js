import { polyfillFetch } from '../lib/polyfill';

export const fetchPolyfill = {
    onBeforeLoad(win) {
        polyfillFetch(win);
    },
};
