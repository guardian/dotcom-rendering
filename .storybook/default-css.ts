// This css is duplicated from /src/lib/reset-css
export const defaults = `
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
