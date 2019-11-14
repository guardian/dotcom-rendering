import React from 'react';
import fetchMock from 'fetch-mock';

import { Flex } from '@root/src/web/components/Flex';
import { ArticleLeft } from '@root/src/web/components/ArticleLeft';
import { ArticleRight } from '@root/src/web/components/ArticleRight';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { Section } from '@frontend/web/components/Section';

import { MostViewedList } from './MostViewedList';
import { response } from './MostViewedList.mocks';

/* tslint:disable */
export default {
    component: MostViewedList,
    title: 'Components/MostViewedList',
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
                <ArticleLeft>
                    <></>
                </ArticleLeft>
                <ArticleContainer>
                    <></>
                </ArticleContainer>
                <ArticleRight>
                    <Section
                        showSideBorders={false}
                        showTopBorder={false}
                        padded={false}
                    >
                        <MostViewedList />
                    </Section>
                </ArticleRight>
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
                <ArticleLeft>
                    <></>
                </ArticleLeft>
                <ArticleContainer>
                    <></>
                </ArticleContainer>
                <ArticleRight>
                    <Section
                        showSideBorders={false}
                        showTopBorder={false}
                        padded={false}
                    >
                        <MostViewedList limitItems={8} />
                    </Section>
                </ArticleRight>
            </Flex>
        </Section>
    );
};
limitItemsStory.story = { name: 'with a limit of 8 items' };
