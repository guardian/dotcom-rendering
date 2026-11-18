import { act, fireEvent, renderHook, waitFor } from '@testing-library/react';
import { subscribeToAuthStateChange } from './identity';
import type { PuzzleProgressItem } from './puzzleCardProgress';
import { loadPuzzleProgress } from './puzzleCardProgress';
import { usePuzzleProgress } from './usePuzzleProgress';

jest.mock('./identity', () => ({ subscribeToAuthStateChange: jest.fn() }));
jest.mock('./puzzleCardProgress', () => ({ loadPuzzleProgress: jest.fn() }));

const load = jest.mocked(loadPuzzleProgress);
const subscribe = jest.mocked(subscribeToAuthStateChange);
const initial: PuzzleProgressItem[] = [
	{
		puzzleType: 'CROSSWORD_QUICK',
		publishDate: '2026-11-05T00:00:00Z',
		progress: 0,
		gameStatus: 'not-started',
	},
];
const completed: PuzzleProgressItem[] = [
	{ ...initial[0]!, progress: 100, gameStatus: 'completed' },
];

beforeEach(() => {
	jest.resetAllMocks();
	subscribe.mockReturnValue(jest.fn());
	load.mockResolvedValue(initial);
});

it('refreshes on persisted pageshow but not the initial pageshow', async () => {
	const { result } = renderHook(usePuzzleProgress);
	await waitFor(() => expect(result.current).toEqual(initial));
	fireEvent(
		window,
		new PageTransitionEvent('pageshow', { persisted: false }),
	);
	expect(load).toHaveBeenCalledTimes(1);
	load.mockResolvedValue(completed);
	fireEvent(window, new PageTransitionEvent('pageshow', { persisted: true }));
	await waitFor(() => expect(result.current).toEqual(completed));
	expect(load).toHaveBeenCalledTimes(2);
});

it('continues refreshing when authentication changes', async () => {
	const { result } = renderHook(usePuzzleProgress);
	await waitFor(() => expect(result.current).toEqual(initial));
	load.mockResolvedValue(completed);
	act(() => subscribe.mock.calls[0]![0]());
	await waitFor(() => expect(result.current).toEqual(completed));
});

it('does not let an older request overwrite refreshed progress', async () => {
	let finishInitial: (items: PuzzleProgressItem[]) => void = () => undefined;
	load.mockReturnValueOnce(
		new Promise((resolve) => {
			finishInitial = resolve;
		}),
	).mockResolvedValue(completed);
	const { result } = renderHook(usePuzzleProgress);
	fireEvent(window, new PageTransitionEvent('pageshow', { persisted: true }));
	await waitFor(() => expect(result.current).toEqual(completed));
	await act(async () => {
		finishInitial(initial);
	});
	expect(result.current).toEqual(completed);
});

it('retains the last progress when refreshing is unavailable', async () => {
	const { result } = renderHook(usePuzzleProgress);
	await waitFor(() => expect(result.current).toEqual(initial));
	load.mockResolvedValue(undefined);
	fireEvent(window, new PageTransitionEvent('pageshow', { persisted: true }));
	await act(async () => undefined);
	expect(result.current).toEqual(initial);
});

it('removes both subscriptions when unmounted', async () => {
	const unsubscribe = jest.fn();
	subscribe.mockReturnValue(unsubscribe);
	const { unmount, result } = renderHook(usePuzzleProgress);
	await waitFor(() => expect(result.current).toEqual(initial));
	unmount();
	fireEvent(window, new PageTransitionEvent('pageshow', { persisted: true }));
	expect(load).toHaveBeenCalledTimes(1);
	expect(unsubscribe).toHaveBeenCalledTimes(1);
});
