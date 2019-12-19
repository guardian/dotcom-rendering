import React from 'react';

import { Section } from './Section';

import { ArticleStandfirst } from './ArticleStandfirst';
import { ArticleContainer } from './ArticleContainer';
import { ArticleTitle } from './ArticleTitle';
import { ArticleHeadline } from './ArticleHeadline';

/* tslint:disable */
export default {
    component: ArticleStandfirst,
    title: 'Components/ArticleStandfirst',
};
/* tslint:enable */

export const defaultStory = () => {
    return (
        <Section>
            <ArticleContainer>
                <ArticleTitle
                    CAPI={
                        // @ts-ignore
                        {
                            sectionLabel: 'Section',
                            sectionUrl: 'section/subsection',
                            tags: [],
                            pillar: `culture`,
                        } as CAPIType
                    }
                />
                <ArticleHeadline
                    headlineString="This is how the default headline looks"
                    designType="Article"
                    pillar="news"
                    webPublicationDate=""
                    tags={[]}
                />
                <ArticleStandfirst
                    standfirst="This the default standfirst text. Aut explicabo officia delectus omnis repellendus voluptas"
                    pillar="news"
                />
            </ArticleContainer>
        </Section>
    );
};
defaultStory.story = { name: 'default' };
