import { breakpoints } from '@guardian/source-foundations';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { EmailSignup } from './EmailSignup';
import { Section } from './Section';

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
	decorators: [withKnobs],
};

const hidePrivacyMessage = (): boolean => boolean('hidePrivacyMessage', false);

export const Default = () => (
	<Section title="EmailSignup" padContent={false} centralBorder="partial">
		<EmailSignup
			identityName="patriarchy"
			description="Reviewing the most important stories on feminism and sexism and those fighting for equality"
			name="The Week in Patriarchy"
			frequency="Weekly"
			successDescription="You have signed up, but the newsletter is fake"
			theme="opinion"
			hidePrivacyMessage={hidePrivacyMessage()}
		/>
	</Section>
);
Default.story = { name: 'EmailSignup' };
