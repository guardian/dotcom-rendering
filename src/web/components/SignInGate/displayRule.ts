// use the dailyArticleCount from the local storage to see how many articles the user has viewed in a day
// in our case if this is the n-numbered article or higher the user has viewed then set the gate
export const isNPageOrHigherPageView = (n: number = 2): boolean => {
    // get daily read article count array from local storage
    const getDailyArticleCount = (): { count: number; day: number } => {
        try {
            const item = localStorage.getItem('gu.history.dailyArticleCount');
            const defaultIfNothingInLocalStorage = { count: 0 };
            return (
                // get the count from latest date, if it doesnt exist, set to 0
                (item && JSON.parse(item).value[0]) ||
                defaultIfNothingInLocalStorage
            );
        } catch {
            return { count: 0, day: 0 };
        }
    };

    const { count } = getDailyArticleCount();

    // check if count is greater or equal to 1 less than n since dailyArticleCount is incremented after this component is loaded
    return count >= n - 1;
};

// determine if the useragent is running iOS 9 (known to be buggy for sign in flow)
export const isIOS9 = (): boolean => {
    // get the browser user agent
    const ua = navigator.userAgent;
    // check useragent if the device is an iOS device
    const appleDevice = /(iPhone|iPod|iPad)/i.test(ua);
    // check useragent if the os is version 9
    const os = /(CPU OS 9_)/i.test(ua);

    // if both true, then it's an apple ios 9 device
    return appleDevice && os;
};

// hide the sign in gate on article types that are not supported
// add to the include parameter array if there are specific types that should be included/overridden
export const isInvalidArticleType = (
    CAPI: CAPIBrowserType,
    include: Array<string> = [],
): boolean => {
    // TODO: It's likely safer to definitively *include* types
    // in particular DCR doesn't have Fronts or Hosted or Paid Content yet
    // so 'excluding' doesn't make sense, whereas if we explicitly included
    // types then we would be able to know new types will not break the sign-in-gate going forward
    const invalidTypes = [
        'isColumn',
        'isFront',
        'isHosted',
        'isImmersive',
        'isLive',
        'isLiveBlog',
        'isNumberedList',
        'isPaidContent',
        'isPhotoEssay',
        'isSensitive',
        'isSplash',
    ];

    return invalidTypes
        .filter((el) => !include.includes(el)) // This allows you to override the default invalid types by removing them from the array
        .reduce((isArticleInvalid: boolean, type: string): boolean => {
            if (isArticleInvalid) return true;
            return !!CAPI.config.page?.[type];
        }, false);
};

// hide the sign in gate on certain sections of the site, e.g info, about, help etc.
// add to the include parameter array if there are specific types that should be included/overridden
export const isInvalidSection = (
    CAPI: CAPIBrowserType,
    include: Array<string> = [],
): boolean => {
    const invalidSections = [
        'about',
        'info',
        'membership',
        'help',
        'guardian-live-australia',
    ];

    return invalidSections
        .filter((el) => !include.includes(el))
        .reduce((isSectionInvalid: boolean, section: string): boolean => {
            if (isSectionInvalid) return true;

            // looks up window.guardian.config object in the browser console
            return CAPI.config.page?.section === section;
        }, false);
};
