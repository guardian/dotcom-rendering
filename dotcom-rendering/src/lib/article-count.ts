import { storage } from '@guardian/libs';
import {
	getWeeklyArticleHistory,
	incrementWeeklyArticleCount,
} from '@guardian/support-dotcom-components';
import { WeeklyArticleHistory } from '@guardian/support-dotcom-components/dist/dotcom/src/types';
import { hasOptedOutOfArticleCount } from '../web/lib/contributions';
import {
	DailyArticleHistory,
	getDailyArticleCount,
	incrementDailyArticleCount,
} from '../web/lib/dailyArticleCount';

export interface ArticleCounts {
	weeklyArticleHistory: WeeklyArticleHistory | undefined;
	dailyArticleHistory: DailyArticleHistory | undefined;
}

// We should monitor this function call to ensure it only happens within an
// article pages when other pages are supported by DCR.
export const getArticleCount = async (
	pageId: string,
	keywordIds: string,
): Promise<ArticleCounts> => {
	if (await hasOptedOutOfArticleCount())
		return {
			weeklyArticleHistory: undefined,
			dailyArticleHistory: undefined,
		};

	// hasOptedOut needs to be done before we check if articleCount is set in the window
	// This is because a potential race condition where one invocation of getArticleCount
	// is waiting for hasOptedOut another invocation might receive it and increment the article count.
	if (!window.guardian.weeklyArticleCount) {
		incrementWeeklyArticleCount(
			storage.local,
			pageId,
			keywordIds.split(','),
		);

		window.guardian.weeklyArticleCount = getWeeklyArticleHistory(
			storage.local,
		);
	}
	if (!window.guardian.dailyArticleCount) {
		incrementDailyArticleCount();
		window.guardian.dailyArticleCount = getDailyArticleCount();
	}

	return {
		weeklyArticleHistory: window.guardian.weeklyArticleCount,
		dailyArticleHistory: window.guardian.dailyArticleCount,
	};
};
