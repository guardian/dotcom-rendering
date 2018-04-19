// @flow

import { hydrateApp, hydrateCSS } from '@guardian/guui';

// __SITE__ and __PAGE__ are replaced by string-replace-loader in webpack.config.js

// $FlowFixMe: shut up, flow
import Page from '../../sites/__SITE__/pages/__PAGE__'; // eslint-disable-line import/no-unresolved,import/extensions

// $FlowFixMe: shut up, flow
import App from '../../sites/__SITE__/App'; // eslint-disable-line import/no-unresolved,import/extensions

const { data, cssIDs } = window.gu.app;

if (module.hot) {
    module.hot.accept();
    require('preact/debug'); // eslint-disable-line global-require,import/no-extraneous-dependencies
}

const container = document.getElementById('app');
if (container) {
    const replacer = container.lastElementChild;
    if (replacer) {
        hydrateCSS(cssIDs);
        hydrateApp(<App Page={Page} data={data} />, container, replacer);
    }
}
