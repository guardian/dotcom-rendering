// @flow
import { styled } from '@guardian/guui';

import { headline } from '@guardian/pasteup/fonts';
import { pillars } from '@guardian/pasteup/palette';
import { desktop } from '@guardian/pasteup/breakpoints';

import pillarConfig from '../../../Pillars/__config__';

import type { PillarType } from '../../../Pillars/Pillar';

const SubNavButton = styled('button')(
    ({ pillar, isLastIndex, showSecondaryNav }) => ({
        backgroundColor: 'transparent',
        border: 0,
        boxSizing: 'border-box',
        color: pillars[pillar],
        cursor: 'pointer',
        display: 'block',
        fontFamily: headline,
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 1,
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
            marginTop: showSecondaryNav ? 8 : 4,
            color: '#5d5f5f',
            left: 25,
            position: 'absolute',
            border: '2px solid currentColor',
            borderTop: 0,
            borderLeft: 0,
            content: '""',
            display: 'inline-block',
            height: 10,
            transform: showSecondaryNav ? 'rotate(-135deg)' : 'rotate(45deg)',
            width: 10,
        },
        [desktop]: {
            display: 'none',
        },
        ':after': {
            backgroundColor: '#abc2c9',
            bottom: 0,
            content: '""',
            display: !showSecondaryNav && !isLastIndex ? 'block' : 'none',
            height: 1,
            left: 50,
            position: 'absolute',
            width: '100%',
        },
    }),
);
SubNavButton.displayName = 'SubNavButton';

type Props = {
    pillar: PillarType,
    showSecondaryNav: boolean,
    toggleSecondaryNav: () => void,
};

export default ({ pillar, showSecondaryNav, toggleSecondaryNav }: Props) => {
    const isLastIndex = pillar === pillarConfig[pillarConfig.length - 1];

    return (
        <SubNavButton
            pillar={pillar.pillar}
            isLastIndex={isLastIndex}
            showSecondaryNav={showSecondaryNav}
            onClick={() => {
                toggleSecondaryNav();
            }}
        >
            {pillar.label}
        </SubNavButton>
    );
};
