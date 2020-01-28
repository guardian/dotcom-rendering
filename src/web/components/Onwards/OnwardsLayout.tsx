import React from 'react';

import { Flex } from '@frontend/web/components/Flex';
import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { Hide } from '@frontend/web/components/Hide';

import { useComments } from '@frontend/web/components/lib/useComments';

import { OnwardsTitle } from './OnwardsTitle';
import { OnwardsContainer } from './OnwardsContainer';
import { MoreThanFive } from './MoreThanFive';
import { ExactlyFive } from './ExactlyFive';
import { FourOrLess } from './FourOrLess';
import { Spotlight } from './Spotlight';

type Props = {
    onwardSections: OnwardsType[];
};

const decideLayout = (trails: TrailType[]) => {
    switch (trails.length) {
        case 1:
            return <Spotlight content={trails} />;
        case 2:
        case 3:
        case 4:
            return <FourOrLess content={trails} />;
        case 5:
            return <ExactlyFive content={trails} />;
        case 6:
        case 7:
        case 8:
        default:
            return <MoreThanFive content={trails} />;
    }
};

export const OnwardsLayout = ({ onwardSections }: Props) => {
    const withComments = useComments(onwardSections);

    return (
        <>
            {withComments.map((onward, index) => (
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
                        {decideLayout(onward.trails.slice(0, 8))}
                    </OnwardsContainer>
                </Flex>
            ))}
        </>
    );
};
