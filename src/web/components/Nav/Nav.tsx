import React from 'react';
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

import { navInputCheckboxId, showMoreButtonId, veggieBurgerId } from './config';
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

export const Nav = ({ display, pillar, nav, subscribeUrl, edition }: Props) => {
    return (
        <div className={rowStyles}>
            {/*
                IMPORTANT NOTE: Supporting NoJS and accessibility is hard.

                We therefore use JS to make the Nav elements more accessibile. We add a
                keydown `addEventListener` to both the veggie burger button and the show
                more menu buttons. We also listen to escape key presses to close the Nav menu.
                This is not a perfect solution as not all screen readers support JS
                https://webaim.org/projects/screenreadersurvey8/#javascript
            */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `document.addEventListener('DOMContentLoaded', function(){
                        // Used to toggle data-link-name on label buttons
                        var hasMenuButtonBeenClicked = false
                        var navInputCheckbox = document.getElementById('${navInputCheckboxId}')
                        var showMoreButton = document.getElementById('${showMoreButtonId}')
                        var veggieBurger = document.getElementById('${veggieBurgerId}')
                        var expandedMenuClickableTags = document.querySelectorAll('.selectableMenuItem')

                        navInputCheckbox.addEventListener('click',function(){
                            if(hasMenuButtonBeenClicked) {
                                showMoreButton.setAttribute('data-link-name','nav2 : veggie-burger: show')
                                veggieBurger.setAttribute('data-link-name','nav2 : veggie-burger: show')
                                expandedMenuClickableTags.forEach(function($aTag){
                                    $aTag.setAttribute('tabindex','-1')
                                })
                                hasMenuButtonBeenClicked = false
                            } else {
                                showMoreButton.setAttribute('data-link-name','nav2 : veggie-burger: hide')
                                veggieBurger.setAttribute('data-link-name','nav2 : veggie-burger: hide')
                                console.log(expandedMenuClickableTags)
                                expandedMenuClickableTags.forEach(function($aTag){
                                    $aTag.setAttribute('tabindex','0')
                                })
                                hasMenuButtonBeenClicked = true
                            }
                        })
                        // Close hide menu on press enter
                        var toggleMainMenu = function(e){
                            // keyCode: 13 => Enter key | keyCode: 32 => Space key
                            if (e.keyCode === 13 || e.keyCode === 32) {
                                e.preventDefault()
                                navInputCheckbox.click();
                            }
                        }
                        showMoreButton.addEventListener('keydown', toggleMainMenu)
                        veggieBurger.addEventListener('keydown', toggleMainMenu)
                        // Accessibility to hide Nav when pressing escape key
                        var hideNavOnEscape = function(e){
                            if (e.keyCode === 27) {
                                if(navInputCheckbox.checked) {
                                    navInputCheckbox.click()
                                }
                            }
                        }
                        document.addEventListener('keydown', hideNavOnEscape)
                    })`,
                }}
            />
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
                {display === 'immersive' && (
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
                )}
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
                    id={navInputCheckboxId}
                    name="more"
                    tabIndex={-1}
                    key="OpenExpandedMenuCheckbox"
                    role="menuitemcheckbox"
                    aria-checked="false"
                />
                <Pillars
                    display={display}
                    pillars={nav.pillars}
                    pillar={pillar}
                    dataLinkName="nav2"
                    isTopNav={true}
                />
                <ExpandedMenu nav={nav} display={display} />
            </nav>
            {display === 'immersive' && (
                <PositionRoundel>
                    <GuardianRoundel />
                </PositionRoundel>
            )}
        </div>
    );
};
