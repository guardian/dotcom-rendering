// @flow
import styled from 'preact-emotion';

import { headline } from 'pasteup/fonts';
import { pillars } from 'pasteup/palette';
import { desktop } from 'pasteup/breakpoints';

const SubNavList = styled('ul')({
    fontSize: 18,
    listStyle: 'none',
    margin: 0,
    padding: '0 0 12px',
});

const SubNavButton = styled('button')(({ pillar, isLastIndex }) => {
    const styles = {
        backgroundColor: 'transparent',
        border: 0,
        boxSizing: 'border-box',
        color: pillars[pillar],
        cursor: 'pointer',
        display: 'block',
        fontFamily: headline,
        fontSize: 24,
        fontWeight: '700',
        lineHeight: '20px',
        outline: 'none',
        padding: '6px 34px 18px 50px',
        position: 'relative',
        textAlign: 'left',
        width: '100%',
        '> *': {
            pointerEvents: 'none',
        },
        textTransform: 'capitalize',
        ':before': {
            marginTop: 4,
            color: '#5d5f5f',
            left: 25,
            position: 'absolute',
            border: '2px solid currentColor',
            borderTop: 0,
            borderLeft: 0,
            content: '""',
            display: 'inline-block',
            height: 10,
            transform: 'rotate(45deg)',
            width: 10,
        },
        [desktop]: {
            display: 'none',
        },
    };

    if (!isLastIndex) {
        styles[':after'] = {
            backgroundColor: '#abc2c9',
            bottom: 0,
            content: '""',
            display: 'block',
            height: 1,
            left: 50,
            position: 'absolute',
            width: '100%',
        };
    }

    return styles;
});

export default ({ pillar, isLastIndex }) => (
    <SubNavList>
        <SubNavButton pillar={pillar.pillar} isLastIndex={isLastIndex}>
            {pillar.label}
        </SubNavButton>
    </SubNavList>
);
