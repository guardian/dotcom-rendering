// @flow
import styled from 'preact-emotion';

import { tablet, desktop } from 'pasteup/breakpoints';
import { egyptian } from 'pasteup/fonts';

const SubNavTitle = styled('a')({
    backgroundColor: 'transparent',
    textDecoration: 'none',
    border: 0,
    boxSizing: 'border-box',
    color: '#121212',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: 20,
    fontFamily: egyptian,
    fontWeight: 400,
    outline: 'none',
    padding: '8px 34px 8px 50px',
    position: 'relative',
    textAlign: 'left',
    width: '100%',
    [tablet]: {
        paddingLeft: 60,
    },
    [desktop]: {
        fontSize: 15,
        lineHeight: 1.2,
        padding: '6px 0',
    },
    ':hover': {
        color: '#5d5f5f',
    },
    ':focus': {
        color: '#5d5f5f',
    },
    '> *': {
        pointerEvents: 'none',
    },
});
SubNavTitle.displayName = 'SubNavTitle';

export default ({ link }) => (
    <SubNavTitle href={link.href}>{link.label}</SubNavTitle>
);
