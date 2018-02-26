// @flow
/* eslint-disable global-require,import/no-dynamic-require */
import path from 'path';

import { renderToString } from 'react-dom/server';

import doc from '../../src/lib/__html';

const srcDir = path.resolve(__dirname, '..', '..', 'src');

export default (componentPath: string): string => {
    // laoding it this way stops node caching it, so we
    // can pick up changes
    const Src = require('./Src').default;

    let demos = {};

    try {
        demos = require(`${srcDir}/${componentPath}.demo`);
    } catch (e) {
        // do thing, it's handled in the UI
    }

    const html = renderToString(
        <Src demos={{ ...demos }} path={componentPath} />,
    );

    const stylesForHead = [
        `<link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">`,
        `<link rel="stylesheet" href="https://pasteup.guim.co.uk/0.0.8/css/fonts.pasteup.min.css">`,
    ].join('');

    return doc({
        html,
        stylesForHead,
        jsApp: '/assets/javascript/src.browser.js',
        jsNonBlocking: `
            const sendWidth = () => {
                window.parent.postMessage({ComponentWindowWidth: window.innerWidth}, "*");
            };
            sendWidth();
            window.addEventListener("resize", sendWidth);
        `,
    });
};
