import { breakpoints } from '@guardian/source-foundations';
import { WebEmailSignupWrapper } from './EmailSignupWrapper.importable';
import { Section } from './Section';

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
	component: WebEmailSignupWrapper,
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

export const Default = ({
	hidePrivacyMessage,
}: {
	hidePrivacyMessage?: boolean;
}) => (
	<WebEmailSignupWrapper
		skipToIndex={1}
		identityName="patriarchy"
		description="Reviewing the most important stories on feminism and sexism and those fighting for equality"
		name="The Week in Patriarchy"
		frequency="Weekly"
		successDescription="You have signed up, but the newsletter is fake"
		theme="opinion"
		hidePrivacyMessage={hidePrivacyMessage}
	/>
);

export const NewsTheme = ({
	hidePrivacyMessage,
}: {
	hidePrivacyMessage?: boolean;
}) => (
	<WebEmailSignupWrapper
		skipToIndex={1}
		identityName="morning-briefing"
		description="Archie Bland and Nimo Omer take you through the top stories and what they mean, free every weekday morning"
		name="First Edition"
		frequency="Every weekday"
		successDescription="You have signed up, but the newsletter is fake"
		theme="news"
		hidePrivacyMessage={hidePrivacyMessage}
	/>
);

export const IrregularFrequency = ({
	hidePrivacyMessage,
}: {
	hidePrivacyMessage?: boolean;
}) => (
	<WebEmailSignupWrapper
		skipToIndex={1}
		identityName="documentaries"
		description="Be the first to see our latest thought-provoking films, bringing you bold and original storytelling from around the world"
		name="Guardian Documentaries"
		frequency="Whenever a new film is available"
		successDescription="You have signed up, but the newsletter is fake"
		theme="features"
		hidePrivacyMessage={hidePrivacyMessage}
	/>
);

Default.storyName = 'default';
Default.story = {
	args: {
		hidePrivacyMessage: false,
	},
};
NewsTheme.storyName = 'news theme';
NewsTheme.story = {
	args: {
		hidePrivacyMessage: false,
	},
};
IrregularFrequency.storyName = 'irregular frequency';
IrregularFrequency.story = {
	args: {
		hidePrivacyMessage: false,
	},
};
