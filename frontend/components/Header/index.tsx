import React from 'react';
import { css } from 'react-emotion';

import { tablet } from '@guardian/pasteup/breakpoints';

import Nav from './Nav';
import { palette } from '@guardian/pasteup/palette';

const header = css`
    margin-bottom: 0;
    background-color: ${palette.neutral[97]};
    position: relative;
    ${tablet} {
        display: block;
    }
`;

const Header: React.SFC<{
    nav: NavType;
    pillar: Pillar;
}> = ({ nav, pillar }) => (
    <header className={header}>
        <Nav nav={nav} pillar={pillar} />
    </header>
);

export default Header;
