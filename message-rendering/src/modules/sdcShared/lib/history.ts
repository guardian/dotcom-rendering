import {
    LocalStorage,
    TagCounts,
    WeeklyArticleHistory,
    WeeklyArticleLog,
} from '../types/targeting';

const weeklyArticleCountKey = 'gu.history.weeklyArticleCount';
const articleCountsThisWeekKey = 'gu.history.articleCountsThisWeek';

export interface ArticleCountsThisWeek {
    week: number;
    articles: {
        [pageId: string]: number;
    };
}

// Returns the previous monday for the given date, in days since epoch
export const getMondayFromDate = (date: Date): number => {
    const day = date.getDay() || 7; // Sunday is 0, so set it to 7
    const time = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - (day - 1));
    return time / 86400000;
};

/**
 * Returns the weekly article history object
 */
export const getWeeklyArticleHistory = (
    localStorage: LocalStorage,
): WeeklyArticleHistory | undefined => {
    return localStorage.get(weeklyArticleCountKey) || undefined;
};

const articleHasBeenViewedThisWeek = (localStorage: LocalStorage, pageId: string): boolean => {
    const mondayThisWeek = getMondayFromDate(new Date());

    const articleCounts = localStorage.get(
        articleCountsThisWeekKey,
    ) as ArticleCountsThisWeek | null;

    if (articleCounts && articleCounts.week === mondayThisWeek) {
        const currentCount = articleCounts.articles[pageId] || 0;

        localStorage.set(articleCountsThisWeekKey, {
            week: mondayThisWeek,
            articles: {
                ...articleCounts.articles,
                [pageId]: currentCount + 1,
            },
        });

        return currentCount > 0;
    } else {
        // It's a new week
        localStorage.set(articleCountsThisWeekKey, {
            week: mondayThisWeek,
            articles: { [pageId]: 1 },
        });

        return false;
    }
};

const tagsOfInterest = new Set<string>([
    'environment/climate-change',
    'environment/climate-crisis',
    'environment/environment',
    'science/science',
    'politics/politics',
    'us-news/us-politics',
    'australia-news/australian-politics',
    'world/world',
    'world/europe-news',
    'world/russia',
    'books/books',
    'culture/culture',
    'world/coronavirus-outbreak',
    'world/race',
    'inequality/inequality',
    'technology/technology',
    'business/business',
]);

/**
 * Returns a TagCounts object with incremented counts for all relevant tags in tagIds.
 * Actually mutates and returns the given currentTagCounts for efficiency.
 */
const updateTagsCounts = (tagIds: string[], currentTagCounts: TagCounts = {}): TagCounts => {
    tagIds.forEach(tagId => {
        if (tagsOfInterest.has(tagId)) {
            currentTagCounts[tagId] = (currentTagCounts[tagId] ?? 0) + 1;
        }
    });
    return currentTagCounts;
};

/**
 * Increment the weekly article counter
 * Checks whether an object already exists for the current week
 * If so, increment the value; otherwise, create new object and set counter to 1.
 * Also uses the `articleCountsThisWeek` item to deduplicate urls in the current week.
 */
export const incrementWeeklyArticleCount = (
    localStorage: LocalStorage,
    pageId: string,
    tagIds: string[],
): void => {
    const hasBeenViewedThisWeek = articleHasBeenViewedThisWeek(localStorage, pageId);

    if (!hasBeenViewedThisWeek) {
        const mondayThisWeek = getMondayFromDate(new Date());
        const weeklyArticleHistory = localStorage.get(weeklyArticleCountKey) || [];
        const currentWeek = weeklyArticleHistory[0];

        if (currentWeek && currentWeek.week && currentWeek.week === mondayThisWeek) {
            // Increment this week's counter & save updated array
            currentWeek.count += 1;

            currentWeek.tags = updateTagsCounts(tagIds, currentWeek.tags);
            localStorage.set(weeklyArticleCountKey, weeklyArticleHistory);
        } else {
            // Create new counter for this week
            weeklyArticleHistory.unshift({
                week: mondayThisWeek,
                count: 1,
                tags: updateTagsCounts(tagIds, {}),
            });

            // Keep only weeks newer than 1 year
            const oneYearAgo = mondayThisWeek - 365;
            const weeksNewerThanOneYear = weeklyArticleHistory.filter(
                (weeklyArticleLog: WeeklyArticleLog) => weeklyArticleLog.week >= oneYearAgo,
            );

            // Save new array
            localStorage.set(weeklyArticleCountKey, weeksNewerThanOneYear);
        }
    }
};
