// @flow
import { css } from 'react-emotion';

import { tablet } from '@guardian/pasteup/breakpoints';

import Nav from './Nav';

const header = css`
    margin-bottom: 0;
    background-color: #e9eff1;
    position: relative;
    ${tablet} {
        display: block;
    }
`;

export default () => (
    <header className={header}>
        <Nav />
    </header>
);
