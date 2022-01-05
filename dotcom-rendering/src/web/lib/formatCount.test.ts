import { formatCount } from './formatCount';

describe('formatCount', () => {
	it('formats simple numbers', () => {
		expect(formatCount(123)).toBe({ short: '123', long: '123' });
	});
	it('formats very long numbers', () => {
		expect(formatCount(92878)).toBe({ short: '93k', long: '92,878' });
	});
	it('returns zero for zero', () => {
		expect(formatCount(0)).toBe({ short: '0', long: '0' });
	});
	it('returns an elipsis for undefined', () => {
		expect(formatCount(0)).toBe({ short: '…', long: '…' });
	});
});
