// @flow
import { styled } from '@guardian/guui';

import { tablet, desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';

const Main = styled('main')({
    margin: 'auto',
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

export default Main;
