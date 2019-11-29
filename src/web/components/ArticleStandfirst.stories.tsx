import React from 'react';

import { Section } from './Section';

import { ArticleStandfirst } from './ArticleStandfirst';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { ArticleContainer } from './ArticleContainer';

/* tslint:disable */
export default {
    component: ArticleStandfirst,
    title: 'Components/ArticleStandfirst',
};
/* tslint:enable */

export const defaultStory = () => {
    return (
        <Section>
            <Flex>
                <LeftColumn>
                    <></>
                </LeftColumn>
                <ArticleContainer>
                    <ArticleStandfirst
                        standfirst="This the default standfirst text. Aut explicabo officia delectus omnis repellendus voluptas"
                        pillar="news"
                    />
                </ArticleContainer>
            </Flex>
        </Section>
    );
};
defaultStory.story = { name: 'default' };
