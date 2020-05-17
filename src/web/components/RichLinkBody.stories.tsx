import React from 'react';

import { Section } from '@frontend/web/components/Section';
import { ArticleContainer } from '@frontend/web/components/ArticleContainer';
import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { Flex } from '@frontend/web/components/Flex';

import { RichLinkBody } from './RichLinkBody';

// cardStyle = "news" | "special-report" | "live" | "dead" | "feature" | "editorial" | "comment" | "podcast" | "media" | "analysis" | "review" | "letters" | "external"
// ContentType = "article" | "network" | "section" | "imageContent" | "interactive" | "gallery" | "video" | "audio" | "liveBlog" | "tag" | "index" | "crossword" | "survey" | "signup" | "userid"

export default {
    component: RichLinkBody,
    title: 'Components/RichLinkBody',
};

export const DefaultStory = () => {
    return (
        <Section>
            <Flex>
                <LeftColumn>
                    <p />
                </LeftColumn>
                <ArticleContainer>
                    <RichLinkBody
                        richLinkIndex={1}
                        cardStyle="news"
                        thumbnailUrl=""
                        headlineText="Rich link headline"
                        contentType="article"
                        url=""
                        pillar="news"
                        tags={[]}
                        sponsorName=""
                    />
                </ArticleContainer>
            </Flex>
        </Section>
    );
};
