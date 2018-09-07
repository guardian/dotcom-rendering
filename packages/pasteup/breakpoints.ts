
// underscored names to avoid clashing with the `from` shorthand exports
const breakpoints = {
    mobile: 320,
    mobileMedium: 360,
    mobileLandscape: 480,
    phablet: 660,
    tablet: 740,
    desktop: 980,
    leftCol: 1140,
    wide: 1300,
};

// tslint:disable:no-shadowed-variable
// this will need refactoring to fix

const minWidth = (from: number): string => `@media (min-width: ${`${from}px`})`;

const maxWidth = (until: number): string =>
    `@media (max-width: ${`${until - 1}px`})`;

const minWidthMaxWidth = (from: number, until: number): string =>
    `@media (min-width: ${`${from}px`}) and (max-width: ${`${until - 1}px`})`;

export const mobile = minWidth(breakpoints.mobile);
export const mobileMedium = minWidth(breakpoints.mobileMedium);
export const mobileLandscape = minWidth(breakpoints.mobileLandscape);
export const phablet = minWidth(breakpoints.phablet);
export const tablet = minWidth(breakpoints.tablet);
export const desktop = minWidth(breakpoints.desktop);
export const leftCol = minWidth(breakpoints.leftCol);
export const wide = minWidth(breakpoints.wide);

// e.g. until.*
export const until = {
    mobile: maxWidth(breakpoints.mobile),
    mobileMedium: maxWidth(breakpoints.mobileMedium),
    mobileLandscape: maxWidth(breakpoints.mobileLandscape),
    phablet: maxWidth(breakpoints.phablet),
    tablet: maxWidth(breakpoints.tablet),
    desktop: maxWidth(breakpoints.desktop),
    leftCol: maxWidth(breakpoints.leftCol),
    wide: maxWidth(breakpoints.wide),
};

// e.g. between.*.and.*
export const from = {
    mobile: {
        until: {
            mobileMedium: minWidthMaxWidth(
                breakpoints.mobile,
                breakpoints.mobileMedium,
            ),
            mobileLandscape: minWidthMaxWidth(
                breakpoints.mobile,
                breakpoints.mobileLandscape,
            ),
            phablet: minWidthMaxWidth(breakpoints.mobile, breakpoints.phablet),
            tablet: minWidthMaxWidth(breakpoints.mobile, breakpoints.tablet),
            desktop: minWidthMaxWidth(breakpoints.mobile, breakpoints.desktop),
            leftCol: minWidthMaxWidth(breakpoints.mobile, breakpoints.leftCol),
            wide: minWidthMaxWidth(breakpoints.mobile, breakpoints.wide),
        },
    },
    mobileMedium: {
        until: {
            mobileLandscape: minWidthMaxWidth(
                breakpoints.mobileMedium,
                breakpoints.mobileLandscape,
            ),
            phablet: minWidthMaxWidth(
                breakpoints.mobileMedium,
                breakpoints.phablet,
            ),
            tablet: minWidthMaxWidth(
                breakpoints.mobileMedium,
                breakpoints.tablet,
            ),
            desktop: minWidthMaxWidth(
                breakpoints.mobileMedium,
                breakpoints.desktop,
            ),
            leftCol: minWidthMaxWidth(
                breakpoints.mobileMedium,
                breakpoints.leftCol,
            ),
            wide: minWidthMaxWidth(breakpoints.mobileMedium, breakpoints.wide),
        },
    },
    mobileLandscape: {
        until: {
            phablet: minWidthMaxWidth(
                breakpoints.mobileLandscape,
                breakpoints.phablet,
            ),
            tablet: minWidthMaxWidth(
                breakpoints.mobileLandscape,
                breakpoints.tablet,
            ),
            desktop: minWidthMaxWidth(
                breakpoints.mobileLandscape,
                breakpoints.desktop,
            ),
            leftCol: minWidthMaxWidth(
                breakpoints.mobileLandscape,
                breakpoints.leftCol,
            ),
            wide: minWidthMaxWidth(
                breakpoints.mobileLandscape,
                breakpoints.wide,
            ),
        },
    },
    phablet: {
        until: {
            tablet: minWidthMaxWidth(breakpoints.phablet, breakpoints.tablet),
            desktop: minWidthMaxWidth(breakpoints.phablet, breakpoints.desktop),
            leftCol: minWidthMaxWidth(breakpoints.phablet, breakpoints.leftCol),
            wide: minWidthMaxWidth(breakpoints.phablet, breakpoints.wide),
        },
    },
    tablet: {
        until: {
            desktop: minWidthMaxWidth(breakpoints.tablet, breakpoints.desktop),
            leftCol: minWidthMaxWidth(breakpoints.tablet, breakpoints.leftCol),
            wide: minWidthMaxWidth(breakpoints.tablet, breakpoints.wide),
        },
    },
    desktop: {
        until: {
            leftCol: minWidthMaxWidth(breakpoints.desktop, breakpoints.leftCol),
            wide: minWidthMaxWidth(breakpoints.desktop, breakpoints.wide),
        },
    },
    leftCol: {
        until: {
            wide: minWidthMaxWidth(breakpoints.leftCol, breakpoints.wide),
        },
    },
};
