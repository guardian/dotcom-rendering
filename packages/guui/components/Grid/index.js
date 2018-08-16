// @flow
import { css } from 'react-emotion';
import {
    tablet as tabletMq,
    desktop as desktopMq,
    leftCol as leftColMq,
    wide as wideMq,
} from '@guardian/pasteup/breakpoints';
import { clearFix } from '@guardian/pasteup/mixins';

type Breakpoint = 'tablet' | 'desktop' | 'leftCol' | 'wide';
type BreakpointOptions = {
    inset?: number,
};
type BreakpointProps = [number, BreakpointOptions];
type GridSize = {
    max: number,
    width: number,
};
type GridSizes = {
    [Breakpoint]: GridSize,
};

const gutter = 20;
const columns: GridSizes = {
    tablet: {
        max: 12,
        width: 40,
    },
    desktop: {
        max: 12,
        width: 60,
    },
    leftCol: {
        max: 14,
        width: 60,
    },
    wide: {
        max: 16,
        width: 60,
    },
};

const breakpointMqs: {
    [Breakpoint]: string,
} = {
    tablet: tabletMq,
    desktop: desktopMq,
    leftCol: leftColMq,
    wide: wideMq,
};

const calculateWidth = (breakpoint: Breakpoint, colspan: number): number => {
    let colspanOrMax = colspan;

    if (!colspanOrMax) {
        colspanOrMax = columns[breakpoint].max;
    }

    return (
        colspanOrMax * columns[breakpoint].width + (colspanOrMax - 1) * gutter
    );
};

const gridStyles = (
    breakpoint: Breakpoint,
    [colspan, options]: BreakpointProps,
) => `
    ${breakpointMqs[breakpoint]} {
        float: left;
        width: ${calculateWidth(breakpoint, colspan) + gutter}px;
        padding-left: ${gutter};
        margin-left: ${
            options && options.inset
                ? `${calculateWidth(breakpoint, options.inset) + gutter}px`
                : 0
        }
    }
`;

const row = css`
    ${css(clearFix)};
    margin-left: ${-gutter}px;
`;

const cols = ({
    tablet,
    desktop,
    leftCol,
    wide,
}: {
    [Breakpoint]: BreakpointProps,
}) => css`
    ${gridStyles('tablet', tablet)};
    ${gridStyles('desktop', desktop)};
    ${gridStyles('leftCol', leftCol)};
    ${gridStyles('wide', wide)};
`;

const normaliseProps = (props: BreakpointProps | number): BreakpointProps => {
    if (Array.isArray(props)) {
        if (props.length === 1) {
            return [props[0], {}];
        }
        return props;
    } else if (typeof props === 'number') {
        return [props, {}];
    }
    return props;
};

export const Row = ({
    htmlTag,
    children,
}: {
    htmlTag: string,
    children: React.Node,
}) => (
    <>
        {React.createElement(
            htmlTag,
            {
                className: row,
            },
            children,
        )}
    </>
);

Row.defaultProps = {
    htmlTag: 'div',
};

export const Cols = ({
    htmlTag,
    tablet,
    desktop,
    leftCol,
    wide,
    children,
}: {
    htmlTag: string,
    [Breakpoint]: BreakpointProps | number,
    children: React.Node,
}) => (
    <>
        {React.createElement(
            htmlTag,
            {
                className: cols({
                    tablet: normaliseProps(tablet),
                    desktop: normaliseProps(desktop),
                    leftCol: normaliseProps(leftCol),
                    wide: normaliseProps(wide),
                }),
            },
            children,
        )}
    </>
);

Cols.defaultProps = {
    htmlTag: 'div',
    tablet: [columns.tablet.max, {}],
    desktop: [columns.desktop.max, {}],
    leftCol: [columns.leftCol.max, {}],
    wide: [columns.wide.max, {}],
};
