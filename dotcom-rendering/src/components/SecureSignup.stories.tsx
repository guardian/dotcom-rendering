import type { Meta, StoryObj } from '@storybook/react';
import { WebEmailSignUp as SignupComponent } from './EmailSignUpWrapper';

const meta: Meta<typeof SignupComponent> = {
	title: 'Components/Newsletter Signup',
	component: SignupComponent,
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
};
type Story = StoryObj<typeof SignupComponent>;

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
