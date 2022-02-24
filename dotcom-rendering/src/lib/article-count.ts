import { storage } from '@guardian/libs';
import {
	getWeeklyArticleHistory,
	incrementWeeklyArticleCount,
} from '@guardian/support-dotcom-components';
import { WeeklyArticleHistory } from '@guardian/support-dotcom-components/dist/dotcom/src/types';
import { hasOptedOutOfArticleCount } from '../web/lib/contributions';
import { incrementDailyArticleCount } from '../web/lib/dailyArticleCount';

// We should monitor this function call to ensure it only happens within an
// article pages when other pages are supported by DCR.
export const getArticleCount = async (
	pageId: string,
	keywordIds: string,
): Promise<WeeklyArticleHistory | undefined> => {
	const hasOptedOut = await hasOptedOutOfArticleCount();

	// hasOptedOut needs to be done before we check if articleCount is set in the window
	// This is because a potential race condition where one invocation of getArticleCount
	// is waiting for hasOptedOut another invocation might receive it and increment the article count.
	if (!window.guardian.articleCount) {
		if (!hasOptedOut) {
			incrementDailyArticleCount();
			incrementWeeklyArticleCount(
				storage.local,
				pageId,
				keywordIds.split(','),
			);
		}

		window.guardian.articleCount = getWeeklyArticleHistory(storage.local);
	}

	return window.guardian.articleCount;
};
