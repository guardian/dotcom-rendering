import {setCountryCode, getCountryCode} from "@root/src/web/lib/getCountryCode";
import {
    HIDE_SUPPORT_MESSAGING_COOKIE,
    RECURRING_CONTRIBUTOR_COOKIE, SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE, SUPPORT_RECURRING_CONTRIBUTOR_ANNUAL_COOKIE,
    SUPPORT_RECURRING_CONTRIBUTOR_MONTHLY_COOKIE
} from "@root/src/web/lib/contributions";
import {addCookie, getCookie, removeCookie} from "@root/src/web/browser/cookie";
import {setAlreadyVisited} from "@root/src/web/lib/alreadyVisited";

const readerRevenueCookies = [
    HIDE_SUPPORT_MESSAGING_COOKIE,
    RECURRING_CONTRIBUTOR_COOKIE,
    SUPPORT_RECURRING_CONTRIBUTOR_MONTHLY_COOKIE,
    SUPPORT_RECURRING_CONTRIBUTOR_ANNUAL_COOKIE,
    SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE,
];

const clearEpicViewLog = (): void => localStorage.removeItem('gu.contributions.views');
const clearBannerLastClosedAt = (): void => localStorage.removeItem('engagementBannerLastClosedAt');

const fakeOneOffContributor = (): void =>
    addCookie(SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE, Date.now().toString());

const MULTIVARIATE_ID_COOKIE = 'GU_mvt_id';
const MAX_CLIENT_MVT_ID = 1000000;
const incrementMvtCookie = (): void => {
    const mvtId = parseInt(getCookie(MULTIVARIATE_ID_COOKIE) || '1', 10);
    if (mvtId) {
        if (mvtId === MAX_CLIENT_MVT_ID) {
            // Wrap back to 1 if it would exceed the max
            addCookie(MULTIVARIATE_ID_COOKIE, '1');
        } else {
            addCookie(MULTIVARIATE_ID_COOKIE, `${mvtId + 1}`);
        }
    }
};
const decrementMvtCookie = (): void => {
    const mvtId = parseInt(getCookie(MULTIVARIATE_ID_COOKIE) || '1', 10);
    if (mvtId) {
        if (mvtId === 0) {
            // Wrap back to max if it would be less than 0
            addCookie(MULTIVARIATE_ID_COOKIE, MAX_CLIENT_MVT_ID.toString());
        } else {
            addCookie(MULTIVARIATE_ID_COOKIE, `${mvtId - 1}`);
        }
    }
};

const init = (shouldHideReaderRevenue: boolean) => {

    const clearCommonReaderRevenueStateAndReload = (asExistingSupporter: boolean): void => {
        if (shouldHideReaderRevenue) {
            /* eslint-disable no-alert */
            alert(
                'This page has "Prevent membership/contribution appeals" ticked in Composer. Please try a different page'
            );
            /* eslint-enable no-alert */
            return;
        }

        readerRevenueCookies.forEach(cookie => removeCookie(cookie));
        clearEpicViewLog();

        if (asExistingSupporter) {
            fakeOneOffContributor();
        }

        window.location.reload();
    };

    const showMeTheEpic = (asExistingSupporter: boolean = false): void => {
        clearCommonReaderRevenueStateAndReload(asExistingSupporter);
    };

    const showMeTheBanner = (asExistingSupporter: boolean = false): void => {
        clearBannerLastClosedAt();
        setAlreadyVisited(2);
        clearCommonReaderRevenueStateAndReload(asExistingSupporter);
    };

    const showNextVariant = (asExistingSupporter: boolean = false): void => {
        incrementMvtCookie();
        clearCommonReaderRevenueStateAndReload(asExistingSupporter);
    };

    const showPreviousVariant = (asExistingSupporter: boolean = false): void => {
        decrementMvtCookie();
        clearCommonReaderRevenueStateAndReload(asExistingSupporter);
    };

    const changeGeolocation = (asExistingSupporter: boolean = false): void => {
        getCountryCode().then(current => {
            /* eslint-disable no-alert */
            const geo = window.prompt(
                `Enter two-letter geolocation code (e.g. GB, US, AU). Current is ${current}.`
            );
            if (geo === 'UK') {
                alert(`'UK' is not a valid geolocation - please use 'GB' instead!`);
            } else if (geo) {
                setCountryCode(geo);
                clearCommonReaderRevenueStateAndReload(asExistingSupporter);
            }
            /* eslint-enable no-alert */
        })
    };

    window.guardian.readerRevenue = {
        changeGeolocation,
        showMeTheEpic,
        showMeTheBanner,
        showNextVariant,
        showPreviousVariant
    };
};

export {
    init
}
