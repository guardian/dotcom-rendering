// @flow
import styled from 'preact-emotion';

import { clearFix } from 'pasteup/mixins';
import { tablet, desktop, leftCol, wide } from 'pasteup/breakpoints';

import Logo from './Logo';
import Links from './Links';
import Pillars from './Pillars';
import SubNavLink from './SubNavLink';

const Nav = styled('nav')(
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
Nav.displayName = 'Nav';

export default () => (
    <Nav>
        <Logo href="/" />
        <Links />
        <Pillars />
        <SubNavLink />
    </Nav>
);
