import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { mocked } from 'storybook/test';
import { lazyFetchEmailWithTimeout } from '../lib/fetchEmail';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useNewsletterSubscription } from '../lib/useNewsletterSubscription';
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
	idApiUrl: 'https://idapi.theguardian.com',
	hideNewsletterForSubscribers: true, // Feature flag enabled by default in stories
} satisfies Story['args'];

// Loading state - shows placeholder while auth status is being determined
// This prevents layout shift when subscription status is resolved
export const Placeholder: Story = {
	args: {
		hidePrivacyMessage: false,
		...defaultArgs,
	},
	async beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(undefined);
	},
};

// Default story - signed out user sees the signup form with email input
export const DefaultStory: Story = {
	args: {
		hidePrivacyMessage: true,
		...defaultArgs,
	},
	async beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(false);
		mocked(useIsSignedIn).mockReturnValue(false);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve(null),
		);
	},
};

export const DefaultStoryWithPrivacy: Story = {
	args: {
		hidePrivacyMessage: false,
		...defaultArgs,
	},
	async beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(false);
		mocked(useIsSignedIn).mockReturnValue(false);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve(null),
		);
	},
};

// User is signed in but NOT subscribed - email field is hidden, only signup button shows
export const SignedInNotSubscribed: Story = {
	args: {
		hidePrivacyMessage: false,
		...defaultArgs,
	},
	async beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(false);
		mocked(useIsSignedIn).mockReturnValue(true);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve('test@example.com'),
		);
	},
};

// User is signed in and IS subscribed - component returns null (hidden)
// Note: This story will render nothing as the component returns null when subscribed
export const SignedInAlreadySubscribed: Story = {
	args: {
		hidePrivacyMessage: false,
		...defaultArgs,
	},
	async beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(true);
	},
};

// Feature flag disabled - always shows signup form regardless of subscription status
// When hideNewsletterForSubscribers is false, the subscription check is skipped
export const FeatureFlagDisabled: Story = {
	args: {
		hidePrivacyMessage: false,
		...defaultArgs,
		hideNewsletterForSubscribers: false,
	},
	async beforeEach() {
		// Even though we mock this to return true (subscribed),
		// the feature flag being disabled means it won't be checked
		mocked(useNewsletterSubscription).mockReturnValue(false);
		mocked(useIsSignedIn).mockReturnValue(true);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve('test@example.com'),
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'When the hideNewsletterForSubscribers feature flag is disabled, the signup form is always shown regardless of subscription status.',
			},
		},
	},
};

export default meta;
