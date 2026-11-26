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
	theme: 'sport',
	idApiUrl: 'https://idapi.theguardian.com',
	illustrationSquare:
		'https://media.guim.co.uk/efd4be7a85fd7fb5118c712b7087c758bbf45e6b/0_0_1000_1000/500.jpg',
} satisfies Story['args'];

export const SignedOut = meta.story({
	args: { ...defaultArgs },
	beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(false);
		mocked(useIsSignedIn).mockReturnValue(false);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve(null),
		);
	},
});

export const SignedIn = meta.story({
	args: { ...defaultArgs },
	beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(false);
		mocked(useIsSignedIn).mockReturnValue(true);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve('test@example.com'),
		);
	},
});

export const SignedInAlreadySubscribed = meta.story({
	args: { ...defaultArgs },
	beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(true);
		mocked(useIsSignedIn).mockReturnValue(true);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve('test@example.com'),
		);
	},
});

export const SignedOutAlreadySubscribed = meta.story({
	args: { ...defaultArgs },
	beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(true);
		mocked(useIsSignedIn).mockReturnValue(false);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve(null),
		);
	},
});

export const EmailInputFocused = meta.story({
	args: { ...defaultArgs },
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
