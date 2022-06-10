import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EpicDecorator } from './ContributionsEpic.stories';
import {
    ContributionsEpicArticleCountAboveWithOptOut,
    ContributionsEpicArticleCountAboveWithOptOutProps,
} from './ContributionsEpicArticleCountAboveWithOptOut';

export default {
    component: ContributionsEpicArticleCountAboveWithOptOut,
    title: 'Epics/ContributionsEpicArticleCountAboveWithOptOut',
    args: {
        articleCounts: {
            forTargetedWeeks: 5,
            for52Weeks: 10,
        },
        isArticleCountOn: true,
    },
    decorators: [EpicDecorator],
} as Meta;

const Template: Story<ContributionsEpicArticleCountAboveWithOptOutProps> = (
    props: ContributionsEpicArticleCountAboveWithOptOutProps,
) => <ContributionsEpicArticleCountAboveWithOptOut {...props} />;

export const ArticleCountOn = Template.bind({});

export const ArticleCountOff = Template.bind({});
ArticleCountOff.args = {
    isArticleCountOn: false,
};

// Nothing displays
export const ArticleCountOnBelow5 = Template.bind({});
ArticleCountOnBelow5.args = {
    articleCounts: {
        forTargetedWeeks: 3,
        for52Weeks: 3,
    },
};
