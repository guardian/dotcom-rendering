import { storage } from '@guardian/libs';
import {
	getWeeklyArticleHistory,
	incrementWeeklyArticleCount,
} from '@guardian/support-dotcom-components';
import type { WeeklyArticleHistory } from '@guardian/support-dotcom-components/dist/dotcom/src/types';
import { useEffect, useState } from 'react';
import { hasOptedOutOfArticleCount } from '../lib/contributions';
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

export const getArticleCounts = async (
	pageId: string,
	tags: TagType[],
	keywordIds: string,
	contentType: string,
): Promise<ArticleCounts | undefined> => {
	if (await hasOptedOutOfArticleCount()) return undefined;

	// See https://github.com/guardian/frontend/blob/9c8707d894c858dd17de1c7c1499f6b91f5287bc/common/app/model/DotcomContentType.scala#L29
	const shouldIncrement = [
		'article',
		'liveblog',
		'gallery',
		'video',
		'interactive',
		'audio',
	].includes(contentType.toLowerCase());

	// hasOptedOut needs to be done before we check if articleCount is set in the window
	// This is because a potential race condition where one invocation of getArticleCounts
	// is waiting for hasOptedOut another invocation might receive it and increment the article count.

	const keywordAndToneTagIds: string[] = [
		...keywordIds.split(','),
		...tags
			.filter((tag) => tag?.type.toLowerCase() === 'tone')
			.map((tag) => tag.id),
	];

	if (!window.guardian.weeklyArticleCount) {
		if (shouldIncrement) {
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
	if (!window.guardian.dailyArticleCount) {
		if (shouldIncrement) {
			incrementDailyArticleCount();
		}
		window.guardian.dailyArticleCount = getDailyArticleCount();
	}

	return {
		weeklyArticleHistory: window.guardian.weeklyArticleCount ?? [],
		dailyArticleHistory: window.guardian.dailyArticleCount ?? [],
	};
};

export const useArticleCounts = (
	pageId: string,
	tags: TagType[],
	keywordIds: string,
	contentType: string,
): ArticleCounts | undefined | 'Pending' => {
	const [articleCounts, setArticleCounts] = useState<
		ArticleCounts | undefined | 'Pending'
	>('Pending');

	useEffect(() => {
		getArticleCounts(pageId, tags, keywordIds, contentType)
			.then(setArticleCounts)
			.catch(() => setArticleCounts(undefined));
	}, [contentType, pageId, tags, keywordIds]);

	return articleCounts;
};
