// @flow

import { styled } from 'styletron-react';

const pillarColours = {
    news: 'red',
};

export default styled('button', ({ pillar }) => ({
    border: 'none',
    backgroundColor: pillar ? pillarColours[pillar] : null,
}));
