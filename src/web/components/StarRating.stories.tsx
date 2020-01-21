import React from 'react';

import { StarRating } from './StarRating';

/* tslint:disable */
export default {
    component: StarRating,
    title: 'Components/StarRating',
};
/* tslint:enable */

export const SmallStory = () => {
    return <StarRating rating={3} size="small" />;
};
SmallStory.story = { name: 'Small stars' };

export const LargeStory = () => {
    return <StarRating rating={3} size="large" />;
};
LargeStory.story = { name: 'Large stars' };
