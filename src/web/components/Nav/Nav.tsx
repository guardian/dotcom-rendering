import React, { useEffect } from 'react';
import { css, cx } from 'emotion';

import { visuallyHidden } from '@guardian/src-foundations/accessibility';
import { Pillars } from '@root/src/web/components/Pillars';
import { GuardianRoundel } from '@root/src/web/components/GuardianRoundel';
import { space } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';
import { ThemeProvider } from 'emotion-theming';
import { Button, buttonReaderRevenueBrand } from '@guardian/src-button';
import { SvgArrowRightStraight } from '@guardian/src-svgs';

import { Hide } from '@frontend/web/components/Hide';

import { clearFix } from '@root/src/lib/mixins';

import { ExpandedMenu } from './ExpandedMenu/ExpandedMenu';

type Props = {
    pillar: Pillar;
    nav: NavType;
    display: Display;
    subscribeUrl: string;
    edition: Edition;
};

const clearFixStyle = css`
    ${clearFix};
`;

const rowStyles = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const minHeight = css`
    min-height: 48px;
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

const PositionButton = ({ children }: { children: React.ReactNode }) => (
    <div
        className={css`
            margin-top: ${space[1]}px;
            margin-left: ${space[2]}px;
        `}
    >
        {children}
    </div>
);

// The checkbox ID is used as a CSS selector to enable NoJS support
const menuCheckboxId = 'main-menu-toggle';

const mainMenuId = 'main-menu';

export const Nav = ({ display, pillar, nav, subscribeUrl, edition }: Props) => {
    // Accessibility to hide Nav when pressing escape key
    useEffect(() => {
        const hideNavOnEscape = (e: KeyboardEvent) => {
            if (e.keyCode === 27) {
                const menuCheckbox =
                    document &&
                    (document.getElementById(
                        menuCheckboxId,
                    ) as HTMLInputElement);
                // Need to check if the menuCheckbox is checked before clicking
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                menuCheckbox &&
                    menuCheckbox.checked &&
                    menuCheckbox.click &&
                    menuCheckbox.click();
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        document && document.addEventListener('keydown', hideNavOnEscape);
        return () =>
            document &&
            document.removeEventListener('keydown', hideNavOnEscape);
    });

    return (
        <div className={rowStyles}>
            <nav
                className={cx(
                    clearFixStyle,
                    rowStyles,
                    display === 'immersive' && minHeight,
                )}
                role="navigation"
                aria-label="Guardian sections"
                data-component="nav2"
            >
                <Hide when="above" breakpoint="tablet">
                    <ThemeProvider theme={buttonReaderRevenueBrand}>
                        <PositionButton>
                            <Button
                                priority="primary"
                                size="small"
                                iconSide="right"
                                icon={<SvgArrowRightStraight />}
                                data-link-name="nav2 : support-cta"
                                data-edition={edition}
                                onClick={() => {
                                    window.location.href = subscribeUrl;
                                    return false;
                                }}
                            >
                                Subscribe
                            </Button>
                        </PositionButton>
                    </ThemeProvider>
                </Hide>
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
                    id={menuCheckboxId}
                    name="more"
                    tabIndex={-1}
                    key="OpenExpandedMenuCheckbox"
                    role="menuitemcheckbox"
                    aria-checked="false"
                />
                <Pillars
                    display={display}
                    menuCheckboxId={menuCheckboxId}
                    pillars={nav.pillars}
                    pillar={pillar}
                    dataLinkName="nav2"
                />
                <ExpandedMenu
                    display={display}
                    mainMenuId={mainMenuId}
                    nav={nav}
                    menuCheckboxId={menuCheckboxId}
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
