import { shouldShow } from '@guardian/consent-management-platform';

// use the dailyArticleCount from the local storage to see how many articles the user has viewed in a day
import { getDailyArticleCount } from '@frontend/web/lib/dailyArticleCount';

// in our case if this is the n-numbered article or higher the user has viewed then set the gate
export const isNPageOrHigherPageView = (n: number = 2): boolean => {
    // get daily read article count array from local storage
    const [dailyCount] = getDailyArticleCount();

    const { count = 0 } = dailyCount;

    return count >= n;
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
export const isValidContentType = (CAPI: CAPIBrowserType): boolean => {
    // It's safer to definitively *include* types
    // we explicitly included
    // types then we would be able to know new types will not break the sign-in-gate going forward
    const validTypes = ['Article'];

    return validTypes.reduce((valid: boolean, type: string): boolean => {
        if (valid) return true;
        return CAPI.contentType === type;
    }, false);
};

// hide the sign in gate on certain sections of the site, e.g info, about, help etc.
export const isValidSection = (CAPI: CAPIBrowserType): boolean => {
    const invalidSections = [
        'about',
        'info',
        'membership',
        'help',
        'guardian-live-australia',
    ];

    // we check for invalid section by reducing the above array, and then NOT the result so we know
    // its a valid section
    return !invalidSections.reduce(
        (isSectionInvalid: boolean, section: string): boolean => {
            if (isSectionInvalid) return true;

            // looks up window.guardian.config object in the browser console
            return CAPI.sectionName === section;
        },
        false,
    );
};

// wrapper over the cmp should show method
export const shouldShowCmp = () => shouldShow();
