// ----- Imports ----- //

import { none, some } from '@guardian/types';
import {
	formatDate,
	formatSeconds,
	formatLocalTimeDateTz,
	fromString,
	isValidDate,
	makeRelativeDate,
} from './date';

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

describe('formatLocalTimeDateTz', () => {
	test('returns correct local time zone (local timezone is Europe/London set in TZ global variable)', () => {
		expect(formatLocalTimeDateTz(new Date('2020-03-11T17:25:00'))).toBe(
			'05.25pm 11 Mar 2020 GMT',
		);
	});

	test('returns Europe/London local time for non UTC time', () => {
		expect(formatLocalTimeDateTz(new Date('2012/02/10 10:10:30 +0180'))).toBe(
			'07.50am 10 Feb 2012 GMT',
		);
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
		expect(formatSeconds('0')).toEqual(some('0:00'));
		expect(formatSeconds('30')).toEqual(some('0:30'));
		expect(formatSeconds('60')).toEqual(some('1:00'));
		expect(formatSeconds('61')).toEqual(some('1:01'));
		expect(formatSeconds('3600')).toEqual(some('1:00:00'));
		expect(formatSeconds('3620.67')).toEqual(some('1:00:20'));
	});
});

describe('makeRelativeDate', () => {
	beforeEach(() => {
		const fakeCurrentTime = new Date('2019-02-16T00:00:00');
		jest.useFakeTimers();
		jest.setSystemTime(fakeCurrentTime);
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	test('returns null given a non valid date', () => {
		expect(makeRelativeDate(('12/2019' as unknown) as Date)).toEqual(null);
	});

	test('returns null given a date that is after now', () => {
		expect(makeRelativeDate(new Date('2019-02-16T00:00:01'))).toEqual(null);
	});

	test('returns number of seconds given a date that is from 0 up to 55 seconds before current time', () => {
		expect(makeRelativeDate(new Date('2019-02-16T00:00:00'))).toBe('0s');
		expect(makeRelativeDate(new Date('2019-02-15T23:59:06'))).toBe('54s');
	});

	test('returns now given a date that is from 55 seconds up to 1.5 minute before current time', () => {
		expect(makeRelativeDate(new Date('2019-02-15T23:59:05'))).toBe('Now');
		expect(makeRelativeDate(new Date('2019-02-15T23:58:31'))).toBe('Now');
	});

	test('returns m ago given a date that is from 1.5 minutes up to 55 minute before current time', () => {
		expect(makeRelativeDate(new Date('2019-02-15T23:58:30'))).toBe(
			'2m ago',
		);

		expect(makeRelativeDate(new Date('2019-02-15T23:05:01'))).toBe(
			'55m ago',
		);
	});

	test('returns h ago given a date that is from 55 minutes up to 1 day before current time', () => {
		expect(makeRelativeDate(new Date('2019-02-15T23:05:00'))).toBe(
			'1h ago',
		);
		expect(makeRelativeDate(new Date('2019-02-15T00:00:01'))).toBe(
			'24h ago',
		);
	});

	test('returns d ago given a date that is from 1 day up to 1 week before current time', () => {
		expect(makeRelativeDate(new Date('2019-02-15T00:00:00'))).toBe(
			'1d ago',
		);
		expect(makeRelativeDate(new Date('2019-02-09T00:00:00'))).toBe(
			'7d ago',
		);
	});

	test('returns w ago given a date that is from 1 week up to 1 year before current time', () => {
		expect(makeRelativeDate(new Date('2019-02-08T23:59:00'))).toBe(
			'1w ago',
		);
		expect(makeRelativeDate(new Date('2018-02-17T00:00:00'))).toBe(
			'52w ago',
		);
	});

	test('returns 1y ago given a date that is from 1 year up to 1.5 years before current time', () => {
		expect(makeRelativeDate(new Date('2018-02-16T23:59:00'))).toBe(
			'1y ago',
		);
		expect(makeRelativeDate(new Date('2017-08-19T01:00:01'))).toBe(
			'1y ago',
		);
	});

	test('returns 2y ago given a date that is at 1.5 years before current time', () => {
		expect(makeRelativeDate(new Date('2017-08-19T01:00:00'))).toBe(
			'2y ago',
		);
	});
});
