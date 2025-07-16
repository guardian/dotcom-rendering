import { from } from '@guardian/source/foundations';
import type { ChoiceCard } from '@guardian/support-dotcom-components/dist/shared/types/props/choiceCards';
import type { EpicProps } from '@guardian/support-dotcom-components/dist/shared/types/props/epic';
import { useState } from 'react';
import {
	removeMediaRulePrefix,
	useMatchMedia,
} from '../../../../lib/useMatchMedia';
import { getChoiceCards } from '../../lib/choiceCards';
import type { ReactComponent } from '../../lib/ReactComponent';
import { ThreeTierChoiceCards } from '../../shared/ThreeTierChoiceCards';
import { ContributionsEpicButtons } from './ContributionsEpicButtons';
import { ContributionsEpicReminder } from './ContributionsEpicReminder';

type Props = EpicProps & {
	amountsTestName?: string;
	amountsVariantName?: string;
};

export const ContributionsEpicCtasContainer: ReactComponent<Props> = ({
	variant,
	countryCode,
	tracking,
	submitComponentEvent,
	fetchEmail,
	amountsTestName,
	amountsVariantName,
}: Props): JSX.Element => {
	// reminders
	const [fetchedEmail, setFetchedEmail] = useState<string | undefined>(
		undefined,
	);
	const [isReminderActive, setIsReminderActive] = useState(false);
	const showReminderFields = variant.showReminderFields;
	const onCloseReminderClick = () => {
		setIsReminderActive(false);
	};
	const isTabletOrAbove = useMatchMedia(removeMediaRulePrefix(from.tablet));

	const choiceCards = getChoiceCards(
		isTabletOrAbove,
		variant.choiceCardsSettings,
	);

	const defaultChoiceCard = choiceCards?.find((cc) => cc.isDefault);
	const [selectedChoiceCard, setSelectedChoiceCard] = useState<
		ChoiceCard | undefined
	>(defaultChoiceCard);

	return (
		<>
			{choiceCards && selectedChoiceCard && (
				<ThreeTierChoiceCards
					selectedChoiceCard={selectedChoiceCard}
					setSelectedChoiceCard={setSelectedChoiceCard}
					choices={choiceCards}
					id={'epic'}
				/>
			)}
			<ContributionsEpicButtons
				variant={variant}
				tracking={tracking}
				countryCode={countryCode}
				onOpenReminderClick={(): void => {
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
				threeTierChoiceCardSelectedProduct={selectedChoiceCard?.product}
				amountsTestName={amountsTestName}
				amountsVariantName={amountsVariantName}
				promoCodes={variant.promoCodes ?? []}
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
