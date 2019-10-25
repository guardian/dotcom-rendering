import React from 'react';
import { css } from 'emotion';
import { tablet } from '@guardian/src-foundations';

import { Nav } from './Nav/Nav';

const headerWrapper = css`
    position: static;
`;

const header = css`
    margin-bottom: 0;
    position: relative;
    ${tablet} {
        display: block;
    }
`;

export const Header: React.FC<{
    nav: NavType;
    pillar: Pillar;
    edition: Edition;
}> = ({ nav, pillar, edition }) => (
    <div className={headerWrapper}>
        <header className={header}>
            <Nav nav={nav} pillar={pillar} edition={edition} />
        </header>
    </div>
);
