import React, { Component } from 'react';
import { css } from 'emotion';
import { clearFix } from '@guardian/pasteup/mixins';
import { tablet, desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';

import { Logo } from './Logo';
import { EditionDropdown } from './EditionDropdown';
import { Links } from './Links/Links';
import { Pillars } from './Pillars';
import { MainMenuToggle } from './MainMenuToggle/MainMenuToggle';
import { MainMenu } from './MainMenu/MainMenu';
import { SubNav } from './SubNav/SubNav';
import { ReaderRevenueLinks } from './ReaderRevenueLinks';
import { getCookie } from '@frontend/web/browser/cookie';

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

interface Props {
    nav: NavType;
    pillar: Pillar;
    edition: Edition;
}

export class Nav extends Component<
    Props,
    { showMainMenu: boolean; isSignedIn: boolean }
> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showMainMenu: false,
            isSignedIn: false,
        };
    }

    public componentDidMount() {
        this.setState({
            isSignedIn: !!getCookie('GU_U'),
        });
    }

    public toggleMainMenu() {
        this.setState(state => ({
            showMainMenu: !state.showMainMenu,
        }));
    }

    public render() {
        const { nav, pillar, edition } = this.props;
        const toggleMainMenu = () => {
            this.toggleMainMenu();
        };
        const { showMainMenu, isSignedIn } = this.state;
        const mainMenuId = 'main-menu';

        // TODO push subnav into nav for now as really part of it
        // also separate PR to do centering stuff!
        return (
            <div>
                <nav
                    className={centered}
                    role="navigation"
                    aria-label="Guardian sections"
                >
                    <EditionDropdown edition={edition} />
                    <Logo />
                    {/*
                        TODO: The properties of the Links component
                        have been hardcoded to false. At some point
                        these need to be dynamic.
                    */}

                    <ReaderRevenueLinks
                        urls={nav.readerRevenueLinks.header}
                        edition={edition}
                    />
                    <Links isSignedIn={isSignedIn} />
                    <Pillars
                        showMainMenu={showMainMenu}
                        pillars={nav.pillars}
                        pillar={pillar}
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
                <SubNav
                    subnav={nav.subNavSections}
                    currentNavLink={nav.currentNavLink}
                    pillar={pillar}
                />
            </div>
        );
    }
}
