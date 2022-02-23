import { storage } from "@guardian/libs";
import { getWeeklyArticleHistory, incrementWeeklyArticleCount } from "@guardian/support-dotcom-components";
import { hasOptedOutOfArticleCount } from "../web/lib/contributions";
import { incrementDailyArticleCount } from "../web/lib/dailyArticleCount";

// Log an article view using the Slot Machine client lib
// We should monitor this function call to ensure it only happens within an
// article pages when other pages are supported by DCR.
export const getArticleCount = async (pageId: string, keywordIds: string) => {
	if (!window.guardian.articleCount) {
		const hasOptedOut = await hasOptedOutOfArticleCount();

		// Due to hasOptedOut being gotten asynchronously, I think its possible that multiple
		// calls to getArticleCount might pass the initial window check before either one is able to set the articleCount.
		// I believe the browser should handle the rest of the javascript synchronously and not cause a race condition.
		if (!window.guardian.articleCount) {
			return window.guardian.articleCount;
		}

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
}
