import type { PuzzleItem } from '../types/puzzlesPage';
import { cadenceForDate, withValidatedCadence } from './puzzleCadence';

const today = new Date('2026-10-12T10:00:00Z');

const item = (overrides: Partial<PuzzleItem>): PuzzleItem => ({
	id: 'sudoku-easy',
	title: 'Easy sudoku',
	type: 'sudoku',
	set: 'easy',
	cardVariant: 'compact',
	...overrides,
});

describe('cadenceForDate', () => {
	it('is "Today" for the current day in London', () => {
		expect(cadenceForDate('2026-10-12', today)).toBe('Today');
	});

	it('uses the London day, not the UTC one, around midnight', () => {
		// 23:30 UTC on 11 Oct is 00:30 on 12 Oct in London (BST).
		const afterMidnight = new Date('2026-10-11T23:30:00Z');
		expect(cadenceForDate('2026-10-12', afterMidnight)).toBe('Today');
		expect(cadenceForDate('2026-10-11', afterMidnight)).toBe('Sun 11 Oct');
	});

	it('is the short date otherwise, never "Yesterday"', () => {
		expect(cadenceForDate('2026-10-11', today)).toBe('Sun 11 Oct');
		expect(cadenceForDate('2026-10-10', today)).toBe('Sat 10 Oct');
		expect(cadenceForDate('2026-09-23', today)).toBe('Wed 23 Sep');
	});

	it('is undefined for something that is not a yyyy-MM-dd date', () => {
		expect(cadenceForDate('No 299', today)).toBeUndefined();
		expect(cadenceForDate('', today)).toBeUndefined();
	});
});

describe('withValidatedCadence', () => {
	it('corrects a label that no longer matches the card date', () => {
		const [corrected] = withValidatedCadence(
			[item({ date: '2026-10-11', cadence: 'Today' })],
			today,
		);
		expect(corrected?.cadence).toBe('Sun 11 Oct');
	});

	it('replaces a label the backend should not send any more', () => {
		const result = withValidatedCadence(
			[
				item({ date: '2026-10-11', cadence: 'Yesterday' }),
				item({
					id: 'crossword-quick',
					date: '2026-10-10',
					cadence: 'No 299',
				}),
			],
			today,
		);
		expect(result.map((i) => i.cadence)).toEqual([
			'Sun 11 Oct',
			'Sat 10 Oct',
		]);
	});

	it('keeps a correct label as the same object', () => {
		const correct = item({ date: '2026-10-12', cadence: 'Today' });
		expect(withValidatedCadence([correct], today)[0]).toBe(correct);
	});

	it('leaves a card without a date as it was sent', () => {
		const undated = item({ cadence: 'Today' });
		expect(withValidatedCadence([undated], today)[0]).toBe(undated);
	});
});
