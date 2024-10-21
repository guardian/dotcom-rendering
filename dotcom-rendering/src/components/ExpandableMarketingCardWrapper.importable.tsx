import { css } from '@emotion/react';
import { getCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';
import type { DailyArticle } from '../lib/dailyArticleCount';
import { getDailyArticleCount } from '../lib/dailyArticleCount';
import { getLocaleCode } from '../lib/getCountryCode';
import { getZIndex } from '../lib/getZIndex';
import { useAB } from '../lib/useAB';
import { ExpandableMarketingCard } from './ExpandableMarketingCard';
import { Hide } from './Hide';

const isViewportBelowTopOfBody = (topOfBody: Element) =>
	topOfBody.getBoundingClientRect().top < 0;

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

const stickyContainerStyles = css`
	position: sticky;
	top: 0;
	${getZIndex('expandableMarketingCardOverlay')};
	animation: slidein 2.4s linear;

	@keyframes slidein {
		from {
			transform: translateX(-1200px);
		}

		to {
			transform: translateX(0);
		}
	}
`;

const absoluteContainerStyles = css`
	position: absolute;
	width: 100%;
`;

interface Props {
	guardianBaseURL: string;
}

export const ExpandableMarketingCardWrapper = ({ guardianBaseURL }: Props) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isClosed, setIsClosed] = useState(false);
	const [isApplicableUser, setIsApplicableUser] = useState(false);
	const [topOfBody, setTopOfBody] = useState<Element | null>(null);

	/**
	 * On screen sizes below leftCol (<1140px), only display the card
	 * when the user scrolls past the top of the article.
	 */
	const [shouldDisplayCard, setShouldDisplayCard] = useState(false);

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

	useEffect(() => {
		setTopOfBody(document.querySelector('[data-gu-name="body"]'));
	}, []);

	useEffect(() => {
		if (!topOfBody) return;

		/**
		 * It's possible that the viewport does not start at the top of the page.
		 */
		if (isViewportBelowTopOfBody(topOfBody)) {
			setShouldDisplayCard(true);
			return;
		}

		/**
		 * Show the card when the top of the body moves out of the viewport.
		 */
		const observer = new window.IntersectionObserver(
			([entry]) => {
				if (!entry) return;
				if (entry.isIntersecting) {
					setShouldDisplayCard(true);
				}
			},
			{ rootMargin: '0px 0px -100%' },
		);

		observer.observe(topOfBody);

		return () => {
			observer.disconnect();
		};
	}, [topOfBody]);

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
		<>
			<Hide when="below" breakpoint="leftCol">
				<ExpandableMarketingCard
					guardianBaseURL={guardianBaseURL}
					heading={heading}
					kicker={kicker}
					isExpanded={isExpanded}
					setIsExpanded={setIsExpanded}
					setIsClosed={setIsClosed}
				/>
			</Hide>
			<Hide when="above" breakpoint="leftCol">
				{shouldDisplayCard && (
					<div css={stickyContainerStyles}>
						<div css={absoluteContainerStyles}>
							<ExpandableMarketingCard
								guardianBaseURL={guardianBaseURL}
								heading={heading}
								kicker={kicker}
								isExpanded={isExpanded}
								setIsExpanded={setIsExpanded}
								setIsClosed={setIsClosed}
							/>
						</div>
					</div>
				)}
			</Hide>
		</>
	);
};
