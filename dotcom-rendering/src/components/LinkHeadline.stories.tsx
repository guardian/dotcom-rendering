import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
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
			isLabs={format.theme === ArticleSpecial.Labs}
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
			isLabs={format.theme === ArticleSpecial.Labs}
			size="large"
		/>
	</Section>
);
xsmallStory.storyName = 'Size | large';
xsmallStory.decorators = [splitTheme([defaultFormat])];

const liveFormat = { ...defaultFormat, design: ArticleDesign.LiveBlog };

export const liveStory: StoryObj = ({ format }: StoryProps) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a headline with a live kicker looks"
			isLabs={format.theme === ArticleSpecial.Labs}
			kickerText="Live"
			showPulsingDot={true}
		/>
	</Section>
);
liveStory.storyName = 'With Live kicker';
liveStory.decorators = [splitTheme([liveFormat])];

export const noLinebreak: StoryObj = ({ format }: StoryArgs) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a headline with no kicker line break looks"
			isLabs={format.theme === ArticleSpecial.Labs}
			kickerText="Live"
			hasInlineKicker={true}
			showPulsingDot={true}
		/>
	</Section>
);
noLinebreak.storyName = 'With Live kicker but no line break';
noLinebreak.decorators = [splitTheme([liveFormat])];

export const pulsingDot: StoryObj = ({ format }: StoryArgs) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how a headline with a pulsing dot looks"
			isLabs={format.theme === ArticleSpecial.Labs}
			kickerText="Live"
			showPulsingDot={true}
		/>
	</Section>
);
pulsingDot.storyName = 'With pulsing dot';
pulsingDot.decorators = [splitTheme([liveFormat])];

export const opinionxxxsmall: StoryObj = ({ format }: StoryProps) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<LinkHeadline
			headlineText="This is how small links to opinion articles look"
			isLabs={format.theme === ArticleSpecial.Labs}
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
			isLabs={format.theme === ArticleSpecial.Labs}
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
			isLabs={format.theme === ArticleSpecial.Labs}
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
			isLabs={format.theme === ArticleSpecial.Labs}
			showQuotes={true}
			kickerText="Large live"
			showPulsingDot={true}
			size="large"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			isLabs={format.theme === ArticleSpecial.Labs}
			showQuotes={true}
			kickerText="Medium live"
			showPulsingDot={true}
			size="medium"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			isLabs={format.theme === ArticleSpecial.Labs}
			showQuotes={true}
			kickerText="Small live"
			showPulsingDot={true}
			size="small"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			isLabs={format.theme === ArticleSpecial.Labs}
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
			isLabs={format.theme === ArticleSpecial.Labs}
			showQuotes={true}
			kickerText="Large dead"
			showPulsingDot={false}
			size="large"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			isLabs={format.theme === ArticleSpecial.Labs}
			showQuotes={true}
			kickerText="Medium dead"
			showPulsingDot={false}
			size="medium"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			isLabs={format.theme === ArticleSpecial.Labs}
			showQuotes={true}
			kickerText="Small dead"
			showPulsingDot={false}
			size="small"
		/>
		<br />
		<LinkHeadline
			headlineText="Revealed: how US and UK spy agencies defeat internet privacy and security"
			isLabs={format.theme === ArticleSpecial.Labs}
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
			isLabs={format.theme === ArticleSpecial.Labs}
			showPulsingDot={true}
			hasInlineKicker={true}
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
