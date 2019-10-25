import React, { useState } from 'react';
import { css } from 'emotion';
import { Pillars } from '../../Pillars';
import { ExpandedMenu } from './ExpandedMenu/ExpandedMenu';

import { clearFix } from '@frontend/lib/mixins';

const clearFixStyle = css`
    ${clearFix};
`;

type Props = {
    pillar: Pillar;
    nav: NavType;
};
export const Nav = ({ pillar, nav }: Props) => {
    const [showExpandedMenu, toggleExpandedMenu] = useState<boolean>(false);
    const mainMenuId = 'main-menu';

    return (
        <nav
            className={clearFixStyle}
            role="navigation"
            aria-label="Guardian sections"
            data-component="nav2"
        >
            <Pillars
                mainMenuOpen={showExpandedMenu}
                pillars={nav.pillars}
                pillar={pillar}
            />
            <ExpandedMenu
                id={mainMenuId}
                nav={nav}
                showExpandedMenu={showExpandedMenu}
                toggleExpandedMenu={toggleExpandedMenu}
            />
        </nav>
    );
};
