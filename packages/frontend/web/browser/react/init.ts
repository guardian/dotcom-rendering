import React from 'react';
import { hydrate as hydrateCSS } from 'emotion';
import { hydrate as hydrateApp } from 'react-dom';
import { Article } from '@frontend/web/pages/Article';
import { startup } from '@frontend/web/browser/startup';

const init = (): Promise<void> => {
    const { cssIDs, data } = window.guardian.app;
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

    return Promise.resolve();
};

// TODO remove this
if (module.hot) {
    module.hot.accept();
}

startup('react', null, init);
