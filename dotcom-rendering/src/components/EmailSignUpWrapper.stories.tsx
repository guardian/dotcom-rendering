import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
	signedInDecorator,
	signedOutDecorator,
} from '../../.storybook/decorators/authDecorator';
import { EmailSignUpWrapper } from './EmailSignUpWrapper.importable';

const meta: Meta<typeof EmailSignUpWrapper> = {
	title: 'Components/EmailSignUpWrapper',
	component: EmailSignUpWrapper,
};

type Story = StoryObj<typeof EmailSignUpWrapper>;

const defaultArgs = {
	index: 10,
	listId: 4147,
	identityName: 'the-recap',
	description:
		"The best of our sports journalism from the past seven days and a heads-up on the weekend's action",
	name: 'The Recap',
	frequency: 'Weekly',
	successDescription: "We'll send you The Recap every week",
	theme: 'sport',
} satisfies Story['args'];

// Default story - signed out user sees the signup form
export const DefaultStory: Story = {
	args: {
		hidePrivacyMessage: true,
		...defaultArgs,
	},
	decorators: [signedOutDecorator],
};

export const DefaultStoryWithPrivacy: Story = {
	args: {
		hidePrivacyMessage: false,
		...defaultArgs,
	},
	decorators: [signedOutDecorator],
};

// User is signed in but NOT subscribed - signup form is visible
export const SignedInNotSubscribed: Story = {
	args: {
		hidePrivacyMessage: false,
		...defaultArgs,
	},
	decorators: [signedInDecorator([])],
};

// User is signed in and IS subscribed - component returns null (hidden)
// Note: This story will render nothing as the component returns null when subscribed
export const SignedInAlreadySubscribed: Story = {
	args: {
		hidePrivacyMessage: false,
		...defaultArgs,
	},
	decorators: [signedInDecorator([{ listId: String(defaultArgs.listId) }])],
};

export default meta;
