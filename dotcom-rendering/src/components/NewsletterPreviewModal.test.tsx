import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { NewsletterPreviewModal } from './NewsletterPreviewModal';

const FOCUSABLE_SELECTOR =
	'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

const getVisibleFocusableElements = (dialog: HTMLElement): HTMLElement[] =>
	Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
		(element) => {
			const computedStyle = window.getComputedStyle(element);
			return (
				computedStyle.display !== 'none' &&
				computedStyle.visibility !== 'hidden' &&
				element.getAttribute('aria-hidden') !== 'true'
			);
		},
	);

const baseProps = {
	newsletterName: 'Morning Briefing',
	renderUrl:
		'https://email-rendering.guardianapis.com/fronts/world/newsletters/morning-mail?variant=persephone&readonly=true',
};

describe('NewsletterPreviewModal', () => {
	it('renders a labelled dialog and focuses it on mount', () => {
		render(<NewsletterPreviewModal {...baseProps} onClose={jest.fn()} />);

		const dialog = screen.getByRole('dialog', {
			name: 'Morning Briefing preview',
		});

		expect(dialog).toBeInTheDocument();
		expect(dialog).toHaveFocus();
	});

	it('traps focus when tabbing forward from the last focusable element', () => {
		render(<NewsletterPreviewModal {...baseProps} onClose={jest.fn()} />);

		const dialog = screen.getByRole('dialog');
		const focusableElements = getVisibleFocusableElements(dialog);
		const firstFocusable = focusableElements[0];
		const lastFocusable = focusableElements[focusableElements.length - 1];

		expect(firstFocusable).toBeDefined();
		expect(lastFocusable).toBeDefined();

		lastFocusable?.focus();
		fireEvent.keyDown(document, { key: 'Tab' });

		expect(firstFocusable).toHaveFocus();
	});

	it('traps focus when tabbing backwards from the first focusable element', () => {
		render(<NewsletterPreviewModal {...baseProps} onClose={jest.fn()} />);

		const dialog = screen.getByRole('dialog');
		const focusableElements = getVisibleFocusableElements(dialog);
		const firstFocusable = focusableElements[0];
		const lastFocusable = focusableElements[focusableElements.length - 1];

		expect(firstFocusable).toBeDefined();
		expect(lastFocusable).toBeDefined();

		firstFocusable?.focus();
		fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });

		expect(lastFocusable).toHaveFocus();
	});

	it('restores focus to previously focused element on unmount', () => {
		const trigger = document.createElement('button');
		trigger.textContent = 'Open preview';
		document.body.appendChild(trigger);
		trigger.focus();

		const { unmount } = render(
			<NewsletterPreviewModal {...baseProps} onClose={jest.fn()} />,
		);

		expect(screen.getByRole('dialog')).toHaveFocus();

		unmount();

		expect(trigger).toHaveFocus();
		document.body.removeChild(trigger);
	});

	it('calls onClose when clicking away from the dialog', () => {
		const onClose = jest.fn();

		render(<NewsletterPreviewModal {...baseProps} onClose={onClose} />);

		const dialog = screen.getByRole('dialog');

		fireEvent.mouseDown(dialog);
		expect(onClose).not.toHaveBeenCalled();

		fireEvent.mouseDown(document.body);
		expect(onClose).toHaveBeenCalledTimes(1);
	});
});
