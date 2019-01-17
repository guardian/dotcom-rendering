import React from 'react';
import { hydrate as hydrateCSS } from 'emotion';
import { hydrate as hydrateApp } from 'react-dom';
import 'ophan-tracker-js';
import { getRaven } from '@frontend/web/browser/raven';
import {
    init as initGa,
    sendPageView as sendGaPageView,
} from '@frontend/web/browser/ga';
import Article from './pages/Article';
import { ReportedError } from '@frontend/web/browser/reportError';

if (module.hot) {
    module.hot.accept();
}

// kick off the app
const go = () => {
    const hydrate = () => {
        const { cssIDs, data } = window.guardian.app;

        initGa();

        const container = document.getElementById('app');

        if (container) {
            /**
             * TODO: Remove conditional when Emotion's issue is resolved.
             * We're having to prevent emotion hydrating styles in the browser
             * in development mode to retain the sourceMap info. As detailed
             * in the issue raised here https://github.com/emotion-js/emotion/issues/487
             */
            if (process.env.NODE_ENV !== 'development') {
                hydrateCSS(cssIDs);
            }

            hydrateApp(React.createElement(Article, { data }), container);
        }

        sendGaPageView();
    };

    getRaven()
        .catch(err => {
            hydrate();
        })
        .then(raven => {
            if (!raven) {
                return;
            }

            const oldOnError = window.onerror;

            window.onerror = (
                message,
                filename,
                lineno,
                colno,
                error: ReportedError | undefined,
            ) => {
                // Not all browsers pass the error object
                if (!error || !error.reported) {
                    oldOnError(message, filename, lineno, colno, error);
                }
            };

            // Report unhandled promise rejections
            // https://github.com/cujojs/when/blob/master/docs/debug-api.md#browser-window-events
            window.addEventListener('unhandledrejection', event => {
                // Prevent error output on the console:
                event.preventDefault();

                // having to typecast Event to PromiseRejectionEvent
                const promiseRejectionEvent = event as PromiseRejectionEvent;

                const error = promiseRejectionEvent.reason;

                if (error && !error.reported) {
                    raven.captureException(error);
                }
            });

            raven.context(
                {
                    tags: {
                        feature: 'hydrate',
                    },
                },
                hydrate,
            );
        });
};

// make sure we've patched the env before running the app
if (window.guardian.polyfilled) {
    go();
} else {
    window.guardian.onPolyfilled = go;
}
