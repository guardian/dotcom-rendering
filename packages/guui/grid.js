// @flow
import { styled } from '@guardian/guui';
import {
    tablet as tabletMq,
    desktop as desktopMq,
    leftCol as leftColMq,
    wide as wideMq,
} from '@guardian/pasteup/breakpoints';
import { clearFix } from '@guardian/pasteup/mixins';

type Breakpoint = 'tablet' | 'desktop' | 'leftCol' | 'wide';
type GridSize = {
    max: number,
    width: number,
};
type GridSizes = {
    [Breakpoint]: GridSize,
};
type BreakpointOptions = {
    inset?: number,
};
type BreakpointProps = [number, BreakpointOptions];
type MQStyles = {
    [mediaQuery: string]: {},
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

const breakpointMqs = {
    tablet: tabletMq,
    desktop: desktopMq,
    leftCol: leftColMq,
    wide: wideMq,
};

export const calculateWidth = (
    breakpoint: Breakpoint,
    colspan: number,
): number => {
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
): MQStyles => ({
    [breakpointMqs[breakpoint]]: {
        float: 'left',
        width: calculateWidth(breakpoint, colspan) + gutter,
        paddingLeft: gutter,
        marginLeft: options.inset
            ? calculateWidth(breakpoint, options.inset) + gutter
            : 0,
    },
});

const RowStyled = styled('div')({
    ...clearFix,
    marginLeft: -gutter,
});

const ColsStyled = styled('div')(
    ({ tablet, desktop, leftCol, wide }): MQStyles => {
        const tabletStyles = gridStyles('tablet', tablet);
        const desktopStyles = gridStyles('desktop', desktop);
        const leftColStyles = gridStyles('leftCol', leftCol);
        const wideStyles = gridStyles('wide', wide);

        return {
            ...tabletStyles,
            ...desktopStyles,
            ...leftColStyles,
            ...wideStyles,
        };
    },
);

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
    htmlTag?: string,
    children: React$Node,
}) => {
    const GridRow = RowStyled.withComponent(htmlTag);

    return <GridRow>{children}</GridRow>;
};

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
    htmlTag?: string,
    [Breakpoint]: BreakpointProps | number,
    children: React$Node,
}) => {
    const GridCol = ColsStyled.withComponent(htmlTag);
    return (
        <GridCol
            tablet={normaliseProps(tablet)}
            desktop={normaliseProps(desktop)}
            leftCol={normaliseProps(leftCol)}
            wide={normaliseProps(wide)}
        >
            {children}
        </GridCol>
    );
};

Cols.defaultProps = {
    htmlTag: 'div',
    tablet: [columns.tablet.max, {}],
    desktop: [columns.desktop.max, {}],
    leftCol: [columns.leftCol.max, {}],
    wide: [columns.wide.max, {}],
}