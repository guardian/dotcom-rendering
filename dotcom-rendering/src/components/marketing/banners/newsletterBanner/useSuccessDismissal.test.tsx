import {
	act,
	fireEvent,
	render,
	screen as testingScreen,
} from '@testing-library/react';
import { useRef } from 'react';
import { useSuccessDismissal } from './useSuccessDismissal';

const onClose = jest.fn();

const TestBanner = ({ isSuccess = true }: { isSuccess?: boolean }) => {
	const bannerRef = useRef<HTMLDivElement>(null);
	const { isDismissing, dismiss, ...handlers } = useSuccessDismissal({
		isSuccess,
		bannerRef,
		onClose,
		durationMs: 350,
	});
	return (
		<div ref={bannerRef} {...handlers} data-testid="banner" tabIndex={-1}>
			<span>{isDismissing ? 'Dismissing' : 'Visible'}</span>
			<button onClick={dismiss}>Close</button>
			<button>Browse</button>
		</div>
	);
};

const advance = (duration: number) => {
	act(() => jest.advanceTimersByTime(duration));
};

describe('success banner dismissal', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		onClose.mockClear();
		jest.spyOn(window, 'matchMedia').mockReturnValue({
			matches: false,
		} as MediaQueryList);
	});

	afterEach(() => {
		jest.clearAllTimers();
		jest.useRealTimers();
		jest.restoreAllMocks();
	});

	it('waits seven seconds, then closes after the exit animation', () => {
		render(<TestBanner />);
		advance(6999);
		expect(testingScreen.getByText('Visible')).toBeInTheDocument();
		advance(1);
		expect(testingScreen.getByText('Dismissing')).toBeInTheDocument();
		expect(onClose).not.toHaveBeenCalled();
		advance(350);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('does not automatically dismiss before signup succeeds', () => {
		render(<TestBanner isSuccess={false} />);
		fireEvent.scroll(window);
		advance(10000);
		expect(testingScreen.getByText('Visible')).toBeInTheDocument();
		expect(onClose).not.toHaveBeenCalled();
	});

	it('preserves the remaining time while hovered', () => {
		render(<TestBanner />);
		advance(3000);
		fireEvent.mouseEnter(testingScreen.getByTestId('banner'));
		advance(10000);
		expect(testingScreen.getByText('Visible')).toBeInTheDocument();
		fireEvent.mouseLeave(testingScreen.getByTestId('banner'));
		advance(3999);
		expect(testingScreen.getByText('Visible')).toBeInTheDocument();
		advance(1);
		expect(testingScreen.getByText('Dismissing')).toBeInTheDocument();
	});

	it('pauses while controls have focus, including moves within the banner', () => {
		render(<TestBanner />);
		advance(2000);
		act(() => testingScreen.getByRole('button', { name: 'Close' }).focus());
		advance(10000);
		act(() =>
			testingScreen.getByRole('button', { name: 'Browse' }).focus(),
		);
		advance(10000);
		expect(testingScreen.getByText('Visible')).toBeInTheDocument();
		act(() => testingScreen.getByRole('button', { name: 'Browse' }).blur());
		advance(4999);
		expect(testingScreen.getByText('Visible')).toBeInTheDocument();
		advance(1);
		expect(testingScreen.getByText('Dismissing')).toBeInTheDocument();
	});

	it('only resumes when both hover and focus have ended', () => {
		render(<TestBanner />);
		fireEvent.mouseEnter(testingScreen.getByTestId('banner'));
		act(() => testingScreen.getByRole('button', { name: 'Close' }).focus());
		fireEvent.mouseLeave(testingScreen.getByTestId('banner'));
		advance(10000);
		expect(testingScreen.getByText('Visible')).toBeInTheDocument();
		act(() => testingScreen.getByRole('button', { name: 'Close' }).blur());
		advance(7000);
		expect(testingScreen.getByText('Dismissing')).toBeInTheDocument();
	});

	it('ignores banner scrolling but dismisses for article scrolling', () => {
		render(<TestBanner />);
		fireEvent.scroll(testingScreen.getByTestId('banner'));
		expect(testingScreen.getByText('Visible')).toBeInTheDocument();
		fireEvent.scroll(document);
		expect(testingScreen.getByText('Dismissing')).toBeInTheDocument();
		advance(350);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('animates a manual close and only closes once', () => {
		render(<TestBanner />);
		fireEvent.click(testingScreen.getByRole('button', { name: 'Close' }));
		fireEvent.scroll(window);
		expect(onClose).not.toHaveBeenCalled();
		advance(350);
		expect(onClose).toHaveBeenCalledTimes(1);
		advance(10000);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('skips the exit delay for reduced motion', () => {
		jest.mocked(window.matchMedia).mockReturnValue({
			matches: true,
		} as MediaQueryList);
		render(<TestBanner />);
		fireEvent.click(testingScreen.getByRole('button', { name: 'Close' }));
		advance(0);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('cleans up timers and scroll listeners on unmount', () => {
		const { unmount } = render(<TestBanner />);
		unmount();
		fireEvent.scroll(window);
		advance(10000);
		expect(onClose).not.toHaveBeenCalled();
	});
});
