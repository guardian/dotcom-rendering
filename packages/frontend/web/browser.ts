import React from 'react';
import { hydrate as hydrateCSS } from 'emotion';
import { hydrate as hydrateApp } from 'react-dom';
import 'ophan-tracker-js';
import { getRaven } from '@frontend/web/lib/raven';
import {
    init as initGa,
    sendPageView as sendGaPageView,
} from '@frontend/web/lib/ga';
import { isAdBlockInUse } from '@frontend/web/lib/detectAdBlocker';
import { appData as data } from '@frontend/web/lib/appData';
import Article from './pages/Article';

if (module.hot) {
    module.hot.accept();
}

// kick off the app
const go = () => {
    const hydrate = () => {
        const { cssIDs } = window.guardian.app;

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

    isAdBlockInUse()
        .then((adBlockInUse: boolean) => {
            if (adBlockInUse) {
                hydrate();
            } else {
                getRaven().context(
                    {
                        tags: {
                            feature: 'dotcom-rendering',
                        },
                    },
                    hydrate,
                );
            }
        })
        .catch(() => {
            hydrate();
        });
};

// make sure we've patched the env before running the app
if (window.guardian.polyfilled) {
    go();
} else {
    window.guardian.onPolyfilled = go;
}
