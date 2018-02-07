// @flow
/* eslint-disable global-require,import/no-dynamic-require */
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import Styletron from 'styletron-server';
import { StyletronProvider } from 'styletron-react';

const srcDir = path.resolve(__dirname, '..', '..', 'src');

export default (componentPath: string): string => {
    Object.keys(require.cache).forEach(key => delete require.cache[key]);

    // laoding it this way stops node caching it, so we
    // can pick up changes
    const App = require('./App').default;
    const styletron = new Styletron();

    let demos = {};

    try {
        demos = require(`${srcDir}/${componentPath}.demo`);
    } catch (e) {
        // do thing, it's handled in the UI
    }

    const html = renderToString(
        <StyletronProvider styletron={styletron}>
            <App demos={{ ...demos }} path={componentPath} />
        </StyletronProvider>,
    );

    const stylesForHead = styletron.getStylesheetsHtml();

    return `
        <!doctype html>
        <html>
            <head>
                <title>✍️ ɢᴜᴜɪ</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" />
                <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">
                <link rel="stylesheet" href="https://pasteup.guim.co.uk/0.0.8/css/fonts.pasteup.min.css">
                <style>
                body {
                    padding: 2rem;
                    background-color: #efefef;
                }
                </style>
                ${stylesForHead}
            </head>
            <body>
                <div id='app'>${html}</div>
                <script src="/assets/javascript/app.browser.js"></script>
            </body>
        </html>
    `;
};
