import type { ReminderFields } from '@guardian/support-dotcom-components/dist/shared/src/lib';
import type { OphanComponentEvent } from '@guardian/libs';
import { useContributionsReminderSignup } from '../hooks/useContributionsReminderSignup';
import type { ReactComponent } from '../lib/ReactComponent';
import { ContributionsEpicReminderSignedIn } from './ContributionsEpicReminderSignedIn';
import { ContributionsEpicReminderSignedOut } from './ContributionsEpicReminderSignedOut';
import {
	OPHAN_COMPONENT_EVENT_REMINDER_CLOSE,
	OPHAN_COMPONENT_EVENT_REMINDER_SET,
} from './utils/ophan';

// --- Types --- //

export interface ContributionsEpicReminderProps {
	initialEmailAddress?: string;
	reminderFields: ReminderFields;
	onCloseReminderClick: () => void;
	submitComponentEvent?: (event: OphanComponentEvent) => void;
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
