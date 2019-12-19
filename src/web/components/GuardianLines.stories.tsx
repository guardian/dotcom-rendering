import React from 'react';

import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { RightColumn } from '@root/src/web/components/RightColumn';

import { Section } from './Section';

import { GuardianLines } from './GuardianLines';
import { ArticleContainer } from './ArticleContainer';
import { ArticleHeadline } from './ArticleHeadline';

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
                <ArticleContainer>
                    <ArticleHeadline
                        headlineString="Headline text"
                        webPublicationDate=""
                        tags={[]}
                        designType="Article"
                        pillar="news"
                    />
                </ArticleContainer>
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
                <ArticleContainer>
                    <ArticleHeadline
                        headlineString="Headline text"
                        webPublicationDate=""
                        tags={[]}
                        designType="Article"
                        pillar="news"
                    />
                </ArticleContainer>
            </Section>
        </>
    );
};
eightLines.story = { name: 'with eight lines' };

// @ts-ignore
const CAPI = {
    author: { byline: 'Jane Doe' },
    pageId: `page-id`,
    pillar: 'culture',
    sectionLabel: `Section`,
    sectionUrl: `https://guardian.co.uk`,
    webPublicationDateDisplay: '',
    webTitle: `Page title`,
    tags: [],
} as CAPIType;

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
                <ArticleContainer>
                    <ArticleTitle CAPI={CAPI} />
                    <ArticleHeadline
                        headlineString="Headline text"
                        webPublicationDate=""
                        tags={[]}
                        designType="Article"
                        pillar="news"
                    />
                    <ArticleMeta CAPI={CAPI} />
                    <RightColumn>
                        <span />
                    </RightColumn>
                </ArticleContainer>
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
                <ArticleContainer>
                    <ArticleTitle CAPI={CAPI} />
                    <ArticleHeadline
                        headlineString="Headline text"
                        webPublicationDate=""
                        tags={[]}
                        designType="Article"
                        pillar="news"
                    />
                    <ArticleMeta CAPI={CAPI} hasSquigglyLines={true} />
                    <RightColumn>
                        <span />
                    </RightColumn>
                </ArticleContainer>
            </Section>
        </>
    );
};
squigglyLines.story = { name: 'with squiggly lines' };
