import React from 'react';

import { Section } from '@frontend/web/components/Section';

import { SmallHeadline } from '@frontend/web/components/SmallHeadline';
import { palette } from '@guardian/src-foundations';

/* tslint:disable */
export default {
    component: SmallHeadline,
    title: 'Components/SmallHeadline',
};
/* tslint:enable */

export const tinyStory = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This is how a tiny headline link looks"
            pillar="news"
            size="tiny"
        />
    </Section>
);
tinyStory.story = { name: 'Size | tiny' };

export const defaultStory = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This is how a default headline link looks"
            pillar="news"
        />
    </Section>
);
defaultStory.story = { name: 'Size | xxsmall (default)' };

export const xsmallStory = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This is how a xsmall headline link looks"
            pillar="news"
            size="xsmall"
        />
    </Section>
);
xsmallStory.story = { name: 'Size | xsmall' };

export const liveStory = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This is how a headline with a live prefix looks"
            pillar="news"
            prefix={{
                text: 'Live',
                pillar: 'news',
            }}
        />
    </Section>
);
liveStory.story = { name: 'With Live prefix' };

export const noSlash = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This is how a headline with no prefix slash looks"
            pillar="news"
            prefix={{
                text: 'Live',
                pillar: 'news',
                showSlash: false,
            }}
        />
    </Section>
);
noSlash.story = { name: 'With Live prefix but no slash' };

export const pulsingDot = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This is how a headline with a pulsing dot looks"
            pillar="news"
            prefix={{
                text: 'Live',
                pillar: 'news',
                showPulsingDot: true,
            }}
        />
    </Section>
);
pulsingDot.story = { name: 'With pulsing dot' };

export const cultureVariant = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This is how a headline with a culture prefix looks"
            pillar="news"
            prefix={{
                text: 'Art and stuff',
                pillar: 'culture',
            }}
        />
    </Section>
);
cultureVariant.story = { name: 'With a culture prefix' };

export const underlinedTiny = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="Sometimes tiny headline links are underlined"
            pillar="news"
            size="tiny"
            underlined={true}
        />
    </Section>
);
underlinedTiny.story = { name: 'Underlined | tiny' };

export const underlinedXXSmall = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="Sometimes xxsmall headline links are underlined"
            pillar="news"
            size="xxsmall"
            underlined={true}
        />
    </Section>
);
underlinedXXSmall.story = { name: 'Underlined | xxsmall' };

export const underlinedXSmall = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="Sometimes xsmall headline links are underlined"
            pillar="news"
            size="xsmall"
            underlined={true}
        />
    </Section>
);
underlinedXSmall.story = { name: 'Underlined | xsmall' };

export const opinionTiny = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This is how tiny links to opinion articles look"
            pillar="opinion"
            showQuotes={true}
            size="tiny"
        />
    </Section>
);
opinionTiny.story = { name: 'Quotes | tiny' };

export const opinionXXSmall = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This is how xxsmall links to opinion articles look"
            pillar="opinion"
            showQuotes={true}
            size="xxsmall"
        />
    </Section>
);
opinionXXSmall.story = { name: 'Quotes | xxsmall' };

export const opinionXSmall = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This is how xsmall links to opinion articles look"
            pillar="opinion"
            showQuotes={true}
            size="xsmall"
        />
    </Section>
);
opinionXSmall.story = { name: 'Quotes | xsmall' };

export const colouredStory = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This is how a coloured headline link looks"
            pillar="sport"
            coloured={true}
        />
    </Section>
);
colouredStory.story = { name: 'Coloured' };

export const colouredWithPrefix = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="Coloured headline with a prefix"
            pillar="sport"
            coloured={true}
            prefix={{
                text: 'England 0 - 8 USA',
                pillar: 'sport',
                showPulsingDot: true,
                showSlash: true,
            }}
        />
    </Section>
);
colouredWithPrefix.story = { name: 'Coloured with prefix' };

export const OpinionPrefix = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This is how an opinion headline with a prefix looks"
            pillar="opinion"
            showQuotes={true}
            prefix={{
                text: 'George Monbiot',
                pillar: 'opinion',
                showSlash: true,
            }}
        />
    </Section>
);
OpinionPrefix.story = { name: 'With a culture prefix' };

export const Busy = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="I look life a buffoon. I feel incredible. And then I vomit"
            pillar="lifestyle"
            showQuotes={true}
            coloured={true}
            prefix={{
                text: 'Aerial Yoga',
                pillar: 'lifestyle',
                showSlash: true,
            }}
        />
    </Section>
);
Busy.story = { name: 'Lifestyle opinion' };

export const InUnderlinedState = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This is the underlined state when showUnderline is true"
            pillar="news"
            showUnderline={true}
            size="tiny"
            prefix={{
                text: 'I am never underlined',
                pillar: 'news',
                showSlash: true,
            }}
        />
    </Section>
);
InUnderlinedState.story = { name: 'With showUnderline true' };

export const linkStory = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This is how a headline looks as a link"
            pillar="sport"
            prefix={{
                text: 'I am not a link',
                pillar: 'sport',
                showSlash: true,
            }}
            coloured={true}
            link={{
                to:
                    'https://www.theguardian.com/us-news/2019/nov/14/nancy-pelosi-trump-ukraine-bribery',
            }}
        />
    </Section>
);
linkStory.story = { name: 'With linkTo provided' };

export const visitedLinkStory = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This a headline link with a custom visited colour"
            pillar="sport"
            prefix={{
                text: 'I am not a link',
                pillar: 'sport',
                showSlash: true,
            }}
            coloured={true}
            link={{
                to:
                    'https://www.theguardian.com/society/2019/nov/18/revealed-nhs-running-short-of-dozens-of-lifesaving-medicines',
                visitedColour: palette.neutral[46],
            }}
        />
    </Section>
);
visitedLinkStory.story = { name: 'With custom visited link colour' };

export const notFocusableLinkStory = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This a headline link with a custom visited colour"
            pillar="sport"
            prefix={{
                text: 'I am not a link',
                pillar: 'sport',
                showSlash: true,
            }}
            coloured={true}
            link={{
                to:
                    'https://www.theguardian.com/society/2019/nov/18/revealed-nhs-running-short-of-dozens-of-lifesaving-medicines',
                preventFocus: true,
            }}
        />
    </Section>
);
notFocusableLinkStory.story = { name: 'With an unfocusable link' };
