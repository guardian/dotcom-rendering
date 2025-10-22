import { isObject, storage } from '@guardian/libs';
import type { DCRFrontCard } from '../types/front';

/*
 * We want to better surface content in the highglihgts container that is beyond the fold.
 * To do this, the ordering of the highlights container is affected by user engagement.
 * If a card has been clicked, we consider that card engaged with and move it to the back of the container.
 * If a card has been ignored 3 or more times, we consider the card unengaged and move it to the back of the container.
 * If the highlights container has been updated by editorial, we reset the ordering to allow for editorial oversight.
 * */

type HighlightCardHistory = {
	card: DCRFrontCard;
	viewCount: number;
	clicked: boolean;
};

export type HighlightHistory = Array<HighlightCardHistory>;

export const HighlightHistoryKey = 'gu.history.highlights';

// todo: improve type of card
const isValidHighlightHistory = (
	history: unknown,
): history is HighlightHistory =>
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
export const getHighlightHistory = (): HighlightHistory | undefined => {
	try {
		const highlighthistory = storage.local.get(HighlightHistoryKey);

		if (!isValidHighlightHistory(highlighthistory)) {
			throw new Error(`Invalid ${HighlightHistoryKey} value`);
		}

		return highlighthistory;
	} catch (e) {
		// error parsing the string, so remove the key
		storage.local.remove(HighlightHistoryKey);
		return undefined;
	}
};

const resetHighlights = (): void => {
	storage.local.remove(HighlightHistoryKey);
};

export const storeOrderInStorage = (order: HighlightHistory): void => {
	storage.local.set(HighlightHistoryKey, order);
};

const convertCardsToHistory = (
	cards: Array<DCRFrontCard>,
): HighlightHistory => {
	return cards.map((card, index) => ({
		card,
		viewCount: 0,
		clicked: false,
		originalPosition: index,
		moveTimestamp: undefined,
	}));
};

export const resetStoredHighlights = (cards: DCRFrontCard[]): void => {
	resetHighlights();
	const highlights = convertCardsToHistory(cards);
	storeOrderInStorage(highlights);
};

const getOrderedCardsFromHistory = (
	history: HighlightHistory,
): Array<DCRFrontCard> => {
	return history.map((highlight) => {
		return highlight.card;
	});
};

export const getHighlightCards = (): Array<DCRFrontCard> => {
	const history = getHighlightHistory() ?? [];
	// const orderedHistory = orderCardsByHistory(history);
	return getOrderedCardsFromHistory(history);
};

const trackCardClick = (
	highlights: HighlightHistory,
	card?: DCRFrontCard,
): HighlightHistory => {
	if (!card) return highlights;

	// find the matching card
	const index = highlights.findIndex((el) => el.card.url === card.url);
	if (index === -1) return highlights; // card not found

	// copy array so we don't mutate the original
	const newHighlights = [...highlights];

	// remove the found element
	const [found] = newHighlights.splice(index, 1);
	if (!found || found.clicked) return newHighlights;

	// update it
	const updated = {
		...found,
		clicked: true,
	};

	// move to the end
	newHighlights.push(updated);

	return newHighlights;
};

const trackCardView = (highlights: HighlightHistory): HighlightHistory => {
	// we always track a view for the first 2 cards in the highlights container as we can guarantee they appear on screen.
	const viewedCards = highlights.slice(0, 2);

	const updatedCards: HighlightCardHistory[] = [];

	const newHighlights = highlights.map((el) => {
		if (viewedCards.includes(el) && el.viewCount < 3) {
			const newViewCount = el.viewCount + 1;
			const updated = { ...el, viewCount: newViewCount };
			updatedCards.push(updated);
			return updated;
		}
		return el;
	});

	// Separate the updated cards that now have viewCount >= 3
	const toMove = updatedCards.filter((el) => el.viewCount >= 3);
	if (toMove.length === 0) return newHighlights;

	// Remove those cards from their current positions
	const remaining = newHighlights.filter((el) => !toMove.includes(el));

	// Append them to the end, preserving order
	return [...remaining, ...toMove];
};

//
// const trackCardView = (highlights: OrderedHighlights): OrderedHighlights => {
// 	const unviewedCards = highlights.slice(0, 2);
// 	return highlights.map((el) =>
// 		unviewedCards.includes(el)
// 			? { ...el, viewCount: (el.viewCount += 1) }
// 			: el,
// 	);
//
//
// };

// const shouldDemoteCard = (card: HighlightCard) => {
// 	return card.viewCount > 2 || card.clicked;
// };

// type Buckets = [keep: HighlightCard[], demote: HighlightCard[]];
//
// export const orderCardsByHistory = (
// 	highlights: OrderedHighlights,
// ): OrderedHighlights => {
//
//
//
//
// 	//
// 	// // First, order the highlights by their original order
// 	// const sortedHighlights = [...highlights].sort(
// 	// 	(a, b) => a.originalPosition - b.originalPosition
// 	// );
//
// 	// Next, organise the cards into two buckets;
// 	// a "kept" bucket for those cards which should retain their position,
// 	// and a "demote" bucket for those which should be demoted to the back of the container
// 	//
// 	const [keep, demote] = highlights.reduce((acc: Buckets, card) => {
// 		const [kept, demoted] = acc;
//
// 		if (card.moveTimestamp) {
// 			demoted.push(card);
// 		// }
// 		// if (shouldDemoteCard(card)) {
// 		// 	demoted.push(card);
// 		} else {
// 			kept.push(card);
// 		}
// 		return acc;
// 	}, [[],[]])
//
//
// 	return [...keep, ...demote.sort((a, b) => new Date(b.moveTimestamp ??0) - new Date(a.moveTimestamp))];
//
// };

type CardEngagement = 'VIEW' | 'CLICK';

export const trackCardEngagement = (
	engagement: CardEngagement,
	card?: DCRFrontCard,
): void => {
	const history = getHighlightHistory() ?? [];

	const newHistory: HighlightHistory =
		engagement === 'VIEW'
			? trackCardView(history)
			: trackCardClick(history, card);

	storeOrderInStorage(newHistory);
};
