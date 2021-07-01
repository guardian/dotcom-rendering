import { Design, Display, Pillar, Special } from '@guardian/types';

import { ElementContainer } from '@frontend/web/components/ElementContainer';
import { decidePalette } from '@root/src/web/lib/decidePalette';

import { CardHeadline } from '@frontend/web/components/CardHeadline';
import { specialReport } from '@guardian/src-foundations';

export default {
	component: CardHeadline,
	title: 'Components/CardHeadline',
};

export const Article = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
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
	</ElementContainer>
);
Article.story = { name: 'Article' };

export const Analysis = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
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
	</ElementContainer>
);
Analysis.story = { name: 'Analysis' };

export const Feature = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
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
	</ElementContainer>
);
Feature.story = { name: 'Feature' };

export const xsmallStory = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
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
	</ElementContainer>
);
xsmallStory.story = { name: 'Size | large' };

export const liveStory = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
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
	</ElementContainer>
);
liveStory.story = { name: 'With Live kicker' };

export const noSlash = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
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
	</ElementContainer>
);
noSlash.story = { name: 'With Live kicker but no slash' };

export const pulsingDot = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
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
	</ElementContainer>
);
pulsingDot.story = { name: 'With pulsing dot' };

export const cultureVariant = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
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
	</ElementContainer>
);
cultureVariant.story = { name: 'With a culture kicker' };

export const AnalysisXSmall = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
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
	</ElementContainer>
);
AnalysisXSmall.story = { name: 'Underlined | large' };

export const opinionxxxsmall = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
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
	</ElementContainer>
);
opinionxxxsmall.story = { name: 'Quotes | small' };

export const OpinionKicker = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
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
	</ElementContainer>
);
OpinionKicker.story = { name: 'With an opinion kicker' };

export const SpecialReport = () => (
	<ElementContainer
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
	</ElementContainer>
);
SpecialReport.story = { name: 'with theme SpecialReport' };

export const Busy = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
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
	</ElementContainer>
);
Busy.story = { name: 'Lifestyle opinion' };

export const Byline = () => (
	<>
		<ElementContainer showTopBorder={true} showSideBorders={false}>
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
		</ElementContainer>
		<br />
		<ElementContainer showTopBorder={true} showSideBorders={false}>
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
		</ElementContainer>
		<br />
		<ElementContainer showTopBorder={true} showSideBorders={false}>
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
		</ElementContainer>
		<br />
		<ElementContainer showTopBorder={true} showSideBorders={false}>
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
		</ElementContainer>
		<br />
		<ElementContainer showTopBorder={true} showSideBorders={false}>
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
		</ElementContainer>
		<br />
		<ElementContainer showTopBorder={true} showSideBorders={false}>
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
		</ElementContainer>
		<br />
		<ElementContainer
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
		</ElementContainer>
	</>
);
Byline.story = { name: 'With byline' };
