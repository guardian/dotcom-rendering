import { setCookie } from '@guardian/libs';
import {
	getLastOneOffContributionTimestamp,
	isRecentOneOffContributor,
	lazyFetchEmailWithTimeout,
	ONE_OFF_CONTRIBUTION_DATE_COOKIE,
	recentlyClosedBanner,
	SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE,
} from './contributions';
import { getIdApiUserData } from './getIdapiUserData';

const clearAllCookies = () => {
	const cookies = document.cookie.split(';');
	for (const cookie of cookies) {
		const eqPos = cookie.indexOf('=');
		const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
		document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
	}
};

const userResponse = {
	status: 'ok',
	user: {
		primaryEmailAddress: 'test@guardian.co.uk',
	},
};

jest.mock('./getIdapiUserData', () => {
	const originalModule = jest.requireActual('./getIdapiUserData');
	return {
		...originalModule,
		getIdApiUserData: jest.fn(() => Promise.resolve(userResponse)),
	};
});

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

	it('returns false if there is no one-off contribution cookie', () => {
		expect(isRecentOneOffContributor()).toBe(false);
	});

	it('returns true if there are 5 days between the last contribution date and now', () => {
		setCookie({
			name: ONE_OFF_CONTRIBUTION_DATE_COOKIE,
			value: '2018-08-01',
		});
		global.Date.now = jest.fn(() => Date.parse('2018-08-07T10:50:34'));
		expect(isRecentOneOffContributor()).toBe(true);
	});

	it('returns true if there are 0 days between the last contribution date and now', () => {
		setCookie({
			name: ONE_OFF_CONTRIBUTION_DATE_COOKIE,
			value: '2018-08-01',
		});
		global.Date.now = jest.fn(() => Date.parse('2018-08-01T13:00:30'));
		expect(isRecentOneOffContributor()).toBe(true);
	});

	it('returns false if the one-off contribution was more than 3 months ago', () => {
		setCookie({
			name: ONE_OFF_CONTRIBUTION_DATE_COOKIE,
			value: '2018-08-01',
		});
		global.Date.now = jest.fn(() => Date.parse('2019-08-01T13:00:30'));
		expect(isRecentOneOffContributor()).toBe(false);
	});
});

describe('lazyFetchEmailWithTimeout', () => {
	it('returns a function to get the email address', async () => {
		const fetchEmail = lazyFetchEmailWithTimeout('https://idapi-url.com');
		expect(getIdApiUserData).not.toHaveBeenCalled();

		const result = await fetchEmail();
		expect(result).toBe(userResponse.user.primaryEmailAddress);
		expect(getIdApiUserData).toHaveBeenCalledWith('https://idapi-url.com');
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
		console.log('comparing', new Date(lastClosedAt).getTime(), now);
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
