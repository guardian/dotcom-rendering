// @flow
import { styled } from 'styletron-react';

import Highlight from './highlight';

const BlueHighlight = styled(Highlight, {
    color: 'blue',
});

export default () => (
    <p>
        Hello <BlueHighlight>world</BlueHighlight>
    </p>
);
