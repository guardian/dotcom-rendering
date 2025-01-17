import type { AuthStatus } from '../../lib/identity';
import {
	getAuthStatus as getAuthStatus_,
	isUserLoggedInOktaRefactor as isUserLoggedInOktaRefactor_,
} from '../../lib/identity';
import { getAdFreeCookie, setAdFreeCookie } from './cookies/adFree';
import { setHideSupportMessagingCookie } from './cookies/hideSupportMessaging';
import {
	getUserFeaturesExpiryCookie,
	setUserFeaturesExpiryCookie,
} from './cookies/userFeaturesExpiry';
import { fetchJson } from './fetchJson';
import { deleteAllCookies, refresh } from './user-features';

const fakeUserBenefits = {
	benefits: ['adFree', 'hideSupportMessaging'],
};

jest.mock('./fetchJson', () => {
	return {
		fetchJson: jest.fn(() => {
			return Promise.resolve(fakeUserBenefits);
		}),
	};
});

jest.mock('../../lib/identity', () => ({
	isUserLoggedInOktaRefactor: jest.fn(),
	getAuthStatus: jest.fn(),
	getOptionsHeadersWithOkta: jest.fn(),
}));

const fetchJsonSpy = fetchJson as jest.MockedFunction<typeof fetchJson>;

const isUserLoggedInOktaRefactor =
	isUserLoggedInOktaRefactor_ as jest.MockedFunction<
		typeof isUserLoggedInOktaRefactor_
	>;

const getAuthStatus = getAuthStatus_ as jest.MockedFunction<
	typeof getAuthStatus_
>;

const setAllFeaturesData = (opts: { isExpired: boolean }) => {
	const currentTime = new Date().getTime();
	const msInOneDay = 24 * 60 * 60 * 1000;
	const expiryDate = opts.isExpired
		? new Date(currentTime - msInOneDay)
		: new Date(currentTime + msInOneDay);

	setHideSupportMessagingCookie(true);
	setAdFreeCookie(2);
	setUserFeaturesExpiryCookie(expiryDate.getTime().toString());
};

beforeAll(() => {
	window.guardian.config.page.userAttributesApiUrl = '';
	window.guardian.config.tests['useUserBenefitsApiVariant'] = 'variant';
});

describe('Refreshing the features data', () => {
	describe('If user signed in', () => {
		beforeEach(() => {
			jest.resetAllMocks();
			isUserLoggedInOktaRefactor.mockResolvedValue(true);
			getAuthStatus.mockResolvedValue({
				kind: 'SignedInWithOkta',
			} as AuthStatus);
			fetchJsonSpy.mockReturnValue(Promise.resolve(fakeUserBenefits));
		});

		it('Performs an update if the user has missing data', async () => {
			deleteAllCookies();
			await refresh();
			expect(fetchJsonSpy).toHaveBeenCalledTimes(1);
		});

		it('Performs an update if the user has expired data', async () => {
			setAllFeaturesData({ isExpired: true });
			await refresh();
			expect(fetchJsonSpy).toHaveBeenCalledTimes(1);
		});

		it('Does not delete the data just because it has expired', async () => {
			setAllFeaturesData({ isExpired: true });
			await refresh();
			expect(getUserFeaturesExpiryCookie()).toEqual(
				expect.stringMatching(/\d{13}/),
			);
			expect(getAdFreeCookie()).toEqual(expect.stringMatching(/\d{13}/));
		});

		it('Does not perform update if user has fresh feature data', async () => {
			setAllFeaturesData({ isExpired: false });
			await refresh();
			expect(fetchJsonSpy).not.toHaveBeenCalled();
		});
	});
});
describe('If user signed out', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		isUserLoggedInOktaRefactor.mockResolvedValue(false);
		fetchJsonSpy.mockReturnValue(Promise.resolve());
	});

	it('Does not perform update, even if feature data missing', async () => {
		deleteAllCookies();
		await refresh();
		expect(fetchJsonSpy).not.toHaveBeenCalled();
	});

	it('Deletes leftover feature data', async () => {
		setAllFeaturesData({ isExpired: false });
		await refresh();
		expect(getAdFreeCookie()).toBeNull();
		expect(getUserFeaturesExpiryCookie()).toBeNull();
	});
});

describe('Storing new feature data', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		fetchJsonSpy.mockReturnValue(Promise.resolve(fakeUserBenefits));
		deleteAllCookies();
		isUserLoggedInOktaRefactor.mockResolvedValue(true);
		getAuthStatus.mockResolvedValue({
			kind: 'SignedInWithOkta',
		} as AuthStatus);
	});

	it('Puts the ad-free state in appropriate cookie', () => {
		fetchJsonSpy.mockReturnValueOnce(
			Promise.resolve({
				benefits: [],
			}),
		);
		return refresh().then(() => {
			expect(getAdFreeCookie()).toBeNull();
		});
	});

	it('Puts the ad-free state in appropriate cookie', () => {
		fetchJsonSpy.mockReturnValueOnce(
			Promise.resolve({
				benefits: ['adFree'],
			}),
		);
		return refresh().then(() => {
			expect(getAdFreeCookie()).toBeTruthy();
			expect(
				Number.isNaN(
					parseInt(
						// @ts-expect-error -- we’re testing it
						getAdFreeCookie(),
						10,
					),
				),
			).toBe(false);
		});
	});

	it('Puts an expiry date in an accompanying cookie', () =>
		refresh().then(() => {
			const expiryDate = getUserFeaturesExpiryCookie();
			expect(expiryDate).toBeTruthy();
			// @ts-expect-error -- we’re testing it
			expect(Number.isNaN(parseInt(expiryDate, 10))).toBe(false);
		}));

	it('The expiry date is in the future', () =>
		refresh().then(() => {
			const expiryDateString = getUserFeaturesExpiryCookie();
			// @ts-expect-error -- we’re testing it
			const expiryDateEpoch = parseInt(expiryDateString, 10);
			const currentTimeEpoch = new Date().getTime();
			expect(currentTimeEpoch < expiryDateEpoch).toBe(true);
		}));
});
