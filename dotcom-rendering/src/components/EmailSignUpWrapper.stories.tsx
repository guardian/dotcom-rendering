import type { StoryObj } from '@storybook/react-vite';
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
	exampleUrl: 'https://www.theguardian.com/email/the-recap',
	illustrationSquare:
		'https://i.guim.co.uk/img/uploads/2023/11/01/SaturdayEdition_-_5-3.jpg?width=220&dpr=2&s=none&crop=5%3A3',
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
