// // import raven, { RavenStatic } from 'raven-js';
// import { isAdBlockInUse } from './detectAdBlocker';

// // Notes on: Migrating from depreciated "raven-js": "3.19.1" client to "@sentry/browser": "^5.7.0"

// // Use:
// //         Sentry.init({
// //             dsn: 'https://1937ab71c8804b2b8438178dfdd6468f@sentry.io/1377847',
// //             release: ?,
// //             environment: ?,
// //             sampleRate: 0.1,
// //             blacklistUrls,
// //             whitelistUrls,
// //         });

// // See: https://docs.sentry.io/error-reporting/configuration/?platform=browsernpm#common-options

// // Use:
// //         Hooks.beforeSend()
// // with dataCallback function
// // and to decide whether to send or not using isDev / adBlocker / enableSentry

// // See: https://docs.sentry.io/error-reporting/configuration/?platform=browsernpm#before-send

// // Use:
// //         configureScope()
// // to add tags
// //         - contentType,
// //         - edition: editionLongForm,

// // See: https://docs.sentry.io/enriching-error-data/context/?platform=browsernpm#tagging-events

// // Respect scriptPath in browser.js
// // Keep reportError() or use Sentry directly?
// // Keep getDist(raven.js) in document.js?

// let ravenConfig: RavenStatic;
// let adBlockInUse = false; // Adblock checking is async so we assume adblock is off until we know it's not
// isAdBlockInUse().then(isInUse => (adBlockInUse = isInUse));

// // localhost will not log errors, but call `shouldSendCallback`
// const whitelistUrls = [
//     /webpack-internal/,
//     /localhost/,
//     /assets\.guim\.co\.uk/,
//     /ophan\.co\.uk/,
// ];

// const ignoreErrors = [
//     "Can't execute code from a freed script",
//     /InvalidStateError/gi,
//     /Fetch error:/gi,
//     'Network request failed',
//     'This video is no longer available.',
//     'UnknownError',
// ];

// const dataCallback: (data: {
//     culprit: string | undefined;
//     tags: {
//         origin: string;
//     };
// }) => {} = data => {
//     const { culprit } = data;
//     const resp = Object.assign({}, data);

//     if (culprit) {
//         const culpritMatches = /j.ophan.co.uk/.test(culprit);
//         resp.tags.origin = culpritMatches ? 'ophan' : 'dotcom-rendering';
//         resp.culprit = culprit.replace(/\/[a-z\d]{32}(\/[^/]+)$/, '$1');
//     }

//     return resp;
// };

// interface ShouldSendCallbackData {
//     tags: {
//         ignored: boolean | undefined;
//     };
// }

// const shouldSendCallback: (data: ShouldSendCallbackData) => boolean = data => {
//     const { isDev, switches } = window.guardian.app.data.config;
//     const isIgnored =
//         typeof data.tags.ignored !== 'undefined' && data.tags.ignored;
//     const isInSample = Math.random() < 0.1;
//     const shouldSend =
//         switches.enableSentryReporting &&
//         isInSample &&
//         !isIgnored &&
//         !adBlockInUse &&
//         !isDev;
//     if (isDev && !isIgnored) {
//         // Some environments don't support or don't always expose the console Object
//         if (window.console && window.console.warn) {
//             window.console.warn('Raven would send: ', {
//                 isInSample,
//                 'switches.enableSentryReporting':
//                     switches.enableSentryReporting,
//                 '!isIgnored': !isIgnored,
//                 '!adBlockInUse': !adBlockInUse,
//                 '!isDev': !isDev,
//             });
//             window.console.warn('Raven captured error.', data);
//         }
//     }
//     return shouldSend;
// };

// const setUpRaven: () => RavenStatic = () => {
//     const { sentryPublicApiKey, sentryHost } = window.guardian.app.data.config;
//     const { editionLongForm, contentType } = window.guardian.app.data.CAPI;
//     const sentryUrl = `https://${sentryPublicApiKey}@${sentryHost}`;
//     const sentryOptions = {
//         dataCallback,
//         whitelistUrls,
//         ignoreErrors,
//         shouldSendCallback: (data: ShouldSendCallbackData) =>
//             shouldSendCallback(data),
//         tags: {
//             contentType,
//             edition: editionLongForm,
//         },
//     };

//     ravenConfig = raven.config(sentryUrl, sentryOptions).install();

//     return ravenConfig;
// };

// type ReportedError = Error & {
//     reported?: boolean;
// };

// export const reportError = (
//     err: ReportedError,
//     tags: { [key: string]: string },
// ): void => {
//     const rstatic: RavenStatic = getRaven();
//     const capture = (r: RavenStatic) => {
//         r.captureException(err, { tags });
//     };
//     capture(rstatic);
// };

// export const setWIndowOnError = (r: RavenStatic) => {
//     const oldOnError = window.onerror;
//     /**
//      * Make sure global onerror doesn't report errors
//      * already manually reported via reportError module
//      * by checking for 'reported' property
//      */
//     window.onerror = (
//         message,
//         filename,
//         lineno,
//         colno,
//         error: ReportedError | undefined,
//     ) => {
//         // Not all browsers pass the error object
//         if (!error || !error.reported) {
//             if (oldOnError) {
//                 oldOnError(message, filename, lineno, colno, error);
//             }
//         }
//     };

//     // Report unhandled promise rejections
//     window.addEventListener('unhandledrejection', event => {
//         // Prevent error output on the console:
//         event.preventDefault();

//         // Typecast Event to PromiseRejectionEvent for TypeScript
//         const { reason } = event as PromiseRejectionEvent;
//         r.captureException(reason);
//     });

//     // r.context(
//     //     {
//     //         tags: {
//     //             feature: 'initApp',
//     //         },
//     //     },
//     //     initApp,
//     // );
// };

// export const getRaven: () => RavenStatic = () => {
//     if (ravenConfig) {
//         return ravenConfig;
//     }

//     return setUpRaven();
// };
