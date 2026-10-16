import { formatStorylinesDateRange } from './formatStorylinesDateRange';

describe('formatStorylinesDateRange', () => {
	it('formats the earliest article time as a "published since" range', () => {
		expect(formatStorylinesDateRange('2026-01-15T12:00:00Z', null)).toBe(
			'articles published since 15 January 2026',
		);
	});

	it('prefers the earliest time over the latest time when both are present', () => {
		expect(
			formatStorylinesDateRange(
				'2026-01-15T12:00:00Z',
				'2026-03-20T12:00:00Z',
			),
		).toBe('articles published since 15 January 2026');
	});

	it('falls back to the latest article time when there is no earliest time', () => {
		expect(formatStorylinesDateRange(null, '2026-03-20T12:00:00Z')).toBe(
			'articles published up to 20 March 2026',
		);
	});

	it('uses a generic message when neither time is provided', () => {
		expect(formatStorylinesDateRange(null, null)).toBe(
			'recent articles in our archives',
		);
		expect(formatStorylinesDateRange()).toBe(
			'recent articles in our archives',
		);
	});

	it('ignores unparseable dates rather than rendering NaN', () => {
		expect(formatStorylinesDateRange('not-a-date', null)).toBe(
			'recent articles in our archives',
		);
	});

	it('pins formatting to Europe/London so the day does not roll over by timezone', () => {
		// 23:30 UTC on 15 Jan is 00:30 on 16 Jan in London (BST would differ,
		// but in January London == UTC, so this stays on the 15th). Using a
		// time that is already the next day in some timezones ensures we assert
		// the London calendar date rather than the runtime's local date.
		expect(formatStorylinesDateRange('2026-06-15T23:30:00Z', null)).toBe(
			'articles published since 16 June 2026',
		);
	});
});
