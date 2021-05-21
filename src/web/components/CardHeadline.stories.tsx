import { Design, Display, Pillar, Special } from '@guardian/types';

import { Section } from '@frontend/web/components/Section';
import { decidePalette } from '@root/src/web/lib/decidePalette';

import { CardHeadline } from '@frontend/web/components/CardHeadline';
import { specialReport } from '@guardian/src-foundations';

export default {
	component: CardHeadline,
	title: 'Components/CardHeadline',
};

export const Article = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how an Article card headline looks"
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
		/>
	</Section>
);
Article.story = { name: 'Article' };

export const Analysis = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how an Analysis card headline looks"
			format={{
				display: Display.Standard,
				design: Design.Analysis,
				theme: Pillar.News,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Analysis,
				theme: Pillar.News,
			})}
		/>
	</Section>
);
Analysis.story = { name: 'Analysis' };

export const Feature = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how a Feature card headline looks"
			format={{
				display: Display.Standard,
				design: Design.Feature,
				theme: Pillar.News,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Feature,
				theme: Pillar.News,
			})}
		/>
	</Section>
);
Feature.story = { name: 'Feature' };

export const xsmallStory = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how a large card headline looks"
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
		<CardHeadline
			headlineText="This is how a card headline with a live kicker looks"
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
		<CardHeadline
			headlineText="This is how a card headline with no kicker slash looks"
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
		<CardHeadline
			headlineText="This is how a card headline with a pulsing dot looks"
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
		<CardHeadline
			headlineText="This is how a Feature card headline with the culture pillar looks"
			format={{
				display: Display.Standard,
				design: Design.Feature,
				theme: Pillar.Culture,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Feature,
				theme: Pillar.Culture,
			})}
			kickerText="Art and stuff"
		/>
	</Section>
);
cultureVariant.story = { name: 'With a culture kicker' };

export const AnalysisXSmall = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="Xsmall card headline for an Analysis article"
			format={{
				display: Display.Standard,
				design: Design.Analysis,
				theme: Pillar.Lifestyle,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Analysis,
				theme: Pillar.Lifestyle,
			})}
			size="large"
		/>
	</Section>
);
AnalysisXSmall.story = { name: 'Underlined | large' };

export const opinionxxxsmall = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how small card headline for opinion articles look"
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
		/>
	</Section>
);
opinionxxxsmall.story = { name: 'Quotes | small' };

export const OpinionKicker = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how an opinion card headline with a kicker and quotes looks"
			format={{
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.Opinion,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Article,
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
	<Section
		showTopBorder={false}
		showSideBorders={false}
		backgroundColour="grey"
	>
		<CardHeadline
			headlineText="This is how a Special Report card headline with kicker and quotes looks"
			format={{
				display: Display.Standard,
				design: Design.Article,
				theme: Special.SpecialReport,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Article,
				theme: Special.SpecialReport,
			})}
			showQuotes={true}
			kickerText="Special Report"
			showSlash={true}
		/>
	</Section>
);
SpecialReport.story = { name: 'with theme SpecialReport' };

export const Busy = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="I look life a buffoon. I feel incredible. And then I vomit"
			format={{
				display: Display.Standard,
				design: Design.Feature,
				theme: Pillar.Lifestyle,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Feature,
				theme: Pillar.Lifestyle,
			})}
			showQuotes={true}
			kickerText="Aerial Yoga"
			showSlash={true}
		/>
	</Section>
);
Busy.story = { name: 'Lifestyle opinion' };

export const Byline = () => (
	<>
		<Section showTopBorder={true} showSideBorders={false}>
			<CardHeadline
				headlineText="I look life a buffoon. I feel incredible. And then I vomit"
				format={{
					display: Display.Standard,
					design: Design.Feature,
					theme: Special.Labs,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Feature,
					theme: Special.Labs,
				})}
				byline="Labs byline"
				showByline={true}
			/>
		</Section>
		<br />
		<Section showTopBorder={true} showSideBorders={false}>
			<CardHeadline
				headlineText="I look life a buffoon. I feel incredible. And then I vomit"
				format={{
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.News,
				})}
				byline="News byline"
				showByline={true}
			/>
		</Section>
		<br />
		<Section showTopBorder={true} showSideBorders={false}>
			<CardHeadline
				headlineText="I look life a buffoon. I feel incredible. And then I vomit"
				format={{
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.Sport,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.Sport,
				})}
				byline="Sport byline"
				showByline={true}
			/>
		</Section>
		<br />
		<Section showTopBorder={true} showSideBorders={false}>
			<CardHeadline
				headlineText="I look life a buffoon. I feel incredible. And then I vomit"
				format={{
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.Culture,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.Culture,
				})}
				byline="Culture byline"
				showByline={true}
			/>
		</Section>
		<br />
		<Section showTopBorder={true} showSideBorders={false}>
			<CardHeadline
				headlineText="I look life a buffoon. I feel incredible. And then I vomit"
				format={{
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.Lifestyle,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.Lifestyle,
				})}
				byline="Lifestyle byline"
				showByline={true}
			/>
		</Section>
		<br />
		<Section showTopBorder={true} showSideBorders={false}>
			<CardHeadline
				headlineText="I look life a buffoon. I feel incredible. And then I vomit"
				format={{
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.Opinion,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.Opinion,
				})}
				byline="Opinion byline"
				showByline={true}
			/>
		</Section>
		<br />
		<Section
			showTopBorder={true}
			showSideBorders={false}
			backgroundColour={specialReport[300]}
		>
			<CardHeadline
				headlineText="I look life a buffoon. I feel incredible. And then I vomit"
				format={{
					display: Display.Standard,
					design: Design.Feature,
					theme: Special.SpecialReport,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Feature,
					theme: Special.SpecialReport,
				})}
				byline="SpecialReport byline"
				showByline={true}
			/>
		</Section>
	</>
);
Byline.story = { name: 'With byline' };
