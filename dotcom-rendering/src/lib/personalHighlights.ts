import { isObject, storage } from '@guardian/libs';
import type { DCRFrontCard } from '../types/front';

/*
 * We want to better surface content in the "highlights" container that is beyond the fold.
 * To do this, user engagement will affect the ordering of the container.
 * If a card has been clicked, we consider that card engaged with and move it to the back of the container.
 * If a card has been viewed 3 or more times but not actively interacted with (i.e. clicked), we consider the card unengaged and move it to the back of the container.
 * If editorial has updated the highlights container, we reset the ordering to allow for editorial oversight.
 * The user only stores one highlight container history in storage. If a different front is visited that has a highlights container,
 * it will reset local storage with the new container data.
 * */

type HighlightCardHistory = {
	card: DCRFrontCard; // TODO: store a card indentifier rather than the whole card.
	viewCount: number;
	wasClicked: boolean;
};

export type HighlightHistory = Array<HighlightCardHistory>;

type CardEngagement = 'VIEW' | 'CLICK';

export const HighlightsHistoryKey = 'gu.history.highlights';

const MAX_VIEW_COUNT = 3;

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
			'wasClicked' in highlight &&
			isObject(highlight.card) &&
			typeof highlight.viewCount === 'number' &&
			typeof highlight.wasClicked === 'boolean',
	);

// Retrieve the user's highlight card order from local storage
export const getHighlightHistory = (): HighlightHistory | undefined => {
	try {
		const highlightHistory = storage.local.get(HighlightsHistoryKey);

		if (!isValidHighlightHistory(highlightHistory)) {
			throw new Error(`Invalid ${HighlightsHistoryKey} value`);
		}

		return highlightHistory;
	} catch (e) {
		// error parsing the string, so remove the key
		storage.local.remove(HighlightsHistoryKey);
		return undefined;
	}
};

// remove highlight history from local storage
const removeHighlightHistory = (): void => {
	storage.local.remove(HighlightsHistoryKey);
};

// store the personalised history in local storage
export const storeHistoryInStorage = (order: HighlightHistory): void => {
	storage.local.set(HighlightsHistoryKey, order);
};

// Maps DCR front cards to history records, initialising view and click tracking
const convertCardsToHistory = (
	cards: Array<DCRFrontCard>,
): HighlightHistory => {
	return cards.map((card) => ({
		card,
		viewCount: 0,
		wasClicked: false,
	}));
};

// Reset highlight history in local storage
export const resetStoredHighlights = (cards: DCRFrontCard[]): void => {
	removeHighlightHistory();
	const highlights = convertCardsToHistory(cards);
	storeHistoryInStorage(highlights);
};

// Maps history records to DCR front cards for faster rendering
const getCardsFromHistory = (
	history: HighlightHistory,
): Array<DCRFrontCard> => {
	return history.map((highlight) => {
		return highlight.card;
	});
};

export const getHighlightCards = (): Array<DCRFrontCard> => {
	const history = getHighlightHistory() ?? [];
	return getCardsFromHistory(history);
};

// Track when a user has clicked on a highlight card
const trackCardClick = (
	highlights: HighlightHistory,
	card?: DCRFrontCard,
): HighlightHistory => {
	// if we don't have a card, return highlights as is
	if (!card) return highlights;

	const index = highlights.findIndex((el) => el.card.url === card.url);

	const foundCard = highlights[index];

	/* if we can't find the card, or it has already been clicked, return highlights as is */
	if (!foundCard || foundCard.wasClicked) return highlights;

	const updatedCard = {
		...foundCard,
		wasClicked: true,
	};

	// Rebuild without the clicked card, then append the updated one
	return [
		...highlights.slice(0, index),
		...highlights.slice(index + 1),
		updatedCard,
	];
};

const trackCardView = (highlights: HighlightHistory): HighlightHistory => {
	// we always track a view for the first 2 cards in the highlights container as we can guarantee they appear on screen.
	const viewedCards = highlights.slice(0, 2);

	const updatedCards: HighlightCardHistory[] = [];

	const newHighlights = highlights.map((el) => {
		if (viewedCards.includes(el) && el.viewCount < MAX_VIEW_COUNT) {
			const newViewCount = el.viewCount + 1;
			const updated = { ...el, viewCount: newViewCount };
			updatedCards.push(updated);
			return updated;
		}
		return el;
	});

	// Separate the updated cards that now have viewCount >= 3
	const toMove = updatedCards.filter((el) => el.viewCount >= MAX_VIEW_COUNT);
	if (toMove.length === 0) return newHighlights;

	// Remove those cards from their current positions
	const remaining = newHighlights.filter((el) => !toMove.includes(el));

	// Append them to the end, preserving order
	return [...remaining, ...toMove];
};

export const trackCardEngagement = (
	engagement: CardEngagement,
	card?: DCRFrontCard,
): void => {
	const history = getHighlightHistory() ?? [];

	const newHistory: HighlightHistory =
		engagement === 'VIEW'
			? trackCardView(history)
			: trackCardClick(history, card);

	storeHistoryInStorage(newHistory);
};
