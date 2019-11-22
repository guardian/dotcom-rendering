import React from 'react';

import { Section } from './Section';

import { ArticleHeadline } from './ArticleHeadline';
import { Flex } from './Flex';
import { ArticleLeft } from './ArticleLeft';
import { ArticleContainer } from './ArticleContainer';
import { MainMedia } from './MainMedia';

import { mainMediaElements } from './ArticleHeadline.mocks';

/* tslint:disable */
export default {
    component: ArticleHeadline,
    title: 'Components/ArticleHeadline',
};
/* tslint:enable */

export const defaultStory = () => (
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
defaultStory.story = { name: 'type: basic, with defaults' };

export const oldHeadline = () => (
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
oldHeadline.story = { name: 'type: basic, with age warning' };

export const Bold = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This is a bold headline with colour applied"
                    webPublicationDate="2014-07-13T18:46:01.933Z"
                    tags={[]}
                    colour="#7d0068"
                    type="bold"
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
Bold.story = { name: 'type: bold, with colour' };

export const inverted = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This is an inverted headline. It has a black background, white text and overlays the image below it (as a sibling)"
                    webPublicationDate="2014-07-13T18:46:01.933Z"
                    tags={[]}
                    type="inverted"
                />
                <MainMedia
                    hideCaption={true}
                    elements={mainMediaElements}
                    pillar="news"
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
inverted.story = { name: 'type: inverted' };

export const light = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="Yes, the billionaire club is one we really need to shut down"
                    webPublicationDate="2014-07-13T18:46:01.933Z"
                    tags={[]}
                    type="light"
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
light.story = { name: 'type: light' };

export const underlined = () => (
    <Section>
        <Flex>
            <ArticleLeft>
                <></>
            </ArticleLeft>
            <ArticleContainer>
                <ArticleHeadline
                    headlineString="This headline is underlined. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                    webPublicationDate="2014-07-13T18:46:01.933Z"
                    tags={[]}
                    type="underlined"
                />
            </ArticleContainer>
        </Flex>
    </Section>
);
underlined.story = { name: 'type: underlined' };

export const Jumbo = () => (
    <>
        <MainMedia
            hideCaption={true}
            elements={mainMediaElements}
            pillar="news"
        />
        <Section
            showTopBorder={false}
            showSideBorders={false}
            padded={false}
            shouldCenter={false}
        >
            <Flex>
                <ArticleLeft showRightBorder={false}>
                    <></>
                </ArticleLeft>
                <ArticleContainer>
                    <ArticleHeadline
                        headlineString="Here the headling overlays the image above it, the text is larger and the black background should extend to the right"
                        webPublicationDate="2014-07-13T18:46:01.933Z"
                        tags={[]}
                        type="jumbo"
                    />
                </ArticleContainer>
            </Flex>
        </Section>
    </>
);
Jumbo.story = { name: 'type: jumbo' };
