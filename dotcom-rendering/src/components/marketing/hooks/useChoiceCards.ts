/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/hooks/useChoiceCards.ts
 */
import {
	countryCodeToCountryGroupId,
	getLocalCurrencySymbol,
} from '@guardian/support-dotcom-components';
import type {
	ContributionFrequency,
	SelectedAmountsVariant,
} from '@guardian/support-dotcom-components/dist/shared/src/types';
import { useEffect, useState } from 'react';
import type { BannerTextContent } from '../banners/common/types';
import type { SupportTier } from '../epics/utils/threeTierChoiceCardAmounts';
import { threeTierChoiceCardAmounts } from '../epics/utils/threeTierChoiceCardAmounts';
import type { ChoiceCardSelection } from '../lib/choiceCards';
import { addChoiceCardsProductParams } from '../lib/tracking';

export type ContentType = 'mainContent' | 'mobileContent';

function transformChoiceCardsAmountsToProduct(
	countryCode: string | undefined,
	frequency: ContributionFrequency,
	amount: number,
): { product: SupportTier; ratePlan: string } {
	const countryGroupId = countryCodeToCountryGroupId(countryCode);
	const ratePlan = frequency === 'ANNUAL' ? 'Annual' : 'Monthly';

	const product =
		frequency === 'ONE_OFF'
			? 'OneOff'
			: amount >=
			  threeTierChoiceCardAmounts[ratePlan][countryGroupId].SupporterPlus
			? 'SupporterPlus'
			: 'Contribution';

	return {
		product,
		ratePlan,
	};
}

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
				(localAmounts.defaultAmount || localAmounts.amounts[1]) ?? 1;

			setChoiceCardSelection({
				frequency: defaultFrequency,
				amount: defaultAmount,
			});
		}
	}, [choiceCardAmounts]);

	const getCtaText = (contentType: ContentType): string => {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- the types and data fetched from the API are out of sync
		const primaryCtaText = content?.[contentType]?.primaryCta?.ctaText;

		return primaryCtaText ? primaryCtaText : 'Contribute';
	};
	const getCtaUrl = (contentType: ContentType): string => {
		const primaryCtaUrl =
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- the types and data fetched from the API are out of sync
			content?.[contentType]?.primaryCta?.ctaUrl ??
			'https://support.theguardian.com/contribute';

		if (choiceCardSelection && choiceCardSelection.amount !== 'other') {
			const { product, ratePlan } = transformChoiceCardsAmountsToProduct(
				countryCode,
				choiceCardSelection.frequency,
				choiceCardSelection.amount,
			);
			return addChoiceCardsProductParams(
				primaryCtaUrl,
				product,
				ratePlan,
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

export { useChoiceCards };
