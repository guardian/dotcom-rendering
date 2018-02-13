// @flow

// $FlowFixMe https://github.com/facebook/flow/issues/5035
import { hydrate } from 'react-dom';
import Styletron from 'styletron-client';
import { StyletronProvider } from 'styletron-react';

import App from './App';

// webpack-specific
// eslint-disable-next-line camelcase,no-undef
__webpack_public_path__ = '/assets/javascript/';

const styleElements = document.getElementsByClassName('_styletron_hydrate_');

const componentPath = window.location.pathname.split('/src/')[1];

hydrate(
    <StyletronProvider styletron={new Styletron(styleElements)}>
        <App path={componentPath} />
    </StyletronProvider>,
    document.getElementById('app'),
);
