import type { StoryObj } from '@storybook/react-webpack5';
import { mocked } from 'storybook/test';
import preview from '../../../../.storybook/preview';
import { newsletterSignupCard } from '../../../../fixtures/manual/highlights-trails';
import { lazyFetchEmailWithTimeout } from '../../../lib/fetchEmail';
import { NEWSLETTER_SIGNUP_COMPONENT_ID } from '../../../lib/newsletterSignupTracking';
import { useIsSignedIn } from '../../../lib/useAuthStatus';
import { useNewsletterSubscription } from '../../../lib/useNewsletterSubscription';
import { HighlightsNewsletterSignupModal } from './HighlightsNewsletterSignupModal';

const newsletter = newsletterSignupCard.newsletterData!;

const meta = preview.meta({
	title: 'Components/Masthead/HighlightsNewsletterSignupModal',
	component: HighlightsNewsletterSignupModal,
});

export default meta;

type Story = StoryObj<typeof HighlightsNewsletterSignupModal>;

const defaultArgs = {
	newsletter,
	onClose: () => undefined,
	renderingTarget: 'Web',
	componentId: NEWSLETTER_SIGNUP_COMPONENT_ID.highlightsCard(
		newsletter.identityName,
	),
} satisfies Story['args'];

/** Signed-out user who has not yet subscribed – the default state. */
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

/** Signed-in user who has not yet subscribed. */
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

/** User who is already subscribed – the form shows the success/subscribed state. */
export const SignedUp = meta.story({
	args: { ...defaultArgs },
	beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(true);
		mocked(useIsSignedIn).mockReturnValue(true);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve('test@example.com'),
		);
	},
});
