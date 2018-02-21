// @flow

// $FlowFixMe https://github.com/facebook/flow/issues/5035
import { hydrate } from 'react-dom';
import Styletron from 'styletron-client';
import { StyletronProvider } from 'styletron-react';

// webpack-specific
// eslint-disable-next-line camelcase,no-undef
__webpack_public_path__ = '/assets/javascript/';

const { state } = window.gu.app;

if (module.hot) {
    module.hot.accept();
}

// create code split points for all ../pages
import(/* webpackChunkName: "[request]" */ `./pages/${state.page}`).then(
    ({ default: Page }) => {
        const styleElements = document.getElementsByClassName(
            '_styletron_hydrate_',
        );

        hydrate(
            <StyletronProvider styletron={new Styletron(styleElements)}>
                <Page />
            </StyletronProvider>,
            document.getElementById('app'),
        );
    },
);
