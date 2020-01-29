import React from 'react';

import { StarRating } from './StarRating';

/* tslint:disable */
export default {
    component: StarRating,
    title: 'Components/StarRating',
};
/* tslint:enable */

export const AllSizes = () => (
    <>
        <h1>Small</h1>
        <br />
        <StarRating rating={3} size="small" />
        <br />
        <br />
        <h1>Medium</h1>
        <br />
        <StarRating rating={3} size="medium" />
        <br />
        <br />
        <h1>Large</h1>
        <br />
        <StarRating rating={3} size="large" />
    </>
);
AllSizes.story = { name: 'All stars sizes' };

export const SmallStory = () => (
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
SmallStory.story = { name: 'Small stars' };

export const MediumStory = () => (
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
MediumStory.story = { name: 'Medium stars' };

export const LargeStory = () => (
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
LargeStory.story = { name: 'Large stars' };
