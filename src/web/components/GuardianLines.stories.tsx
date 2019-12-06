import React from 'react';

import { Section } from './Section';

import { GuardianLines } from './GuardianLines';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { ArticleContainer } from './ArticleContainer';
import { ArticleHeadline } from './ArticleHeadline';
import { Contributor } from './Contributor';

/* tslint:disable */
export default {
    component: GuardianLines,
    title: 'Components/GuardianLines',
};
/* tslint:enable */

export const defaultStory = () => {
    return (
        <>
            <Section
                showSideBorders={true}
                showTopBorder={false}
                padded={false}
            >
                <GuardianLines />
            </Section>
            <Section showTopBorder={false}>
                <Flex>
                    <LeftColumn>
                        <></>
                    </LeftColumn>
                    <ArticleContainer>
                        <ArticleHeadline
                            headlineString="Headline text"
                            webPublicationDate=""
                            tags={[]}
                            designType="Article"
                            pillar="news"
                        />
                    </ArticleContainer>
                </Flex>
            </Section>
        </>
    );
};
defaultStory.story = { name: 'default' };

export const eightLines = () => {
    return (
        <>
            <Section
                showSideBorders={true}
                showTopBorder={false}
                padded={false}
            >
                <GuardianLines count={8} />
            </Section>
            <Section showTopBorder={false}>
                <Flex>
                    <LeftColumn>
                        <></>
                    </LeftColumn>
                    <ArticleContainer>
                        <ArticleHeadline
                            headlineString="Headline text"
                            webPublicationDate=""
                            tags={[]}
                            designType="Article"
                            pillar="news"
                        />
                    </ArticleContainer>
                </Flex>
            </Section>
        </>
    );
};
eightLines.story = { name: 'with eight lines' };

export const paddedLines = () => {
    return (
        <>
            <Section
                showSideBorders={true}
                showTopBorder={false}
                padded={false}
            >
                <GuardianLines />
            </Section>
            <Section showTopBorder={false}>
                <Flex>
                    <LeftColumn>
                        <div style={{ marginTop: '30px' }} />
                        <GuardianLines />
                        <Contributor
                            author={{ byline: 'Jane doe' }}
                            tags={[]}
                            pillar="news"
                        />
                    </LeftColumn>
                    <ArticleContainer>
                        <ArticleHeadline
                            headlineString="Headline text"
                            webPublicationDate=""
                            tags={[]}
                            designType="Article"
                            pillar="news"
                        />
                    </ArticleContainer>
                </Flex>
            </Section>
        </>
    );
};
paddedLines.story = { name: 'when in left column' };

export const squigglyLines = () => {
    return (
        <>
            <Section
                showSideBorders={true}
                showTopBorder={false}
                padded={false}
            >
                <GuardianLines />
            </Section>
            <Section showTopBorder={false}>
                <Flex>
                    <LeftColumn>
                        <div style={{ marginTop: '30px' }} />
                        <GuardianLines squiggly={true} />
                        <Contributor
                            author={{ byline: 'Jane doe' }}
                            tags={[]}
                            pillar="news"
                        />
                    </LeftColumn>
                    <ArticleContainer>
                        <ArticleHeadline
                            headlineString="Headline text"
                            webPublicationDate=""
                            tags={[]}
                            designType="Article"
                            pillar="news"
                        />
                    </ArticleContainer>
                </Flex>
            </Section>
        </>
    );
};
squigglyLines.story = { name: 'with squiggly lines' };
