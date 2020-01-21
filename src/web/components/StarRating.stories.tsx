import React from 'react';

import { StarRating } from './StarRating';

/* tslint:disable */
export default {
    component: StarRating,
    title: 'Components/StarRating',
};
/* tslint:enable */

export const SmallStory = () => {
    return (
        <>
            <StarRating rating={1} size="small" />
            <br />
            <StarRating rating={2} size="small" />
            <br />
            <StarRating rating={3} size="small" />
            <br />
            <StarRating rating={4} size="small" />
            <br />
            <StarRating rating={5} size="small" />
        </>
    );
};
SmallStory.story = { name: 'Small stars' };

export const MediumStory = () => {
    return (
        <>
            <StarRating rating={1} size="medium" />
            <br />
            <StarRating rating={2} size="medium" />
            <br />
            <StarRating rating={3} size="medium" />
            <br />
            <StarRating rating={4} size="medium" />
            <br />
            <StarRating rating={5} size="medium" />
        </>
    );
};
MediumStory.story = { name: 'Medium stars' };

export const LargeStory = () => {
    return (
        <>
            <StarRating rating={1} size="large" />
            <br />
            <StarRating rating={2} size="large" />
            <br />
            <StarRating rating={3} size="large" />
            <br />
            <StarRating rating={4} size="large" />
            <br />
            <StarRating rating={5} size="large" />
        </>
    );
};
LargeStory.story = { name: 'Large stars' };
