import { SecondaryCtaType } from '@guardian/support-dotcom-components';
import type { Meta } from '@storybook/react';
import { props } from '../utils/storybook';
import { SignInPromptBanner } from './SignInPromptBanner';

const baseArgs = {
	...props,
	content: {
		heading: 'Thank you for subscribing',
		paragraphs: [
			'Remember to sign in for a better experience',
			'Ad free',
			'Fewer interruptions',
			'Newsletters and comments',
		],
		cta: {
			baseUrl: 'https://profile.theguardian.com/register',
			text: 'Complete registration',
		},
		secondaryCta: {
			type: SecondaryCtaType.Custom,
			cta: {
				baseUrl: '',
				text: 'Not now',
			},
		},
	},
};

export default {
	component: SignInPromptBanner,
	title: 'Components/marketing/SignInPromptBanner',
	render: (args) => <SignInPromptBanner {...args} />,
	args: baseArgs,
} as Meta<typeof SignInPromptBanner>;

export const Default = {};
