import type { ABTestAPI } from '@guardian/ab-core';
import { getCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';
import type { DailyArticle } from '../lib/dailyArticleCount';
import { getDailyArticleCount } from '../lib/dailyArticleCount';
import { getLocaleCode } from '../lib/getCountryCode';
import { useAB } from '../lib/useAB';
import { ExpandableMarketingCard } from './ExpandableMarketingCard';
import { ExpandableMarketingCardSwipeable } from './ExpandableMarketingCardSwipeable';
import { Hide } from './Hide';

export type UsBannerTestVariantName =
	| 'variant-free'
	| 'variant-bubble'
	| 'variant-billionaire';

type Variant = {
	heading: string;
	kicker: string;
};

const variantFree: Variant = {
	heading: 'Yes, this story is free',
	kicker: 'Why the Guardian has no paywall',
};
const variantBubble: Variant = {
	heading: 'Pop your US news bubble',
	kicker: 'How the Guardian is different',
};
const variantBillionaire: Variant = {
	heading: 'No billionaire approved this',
	kicker: 'How the Guardian is different',
};

const getVariant = (
	abTestAPI: ABTestAPI | undefined,
): UsBannerTestVariantName | null => {
	if (!abTestAPI) {
		return null;
	}

	const isInVariantFree = abTestAPI.isUserInVariant(
		'UsaExpandableMarketingCard',
		'variant-free',
	);
	const isInVariantBubble = abTestAPI.isUserInVariant(
		'UsaExpandableMarketingCard',
		'variant-bubble',
	);
	const isInVariantBillionaire = abTestAPI.isUserInVariant(
		'UsaExpandableMarketingCard',
		'variant-billionaire',
	);

	if (isInVariantFree) {
		return 'variant-free';
	}

	if (isInVariantBubble) {
		return 'variant-bubble';
	}

	if (isInVariantBillionaire) {
		return 'variant-billionaire';
	}

	return null;
};

const getVariantCopy = (variant: UsBannerTestVariantName): Variant => {
	if (variant === 'variant-free') {
		return variantFree;
	}

	if (variant === 'variant-bubble') {
		return variantBubble;
	}

	return variantBillionaire;
};

const isFirstOrSecondArticle = () => {
	const [dailyCount = {} as DailyArticle] = getDailyArticleCount() ?? [];
	return Object.keys(dailyCount).length === 0 || dailyCount.count <= 1;
};

const isNewUSUser = async () => {
	const isUserInUS = (await getLocaleCode()) === 'US';
	if (!isUserInUS) {
		return false;
	}

	// Exclude users who have selected a non-US edition.
	const editionCookie = getCookie({ name: 'GU_EDITION' });
	const hasUserSelectedNonUSEdition =
		!!editionCookie && editionCookie !== 'US';

	// This check must happen AFTER we've ensured that the user is in the US.
	const isNewUser = isFirstOrSecondArticle();

	return !hasUserSelectedNonUSEdition && isNewUser;
};

interface Props {
	guardianBaseURL: string;
}

export const ExpandableMarketingCardWrapper = ({ guardianBaseURL }: Props) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isClosed, setIsClosed] = useState(false);
	const [isApplicableUser, setIsApplicableUser] = useState(false);

	const abTestAPI = useAB()?.api;
	const abTestVariant = getVariant(abTestAPI);

	useEffect(() => {
		void isNewUSUser().then((show) => {
			if (show) {
				setIsApplicableUser(true);
			}
		});
	}, []);

	if (!abTestVariant || !isApplicableUser || isClosed) {
		return null;
	}

	const { heading, kicker } = getVariantCopy(abTestVariant);

	return (
		<>
			<Hide when="below" breakpoint="leftCol">
				<div
					data-component="us-expandable-marketing-card"
					role={!isExpanded ? 'button' : 'none'}
					tabIndex={0}
					onKeyDown={(event) => {
						if (event.key === 'Enter' && !isExpanded) {
							setIsExpanded(true);
						}
						if (event.key === 'Escape') {
							setIsClosed(true);
						}
					}}
					onClick={() => {
						!isExpanded && setIsExpanded(true);
					}}
				>
					<ExpandableMarketingCard
						guardianBaseURL={guardianBaseURL}
						heading={heading}
						kicker={kicker}
						isExpanded={isExpanded}
						setIsClosed={setIsClosed}
					/>
				</div>
			</Hide>
			<Hide when="above" breakpoint="leftCol">
				<ExpandableMarketingCardSwipeable
					guardianBaseURL={guardianBaseURL}
					heading={heading}
					kicker={kicker}
					isExpanded={isExpanded}
					setIsExpanded={setIsExpanded}
					setIsClosed={setIsClosed}
					abTestVariant={abTestVariant}
				/>
			</Hide>
		</>
	);
};
