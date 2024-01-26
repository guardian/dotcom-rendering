/**
 * @jest-environment jsdom
 */

import { buildReminderFields } from './reminders';

describe('reminders', () => {
	describe('when a reminder CTA is required by a component', () => {
		const testDate0 = new Date('March 19, 2023 01:00:00');
		const testDate1 = new Date('March 20, 2023 01:00:00');
		const testDate2 = new Date('October 19, 2023 01:00:00');
		const testDate3 = new Date('October 20, 2023 01:00:00');

		const testDateFields0 = buildReminderFields(testDate0);
		const testDateFields1 = buildReminderFields(testDate1);
		const testDateFields2 = buildReminderFields(testDate2);
		const testDateFields3 = buildReminderFields(testDate3);

		it('supplies correct fields for date 19 Mar 2023', () => {
			expect(testDateFields0.reminderCta).toEqual('Remind me in April');
			expect(testDateFields0.reminderPeriod).toEqual('2023-04-01');
			expect(testDateFields0.reminderLabel).toEqual('April 2023');
		});

		it('supplies correct fields for date 20 Mar 2023', () => {
			expect(testDateFields1.reminderCta).toEqual('Remind me in May');
			expect(testDateFields1.reminderPeriod).toEqual('2023-05-01');
			expect(testDateFields1.reminderLabel).toEqual('May 2023');
		});

		it('supplies correct fields for date 19 Oct 2023', () => {
			expect(testDateFields2.reminderCta).toEqual(
				'Remind me in November',
			);
			expect(testDateFields2.reminderPeriod).toEqual('2023-11-01');
			expect(testDateFields2.reminderLabel).toEqual('November 2023');
		});

		it('supplies correct fields for date 20 Oct 2023', () => {
			expect(testDateFields3.reminderCta).toEqual(
				'Remind me in December',
			);
			expect(testDateFields3.reminderPeriod).toEqual('2023-12-01');
			expect(testDateFields3.reminderLabel).toEqual('December 2023');
		});
	});
});
