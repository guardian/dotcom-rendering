import { getCookie } from '@root/src/web/browser/cookie';

// User Atributes API cookies (dropped on sign-in)
export const HIDE_SUPPORT_MESSAGING_COOKIE = 'gu_hide_support_messaging';
export const RECURRING_CONTRIBUTOR_COOKIE = 'gu_recurring_contributor';
export const ONE_OFF_CONTRIBUTION_DATE_COOKIE = 'gu_one_off_contribution_date';

// Support Frontend cookies (dropped when contribution is made)
export const SUPPORT_RECURRING_CONTRIBUTOR_MONTHLY_COOKIE =
    'gu.contributions.recurring.contrib-timestamp.Monthly';
export const SUPPORT_RECURRING_CONTRIBUTOR_ANNUAL_COOKIE =
    'gu.contributions.recurring.contrib-timestamp.Annual';
export const SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE =
    'gu.contributions.contrib-timestamp';

// Cookie set by the User Attributes API upon signing in.
// Value computed server-side and looks at all of the user's active products,
// including but not limited to recurring & one-off contributions,
// paper & digital subscriptions, as well as user tiers (GU supporters/staff/partners/patrons).
// https://github.com/guardian/members-data-api/blob/3a72dc00b9389968d91e5930686aaf34d8040c52/membership-attribute-service/app/models/Attributes.scala
const shouldShowSupportMessaging = (): boolean => {
    const hideSupportMessaging =
        getCookie(HIDE_SUPPORT_MESSAGING_COOKIE) === 'true';

    return !hideSupportMessaging;
};

// Determine if user is a recurring contributor by checking if they are signed in
// AND have at least one of the relevant cookies.
// We need to look at both User Attributes and Frontend Support cookies
// as the former might not reflect the latest contributor status, since it's set upon signing in.
// Frontend Support cookies are set when a contribution is made.
export const isRecurringContributor = (isSignedIn: boolean): boolean => {
    // Attributes cookie - we want this to have a specific value
    const isRecurringContributorFromAttrs =
        getCookie(RECURRING_CONTRIBUTOR_COOKIE) === 'true';

    // Support cookies - we only care whether these exist
    const hasMonthlyContributionCookie =
        getCookie(SUPPORT_RECURRING_CONTRIBUTOR_MONTHLY_COOKIE) !== null;
    const hasAnnualContributionCookie =
        getCookie(SUPPORT_RECURRING_CONTRIBUTOR_ANNUAL_COOKIE) !== null;

    return (
        isSignedIn &&
        (isRecurringContributorFromAttrs ||
            hasMonthlyContributionCookie ||
            hasAnnualContributionCookie)
    );
};

// looks at attribute and support cookies
// ONE_OFF_CONTRIBUTION_DATE_COOKIE (attributes cookie, when loggin in)
// SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE (support cookie, when making one-off contribution)
// Get the date of the latest one-off contribution by looking at the two relevant cookies
// and returning a Unix epoch string of the latest date found.
export const getLastOneOffContributionDate = (): number | undefined => {
    // Attributes cookie - expects YYYY-MM-DD
    const contributionDateFromAttributes = getCookie(
        ONE_OFF_CONTRIBUTION_DATE_COOKIE,
    );

    // Support cookies - expects Unix epoch
    const contributionDateFromSupport = getCookie(
        SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE,
    );

    if (!contributionDateFromAttributes && !contributionDateFromSupport) {
        return undefined;
    }

    // Parse dates into common format so they can be compared
    const parsedDateFromAttributes = contributionDateFromAttributes
        ? Date.parse(contributionDateFromAttributes)
        : 0;
    const parsedDateFromSupport = contributionDateFromSupport
        ? parseInt(contributionDateFromSupport, 10)
        : 0;

    // Return most recent date
    // Condition only passed if 'parsedDateFromAttributes' is NOT NaN
    if (parsedDateFromAttributes > parsedDateFromSupport) {
        return parsedDateFromAttributes;
    }

    return parsedDateFromSupport || undefined; // This guards against 'parsedDateFromSupport' being NaN
};

const dateDiffDays = (from: number, to: number): number => {
    const oneDayMs = 1000 * 60 * 60 * 24;
    const diffMs = to - from;
    return Math.floor(diffMs / oneDayMs);
};

const AskPauseDays = 90;

export const isRecentOneOffContributor = () => {
    const lastContributionDate = getLastOneOffContributionDate();
    if (lastContributionDate) {
        const now = Date.now();
        return dateDiffDays(lastContributionDate, now) <= AskPauseDays;
    }

    return false;
};

export const shouldHideSupportMessaging = (isSignedIn: boolean = false): boolean =>
    !shouldShowSupportMessaging() ||
    isRecurringContributor(isSignedIn) ||
    isRecentOneOffContributor();

