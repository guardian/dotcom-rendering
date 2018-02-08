// @flow
import React from 'react';
// $FlowFixMe https://github.com/facebook/flow/issues/5035
import { hydrate } from 'react-dom';
import Styletron from 'styletron-client';
import { StyletronProvider } from 'styletron-react';

import App from './App';

// webpack-specific
// eslint-disable-next-line camelcase,no-undef
__webpack_public_path__ = '/assets/javascript/';

const styleElements = document.getElementsByClassName('_styletron_hydrate_');

hydrate(
    <StyletronProvider styletron={new Styletron(styleElements)}>
        <App />
    </StyletronProvider>,
    document.getElementById('app'),
);
