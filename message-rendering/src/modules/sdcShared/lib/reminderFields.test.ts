import { buildReminderFields } from './reminderFields';

describe('buildReminderFields', () => {
    it('should set date to the next calendar month if the current date is BEFORE the 20th', () => {
        const novemberNineteenth = new Date('2020-11-19');

        const expected = {
            reminderCta: `Remind me in December`,
            reminderPeriod: `2020-12-01`,
            reminderLabel: `December 2020`,
        };
        const actual = buildReminderFields(novemberNineteenth);

        expect(actual).toEqual(expected);
    });

    it('should set date to the next + 1 calendar month if the current date is the 20th', () => {
        const novemberTwentieth = new Date('2020-11-20');

        const expected = {
            reminderCta: `Remind me in January`,
            reminderPeriod: `2021-01-01`,
            reminderLabel: `January 2021`,
        };
        const actual = buildReminderFields(novemberTwentieth);

        expect(actual).toEqual(expected);
    });

    it('should set date to the next + 1 calendar month if the current date is AFTER the 20th', () => {
        const novemberTwentyFirst = new Date('2020-11-21');

        const expected = {
            reminderCta: `Remind me in January`,
            reminderPeriod: `2021-01-01`,
            reminderLabel: `January 2021`,
        };
        const actual = buildReminderFields(novemberTwentyFirst);

        expect(actual).toEqual(expected);
    });
});
