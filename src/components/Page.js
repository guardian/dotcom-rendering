// @flow
import styled from 'preact-emotion';

import { tablet, desktop, leftCol, wide } from 'pasteup/breakpoints';
import { calculateWidth } from 'pasteup/grid';

const PageWrapper = styled('div')({
    margin: 'auto',
    [tablet]: {
        maxWidth: calculateWidth('tablet'),
    },
    [desktop]: {
        maxWidth: calculateWidth('desktop'),
    },
    [leftCol]: {
        maxWidth: calculateWidth('leftCol'),
    },
    [wide]: {
        maxWidth: calculateWidth('wide'),
    },
});

export default function Page({ children }) {
    return <PageWrapper>{children}</PageWrapper>;
}
