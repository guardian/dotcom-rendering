/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/modules/src/modules/epics/ContributionsEpicReminder.tsx
 */
import type { ComponentEvent } from '@guardian/ophan-tracker-js';
import type { ReminderFields } from '@guardian/support-dotcom-components/dist/shared/lib';
import { useContributionsReminderSignup } from '../../hooks/useContributionsReminderSignup';
import type { ReactComponent } from '../../lib/ReactComponent';
import {
	OPHAN_COMPONENT_EVENT_REMINDER_CLOSE,
	OPHAN_COMPONENT_EVENT_REMINDER_SET,
} from '../utils/ophan';
import { ContributionsEpicReminderSignedIn } from './ContributionsEpicReminderSignedIn';
import { ContributionsEpicReminderSignedOut } from './ContributionsEpicReminderSignedOut';

// --- Types --- //

export interface ContributionsEpicReminderProps {
	initialEmailAddress?: string;
	reminderFields: ReminderFields;
	onCloseReminderClick: () => void;
	submitComponentEvent?: (event: ComponentEvent) => void;
}

// --- Components --- //

export const ContributionsEpicReminder: ReactComponent<
	ContributionsEpicReminderProps
> = ({
	initialEmailAddress,
	reminderFields,
	onCloseReminderClick,
	submitComponentEvent,
}: ContributionsEpicReminderProps) => {
	const { reminderStatus, createReminder } = useContributionsReminderSignup(
		reminderFields.reminderPeriod,
		'WEB',
		'EPIC',
		'PRE',
		reminderFields.reminderOption,
	);

	const onSetReminderClick = (email: string) => {
		if (submitComponentEvent) {
			submitComponentEvent(OPHAN_COMPONENT_EVENT_REMINDER_SET);
		}
		createReminder(email);
	};

	const closeReminder = () => {
		if (submitComponentEvent) {
			submitComponentEvent(OPHAN_COMPONENT_EVENT_REMINDER_CLOSE);
		}
		onCloseReminderClick();
	};

	return initialEmailAddress ? (
		<ContributionsEpicReminderSignedIn
			reminderLabel={reminderFields.reminderLabel}
			reminderStatus={reminderStatus}
			onSetReminderClick={() => onSetReminderClick(initialEmailAddress)}
			onCloseReminderClick={closeReminder}
		/>
	) : (
		<ContributionsEpicReminderSignedOut
			reminderLabel={reminderFields.reminderLabel}
			reminderStatus={reminderStatus}
			onSetReminderClick={onSetReminderClick}
			onCloseReminderClick={closeReminder}
		/>
	);
};
