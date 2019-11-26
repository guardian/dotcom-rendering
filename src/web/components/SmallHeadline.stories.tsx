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

export const xxxsmallStory = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This is how a xxxsmall headline link looks"
            pillar="news"
            size="xxxsmall"
        />
    </Section>
);
xxxsmallStory.story = { name: 'Size | xxxsmall' };

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
        <SmallHeadline
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
        <SmallHeadline
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
        <SmallHeadline
            headlineString="This is how a headline with a culture kicker looks"
            pillar="culture"
            kicker={{
                text: 'Art and stuff',
            }}
        />
    </Section>
);
cultureVariant.story = { name: 'With a culture kicker' };

export const underlinedxxxsmall = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="Sometimes xxxsmall headline links are underlined"
            pillar="news"
            size="xxxsmall"
            underlined={true}
        />
    </Section>
);
underlinedxxxsmall.story = { name: 'Underlined | xxxsmall' };

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

export const opinionxxxsmall = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="This is how xxxsmall links to opinion articles look"
            pillar="opinion"
            showQuotes={true}
            size="xxxsmall"
        />
    </Section>
);
opinionxxxsmall.story = { name: 'Quotes | xxxsmall' };

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

export const colouredWithKicker = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="Coloured headline with a kicker"
            pillar="sport"
            coloured={true}
            kicker={{
                text: 'England 0 - 8 USA',
                showPulsingDot: true,
                showSlash: true,
            }}
        />
    </Section>
);
colouredWithKicker.story = { name: 'Coloured with kicker' };

export const OpinionKicker = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
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
OpinionKicker.story = { name: 'With a culture kicker' };

export const Busy = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <SmallHeadline
            headlineString="I look life a buffoon. I feel incredible. And then I vomit"
            pillar="lifestyle"
            showQuotes={true}
            coloured={true}
            kicker={{
                text: 'Aerial Yoga',
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
        <SmallHeadline
            headlineString="This is how a headline looks as a link"
            pillar="sport"
            kicker={{
                text: 'I am not a link',
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
            kicker={{
                text: 'I am not a link',
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
            kicker={{
                text: 'I am not a link',
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
