// @flow

// $FlowFixMe https://github.com/facebook/flow/issues/5035
import { render } from 'preact';
import { hydrate as hydrateCSS } from 'emotion';
import createStore from 'unistore';
import { Provider } from 'unistore/preact';
import Context from 'preact-context-provider';

import Page from 'components/Page';

// will be replaced by string-replace-loader in webpack.config.js
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved,import/extensions
import PageType from '__PAGE__ENTRY__POINT__';

const { data, cssIDs } = window.gu.app;

if (module.hot) {
    module.hot.accept();
    require('preact/debug'); // eslint-disable-line global-require
}

hydrateCSS(cssIDs);
render(
    <Provider store={createStore(data)}>
        <Context capiComponentRegister={{}}>
            <Page>
                <PageType />
            </Page>
        </Context>
    </Provider>,
    document.getElementById('app'),
    document.getElementById('app').lastElementChild,
);
