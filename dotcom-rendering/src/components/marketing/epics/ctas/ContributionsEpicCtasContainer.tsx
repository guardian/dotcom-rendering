import type { EpicProps } from '@guardian/support-dotcom-components/dist/shared/types/props/epic';
import { useState } from 'react';
import { getChoiceCardData } from '../../lib/choiceCards';
import type { ReactComponent } from '../../lib/ReactComponent';
import { ThreeTierChoiceCards } from '../ThreeTierChoiceCards';
import type { SupportTier } from '../utils/threeTierChoiceCardAmounts';
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
	now = new Date(),
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

	const hasPromoCodeInUrl =
		variant.cta?.baseUrl.includes('30OFFAPRIL') ?? false;

	// Check the dates
	const isDiscountActive =
		(hasPromoCodeInUrl &&
			now >= new Date('2025-04-15T00:00:01') &&
			now < new Date('2025-04-21T23:59:59')) ??
		false;

	return (
		<>
			{showChoiceCards && (
				<ThreeTierChoiceCards
					countryCode={countryCode}
					selectedProduct={threeTierChoiceCardSelectedProduct}
					setSelectedProduct={setThreeTierChoiceCardSelectedProduct}
					choices={getChoiceCardData(
						true,
						isDiscountActive,
						countryCode,
					)}
					supporterPlusDiscount={isDiscountActive ? 0.3 : undefined}
					id={'epic'}
					isDiscountActive={isDiscountActive}
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
				showChoiceCards={showChoiceCards}
				threeTierChoiceCardSelectedProduct={
					threeTierChoiceCardSelectedProduct
				}
				amountsTestName={amountsTestName}
				amountsVariantName={amountsVariantName}
				numArticles={articleCounts.for52Weeks}
				isDiscountActive={isDiscountActive}
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
