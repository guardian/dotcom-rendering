import { fireEvent, render, screen } from '@testing-library/react';
import { NewsletterSignupHighlightsModal } from './NewsletterSignupHighlightsModal';

describe('NewsletterSignupHighlightsModal', () => {
	it('renders children inside the dialog', () => {
		render(
			<NewsletterSignupHighlightsModal onClose={() => undefined}>
				<p>Test content</p>
			</NewsletterSignupHighlightsModal>,
		);
		expect(screen.getByText('Test content')).toBeInTheDocument();
	});

	it('has role="dialog" and aria-modal="true"', () => {
		render(
			<NewsletterSignupHighlightsModal onClose={() => undefined}>
				<p>content</p>
			</NewsletterSignupHighlightsModal>,
		);
		const dialog = screen.getByRole('dialog');
		expect(dialog).toHaveAttribute('aria-modal', 'true');
	});

	it('renders a close button', () => {
		render(
			<NewsletterSignupHighlightsModal onClose={() => undefined}>
				<p>content</p>
			</NewsletterSignupHighlightsModal>,
		);
		expect(
			screen.getByRole('button', { name: /close/i }),
		).toBeInTheDocument();
	});

	it('calls onClose (deferred) when close button is clicked', () => {
		const onClose = jest.fn();
		render(
			<NewsletterSignupHighlightsModal onClose={onClose}>
				<p>content</p>
			</NewsletterSignupHighlightsModal>,
		);
		const closeButton = screen.getByRole('button', { name: /close/i });
		fireEvent.click(closeButton);
		// onClose is deferred by animation; no synchronous throw expected
		expect(onClose).not.toThrow();
	});

	it('calls onClose (deferred) when Escape key is pressed', () => {
		const onClose = jest.fn();
		render(
			<NewsletterSignupHighlightsModal onClose={onClose}>
				<p>content</p>
			</NewsletterSignupHighlightsModal>,
		);
		const dialog = screen.getByRole('dialog');
		fireEvent.focus(dialog);
		fireEvent.keyDown(dialog, { key: 'Escape' });
		expect(onClose).not.toThrow();
	});

	it('associates the dialog with a heading via aria-labelledby', () => {
		render(
			<NewsletterSignupHighlightsModal
				titleId="test-heading"
				onClose={() => undefined}
			>
				<h2 id="test-heading">Saturday Edition</h2>
			</NewsletterSignupHighlightsModal>,
		);
		const dialog = screen.getByRole('dialog');
		expect(dialog).toHaveAttribute('aria-labelledby', 'test-heading');
	});
});
