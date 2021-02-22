import Int64 from 'node-int64';
import { formatOptionalDate } from './atoms';

describe('formatOptionalDate', () => {
	it('returns undefined given an undefined value', () => {
		expect(formatOptionalDate(undefined)).toBe(undefined);
	});

	it('returns undefined given a non valid date Int64', () => {
		const int64 = new Int64('123456789abcdef0');
		expect(formatOptionalDate(int64)).toBe(undefined);
	});

	it('returns date string given a valid Int64', () => {
		const date = 1614000379674;
		const int64 = new Int64(date);
		expect(formatOptionalDate(int64)).toBe('Mon Feb 22 2021');
	});
});
