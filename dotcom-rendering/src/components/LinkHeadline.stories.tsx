import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { LinkHeadline } from './LinkHeadline';
import { Section } from './Section';

export default {
	component: LinkHeadline,
	title: 'Components/LinkHeadline',
};

export const xsmallStory = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a large headline link looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			}}
			size="large"
		/>
	</Section>
);
xsmallStory.storyName = 'Size | large';

export const liveStory = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a headline with a live kicker looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			}}
			kickerText="Live"
		/>
	</Section>
);
liveStory.storyName = 'With Live kicker';

export const noLinebreak = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a headline with no kicker line break looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			}}
			kickerText="Live"
			hideLineBreak={true}
		/>
	</Section>
);
noLinebreak.storyName = 'With Live kicker but no line break';

export const pulsingDot = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a headline with a pulsing dot looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			}}
			kickerText="Live"
			showPulsingDot={true}
		/>
	</Section>
);
pulsingDot.storyName = 'With pulsing dot';

export const cultureVariant = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a headline with the culture pillar looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.Culture,
			}}
			kickerText="Art and stuff"
		/>
	</Section>
);
cultureVariant.storyName = 'With a culture kicker';

export const opinionxxxsmall = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how small links to opinion articles look"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: Pillar.Opinion,
			}}
			showQuotes={true}
			size="small"
			byline="Comment byline"
		/>
	</Section>
);
opinionxxxsmall.storyName = 'Quotes | small';

export const OpinionKicker = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how an opinion headline with a kicker looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: Pillar.Opinion,
			}}
			showQuotes={true}
			kickerText="George Monbiot"
		/>
	</Section>
);
OpinionKicker.storyName = 'With an opinion kicker';

export const SpecialReport = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a Special Report headline with a kicker looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
				theme: ArticleSpecial.SpecialReport,
			}}
			showQuotes={true}
			kickerText="Special Report"
		/>
	</Section>
);
SpecialReport.storyName = 'when Special Report';

export const InUnderlinedState = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is the underlined state when showUnderline is true"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			}}
			showUnderline={true}
			size="small"
			kickerText="I am never underlined"
			link={{
				to: 'https://www.theguardian.com/us-news/2019/nov/14/nancy-pelosi-trump-ukraine-bribery',
			}}
		/>
	</Section>
);
InUnderlinedState.storyName = 'With showUnderline true';

export const linkStory = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a headline looks as a link"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.Sport,
			}}
			kickerText="I am not a link"
			link={{
				to: 'https://www.theguardian.com/us-news/2019/nov/14/nancy-pelosi-trump-ukraine-bribery',
			}}
		/>
	</Section>
);
linkStory.storyName = 'With linkTo provided';

export const LiveBlogSizes = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.LiveBlog,
				theme: Pillar.News,
			}}
			showQuotes={true}
			kickerText="Large live"
			showPulsingDot={true}
			size="large"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.LiveBlog,
				theme: Pillar.News,
			}}
			showQuotes={true}
			kickerText="Medium live"
			showPulsingDot={true}
			size="medium"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.LiveBlog,
				theme: Pillar.News,
			}}
			showQuotes={true}
			kickerText="Small live"
			showPulsingDot={true}
			size="small"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.LiveBlog,
				theme: Pillar.News,
			}}
			showQuotes={true}
			kickerText="Tiny live"
			showPulsingDot={true}
			size="tiny"
		/>
	</Section>
);
LiveBlogSizes.storyName = 'With various sizes (live)';

export const DeadBlogSizes = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
				theme: Pillar.News,
			}}
			showQuotes={true}
			kickerText="Large dead"
			showPulsingDot={false}
			size="large"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
				theme: Pillar.News,
			}}
			showQuotes={true}
			kickerText="Medium dead"
			showPulsingDot={false}
			size="medium"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
				theme: Pillar.News,
			}}
			showQuotes={true}
			kickerText="Small dead"
			showPulsingDot={false}
			size="small"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
				theme: Pillar.News,
			}}
			showQuotes={true}
			kickerText="Tiny dead"
			showPulsingDot={false}
			size="tiny"
		/>
	</Section>
);
DeadBlogSizes.storyName = 'With various sizes (dead)';

export const Updated = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText=""
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.LiveBlog,
				theme: Pillar.News,
			}}
			showPulsingDot={true}
			hideLineBreak={true}
			kickerText="Updated 7m ago"
			size="tiny"
		/>
	</Section>
);
Updated.storyName = 'Last updated';
