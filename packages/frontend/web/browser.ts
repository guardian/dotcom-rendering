import React from 'react';
import { hydrate as hydrateCSS } from 'emotion';
import { hydrate as hydrateApp } from 'react-dom';
import 'ophan-tracker-js';
import { getRaven } from '@frontend/web/client/raven';
import {
    init as initGa,
    sendPageView as sendGaPageView,
} from '@frontend/web/client/ga';
import Article from './pages/Article';

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
        .then(raven => {
            raven.context(
                {
                    tags: {
                        feature: 'hydrate',
                    },
                },
                hydrate,
            );
        })
        .catch(err => {
            hydrate();
        });
};

// make sure we've patched the env before running the app
if (window.guardian.polyfilled) {
    go();
} else {
    window.guardian.onPolyfilled = go;
}
