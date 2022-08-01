import { breakpoints } from '@guardian/source-foundations';
import { ContainerLayout } from './ContainerLayout';
import { EmailSignup } from './EmailSignup';

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
};

export const Default = () => (
	<ContainerLayout
		title="EmailSignup"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		<EmailSignup
			identityName="patriarchy"
			description="Reviewing the most important stories on feminism and sexism and those fighting for equality"
			name="The Week in Patriarchy"
			frequency="Weekly"
			successDescription="You have signed up, but the newsletter is fake"
			theme="opinion"
		/>
	</ContainerLayout>
);
Default.story = { name: 'EmailSignup' };
