import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { StoryObj } from '@storybook/react';
import type { StoryProps } from '../../.storybook/decorators/splitThemeDecorator';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { LinkHeadline } from './LinkHeadline';
import { Section } from './Section';

export default {
	component: LinkHeadline,
	title: 'Components/LinkHeadline',
};
type StoryArgs = { format: ArticleFormat };

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

export const defaultStory: StoryObj = ({ format }: StoryProps) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a headline with each pillar looks"
			format={format}
			kickerText="The kicker text"
		/>
	</Section>
);
defaultStory.storyName = 'Default Link Headline';
defaultStory.decorators = [splitTheme()];

export const xsmallStory: StoryObj = ({ format }: StoryProps) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a large headline link looks"
			format={format}
			size="large"
		/>
	</Section>
);
xsmallStory.storyName = 'Size | large';
xsmallStory.decorators = [splitTheme([defaultFormat])];

export const liveStory: StoryObj = ({ format }: StoryProps) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a headline with a live kicker looks"
			format={format}
			kickerText="Live"
		/>
	</Section>
);
liveStory.storyName = 'With Live kicker';
liveStory.decorators = [splitTheme([defaultFormat])];

export const noLinebreak: StoryObj = ({ format }: StoryArgs) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a headline with no kicker line break looks"
			format={format}
			kickerText="Live"
			hideLineBreak={true}
		/>
	</Section>
);
noLinebreak.storyName = 'With Live kicker but no line break';
noLinebreak.decorators = [splitTheme([defaultFormat])];

export const pulsingDot: StoryObj = ({ format }: StoryArgs) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a headline with a pulsing dot looks"
			format={format}
			kickerText="Live"
			showPulsingDot={true}
		/>
	</Section>
);
pulsingDot.storyName = 'With pulsing dot';
pulsingDot.decorators = [splitTheme([defaultFormat])];

export const opinionxxxsmall: StoryObj = ({ format }: StoryProps) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how small links to opinion articles look"
			format={format}
			showQuotes={true}
			size="small"
			byline="Comment byline"
		/>
	</Section>
);
opinionxxxsmall.storyName = 'Quotes | small';
opinionxxxsmall.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
			theme: Pillar.Opinion,
		},
	]),
];

export const InUnderlinedState: StoryObj = ({ format }: StoryProps) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is the underlined state when showUnderline is true"
			format={format}
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
InUnderlinedState.decorators = [splitTheme([defaultFormat])];

export const linkStory: StoryObj = ({ format }: StoryProps) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a headline looks as a link"
			format={format}
			kickerText="I am not a link"
			link={{
				to: 'https://www.theguardian.com/us-news/2019/nov/14/nancy-pelosi-trump-ukraine-bribery',
			}}
		/>
	</Section>
);
linkStory.storyName = 'With linkTo provided';
linkStory.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.Sport,
		},
	]),
];

export const LiveBlogSizes: StoryObj = ({ format }: StoryProps) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={format}
			showQuotes={true}
			kickerText="Large live"
			showPulsingDot={true}
			size="large"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={format}
			showQuotes={true}
			kickerText="Medium live"
			showPulsingDot={true}
			size="medium"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={format}
			showQuotes={true}
			kickerText="Small live"
			showPulsingDot={true}
			size="small"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={format}
			showQuotes={true}
			kickerText="Tiny live"
			showPulsingDot={true}
			size="tiny"
		/>
	</Section>
);
LiveBlogSizes.storyName = 'With various sizes (live)';
LiveBlogSizes.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.LiveBlog,
			theme: Pillar.News,
		},
	]),
];

export const DeadBlogSizes: StoryObj = ({ format }: StoryProps) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={format}
			showQuotes={true}
			kickerText="Large dead"
			showPulsingDot={false}
			size="large"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={format}
			showQuotes={true}
			kickerText="Medium dead"
			showPulsingDot={false}
			size="medium"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={format}
			showQuotes={true}
			kickerText="Small dead"
			showPulsingDot={false}
			size="small"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			format={format}
			showQuotes={true}
			kickerText="Tiny dead"
			showPulsingDot={false}
			size="tiny"
		/>
	</Section>
);
DeadBlogSizes.storyName = 'With various sizes (dead)';
DeadBlogSizes.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.DeadBlog,
			theme: Pillar.News,
		},
	]),
];

export const Updated: StoryObj = ({ format }: StoryProps) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText=""
			format={format}
			showPulsingDot={true}
			hideLineBreak={true}
			kickerText="Updated 7m ago"
			size="tiny"
		/>
	</Section>
);
Updated.storyName = 'Last updated';
Updated.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.LiveBlog,
			theme: Pillar.News,
		},
	]),
];
