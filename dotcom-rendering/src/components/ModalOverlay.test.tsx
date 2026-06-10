import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ModalOverlay } from './ModalOverlay';

const renderOverlay = (onClose = jest.fn()) =>
	render(
		<ModalOverlay aria-labelledby="title-id" onClose={onClose}>
			<h2 id="title-id">Test modal</h2>
			<button type="button">First</button>
			<button type="button">Last</button>
		</ModalOverlay>,
	);

describe('ModalOverlay', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('renders a dialog with aria-modal', () => {
		renderOverlay();
		const dialog = screen.getByRole('dialog');
		expect(dialog).toBeInTheDocument();
		expect(dialog).toHaveAttribute('aria-modal', 'true');
	});

	it('locks body scroll while open and restores it on unmount', () => {
		const { unmount } = renderOverlay();
		expect(document.body.style.overflow).toBe('hidden');
		unmount();
		expect(document.body.style.overflow).toBe('');
	});

	it('calls onClose when the Escape key is pressed', () => {
		const onClose = jest.fn();
		renderOverlay(onClose);

		fireEvent.keyDown(document, { key: 'Escape' });

		act(() => {
			jest.runAllTimers();
		});

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('calls onClose when the overlay backdrop receives a mousedown', () => {
		const onClose = jest.fn();
		renderOverlay(onClose);

		const overlay = screen.getByRole('dialog').parentElement!;
		fireEvent.mouseDown(overlay);

		act(() => {
			jest.runAllTimers();
		});

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('does not call onClose when the dialog itself receives a mousedown', () => {
		const onClose = jest.fn();
		renderOverlay(onClose);

		fireEvent.mouseDown(screen.getByRole('dialog'));

		act(() => {
			jest.runAllTimers();
		});

		expect(onClose).not.toHaveBeenCalled();
	});
});
