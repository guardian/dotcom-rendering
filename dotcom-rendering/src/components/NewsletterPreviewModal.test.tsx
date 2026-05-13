import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { NewsletterPreviewModal } from './NewsletterPreviewModal';

const baseProps = {
	newsletterName: 'Morning Briefing',
	renderUrl:
		'https://email-rendering.guardianapis.com/fronts/email/europe/daily?variant=persephone&readonly=true&embed=true',
};

describe('NewsletterPreviewModal', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

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

	it('calls onClose after the close animation when clicking away from the dialog', () => {
		jest.useFakeTimers();

		try {
			const onClose = jest.fn();

			render(<NewsletterPreviewModal {...baseProps} onClose={onClose} />);

			const dialog = screen.getByRole('dialog');
			const overlay = dialog.parentElement;
			expect(overlay).not.toBeNull();

			fireEvent.mouseDown(dialog);
			expect(onClose).not.toHaveBeenCalled();

			fireEvent.mouseDown(overlay as HTMLElement);
			expect(onClose).not.toHaveBeenCalled();

			act(() => {
				jest.advanceTimersByTime(225);
			});

			expect(onClose).toHaveBeenCalledTimes(1);
		} finally {
			jest.useRealTimers();
		}
	});

	it('calls onClose after the close animation when Escape is pressed inside the dialog', () => {
		jest.useFakeTimers();

		try {
			const onClose = jest.fn();

			render(<NewsletterPreviewModal {...baseProps} onClose={onClose} />);

			const dialog = screen.getByRole('dialog');
			dialog.focus();

			fireEvent.keyDown(document, { key: 'Escape' });
			expect(onClose).not.toHaveBeenCalled();

			act(() => {
				jest.advanceTimersByTime(225);
			});

			expect(onClose).toHaveBeenCalledTimes(1);
		} finally {
			jest.useRealTimers();
		}
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

	it('shows a skeleton while loading and hides it once iframe is loaded', () => {
		render(<NewsletterPreviewModal {...baseProps} onClose={jest.fn()} />);

		expect(
			screen.getByLabelText('Loading newsletter preview'),
		).toBeInTheDocument();

		const iframe = screen.getByTitle('Morning Briefing preview');
		fireEvent.load(iframe);

		expect(
			screen.queryByLabelText('Loading newsletter preview'),
		).not.toBeInTheDocument();
		expect(
			screen.queryByText('Preview failed to load'),
		).not.toBeInTheDocument();
	});

	it('shows a timeout fallback and allows retrying the preview load', () => {
		jest.useFakeTimers();

		try {
			render(
				<NewsletterPreviewModal {...baseProps} onClose={jest.fn()} />,
			);

			act(() => {
				jest.advanceTimersByTime(10_000);
			});

			expect(
				screen.getByText('Preview failed to load'),
			).toBeInTheDocument();
			expect(
				screen.getByText(
					'The preview is taking longer than expected. You can retry loading it.',
				),
			).toBeInTheDocument();
			expect(
				screen.getByRole('button', { name: 'Retry preview' }),
			).toBeInTheDocument();

			fireEvent.click(
				screen.getByRole('button', { name: 'Retry preview' }),
			);

			expect(
				screen.getByLabelText('Loading newsletter preview'),
			).toBeInTheDocument();

			const iframe = screen.getByTitle('Morning Briefing preview');
			fireEvent.load(iframe);

			expect(
				screen.queryByText('Preview failed to load'),
			).not.toBeInTheDocument();
		} finally {
			jest.useRealTimers();
		}
	});

	it('shows failure state when iframe posts embed-status with ok=false', () => {
		render(<NewsletterPreviewModal {...baseProps} onClose={jest.fn()} />);
		const iframe = screen.getByTitle('Morning Briefing preview');
		if (!(iframe instanceof HTMLIFrameElement)) {
			throw new Error('Expected preview element to be an iframe');
		}
		const iframeSource = iframe.contentWindow;
		if (!iframeSource) {
			throw new Error('Expected iframe contentWindow to be available');
		}

		act(() => {
			window.dispatchEvent(
				new MessageEvent('message', {
					origin: 'https://email-rendering.guardianapis.com',
					source: iframeSource,
					data: { type: 'embed-status', ok: false, code: 500 },
				}),
			);
		});

		expect(screen.getByText('Preview failed to load')).toBeInTheDocument();
		expect(
			screen.getByText(
				'This preview is currently unavailable. Please try again shortly.',
			),
		).toBeInTheDocument();
	});

	it('keeps failure state when embed-status reports failure before iframe load event', () => {
		render(<NewsletterPreviewModal {...baseProps} onClose={jest.fn()} />);

		const iframe = screen.getByTitle('Morning Briefing preview');
		if (!(iframe instanceof HTMLIFrameElement)) {
			throw new Error('Expected preview element to be an iframe');
		}
		const iframeSource = iframe.contentWindow;
		if (!iframeSource) {
			throw new Error('Expected iframe contentWindow to be available');
		}

		act(() => {
			window.dispatchEvent(
				new MessageEvent('message', {
					origin: 'https://email-rendering.guardianapis.com',
					source: iframeSource,
					data: { type: 'embed-status', ok: false },
				}),
			);
		});

		fireEvent.load(iframe);

		expect(screen.getByText('Preview failed to load')).toBeInTheDocument();
		expect(
			screen.getByText(
				'This preview is currently unavailable. Please try again shortly.',
			),
		).toBeInTheDocument();
	});

	it('hides skeleton when iframe posts embed-status with ok=true', () => {
		render(<NewsletterPreviewModal {...baseProps} onClose={jest.fn()} />);
		const iframe = screen.getByTitle('Morning Briefing preview');
		if (!(iframe instanceof HTMLIFrameElement)) {
			throw new Error('Expected preview element to be an iframe');
		}
		const iframeSource = iframe.contentWindow;
		if (!iframeSource) {
			throw new Error('Expected iframe contentWindow to be available');
		}

		expect(
			screen.getByLabelText('Loading newsletter preview'),
		).toBeInTheDocument();

		act(() => {
			window.dispatchEvent(
				new MessageEvent('message', {
					origin: 'https://email-rendering.guardianapis.com',
					source: iframeSource,
					data: { type: 'embed-status', ok: true },
				}),
			);
		});

		expect(
			screen.queryByLabelText('Loading newsletter preview'),
		).not.toBeInTheDocument();
		expect(
			screen.queryByText('Preview failed to load'),
		).not.toBeInTheDocument();
	});

	it('ignores embed-status messages without a matching iframe source', () => {
		render(<NewsletterPreviewModal {...baseProps} onClose={jest.fn()} />);

		act(() => {
			window.dispatchEvent(
				new MessageEvent('message', {
					origin: 'https://email-rendering.guardianapis.com',
					data: { type: 'embed-status', ok: false },
				}),
			);
		});

		expect(
			screen.getByLabelText('Loading newsletter preview'),
		).toBeInTheDocument();
		expect(
			screen.queryByText('Preview failed to load'),
		).not.toBeInTheDocument();
	});
});
