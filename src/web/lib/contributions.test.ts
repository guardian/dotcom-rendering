import { addCookie } from '../browser/cookie';
import {
    getLastOneOffContributionDate,
    ONE_OFF_CONTRIBUTION_DATE_COOKIE,
    SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE,
} from './contributions';

const clearAllCookies = () => {
    const cookies = document.cookie.split(';');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
};

describe('getLastOneOffContributionDate', () => {
    beforeEach(clearAllCookies);

    it('returns date from attributes cookie if only cookie found', () => {
        const somePastDate = '2020-01-28';
        addCookie(ONE_OFF_CONTRIBUTION_DATE_COOKIE, somePastDate);
        const lastOneOffContributionDate = getLastOneOffContributionDate();

        // Our function will convert YYYY-MM-DD into a timestamp
        const somePastDateToTimestamp = Date.parse(somePastDate);
        expect(lastOneOffContributionDate).toBe(somePastDateToTimestamp);
    });

    it('returns a support cookie date if only cookie found', () => {
        const somePastDate = 1582567969093;
        addCookie(SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE, String(somePastDate));
        const lastOneOffContributionDate = getLastOneOffContributionDate();
        expect(lastOneOffContributionDate).toBe(somePastDate);
    });

    it('returns the most recent date if both cookies present', () => {
        const muchLongerAgo = '2020-01-28';
        addCookie(ONE_OFF_CONTRIBUTION_DATE_COOKIE, muchLongerAgo);

        const notSoLongAgo = 1582567969093;
        addCookie(SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE, String(notSoLongAgo));

        const lastOneOffContributionDate = getLastOneOffContributionDate();
        expect(lastOneOffContributionDate).toBe(notSoLongAgo);
    });

    it('returns an empty string if no dates can be parsed correctly', () => {
        addCookie(ONE_OFF_CONTRIBUTION_DATE_COOKIE, 'CANT_TOUCH_THIS');
        addCookie(SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE, 'OR_THIS');

        const lastOneOffContributionDate = getLastOneOffContributionDate();
        expect(lastOneOffContributionDate).toBeUndefined();
    });

    it('returns an empty string if no one-off contribution found', () => {
        const lastOneOffContributionDate = getLastOneOffContributionDate();
        expect(lastOneOffContributionDate).toBeUndefined();
    });
});
