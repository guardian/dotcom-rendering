import type { EventPayload } from '@guardian/ophan-tracker-js';
import { getOphan } from '../client/ophan/ophan';
import { trackPuzzlesHubScrollDepth } from './puzzlesHubScrollTracking';

jest.mock('../client/ophan/ophan', () => ({ getOphan: jest.fn() }));

const record = jest.fn<void, [EventPayload]>();
const originalScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY')!;
const originalHeight = Object.getOwnPropertyDescriptor(window, 'innerHeight')!;
const scrollTo = (value: number) => {
	Object.defineProperty(window, 'scrollY', { configurable: true, value });
	window.dispatchEvent(new Event('scroll'));
};
const sample = async () => {
	jest.advanceTimersByTime(16);
	await Promise.resolve();
};
let cleanupTracking: () => void;

beforeEach(() => {
	jest.useFakeTimers();
	document.body.innerHTML = '<main data-layout="PuzzlesPageLayout"></main>';
	Object.defineProperty(window, 'innerHeight', {
		configurable: true,
		value: 500,
	});
	Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
	jest.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(
		2000,
	);
	jest.mocked(getOphan).mockResolvedValue({ record } as never);
});
afterEach(() => {
	cleanupTracking();
	document.body.innerHTML = '';
	Object.defineProperty(window, 'scrollY', originalScrollY);
	Object.defineProperty(window, 'innerHeight', originalHeight);
	jest.useRealTimers();
	jest.restoreAllMocks();
	jest.clearAllMocks();
});

it('records initial coverage and each subsequently reached bucket once', async () => {
	cleanupTracking = trackPuzzlesHubScrollDepth();
	await sample();
	expect(record).toHaveBeenCalledWith({
		interaction: { component: 'puzzles-hub-scroll-depth', value: '25' },
	});
	scrollTo(1000);
	scrollTo(1000);
	await sample();
	scrollTo(0);
	await sample();
	scrollTo(1500);
	await sample();
	expect(
		record.mock.calls.map(([event]) => event.interaction?.value),
	).toEqual(['25', '50', '75', '100']);
});

it('does not duplicate milestones when pending Ophan requests resolve out of order', async () => {
	let resolveFirst!: (ophan: Awaited<ReturnType<typeof getOphan>>) => void;
	let resolveSecond!: typeof resolveFirst;
	jest.mocked(getOphan)
		.mockReturnValueOnce(
			new Promise((resolve) => {
				resolveFirst = resolve;
			}),
		)
		.mockReturnValueOnce(
			new Promise((resolve) => {
				resolveSecond = resolve;
			}),
		);
	cleanupTracking = trackPuzzlesHubScrollDepth();
	await sample();
	scrollTo(1000);
	await sample();
	expect(getOphan).toHaveBeenCalledTimes(2);
	expect(record).not.toHaveBeenCalled();

	resolveSecond({ record } as never);
	await Promise.resolve();
	resolveFirst({ record } as never);
	await Promise.resolve();
	expect(
		record.mock.calls.map(([event]) => event.interaction?.value),
	).toEqual(['25', '50', '75']);
});

it('does not track pages outside the Hub', async () => {
	document.body.innerHTML =
		'<main data-layout="PuzzlesArchiveLayout"></main>';
	cleanupTracking = trackPuzzlesHubScrollDepth();
	scrollTo(1500);
	await sample();
	expect(getOphan).not.toHaveBeenCalled();
});

it('cancels pending measurement and removes listeners on cleanup', async () => {
	cleanupTracking = trackPuzzlesHubScrollDepth();
	cleanupTracking();
	scrollTo(1500);
	await sample();
	expect(getOphan).not.toHaveBeenCalled();
});
