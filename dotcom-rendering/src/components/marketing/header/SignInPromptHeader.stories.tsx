/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/4925ef1e0ced5d221f1122afe79f93bd7448e0e5/packages/modules/src/modules/headers/SignInPromptHeader.stories.tsx
 */
import type { Meta } from '@storybook/react';
import { HeaderDecorator } from './common/HeaderDecorator';
import { SignInPromptHeaderUnvalidated as SignInPromptHeader } from './SignInPromptHeader';

const baseArgs = {
	content: {
		heading: 'Thank you for subscribing',
		subheading: 'Remember to sign in for a better experience',
		primaryCta: {
			baseUrl: 'https://profile.theguardian.com/register',
			text: 'Complete registration',
		},
	},
	mobileContent: {
		heading: '',
		subheading: '',
	},
	tracking: {
		ophanPageId: 'pvid',
		platformId: 'GUARDIAN_WEB',
		referrerUrl: 'https://theguardian.com/uk',
		clientName: 'dcr',
		abTestName: 'test-name',
		abTestVariant: 'variant-name',
		campaignCode: 'campaign-code',
		componentType: 'ACQUISITIONS_HEADER',
	} as const,
	countryCode: 'GB',
};

export default {
	component: SignInPromptHeader,
	title: 'Components/marketing/SignInPromptHeader',
	decorators: [HeaderDecorator],
	render: (props) => <SignInPromptHeader {...props} />,
	args: baseArgs,
} as Meta<typeof SignInPromptHeader>;

export const DefaultHeader = {};
