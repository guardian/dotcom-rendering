import { storage } from '@guardian/libs';
import {
	getWeeklyArticleHistory,
	incrementWeeklyArticleCount,
} from '@guardian/support-dotcom-components';
import type { WeeklyArticleHistory } from '@guardian/support-dotcom-components/dist/dotcom/types';
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
	// See https://github.com/guardian/frontend/blob/9c8707d894c858dd17de1c7c1499f6b91f5287bc/common/app/model/DotcomContentType.scala#L29
	return [
		'article',
		'liveblog',
		'gallery',
		'video',
		'interactive',
		'audio',
	].includes(contentType.toLowerCase());
};

/**
 * This function is used to get the daily article counts.
 * It will increment the count if the contentType is listed in the shouldIncrementArticleCount function.
 * This will return and increment the dailyArticleCount for unconsented and consented users.
 *
 * @param {string} contentType
 * @return {*}  {(DailyArticleHistory | undefined)}
 */
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

/**
 * This function is used to get the weekly article counts
 * It will increment the count if the contentType is listed in the shouldIncrementArticleCount function.
 * This will return and increment the weeklyArticleCount for only consented users.
 *
 * @param {string} pageId
 * @param {TagType[]} tags
 * @param {string} contentType
 * @return {*}  {(Promise<WeeklyArticleHistory | undefined>)}
 */
const computeWeeklyArticleCounts = async (
	pageId: string,
	tags: TagType[],
	contentType: string,
): Promise<WeeklyArticleHistory | undefined> => {
	if (await hasOptedOutOfWeeklyArticleCount()) return undefined;

	if (shouldIncrementArticleCount(contentType)) {
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
	window.guardian.weeklyArticleCount = getWeeklyArticleHistory(storage.local);

	return window.guardian.weeklyArticleCount;
};

export const getWeeklyArticleCounts = (
	pageId: string,
	tags: TagType[],
	contentType: string,
): Promise<WeeklyArticleHistory | undefined> =>
	(window.guardian.weeklyArticleCountPromise ??= computeWeeklyArticleCounts(
		pageId,
		tags,
		contentType,
	));

export const initializeWeeklyArticleCounts = (): void => {
	const { pageId, keywordIds, toneIds, contentType } =
		window.guardian.config.page;
	const tags: TagType[] = [
		...(keywordIds ? keywordIds.split(',') : []).map((id) => ({
			id,
			type: 'keyword',
			title: '',
		})),
		...(toneIds ? toneIds.split(',') : []).map((id) => ({
			id,
			type: 'tone',
			title: '',
		})),
	];
	const resolve = window.guardian.resolveWeeklyArticleCount;
	const reject = window.guardian.rejectWeeklyArticleCount;

	if (resolve && reject) {
		delete window.guardian.resolveWeeklyArticleCount;
		delete window.guardian.rejectWeeklyArticleCount;
		void computeWeeklyArticleCounts(pageId ?? '', tags, contentType).then(
			resolve,
			reject,
		);
	} else {
		void getWeeklyArticleCounts(pageId ?? '', tags, contentType);
	}
};

export const getArticleCounts = async (
	pageId: string,
	tags: TagType[],
	contentType: string,
): Promise<ArticleCounts | undefined> => {
	getDailyArticleCounts(contentType);
	const weeklyArticleHistory = await getWeeklyArticleCounts(
		pageId,
		tags,
		contentType,
	);

	return {
		dailyArticleHistory: window.guardian.dailyArticleCount ?? [],
		weeklyArticleHistory: weeklyArticleHistory ?? [],
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
