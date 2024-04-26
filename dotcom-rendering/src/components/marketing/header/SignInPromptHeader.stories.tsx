/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/4925ef1e0ced5d221f1122afe79f93bd7448e0e5/packages/modules/src/modules/headers/SignInPromptHeader.stories.tsx
 */
import type { Meta, StoryFn } from '@storybook/react';
import { HeaderDecorator } from './common/HeaderDecorator';
import { SignInPromptHeaderUnvalidated as SignInPromptHeader } from './SignInPromptHeader';

export default {
	component: SignInPromptHeader,
	title: 'Components/marketing/SignInPromptHeader',
	decorators: [HeaderDecorator],
} as Meta<typeof SignInPromptHeader>;

const Template: StoryFn<typeof SignInPromptHeader> = (props) => (
	<SignInPromptHeader {...props} />
);

const baseArgs = {
	content: {
		heading: 'Thank you for subscribing',
		subheading: 'Remember to sign in for a better experience',
		primaryCta: {
			baseUrl: 'https://profile.theguardian.com/register',
			text: 'Complete registration',
		},
		benefits: [
			'Ad free',
			'Fewer interruptions',
			'Newsletters and comments',
			'Ad free',
		],
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

export const DefaultHeader = Template.bind({});
DefaultHeader.args = baseArgs;

export const ManyBenefits = Template.bind({});
ManyBenefits.args = {
	...baseArgs,
	content: {
		...baseArgs.content,
		benefits: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'],
	},
};

export const WithoutBenefits = Template.bind({});
const { benefits, ...contentWithoutBenefits } = baseArgs.content;
WithoutBenefits.args = {
	...baseArgs,
	content: contentWithoutBenefits,
};
