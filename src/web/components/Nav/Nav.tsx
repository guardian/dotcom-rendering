import React, { useState } from 'react';
import { css, cx } from 'emotion';

import { Pillars } from '@root/src/web/components/Pillars';
import { GuardianRoundel } from '@root/src/web/components/GuardianRoundel';
import { until } from '@guardian/src-foundations/mq';

import { clearFix } from '@root/src/lib/mixins';

import { ExpandedMenu } from './ExpandedMenu/ExpandedMenu';

const clearFixStyle = css`
    ${clearFix};
`;

const rowStyles = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const PositionRoundel = ({ children }: { children: React.ReactNode }) => (
    <div
        className={css`
            margin-top: 3px;
            z-index: 2;

            ${until.desktop} {
                margin-right: 51px;
            }

            margin-right: 24px;
        `}
    >
        {children}
    </div>
);

type Props = {
    pillar: Pillar;
    nav: NavType;
    display: Display;
};
export const Nav = ({ display, pillar, nav }: Props) => {
    const [showExpandedMenu, toggleExpandedMenu] = useState<boolean>(false);
    const mainMenuId = 'main-menu';

    return (
        <div className={rowStyles}>
            <nav
                className={cx(clearFixStyle, rowStyles)}
                role="navigation"
                aria-label="Guardian sections"
                data-component="nav2"
            >
                <Pillars
                    display={display}
                    mainMenuOpen={showExpandedMenu}
                    pillars={nav.pillars}
                    pillar={pillar}
                    dataLinkName="nav2"
                />
                <ExpandedMenu
                    display={display}
                    id={mainMenuId}
                    nav={nav}
                    showExpandedMenu={showExpandedMenu}
                    toggleExpandedMenu={toggleExpandedMenu}
                />
            </nav>
            {display === 'immersive' && (
                <PositionRoundel>
                    <GuardianRoundel />
                </PositionRoundel>
            )}
        </div>
    );
};
