/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/4925ef1e0ced5d221f1122afe79f93bd7448e0e5/packages/modules/src/modules/headers/Header.stories.tsx
 */
import type { Meta } from '@storybook/react';
import { HeaderDecorator } from './common/HeaderDecorator';
import { HeaderUnvalidated as Header } from './Header';

const baseArgs = {
	content: {
		heading: 'Support the Guardian',
		subheading: 'Available for everyone, funded by readers',
		primaryCta: {
			baseUrl: 'https://support.theguardian.com/contribute',
			text: 'Contribute',
		},
	},
	mobileContent: {
		heading: '',
		subheading: '',
		primaryCta: {
			baseUrl: 'https://support.theguardian.com/contribute',
			text: 'Support us',
		},
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
	},
	countryCode: 'GB',
};

export default {
	component: Header,
	title: 'Components/marketing/Header',
	decorators: [HeaderDecorator],
	render: (props) => <Header {...props} />,
	args: baseArgs,
} as Meta<typeof Header>;

export const DefaultHeader = {};

export const WithSecondaryCta = {
	args: {
		content: {
			...baseArgs.content,
			secondaryCta: {
				baseUrl: 'https://support.theguardian.com/subscribe',
				text: 'Subscribe',
			},
		},
	},
};

export const ThankYouHeader = {
	args: {
		content: {
			heading: 'Thank you',
			subheading: 'Your support powers our independent journalism',
			primaryCta: undefined,
			secondaryCta: undefined,
		},
		mobileContent: undefined,
	},
};
