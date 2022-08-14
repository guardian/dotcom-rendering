import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { ContainerLayout } from './ContainerLayout';
import { LinkHeadline } from './LinkHeadline';

export default {
	component: LinkHeadline,
	title: 'Components/LinkHeadline',
};

export const xsmallStory = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<LinkHeadline
			headlineText="This is how a large headline link looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			size="large"
		/>
	</ContainerLayout>
);
xsmallStory.story = { name: 'Size | large' };

export const liveStory = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<LinkHeadline
			headlineText="This is how a headline with a live kicker looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			kickerText="Live"
		/>
	</ContainerLayout>
);
liveStory.story = { name: 'With Live kicker' };

export const noSlash = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<LinkHeadline
			headlineText="This is how a headline with no kicker slash looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			kickerText="Live"
			showSlash={false}
		/>
	</ContainerLayout>
);
noSlash.story = { name: 'With Live kicker but no slash' };

export const pulsingDot = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<LinkHeadline
			headlineText="This is how a headline with a pulsing dot looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			kickerText="Live"
			showPulsingDot={true}
		/>
	</ContainerLayout>
);
pulsingDot.story = { name: 'With pulsing dot' };

export const cultureVariant = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<LinkHeadline
			headlineText="This is how a headline with the culture pillar looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.Culture,
			}}
			kickerText="Art and stuff"
		/>
	</ContainerLayout>
);
cultureVariant.story = { name: 'With a culture kicker' };

export const opinionxxxsmall = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<LinkHeadline
			headlineText="This is how small links to opinion articles look"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: ArticlePillar.Opinion,
			}}
			showQuotes={true}
			size="small"
			byline="Comment byline"
		/>
	</ContainerLayout>
);
opinionxxxsmall.story = { name: 'Quotes | small' };

export const OpinionKicker = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<LinkHeadline
			headlineText="This is how an opinion headline with a kicker looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: ArticlePillar.Opinion,
			}}
			showQuotes={true}
			kickerText="George Monbiot"
			showSlash={true}
		/>
	</ContainerLayout>
);
OpinionKicker.story = { name: 'With an opinion kicker' };

export const SpecialReport = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<LinkHeadline
			headlineText="This is how a Special Report headline with a kicker looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: ArticleSpecial.SpecialReport,
			}}
			showQuotes={true}
			kickerText="Special Report"
			showSlash={true}
		/>
	</ContainerLayout>
);
SpecialReport.story = { name: 'when Special Report' };

export const InUnderlinedState = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<LinkHeadline
			headlineText="This is the underlined state when showUnderline is true"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			showUnderline={true}
			size="small"
			kickerText="I am never underlined"
			showSlash={true}
			link={{
				to: 'https://www.theguardian.com/us-news/2019/nov/14/nancy-pelosi-trump-ukraine-bribery',
			}}
		/>
	</ContainerLayout>
);
InUnderlinedState.story = { name: 'With showUnderline true' };

export const linkStory = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<LinkHeadline
			headlineText="This is how a headline looks as a link"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.Sport,
			}}
			kickerText="I am not a link"
			showSlash={true}
			link={{
				to: 'https://www.theguardian.com/us-news/2019/nov/14/nancy-pelosi-trump-ukraine-bribery',
			}}
		/>
	</ContainerLayout>
);
linkStory.story = { name: 'With linkTo provided' };

export const LiveBlogSizes = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.LiveBlog,
				theme: ArticlePillar.News,
			}}
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
				display: ArticleDisplay.Standard,
				design: ArticleDesign.LiveBlog,
				theme: ArticlePillar.News,
			}}
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
				display: ArticleDisplay.Standard,
				design: ArticleDesign.LiveBlog,
				theme: ArticlePillar.News,
			}}
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
				display: ArticleDisplay.Standard,
				design: ArticleDesign.LiveBlog,
				theme: ArticlePillar.News,
			}}
			showQuotes={true}
			kickerText="Tiny live"
			showSlash={true}
			showPulsingDot={true}
			size="tiny"
		/>
	</ContainerLayout>
);
LiveBlogSizes.story = { name: 'With various sizes (live)' };

export const DeadBlogSizes = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
				theme: ArticlePillar.News,
			}}
			showQuotes={true}
			kickerText="Large dead"
			showSlash={true}
			showPulsingDot={false}
			size="large"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
				theme: ArticlePillar.News,
			}}
			showQuotes={true}
			kickerText="Medium dead"
			showSlash={true}
			showPulsingDot={false}
			size="medium"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
				theme: ArticlePillar.News,
			}}
			showQuotes={true}
			kickerText="Small dead"
			showSlash={true}
			showPulsingDot={false}
			size="small"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
				theme: ArticlePillar.News,
			}}
			showQuotes={true}
			kickerText="Tiny dead"
			showSlash={true}
			showPulsingDot={false}
			size="tiny"
		/>
	</ContainerLayout>
);
DeadBlogSizes.story = { name: 'With various sizes (dead)' };

export const Updated = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<LinkHeadline
			headlineText=""
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.LiveBlog,
				theme: ArticlePillar.News,
			}}
			showPulsingDot={true}
			showSlash={false}
			kickerText="Updated 7m ago"
			size="tiny"
		/>
	</ContainerLayout>
);
Updated.story = { name: 'Last updated' };
