import { addCookie, removeCookie, getCookie } from '../../../lib/cookies';

const ARTICLE_COUNT_OPT_OUT_COOKIE = {
    name: 'gu_article_count_opt_out',
    daysToLive: 90,
};

const DAILY_ARTICLE_COUNT_STORAGE_KEY = 'gu.history.dailyArticleCount';
const WEEKLY_ARTICLE_COUNT_STORAGE_KEY = 'gu.history.weeklyArticleCount';
const ARTICLES_THIS_WEEK_STORAGE_KEY = 'gu.history.articleCountsThisWeek';

export const addArticleCountOptOutCookie = (): void =>
    addCookie(
        ARTICLE_COUNT_OPT_OUT_COOKIE.name,
        new Date().getTime().toString(),
        ARTICLE_COUNT_OPT_OUT_COOKIE.daysToLive,
    );

export const removeArticleCountOptOutCookie = (): void =>
    removeCookie(ARTICLE_COUNT_OPT_OUT_COOKIE.name);

export const removeArticleCountFromLocalStorage = (): void => {
    window.localStorage.removeItem(DAILY_ARTICLE_COUNT_STORAGE_KEY);
    window.localStorage.removeItem(WEEKLY_ARTICLE_COUNT_STORAGE_KEY);
    window.localStorage.removeItem(ARTICLES_THIS_WEEK_STORAGE_KEY);
};

export const hasArticleCountOptOutCookie = (): boolean =>
    !!getCookie(ARTICLE_COUNT_OPT_OUT_COOKIE.name);
