import { getDeadlineText } from './deadlineDate';

describe('getCloseText', () => {
	test('Returns null if deadline date is > 30 days away', () => {
		const date1 = new Date(2022, 11, 1, 0, 0, 0);
		const date2 = new Date(2022, 12, 24, 0, 0, 0);

		expect(getDeadlineText(date1, date2)).toBeNull();
	});
	test('Rounds days if deadline date is < 30 days away', () => {
		const date1 = new Date(2022, 11, 1, 0, 0, 0);
		const date2 = new Date(2022, 11, 5, 0, 0, 0);

		expect(getDeadlineText(date1, date2)).toBe('Open for 4 more days');
	});
	test('Is singular if if deadline date is 1 day away', () => {
		const date1 = new Date(2022, 11, 1, 0, 0, 0);
		const date2 = new Date(2022, 11, 2, 2, 0, 0);

		expect(getDeadlineText(date1, date2)).toBe('Open for 1 more day');
	});
	test('Is today if if deadline date is <24 hours', () => {
		const date1 = new Date(2022, 11, 1, 0, 0, 0);
		const date2 = new Date(2022, 11, 1, 2, 0, 0);

		expect(getDeadlineText(date1, date2)).toBe('Closing today');
	});
});
