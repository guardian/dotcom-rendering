// @flow

import React from 'react';
import { hydrate } from 'react-dom';
import Styletron from 'styletron-client';
import { StyletronProvider } from 'styletron-react';

import App from './App';

__webpack_public_path__ = '/assets/javascript/';

const styleElements = document.getElementsByClassName('_styletron_hydrate_');

const pathName = window.location.pathname.split('/src/')[1];

if (module.hot) {
    module.hot.accept();
}

import(`../../src/${pathName}.demo.js`)
    .then(demos => {
        hydrate(
            <StyletronProvider styletron={new Styletron(styleElements)}>
                <App demos={{ ...demos }} path={pathName} />
            </StyletronProvider>,
            document.getElementById('app'),
        );
    })
    .catch(() =>
        hydrate(
            <StyletronProvider styletron={new Styletron(styleElements)}>
                <App demos={{}} path={pathName} />
            </StyletronProvider>,
            document.getElementById('app'),
        ),
    );
