import React from 'react';

import { Section } from '@frontend/web/components/Section';
import { RightColumn } from '@frontend/web/components/RightColumn';
import { Flex } from '@frontend/web/components/Flex';

import { mockRESTCalls } from '@root/src/web/lib/mockRESTCalls';

import { namedAdSlotParameters } from '@root/src/model/advertisement';
import { AdSlot } from '@root/src/web/components/AdSlot';

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
                pillar="news"
                shortUrl="p/39f5z/"
                commentCount={345}
                isClosedForComments={false}
                enableDiscussionSwitch={true}
                discussionD2Uid="testD2Header"
                discussionApiClientHeader="testClientHeader"
                expanded={false}
                onPermalinkClick={() => {}}
            />
            <RightColumn>
                <AdSlot asps={namedAdSlotParameters('comments')} />
            </RightColumn>
        </Flex>
    </Section>
);
Default.story = { name: 'default' };
