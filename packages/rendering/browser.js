// @flow

// __SITE__ and __PAGE__ strings are replaced by string-replace-loader in webpack.config.js

import { hydrate as hydrateCSS } from 'emotion';
import { hydrate as hydrateApp } from 'react-dom';

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
    hydrateCSS(cssIDs);
    hydrateApp(<App Page={Page} data={data} />, container);
}
