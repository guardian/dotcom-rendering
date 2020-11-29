import React from 'react';

import { SectionTitle } from './SectionTitle';

export default {
    component: SectionTitle,
    title: 'Components/SectionTitle',
    parameters: {
        viewport: {
            // This has the effect of turning off the viewports addon by default
            defaultViewport: 'doesNotExist',
        },
    },
};

export const DefaultStory = () => {
    return <SectionTitle title="Title text" />;
};
DefaultStory.story = { name: 'with defaults' };

export const DescriptionStory = () => {
    return <SectionTitle title="Title text" description="About this content" />;
};
DescriptionStory.story = { name: 'with description' };

export const ColouredStory = () => {
    return (
        <SectionTitle
            title="Title text"
            description="About this content"
            fontColour="green"
        />
    );
};
ColouredStory.story = { name: 'with colour' };

export const LinkStory = () => {
    return (
        <SectionTitle
            title="Title text"
            description="About this content"
            url="https://www.theguardian.com"
        />
    );
};
LinkStory.story = { name: 'with a link' };
