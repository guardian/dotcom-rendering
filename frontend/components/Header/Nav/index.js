// @flow

import { Component } from 'react';
import { css } from 'react-emotion';
import { clearFix } from '@guardian/pasteup/mixins';
import { tablet, desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';

import Logo from './Logo';
import EditionDropdown from './EditionDropdown';
import Links from './Links';
import Pillars from './Pillars';
import MainMenuToggle from './MainMenuToggle';
import { MainMenu } from './MainMenu';
import SubNav from './SubNav';

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

type Props = {
    nav: NavType,
};

export default class Nav extends Component<Props, { showMainMenu: boolean }> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showMainMenu: false,
        };
    }

    toggleMainMenu() {
        this.setState(state => ({
            showMainMenu: !state.showMainMenu,
        }));
    }

    render() {
        const { nav } = this.props;
        const toggleMainMenu = () => {
            this.toggleMainMenu();
        };
        const { showMainMenu } = this.state;
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
                    <EditionDropdown />
                    <Logo />
                    {/* 
                        TODO: The properties of the Links component
                        have been hardcoded to false. At some point 
                        these need to be dynamic.
                    */}
                    <Links
                        isPayingMember={false}
                        isRecentContributor={false}
                        isSignedIn={false}
                    />
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
    }
}
