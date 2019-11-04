import React from 'react';

import { Section } from './Section';

import { ArticleHeadline } from './ArticleHeadline';
import { Flex } from './Flex';
import { ArticleLeft } from './ArticleLeft';
import { ArticleContainer } from './ArticleContainer';

/* tslint:disable */
export default {
    component: ArticleHeadline,
    title: 'Components/ArticleHeadline',
};
/* tslint:enable */

export const defaultStory = () => {
    return (
        <Section>
            <Flex>
                <ArticleLeft>
                    <></>
                </ArticleLeft>
                <ArticleContainer>
                    <ArticleHeadline
                        headlineString="This is how the default headline looks"
                        webPublicationDate=""
                        tags={[]}
                    />
                </ArticleContainer>
            </Flex>
        </Section>
    );
};
defaultStory.story = { name: 'default' };

export const oldHeadline = () => {
    return (
        <Section>
            <Flex>
                <ArticleLeft>
                    <></>
                </ArticleLeft>
                <ArticleContainer>
                    <ArticleHeadline
                        headlineString="This is an old headline"
                        webPublicationDate="2014-07-13T18:46:01.933Z"
                        tags={[
                            // Age warnings only show for old articles when the tone/news tag is present
                            {
                                id: 'tone/news',
                                type: '',
                                title: '',
                            },
                        ]}
                    />
                </ArticleContainer>
            </Flex>
        </Section>
    );
};
oldHeadline.story = { name: 'with an old publication date' };
