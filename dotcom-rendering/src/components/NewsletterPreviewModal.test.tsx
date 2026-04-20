import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { NewsletterPreviewModal } from './NewsletterPreviewModal';

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

	it('keeps focus inside the dialog when tabbing forwards from the end', () => {
		const outsideButton = document.createElement('button');
		outsideButton.textContent = 'Outside control';
		document.body.appendChild(outsideButton);

		try {
			render(
				<NewsletterPreviewModal {...baseProps} onClose={jest.fn()} />,
			);

			const dialog = screen.getByRole('dialog');

			expect(dialog).toHaveFocus();
			outsideButton.focus();
			expect(outsideButton).toHaveFocus();

			dialog.focus();
			fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
			const lastFocusable = document.activeElement as HTMLElement;
			expect(dialog).toContainElement(lastFocusable);

			fireEvent.keyDown(document, { key: 'Tab' });
			expect(dialog).toContainElement(
				document.activeElement as HTMLElement,
			);

			expect(outsideButton).not.toHaveFocus();
		} finally {
			document.body.removeChild(outsideButton);
		}
	});

	it('keeps focus inside the dialog when tabbing backwards from the start', () => {
		const outsideButton = document.createElement('button');
		outsideButton.textContent = 'Outside control';
		document.body.appendChild(outsideButton);

		try {
			render(
				<NewsletterPreviewModal {...baseProps} onClose={jest.fn()} />,
			);

			const dialog = screen.getByRole('dialog');

			expect(dialog).toHaveFocus();
			outsideButton.focus();
			expect(outsideButton).toHaveFocus();

			dialog.focus();
			fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
			expect(dialog).toContainElement(
				document.activeElement as HTMLElement,
			);

			expect(outsideButton).not.toHaveFocus();
		} finally {
			document.body.removeChild(outsideButton);
		}
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

	it('calls onClose when Escape is pressed while focus is inside dialog', () => {
		const onClose = jest.fn();

		render(<NewsletterPreviewModal {...baseProps} onClose={onClose} />);

		const dialog = screen.getByRole('dialog');
		dialog.focus();

		fireEvent.keyDown(document, { key: 'Escape' });

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
