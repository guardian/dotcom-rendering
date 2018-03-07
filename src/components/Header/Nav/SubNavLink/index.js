// @flow
import styled from 'react-emotion';

import { desktop } from 'pasteup/breakpoints';
import { screenReaderOnly } from 'pasteup/mixins';
import { headline } from 'pasteup/fonts';

const ScreenReadable = styled('span')(screenReaderOnly);

const navPrimaryColour = '#121212';
const navSecondaryColour = '#5d5f5f';

const SubNavLinkStyled = styled('div')({
    display: 'none',
    fontFamily: headline,
    fontWeight: 400,
    textDecoration: 'none',
    color: navSecondaryColour,
    cursor: 'pointer',
    lineHeight: 1,
    position: 'relative',
    overflow: 'hidden',
    borderLeft: '1px solid #abc2c9',
    fontSize: 22,
    height: 48,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 20,
    paddingLeft: 5,
    [desktop]: {
        display: 'block',
    },
    '&:hover': {
        color: navPrimaryColour,
    },
    '&:focus': {
        color: navPrimaryColour,
    },
    ':after': {
        content: '""',
        border: '2px solid currentColor',
        borderLeft: 'transparent',
        borderTop: 'transparent',
        display: 'inline-block',
        height: 8,
        marginLeft: 6,
        transform: 'translateY(-3px) rotate(45deg)',
        transition: 'transform 250ms ease-out',
        verticalAlign: 'middle',
        width: 8,
    },
    ':hover:after': {
        transform: 'translateY(0) rotate(45deg)',
    },
});

export default ({ toggleSubNav }) => (
    <SubNavLinkStyled
        onClick={() => toggleSubNav()}
    >
        <ScreenReadable>Show</ScreenReadable>
        More
    </SubNavLinkStyled>
);
