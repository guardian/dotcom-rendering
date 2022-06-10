import { addCookie, getCookie } from '../../lib/cookies';

// --- Types --- //

export enum ReminderStatus {
    Editing = 'Editing',
    Submitting = 'Submitting',
    Error = 'Error',
    Completed = 'Completed',
}

// --- Cookie utils --- //

const dateDiff = (start: Date, end: Date): number => {
    const twentyFourHours = 86400000;
    return Math.round((end.valueOf() - start.valueOf()) / twentyFourHours);
};

export const addContributionReminderCookie = (reminderDateString: string): void => {
    const today = new Date();
    const reminderDate = new Date(Date.parse(reminderDateString));

    addCookie('gu_epic_contribution_reminder', '1', dateDiff(today, reminderDate));
};

export const hasSetReminder = (): boolean => {
    return !!getCookie('gu_epic_contribution_reminder');
};

// --- Text utils --- //

const PREPOSITION_REGEX = /^(on|in)/;

const containsPreposition = (text: string): boolean => PREPOSITION_REGEX.test(text);

const addPreposition = (text: string): string => 'in ' + text;

export const ensureHasPreposition = (text: string): string =>
    containsPreposition(text) ? text : addPreposition(text);

// --- Validation utils --- //

export const isValidEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
