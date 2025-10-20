import { isObject, storage } from '@guardian/libs';
import type { DCRFrontCard } from '../types/front';

/*
 * We want to better surface content in the highglihgts container that is beyond the fold.
 * To do this, the ordering of the highlights container is affected by user engagement.
 * If a card has been clicked, we consider that card engaged with and move it to the back of the container.
 * If a card has been ignored 3 or more times, we consider the card unengaged and move it to the back of the container.
 * If the highlights container has been updated by editorial, we reset the ordering to allow for editorial oversight.
 * */

type ViewedHighlight = {
	id: string;
	count: number;
};

export type HighlightsViewHistory = Array<ViewedHighlight>;

export type OrderedHighlights = Array<DCRFrontCard>;

export const OrderedHighlightsKey = 'gu.history.orderedHighlights';
export const ViewedHighlights = 'gu.history.highlightsViewed';

// todo: improve type of card
const isValidOrderedHighlights = (
	history: unknown,
): history is OrderedHighlights =>
	Array.isArray(history) && history.every((card) => isObject(card));

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

export const setHistoryInLocalStorage = (order: OrderedHighlights): void => {
	storage.local.set(OrderedHighlightsKey, order);
};

export const storeHighlightArticleVisit = (
	article: DCRFrontCard,
	highlights: DCRFrontCard[],
): void => {
	const articleIndex = highlights.indexOf(article);

	// if the article is already at the back of the highlights array, leave it be.
	if (articleIndex === -1) {
		return;
	}

	const newOrder = [
		...highlights.slice(0, articleIndex),
		...highlights.slice(articleIndex + 1),
		article,
	];

	// set the latest article click
	setHistoryInLocalStorage(newOrder);
};

const isValidViewHistory = (
	history: unknown,
): history is HighlightsViewHistory =>
	Array.isArray(history) &&
	history.every(
		(article) =>
			isObject(article) &&
			'id' in article &&
			'count' in article &&
			typeof article.day === 'string' &&
			typeof article.count === 'number',
	);

// Returns undefined if no highlight articles have been clicked and stored in local storage
export const getHighlightClickHistory = (): OrderedHighlights | undefined => {
	try {
		const orderedHighlights = storage.local.get(getOrderedHighlights);

		if (!isValidViewHistory(orderedHighlights)) {
			throw new Error(`Invalid ${getOrderedHighlights} value`);
		}

		return orderedHighlights;
	} catch (e) {
		// error parsing the string, so remove the key
		storage.local.remove(getOrderedHighlights);
		return undefined;
	}
};

const trackViewedCard = (
	cardId: string,
	history: Array<{ id: string; count: number }>,
) => {
	if (history.find((el) => el.id == cardId)) {
		return history.map((el) =>
			el.id == cardId ? { ...el, count: (el.count += 1) } : el,
		);
	} else {
		return history.push({ id: cardId, count: 1 });
	}
};

export const manageCardsWithoutViews = (highlights: DCRFrontCard[]): void => {
	const newViewHistory = getViewsWithoutClick(highlights);
	const newHighlights = demoteCardsWithoutClicks(newViewHistory, highlights);
	storage.local.set(ViewedHighlights, newViewHistory);
	setHistoryInLocalStorage(newHighlights);
};

export const getViewsWithoutClick = (
	highlights: OrderedHighlights,
): HighlightsViewHistory => {
	const viewHistory = storage.local.get(ViewedHighlights) as
		| HighlightsViewHistory
		| undefined;
	const unviewedCards = highlights.slice(0, 2);
	const newViewHistory = viewHistory ? [...viewHistory] : [];

	if (unviewedCards.length === 0) return viewHistory ?? [];

	for (const card of unviewedCards) {
		trackViewedCard(card.url, newViewHistory);
	}
	return newViewHistory;
};

export const demoteCardsWithoutClicks = (
	viewHistory: HighlightsViewHistory,
	highlights: OrderedHighlights,
): DCRFrontCard[] => {
	const demotedCards = viewHistory
		.filter((card) => card.count >= 2)
		.map((card) => card.id);
	// if no cards have been ignored 2 times or more, dont worry, we don't need to do anything
	if (demotedCards.length === 0) {
		return highlights;
	}
	// otherwise, move the demoted cards to the back of the highlights container
	const newHighlights = highlights.reduce((acc: DCRFrontCard[], card) => {
		if (demotedCards.includes(card.url)) {
			acc.push(card);
		} else {
			acc.unshift(card);
		}
		return acc;
	}, []);
	return newHighlights;
};
