import React from 'react';

import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { SignedInAs } from '@frontend/web/components/SignedInAs';
import { Hide } from '@frontend/web/components/Hide';
import { Flex } from '@frontend/web/components/Flex';

type Props = {
    commentCount: number;
};

export const CommentsLayout = ({ commentCount }: Props) => (
    <Flex direction="row">
        <LeftColumn showRightBorder={false}>
            <SignedInAs commentCount={commentCount} />
        </LeftColumn>
        <Flex direction="column">
            <Hide when="above" breakpoint="leftCol">
                <SignedInAs commentCount={commentCount} />
            </Hide>
            <p>Comments go here</p>
        </Flex>
    </Flex>
);
