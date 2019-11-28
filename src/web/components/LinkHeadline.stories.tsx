import React from 'react';

import { Section } from '@frontend/web/components/Section';

import { LinkHeadline } from '@frontend/web/components/LinkHeadline';

/* tslint:disable */
export default {
    component: LinkHeadline,
    title: 'Components/LinkHeadline',
};
/* tslint:enable */

export const xsmallStory = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <LinkHeadline
            headlineString="This is how a xsmall headline link looks"
            pillar="news"
            size="xsmall"
        />
    </Section>
);
xsmallStory.story = { name: 'Size | xsmall' };

export const liveStory = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <LinkHeadline
            headlineString="This is how a headline with a live kicker looks"
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
        <LinkHeadline
            headlineString="This is how a headline with no kicker slash looks"
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
        <LinkHeadline
            headlineString="This is how a headline with a pulsing dot looks"
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
        <LinkHeadline
            headlineString="This is how a headline with the culture pillar looks"
            pillar="culture"
            kicker={{
                text: 'Art and stuff',
            }}
        />
    </Section>
);
cultureVariant.story = { name: 'With a culture kicker' };

export const opinionxxxsmall = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <LinkHeadline
            headlineString="This is how xxxsmall links to opinion articles look"
            pillar="opinion"
            showQuotes={true}
            size="xxxsmall"
        />
    </Section>
);
opinionxxxsmall.story = { name: 'Quotes | xxxsmall' };

export const OpinionKicker = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <LinkHeadline
            headlineString="This is how an opinion headline with a kicker looks"
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

export const InUnderlinedState = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <LinkHeadline
            headlineString="This is the underlined state when showUnderline is true"
            pillar="news"
            showUnderline={true}
            size="xxxsmall"
            kicker={{
                text: 'I am never underlined',
                showSlash: true,
            }}
            link={{
                to:
                    'https://www.theguardian.com/us-news/2019/nov/14/nancy-pelosi-trump-ukraine-bribery',
            }}
        />
    </Section>
);
InUnderlinedState.story = { name: 'With showUnderline true' };

export const linkStory = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <LinkHeadline
            headlineString="This is how a headline looks as a link"
            pillar="sport"
            kicker={{
                text: 'I am not a link',
                showSlash: true,
            }}
            link={{
                to:
                    'https://www.theguardian.com/us-news/2019/nov/14/nancy-pelosi-trump-ukraine-bribery',
            }}
        />
    </Section>
);
linkStory.story = { name: 'With linkTo provided' };
