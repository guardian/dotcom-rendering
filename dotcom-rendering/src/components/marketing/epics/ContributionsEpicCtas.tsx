/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/modules/src/modules/epics/ContributionsEpicCtas.tsx
 */
import type { EpicProps } from '@guardian/support-dotcom-components/dist/shared/src/types/props/epic';
import { useState } from 'react';
import type { ChoiceCardSelection } from '../lib/choiceCards';
import type { ReactComponent } from '../lib/ReactComponent';
import { ContributionsEpicButtons } from './ContributionsEpicButtons';
import { ContributionsEpicReminder } from './ContributionsEpicReminder';

interface OnReminderOpen {
	buttonCopyAsString: string;
}

type ContributionsEpicCtasProps = EpicProps & {
	showChoiceCards?: boolean;
	choiceCardSelection?: ChoiceCardSelection;
	amountsTestName?: string;
	amountsVariantName?: string;
};

export const ContributionsEpicCtas: ReactComponent<
	ContributionsEpicCtasProps
> = ({
	variant,
	countryCode,
	articleCounts,
	tracking,
	submitComponentEvent,
	onReminderOpen,
	fetchEmail,
	showChoiceCards,
	choiceCardSelection,
	amountsTestName,
	amountsVariantName,
}: ContributionsEpicCtasProps): JSX.Element => {
	const [fetchedEmail, setFetchedEmail] = useState<string | undefined>(
		undefined,
	);
	const [isReminderActive, setIsReminderActive] = useState(false);
	const showReminderFields = variant.showReminderFields;
	const onCloseReminderClick = () => {
		setIsReminderActive(false);
	};

	return (
		<>
			<ContributionsEpicButtons
				variant={variant}
				tracking={tracking}
				countryCode={countryCode}
				onOpenReminderClick={(): void => {
					const buttonCopyAsString = showReminderFields?.reminderCta
						.toLowerCase()
						.replace(/\s/g, '-');

					// This callback lets the platform react to the user interaction with the
					// 'Remind me' button
					if (onReminderOpen) {
						onReminderOpen({
							buttonCopyAsString,
						} as OnReminderOpen);
					}

					if (fetchEmail) {
						void fetchEmail().then((resolvedEmail) => {
							if (resolvedEmail) {
								setFetchedEmail(resolvedEmail);
							}
							setIsReminderActive(true);
						});
					} else {
						setIsReminderActive(true);
					}
				}}
				submitComponentEvent={submitComponentEvent}
				isReminderActive={isReminderActive}
				isSignedIn={Boolean(fetchedEmail)}
				showChoiceCards={showChoiceCards}
				choiceCardSelection={choiceCardSelection}
				amountsTestName={amountsTestName}
				amountsVariantName={amountsVariantName}
				numArticles={articleCounts.for52Weeks}
			/>

			{isReminderActive && showReminderFields && (
				<ContributionsEpicReminder
					initialEmailAddress={fetchedEmail}
					reminderFields={showReminderFields}
					onCloseReminderClick={onCloseReminderClick}
					submitComponentEvent={submitComponentEvent}
				/>
			)}
		</>
	);
};
