import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { newsletterCard } from '../../../../fixtures/manual/highlights-trails';
import { useNewsletterSubscription } from '../../../lib/useNewsletterSubscription';
import { ConfigProvider } from '../../ConfigContext';
import { HighlightsNewsletterSignupModal } from './HighlightsNewsletterSignupModal';

// Only mock what cannot run in jsdom: the signup form (reCAPTCHA, identity
// API) and the subscription hook (network + auth).  Everything else —
// the portal, dialog markup, close button, keyboard/overlay dismissal —
// is rendered and tested for real.

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

const newsletter = newsletterCard.newsletterData!;

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
			/>
		</ConfigProvider>,
	);

describe('HighlightsNewsletterSignupModal', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockUseNewsletterSubscription.mockReturnValue(false);
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

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('calls onClose when the Escape key is pressed', () => {
		const onClose = jest.fn();
		renderModal(onClose);

		fireEvent.keyDown(document, { key: 'Escape' });

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('calls onClose when the overlay backdrop is clicked', () => {
		const onClose = jest.fn();
		renderModal(onClose);

		// The overlay is the direct parent of the dialog; clicking it (but not
		// the dialog itself) should dismiss the modal.
		const overlay = screen.getByRole('dialog').parentElement!;
		fireEvent.click(overlay);

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('does not call onClose when the dialog itself is clicked', () => {
		const onClose = jest.fn();
		renderModal(onClose);

		fireEvent.click(screen.getByRole('dialog'));

		expect(onClose).not.toHaveBeenCalled();
	});

	it('locks body scroll while open', () => {
		renderModal();

		expect(document.body.style.overflow).toBe('hidden');
	});
});
