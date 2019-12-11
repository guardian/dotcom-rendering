import React from 'react';

import { Flex } from '@frontend/web/components/Flex';
import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { Hide } from '@frontend/web/components/Hide';

import { OnwardsTitle } from './OnwardsTitle';
import { OnwardsContainer } from './OnwardsContainer';

type Props = {
    content: OnwardsType;
    component: React.ElementType;
};

export const OnwardsLayout = ({ content, component: Content }: Props) => (
    <Flex>
        <LeftColumn showRightBorder={false} showPartialRightBorder={true}>
            <OnwardsTitle title={content.heading} />
        </LeftColumn>
        <OnwardsContainer>
            <Hide when="above" breakpoint="leftCol">
                <OnwardsTitle title={content.heading} />
            </Hide>
            <Content content={content.trails} />
        </OnwardsContainer>
    </Flex>
);
