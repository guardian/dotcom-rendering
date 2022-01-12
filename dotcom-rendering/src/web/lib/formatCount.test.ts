import { formatCount } from './formatCount';

describe('formatCount', () => {
	it('formats simple numbers', () => {
		expect(formatCount(123)).toEqual({ short: '123', long: '123' });
	});
	it('formats very long numbers', () => {
		expect(formatCount(92878)).toEqual({ short: '93k', long: '92,878' });
	});
	it('returns zero for zero', () => {
		expect(formatCount(0)).toEqual({ short: '0', long: '0' });
	});
	it('returns an elipsis for undefined', () => {
		expect(formatCount()).toEqual({ short: '…', long: '…' });
	});
});
