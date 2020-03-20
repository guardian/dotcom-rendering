import React from 'react';

import { Section } from '@frontend/web/components/Section';
import { RightColumn } from '@frontend/web/components/RightColumn';
import { Flex } from '@frontend/web/components/Flex';

import { mockRESTCalls } from '@root/src/web/lib/mockRESTCalls';

import { CommentsLayout } from './CommentsLayout';

/* tslint:disable */
export default {
    component: CommentsLayout,
    title: 'Components/CommentsLayout',
};
/* tslint:enable */

mockRESTCalls();

export const Default = () => (
    <Section>
        <Flex>
            <CommentsLayout
                baseUrl="https://discussion.theguardian.com/discussion-api"
                shortUrl="p/39f5z/"
                commentCount={345}
                isClosedForComments={false}
                discussionD2Uid="testD2Header"
                discussionApiClientHeader="testClientHeader"
            />
            <RightColumn>{/* TODO: Comments ad slot goes here */}</RightColumn>
        </Flex>
    </Section>
);
Default.story = { name: 'default' };
