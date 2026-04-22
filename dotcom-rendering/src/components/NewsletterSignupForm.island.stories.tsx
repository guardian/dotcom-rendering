import { fn, mocked } from 'storybook/test';
import preview from '../../.storybook/preview';
import { useNewsletterSignupForm } from '../lib/useNewsletterSignupForm';
import type { NewsletterSignupFormState } from '../lib/useNewsletterSignupForm';
import { NewsletterSignupCard } from './NewsletterSignupCard';
import { NewsletterSignupForm } from './NewsletterSignupForm.island';
import { Section } from './Section';

const meta = preview.meta({
	title: 'Components/Newsletter Signup Form',
	component: NewsletterSignupForm,
	decorators: [
		(Story) => (
			<Section
				title="NewsletterSignupForm"
				showTopBorder={true}
				padContent={false}
				centralBorder="partial"
			>
				<NewsletterSignupCard
					name="Saturday Edition"
					frequency="Weekly"
					description="An exclusive roundup of the week's best Guardian journalism from the editor-in-chief, Katharine Viner, free to your inbox every Saturday."
					illustrationSquare="https://i.guim.co.uk/img/uploads/2023/11/01/SaturdayEdition_-_5-3.jpg?width=220&dpr=2&s=none&crop=5%3A3"
				>
					<Story />
				</NewsletterSignupCard>
			</Section>
		),
	],
});

const defaultArgs = {
	newsletterId: 'saturday-edition',
	newsletterName: 'Saturday Edition',
	frequency: 'every Saturday',
	onPreviewClick: fn(),
};

/** Shared no-op handlers — stories that focus on visual state don't need real callbacks. */
const noopHandlers: Pick<
	NewsletterSignupFormState,
	| 'handleEmailChange'
	| 'handleEmailFocus'
	| 'handleMarketingToggle'
	| 'handleSubmit'
	| 'handleSubmitButtonClick'
	| 'handleReset'
> = {
	handleEmailChange: fn(),
	handleEmailFocus: fn(),
	handleMarketingToggle: fn(),
	handleSubmit: fn(),
	handleSubmitButtonClick: fn(),
	handleReset: fn(),
};

const mockForm = (state: Partial<NewsletterSignupFormState>) => ({
	userEmail: undefined,
	hideEmailInput: false,
	isInteracted: false,
	showMarketingToggle: false,
	marketingOptIn: undefined,
	isWaitingForResponse: false,
	responseOk: undefined,
	errorMessage: undefined,
	...noopHandlers,
	...state,
});

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Signed-out idle state. Preview button appears above the form. */
export const SignedOut = meta.story({
	args: defaultArgs,
	beforeEach() {
		mocked(useNewsletterSignupForm).mockReturnValue(
			mockForm({ showMarketingToggle: false }),
		);
	},
});

/**
 * After the user focuses the email field — marketing toggle and privacy
 * message are revealed.
 */
export const SignedOutFocused = meta.story({
	args: defaultArgs,
	beforeEach() {
		mocked(useNewsletterSignupForm).mockReturnValue(
			mockForm({
				isInteracted: true,
				showMarketingToggle: true,
				marketingOptIn: true,
			}),
		);
	},
});

/** Signed-out user with an email typed in, ready to submit. */
export const SignedOutWithEmail = meta.story({
	args: defaultArgs,
	beforeEach() {
		mocked(useNewsletterSignupForm).mockReturnValue(
			mockForm({
				userEmail: 'reader@example.com',
				isInteracted: true,
				showMarketingToggle: true,
				marketingOptIn: true,
			}),
		);
	},
});

/**
 * Signed-in user — email pre-filled from Identity, email input hidden,
 * marketing toggle hidden, preview button moves into the submit row.
 */
export const SignedIn = meta.story({
	args: defaultArgs,
	beforeEach() {
		mocked(useNewsletterSignupForm).mockReturnValue(
			mockForm({
				userEmail: 'reader@example.com',
				hideEmailInput: true,
				isInteracted: true,
				showMarketingToggle: false,
			}),
		);
	},
});

/** Spinner shown while the POST request is in-flight; form is hidden. */
export const Loading = meta.story({
	args: defaultArgs,
	beforeEach() {
		mocked(useNewsletterSignupForm).mockReturnValue(
			mockForm({ isWaitingForResponse: true }),
		);
	},
});

/** Subscription confirmed. */
export const Success = meta.story({
	args: defaultArgs,
	beforeEach() {
		mocked(useNewsletterSignupForm).mockReturnValue(
			mockForm({ responseOk: true }),
		);
	},
});

/** Server returned a non-2xx response — error message and "Try again" button. */
export const SubmissionFailed = meta.story({
	args: defaultArgs,
	beforeEach() {
		mocked(useNewsletterSignupForm).mockReturnValue(
			mockForm({ responseOk: false }),
		);
	},
});

/** User submitted without entering an email — inline validation error. */
export const ValidationError = meta.story({
	args: defaultArgs,
	beforeEach() {
		mocked(useNewsletterSignupForm).mockReturnValue(
			mockForm({ errorMessage: 'Please enter a valid email address.' }),
		);
	},
});

/** Form without a preview button (no `onPreviewClick` prop). */
export const WithoutPreview = meta.story({
	args: { ...defaultArgs, onPreviewClick: undefined },
	beforeEach() {
		mocked(useNewsletterSignupForm).mockReturnValue(mockForm({}));
	},
});

/** `hidePrivacyMessage` — focused state without the privacy notice. */
export const HidePrivacyMessage = meta.story({
	args: { ...defaultArgs, hidePrivacyMessage: true },
	beforeEach() {
		mocked(useNewsletterSignupForm).mockReturnValue(
			mockForm({
				isInteracted: true,
				showMarketingToggle: true,
				marketingOptIn: true,
			}),
		);
	},
});
