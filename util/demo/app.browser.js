// @flow

import React from 'react';
import { hydrate } from 'react-dom';
import Styletron from 'styletron-client';
import { StyletronProvider } from 'styletron-react';

import App from './App';

__webpack_public_path__ = '/assets/javascript/';

const styleElements = document.getElementsByClassName('_styletron_hydrate_');

const componentPath = window.location.pathname.split('/src/')[1];

hydrate(
    <StyletronProvider styletron={new Styletron(styleElements)}>
        <App path={componentPath} />
    </StyletronProvider>,
    document.getElementById('app'),
);
