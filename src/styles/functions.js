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

const getSizeFromBreakpoint = breakpoint => {
    if (breakpoints[breakpoint]) {
        return breakpoints[breakpoint];
    } else {
        return '0';
    }
};
const getMinWidth = breakpoint => `(min-width: ${getSizeFromBreakpoint(breakpoint) + "px"})`;
const getMaxWidth = breakpoint => `(max-width: ${getSizeFromBreakpoint(breakpoint) - 1 + "px"})`;

export const from = breakpoint => `@media ${getMinWidth(breakpoint)}`;
export const until = breakpoint => `@media ${getMaxWidth(breakpoint)}`;
export const between = (lowerBreakpoint, upperBreakpoint) => `@media ${getMinWidth(lowerBreakpoint)} and ${getMaxWidth(upperBreakpoint)}`;