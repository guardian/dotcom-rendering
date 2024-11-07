import { storage } from '@guardian/libs';
import {
	getWeeklyArticleHistory,
	incrementWeeklyArticleCount,
} from '@guardian/support-dotcom-components';
import type { WeeklyArticleHistory } from '@guardian/support-dotcom-components/dist/dotcom/src/types';
import { useEffect, useState } from 'react';
import { hasOptedOutOfWeeklyArticleCount } from '../lib/contributions';
import type { DailyArticleHistory } from '../lib/dailyArticleCount';
import {
	getDailyArticleCount,
	incrementDailyArticleCount,
} from '../lib/dailyArticleCount';
import type { TagType } from '../types/tag';

export interface ArticleCounts {
	weeklyArticleHistory: WeeklyArticleHistory;
	dailyArticleHistory: DailyArticleHistory;
}

export const shouldIncrementArticleCount = (contentType: string): boolean => {
	return [
		'article',
		'liveblog',
		'gallery',
		'video',
		'interactive',
		'audio',
	].includes(contentType.toLowerCase());
};

export const getDailyArticleCounts = (
	contentType: string,
): DailyArticleHistory | undefined => {
	if (!window.guardian.dailyArticleCount) {
		if (shouldIncrementArticleCount(contentType)) {
			incrementDailyArticleCount();
		}
		window.guardian.dailyArticleCount = getDailyArticleCount();
	}
	return window.guardian.dailyArticleCount;
};

export const getWeeklyArticleCounts = async (
	pageId: string,
	tags: TagType[],
	contentType: string,
): Promise<WeeklyArticleHistory | undefined> => {
	// See https://github.com/guardian/frontend/blob/9c8707d894c858dd17de1c7c1499f6b91f5287bc/common/app/model/DotcomContentType.scala#L29
	if (await hasOptedOutOfWeeklyArticleCount()) return undefined;

	if (!window.guardian.weeklyArticleCount) {
		if (shouldIncrementArticleCount(contentType)) {
			// hasOptedOut needs to be done before we check if articleCount is set in the window
			// This is because a potential race condition where one invocation of getArticleCounts
			// is waiting for hasOptedOut another invocation might receive it and increment the article count.

			const keywordAndToneTagIds: string[] = tags
				.filter((tag) =>
					['tone', 'keyword'].includes(tag.type.toLowerCase()),
				)
				.map((tag) => tag.id);
			incrementWeeklyArticleCount(
				storage.local,
				pageId,
				keywordAndToneTagIds,
			);
		}
		window.guardian.weeklyArticleCount = getWeeklyArticleHistory(
			storage.local,
		);
	}

	return window.guardian.weeklyArticleCount;
};

export const getArticleCounts = async (
	pageId: string,
	tags: TagType[],
	contentType: string,
): Promise<ArticleCounts | undefined> => {
	return {
		dailyArticleHistory: getDailyArticleCounts(pageId) ?? [],
		weeklyArticleHistory:
			(await getWeeklyArticleCounts(pageId, tags, contentType)) ?? [],
	};
};

export const useArticleCounts = (
	pageId: string,
	tags: TagType[],
	contentType: string,
): ArticleCounts | undefined | 'Pending' => {
	const [articleCounts, setArticleCounts] = useState<
		ArticleCounts | undefined | 'Pending'
	>('Pending');

	useEffect(() => {
		getArticleCounts(pageId, tags, contentType)
			.then(setArticleCounts)
			.catch(() => setArticleCounts(undefined));
	}, [contentType, pageId, tags]);

	return articleCounts;
};
