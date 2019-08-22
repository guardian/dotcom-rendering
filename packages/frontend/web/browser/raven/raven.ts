import raven, { RavenStatic } from 'raven-js';
import { isAdBlockInUse } from './detectAdBlocker';

let ravenConfig: RavenStatic;

// localhost will not log errors, but call `shouldSendCallback`
const whitelistUrls = [
    /webpack-internal/,
    /localhost/,
    /assets\.guim\.co\.uk/,
    /ophan\.co\.uk/,
];

const ignoreErrors = [
    "Can't execute code from a freed script",
    /InvalidStateError/gi,
    /Fetch error:/gi,
    'Network request failed',
    'This video is no longer available.',
    'UnknownError',
];

const dataCallback: (data: {
    culprit: string | undefined;
    tags: {
        origin: string;
    };
}) => {} = data => {
    const { culprit } = data;
    const resp = Object.assign({}, data);

    if (culprit) {
        const culpritMatches = /j.ophan.co.uk/.test(culprit);
        resp.tags.origin = culpritMatches ? 'ophan' : 'dotcom-rendering';
        resp.culprit = culprit.replace(/\/[a-z\d]{32}(\/[^/]+)$/, '$1');
    }

    return resp;
};

interface ShouldSendCallbackData {
    tags: {
        ignored: boolean | undefined;
    };
}

const shouldSendCallback: (
    data: ShouldSendCallbackData,
    adBlockInUse: boolean,
) => boolean = (data, adBlockInUse) => {
    const { isDev, switches } = window.guardian.app.data.config;
    const isIgnored =
        typeof data.tags.ignored !== 'undefined' && data.tags.ignored;
    const isInSample = Math.random() < 0.1;
    if (isDev && !isIgnored) {
        // Some environments don't support or don't always expose the console Object
        if (window.console && window.console.warn) {
            window.console.warn('Raven captured error.', data);
        }
    }
    return (
        switches.enableSentryReporting &&
        isInSample &&
        !isIgnored &&
        !adBlockInUse &&
        !isDev
    );
};

const setUpRaven: (
    adBlockInUse: boolean,
) => Promise<RavenStatic> = adBlockInUse => {
    const { sentryPublicApiKey, sentryHost } = window.guardian.app.data.config;
    const { editionLongForm, contentType } = window.guardian.app.data.CAPI;
    const sentryUrl = `https://${sentryPublicApiKey}@${sentryHost}`;
    const sentryOptions = {
        dataCallback,
        whitelistUrls,
        ignoreErrors,
        shouldSendCallback: (data: ShouldSendCallbackData) =>
            shouldSendCallback(data, adBlockInUse),
        tags: {
            contentType,
            edition: editionLongForm,
        },
    };

    ravenConfig = raven.config(sentryUrl, sentryOptions).install();

    return Promise.resolve(ravenConfig);
};

type ReportedError = Error & {
    reported?: boolean;
};

export const reportError = (
    err: ReportedError,
    tags: { [key: string]: string },
    shouldThrow: boolean = true,
): void => {
    getRaven().then(r => {
        r.captureException(err, { tags });
        if (shouldThrow) {
            // Flag to ensure it is not reported to Sentry again via global handlers
            const error = err;
            error.reported = true;
            throw error;
        }
    });
};

export const setWIndowOnError = (r: RavenStatic) => {
    const oldOnError = window.onerror;

    /**
     * Make sure global onerror doesn't report errors
     * already manually reported via reportError module
     * by checking for 'reported' property
     */
    window.onerror = (
        message,
        filename,
        lineno,
        colno,
        error: ReportedError | undefined,
    ) => {
        // Not all browsers pass the error object
        if (!error || !error.reported) {
            if (oldOnError) {
                oldOnError(message, filename, lineno, colno, error);
            }
        }
    };

    // Report unhandled promise rejections
    window.addEventListener('unhandledrejection', event => {
        // Prevent error output on the console:
        event.preventDefault();

        // Typecast Event to PromiseRejectionEvent for TypeScript
        const { reason } = event as PromiseRejectionEvent;
        r.captureException(reason);
    });

    // r.context(
    //     {
    //         tags: {
    //             feature: 'initApp',
    //         },
    //     },
    //     initApp,
    // );
};

export const getRaven: () => Promise<RavenStatic> = () => {
    if (ravenConfig) {
        return Promise.resolve(ravenConfig);
    }

    return isAdBlockInUse().then(setUpRaven);
};
