import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { breakpoints, specialReport } from '@guardian/source-foundations';
import { CardHeadline } from './CardHeadline';
import { Section } from './Section';

export default {
	component: CardHeadline,
	title: 'Components/CardHeadline',
};

const smallHeadlineSizes: SmallHeadlineSize[] = [
	'ginormous',
	'huge',
	'large',
	'medium',
	'small',
	'tiny',
];

export const Article = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how an Article card headline looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
		/>
	</Section>
);
Article.story = { name: 'Article' };

export const Analysis = () => (
	<>
		{smallHeadlineSizes.map((size) => (
			<div key={size}>
				<Section
					fullWidth={true}
					showTopBorder={false}
					showSideBorders={false}
				>
					<CardHeadline
						headlineText={`This is how a ${size} Analysis card headline looks`}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Analysis,
							theme: ArticlePillar.News,
						}}
						size={size}
					/>
				</Section>
				<br />
			</div>
		))}
		<br />
		<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
			<CardHeadline
				headlineText="This is how an Sport Analysis card headline looks"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Analysis,
					theme: ArticlePillar.Sport,
				}}
			/>
		</Section>
		<br />
		<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
			<CardHeadline
				headlineText="This is how an Culture Analysis card headline looks"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Analysis,
					theme: ArticlePillar.Culture,
				}}
			/>
		</Section>
		<br />
		<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
			<CardHeadline
				headlineText="This is how an Opinion Analysis card headline looks"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Analysis,
					theme: ArticlePillar.Opinion,
				}}
			/>
		</Section>
		<br />
		<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
			<CardHeadline
				headlineText="This is how an Lifestyle Analysis card headline looks"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Analysis,
					theme: ArticlePillar.Lifestyle,
				}}
			/>
		</Section>
		<br />
		<Section
			fullWidth={true}
			showTopBorder={false}
			showSideBorders={false}
			backgroundColour={specialReport[300]}
		>
			<CardHeadline
				headlineText="This is how an Special Report Analysis card headline looks"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Analysis,
					theme: ArticleSpecial.SpecialReport,
				}}
			/>
		</Section>
	</>
);
Analysis.story = { name: 'Analysis (Underline)' };

export const Feature = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how a Feature card headline looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: ArticlePillar.News,
			}}
		/>
	</Section>
);
Feature.story = { name: 'Feature' };

export const Size = () => (
	<>
		{smallHeadlineSizes.map((size) => (
			<div key={size}>
				<Section
					fullWidth={true}
					showTopBorder={false}
					showSideBorders={false}
				>
					<CardHeadline
						headlineText={`This is how a ${size} card headline looks`}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: ArticlePillar.News,
						}}
						size={size}
					/>
				</Section>
				<br />
			</div>
		))}
	</>
);
Size.story = { name: 'Size' };

export const MobileSize = () => (
	<>
		{smallHeadlineSizes.map((size) => (
			<div key={size}>
				<Section
					fullWidth={true}
					showTopBorder={false}
					showSideBorders={false}
				>
					<CardHeadline
						headlineText={`This is how a mobile ${size} card headline looks`}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: ArticlePillar.News,
						}}
						size="medium"
						sizeOnMobile={size}
					/>
				</Section>
				<br />
			</div>
		))}
	</>
);
MobileSize.story = {
	name: 'MobileSize',
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile],
		},
	},
};

export const liveStory = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how a card headline with a live kicker looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			kickerText="Live"
		/>
	</Section>
);
liveStory.story = { name: 'With Live kicker' };

export const noSlash = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how a card headline with no kicker slash looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			kickerText="Live"
			showSlash={false}
		/>
	</Section>
);
noSlash.story = { name: 'With Live kicker but no slash' };

export const pulsingDot = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how a card headline with a pulsing dot looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			kickerText="Live"
			showPulsingDot={true}
		/>
	</Section>
);
pulsingDot.story = { name: 'With pulsing dot' };

export const cultureVariant = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how a Feature card headline with the culture pillar looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: ArticlePillar.Culture,
			}}
			kickerText="Art and stuff"
		/>
	</Section>
);
cultureVariant.story = { name: 'With a culture kicker' };

export const Opinion = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how small card headline for opinion articles look"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: ArticlePillar.Opinion,
			}}
			showQuotes={true}
			size="small"
		/>
	</Section>
);
Opinion.story = { name: 'Opinion (Quotes)' };

export const OpinionKicker = () => (
	<>
		{smallHeadlineSizes.map((size) => (
			<div key={size}>
				<Section
					fullWidth={true}
					showTopBorder={false}
					showSideBorders={false}
				>
					<CardHeadline
						headlineText={`This is how a ${size} opinion card headline with a kicker and quotes looks`}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: ArticlePillar.Opinion,
						}}
						showQuotes={true}
						kickerText="George Monbiot"
						showSlash={true}
						size={size}
					/>
				</Section>
				<br />
			</div>
		))}
	</>
);
OpinionKicker.story = { name: 'With an opinion kicker' };

export const SpecialReport = () => (
	<Section
		fullWidth={true}
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
			showQuotes={true}
			kickerText="Special Report"
			showSlash={true}
		/>
	</Section>
);
SpecialReport.story = { name: 'With theme SpecialReport' };

export const Busy = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="I look life a buffoon. I feel incredible. And then I vomit"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: ArticlePillar.Lifestyle,
			}}
			showQuotes={true}
			kickerText="Aerial Yoga"
			showSlash={true}
		/>
	</Section>
);
Busy.story = { name: 'Lifestyle opinion' };

export const Byline = () => (
	<>
		<Section fullWidth={true} showSideBorders={false}>
			<CardHeadline
				headlineText="I look life a buffoon. I feel incredible. And then I vomit"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticleSpecial.Labs,
				}}
				byline="Labs byline"
				showByline={true}
			/>
		</Section>
		<br />
		<Section fullWidth={true} showSideBorders={false}>
			<CardHeadline
				headlineText="I look life a buffoon. I feel incredible. And then I vomit"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.News,
				}}
				byline="News byline"
				showByline={true}
			/>
		</Section>
		<br />
		<Section fullWidth={true} showSideBorders={false}>
			<CardHeadline
				headlineText="I look life a buffoon. I feel incredible. And then I vomit"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.Sport,
				}}
				byline="Sport byline"
				showByline={true}
			/>
		</Section>
		<br />
		<Section fullWidth={true} showSideBorders={false}>
			<CardHeadline
				headlineText="I look life a buffoon. I feel incredible. And then I vomit"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.Culture,
				}}
				byline="Culture byline"
				showByline={true}
			/>
		</Section>
		<br />
		<Section fullWidth={true} showSideBorders={false}>
			<CardHeadline
				headlineText="I look life a buffoon. I feel incredible. And then I vomit"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.Lifestyle,
				}}
				byline="Lifestyle byline"
				showByline={true}
			/>
		</Section>
		<br />
		<Section fullWidth={true} showSideBorders={false}>
			<CardHeadline
				headlineText="I look life a buffoon. I feel incredible. And then I vomit"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.Opinion,
				}}
				byline="Opinion byline"
				showByline={true}
			/>
		</Section>
		<br />
		<Section
			fullWidth={true}
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
				byline="SpecialReport byline"
				showByline={true}
			/>
		</Section>
	</>
);
Byline.story = { name: 'With byline' };
