import { isObject, storage } from '@guardian/libs';
import type { DCRFrontCard } from '../types/front';

/*
 * We want to better surface content in the highglihgts container that is beyond the fold.
 * To do this, the ordering of the highlights container is affected by user engagement.
 * If a card has been clicked, we consider that card engaged with and move it to the back of the container.
 * If a card has been ignored 3 or more times, we consider the card unengaged and move it to the back of the container.
 * If the highlights container has been updated by editorial, we reset the ordering to allow for editorial oversight.
 * */

type HighlightCard = {
	card: DCRFrontCard;
	viewCount: number;
	clicked: boolean;
};

export type OrderedHighlights = Array<HighlightCard>;

export const OrderedHighlightsKey = 'gu.history.orderedHighlights';

// todo: improve type of card
const isValidOrderedHighlights = (
	history: unknown,
): history is OrderedHighlights =>
	Array.isArray(history) &&
	history.every(
		(highlight) =>
			isObject(highlight) &&
			'card' in highlight &&
			'viewCount' in highlight &&
			'clicked' in highlight &&
			isObject(highlight.card) &&
			typeof highlight.viewCount === 'number' &&
			typeof highlight.clicked === 'boolean',
	);

// Retrieve the user's highlight card order
export const getOrderedHighlights = (): OrderedHighlights | undefined => {
	try {
		const orderedHighlights = storage.local.get(OrderedHighlightsKey);

		if (!isValidOrderedHighlights(orderedHighlights)) {
			throw new Error(`Invalid ${OrderedHighlightsKey} value`);
		}

		return orderedHighlights;
	} catch (e) {
		// error parsing the string, so remove the key
		storage.local.remove(OrderedHighlightsKey);
		return undefined;
	}
};

export const storeOrderInStorage = (order: OrderedHighlights): void => {
	storage.local.set(OrderedHighlightsKey, order);
};

export const getOrderedCardsFromHistory = (
	history: OrderedHighlights,
): Array<DCRFrontCard> => {
	return history.map((highlight) => highlight.card);
};
