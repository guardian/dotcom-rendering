import type { EpicProps } from '@guardian/support-dotcom-components/dist/shared/types/props/epic';
import { useState } from 'react';
import { getChoiceCardData } from '../../lib/choiceCards';
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

	const hasSupporterPlusPromoCode =
		variant.cta?.baseUrl.includes('BLACK_FRIDAY_DISCOUNT_2024') ?? false;

	return (
		<>
			{showChoiceCards && (
				<ThreeTierChoiceCards
					countryCode={countryCode}
					selectedProduct={threeTierChoiceCardSelectedProduct}
					setSelectedProduct={setThreeTierChoiceCardSelectedProduct}
					choices={getChoiceCardData(true, countryCode)}
					supporterPlusDiscount={
						hasSupporterPlusPromoCode ? 0.5 : undefined
					}
					id={'epic'}
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
