import { storage } from '@guardian/libs';
import type { DCRFrontCard } from '../types/front';

export type HighlightsArticleHistory = Array<DCRFrontCard>;

export const HighlightOrderKey = 'gu.history.highlightsOrder';

const isValidHistory = (
	history: unknown,
): history is HighlightsArticleHistory =>
	Array.isArray(history) && history.every((card) => typeof card === 'object');

// Returns undefined if no highlight articles have been clicked and stored in local storage
export const getHighlightClickHistory = ():
	| HighlightsArticleHistory
	| undefined => {
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

export const setHistoryInLocalStorage = (
	history: HighlightsArticleHistory,
): void => {
	storage.local.set(HighlightOrderKey, history);
};

export const storeHighlightArticleVisit = (
	article: DCRFrontCard,
	setHighlightOrder: (highlightHistory: HighlightsArticleHistory) => void,
	currentOrder: DCRFrontCard[],
): void => {
	// get the article click history from local storage
	const articleIndex = currentOrder.indexOf(article);
	console.log('>>>', { articleIndex });
	if (articleIndex === -1) {
		return;
	}
	console.log('>>> 1', currentOrder);
	// @ts-expect-error
	currentOrder.push(currentOrder.splice(articleIndex, 1)[0]);
	setHighlightOrder(currentOrder);
	console.log('>>> 2', currentOrder);

	// set the latest article click
	storage.local.set(HighlightOrderKey, currentOrder);
};

//
