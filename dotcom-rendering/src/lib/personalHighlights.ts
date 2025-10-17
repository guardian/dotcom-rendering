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

const resetHighlights = (): void => {
	storage.local.remove(OrderedHighlightsKey);
};

export const storeOrderInStorage = (order: OrderedHighlights): void => {
	storage.local.set(OrderedHighlightsKey, order);
};

const convertCardsToHighlights = (
	cards: Array<DCRFrontCard>,
): OrderedHighlights => {
	return cards.map((card) => ({
		card,
		viewCount: 0,
		clicked: false,
	}));
};

export const resetStoredHighlights = (cards: DCRFrontCard[]): void => {
	resetHighlights();
	const highlights = convertCardsToHighlights(cards);
	storeOrderInStorage(highlights);
};

const getOrderedCardsFromHistory = (
	history: OrderedHighlights,
): Array<DCRFrontCard> => {
	return history.map((highlight) => {
		return highlight.card;
	});
};

export const getHighlightCards = (): Array<DCRFrontCard> => {
	const history = getOrderedHighlights() ?? [];
	return getOrderedCardsFromHistory(history);
};

const trackCardClick = (
	highlights: OrderedHighlights,
	card?: DCRFrontCard,
): OrderedHighlights => {
	if (!card) return highlights;
	return highlights.map((el) =>
		el.card.url === card.url ? { ...el, clicked: true } : el,
	);
};

const trackCardView = (highlights: OrderedHighlights): OrderedHighlights => {
	const unviewedCards = highlights.slice(0, 2);
	return highlights.map((el) =>
		unviewedCards.includes(el)
			? { ...el, viewCount: (el.viewCount += 1) }
			: el,
	);
};

const shouldDemoteCard = (card: HighlightCard) => {
	console.log(
		'>>> showuld demote card? ',
		card.viewCount >= 3 || card.clicked,
		card,
		'viewCount: ',
		card.viewCount,
		'clicked: ',
		card.clicked,
	);
	return card.viewCount >= 3 || card.clicked;
};

const orderCardsByHistory = (
	highlights: OrderedHighlights,
): OrderedHighlights => {
	return highlights.reduce((acc: HighlightCard[], card) => {
		if (shouldDemoteCard(card)) {
			acc.push(card);
		} else {
			acc.unshift(card);
		}
		return acc;
	}, []);
};

type CardEngagement = 'VIEW' | 'CLICK';

export const trackCardEngagement = (
	engagement: CardEngagement,
	card?: DCRFrontCard,
): void => {
	console.log('>>> trackCardEngagement: ', engagement);
	const history = getOrderedHighlights() ?? [];
	const newHistory =
		engagement === 'VIEW'
			? trackCardView(history)
			: trackCardClick(history, card);
	const newOrder = orderCardsByHistory(newHistory);
	storeOrderInStorage(newOrder);
};
