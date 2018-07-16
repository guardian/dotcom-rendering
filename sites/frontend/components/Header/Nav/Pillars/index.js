// @flow
import { styled } from '@guardian/guui';

import { mobileLandscape } from '@guardian/pasteup/breakpoints';

import Pillar from './Pillar';
// import { pillarsConfig } from '../__config__';

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
    pillars: object, // TODO make specific
};

export default ({ showMainMenu, pillars }: Props) => (
    <Pillars>
        {pillars.map(pillar => (
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
