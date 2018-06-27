// @flow

import { styled, Component } from '@guardian/guui';

import { clearFix } from '@guardian/pasteup/mixins';
import { tablet, desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';

import Logo from './Logo';
import Links from './Links';
import Pillars from './Pillars';
import MainMenuToggle from './MainMenuToggle';
import MainMenu from './MainMenu';

const NavStyled = styled('nav')(
    {
        [tablet]: {
            maxWidth: '740px',
        },
        [desktop]: {
            maxWidth: '980px',
        },
        [leftCol]: {
            maxWidth: '1140px',
        },
        [wide]: {
            maxWidth: '1300px',
        },
        position: 'relative',
        margin: '0 auto',
    },
    clearFix,
);

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

        return (
            <NavStyled role="navigation" aria-label="Guardian sections">
                <Logo />
                <Links />
                <Pillars />
                <MainMenuToggle
                    showMainMenu={showMainMenu}
                    toggleMainMenu={toggleMainMenu}
                    ariaControls={mainMenuId}
                />
                <MainMenu showMainMenu={showMainMenu} id={mainMenuId} />
            </NavStyled>
        );
    }
}
