import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { newsletterSignupCard } from '../../../../fixtures/manual/highlights-trails';
import { sendNewsletterSignupEvent } from '../../../lib/newsletterSignupTracking';
import { useNewsletterSubscription } from '../../../lib/useNewsletterSubscription';
import { ConfigProvider } from '../../ConfigContext';
import { HighlightsNewsletterSignupModal } from './HighlightsNewsletterSignupModal';

// Only mock what cannot run in jsdom: the signup form (reCAPTCHA, identity
// API) and the subscription hook (network + auth).

jest.mock('../../../lib/newsletterSignupTracking', () => ({
	sendNewsletterSignupEvent: jest.fn(),
	NEWSLETTER_SIGNUP_COMPONENT_ID: {
		highlightsCard: (id: string) => `highlights-card-${id}`,
		highlightsCardForm: (id: string) => `highlights-card-form-${id}`,
	},
}));

jest.mock('../../../lib/useNewsletterSubscription', () => ({
	useNewsletterSubscription: jest.fn(),
}));

jest.mock('../../NewsletterSignupForm.island', () => ({
	NewsletterSignupForm: jest.fn(
		({ isAlreadySubscribed }: { isAlreadySubscribed: boolean }) => (
			<div
				data-testid="newsletter-signup-form"
				data-already-subscribed={String(isAlreadySubscribed)}
			/>
		),
	),
}));

const mockUseNewsletterSubscription =
	useNewsletterSubscription as jest.MockedFunction<
		typeof useNewsletterSubscription
	>;

const newsletter = newsletterSignupCard.newsletterData!;
// Mirrors the mock factory above
const componentId = `highlights-card-${newsletter.identityName}`;

const renderModal = (onClose = jest.fn()) =>
	render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<HighlightsNewsletterSignupModal
				newsletter={newsletter}
				onClose={onClose}
				renderingTarget="Web"
				componentId={componentId}
			/>
		</ConfigProvider>,
	);

describe('HighlightsNewsletterSignupModal', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.useFakeTimers();
		mockUseNewsletterSubscription.mockReturnValue(false);
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('fires a VIEW event on mount with the correct identifiers', () => {
		renderModal();

		expect(sendNewsletterSignupEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				action: 'VIEW',
				identityName: newsletter.identityName,
				componentId,
				renderingTarget: 'Web',
				value: { eventDescription: 'highlights-card-modal-viewed' },
			}),
		);
	});

	it('renders a labelled dialog with the newsletter name', () => {
		renderModal();

		const dialog = screen.getByRole('dialog');
		expect(dialog).toBeInTheDocument();
		expect(dialog).toHaveAttribute('aria-modal', 'true');
		// The visually-hidden h2 provides the accessible name
		expect(
			screen.getByText(`Sign up to ${newsletter.name}`),
		).toBeInTheDocument();
	});

	it('renders the newsletter signup form', () => {
		renderModal();

		expect(
			screen.getByTestId('newsletter-signup-form'),
		).toBeInTheDocument();
	});

	it('shows the success state immediately when the user is already subscribed', () => {
		mockUseNewsletterSubscription.mockReturnValue(true);
		renderModal();

		expect(screen.getByTestId('newsletter-signup-form')).toHaveAttribute(
			'data-already-subscribed',
			'true',
		);
	});

	it('calls onClose when the close button is clicked', () => {
		const onClose = jest.fn();
		renderModal(onClose);

		fireEvent.click(
			screen.getByRole('button', { name: 'Close signup form' }),
		);

		act(() => {
			jest.runAllTimers();
		});

		expect(onClose).toHaveBeenCalledTimes(1);
	});
});
