// @flow

// $FlowFixMe https://github.com/facebook/flow/issues/5035
import { hydrate as hydrateDOM } from 'react-dom';
import { hydrate as hydrateCSS } from 'emotion';
import { Provider } from 'unstated';

import App from 'lib/AppContainer';

// webpack-specific
// eslint-disable-next-line camelcase,no-undef
__webpack_public_path__ = '/assets/javascript/';

const { data, cssIDs } = window.gu.app;

if (module.hot) {
    module.hot.accept();
}

// create code split points for all ../pages
import(/* webpackChunkName: "[request]" */ `./pages/${data.page}`).then(
    ({ default: Page }) => {
        hydrateCSS(cssIDs);
        hydrateDOM(
            <Provider inject={[new App(data)]}>
                <Page />
            </Provider>,
            document.getElementById('app'),
        );
    },
);
