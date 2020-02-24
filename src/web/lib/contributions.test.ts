import {
    getLastOneOffContributionDate,
    ONE_OFF_CONTRIBUTION_DATE_COOKIE,
    SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE,
} from './contributions';

const setCookie = (name: string, value: string) => {
    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: `${name}=${value}`,
    });
};

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
        const formattedPastDate = Date.parse(somePastDate).toString();
        setCookie(ONE_OFF_CONTRIBUTION_DATE_COOKIE, somePastDate);
        const lastOneOffContributionDate = getLastOneOffContributionDate();
        expect(lastOneOffContributionDate).toBe(formattedPastDate);
    });

    it('returns a support cookie date if only cookie found', () => {
        const somePastDate = '1582567969093';
        setCookie(SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE, somePastDate);
        const lastOneOffContributionDate = getLastOneOffContributionDate();
        expect(lastOneOffContributionDate).toBe(somePastDate);
    });

    it('returns the most recent date if both cookies present', () => {
        const muchLongerAgo = '2020-01-28';
        setCookie(ONE_OFF_CONTRIBUTION_DATE_COOKIE, muchLongerAgo);

        const notSoLongAgo = '1582567969093';
        setCookie(SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE, notSoLongAgo);

        const lastOneOffContributionDate = getLastOneOffContributionDate();
        expect(lastOneOffContributionDate).toBe(notSoLongAgo);
    });

    it('returns an empty string if no dates can be parsed correctly', () => {
        const noDate1 = 'CANT_TOUCH_THIS';
        setCookie(ONE_OFF_CONTRIBUTION_DATE_COOKIE, noDate1);

        const noDate2 = 'OR_THIS';
        setCookie(SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE, noDate2);

        const lastOneOffContributionDate = getLastOneOffContributionDate();
        expect(lastOneOffContributionDate).toBe('');
    });

    it('returns an empty string if no one-off contribution found', () => {
        const lastOneOffContributionDate = getLastOneOffContributionDate();
        expect(lastOneOffContributionDate).toBe('');
    });
});
