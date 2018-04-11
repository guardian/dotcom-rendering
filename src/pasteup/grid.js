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

const gridStyles = (breakpoint, columnCount) => ({
    [breakpointMqs[breakpoint]]: {
        float: 'left',
        width:
            columnCount * columns[breakpoint].width +
            (columnCount - 1) * gutter,
        paddingLeft: gutter,
    },
});

const RowStyled = styled('div')({
    ...clearFix,
    marginLeft: -gutter,
});
const ColsStyled = styled('div')(({ tablet, desktop, leftCol, wide }) => {
    const tabletStyles = tablet ? gridStyles('tablet', tablet) : {};
    const desktopStyles = desktop ? gridStyles('desktop', desktop) : {};
    const leftColStyles = leftCol ? gridStyles('leftCol', leftCol) : {};
    const wideStyles = wide ? gridStyles('wide', wide) : {};

    return {
        ...tabletStyles,
        ...desktopStyles,
        ...leftColStyles,
        ...wideStyles,
    };
});

export const Row = ({ children }) => <RowStyled>{children}</RowStyled>;
export const Cols = ({ tablet, desktop, leftCol, wide, children }) => (
    <ColsStyled tablet={tablet} desktop={desktop} leftCol={leftCol} wide={wide}>
        {children}
    </ColsStyled>
);
