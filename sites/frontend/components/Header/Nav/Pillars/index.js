// @flow
import { styled } from '@guardian/guui';

import { mobileLandscape } from '@guardian/pasteup/breakpoints';

import Pillar from './Pillar';

import type { LinkType } from '../__config__';

const Pillars = styled('ul')({
    clear: 'right',
    margin: 0,
    listStyle: 'none',
    listStyleImage: 'none',
    [mobileLandscape]: {
        paddingLeft: 20,
    },
});

type Props = {
    showMainMenu: boolean,
    pillars: Array<LinkType>,
};

export default ({ showMainMenu, pillars }: Props) => (
    <Pillars>
        {pillars.filter(pillar => pillar.title !== 'More').map(pillar => (
            <Pillar
                showMainMenu={showMainMenu}
                pillar={pillar}
                key={pillar.title}
            >
                {pillar.title}
            </Pillar>
        ))}
    </Pillars>
);
