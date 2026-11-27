import { renderHook } from '@testing-library/react';
import { reportPuzzleProgress } from './reporter';
import {
	IN_PROGRESS_DEBOUNCE_MS,
	useCrosswordProgressReporting,
} from './useCrosswordProgressReporting';

jest.mock('./reporter', () => ({
	reportPuzzleProgress: jest.fn(() => Promise.resolve(true)),
}));

const mockedReport = jest.mocked(reportPuzzleProgress);

const data = {
	number: 28000,
	date: 1790899200000,
	crosswordType: 'cryptic',
};

const change = (filledCells: number, isComplete = false) => ({
	progress: [],
	filledCells,
	totalCells: 100,
	isComplete,
});

beforeEach(() => {
	jest.useFakeTimers();
	mockedReport.mockClear();
});

afterEach(() => {
	jest.useRealTimers();
});

describe('useCrosswordProgressReporting', () => {
	it('reports only the last in-progress state after the reader stops typing', () => {
		const { result } = renderHook(() =>
			useCrosswordProgressReporting(data),
		);

		result.current(change(1));
		result.current(change(2));
		result.current(change(3));
		expect(mockedReport).not.toHaveBeenCalled();

		jest.advanceTimersByTime(IN_PROGRESS_DEBOUNCE_MS);

		expect(mockedReport).toHaveBeenCalledTimes(1);
		expect(mockedReport).toHaveBeenCalledWith(
			expect.objectContaining({ gameStatus: 'in-progress', progress: 3 }),
		);
	});

	it('reports completion straight away and drops the pending in-progress', () => {
		const { result } = renderHook(() =>
			useCrosswordProgressReporting(data),
		);

		result.current(change(99));
		result.current(change(100, true));

		expect(mockedReport).toHaveBeenCalledTimes(1);
		expect(mockedReport).toHaveBeenCalledWith(
			expect.objectContaining({ gameStatus: 'completed' }),
		);

		jest.advanceTimersByTime(IN_PROGRESS_DEBOUNCE_MS);
		expect(mockedReport).toHaveBeenCalledTimes(1);
	});

	it('reports not-started straight away when the grid is emptied', () => {
		const { result } = renderHook(() =>
			useCrosswordProgressReporting(data),
		);

		result.current(change(5));
		result.current(change(0));

		expect(mockedReport).toHaveBeenCalledTimes(1);
		expect(mockedReport).toHaveBeenCalledWith(
			expect.objectContaining({ gameStatus: 'not-started', progress: 0 }),
		);
	});

	it('reports what is still waiting when the reader leaves', () => {
		const { result, unmount } = renderHook(() =>
			useCrosswordProgressReporting(data),
		);

		result.current(change(7));
		unmount();

		expect(mockedReport).toHaveBeenCalledWith(
			expect.objectContaining({ gameStatus: 'in-progress', progress: 7 }),
		);
	});

	it('reports nothing for a crossword type the API does not know', () => {
		const { result } = renderHook(() =>
			useCrosswordProgressReporting({ ...data, crosswordType: 'speedy' }),
		);

		result.current(change(10));
		jest.advanceTimersByTime(IN_PROGRESS_DEBOUNCE_MS);

		expect(mockedReport).not.toHaveBeenCalled();
	});
});
