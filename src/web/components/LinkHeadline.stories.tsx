import React from 'react';

import { Section } from '@frontend/web/components/Section';

import { LinkHeadline } from '@frontend/web/components/LinkHeadline';

export default {
	component: LinkHeadline,
	title: 'Components/LinkHeadline',
};

export const xsmallStory = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			designType="Article"
			headlineText="This is how a large headline link looks"
			pillar="news"
			size="large"
		/>
	</Section>
);
xsmallStory.story = { name: 'Size | large' };

export const liveStory = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			designType="Article"
			headlineText="This is how a headline with a live kicker looks"
			pillar="news"
			kickerText="Live"
		/>
	</Section>
);
liveStory.story = { name: 'With Live kicker' };

export const noSlash = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			designType="Article"
			headlineText="This is how a headline with no kicker slash looks"
			pillar="news"
			kickerText="Live"
			showSlash={false}
		/>
	</Section>
);
noSlash.story = { name: 'With Live kicker but no slash' };

export const pulsingDot = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			designType="Article"
			headlineText="This is how a headline with a pulsing dot looks"
			pillar="news"
			kickerText="Live"
			showPulsingDot={true}
		/>
	</Section>
);
pulsingDot.story = { name: 'With pulsing dot' };

export const cultureVariant = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			designType="Article"
			headlineText="This is how a headline with the culture pillar looks"
			pillar="culture"
			kickerText="Art and stuff"
		/>
	</Section>
);
cultureVariant.story = { name: 'With a culture kicker' };

export const opinionxxxsmall = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			designType="Comment"
			headlineText="This is how small links to opinion articles look"
			pillar="opinion"
			showQuotes={true}
			size="small"
			byline="Comment byline"
		/>
	</Section>
);
opinionxxxsmall.story = { name: 'Quotes | small' };

export const OpinionKicker = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			designType="Comment"
			headlineText="This is how an opinion headline with a kicker looks"
			pillar="opinion"
			showQuotes={true}
			kickerText="George Monbiot"
			showSlash={true}
		/>
	</Section>
);
OpinionKicker.story = { name: 'With an opinion kicker' };

export const InUnderlinedState = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			designType="Article"
			headlineText="This is the underlined state when showUnderline is true"
			pillar="news"
			showUnderline={true}
			size="small"
			kickerText="I am never underlined"
			showSlash={true}
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
			designType="Article"
			headlineText="This is how a headline looks as a link"
			pillar="sport"
			kickerText="I am not a link"
			showSlash={true}
			link={{
				to:
					'https://www.theguardian.com/us-news/2019/nov/14/nancy-pelosi-trump-ukraine-bribery',
			}}
		/>
	</Section>
);
linkStory.story = { name: 'With linkTo provided' };
