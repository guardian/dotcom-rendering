// @flow
import { styled } from '@guardian/guui';
import { connect } from 'unistore/preact';

import { desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';

import SubNavListItem from './SubNavListItem';

const SubNavList = styled('ul')({
    boxSizing: 'border-box',
    maxWidth: 'none',
    [desktop]: {
        maxWidth: 980,
        backgroundColor: '#e9eff1',
        marginTop: -20,
        padding: '0 20px',
        position: 'relative',
        margin: '0 auto',
    },
    [leftCol]: {
        maxWidth: 1140,
    },
    [wide]: {
        maxWidth: 1300,
    },
});
SubNavList.displayName = 'SubNavList';

export default connect('header')(({ header = { pillars: [] } }) => (
    <SubNavList>
        {header.pillars.map(pillar => (
            <SubNavListItem pillar={pillar} key={pillar.label} />
        ))}
    </SubNavList>
));
