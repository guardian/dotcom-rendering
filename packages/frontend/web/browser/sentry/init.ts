import * as Sentry from '@sentry/browser';
import { startup } from '@frontend/web/browser/startup';

import { isAdBlockInUse } from './detectAdBlocker';

let adBlockInUse = false; // Adblock checking is async so we assume adblock is off until we know it's not
isAdBlockInUse().then(isInUse => (adBlockInUse = isInUse));

const { editionLongForm, contentType } = window.guardian.app.data.CAPI;

// This is set to 10% here rather than the normal 1% so we get good
// feedback early on. TODO: This should be reduced to 1% once the site is fully deployed.
const SAMPLE_RATE = 0.1;

// Only send errors matching these regexes
const whitelistUrls = [
    /webpack-internal/,
    /localhost/,
    /assets\.guim\.co\.uk/,
    /ophan\.co\.uk/,
];

// Ignore these errors
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
    const {
        isDev,
        switches: { enableSentryReporting },
    } = window.guardian.app.data.config;

    return Promise.resolve().then(() => {
        try {
            Sentry.init({
                ignoreErrors,
                whitelistUrls,
                dsn:
                    'https://1937ab71c8804b2b8438178dfdd6468f@sentry.io/1377847',
                // release: 'release',
                environment: window.guardian.config.stage || 'DEV',
                sampleRate: SAMPLE_RATE,
                beforeSend(event) {
                    // Skip sending events in certain situations
                    const dontSend =
                        adBlockInUse || isDev || !enableSentryReporting;
                    if (dontSend) return null;
                    return event;
                },
                debug: true, // TODO: If you're seeing this debug property, it means it was left in by mistake. Please delete it
            });

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
