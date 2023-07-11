import { formatTime } from './formatTime';

describe('formatTime', () => {
	it('should format time to correct string', () => {
		expect(formatTime(4622)).toBe('01:17:02');
		expect(formatTime(621)).toBe('10:21');
		expect(formatTime(21)).toBe('00:21');
	});
});
