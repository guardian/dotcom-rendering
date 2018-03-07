// @flow
import styled from 'preact-emotion';

import palette, { pillars } from 'pasteup/palette';
import { headline } from 'pasteup/fonts';

export default styled('a')(() => ({
    color: palette.neutral.header,
    fontFamily: headline,
    fontSize: 14,
    fontWeight: 500,
    textDecoration: 'none',
    position: 'relative',
    width: 135,
    display: 'block',
    textAlign: 'center',
    paddingTop: 6,
    zIndex: 0,
    float: 'left',
    ':before': {
        backgroundColor: palette.neutral['1'],
        borderRadius: '50%',
        top: -85,
        left: 0,
        right: 0,
        paddingTop: '100%',
        content: '""',
        display: 'block',
        position: 'absolute',
        transition: 'background-color 250ms ease-out, transform 250ms ease-out',
        zIndex: -1,
    },
    ':hover:before': {
        backgroundColor: pillars.news,
        transform: 'scale(1.05)',
    },
}));
