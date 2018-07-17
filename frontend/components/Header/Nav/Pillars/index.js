// @flow
import { styled } from '@guardian/guui';

import { mobileLandscape } from '@guardian/pasteup/breakpoints';

import Pillar from './Pillar';
import { pillarsConfig } from '../__config__';

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
};

export default ({ showMainMenu }: Props) => (
    <Pillars>
        {pillarsConfig.map(pillar => (
            <Pillar
                showMainMenu={showMainMenu}
                pillar={pillar}
                key={pillar.label}
            >
                {pillar.label}
            </Pillar>
        ))}
    </Pillars>
);
