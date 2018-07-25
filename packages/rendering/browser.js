// @flow

// __SITE__ and __PAGE__ strings are replaced by string-replace-loader in webpack.config.js

import { hydrateApp, hydrateCSS } from '@guardian/guui';

// $FlowFixMe: shut up, flow
import Page from '../../sites/__SITE__/pages/__PAGE__'; // eslint-disable-line import/no-unresolved,import/extensions

// $FlowFixMe: shut up, flow
import App from '../../sites/__SITE__/App'; // eslint-disable-line import/no-unresolved,import/extensions

const { data, cssIDs } = window.gu.app;

if (module.hot) {
    module.hot.accept();
}

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
    hydrateApp(<App Page={Page} data={data} />, container);
}
