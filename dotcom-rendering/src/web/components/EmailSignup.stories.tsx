import { breakpoints } from '@guardian/source-foundations';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { EmailSignup } from './EmailSignup';
import { Section } from './Section';

const withContainerLayoutWrapper = (Story: typeof NewsTheme) => (
	<ContainerLayout
		title="EmailSignup"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<Story />
	</ContainerLayout>
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
	decorators: [withContainerLayoutWrapper, withKnobs],
};

const hidePrivacyMessage = (): boolean => boolean('hidePrivacyMessage', false);

export const Default = () => (
	<EmailSignup
		identityName="patriarchy"
		description="Reviewing the most important stories on feminism and sexism and those fighting for equality"
		name="The Week in Patriarchy"
		frequency="Weekly"
		successDescription="You have signed up, but the newsletter is fake"
		theme="opinion"
		hidePrivacyMessage={hidePrivacyMessage()}
	/>
);

export const NewsTheme = () => (
	<EmailSignup
		identityName="morning-briefing"
		description="Archie Bland and Nimo Omer take you through the top stories and what they mean, free every weekday morning"
		name="First Edition"
		frequency="Every weekday"
		successDescription="You have signed up, but the newsletter is fake"
		theme="news"
		hidePrivacyMessage={hidePrivacyMessage()}
	/>
);

export const IrregularFrequency = () => (
	<EmailSignup
		identityName="documentaries"
		description="Be the first to see our latest thought-provoking films, bringing you bold and original storytelling from around the world"
		name="Guardian Documentaries"
		frequency="Whenever a new film is available"
		successDescription="You have signed up, but the newsletter is fake"
		theme="features"
		hidePrivacyMessage={hidePrivacyMessage()}
	/>
);

Default.story = { name: 'default' };
NewsTheme.story = { name: 'news theme' };
IrregularFrequency.story = { name: 'irregular frequency' };
