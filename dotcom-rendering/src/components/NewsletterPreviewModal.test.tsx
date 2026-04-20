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
		'https://email-rendering.guardianapis.com/fronts/email/europe/daily?variant=persephone&readonly=true',
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
		fireEvent.keyDown(dialog, { key: 'Tab' });

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
		fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });

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
		const overlay = dialog.parentElement;
		expect(overlay).not.toBeNull();

		fireEvent.mouseDown(dialog);
		expect(onClose).not.toHaveBeenCalled();

		fireEvent.mouseDown(overlay as HTMLElement);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('locks page scrolling while open and restores it on unmount', () => {
		const previousRootOverflow = document.documentElement.style.overflow;
		const previousBodyOverflow = document.body.style.overflow;

		document.documentElement.style.overflow = 'auto';
		document.body.style.overflow = 'scroll';

		const { unmount } = render(
			<NewsletterPreviewModal {...baseProps} onClose={jest.fn()} />,
		);
		let isUnmounted = false;

		try {
			expect(document.documentElement.style.overflow).toBe('hidden');
			expect(document.body.style.overflow).toBe('hidden');

			unmount();
			isUnmounted = true;

			expect(document.documentElement.style.overflow).toBe('auto');
			expect(document.body.style.overflow).toBe('scroll');
		} finally {
			if (!isUnmounted) {
				unmount();
			}
			document.documentElement.style.overflow = previousRootOverflow;
			document.body.style.overflow = previousBodyOverflow;
		}
	});
});
