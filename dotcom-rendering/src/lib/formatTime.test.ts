import { formatTime, secondsToDuration } from './formatTime';

describe('formatTime', () => {
	it('formats time correctly', () => {
		expect(formatTime(1)).toEqual('00:00:01');
		expect(formatTime(12)).toEqual('00:00:12');
		expect(formatTime(123)).toEqual('00:02:03');
		expect(formatTime(1234)).toEqual('00:20:34');
		expect(formatTime(12345)).toEqual('03:25:45');
	});
});

describe('secondsToDuration', () => {
	it(`converts from a number of seconds to a duration string`, () => {
		const secss = [undefined, 0, 59, 599, 3599, 35999, 3601];
		const expected = [
			``,
			``,
			`0:59`,
			`9:59`,
			`59:59`,
			`9:59:59`,
			`1:00:01`,
		];
		for (const [i, secs] of secss.entries()) {
			const result = secondsToDuration(secs);
			expect(result).toBe(expected[i]);
		}
	});
});
