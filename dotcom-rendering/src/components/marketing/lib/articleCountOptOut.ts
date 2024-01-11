/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/modules/src/modules/shared/helpers/articleCountOptOut.ts
 */
import { getCookie, removeCookie, setCookie, storage } from '@guardian/libs';

const ARTICLE_COUNT_OPT_OUT_COOKIE = {
	name: 'gu_article_count_opt_out',
	daysToLive: 90,
};

const DAILY_ARTICLE_COUNT_STORAGE_KEY = 'gu.history.dailyArticleCount';
const WEEKLY_ARTICLE_COUNT_STORAGE_KEY = 'gu.history.weeklyArticleCount';
const ARTICLES_THIS_WEEK_STORAGE_KEY = 'gu.history.articleCountsThisWeek';

export const addArticleCountOptOutCookie = (): void =>
	setCookie({
		name: ARTICLE_COUNT_OPT_OUT_COOKIE.name,
		value: new Date().getTime().toString(),
		daysToLive: ARTICLE_COUNT_OPT_OUT_COOKIE.daysToLive,
	});

export const removeArticleCountOptOutCookie = (): void =>
	removeCookie({ name: ARTICLE_COUNT_OPT_OUT_COOKIE.name });

export const removeArticleCountFromLocalStorage = (): void => {
	storage.local.remove(DAILY_ARTICLE_COUNT_STORAGE_KEY);
	storage.local.remove(WEEKLY_ARTICLE_COUNT_STORAGE_KEY);
	storage.local.remove(ARTICLES_THIS_WEEK_STORAGE_KEY);
};

export const hasArticleCountOptOutCookie = (): boolean =>
	!!getCookie({ name: ARTICLE_COUNT_OPT_OUT_COOKIE.name });
