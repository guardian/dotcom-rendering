import { formatMatchKickOffTime } from './formatDate';

describe('formatMatchKickOffTime', () => {
	it('should return a localised kick off date and time', () => {
		expect(
			formatMatchKickOffTime(new Date('2026-02-15T19:30:00Z'), 'UK'),
		).toBe('Sunday, 15 Feb 2026, 7:30 pm GMT');
		expect(
			formatMatchKickOffTime(new Date('2026-02-15T19:30:00Z'), 'EUR'),
		).toBe('Sunday, 15 Feb 2026, 8:30 pm CET');
		expect(
			formatMatchKickOffTime(new Date('2026-02-15T19:30:00Z'), 'AU'),
		).toBe('Monday 16 Feb 2026, 6:30 am AEDT');
	});

	it('should display "Today" if the match is today in the current timezone', () => {
		jest.useFakeTimers().setSystemTime(new Date('2026-02-15T19:30:00Z'));

		expect(
			formatMatchKickOffTime(new Date(`2026-02-15T19:30:00Z`), 'UK'),
		).toBe('Today, 7:30 pm GMT');
		expect(
			formatMatchKickOffTime(new Date(`2026-02-15T19:30:00Z`), 'US'),
		).toBe('Today, 2:30 PM EST');
		expect(
			formatMatchKickOffTime(new Date(`2026-02-15T20:00:00Z`), 'AU'),
		).toBe('Today, 7:00 am AEDT');
		expect(
			formatMatchKickOffTime(new Date(`2026-02-15T23:00:00Z`), 'EUR'),
		).toBe('Monday, 16 Feb 2026, 12:00 am CET');
		expect(
			formatMatchKickOffTime(new Date(`2026-02-15T01:00:00Z`), 'US'),
		).toBe('Saturday, Feb 14, 2026, 8:00 PM EST');
	});
});
