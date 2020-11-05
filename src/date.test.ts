// ----- Imports ----- //

import { formatDate } from './date';

// ----- Tests ----- //

describe('formatDate', () => {
	it('formats a given date in UTC correctly', () => {
		expect(formatDate(new Date('2020-03-11T17:25:00'))).toBe(
			'Wed 11 Mar 2020 17.25 UTC',
		);
	});

	it('formats zeroes correctly', () => {
		expect(formatDate(new Date('2005-01-02T02:01:23'))).toBe(
			'Sun 2 Jan 2005 02.01 UTC',
		);
	});
});
