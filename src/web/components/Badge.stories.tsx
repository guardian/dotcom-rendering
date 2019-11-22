import React from 'react';

import GE2019 from '@frontend/static/badges/general-election-2019.svg';
import { Badge } from './Badge';


/* tslint:disable */
export default {
    component: Badge,
    title: 'Components/Badge',
};
/* tslint:enable */

export const defaultStory = () => {
    return <Badge svgSrc={GE2019} />;
};
defaultStory.story = { name: 'default' };

export const withClickThruStory = () => {
    return (
        <Badge
            svgSrc={GE2019}
            linkTo="https://www.theguardian.com/politics/general-election-2019"
        />
    );
};
withClickThruStory.story = { name: 'With a click thru link' };
