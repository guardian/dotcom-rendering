import * as Sentry from '@sentry/browser';
import { startup } from '@frontend/web/browser/startup';

// Only send 10% of errors (this is set to 10% here rather than the normal 1% so we get good
// feedback early on). TODO: This should be reduced to 1% once the site is fully deployed.
const SAMPLE_RATE = 0.1;

const whitelistUrls = [
    /webpack-internal/,
    /localhost/,
    /assets\.guim\.co\.uk/,
    /ophan\.co\.uk/,
];

const ignoreErrors = [
    // https://docs.sentry.io/platforms/javascript/#decluttering-sentry
    "Can't execute code from a freed script",
    /InvalidStateError/gi,
    /Fetch error:/gi,
    'Network request failed',
    'This video is no longer available.',
    'UnknownError',
];

const init = () => {
    return Promise.resolve().then(() => {
        try {
            Sentry.init({
                ignoreErrors,
                whitelistUrls,
                dsn:
                    'https://1937ab71c8804b2b8438178dfdd6468f@sentry.io/1377847',
                // release: 'release',
                // environment: 'environment',
                sampleRate: SAMPLE_RATE,
            Sentry.configureScope(function(scope) {
                scope.setTag('edition', editionLongForm);
                scope.setTag('contentType', contentType);
            });
        } catch {
            /**
             * Sentry will have reported any unhandled promise
             * rejections from this chain so return here.
             */
            return;
        }
    });
};

startup('sentry', null, init);
