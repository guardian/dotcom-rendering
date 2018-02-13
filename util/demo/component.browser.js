// @flow

// $FlowFixMe https://github.com/facebook/flow/issues/5035
import { hydrate } from 'react-dom';
import Styletron from 'styletron-client';
import { StyletronProvider } from 'styletron-react';

import Component from './Component';

// webpack-specific
// eslint-disable-next-line camelcase,no-undef
__webpack_public_path__ = '/assets/javascript/';

const styleElements = document.getElementsByClassName('_styletron_hydrate_');

const componentPath = window.location.pathname.split('/component/')[1];

if (module.hot) {
    module.hot.accept();
}

const render = (demos = {}) => {
    hydrate(
        <StyletronProvider styletron={new Styletron(styleElements)}>
            <Component demos={{ ...demos }} path={componentPath} />
        </StyletronProvider>,
        document.getElementById('app'),
    );
};

import(`../../src/${componentPath}.demo.js`)
    .then(render)
    .catch(render);
