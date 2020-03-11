import React from 'react';

import { Section } from '@frontend/web/components/Section';
import { RightColumn } from '@frontend/web/components/RightColumn';
import { Flex } from '@frontend/web/components/Flex';

import { CommentsLayout } from './CommentsLayout';

/* tslint:disable */
export default {
    component: CommentsLayout,
    title: 'Components/CommentsLayout',
};
/* tslint:enable */

export const Default = () => (
    <Section>
        <Flex>
            <CommentsLayout
                shortUrl="/p/39f5z/"
                commentCount={345}
                isClosedForComments={false}
            />
            <RightColumn>{/* TODO: Comments ad slot goes here */}</RightColumn>
        </Flex>
    </Section>
);
Default.story = { name: 'default' };
