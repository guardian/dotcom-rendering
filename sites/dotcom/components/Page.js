// @flow
import { styled } from '@guardian/guui';

import {
    mobileLandscape,
    tablet,
    desktop,
    leftCol,
    wide,
} from '@guardian/pasteup/breakpoints';

const Page = styled('div')({
    margin: 'auto',
    paddingLeft: 4,
    paddingRight: 4,
    [mobileLandscape]: {
        paddingLeft: 24,
        paddingRight: 24,
    },
    [tablet]: {
        maxWidth: '740px',
    },
    [desktop]: {
        maxWidth: '980px',
    },
    [leftCol]: {
        maxWidth: '1140px',
    },
    [wide]: {
        maxWidth: '1300px',
    },
});

export default Page;
