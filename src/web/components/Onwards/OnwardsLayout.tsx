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
    switch (layout) {
        case 'fourAndFour':
            return <StoryPackage content={trails} />;
        default:
            return <></>;
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
