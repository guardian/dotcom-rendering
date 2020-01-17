import React from 'react';

import { Flex } from '@frontend/web/components/Flex';
import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { Hide } from '@frontend/web/components/Hide';

import { OnwardsTitle } from './OnwardsTitle';
import { OnwardsContainer } from './OnwardsContainer';
import { StoryPackage } from './StoryPackage';

type Props = {
    onwardSections: OnwardsType[];
};

const decideLayout = (layout: OnwardsLayoutType, trails: TrailType[]) => {
    // TODO: This switch is a stub pending https://trello.com/c/rBoduy1y/1065-dynamic-onward-layouts
    switch (layout) {
        case 'fourAndFour':
            return <StoryPackage content={trails} />;
        default:
            return <StoryPackage content={trails} />;
    }
};

export const OnwardsLayout = ({ onwardSections }: Props) => {
    return (
        <>
            {onwardSections.map((onward, index) => (
                <Flex key={`${onward.heading}-${index}`}>
                    <LeftColumn
                        showRightBorder={false}
                        showPartialRightBorder={true}
                    >
                        <OnwardsTitle title={onward.heading} />
                    </LeftColumn>
                    <OnwardsContainer>
                        <Hide when="above" breakpoint="leftCol">
                            <OnwardsTitle title={onward.heading} />
                        </Hide>
                        {decideLayout(onward.layout, onward.trails)}
                    </OnwardsContainer>
                </Flex>
            ))}
        </>
    );
};
