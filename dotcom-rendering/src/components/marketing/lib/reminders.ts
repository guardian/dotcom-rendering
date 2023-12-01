/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/modules/src/modules/utils/reminders.ts
 */
import { getCookie, setCookie } from '@guardian/libs';

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

export const addContributionReminderCookie = (
	reminderDateString: string,
): void => {
	const today = new Date();
	const reminderDate = new Date(Date.parse(reminderDateString));

	setCookie({
		name: 'gu_epic_contribution_reminder',
		value: '1',
		daysToLive: dateDiff(today, reminderDate),
	});
};

export const hasSetReminder = (): boolean => {
	return !!getCookie({ name: 'gu_epic_contribution_reminder' });
};

// --- Text utils --- //

const PREPOSITION_REGEX = /^(on|in)/;

const containsPreposition = (text: string): boolean =>
	PREPOSITION_REGEX.test(text);

const addPreposition = (text: string): string => 'in ' + text;

export const ensureHasPreposition = (text: string): string =>
	containsPreposition(text) ? text : addPreposition(text);

// --- Validation utils --- //

export const isValidEmail = (email: string): boolean => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export const emailIsShortEnoughForIdentity = (email: string): boolean => {
	// Identity errors on email addresses longer than 100 characters
	return email.length <= 100;
};
