import { storage } from '@guardian/libs';

export type HighlightsArticleHistory = Array<string>;

export const HighlightArticleCountKey = 'gu.history.highlightArticleCount';

const isValidHistory = (
	history: unknown,
): history is HighlightsArticleHistory =>
	Array.isArray(history) &&
	history.every((daily) => typeof daily === 'string');

// Returns undefined if no highlight articles have been clicked and stored in local storage
export const getHighlightClickHistory = ():
	| HighlightsArticleHistory
	| undefined => {
	try {
		const dailyCount = storage.local.get(HighlightArticleCountKey);

		if (!isValidHistory(dailyCount)) {
			throw new Error(`Invalid ${HighlightArticleCountKey} value`);
		}

		return dailyCount;
	} catch (e) {
		// error parsing the string, so remove the key
		storage.local.remove(HighlightArticleCountKey);
		return undefined;
	}
};

export const storeHighlightArticleVisit = (articleID: string): void => {
	// get the article click history from local storage
	const highlightHistory = getHighlightClickHistory() ?? [];

	if (highlightHistory.includes(articleID)) {
		return;
	}

	highlightHistory.push(articleID);

	// set the latest article click
	storage.local.set(HighlightArticleCountKey, highlightHistory);
};
