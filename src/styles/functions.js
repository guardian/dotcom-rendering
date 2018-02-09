// @flow
/* eslint-disable no-underscore-dangle */

// underscored names to avoid export name class
const _mobile = 320;
const _mobileMedium = 360;
const _mobileLandscape = 480;
const _phablet = 660;
const _tablet = 740;
const _desktop = 980;
const _leftCol = 1140;
const _wide = 1300;

const minWidth = from => `@media (min-width: ${`${from}px`})`;

const maxWidth = until => `@media (max-width: ${`${until - 1}px`})`;
const minWidthMaxWidth = (from, until) =>
    `@media (min-width: ${`${from}px`}) and (max-width: ${`${until - 1}px`})`;

// e.g. from.*
export const from = {
    mobile: minWidth(_mobile),
    mobileMedium: minWidth(_mobileMedium),
    mobileLandscape: minWidth(_mobileLandscape),
    phablet: minWidth(_phablet),
    tablet: minWidth(_tablet),
    desktop: minWidth(_desktop),
    leftCol: minWidth(_leftCol),
    wide: minWidth(_wide),
};

// shorthands for from.*
export const {
    mobile,
    mobileMedium,
    mobileLandscape,
    phablet,
    tablet,
    desktop,
    leftCol,
    wide,
} = from;

// e.g. until.*
export const until = {
    mobile: maxWidth(_mobile),
    mobileMedium: maxWidth(_mobileMedium),
    mobileLandscape: maxWidth(_mobileLandscape),
    phablet: maxWidth(_phablet),
    tablet: maxWidth(_tablet),
    desktop: maxWidth(_desktop),
    leftCol: maxWidth(_leftCol),
    wide: maxWidth(_wide),
};

// e.g. between.*.and.*
export const between = {
    mobile: {
        and: {
            mobileMedium: minWidthMaxWidth(_mobile, _mobileMedium),
            mobileLandscape: minWidthMaxWidth(_mobile, _mobileLandscape),
            phablet: minWidthMaxWidth(_mobile, _phablet),
            tablet: minWidthMaxWidth(_mobile, _tablet),
            desktop: minWidthMaxWidth(_mobile, _desktop),
            leftCol: minWidthMaxWidth(_mobile, _leftCol),
            wide: minWidthMaxWidth(_mobile, _wide),
        },
    },
    mobileMedium: {
        and: {
            mobileLandscape: minWidthMaxWidth(_mobileMedium, _mobileLandscape),
            phablet: minWidthMaxWidth(_mobileMedium, _phablet),
            tablet: minWidthMaxWidth(_mobileMedium, _tablet),
            desktop: minWidthMaxWidth(_mobileMedium, _desktop),
            leftCol: minWidthMaxWidth(_mobileMedium, _leftCol),
            wide: minWidthMaxWidth(_mobileMedium, _wide),
        },
    },
    mobileLandscape: {
        and: {
            phablet: minWidthMaxWidth(_mobileLandscape, _phablet),
            tablet: minWidthMaxWidth(_mobileLandscape, _tablet),
            desktop: minWidthMaxWidth(_mobileLandscape, _desktop),
            leftCol: minWidthMaxWidth(_mobileLandscape, _leftCol),
            wide: minWidthMaxWidth(_mobileLandscape, _wide),
        },
    },
    phablet: {
        and: {
            tablet: minWidthMaxWidth(_phablet, _tablet),
            desktop: minWidthMaxWidth(_phablet, _desktop),
            leftCol: minWidthMaxWidth(_phablet, _leftCol),
            wide: minWidthMaxWidth(_phablet, _wide),
        },
    },
    tablet: {
        and: {
            desktop: minWidthMaxWidth(_tablet, _desktop),
            leftCol: minWidthMaxWidth(_tablet, _leftCol),
            wide: minWidthMaxWidth(_tablet, _wide),
        },
    },
    desktop: {
        and: {
            leftCol: minWidthMaxWidth(_desktop, _leftCol),
            wide: minWidthMaxWidth(_desktop, _wide),
        },
    },
    leftCol: {
        and: { wide: minWidthMaxWidth(_leftCol, _wide) },
    },
};
