// @flow
import styled from 'react-emotion';

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

export default ({ state }) => (
    <Header>
        <Nav state={state} />
    </Header>
);
