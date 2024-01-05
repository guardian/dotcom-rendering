import { isObject, storage } from '@guardian/libs';

export interface DailyArticle {
	day: number;
	count: number;
}

export type DailyArticleHistory = Array<DailyArticle>;

export const DailyArticleCountKey = 'gu.history.dailyArticleCount';

const isValidHistory = (history: unknown): history is DailyArticleHistory =>
	Array.isArray(history) &&
	history.every(
		(daily) =>
			isObject(daily) &&
			'day' in daily &&
			'count' in daily &&
			typeof daily.day === 'number' &&
			typeof daily.count === 'number',
	);

// Returns undefined if no daily article count in local storage
export const getDailyArticleCount = (): DailyArticleHistory | undefined => {
	try {
		const dailyCount = storage.local.get(DailyArticleCountKey);

		if (!isValidHistory(dailyCount)) {
			throw new Error('Invalid gu.history.dailyArticleCount value');
		}

		return dailyCount;
	} catch (e) {
		// error parsing the string, so remove the key
		storage.local.remove(DailyArticleCountKey);
		return undefined;
	}
};

export const getToday = (): number => Math.floor(Date.now() / 86_400_000);

export const incrementDailyArticleCount = (): void => {
	// get the daily article count from local storage
	const dailyArticleCount = getDailyArticleCount() ?? [];

	// calculate days since unix epoch for today date
	const today = getToday();

	// check if latest day is today and increment if so
	if (dailyArticleCount[0]?.day === today) {
		dailyArticleCount[0].count += 1;
	} else {
		// else set new day
		dailyArticleCount.unshift({ day: today, count: 1 });

		// remove any days older than 60
		const cutOff = today - 60;

		const firstOldDayIndex = dailyArticleCount.findIndex(
			(dailyCount) => dailyCount.day && dailyCount.day < cutOff,
		);

		if (firstOldDayIndex > 0) {
			dailyArticleCount.splice(firstOldDayIndex);
		}
	}

	// set the latest article count
	storage.local.set(DailyArticleCountKey, dailyArticleCount);
};
