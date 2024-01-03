import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { EmailSignup } from './EmailSignup';
import { Section } from './Section';
import { SecureSignup } from './SecureSignup';

const withSectionWrapper = (Story: typeof NewsTheme) => (
	<Section
		title="EmailSignup"
		showTopBorder={true}
		padContent={false}
		centralBorder="partial"
	>
		<Story />
	</Section>
);

export default {
	component: EmailSignup,
	title: 'Components/EmailSignup',
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.mobileMedium,
				breakpoints.phablet,
				breakpoints.tablet,
				breakpoints.desktop,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},
	decorators: [withSectionWrapper],
};

const defaultFormat: ArticleFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.Culture,
};

export const Default = ({
	hidePrivacyMessage,
}: {
	hidePrivacyMessage?: boolean;
}) => (
	<EmailSignup
		description="Reviewing the most important stories on feminism and sexism and those fighting for equality"
		name="The Week in Patriarchy"
		frequency="Weekly"
		theme="opinion"
	>
		<SecureSignup
			newsletterId="patriarchy"
			successDescription="Reviewing the most important stories on feminism and sexism and those fighting for equality"
		/>
	</EmailSignup>
);

export const NewsTheme = ({
	hidePrivacyMessage,
}: {
	hidePrivacyMessage?: boolean;
}) => (
	<EmailSignup
		description="Archie Bland and Nimo Omer take you through the top stories and what they mean, free every weekday morning"
		name="First Edition"
		frequency="Every weekday"
		theme="news"
	>
		<SecureSignup
			newsletterId="morning-briefing"
			successDescription="Archie Bland and Nimo Omer take you through the top stories and what they mean, free every weekday morning"
		/>
	</EmailSignup>
);

export const IrregularFrequency = ({
	hidePrivacyMessage,
}: {
	hidePrivacyMessage?: boolean;
}) => (
	<EmailSignup
		description="Be the first to see our latest thought-provoking films, bringing you bold and original storytelling from around the world"
		name="Guardian Documentaries"
		frequency="Whenever a new film is available"
		theme="features"
	>
		<SecureSignup
			newsletterId="documentaries"
			successDescription="Be the first to see our latest thought-provoking films, bringing you bold and original storytelling from around the world"
		/>
	</EmailSignup>
);

Default.storyName = 'default';
Default.story = {
	args: {
		hidePrivacyMessage: false,
	},
	decorators: [splitTheme([defaultFormat], { orientation: 'vertical' })],
};
NewsTheme.storyName = 'news theme';
NewsTheme.story = {
	args: {
		hidePrivacyMessage: false,
	},
	decorators: [
		splitTheme(
			[
				{
					...defaultFormat,
					theme: Pillar.News,
				},
			],
			{ orientation: 'vertical' },
		),
	],
};
IrregularFrequency.storyName = 'irregular frequency';
IrregularFrequency.story = {
	args: {
		hidePrivacyMessage: false,
	},
	decorators: [splitTheme([defaultFormat], { orientation: 'vertical' })],
};
