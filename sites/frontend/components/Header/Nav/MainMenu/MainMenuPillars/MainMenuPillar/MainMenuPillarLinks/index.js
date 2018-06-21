// @flow
import { styled } from '@guardian/guui';

import { desktop } from '@guardian/pasteup/breakpoints';

import MainMenuPillarLink from './MainMenuPillarLink';

import type { PillarType } from '../../../../Pillars/Pillar';

const MainMenuPillarLinks = styled('ul')(({ showPillarLinks }) => ({
    boxSizing: 'border-box',
    display: showPillarLinks ? 'flex' : 'none',
    fontSize: 18,
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: 0,
    padding: '0 0 12px',
    position: 'relative',
    backgroundColor: '#d9e4e7',
    [desktop]: {
        marginTop: -20,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        order: 1,
        paddingBottom: 0,
        backgroundColor: 'transparent',
        width: '100%',
        padding: '0 5px',
    },
}));
MainMenuPillarLinks.displayName = 'MainMenuPillarLinks';

type Props = { pillar: PillarType, showPillarLinks: boolean, id: string };

export default ({ pillar, showPillarLinks, id }: Props) => (
    <MainMenuPillarLinks
        showPillarLinks={showPillarLinks}
        aria-expanded={showPillarLinks}
        role="menu"
        id={id}
    >
        {pillar.links.map(link => (
            <MainMenuPillarLink link={link} key={link.label} />
        ))}
    </MainMenuPillarLinks>
);
