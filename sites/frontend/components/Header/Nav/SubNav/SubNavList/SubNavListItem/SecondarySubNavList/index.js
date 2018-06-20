// @flow
import { styled } from '@guardian/guui';

import { desktop } from '@guardian/pasteup/breakpoints';

import SecondarySubNavListItem from './SecondarySubNavListItem';

import type { PillarType } from '../../../../Pillars/Pillar';

const SecondarySubNavList = styled('ul')(({ showSecondaryNav }) => ({
    boxSizing: 'border-box',
    display: showSecondaryNav ? 'flex' : 'none',
    fontSize: 18,
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: 0,
    padding: '0 0 12px',
    position: 'relative',
    backgroundColor: '#d9e4e7',
    [desktop]: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        order: 1,
        paddingBottom: 0,
        backgroundColor: 'transparent',
        width: '100%',
    },
}));
SecondarySubNavList.displayName = 'SecondarySubNavList';

type Props = { pillar: PillarType, showSecondaryNav: boolean };

export default ({ pillar, showSecondaryNav, id }: Props) => (
    <SecondarySubNavList
        showSecondaryNav={showSecondaryNav}
        aria-expanded={showSecondaryNav}
        role="menu"
        id={id}
    >
        {pillar.links.map(link => (
            <SecondarySubNavListItem link={link} key={link.label} />
        ))}
    </SecondarySubNavList>
);
