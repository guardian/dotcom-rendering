// @flow
import styled from 'preact-emotion';

import { tablet } from 'pasteup/breakpoints';

import Nav from './Nav';

const Header = styled('header')({
    marginBottom: 0,
    backgroundColor: '#e9eff1',
    position: 'relative',
    [tablet]: {
        display: 'block',
    },
});
Header.displayName = 'Header';

export default () => (
    <Header>
        <Nav />
    </Header>
);
