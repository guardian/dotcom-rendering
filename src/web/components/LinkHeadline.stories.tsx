import React from 'react';

import { Design, Display, Pillar, Special } from '@guardian/types';
import { Section } from '@frontend/web/components/Section';

import { LinkHeadline } from '@frontend/web/components/LinkHeadline';
import { decidePalette } from '@root/src/web/lib/decidePalette';

export default {
	component: LinkHeadline,
	title: 'Components/LinkHeadline',
};

export const xsmallStory = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a large headline link looks"
			format={{
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.News,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.News,
			})}
			size="large"
		/>
	</Section>
);
xsmallStory.story = { name: 'Size | large' };

export const liveStory = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a headline with a live kicker looks"
			format={{
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.News,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.News,
			})}
			kickerText="Live"
		/>
	</Section>
);
liveStory.story = { name: 'With Live kicker' };

export const noSlash = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a headline with no kicker slash looks"
			format={{
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.News,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.News,
			})}
			kickerText="Live"
			showSlash={false}
		/>
	</Section>
);
noSlash.story = { name: 'With Live kicker but no slash' };

export const pulsingDot = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a headline with a pulsing dot looks"
			format={{
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.News,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.News,
			})}
			kickerText="Live"
			showPulsingDot={true}
		/>
	</Section>
);
pulsingDot.story = { name: 'With pulsing dot' };

export const cultureVariant = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a headline with the culture pillar looks"
			format={{
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.Culture,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.Culture,
			})}
			kickerText="Art and stuff"
		/>
	</Section>
);
cultureVariant.story = { name: 'With a culture kicker' };

export const opinionxxxsmall = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how small links to opinion articles look"
			format={{
				display: Display.Standard,
				design: Design.Comment,
				theme: Pillar.Opinion,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Comment,
				theme: Pillar.Opinion,
			})}
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
			headlineText="This is how an opinion headline with a kicker looks"
			format={{
				display: Display.Standard,
				design: Design.Comment,
				theme: Pillar.Opinion,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Comment,
				theme: Pillar.Opinion,
			})}
			showQuotes={true}
			kickerText="George Monbiot"
			showSlash={true}
		/>
	</Section>
);
OpinionKicker.story = { name: 'With an opinion kicker' };

export const SpecialReport = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a Special Report headline with a kicker looks"
			format={{
				display: Display.Standard,
				design: Design.Comment,
				theme: Special.SpecialReport,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Comment,
				theme: Special.SpecialReport,
			})}
			showQuotes={true}
			kickerText="Special Report"
			showSlash={true}
		/>
	</Section>
);
SpecialReport.story = { name: 'when Special Report' };

export const InUnderlinedState = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is the underlined state when showUnderline is true"
			format={{
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.News,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.News,
			})}
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
			headlineText="This is how a headline looks as a link"
			format={{
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.Sport,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.Sport,
			})}
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

export const LiveSizes = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={{
				display: Display.Standard,
				design: Design.LiveBlog,
				theme: Pillar.News,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.LiveBlog,
				theme: Pillar.News,
			})}
			showQuotes={true}
			kickerText="Large live"
			showSlash={true}
			showPulsingDot={true}
			size="large"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={{
				display: Display.Standard,
				design: Design.LiveBlog,
				theme: Pillar.News,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.LiveBlog,
				theme: Pillar.News,
			})}
			showQuotes={true}
			kickerText="Medium live"
			showSlash={true}
			showPulsingDot={true}
			size="medium"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={{
				display: Display.Standard,
				design: Design.LiveBlog,
				theme: Pillar.News,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.LiveBlog,
				theme: Pillar.News,
			})}
			showQuotes={true}
			kickerText="Small live"
			showSlash={true}
			showPulsingDot={true}
			size="small"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={{
				display: Display.Standard,
				design: Design.LiveBlog,
				theme: Pillar.News,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.LiveBlog,
				theme: Pillar.News,
			})}
			showQuotes={true}
			kickerText="Tiny live"
			showSlash={true}
			showPulsingDot={true}
			size="tiny"
		/>
	</Section>
);
LiveSizes.story = { name: 'with various sizes' };

export const Updated = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText=""
			format={{
				display: Display.Standard,
				design: Design.LiveBlog,
				theme: Pillar.News,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.LiveBlog,
				theme: Pillar.News,
			})}
			showPulsingDot={true}
			showSlash={false}
			kickerText="Updated 7m ago"
			size="tiny"
		/>
	</Section>
);
Updated.story = { name: 'Last updated' };
