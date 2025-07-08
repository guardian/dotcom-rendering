/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/modules/src/modules/shared/helpers/choiceCards.ts
 */
import type {
	ChoiceCard,
	ChoiceCardsSettings,
} from '@guardian/support-dotcom-components/dist/shared/types/props/choiceCards';

export const getChoiceCards = (
	isTabletOrAbove: boolean,
	choiceCardsSettings?: ChoiceCardsSettings | null,
): ChoiceCard[] | undefined => {
	if (choiceCardsSettings) {
		if (!isTabletOrAbove && choiceCardsSettings.mobileChoiceCards) {
			return choiceCardsSettings.mobileChoiceCards;
		}
		return choiceCardsSettings.choiceCards;
	}
	return;
};
