// @flow

import { styled, Component } from '@guardian/guui';

import { clearFix } from '@guardian/pasteup/mixins';
import { tablet, desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';

import Logo from './Logo';
import Links from './Links';
import Pillars from './Pillars';
import SubNavLink from './SubNavLink';
import SubNav from './SubNav';
import VeggieBurger from './VeggieBurger';

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

NavStyled.displayName = 'Nav';

export default class Nav extends Component<{}, { showSubNav: boolean }> {
    constructor(props: {}) {
        super(props);

        this.state = {
            showSubNav: false,
        };
    }

    toggleSubNav() {
        this.setState({
            showSubNav: !this.state.showSubNav,
        });
    }

    render() {
        const toggleSubNav = () => {
            this.toggleSubNav();
        };

        return (
            <NavStyled role='navigation' aria-label='Guardian sections'>
                <Logo href="/" />
                {/* <Links /> */}
                <Pillars />
                {/* <VeggieBurger
                    showSubNav={this.state.showSubNav}
                    toggleSubNav={toggleSubNav}
                /> */}
                <SubNavLink toggleSubNav={toggleSubNav} ariaControls='main-menu'/>
                <SubNav showSubNav={this.state.showSubNav} id='main-menu'/>
            </NavStyled>
        );
    }
}
