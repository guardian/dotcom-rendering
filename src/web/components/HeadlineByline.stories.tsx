import React from 'react';
import { css } from 'emotion';
import { HeadlineByline } from './HeadlineByline';

export default {
    component: HeadlineByline,
    title: 'Components/HeadlineByline',
};

export const interviewStory = () => {
    return (
        <HeadlineByline
            display={Display.Standard}
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
            display={Display.Standard}
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
            display={Display.Immersive}
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

export const ImmersiveComment = () => {
    return (
        <div
            className={css`
                background-color: lightgray;
                padding: 20px;
            `}
        >
            <HeadlineByline
                display={Display.Immersive}
                designType="Comment"
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
        </div>
    );
};
ImmersiveComment.story = { name: 'Immersive Comment' };

export const MultipleStory = () => {
    return (
        <HeadlineByline
            display={Display.Immersive}
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
