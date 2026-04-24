import type { StoryObj } from '@storybook/react-webpack5';
import { mocked, within } from 'storybook/test';
import preview from '../../.storybook/preview';
import { lazyFetchEmailWithTimeout } from '../lib/fetchEmail';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useNewsletterSubscription } from '../lib/useNewsletterSubscription';
import { EmailSignUpWrapper } from './EmailSignUpWrapper.island';

const meta = preview.meta({
	title: 'Components/EmailSignUpWrapper',
	component: EmailSignUpWrapper,
});

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
	exampleUrl: 'https://www.theguardian.com/email/the-recap',
} satisfies Story['args'];

const newCardArgs = {
	...defaultArgs,
	showNewNewsletterSignupCard: true,
	hideNewsletterSignupComponentForSubscribers: true,
	illustrationSquare:
		'https://i.guim.co.uk/img/uploads/2023/11/01/SaturdayEdition_-_5-3.jpg?width=220&dpr=2&s=none&crop=5%3A3',
} satisfies Story['args'];

// Loading state - shows placeholder while auth status is being determined
// This prevents layout shift when subscription status is resolved
export const Placeholder = meta.story({
	args: {
		hidePrivacyMessage: false,
		...defaultArgs,
	},
	beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(undefined);
	},
});

// Default story - signed out user sees the signup form with email input
export const DefaultStory = meta.story({
	args: {
		hidePrivacyMessage: true,
		...defaultArgs,
	},
	beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(false);
		mocked(useIsSignedIn).mockReturnValue(false);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve(null),
		);
	},
});

export const DefaultStoryWithPrivacy = meta.story({
	args: {
		hidePrivacyMessage: false,
		...defaultArgs,
	},
	beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(false);
		mocked(useIsSignedIn).mockReturnValue(false);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve(null),
		);
	},
});

// User is signed in but NOT subscribed - email field is hidden, only signup button shows
export const SignedInNotSubscribed = meta.story({
	args: {
		hidePrivacyMessage: false,
		...defaultArgs,
	},
	beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(false);
		mocked(useIsSignedIn).mockReturnValue(true);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve('test@example.com'),
		);
	},
});

// User is signed in and IS subscribed - component returns null (hidden)
// Note: This story will render nothing as the component returns null when subscribed
// Requires hideNewsletterSignupComponentForSubscribers: true to enable the subscription check
export const SignedInAlreadySubscribed = meta.story({
	args: {
		hidePrivacyMessage: false,
		...defaultArgs,
		hideNewsletterSignupComponentForSubscribers: true,
	},
	beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(true);
	},
});

// Feature flag disabled - always shows signup form regardless of subscription status
// When hideNewsletterSignupComponentForSubscribers is false, the subscription check is skipped
export const FeatureFlagDisabled = meta.story({
	args: {
		hidePrivacyMessage: false,
		...defaultArgs,
		hideNewsletterSignupComponentForSubscribers: false,
	},
	beforeEach() {
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
				story: 'When the hideNewsletterSignupComponentForSubscribers feature flag is disabled, the signup form is always shown regardless of subscription status.',
			},
		},
	},
});

export const NewsletterSignupCardSignedInNotSubscribed = meta.story({
	args: newCardArgs,
	beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(false);
		mocked(useIsSignedIn).mockReturnValue(true);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve('test@example.com'),
		);
	},
});

export const NewsletterSignupCardSignedOutNotSubscribed = meta.story({
	args: newCardArgs,
	beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(false);
		mocked(useIsSignedIn).mockReturnValue(false);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve(null),
		);
	},
});

export const NewsletterSignupCardSignedInAlreadySubscribed = meta.story({
	args: newCardArgs,
	beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(true);
		mocked(useIsSignedIn).mockReturnValue(true);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve('test@example.com'),
		);
	},
});

export const NewsletterSignupCardSignedOutAlreadySubscribed = meta.story({
	args: newCardArgs,
	beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(true);
		mocked(useIsSignedIn).mockReturnValue(false);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve(null),
		);
	},
});

export const NewsletterSignupCardFocused = meta.story({
	args: newCardArgs,
	beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(false);
		mocked(useIsSignedIn).mockReturnValue(false);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve(null),
		);
	},
	async play({ canvasElement }) {
		const canvas = within(canvasElement);
		const emailInput = await canvas.findByLabelText('Enter your email');
		emailInput.focus();
	},
});
