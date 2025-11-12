import { isObject, storage } from '@guardian/libs';
import type { DCRFrontCard } from '../types/front';

/*
 * We want to better surface content in the "highlights" container that is beyond the fold.
 * To do this, user engagement will affect the ordering of the container.
 * If a card has been clicked, we consider that card engaged with and move it to the back of the container.
 * If a card has been viewed 2 or more times but not actively interacted with (i.e. clicked), we consider the card unengaged and move it to the back of the container.
 * If editorial has updated the highlights container, we reset the ordering to allow for editorial oversight.
 * The user only stores one highlight container history in storage. If a different front is visited that has a highlights container,
 * it will reset local storage with the new container data.
 * */

type HighlightCardState = {
	card: DCRFrontCard /* TODO: store a card identifier (eg url) rather than the whole card. */;
	viewCount: number;
	wasClicked: boolean;
};

export type HighlightsState = Array<HighlightCardState>;

type CardEvent = 'VIEW' | 'CLICK';

export const HighlightsHistoryKey = 'gu.history.highlights';

const MAX_VIEW_COUNT = 2;

const isValidHighlightsState = (history: unknown): history is HighlightsState =>
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

/* Retrieve the user's highlights state from local storage */
export const getHighlightsState = (): HighlightsState | undefined => {
	try {
		const highlightHistory = storage.local.get(HighlightsHistoryKey);

		if (!isValidHighlightsState(highlightHistory)) {
			throw new Error(`Invalid ${HighlightsHistoryKey} value`);
		}

		return highlightHistory;
	} catch (e) {
		/* error parsing the string, so remove the key */
		storage.local.remove(HighlightsHistoryKey);
		return undefined;
	}
};

/* clear highlight history from local storage */
const clearHighlightsState = (): void => {
	storage.local.remove(HighlightsHistoryKey);
};

/* store personalised highlights in local storage */
export const saveHighlightsState = (order: HighlightsState): void => {
	storage.local.set(HighlightsHistoryKey, order);
};

/* Maps DCR front cards to history records, initialising view and click tracking */
export const initialiseHighlightsState = (
	cards: Array<DCRFrontCard>,
): HighlightsState => {
	return cards.map((card) => ({
		card,
		viewCount: 0,
		wasClicked: false,
	}));
};

/* Reset highlight history in local storage */
export const resetHighlightsState = (cards: DCRFrontCard[]): void => {
	clearHighlightsState();
	const highlights = initialiseHighlightsState(cards);
	saveHighlightsState(highlights);
};

/* Maps history records to DCR front cards for faster rendering */
export const getCardsFromState = (
	history: HighlightsState,
): Array<DCRFrontCard> => {
	return history.map((highlight) => {
		return highlight.card;
	});
};

export const getOrderedHighlights = (): Array<DCRFrontCard> => {
	const history = getHighlightsState() ?? [];
	return getCardsFromState(history);
};

/* Track when a user has clicked on a highlight card */
export const onCardClick = (
	highlights: HighlightsState,
	card?: DCRFrontCard,
): HighlightsState => {
	/* if we don't have a card, return highlights as is */
	if (!card) return highlights;

	const index = highlights.findIndex((el) => el.card.url === card.url);

	const foundCard = highlights[index];

	/* if we can't find the card, or it has already been clicked, return highlights as is */
	if (!foundCard || foundCard.wasClicked) return highlights;

	const updatedCard = {
		...foundCard,
		wasClicked: true,
	};

	/* Rebuild without the clicked card, then append the updated one */
	return [
		...highlights.slice(0, index),
		...highlights.slice(index + 1),
		updatedCard,
	];
};

/*
 * Track a view for the first 2 cards in the highlights container and reorder if necessary.
 * Persist the view count and the new card order in local storage
 */
export const onCardView = (highlights: HighlightsState): HighlightsState => {
	const viewedCards = highlights.slice(0, 2);

	const updatedCards: HighlightCardState[] = [];

	const newHighlights = highlights.map((el) => {
		if (viewedCards.includes(el) && el.viewCount < MAX_VIEW_COUNT) {
			const newViewCount = el.viewCount + 1;
			const updated = { ...el, viewCount: newViewCount };
			updatedCards.push(updated);
			return updated;
		}
		return el;
	});

	/* Separate the updated cards that now have viewCount >= 2 */
	const toMove = updatedCards.filter((el) => el.viewCount >= MAX_VIEW_COUNT);
	if (toMove.length === 0) return newHighlights;

	/* Remove the updated cards from their current positions */
	const remaining = newHighlights.filter((el) => !toMove.includes(el));

	/* Append the updated cards to the end, preserving order */
	return [...remaining, ...toMove];
};

export const onHighlightEvent = (
	event: CardEvent,
	card?: DCRFrontCard,
): void => {
	const localHighlights = getHighlightsState() ?? [];

	const updatedHighlights: HighlightsState =
		event === 'VIEW'
			? onCardView(localHighlights)
			: onCardClick(localHighlights, card);

	saveHighlightsState(updatedHighlights);
};
