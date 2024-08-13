import { setCookie, storage } from '@guardian/libs';
import MockDate from 'mockdate';
import {
	getLastOneOffContributionTimestamp,
	hasSupporterCookie,
	HIDE_SUPPORT_MESSAGING_COOKIE,
	isRecentOneOffContributor,
	NO_RR_BANNER_KEY,
	ONE_OFF_CONTRIBUTION_DATE_COOKIE,
	recentlyClosedBanner,
	setLocalNoBannerCachePeriod,
	SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE,
	withinLocalNoBannerCachePeriod,
} from './contributions';

const clearAllCookies = () => {
	const cookies = document.cookie.split(';');
	for (const cookie of cookies) {
		const eqPos = cookie.indexOf('=');
		const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
		document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
	}
};

describe('getLastOneOffContributionDate', () => {
	beforeEach(clearAllCookies);

	it('returns date from attributes cookie if only cookie found', () => {
		const somePastDate = '2020-01-28';
		setCookie({
			name: ONE_OFF_CONTRIBUTION_DATE_COOKIE,
			value: somePastDate,
		});
		const lastOneOffContributionDate = getLastOneOffContributionTimestamp();

		// Our function will convert YYYY-MM-DD into a timestamp
		const somePastDateToTimestamp = Date.parse(somePastDate);
		expect(lastOneOffContributionDate).toBe(somePastDateToTimestamp);
	});

	it('returns a support cookie date if only cookie found', () => {
		const somePastDate = 1582567969093;
		setCookie({
			name: SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE,
			value: String(somePastDate),
		});
		const lastOneOffContributionDate = getLastOneOffContributionTimestamp();
		expect(lastOneOffContributionDate).toBe(somePastDate);
	});

	it('returns the most recent date if both cookies present', () => {
		const muchLongerAgo = '2020-01-28';
		setCookie({
			name: ONE_OFF_CONTRIBUTION_DATE_COOKIE,
			value: muchLongerAgo,
		});

		const notSoLongAgo = 1582567969093;
		setCookie({
			name: SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE,
			value: String(notSoLongAgo),
		});

		const lastOneOffContributionDate = getLastOneOffContributionTimestamp();
		expect(lastOneOffContributionDate).toBe(notSoLongAgo);
	});

	it('returns an empty string if no dates can be parsed correctly', () => {
		setCookie({
			name: ONE_OFF_CONTRIBUTION_DATE_COOKIE,
			value: 'CANT_TOUCH_THIS',
		});
		setCookie({
			name: SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE,
			value: 'OR_THIS',
		});

		const lastOneOffContributionDate = getLastOneOffContributionTimestamp();
		expect(lastOneOffContributionDate).toBeUndefined();
	});

	it('returns an empty string if no one-off contribution found', () => {
		const lastOneOffContributionDate = getLastOneOffContributionTimestamp();
		expect(lastOneOffContributionDate).toBeUndefined();
	});
});

describe('isRecentOneOffContributor', () => {
	beforeEach(clearAllCookies);
	afterEach(() => {
		MockDate.reset();
	});

	it('returns false if there is no one-off contribution cookie', () => {
		expect(isRecentOneOffContributor()).toBe(false);
	});

	it('returns true if there are 5 days between the last contribution date and now', () => {
		setCookie({
			name: ONE_OFF_CONTRIBUTION_DATE_COOKIE,
			value: '2018-08-01',
		});

		MockDate.set(Date.parse('2018-08-07T10:50:34'));
		expect(isRecentOneOffContributor()).toBe(true);
	});

	it('returns true if there are 0 days between the last contribution date and now', () => {
		setCookie({
			name: ONE_OFF_CONTRIBUTION_DATE_COOKIE,
			value: '2018-08-01',
		});
		MockDate.set(Date.parse('2018-08-01T13:00:30'));
		expect(isRecentOneOffContributor()).toBe(true);
	});

	it('returns false if the one-off contribution was more than 3 months ago', () => {
		setCookie({
			name: ONE_OFF_CONTRIBUTION_DATE_COOKIE,
			value: '2018-08-01',
		});
		MockDate.set(Date.parse('2019-08-01T13:00:30'));
		expect(isRecentOneOffContributor()).toBe(false);
	});
});

