import React from 'react';
import { css } from 'emotion';

import { Nav } from './Nav/Nav';

const headerWrapper = css`
    position: static;
`;

export const Header: React.FC<{
    nav: NavType;
    pillar: Pillar;
    edition: Edition;
}> = ({ nav, pillar, edition }) => (
    <div className={headerWrapper}>
        <header>
            <Nav nav={nav} pillar={pillar} edition={edition} />
        </header>
    </div>
);
