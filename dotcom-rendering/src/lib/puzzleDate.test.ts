import { formatPuzzleDate } from './puzzleDate';

describe('formatPuzzleDate', () => {
	it('formats a YYYY-MM-DD string as a human-readable date', () => {
		expect(formatPuzzleDate('2026-09-15')).toBe('15 September 2026');
	});

	it('formats single-digit days/months correctly', () => {
		expect(formatPuzzleDate('2026-01-05')).toBe('5 January 2026');
	});

	it('returns null when puzzleDate is undefined', () => {
		expect(formatPuzzleDate(undefined)).toBeNull();
	});

	it('returns null for an unparseable date string', () => {
		expect(formatPuzzleDate('not-a-date')).toBeNull();
	});
});
