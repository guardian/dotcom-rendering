// @flow
import { styled } from '@guardian/guui';

import { mobileLandscape } from '@guardian/pasteup/breakpoints';

import Pillar from './Pillar';
import pillars from './__config__';

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
        {pillars.map((pillar, i) => (
            <Pillar pillar={pillar} index={i} key={pillar.label}>
                {pillar.label}
            </Pillar>
        ))}
    </Pillars>
);
