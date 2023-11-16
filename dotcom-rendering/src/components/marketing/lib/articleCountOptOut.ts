import { getCookie, removeCookie, setCookie } from '@guardian/libs';

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
	window.localStorage.removeItem(DAILY_ARTICLE_COUNT_STORAGE_KEY);
	window.localStorage.removeItem(WEEKLY_ARTICLE_COUNT_STORAGE_KEY);
	window.localStorage.removeItem(ARTICLES_THIS_WEEK_STORAGE_KEY);
};

export const hasArticleCountOptOutCookie = (): boolean =>
	!!getCookie({ name: ARTICLE_COUNT_OPT_OUT_COOKIE.name });
