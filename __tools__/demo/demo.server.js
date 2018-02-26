// @flow
/* eslint-disable global-require,import/no-dynamic-require */
import { readdirSync } from 'fs';

import { renderToString } from 'react-dom/server';

import doc from '../../src/lib/__html';

const availableDemos = readdirSync('src/components').filter(file =>
    file.endsWith('demo.js'),
);

export default (componentPath: string): string => {
    // laoding it this way stops node caching it, so we
    // can pick up changes
    const Demo = require('./Demo').default;

    const html = renderToString(
        <Demo path={componentPath} availableDemos={availableDemos} />,
    );

    const stylesForHead = [
        `<link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">`,
        `<link rel="stylesheet" href="https://pasteup.guim.co.uk/0.0.8/css/fonts.pasteup.min.css">`,
    ].join('');

    return doc({
        title: '✍️ 𝐆𝐔𝐔𝐈',
        stylesForHead,
        html,
        jsApp: '/assets/javascript/demo.browser.js',
        state: { availableDemos },
    });
};
