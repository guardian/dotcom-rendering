// @flow
import styled from 'preact-emotion';
import {
    tablet as tabletMq,
    desktop as desktopMq,
    leftCol as leftColMq,
    wide as wideMq,
} from './breakpoints';

const columns = {
    tablet: {
        max: 12,
        width: 40,
        gutter: 20,
    },
    desktop: {
        max: 12,
        width: 60,
        gutter: 20,
    },
    leftCol: {
        max: 14,
        width: 60,
        gutter: 20,
    },
    wide: {
        max: 16,
        width: 60,
        gutter: 20,
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
            (columnCount - 1) * columns[breakpoint].gutter,
        paddingRight: columns[breakpoint].gutter,
        ':last-of-type': {
            paddingRight: 0,
        },
    },
});

const RowStyled = styled('div')();
const ColStyled = styled('div')(({ tablet, desktop, leftCol, wide }) => {
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
export const Col = ({ tablet, desktop, leftCol, wide, children }) => (
    <ColStyled tablet={tablet} desktop={desktop} leftCol={leftCol} wide={wide}>
        {children}
    </ColStyled>
);
