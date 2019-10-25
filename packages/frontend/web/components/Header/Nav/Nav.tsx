import React from 'react';
import { css } from 'emotion';
import { Pillars } from '../Pillars';
import { MainMenu } from '../MainMenu/MainMenu';

import { clearFix } from '@frontend/lib/mixins';

const clearFixStyle = css`
    ${clearFix};
`;

type Props = {
    pillar: Pillar;
    nav: NavType;
};
export const Nav = ({ pillar, nav }: Props) => {
    const mainMenuId = 'main-menu';
    const showMainMenu = false;

    return (
        <nav
            className={clearFixStyle}
            role="navigation"
            aria-label="Guardian sections"
            data-component="nav2"
        >
            <Pillars
                showMainMenu={showMainMenu}
                pillars={nav.pillars}
                pillar={pillar}
            />
            <MainMenu id={mainMenuId} nav={nav} />
        </nav>
    );
};
