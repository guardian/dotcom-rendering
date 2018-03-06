// @flow

import styled from 'react-emotion';
import { Component } from 'react';

import { clearFix } from 'pasteup/mixins';
import { tablet, desktop, leftCol, wide } from 'pasteup/breakpoints';

import Logo from './Logo';
import Links from './Links';
import Pillars from './Pillars';
import SubNavLink from './SubNavLink';

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

export default class Nav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSubNav: false
        };
    }

    toggleSubNav() {
        this.setState({ 
            showSubNav: this.state.showSubNav ? false : true
        });
    }

    render() {
        return (
            <NavStyled>
                <Logo href="/" />
                <Links />
                <Pillars />
                <SubNavLink toggleSubNav={() => {
                    this.toggleSubNav()
                }} />
            </NavStyled>
        );
    }
};

