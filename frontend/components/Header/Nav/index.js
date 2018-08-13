// @flow

import { Component } from 'react';
import { css } from 'react-emotion';
import { connect } from 'unistore/react';
import { clearFix } from '@guardian/pasteup/mixins';
import { tablet, desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';

import Logo from './Logo';
import EditionDropdown from './EditionDropdown';
import Links from './Links';
import Pillars from './Pillars';
import MainMenuToggle from './MainMenuToggle';
import MainMenu from './MainMenu';
import SubNav from './SubNav';

import type { NavType } from './__config__';

const centered = css`
    ${tablet} {
        max-width: 740px;
    }
    ${desktop} {
        max-width: 980px;
    }
    ${leftCol} {
        max-width: 1140px;
    }
    ${wide} {
        max-width: 1300px;
    }
    position: relative;
    margin: 0 auto;
    ${clearFix};
`;

const subnav = css`
    background-color: white;
    border-top: 0.0625rem solid #bbcdd3;
`;

export default class Nav extends Component<{}, { showMainMenu: boolean }> {
    constructor(props: {}) {
        super(props);

        this.state = {
            showMainMenu: false,
        };
    }

    toggleMainMenu() {
        this.setState({
            showMainMenu: !this.state.showMainMenu,
        });
    }

    render() {
        const toggleMainMenu = () => {
            this.toggleMainMenu();
        };
        const { showMainMenu } = this.state;
        const mainMenuId = 'main-menu';

        const NavComponent = connect('NAV')(({ NAV = {} }) => {
            const nav = ((NAV: any): NavType); // have to cast here for now

            // TODO push subnav into nav for now as really part of it
            // also separate PR to do centering stuff!
            return (
                <div>
                    <nav
                        className={centered}
                        role="navigation"
                        aria-label="Guardian sections"
                    >
                        <EditionDropdown />
                        <Logo />
                        <Links />
                        <Pillars
                            showMainMenu={showMainMenu}
                            pillars={nav.pillars || []}
                        />
                        <MainMenuToggle
                            showMainMenu={showMainMenu}
                            toggleMainMenu={toggleMainMenu}
                            ariaControls={mainMenuId}
                        />
                        <MainMenu
                            showMainMenu={showMainMenu}
                            id={mainMenuId}
                            nav={nav}
                        />
                    </nav>
                    {nav.subNavSections &&
                        nav.subNavSections.parent &&
                        nav.subNavSections.links && (
                            <div className={subnav}>
                                <div className={centered}>
                                    <SubNav
                                        parent={nav.subNavSections.parent}
                                        links={nav.subNavSections.links}
                                    />
                                </div>
                            </div>
                        )}
                </div>
            );
        });

        return <NavComponent />;
    }
}
