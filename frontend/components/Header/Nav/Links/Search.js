// @flow
import { styled } from '@guardian/guui';

import Link from './Link';

export default styled(Link)({
    ':after': {
        content: '""',
        display: 'inline-block',
        width: 4,
        height: 4,
        transform: 'translateY(-2px) rotate(45deg)',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'currentColor',
        borderLeft: 'none',
        borderTop: 'none',
        marginLeft: 4,
        verticalAlign: 'middle',
        webkitBackfaceVisibility: 'hidden',
        transition: 'transform 250ms ease-out',
    },
    ':hover:after': {
        transform: 'translateY(0) rotate(45deg)',
    },
});
