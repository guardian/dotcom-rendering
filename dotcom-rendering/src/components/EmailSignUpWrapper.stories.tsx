import type { StoryObj } from '@storybook/react-webpack5';
import { mocked, within } from 'storybook/test';
import preview from '../../.storybook/preview';
import { lazyFetchEmailWithTimeout } from '../lib/fetchEmail';
import { AB_TEST_NAME } from '../lib/newsletterSignupTracking';
import { useAB } from '../lib/useAB';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useNewsletterSubscription } from '../lib/useNewsletterSubscription';
import { EmailSignUpWrapper } from './EmailSignUpWrapper.island';

/** Resolves `useAB` as if the AB framework has hydrated, placing the user in control or variant. */
const mockAB = (
	variant: 'control' | 'variantNewField' | 'variantIllustratedCard',
) => {
	mocked(useAB).mockReturnValue({
		isUserInTestGroup: (_testName: string, group: string) =>
			group === variant,
		isUserInTest: () => true,
		getParticipations: () =>
			(variant !== 'control'
				? {
						[AB_TEST_NAME]: variant,
					}
				: {}) as Record<string, string>,
		trackABTests: () => ({}),
	});
};

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

export const Placeholder = meta.story({
	args: { ...defaultArgs },
	beforeEach() {
		mockAB('control');
		mocked(useNewsletterSubscription).mockReturnValue(undefined);
	},
});

export const DefaultStory = meta.story({
	args: { ...defaultArgs },
	beforeEach() {
		mockAB('control');
		mocked(useNewsletterSubscription).mockReturnValue(false);
		mocked(useIsSignedIn).mockReturnValue(false);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve(null),
		);
	},
});

export const DefaultStoryWithPrivacy = meta.story({
	args: { ...defaultArgs },
	beforeEach() {
		mockAB('control');
		mocked(useNewsletterSubscription).mockReturnValue(false);
		mocked(useIsSignedIn).mockReturnValue(false);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve(null),
		);
	},
});

export const SignedInNotSubscribed = meta.story({
	args: { ...defaultArgs },
	beforeEach() {
		mockAB('control');
		mocked(useNewsletterSubscription).mockReturnValue(false);
		mocked(useIsSignedIn).mockReturnValue(true);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve('test@example.com'),
		);
	},
});

export const SignedInAlreadySubscribed = meta.story({
	args: {
		...defaultArgs,
		hideNewsletterSignupComponentForSubscribers: true,
	},
	beforeEach() {
		mockAB('control');
		mocked(useNewsletterSubscription).mockReturnValue(true);
	},
});

export const FeatureFlagDisabled = meta.story({
	args: {
		...defaultArgs,
		hideNewsletterSignupComponentForSubscribers: false,
	},
	beforeEach() {
		mockAB('control');
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
		mockAB('variantIllustratedCard');
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
		mockAB('variantIllustratedCard');
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
		mockAB('variantIllustratedCard');
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
		mockAB('variantIllustratedCard');
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
		mockAB('variantIllustratedCard');
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
