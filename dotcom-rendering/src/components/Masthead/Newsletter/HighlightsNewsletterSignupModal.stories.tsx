import { mocked } from 'storybook/test';
import preview from '../../../../.storybook/preview';
import { newsletterCard } from '../../../../fixtures/manual/highlights-trails';
import {
	ArticleDesign,
	ArticleDisplay,
	Pillar,
} from '../../../lib/articleFormat';
import { lazyFetchEmailWithTimeout } from '../../../lib/fetchEmail';
import { useIsSignedIn } from '../../../lib/useAuthStatus';
import { useNewsletterSubscription } from '../../../lib/useNewsletterSubscription';
import { HighlightsNewsletterSignupModal } from './HighlightsNewsletterSignupModal';

const newsletter = newsletterCard.newsletterData!;

const meta = preview.meta({
	title: 'Components/Masthead/HighlightsNewsletterSignupModal',
	component: HighlightsNewsletterSignupModal,
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		newsletter,
		onClose: () => {},
	},
});

export default meta;

/** Signed-out user who has not yet subscribed – the default state. */
export const SignedOut = meta.story({
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
	beforeEach() {
		mocked(useNewsletterSubscription).mockReturnValue(true);
		mocked(useIsSignedIn).mockReturnValue(true);
		mocked(lazyFetchEmailWithTimeout).mockReturnValue(() =>
			Promise.resolve('test@example.com'),
		);
	},
});
