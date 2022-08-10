import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { breakpoints, specialReport } from '@guardian/source-foundations';
import { CardHeadline } from './CardHeadline';
import { ElementContainer } from './ElementContainer';

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
	<ElementContainer showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how an Article card headline looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
		/>
	</ElementContainer>
);
Article.story = { name: 'Article' };

export const Analysis = () => (
	<>
		{smallHeadlineSizes.map((size) => (
			<div key={size}>
				<ElementContainer showTopBorder={false} showSideBorders={false}>
					<CardHeadline
						headlineText={`This is how a ${size} Analysis card headline looks`}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Analysis,
							theme: ArticlePillar.News,
						}}
						size={size}
					/>
				</ElementContainer>
				<br />
			</div>
		))}
		<br />
		<ElementContainer showTopBorder={false} showSideBorders={false}>
			<CardHeadline
				headlineText="This is how an Sport Analysis card headline looks"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Analysis,
					theme: ArticlePillar.Sport,
				}}
			/>
		</ElementContainer>
		<br />
		<ElementContainer showTopBorder={false} showSideBorders={false}>
			<CardHeadline
				headlineText="This is how an Culture Analysis card headline looks"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Analysis,
					theme: ArticlePillar.Culture,
				}}
			/>
		</ElementContainer>
		<br />
		<ElementContainer showTopBorder={false} showSideBorders={false}>
			<CardHeadline
				headlineText="This is how an Opinion Analysis card headline looks"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Analysis,
					theme: ArticlePillar.Opinion,
				}}
			/>
		</ElementContainer>
		<br />
		<ElementContainer showTopBorder={false} showSideBorders={false}>
			<CardHeadline
				headlineText="This is how an Lifestyle Analysis card headline looks"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Analysis,
					theme: ArticlePillar.Lifestyle,
				}}
			/>
		</ElementContainer>
		<br />
		<ElementContainer
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
		</ElementContainer>
	</>
);
Analysis.story = { name: 'Analysis (Underline)' };

export const Feature = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how a Feature card headline looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: ArticlePillar.News,
			}}
		/>
	</ElementContainer>
);
Feature.story = { name: 'Feature' };

export const Size = () => (
	<>
		{smallHeadlineSizes.map((size) => (
			<div key={size}>
				<ElementContainer showTopBorder={false} showSideBorders={false}>
					<CardHeadline
						headlineText={`This is how a ${size} card headline looks`}
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: ArticlePillar.News,
						}}
						size={size}
					/>
				</ElementContainer>
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
				<ElementContainer showTopBorder={false} showSideBorders={false}>
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
				</ElementContainer>
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
	<ElementContainer showTopBorder={false} showSideBorders={false}>
		<CardHeadline
			headlineText="This is how a card headline with a live kicker looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
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
			kickerText="Art and stuff"
		/>
	</ElementContainer>
);
cultureVariant.story = { name: 'With a culture kicker' };

export const Opinion = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
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
	</ElementContainer>
);
Opinion.story = { name: 'Opinion (Quotes)' };

export const OpinionKicker = () => (
	<>
		{smallHeadlineSizes.map((size) => (
			<div key={size}>
				<ElementContainer showTopBorder={false} showSideBorders={false}>
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
				</ElementContainer>
				<br />
			</div>
		))}
	</>
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
			showQuotes={true}
			kickerText="Special Report"
			showSlash={true}
		/>
	</ElementContainer>
);
SpecialReport.story = { name: 'With theme SpecialReport' };

export const Busy = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
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
				byline="SpecialReport byline"
				showByline={true}
			/>
		</ElementContainer>
	</>
);
Byline.story = { name: 'With byline' };
