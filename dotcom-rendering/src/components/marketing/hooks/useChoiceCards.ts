import { getLocalCurrencySymbol } from '@guardian/support-dotcom-components';
import type {
	ContributionFrequency,
	SelectedAmountsVariant,
} from '@guardian/support-dotcom-components/dist/shared/src/types';
import { useEffect, useState } from 'react';
import type { BannerTextContent } from '../banners/common/types';
import { addChoiceCardsParams } from '../lib/tracking';
import type { ChoiceCardSelection } from '../lib/choiceCards';

export type ContentType = 'mainContent' | 'mobileContent';

const useChoiceCards = (
	choiceCardAmounts: SelectedAmountsVariant | undefined,
	countryCode: string | undefined,
	content: BannerTextContent,
): {
	choiceCardSelection: ChoiceCardSelection | undefined;
	setChoiceCardSelection: (choiceCardSelection: ChoiceCardSelection) => void;
	getCtaText: (contentType: ContentType) => string;
	getCtaUrl: (contentType: ContentType) => string;
	currencySymbol: string;
} => {
	const [choiceCardSelection, setChoiceCardSelection] = useState<
		ChoiceCardSelection | undefined
	>();

	useEffect(() => {
		if (choiceCardAmounts?.amountsCardData) {
			const defaultFrequency: ContributionFrequency =
				choiceCardAmounts.defaultContributionType || 'MONTHLY';
			const localAmounts =
				choiceCardAmounts.amountsCardData[defaultFrequency];
			const defaultAmount =
				localAmounts.defaultAmount || localAmounts.amounts[1] || 1;

			setChoiceCardSelection({
				frequency: defaultFrequency,
				amount: defaultAmount,
			});
		}
	}, [choiceCardAmounts]);

	const getCtaText = (contentType: ContentType): string => {
		const primaryCtaText = content?.[contentType]?.primaryCta?.ctaText;

		return primaryCtaText ? primaryCtaText : 'Contribute';
	};
	const getCtaUrl = (contentType: ContentType): string => {
		const primaryCtaUrl =
			content?.[contentType]?.primaryCta?.ctaUrl ??
			'https://support.theguardian.com/contribute';

		if (choiceCardSelection) {
			return addChoiceCardsParams(
				primaryCtaUrl,
				choiceCardSelection.frequency,
				choiceCardSelection.amount,
			);
		} else {
			return primaryCtaUrl;
		}
	};

	const currencySymbol = getLocalCurrencySymbol(countryCode);

	return {
		choiceCardSelection,
		setChoiceCardSelection,
		getCtaText,
		getCtaUrl,
		currencySymbol,
	};
};

export default useChoiceCards;
