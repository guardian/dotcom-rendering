// @flow

// $FlowFixMe https://github.com/facebook/flow/issues/5035
import { hydrate } from 'react-dom';
import Styletron from 'styletron-client';
import { StyletronProvider } from 'styletron-react';

import Demo from './Demo';

// webpack-specific
// eslint-disable-next-line camelcase,no-undef
__webpack_public_path__ = '/assets/javascript/';

const styleElements = document.getElementsByClassName('_styletron_hydrate_');

const { availableDemos } = window.gu.app.state;

const componentPath = window.location.pathname.split('/demo/')[1];

hydrate(
    <StyletronProvider styletron={new Styletron(styleElements)}>
        <Demo path={componentPath} availableDemos={availableDemos} />
    </StyletronProvider>,
    document.getElementById('app'),
);
