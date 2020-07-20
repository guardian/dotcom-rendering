interface DailyArticle {
    day: number;
    count: number;
}

export type DailyArticleCount = Array<DailyArticle>;

export const DailyArticleCountKey = 'gu.history.dailyArticleCount';

export const getDailyArticleCount = (): DailyArticleCount => {
    const dailyCount = localStorage.getItem(DailyArticleCountKey);

    if (!dailyCount) {
        return [];
    }

    try {
        return JSON.parse(dailyCount);
    } catch (e) {
        // error parsing the string, so remove the key
        localStorage.removeItem(DailyArticleCountKey);
        // return empty array
        return [];
    }
};

export const incrementDailyArticleCount = (): void => {
    // get the daily article count from local storage
    const dailyArticleCount = getDailyArticleCount();

    // calculate days since unix epoch for today date
    const today = Math.floor(Date.now() / 86400000);

    // check if latest day is today and increment if so
    if (
        dailyArticleCount[0] &&
        dailyArticleCount[0].day &&
        dailyArticleCount[0].day === today
    ) {
        dailyArticleCount[0].count += 1;
    } else {
        // else set new day
        dailyArticleCount.unshift({ day: today, count: 1 });

        // remove any days older than 60
        const cutOff = today - 60;

        const firstOldDayIndex = dailyArticleCount.findIndex(
            (dailyCount) => dailyCount.day && dailyCount.day < cutOff,
        );

        if (firstOldDayIndex > 0) {
            dailyArticleCount.splice(firstOldDayIndex);
        }
    }

    // set the latest article count
    localStorage.setItem(
        DailyArticleCountKey,
        JSON.stringify(dailyArticleCount),
    );
};
