// ----- Imports ----- //

//import { act } from 'react-dom/test-utils';
import { none, some } from '@guardian/types';
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
		expect(actual).toBe(false);
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
			expect(actual).toBe(true);
		});
	});

	test(`returns false if the argument is not a Date object`, () => {
		const fakeDate = (undefined as unknown) as Date;
		const fakeDate2 = ('some string' as unknown) as Date;
		expect(isValidDate(fakeDate)).toBe(false);
		expect(isValidDate(fakeDate2)).toBe(false);
	});
});

describe('fromString', () => {
	test('returns correct date', () => {
		expect(fromString('2019/01/16')).toEqual(
			some(new Date('2019-01-16T00:00:00.000Z')),
		);
	});

	test('returns none given a non valid date string', () => {
		expect(fromString((undefined as unknown) as string)).toEqual(none);
		expect(fromString('random')).toEqual(none);
	});
});

describe('formatSeconds', () => {
	test('returns none given a string is not a number', () => {
		expect(formatSeconds('randomString')).toEqual(none);
	});

	test('returns none', () => {
		expect(formatSeconds('-10')).toEqual(none);
	});

    test('returns correct format when given a valid number string', () => {
        expect(formatSeconds('0')).toEqual(some('00:00'));
        expect(formatSeconds('30')).toEqual(some('00:30'));
        expect(formatSeconds('60')).toEqual(some('01:00'));
        expect(formatSeconds('61')).toEqual(some('01:01'));
        expect(formatSeconds('3600')).toEqual(some('01:00:00'));
        expect(formatSeconds('3620.10')).toEqual(some('01:00:20'));
    });
});
