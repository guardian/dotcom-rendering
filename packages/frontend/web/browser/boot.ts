import React from 'react';
import { hydrate as hydrateCSS } from 'emotion';
import { hydrate as hydrateApp } from 'react-dom';
import 'ophan-tracker-js';
import { sendOphanPlatformRecord } from '@frontend/web/browser/ophan';
import { Article } from '@frontend/web/pages/Article';
import { loadScript } from '@frontend/web/browser/loadScript';

if (module.hot) {
    module.hot.accept();
}

const initApp = (): void => {
    const { cssIDs, data } = window.guardian.app;
    const commercialBundleUrl = data.config.commercialBundleUrl;

    const enhanceApp = () => {
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

        // Ophan
        // Lets record a 'platformVariant' field so that we can track DCR views in datalake(regardless of A / B test)
        sendOphanPlatformRecord();
    };

    const loadCommercial = (): Promise<void> => {
        return loadScript(commercialBundleUrl);
    };

    loadCommercial()
        .then(() => {
            enhanceApp();
        })
        .catch(err => {
            // If loadCommercial fails reportError and enhanceApp
            if (window.guardian.modules.raven) {
                window.guardian.modules.raven.reportError(
                    err,
                    {
                        feature: 'commercial',
                    },
                    false,
                );
            }

            enhanceApp();
        });
};

const onPolyfilled = (): Promise<void> => {
    return Promise.resolve(initApp());
};

const run = (): void => {
    // Expects polyfill to have run
    if (window.guardian.polyfilled) {
        onPolyfilled();
    } else {
        // (Should never happen)
        // tslint:disable-next-line:no-console
        console.log(
            'Error: attempting to load boot before polyfills have loaded.',
        );
    }
};

run();

export const _ = {
    run,
    onPolyfilled,
};
