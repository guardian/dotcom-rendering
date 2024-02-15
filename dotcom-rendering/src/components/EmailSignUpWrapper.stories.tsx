import type { Meta, StoryObj } from '@storybook/react';
import { EmailSignUpWrapper } from './EmailSignUpWrapper';

const meta: Meta<typeof EmailSignUpWrapper> = {
	title: 'Components/EmailSignUpWrapper',
	component: EmailSignUpWrapper,
};

const defaultArgs = {
	index: 10,
	identityName: 'the-recap',
	description:
		'The best of our sports journalism from the past seven days and a heads-up on the weekend’s action',
	name: 'The Recap',
	frequency: 'Weekly',
	successDescription: "We'll send you The Recap every week",
	theme: 'sport',
} satisfies Story['args'];
type Story = StoryObj<typeof EmailSignUpWrapper>;

export const DefaultStory: Story = {
	args: {
		hidePrivacyMessage: true,
		...defaultArgs,
	},
};

export const DefaultStoryWithPrivacy: Story = {
	args: {
		hidePrivacyMessage: false,
		...defaultArgs,
	},
};

export default meta;
