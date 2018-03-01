// @flow
import styled from 'react-emotion';

import palette from 'pasteup/palette';

export default styled('a')({
    fontSize: 14,
    fontFamily:
        '"Guardian Text Sans Web","Helvetica Neue","Helvetica","Arial","Lucida Grande","sans-serif"',
    color: palette.neutral['1'],
    float: 'left',
    lineHeight: 1.2,
    position: 'relative',
    transition: 'color 80ms ease-out',
    padding: '6px 10px',
    margin: '1px 0 0',
    textDecoration: 'none',
    ':hover': {
        textDecoration: 'underline',
    },
    ':focus': {
        textDecoration: 'underline',
    },
});
