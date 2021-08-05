// @preval

// note: this file is intended to imported using babel-plugin-preval
// the easiest way is probably with the import-comment:
// https://www.npmjs.com/package/babel-plugin-preval#import-comment

const { readFileSync } = require('fs');

const resetCSSPath = require.resolve('reset-css');
const resetCSS = readFileSync(resetCSSPath, 'utf-8');

// If you edit this css please copy over changes to ./storybook/default-css.ts
const defaults = `
    *, *:before, *:after {
        box-sizing: inherit;
    }
    html {
        box-sizing: border-box;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
    }
    html, body {
        text-rendering: optimizeLegibility;
        font-feature-settings: 'kern';
        font-kerning: normal; /* Safari 7+, Firefox 24+, Chrome 33(?)+, Opera 21 */
        font-variant-ligatures: common-ligatures;
    }
    body {
        background-color: white;
        color: #121212;
    }
    em {
        font-style: italic;
    }
`;

module.exports = [resetCSS, defaults].join('').replace(/\s/g, '');
