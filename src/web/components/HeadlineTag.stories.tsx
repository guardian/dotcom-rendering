import React from 'react';

// import { Section } from './Section';

import { HeadlineTag } from './HeadlineTag';
// import { Flex } from './Flex';
// import { ArticleLeft } from './ArticleLeft';
// import { ArticleContainer } from './ArticleContainer';

/* tslint:disable */
export default {
    component: HeadlineTag,
    title: 'Components/HeadlineTag',
};
/* tslint:enable */

export const defaultStory = () => {
    return <HeadlineTag tagText="Tag name" pillar="culture" />;
};
defaultStory.story = { name: 'default' };

export const longTagNameStory = () => {
    return <HeadlineTag tagText="Slightly longer tag name" pillar="news" />;
};
longTagNameStory.story = { name: 'With a longer tag name' };

export const wrappedTagNameStory = () => {
    return (
        <HeadlineTag
            tagText="Very long tag name with enough text to wrap to a second line"
            pillar="labs"
        />
    );
};
wrappedTagNameStory.story = { name: 'With wrapped tag name' };
