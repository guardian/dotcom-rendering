import { polyfillFetch } from '../lib/polyfill';

export const visitOptions = {
    onBeforeLoad(win) {
        polyfillFetch(win);
    },
};
