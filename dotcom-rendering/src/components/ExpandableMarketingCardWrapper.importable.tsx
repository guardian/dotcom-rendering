import { getCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';
import type { DailyArticle } from '../lib/dailyArticleCount';
import { getDailyArticleCount } from '../lib/dailyArticleCount';
import { getLocaleCode } from '../lib/getCountryCode';
import { useAB } from '../lib/useAB';
import { ExpandableMarketingCard } from './ExpandableMarketingCard';

interface Props {
	guardianBaseURL: string;
}

const isFirstArticle = () => {
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
	const isNewUser = isFirstArticle();

	return !hasUserSelectedNonUSEdition && !isNewUser;
};

// todo - semantic html accordion-details?
export const ExpandableMarketingCardWrapper = ({ guardianBaseURL }: Props) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isClosed, setIsClosed] = useState(false);
	const [isApplicableUser, setIsApplicableUser] = useState(false);

	const abTestAPI = useAB()?.api;
	const isInVariantFree = !!abTestAPI?.isUserInVariant(
		'UsaExpandableMarketingCard',
		'variant-free',
	);
	const isInVariantBubble = !!abTestAPI?.isUserInVariant(
		'UsaExpandableMarketingCard',
		'variant-bubble',
	);
	const isInEitherVariant = isInVariantFree || isInVariantBubble;

	useEffect(() => {
		void isNewUSUser().then((show) => {
			if (show) {
				setIsApplicableUser(true);
			}
		});
	}, []);

	if (!isInEitherVariant || !isApplicableUser || isClosed) {
		return null;
	}

	const heading = isInVariantBubble
		? 'Pop your US news bubble'
		: 'Yes, this story is free';

	const kicker = isInVariantBubble
		? 'How the Guardian is different'
		: 'Why the Guardian has no paywall';

	return (
		<ExpandableMarketingCard
			guardianBaseURL={guardianBaseURL}
			heading={heading}
			kicker={kicker}
			isExpanded={isExpanded}
			setIsExpanded={setIsExpanded}
			setIsClosed={setIsClosed}
		/>
	);
};
