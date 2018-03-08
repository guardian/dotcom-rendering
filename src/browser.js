// @flow

// $FlowFixMe https://github.com/facebook/flow/issues/5035
import { render } from 'preact';
import { hydrate as hydrateCSS } from 'emotion';
import createStore from 'unistore';
import { Provider } from 'unistore/preact';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved,import/extensions
import Page from '__PAGE__ENTRY__POINT__';

// webpack-specific
// eslint-disable-next-line camelcase,no-undef
__webpack_public_path__ = '/assets/javascript/';

const { data, cssIDs } = window.gu.app;

if (module.hot) {
    module.hot.accept();
    require('preact/debug'); // eslint-disable-line global-require
}

hydrateCSS(cssIDs);
render(
    <Provider store={createStore(data)}>
        <Page />
    </Provider>,
    document.getElementById('app'),
    document.getElementById('app').lastElementChild,
);
