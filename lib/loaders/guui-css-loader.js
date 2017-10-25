// @flow

const { parseCSS: emotionParser } = require('babel-plugin-emotion/lib/parser');

type CategorisedStyles = {
    expensiveCss?: Object,
    cheapCss?: Object,
};

// turn class selectors into reasonable keys
// {'.header': 'blah'} => {'header': 'blah'}
const normaliseKeys = (styles: Object): Object =>
    Object.keys(styles).reduce(
        (normalised, key) =>
            Object.assign({}, normalised, {
                [key.replace(/^\./, '')]: styles[key],
            }),
        {}
    );

// bloomin heck - replace 'float's that have been converted by postcss-js
// to 'cssFloat' back to 'float'
// https://github.com/rtsao/styletron/pull/54
const reFloat = (rules: Object): Object =>
    Object.keys(rules).reduce((refloated, key) => {
        if (key === 'cssFloat') {
            return Object.assign({}, refloated, { float: rules[key] });
        }
        if (typeof rules[key] === 'object') {
            return Object.assign({}, refloated, {
                [key]: reFloat(rules[key]),
            });
        }
        return Object.assign({}, refloated, { [key]: rules[key] });
    }, {});

// splits rules into cheap/expensive clusters which
// can then be handled appropriately. which
// basically means 'can styletron handle it?':
// {
//     color: 'red',
//     '@supports (display: flex)': {
//         display: 'flex',
//     },
// }
// becomes
// {
//     cheapCSS: { color: 'red' },
//     expensiveCSS: {
//         '@supports (display: flex)': {
//             display: 'flex',
//         },
//     },
// }
const categoriseStyles = (styles: Object): CategorisedStyles =>
    Object.keys(styles).reduce((categorisedStyles, key) => {
        const rule = styles[key];

        const categorisedStyle = Object.keys(
            rule
        ).reduce(({ cheapCSS = {}, expensiveCSS = {} }, decl) => {
            if (
                typeof rule[decl] !== 'object' ||
                (decl.startsWith('@media') &&
                    Object.values(rule[decl]).every(
                        mediaDeclValue => typeof mediaDeclValue !== 'object'
                    ))
            ) {
                return {
                    expensiveCSS,
                    cheapCSS: Object.assign({}, cheapCSS, {
                        [decl]: rule[decl],
                    }),
                };
            }
            return {
                cheapCSS,
                expensiveCSS: Object.assign({}, expensiveCSS, {
                    [decl]: rule[decl],
                }),
            };
        }, {});

        return Object.assign(categorisedStyles, {
            [key]: categorisedStyle,
        });
    }, {});

module.exports = function uiCSS(source: string): string {
    const { styles } = reFloat(
        // have emotion parse it
        emotionParser(source, false, this.resourcePath)
    );

    // turn '.key' keys into 'key'
    const normalisedKeysStyles = normaliseKeys(styles);

    // split out styles we can pass to styeltron
    const categorisedStyles = categoriseStyles(normalisedKeysStyles);

    return `module.exports = ${JSON.stringify(categorisedStyles)};`;
};
