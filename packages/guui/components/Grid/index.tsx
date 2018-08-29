import React from 'react'
import { css } from 'react-emotion';
import {
    tablet as tabletMq,
    desktop as desktopMq,
    leftCol as leftColMq,
    wide as wideMq,
} from '@guardian/pasteup/breakpoints';
import { clearFix } from '@guardian/pasteup/mixins';

type Breakpoints = 'tablet' | 'desktop' | 'leftCol' | 'wide';

type BreakpointOptions = {
    inset?: number,
};

type BreakpointProps = [number, BreakpointOptions];

type BreakpointsWithProps = {
    [K in Breakpoints]: BreakpointProps    
}

type GridSize = {
    max: number,
    width: number,
};

type GridSizes = {
    [K in Breakpoints]: GridSize
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
    [K in Breakpoints]: string
} = {
    tablet: tabletMq,
    desktop: desktopMq,
    leftCol: leftColMq,
    wide: wideMq,
};

const calculateWidth = (breakpoint: Breakpoints, colspan: number): number => {
    let colspanOrMax = colspan;

    if (!colspanOrMax) {
        colspanOrMax = columns[breakpoint].max;
    }

    return (
        colspanOrMax * columns[breakpoint].width + (colspanOrMax - 1) * gutter
    );
};

const gridStyles = (
    breakpoint: Breakpoints,
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

const cols: (props: BreakpointsWithProps) => any = ({
    tablet,
    desktop,
    leftCol,
    wide
}) => css`
    ${gridStyles('tablet', tablet)};
    ${gridStyles('desktop', desktop)};
    ${gridStyles('leftCol', leftCol)};
    ${gridStyles('wide', wide)};
`;

const normaliseProps = (props: BreakpointProps | number): BreakpointProps => {
    if (Array.isArray(props)) {
        return props;
    } else if (typeof props === 'number') {
        return [props, {}];
    }
    return props;
};

export const Row: React.SFC<{
    htmlTag: string,
    children: React.ReactNode,
}> = ({
    htmlTag,
    children,
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

export interface ColsProps  { 
    tablet: BreakpointProps | number;
    desktop: BreakpointProps | number;
    leftCol: BreakpointProps | number;
    wide: BreakpointProps | number;
    htmlTag: string;
    children: React.ReactNode;
}

export const Cols: React.SFC<ColsProps> = ({
    htmlTag = 'div',
    tablet = columns.tablet.max,
    desktop = columns.desktop.max, 
    leftCol = columns.leftCol.max, 
    wide =    columns.wide.max   , 
    children,
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
