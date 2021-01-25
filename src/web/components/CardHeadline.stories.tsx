import React from 'react';

import { Design, Pillar } from '@guardian/types';
import { Section } from '@frontend/web/components/Section';

import { CardHeadline } from '@frontend/web/components/CardHeadline';

export default {
	component: CardHeadline,
	title: 'Components/CardHeadline',
};

export const Article = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how an Article card headline looks"
			design={Design.Article}
			pillar={Pillar.News}
		/>
	</Section>
);
Article.story = { name: 'Article' };

export const Analysis = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how an Analysis card headline looks"
			design={Design.Analysis}
			pillar={Pillar.News}
		/>
	</Section>
);
Analysis.story = { name: 'Analysis' };

export const Feature = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how a Feature card headline looks"
			design={Design.Feature}
			pillar={Pillar.News}
		/>
	</Section>
);
Feature.story = { name: 'Feature' };

export const xsmallStory = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how a large card headline looks"
			design={Design.Article}
			pillar={Pillar.News}
			size="large"
		/>
	</Section>
);
xsmallStory.story = { name: 'Size | large' };

export const liveStory = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how a card headline with a live kicker looks"
			design={Design.Article}
			pillar={Pillar.News}
			kickerText="Live"
		/>
	</Section>
);
liveStory.story = { name: 'With Live kicker' };

export const noSlash = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how a card headline with no kicker slash looks"
			design={Design.Article}
			pillar={Pillar.News}
			kickerText="Live"
			showSlash={false}
		/>
	</Section>
);
noSlash.story = { name: 'With Live kicker but no slash' };

export const pulsingDot = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how a card headline with a pulsing dot looks"
			design={Design.Article}
			pillar={Pillar.News}
			kickerText="Live"
			showPulsingDot={true}
		/>
	</Section>
);
pulsingDot.story = { name: 'With pulsing dot' };

export const cultureVariant = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how a Feature card headline with the culture pillar looks"
			design={Design.Feature}
			pillar={Pillar.Culture}
			kickerText="Art and stuff"
		/>
	</Section>
);
cultureVariant.story = { name: 'With a culture kicker' };

export const AnalysisXSmall = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="Xsmall card headline for an Analysis article"
			design={Design.Analysis}
			pillar={Pillar.Lifestyle}
			size="large"
		/>
	</Section>
);
AnalysisXSmall.story = { name: 'Underlined | large' };

export const opinionxxxsmall = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how small card headline for opinion articles look"
			design={Design.Comment}
			pillar={Pillar.Opinion}
			showQuotes={true}
			size="small"
		/>
	</Section>
);
opinionxxxsmall.story = { name: 'Quotes | small' };

export const OpinionKicker = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how an opinion card headline with a kicker and quotes looks"
			design={Design.Article}
			pillar={Pillar.Opinion}
			showQuotes={true}
			kickerText="George Monbiot"
			showSlash={true}
		/>
	</Section>
);
OpinionKicker.story = { name: 'With an opinion kicker' };

export const Busy = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="I look life a buffoon. I feel incredible. And then I vomit"
			design={Design.Feature}
			pillar={Pillar.Lifestyle}
			showQuotes={true}
			kickerText="Aerial Yoga"
			showSlash={true}
		/>
	</Section>
);
Busy.story = { name: 'Lifestyle opinion' };
