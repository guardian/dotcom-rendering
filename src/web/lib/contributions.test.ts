import { addCookie } from '../browser/cookie';
import {
	getLastOneOffContributionTimestamp,
	isRecentOneOffContributor,
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
		const lastOneOffContributionDate = getLastOneOffContributionTimestamp();

		// Our function will convert YYYY-MM-DD into a timestamp
		const somePastDateToTimestamp = Date.parse(somePastDate);
		expect(lastOneOffContributionDate).toBe(somePastDateToTimestamp);
	});

	it('returns a support cookie date if only cookie found', () => {
		const somePastDate = 1582567969093;
		addCookie(SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE, String(somePastDate));
		const lastOneOffContributionDate = getLastOneOffContributionTimestamp();
		expect(lastOneOffContributionDate).toBe(somePastDate);
	});

	it('returns the most recent date if both cookies present', () => {
		const muchLongerAgo = '2020-01-28';
		addCookie(ONE_OFF_CONTRIBUTION_DATE_COOKIE, muchLongerAgo);

		const notSoLongAgo = 1582567969093;
		addCookie(SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE, String(notSoLongAgo));

		const lastOneOffContributionDate = getLastOneOffContributionTimestamp();
		expect(lastOneOffContributionDate).toBe(notSoLongAgo);
	});

	it('returns an empty string if no dates can be parsed correctly', () => {
		addCookie(ONE_OFF_CONTRIBUTION_DATE_COOKIE, 'CANT_TOUCH_THIS');
		addCookie(SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE, 'OR_THIS');

		const lastOneOffContributionDate = getLastOneOffContributionTimestamp();
		expect(lastOneOffContributionDate).toBeUndefined();
	});

	it('returns an empty string if no one-off contribution found', () => {
		const lastOneOffContributionDate = getLastOneOffContributionTimestamp();
		expect(lastOneOffContributionDate).toBeUndefined();
	});
});

/* eslint-disable @typescript-eslint/unbound-method */
describe('isRecentOneOffContributor', () => {
	beforeEach(clearAllCookies);

	it('returns false if there is no one-off contribution cookie', () => {
		expect(isRecentOneOffContributor()).toBe(false);
	});

	it('returns true if there are 5 days between the last contribution date and now', () => {
		addCookie(ONE_OFF_CONTRIBUTION_DATE_COOKIE, '2018-08-01');
		global.Date.now = jest.fn(() => Date.parse('2018-08-07T10:50:34'));
		expect(isRecentOneOffContributor()).toBe(true);
	});

	it('returns true if there are 0 days between the last contribution date and now', () => {
		addCookie(ONE_OFF_CONTRIBUTION_DATE_COOKIE, '2018-08-01');
		global.Date.now = jest.fn(() => Date.parse('2018-08-01T13:00:30'));
		expect(isRecentOneOffContributor()).toBe(true);
	});

	it('returns false if the one-off contribution was more than 3 months ago', () => {
		addCookie(ONE_OFF_CONTRIBUTION_DATE_COOKIE, '2018-08-01');
		global.Date.now = jest.fn(() => Date.parse('2019-08-01T13:00:30'));
		expect(isRecentOneOffContributor()).toBe(false);
	});
});
/* eslint-enable @typescript-eslint/unbound-method  */
