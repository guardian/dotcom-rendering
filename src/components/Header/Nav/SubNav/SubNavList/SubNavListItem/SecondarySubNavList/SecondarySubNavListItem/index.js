// @flow
import styled from 'preact-emotion';

import SubNavTitle from './SubNavTitle';

const SecondarySubNavListItem = styled('li')({
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
});

export default props => (
    <SecondarySubNavListItem>
        <SubNavTitle {...props} />
    </SecondarySubNavListItem>
);
