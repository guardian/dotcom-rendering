import { isStorybook, isTest } from '../utils/env';

export type ReminderPlatform = 'WEB' | 'AMP';

export type ReminderComponent = 'EPIC' | 'BANNER';

// The oneoff reminder will only be set for unrecognised emails if reminderStage === PRE
// Not an issue in Prod because only signed in users will see the banner or epic
// - but can cause heartbreak while testing locally with an unrecognised email address
export type ReminderStage = 'PRE' | 'POST' | 'WINBACK';

export interface BaseSignupRequest {
	email: string;
	reminderPlatform: ReminderPlatform;
	reminderComponent: ReminderComponent;
	reminderStage: ReminderStage;
	country?: string;
	reminderOption?: string;
}

export interface OneOffSignupRequest extends BaseSignupRequest {
	reminderPeriod: string;
}

const getReminderDate = (date: Date): Date => {
	const monthsAhead = date.getDate() < 20 ? 1 : 2;
	date.setMonth(date.getMonth() + monthsAhead);

	return date;
};

export interface ReminderFields {
	reminderCta: string;
	reminderLabel: string;
	reminderPeriod: string;
	reminderOption?: string;
}

export const buildReminderFields = (
	today: Date = new Date(),
): ReminderFields => {
	const reminderDate = getReminderDate(today);

	const month = reminderDate.getMonth() + 1; // javascript dates run from 0-11, we want 1-12
	const paddedMonth = month.toString().padStart(2, '0');
	const monthName = reminderDate.toLocaleString('default', { month: 'long' });
	const year = reminderDate.getFullYear();

	return {
		reminderCta: `Remind me in ${monthName}`,
		reminderPeriod: `${year}-${paddedMonth}-01`,
		reminderLabel: `${monthName} ${year}`,
	};
};

export const createReminder = (
	signupData: OneOffSignupRequest,
): Promise<void> => {
	const url = 'https://support.theguardian.com/reminders/create/one-off';
	if (isStorybook() || isTest()) {
		return Promise.resolve();
	} else {
		return fetch(url, {
			body: JSON.stringify(signupData),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (!response.ok) {
					return Promise.reject('Error creating reminder');
				} else {
					return Promise.resolve();
				}
			})
			.catch(() => {
				return Promise.reject('Error creating reminder');
			});
	}
};
