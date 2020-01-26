import React from 'react';

import { HeadlineByline } from './HeadlineByline';

/* tslint:disable */
export default {
    component: HeadlineByline,
    title: 'Components/HeadlineByline',
};
/* tslint:enable */

export const interviewStory = () => {
    return (
        <HeadlineByline
            designType="Interview"
            pillar="culture"
            byline="Jane Smith"
            tags={[]}
        />
    );
};
interviewStory.story = { name: 'Interview' };

export const commentStory = () => {
    return (
        <HeadlineByline
            designType="Comment"
            pillar="sport"
            byline="Jane Smith"
            tags={[]}
        />
    );
};
commentStory.story = { name: 'Comment' };
