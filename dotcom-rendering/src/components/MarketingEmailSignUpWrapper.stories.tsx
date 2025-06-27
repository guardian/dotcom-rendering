import type { Meta, StoryObj } from '@storybook/react';
import { MarketingEmailSignUpWrapper } from './MarketingEmailSignUpWrapper';

const meta: Meta<typeof MarketingEmailSignUpWrapper> = {
	title: 'Components/MarketingEmailSignUpWrapper',
	component: MarketingEmailSignUpWrapper,
};

const defaultArgs = {
	index: 10,
	emailId: 'jobs',
	description:
		'Find your next job with the Guardian Jobs weekly email. Get the latest job listings, as well as tips and advice on taking your next career step.',
	name: 'Guardian Jobs',
	frequency: 'Weekly',
	emailType: 'marketingConsent',
	theme: 'news',
} satisfies Story['args'];
type Story = StoryObj<typeof MarketingEmailSignUpWrapper>;

export const DefaultStory: Story = {
	args: {
		...defaultArgs,
	},
};

export default meta;
