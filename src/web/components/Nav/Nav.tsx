import React from 'react';
import { css, cx } from 'emotion';

import { visuallyHidden } from '@guardian/src-foundations/accessibility';
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

// The checkbox ID is used as a CSS selector to enable NoJS support
const CHECKBOX_ID = 'main-menu-toggle';

const mainMenuId = 'main-menu';

export const Nav = ({ display, pillar, nav }: Props) => (
    <div className={rowStyles}>
        <nav
            className={cx(clearFixStyle, rowStyles)}
            role="navigation"
            aria-label="Guardian sections"
            data-component="nav2"
        >
            {/*
                IMPORTANT NOTE:
                It is important to have the input as the 1st sibling for NoJS to work
                as we use ~ to apply certain styles on checkbox checked and ~ can only
                apply to styles with elements that are preceded
            */}
            <input
                type="checkbox"
                className={css`
                    ${visuallyHidden};
                `}
                id={CHECKBOX_ID}
                // aria-controls={ariaControls}
                tabIndex={-1}
                key="OpenExpandedMenuCheckbox"
                role="menuitemcheckbox"
                aria-checked="false"
            />
            <Pillars
                display={display}
                CHECKBOX_ID={CHECKBOX_ID}
                pillars={nav.pillars}
                pillar={pillar}
                dataLinkName="nav2"
            />
            <ExpandedMenu
                display={display}
                id={mainMenuId}
                nav={nav}
                CHECKBOX_ID={CHECKBOX_ID}
            />
        </nav>
        {display === 'immersive' && (
            <PositionRoundel>
                <GuardianRoundel />
            </PositionRoundel>
        )}
    </div>
);
