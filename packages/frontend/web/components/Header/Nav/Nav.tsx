import React, { Component } from 'react';
import { css } from 'emotion';
import { clearFix } from '@frontend/lib/mixins';

import { Logo } from './Logo';
import { EditionDropdown } from './EditionDropdown';
import { Links } from './Links/Links';
import { Pillars } from './Pillars';
import { MainMenuToggle } from './MainMenuToggle/MainMenuToggle';
import { MainMenu } from './MainMenu/MainMenu';
import { ReaderRevenueLinks } from './ReaderRevenueLinks';
import { getCookie } from '@frontend/web/browser/cookie';
import { Hide } from '@frontend/web/components/Hide';

const clearFixStyle = css`
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

        return (
            <div>
                <nav
                    className={clearFixStyle}
                    role="navigation"
                    aria-label="Guardian sections"
                    data-component="nav2"
                >
                    <Hide when="below" breakpoint="desktop">
                        <EditionDropdown
                            edition={edition}
                            dataLinkName={
                                'nav2 : topbar : edition-picker: toggle'
                            }
                        />
                    </Hide>
                    <Logo />
                    {/*
                        TODO: The properties of the Links component
                        have been hardcoded to false. At some point
                        these need to be dynamic.
                    */}

                    <ReaderRevenueLinks
                        urls={nav.readerRevenueLinks.header}
                        edition={edition}
                        dataLinkNamePrefix={'nav2 : '}
                        noResponsive={false}
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
            </div>
        );
    }
}
