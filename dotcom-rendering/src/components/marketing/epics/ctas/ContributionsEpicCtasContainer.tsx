import type { ChoiceCard } from '@guardian/support-dotcom-components/dist/shared/types/props/choiceCards';
import type { EpicProps } from '@guardian/support-dotcom-components/dist/shared/types/props/epic';
import { useState } from 'react';
import type { ReactComponent } from '../../lib/ReactComponent';
import { ThreeTierChoiceCards } from '../ThreeTierChoiceCards';
import { ContributionsEpicButtons } from './ContributionsEpicButtons';
import { ContributionsEpicReminder } from './ContributionsEpicReminder';

type Props = EpicProps & {
	amountsTestName?: string;
	amountsVariantName?: string;
	now?: Date;
};

export const ContributionsEpicCtasContainer: ReactComponent<Props> = ({
	variant,
	countryCode,
	articleCounts,
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

	const defaultProduct = variant.choiceCardsSettings?.choiceCards.find(
		(cc) => cc.isDefault,
	)?.product;
	const [
		threeTierChoiceCardSelectedProduct,
		setThreeTierChoiceCardSelectedProduct,
	] = useState<ChoiceCard['product'] | undefined>(defaultProduct);

	return (
		<>
			{variant.choiceCardsSettings &&
				threeTierChoiceCardSelectedProduct && (
					<ThreeTierChoiceCards
						selectedProduct={threeTierChoiceCardSelectedProduct}
						setSelectedProduct={
							setThreeTierChoiceCardSelectedProduct
						}
						choices={variant.choiceCardsSettings.choiceCards}
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
				threeTierChoiceCardSelectedProduct={
					threeTierChoiceCardSelectedProduct
				}
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
