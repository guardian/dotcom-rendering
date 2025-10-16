import { storage } from '@guardian/libs';
import type { DCRFrontCard } from '../types/front';

type HighlightView = {
	id: string;
	count: number;
};

export type HighlightsViewHistory = Array<HighlightView>;

export type OrderedHighlights = Array<DCRFrontCard>;

export const HighlightOrderKey = 'gu.history.highlightsOrder';
export const ViewedHighlights = 'gu.history.highlightsViewed';

const isValidHistory = (history: unknown): history is OrderedHighlights =>
	Array.isArray(history) && history.every((card) => typeof card === 'object');

// Returns undefined if no highlight articles have been clicked and stored in local storage
export const getHighlightClickHistory = (): OrderedHighlights | undefined => {
	try {
		const dailyCount = storage.local.get(HighlightOrderKey);

		if (!isValidHistory(dailyCount)) {
			throw new Error(`Invalid ${HighlightOrderKey} value`);
		}

		return dailyCount;
	} catch (e) {
		// error parsing the string, so remove the key
		storage.local.remove(HighlightOrderKey);
		return undefined;
	}
};

export const setHistoryInLocalStorage = (order: OrderedHighlights): void => {
	storage.local.set(HighlightOrderKey, order);
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
	storage.local.set(HighlightOrderKey, newOrder);
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
	storage.local.set(HighlightOrderKey, newHighlights);
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
) => {
	const demotedCards = viewHistory
		.filter((card) => card.count >= 2)
		.map((card) => card.id);
	// if no cards have been ignored 2 times or more, dont worry, we don't need to do anything
	if (demotedCards.length === 0) return;
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
