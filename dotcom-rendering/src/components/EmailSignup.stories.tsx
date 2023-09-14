import { breakpoints } from '@guardian/source-foundations';
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
			name="The Week in Patriarchy"
			newsletterId="patriarchy"
			hidePrivacyMessage={hidePrivacyMessage}
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
			name="First Edition"
			newsletterId="morning-briefing"
			hidePrivacyMessage={hidePrivacyMessage}
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
			name="Guardian Documentaries"
			newsletterId="documentaries"
			hidePrivacyMessage={hidePrivacyMessage}
			successDescription="Be the first to see our latest thought-provoking films, bringing you bold and original storytelling from around the world"
		/>
	</EmailSignup>
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
