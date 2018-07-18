// @flow

import { hydrateApp, hydrateCSS } from '@guardian/guui';

// $FlowFixMe: shut up, flow
import Page from '../../frontend/pages/__PAGE__'; // eslint-disable-line import/no-unresolved,import/extensions

// $FlowFixMe: shut up, flow
import App from '../../frontend/App'; // eslint-disable-line import/no-unresolved,import/extensions

const { data, cssIDs } = window.gu.app;

if (module.hot) {
    module.hot.accept();
}

const container = document.getElementById('app');

if (container) {
    hydrateCSS(cssIDs);
    hydrateApp(<App Page={Page} data={data} />, container);
}
