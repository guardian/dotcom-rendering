import styled from 'preact-emotion';
import { connect } from 'unistore/preact';

import {
    until,
    mobileMedium,
    mobileLandscape,
    tablet,
    desktop,
    leftCol,
    wide,
} from 'pasteup/breakpoints';

import SubNavList from './SubNavList';

const SubNavInner = styled('div')({
    boxSizing: 'border-box',
    maxWidth: 'none',
    [desktop]: {
        maxWidth: '980px',
        backgroundColor: '#e9eff1',
        marginTop: -20,
        padding: '0 20px',
        position: 'relative',
        margin: '0 auto',
    },
    [leftCol]: {
        maxWidth: '1140px',
    },
    [wide]: {
        maxWidth: '1300px',
    },
});

export default connect('header')(({ header }) => (
    <SubNavInner>
        {header.pillars.map((pillar, i) => (
            <SubNavList
                pillar={pillar}
                index={i}
                isLastIndex={i === header.pillars.length - 1}
                key={pillar.label}
            />
        ))}
    </SubNavInner>
));