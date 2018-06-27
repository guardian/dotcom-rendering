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
Pillars.displayName = 'Pillars';

export default () => (
    <Pillars>
        {pillarsConfig.map(pillar => (
            <Pillar pillar={pillar} key={pillar.label}>
                {pillar.label}
            </Pillar>
        ))}
    </Pillars>
);
