// @flow
// @preval

// note: this file is intended to imported using babel-plugin-preval
// the easiest way is probably with the import-comment:
// https://www.npmjs.com/package/babel-plugin-preval#import-comment

const { readFileSync } = require('fs');

const resetCSSPath = require.resolve('reset-css');
const resetCSS = readFileSync(resetCSSPath, 'utf-8');

const defaults = `
    html {
        box-sizing: border-box;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        background-color: white;
    }
`;

module.exports = [resetCSS, defaults].join('').replace(/\s/g, '');
