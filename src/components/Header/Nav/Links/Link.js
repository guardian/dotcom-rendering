// @flow
import styled from 'react-emotion';

import palette from 'pasteup/palette';
import { textSans } from 'pasteup/fonts';
import { tablet, desktop } from 'pasteup/breakpoints';

export default styled('a')(({ showAtTablet }) => ({
    fontSize: 14,
    fontFamily: textSans,
    color: palette.neutral['1'],
    float: 'left',
    lineHeight: 1.2,
    position: 'relative',
    transition: 'color 80ms ease-out',
    padding: '6px 10px',
    margin: '1px 0 0',
    textDecoration: 'none',
    display: 'none',
    ':hover': {
        textDecoration: 'underline',
    },
    ':focus': {
        textDecoration: 'underline',
    },
    ...(showAtTablet && {
        [tablet]: {
            display: 'block',
        },
    }),
    [desktop]: {
        display: 'block',
    },
}));
