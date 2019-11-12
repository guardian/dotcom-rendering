import React from 'react';

import { Badge } from './Badge';

/* tslint:disable */
export default {
    component: Badge,
    title: 'Components/Badge',
};
/* tslint:enable */

export const defaultStory = () => {
    return (
        <Badge
            altText="General Election 2019"
            imgSrc="https://assets.guim.co.uk/images/badges/21574e2295169b4a72ba9d78733fc2ed/ge2019-badge.svg"
        />
    );
};
defaultStory.story = { name: 'default' };

export const withClickThruStory = () => {
    return (
        <Badge
            altText="General Election 2019"
            imgSrc="https://assets.guim.co.uk/images/badges/21574e2295169b4a72ba9d78733fc2ed/ge2019-badge.svg"
            linkTo="https://www.theguardian.com/politics/general-election-2019"
        />
    );
};
withClickThruStory.story = { name: 'With a click thru link' };
