// @flow
import styled from 'preact-emotion';

import { desktop } from 'pasteup/breakpoints';

import SubNavListItem from './SubNavListItem';

const SubNavList = styled('ul')({
    fontSize: 18,
    listStyle: 'none',
    margin: 0,
    padding: '0 0 12px',
    [desktop]: {
        width: 118,
        float: 'left',
    },
});
SubNavList.displayName = 'SubNavList';

export default props => (
    <SubNavList>
        <SubNavListItem {...props} />
    </SubNavList>
);
