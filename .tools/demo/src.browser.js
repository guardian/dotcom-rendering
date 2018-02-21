// @flow

// $FlowFixMe https://github.com/facebook/flow/issues/5035
import { hydrate } from 'react-dom';
import Styletron from 'styletron-client';
import { StyletronProvider } from 'styletron-react';

import Src from './Src';

// webpack-specific
// eslint-disable-next-line camelcase,no-undef
__webpack_public_path__ = '/assets/javascript/';

const styleElements = document.getElementsByClassName('_styletron_hydrate_');

const componentPath = window.location.pathname.split('/src/')[1];

if (module.hot) {
    module.hot.accept();
}

const render = (demos = {}) => {
    hydrate(
        <StyletronProvider styletron={new Styletron(styleElements)}>
            <Src demos={{ ...demos }} path={componentPath} />
        </StyletronProvider>,
        document.getElementById('app'),
    );
};

import(`../../src/${componentPath}.demo.js`)
    .then(render)
    .catch(render);
