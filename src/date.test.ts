// ----- Imports ----- //

//import { act } from 'react-dom/test-utils';
import { some } from '@guardian/types';
import { formatDate, formatSeconds, fromString, isValidDate } from './date';

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

describe('isValidDate', () => {
	test('returns false given the inputted date is not a valid date', () => {
		const actual = isValidDate(new Date('randomValue'));
		expect(actual).toBeFalsy();
	});

	const validDateTestCases = [
		new Date(4),
		new Date('4'),
		new Date(),
		new Date(2021, 12, 25, 17, 58, 44),
		new Date('2019-01-16'),
	];

	validDateTestCases.forEach((date) => {
		test('returns true given the inputted date is valid', () => {
			const actual = isValidDate(date);
			expect(actual).toBeTruthy();
		});
	});

	// TODO: can we cover case for [object Date] line 47
});

describe('fromString', () => {
	test('returns correct date', () => {
		expect(fromString('2019/01/16')).toEqual(
			some(new Date('2019-01-16T00:00:00.000Z')),
		);
	});

	// TODO: Can we cover case for none?
});

describe('formatSeconds', () => {
	test('', () => {
		expect(formatSeconds('12'));
	});
});
