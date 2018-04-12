// @flow
import styled from 'preact-emotion';
import {
    tablet as tabletMq,
    desktop as desktopMq,
    leftCol as leftColMq,
    wide as wideMq,
} from './breakpoints';
import { clearFix } from './mixins';

const gutter = 20;
const columns = {
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

export const calculateWidth = (breakpoint, colspan) => {
    let colspanOrMax = colspan;

    if (!colspanOrMax) {
        colspanOrMax = columns[breakpoint].max;
    }

    return colspanOrMax * columns[breakpoint].width + (colspanOrMax - 1) * gutter;
}

const gridStyles = (breakpoint, [colspan]) => ({
    [breakpointMqs[breakpoint]]: {
        float: 'left',
        width: calculateWidth(breakpoint, colspan) + gutter,
        paddingLeft: gutter,
    },
});

const RowStyled = styled('div')({
    ...clearFix,
    marginLeft: -gutter,
});
const ColsStyled = styled('div')(({ tablet, desktop, leftCol, wide }) => {
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
});

const normaliseProps = prop => {
    if (Array.isArray(prop)) {
        if (prop.length === 1) {
            return [...prop, {}];
        }

        return prop;
    } else if (typeof prop === 'number') {
        return [prop, {}];
    }
};

export const Row = ({ children }) => <RowStyled>{children}</RowStyled>;
export const Cols = ({
    tablet = [columns.tablet.max, {}],
    desktop = [columns.desktop.max, {}],
    leftCol = [columns.leftCol.max, {}],
    wide = [columns.wide.max, {}],
    children,
}) => (
    <ColsStyled
        tablet={normaliseProps(tablet)}
        desktop={normaliseProps(desktop)}
        leftCol={normaliseProps(leftCol)}
        wide={normaliseProps(wide)}
    >
        {children}
    </ColsStyled>
);
