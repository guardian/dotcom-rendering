import { roundWithDecimals } from './roundWithDecimals';

describe('roundWithDecimals', () => {
	it.each([
		[1, 3, 3],
		[1, 10.0, 10],
		[1, 10.3, 10.3],
		[1, 2.5, 2.5],
		[3, 0.001_234, 0.001],
		[4, 0.001_234, 0.001_2],
		// eslint-disable-next-line no-loss-of-precision -- it's testing that this is rounded away
		[5, 100.102_030_405_060_708_090, 100.102_03],
		[6, 12345.000_001_2, 12345.000_001],
		[9, 199.001_002_003_456, 199.001_002_003],
	])('With precision %s, %f becomes %f', (precision, before, after) => {
		expect(roundWithDecimals(before, precision)).toBe(after);
	});

	it('should handle default precision = 6', () => {
		const [before, after] = [12345.000_001_2, 12345.000_001];
		expect(roundWithDecimals(before)).toBe(after);
		expect(roundWithDecimals(before, 6)).toBe(after);
	});
});
