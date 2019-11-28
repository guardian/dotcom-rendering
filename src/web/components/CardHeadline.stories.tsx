import React from 'react';

import { Section } from '@frontend/web/components/Section';

import { CardHeadline } from '@frontend/web/components/CardHeadline';

/* tslint:disable */
export default {
    component: CardHeadline,
    title: 'Components/CardHeadline',
};
/* tslint:enable */

export const Article = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <CardHeadline
            headlineString="This is how an Article card headline looks"
            designType="Article"
            pillar="news"
        />
    </Section>
);
Article.story = { name: 'Article' };

export const Analysis = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <CardHeadline
            headlineString="This is how an Analysis card headline looks"
            designType="Analysis"
            pillar="news"
        />
    </Section>
);
Analysis.story = { name: 'Analysis' };

export const Feature = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <CardHeadline
            headlineString="This is how a Feature card headline looks"
            designType="Feature"
            pillar="news"
        />
    </Section>
);
Feature.story = { name: 'Feature' };

export const xsmallStory = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <CardHeadline
            headlineString="This is how a xsmall card headline looks"
            designType="Article"
            pillar="news"
            size="xsmall"
        />
    </Section>
);
xsmallStory.story = { name: 'Size | xsmall' };

export const liveStory = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <CardHeadline
            headlineString="This is how a card headline with a live kicker looks"
            designType="Article"
            pillar="news"
            kicker={{
                text: 'Live',
            }}
        />
    </Section>
);
liveStory.story = { name: 'With Live kicker' };

export const noSlash = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <CardHeadline
            headlineString="This is how a card headline with no kicker slash looks"
            designType="Article"
            pillar="news"
            kicker={{
                text: 'Live',
                showSlash: false,
            }}
        />
    </Section>
);
noSlash.story = { name: 'With Live kicker but no slash' };

export const pulsingDot = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <CardHeadline
            headlineString="This is how a card headline with a pulsing dot looks"
            designType="Article"
            pillar="news"
            kicker={{
                text: 'Live',
                showPulsingDot: true,
            }}
        />
    </Section>
);
pulsingDot.story = { name: 'With pulsing dot' };

export const cultureVariant = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <CardHeadline
            headlineString="This is how a Feature card headline with the culture pillar looks"
            designType="Feature"
            pillar="culture"
            kicker={{
                text: 'Art and stuff',
            }}
        />
    </Section>
);
cultureVariant.story = { name: 'With a culture kicker' };

export const AnalysisXSmall = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <CardHeadline
            headlineString="Xsmall card headline for an Analysis article"
            designType="Analysis"
            pillar="lifestyle"
            size="xsmall"
        />
    </Section>
);
AnalysisXSmall.story = { name: 'Underlined | xsmall' };

export const opinionxxxsmall = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <CardHeadline
            headlineString="This is how xxxsmall card headline for opinion articles look"
            designType="Comment"
            pillar="opinion"
            showQuotes={true}
            size="xxxsmall"
        />
    </Section>
);
opinionxxxsmall.story = { name: 'Quotes | xxxsmall' };

export const OpinionKicker = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <CardHeadline
            headlineString="This is how an opinion card headline with a kicker and quotes looks"
            designType="Article"
            pillar="opinion"
            showQuotes={true}
            kicker={{
                text: 'George Monbiot',
                showSlash: true,
            }}
        />
    </Section>
);
OpinionKicker.story = { name: 'With an opinion kicker' };

export const Busy = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <CardHeadline
            headlineString="I look life a buffoon. I feel incredible. And then I vomit"
            designType="Feature"
            pillar="lifestyle"
            showQuotes={true}
            kicker={{
                text: 'Aerial Yoga',
                showSlash: true,
            }}
        />
    </Section>
);
Busy.story = { name: 'Lifestyle opinion' };
