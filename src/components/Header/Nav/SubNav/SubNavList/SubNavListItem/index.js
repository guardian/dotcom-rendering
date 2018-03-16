// @flow
import styled from 'preact-emotion';

import { desktop } from 'pasteup/breakpoints';

import SubNavButton from './SubNavButton';
import SecondarySubNavList from './SecondarySubNavList';

const SubNavListItem = styled('li')({
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    [desktop]: {
        float: 'left',
        overflow: 'visible',
        width: 118,
        padding: '0 5px 12px',
    },
});

export default props => (
    <SubNavListItem>
        <SubNavButton {...props} />
        <SecondarySubNavList {...props} />
    </SubNavListItem>
);
