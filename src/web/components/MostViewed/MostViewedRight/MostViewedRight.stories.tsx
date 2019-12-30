import React from 'react';
import fetchMock from 'fetch-mock';

import { Flex } from '@root/src/web/components/Flex';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { LeftColumn } from '@root/src/web/components/LeftColumn';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { Section } from '@frontend/web/components/Section';

import { MostViewedRight } from './MostViewedRight';
import { response } from './MostViewedRight.mocks';

/* tslint:disable */
export default {
    component: MostViewedRight,
    title: 'Components/MostViewedRight',
};
/* tslint:enable */

export const defaultStory = () => {
    fetchMock.restore().getOnce('*', {
        status: 200,
        body: response.data,
    });

    return (
        <Section>
            <Flex>
                <LeftColumn
                    showPartialRightBorder={true}
                    showRightBorder={false}
                >
                    <></>
                </LeftColumn>
                <ArticleContainer>
                    <></>
                </ArticleContainer>
                <RightColumn>
                    <Section
                        showSideBorders={false}
                        showTopBorder={false}
                        padded={false}
                    >
                        <MostViewedRight pillar="news" />
                    </Section>
                </RightColumn>
            </Flex>
        </Section>
    );
};
defaultStory.story = { name: 'default' };

export const limitItemsStory = () => {
    fetchMock.restore().getOnce('*', {
        status: 200,
        body: response.data,
    });

    return (
        <Section>
            <Flex>
                <LeftColumn>
                    <></>
                </LeftColumn>
                <ArticleContainer>
                    <></>
                </ArticleContainer>
                <RightColumn>
                    <Section
                        showSideBorders={false}
                        showTopBorder={false}
                        padded={false}
                    >
                        <MostViewedRight pillar="news" limitItems={3} />
                    </Section>
                </RightColumn>
            </Flex>
        </Section>
    );
};
limitItemsStory.story = { name: 'with a limit of 3 items' };

export const outsideContextStory = () => {
    fetchMock.restore().getOnce('*', {
        status: 200,
        body: response.data,
    });

    return (
        <Section>
            <MostViewedRight pillar="news" />
        </Section>
    );
};
outsideContextStory.story = {
    name: 'inside responsive wrapper',
};