describe('getPurchaseInfo', () => {
	let getPurchaseInfo: () => any;

	beforeEach(() => {
		clearAllCookies();
		// Reset modules to avoid memoized cookies affecting tests
		jest.resetModules();
		({ getPurchaseInfo } = jest.requireActual('./contributions'));
	});

	it('returns decoded cookie data', () => {
		setCookie({
			name: 'GU_CO_COMPLETE',
			value: '%7B%22userType%22%3A%22guest%22%2C%22product%22%3A%22DigitalPack%22%7D',
		});
		expect(getPurchaseInfo()).toEqual({
			userType: 'guest',
			product: 'DigitalPack',
		});
	});

	it('returns undefined if cookie unset', () => {
		expect(getPurchaseInfo()).toBeUndefined();
	});

	it('returns undefined if cookie data invalid', () => {
		setCookie({
			name: 'GU_CO_COMPLETE',
			value: 'utter-nonsense',
		});
		expect(getPurchaseInfo()).toBeUndefined();
	});
});

describe('recentlyClosedBanner', () => {
	it('returns true if banner was closed 59 mins ago', () => {
		const lastClosedAt = '2023-12-07T09:00:00.000Z';
		const now = new Date(lastClosedAt).getTime() + 1000 * 59 * 60;
		expect(recentlyClosedBanner(lastClosedAt, now)).toEqual(true);
	});

	it('returns false if banner was closed 60 mins ago', () => {
		const lastClosedAt = '2023-12-07T09:00:00.000Z';
		const now = new Date(lastClosedAt).getTime() + 1000 * 60 * 60;
		expect(recentlyClosedBanner(lastClosedAt, now)).toEqual(false);
	});

	it('returns false if banner was not closed', () => {
		const lastClosedAt = undefined;
		const now = new Date('2023-12-07T09:00:00.000Z').getTime();
		expect(recentlyClosedBanner(lastClosedAt, now)).toEqual(false);
	});
});

describe('withinLocalNoBannerCachePeriod', () => {
	beforeEach(() => {
		storage.local.remove(NO_RR_BANNER_KEY);
	});

	it('returns true if not expired', () => {
		setLocalNoBannerCachePeriod();
		expect(withinLocalNoBannerCachePeriod()).toEqual(true);
	});

	it('returns false if expired', () => {
		const past = new Date('2020-01-01').getTime();
		setLocalNoBannerCachePeriod(past);
		expect(withinLocalNoBannerCachePeriod()).toEqual(false);
	});

	it('returns false if no local storage item', () => {
		expect(withinLocalNoBannerCachePeriod()).toEqual(false);
	});

	// The following 2 tests relate to a temporary issue with invalid expiry values - see https://github.com/guardian/csnx/pull/1099
	it('returns true if expiry is number and not expired', () => {
		storage.local.set(NO_RR_BANNER_KEY, true, Date.now() + 10000);
		expect(withinLocalNoBannerCachePeriod()).toEqual(true);
	});

	it('returns false if expiry is number and expired', () => {
		storage.local.set(NO_RR_BANNER_KEY, true, Date.now() - 10000);
		expect(withinLocalNoBannerCachePeriod()).toEqual(false);
	});
});

describe('hasSupporterCookie', () => {
	beforeEach(clearAllCookies);

	it('returns false if cookie exists and is set to false', () => {
		setCookie({
			name: HIDE_SUPPORT_MESSAGING_COOKIE,
			value: 'false',
		});
		expect(hasSupporterCookie(true)).toEqual(false);
	});

	it('returns true if cookie exists and is set to true', () => {
		setCookie({
			name: HIDE_SUPPORT_MESSAGING_COOKIE,
			value: 'true',
		});
		expect(hasSupporterCookie(true)).toEqual(true);
	});

	it('returns false if cookie does not exist and user is signed out', () => {
		expect(hasSupporterCookie(false)).toEqual(false);
	});

	it('returns Pending if cookie does not exist and user is signed in', () => {
		expect(hasSupporterCookie(true)).toEqual('Pending');
	});
});
