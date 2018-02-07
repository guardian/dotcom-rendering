// @flow

import { styled } from 'styletron-react';

const pillarColours = {
    news: 'green',
    alex: 'hotpink',
};

export default styled('button', ({ pillar = 'alex' }) => ({
    border: 'none',
    backgroundColor: pillar ? pillarColours[pillar] : null,
}));
