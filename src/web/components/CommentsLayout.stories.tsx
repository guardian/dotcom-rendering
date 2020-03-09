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
            <CommentsLayout commentCount={345} isClosedForComments={false} />
            <RightColumn>
                <p>TODO: Comments ad slot goes here</p>
            </RightColumn>
        </Flex>
    </Section>
);
Default.story = { name: 'default' };
