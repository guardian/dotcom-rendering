import { isObject, storage } from '@guardian/libs';
import type { DCRFrontCard } from '../types/front';

export const DemotedCardsHistoryKey = 'gu.history.demotedCards';
export const ViewedCardsHistoryKey = 'gu.history.viewedCards';

const MAX_VIEW_COUNT = 2;

type DemotedCardHistory = string[];
type CardHistory = { cardUrl: string; viewCount: number };
type ViewedCardHistory = CardHistory[];

/**
 *
 * A card qualifies for demotion if it has been either
 * clicked once
 * or
 * viewed twice
 *
 * We use these two metrics as a proxy for (positive or negative) user engagement with the card
 */

const isValidDemotedState = (history: unknown): history is DemotedCardHistory =>
	Array.isArray(history) &&
	history.every((cardUrl) => typeof cardUrl === 'string');

/* Retrieve the user's demoted card list from local storage */
export const getDemotedState = (): DemotedCardHistory | undefined => {
	try {
		const demotedCardHistory = storage.local.get(DemotedCardsHistoryKey);

		if (!isValidDemotedState(demotedCardHistory)) {
			throw new Error(`Invalid ${DemotedCardsHistoryKey} value`);
		}

		return demotedCardHistory;
	} catch (e) {
		/* error parsing the string, so remove the key */
		storage.local.remove(DemotedCardsHistoryKey);
		return undefined;
	}
};

const isValidViewState = (history: unknown): history is ViewedCardHistory =>
	Array.isArray(history) &&
	history.every(
		(viewedCard) =>
			isObject(viewedCard) &&
			'cardUrl' in viewedCard &&
			'viewCount' in viewedCard &&
			typeof viewedCard.cardUrl === 'string' &&
			typeof viewedCard.viewCount === 'number',
	);

/* Retrieve the user's viewed card state from local storage */
export const getViewedState = (): ViewedCardHistory | undefined => {
	try {
		const ViewedCardState = storage.local.get(ViewedCardsHistoryKey);

		if (!isValidViewState(ViewedCardState)) {
			throw new Error(`Invalid ${ViewedCardsHistoryKey} value`);
		}

		return ViewedCardState;
	} catch (e) {
		/* error parsing the string, so remove the key */
		storage.local.remove(ViewedCardsHistoryKey);
		return undefined;
	}
};

export const trackView = (cards: DCRFrontCard[]): void => {
	const recentlyViewedCardUrls = cards.map((card) => card.url);

	const viewedCards = getViewedState() ?? [];

	const cardsForDemotion: DemotedCardHistory = [];

	const updatedViewedCards = [...viewedCards];

	for (const url of recentlyViewedCardUrls) {
		const index = updatedViewedCards.findIndex(
			(card) => card.cardUrl === url,
		);

		if (index > -1 && updatedViewedCards[index]) {
			// Card already exists, increment count by 1
			const incrementedViewCount =
				updatedViewedCards[index].viewCount + 1;

			const updatedCard = {
				...updatedViewedCards[index],
				viewCount: incrementedViewCount,
			};

			updatedViewedCards[index] = updatedCard;

			if (incrementedViewCount >= MAX_VIEW_COUNT) {
				cardsForDemotion.push(updatedCard.cardUrl);
			}
		} else {
			// New card -> add with count 1
			updatedViewedCards.push({
				cardUrl: url,
				viewCount: 1,
			});
		}
	}

	// Persist viewed cards
	storage.local.set(ViewedCardsHistoryKey, updatedViewedCards);

	// Persist deduped list of demoted cards
	if (cardsForDemotion.length > 0) {
		const demotedCards = getDemotedState() ?? [];
		const nextDemoted = Array.from(
			new Set([...demotedCards, ...cardsForDemotion]),
		);

		storage.local.set(DemotedCardsHistoryKey, nextDemoted);
	}
};
export const trackPersonalisationClick = (url: string): void => {
	const demotedCards = getDemotedState() ?? [];
	storage.local.set(DemotedCardsHistoryKey, [...demotedCards, url]);
};
