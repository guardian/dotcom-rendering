import { breakpoints } from '@guardian/source-foundations';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import type { ReactNode } from 'react';
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
	decorators: [withKnobs],
};

const hidePrivacyMessage = (): boolean => boolean('hidePrivacyMessage', false);

const Frame = ({ children }: { children: ReactNode }) => (
	<ContainerLayout
		title="EmailSignup"
		showTopBorder={true}
		sideBorders={true}
		padContent={false}
		centralBorder="partial"
	>
		{children}
	</ContainerLayout>
);

export const Default = () => (
	<Frame>
		<EmailSignup
			identityName="patriarchy"
			description="Reviewing the most important stories on feminism and sexism and those fighting for equality"
			name="The Week in Patriarchy"
			frequency="Weekly"
			successDescription="You have signed up, but the newsletter is fake"
			theme="opinion"
			hidePrivacyMessage={hidePrivacyMessage()}
		/>
	</Frame>
);

export const NewsTheme = () => (
	<Frame>
		<EmailSignup
			identityName="morning-briefing"
			description="Archie Bland and Nimo Omer take you through the top stories and what they mean, free every weekday morning"
			name="First Edition"
			frequency="Every weekday"
			successDescription="You have signed up, but the newsletter is fake"
			theme="news"
			hidePrivacyMessage={hidePrivacyMessage()}
		/>
	</Frame>
);

Default.story = { name: 'default' };
NewsTheme.story = { name: 'news theme' };
