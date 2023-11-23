/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/modules/src/hooks/useContributionsReminderSignup.ts
 */
import type {
	OneOffSignupRequest,
	ReminderComponent,
	ReminderPlatform,
	ReminderStage,
} from '@guardian/support-dotcom-components/dist/shared/src/types';
import { useState } from 'react';
import {
	addContributionReminderCookie,
	ReminderStatus,
} from '../lib/reminders';

const CREATE_ONE_OFF_REMINDER_ENDPOINT =
	'https://support.theguardian.com/reminders/create/one-off';

interface ContributionsReminderSignup {
	reminderStatus: ReminderStatus;
	createReminder: (email: string) => void;
}

export function useContributionsReminderSignup(
	reminderPeriod: string,
	reminderPlatform: ReminderPlatform,
	reminderComponent: ReminderComponent,
	reminderStage: ReminderStage,
	reminderOption?: string,
): ContributionsReminderSignup {
	const [reminderStatus, setReminderStatus] = useState<ReminderStatus>(
		ReminderStatus.Editing,
	);

	const createReminder = (email: string): void => {
		const reminderSignupData: OneOffSignupRequest = {
			email,
			reminderPeriod,
			reminderPlatform,
			reminderComponent,
			reminderStage,
			reminderOption,
		};

		setReminderStatus(ReminderStatus.Submitting);
		fetch(CREATE_ONE_OFF_REMINDER_ENDPOINT, {
			body: JSON.stringify(reminderSignupData),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (!response.ok) {
					setReminderStatus(ReminderStatus.Error);
				} else {
					setReminderStatus(ReminderStatus.Completed);
					addContributionReminderCookie(reminderPeriod);
				}
			})
			.catch(() => setReminderStatus(ReminderStatus.Error));
	};

	return { reminderStatus, createReminder };
}
