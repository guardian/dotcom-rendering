import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';

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
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
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
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Analysis,
				theme: ArticlePillar.News,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Analysis,
				theme: ArticlePillar.News,
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
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: ArticlePillar.News,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: ArticlePillar.News,
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
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
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
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
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
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
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
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
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
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: ArticlePillar.Culture,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: ArticlePillar.Culture,
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
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Analysis,
				theme: ArticlePillar.Lifestyle,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Analysis,
				theme: ArticlePillar.Lifestyle,
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
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: ArticlePillar.Opinion,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: ArticlePillar.Opinion,
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
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.Opinion,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.Opinion,
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
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticleSpecial.SpecialReport,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticleSpecial.SpecialReport,
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
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: ArticlePillar.Lifestyle,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: ArticlePillar.Lifestyle,
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
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticleSpecial.Labs,
				}}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticleSpecial.Labs,
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
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.News,
				}}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.News,
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
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.Sport,
				}}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.Sport,
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
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.Culture,
				}}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.Culture,
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
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.Lifestyle,
				}}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.Lifestyle,
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
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.Opinion,
				}}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.Opinion,
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
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticleSpecial.SpecialReport,
				}}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticleSpecial.SpecialReport,
				})}
				byline="SpecialReport byline"
				showByline={true}
			/>
		</ElementContainer>
	</>
);
Byline.story = { name: 'With byline' };
