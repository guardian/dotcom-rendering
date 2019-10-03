import React from 'react';
import { css } from 'emotion';

import { tablet } from '@guardian/pasteup/breakpoints';

import { Nav } from './Nav/Nav';
import { palette } from '@guardian/pasteup/palette';

const header = css`
    margin-bottom: 0;
    background-color: ${palette.brand.main};
    position: relative;
    ${tablet} {
        display: block;
    }
`;

export const Header: React.FC<{
    nav: NavType;
    pillar: Pillar;
}> = ({ nav, pillar }) => (
    <header className={header}>
        <Nav nav={nav} pillar={pillar} />
    </header>
);
