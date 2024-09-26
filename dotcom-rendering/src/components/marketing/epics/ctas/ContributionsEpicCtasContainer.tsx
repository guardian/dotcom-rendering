import type { EpicProps } from '@guardian/support-dotcom-components/dist/shared/src/types/props/epic';
import { useState } from 'react';
import type { ReactComponent } from '../../lib/ReactComponent';
import { ThreeTierChoiceCards } from '../ThreeTierChoiceCards';
import type { SupportTier } from '../utils/threeTierChoiceCardAmounts';
import { ContributionsEpicButtons } from './ContributionsEpicButtons';
import { ContributionsEpicReminder } from './ContributionsEpicReminder';

interface OnReminderOpen {
	buttonCopyAsString: string;
}

type Props = EpicProps & {
	amountsTestName?: string;
	amountsVariantName?: string;
};

export const ContributionsEpicCtasContainer: ReactComponent<Props> = ({
	variant,
	countryCode,
	articleCounts,
	tracking,
	submitComponentEvent,
	onReminderOpen,
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

	// choice cards
	const isNonVatCompliantCountry =
		variant.choiceCardAmounts?.testName === 'VAT_COMPLIANCE';

	const showChoiceCards =
		variant.showChoiceCards && !isNonVatCompliantCountry;

	/**
	 * This corresponds to the products in the Product API
	 * @see https://product-catalog.guardianapis.com/product-catalog.json
	 */
	const [
		threeTierChoiceCardSelectedProduct,
		setThreeTierChoiceCardSelectedProduct,
	] = useState<SupportTier>('SupporterPlus');

	const variantOfChoiceCard =
		countryCode === 'US'
			? 'US_THREE_TIER_CHOICE_CARDS'
			: 'THREE_TIER_CHOICE_CARDS';

	return (
		<>
			{showChoiceCards && (
				<ThreeTierChoiceCards
					countryCode={countryCode}
					selectedProduct={threeTierChoiceCardSelectedProduct}
					setSelectedProduct={setThreeTierChoiceCardSelectedProduct}
					variantOfChoiceCard={variantOfChoiceCard}
				/>
			)}
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
				threeTierChoiceCardSelectedProduct={
					threeTierChoiceCardSelectedProduct
				}
				amountsTestName={amountsTestName}
				amountsVariantName={amountsVariantName}
				numArticles={articleCounts.for52Weeks}
				variantOfChoiceCard={variantOfChoiceCard}
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
