import React from 'react';

import { HeadlineByline } from './HeadlineByline';

export default {
    component: HeadlineByline,
    title: 'Components/HeadlineByline',
};

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

export const immersiveStory = () => {
    return (
        <HeadlineByline
            designType="Immersive"
            pillar="lifestyle"
            byline="Jane Smith"
            tags={[
                {
                    id: '1',
                    type: 'Contributor',
                    title: 'Jane Smith',
                },
            ]}
        />
    );
};
immersiveStory.story = { name: 'Immersive' };

export const MultipleStory = () => {
    return (
        <HeadlineByline
            designType="Immersive"
            pillar="lifestyle"
            byline="Jane Smith, John Doe and Nae Bevan"
            tags={[
                {
                    id: '1',
                    type: 'Contributor',
                    title: 'Jane Smith',
                },
                {
                    id: '2',
                    type: 'Contributor',
                    title: 'John Doe',
                },
                {
                    id: '3',
                    type: 'Contributor',
                    title: 'Nae Bevan',
                },
            ]}
        />
    );
};
MultipleStory.story = { name: 'Immersive with multiple contributors' };
