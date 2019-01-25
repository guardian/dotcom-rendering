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

export const Header: React.SFC<{
    nav: NavType;
    pillar: Pillar;
    edition: Edition;
}> = ({ nav, pillar, edition }) => (
    <header className={header}>
        <Nav nav={nav} pillar={pillar} edition={edition} />
    </header>
);
