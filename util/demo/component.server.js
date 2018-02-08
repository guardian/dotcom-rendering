// @flow
/* eslint-disable global-require,import/no-dynamic-require */
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import Styletron from 'styletron-server';
import { StyletronProvider } from 'styletron-react';

import doc from '../../src/app/__html';

const srcDir = path.resolve(__dirname, '..', '..', 'src');

export default (componentPath: string): string => {
    Object.keys(require.cache).forEach(key => delete require.cache[key]);

    // laoding it this way stops node caching it, so we
    // can pick up changes
    const Component = require('./Component').default;
    const styletron = new Styletron();

    let demos = {};

    try {
        demos = require(`${srcDir}/${componentPath}.demo`);
    } catch (e) {
        // do thing, it's handled in the UI
    }

    const html = `
        ${renderToString(
            <StyletronProvider styletron={styletron}>
                <Component demos={{ ...demos }} path={componentPath} />
            </StyletronProvider>,
        )}
        <script>
            const sendWidth = () => {
                window.parent.postMessage({ComponentWindowWidth: window.innerWidth}, "*");
            };
            sendWidth();
            window.addEventListener("resize", sendWidth);
        </script>
    `;

    const stylesForHead = [
        `<link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">`,
        `<link rel="stylesheet" href="https://pasteup.guim.co.uk/0.0.8/css/fonts.pasteup.min.css">`,
        styletron.getStylesheetsHtml(),
    ].join('');

    return doc({
        html,
        stylesForHead,
        jsApp: '/assets/javascript/component.browser.js',
    });
};
