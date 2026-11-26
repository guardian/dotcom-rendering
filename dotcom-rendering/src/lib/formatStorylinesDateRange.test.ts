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

	it('pins formatting to the edition time zone so the day does not roll over by runtime timezone', () => {
		/**
		 * 23:30 UTC on 15 Jun is 00:30 on 16 Jun in London. Using a time that
		 * is already the next day in some timezones ensures we assert the
		 * edition calendar date rather than the runtime's local date. When no
		 * edition is supplied we default to UK (Europe/London).
		 */
		expect(formatStorylinesDateRange('2026-06-15T23:30:00Z', null)).toBe(
			'articles published since 16 June 2026',
		);
	});

	it('buckets the date in the US edition time zone (America/New_York)', () => {
		/**
		 * 03:00 UTC on 16 Jan is 22:00 on 15 Jan in New York (EST, UTC-5) but
		 * already 16 Jan in London. The US edition must show the New York date.
		 */
		expect(
			formatStorylinesDateRange('2026-01-16T03:00:00Z', null, 'US'),
		).toBe('articles published since 15 January 2026');
		/** The same instant on the UK edition stays on the 16th. */
		expect(
			formatStorylinesDateRange('2026-01-16T03:00:00Z', null, 'UK'),
		).toBe('articles published since 16 January 2026');
	});

	it('buckets the date in the AU edition time zone (Australia/Sydney)', () => {
		/** 14:00 UTC on 15 Jan is 01:00 on 16 Jan in Sydney (AEDT, UTC+11). */
		expect(
			formatStorylinesDateRange('2026-01-15T14:00:00Z', null, 'AU'),
		).toBe('articles published since 16 January 2026');
	});
});
