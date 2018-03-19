// @flow
import styled from 'preact-emotion';
import { connect } from 'unistore/preact';

import { desktop, leftCol, wide } from 'pasteup/breakpoints';

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

export default connect('header')(({ header }) => (
    <SubNavList>
        {header.pillars.map((pillar, i) => (
            <SubNavListItem
                pillar={pillar}
                // index={i}
                // isLastIndex={i === header.pillars.length - 1}
                key={pillar.label}
            />
        ))}
    </SubNavList>
));
