// @flow

const { parseCSS: emotionParser } = require('babel-plugin-emotion/lib/parser');

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

module.exports = function uiCSS(source: string): string {
    const { styles } = reFloat(
        // have emotion parse it
        emotionParser(source, false, this.resourcePath)
    );

    // turn '.key' keys into 'key'
    const normalisedKeysStyles = normaliseKeys(styles);

    return `module.exports = ${JSON.stringify(normalisedKeysStyles)};`;
};
