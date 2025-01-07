import { getCookie, removeCookie, setCookie } from '@guardian/libs';
import type { AuthStatus } from '../../lib/identity';
import {
	getAuthStatus as getAuthStatus_,
	isUserLoggedInOktaRefactor as isUserLoggedInOktaRefactor_,
} from '../../lib/identity';
import { refresh } from './user-features';
import { fetchJson } from './user-features-lib';

const fakeUserFeatures = {
	showSupportMessaging: false,
	contentAccess: {
		digitalPack: true,
		recurringContributor: false,
		paidMember: true,
	},
};

jest.mock('./user-features-lib', () => {
	// Only mock the fetchJson function, rather than the whole module
	const original = jest.requireActual('./user-features-lib');
	return {
		...original,
		fetchJson: jest.fn(() => {
			return Promise.resolve(fakeUserFeatures);
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

const PERSISTENCE_KEYS = {
	USER_FEATURES_EXPIRY_COOKIE: 'gu_user_features_expiry',
	AD_FREE_USER_COOKIE: 'GU_AF1',
	SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE: 'gu.contributions.contrib-timestamp',
	HIDE_SUPPORT_MESSAGING_COOKIE: 'gu_hide_support_messaging',
};

const setAllFeaturesData = (opts: { isExpired: boolean }) => {
	const currentTime = new Date().getTime();
	const msInOneDay = 24 * 60 * 60 * 1000;
	const expiryDate = opts.isExpired
		? new Date(currentTime - msInOneDay)
		: new Date(currentTime + msInOneDay);
	const adFreeExpiryDate = opts.isExpired
		? new Date(currentTime - msInOneDay * 2)
		: new Date(currentTime + msInOneDay * 2);
	setCookie({
		name: PERSISTENCE_KEYS.HIDE_SUPPORT_MESSAGING_COOKIE,
		value: 'true',
	});
	setCookie({
		name: PERSISTENCE_KEYS.AD_FREE_USER_COOKIE,
		value: adFreeExpiryDate.getTime().toString(),
	});
	setCookie({
		name: PERSISTENCE_KEYS.USER_FEATURES_EXPIRY_COOKIE,
		value: expiryDate.getTime().toString(),
	});
};

const deleteAllFeaturesData = () => {
	removeCookie({ name: PERSISTENCE_KEYS.USER_FEATURES_EXPIRY_COOKIE });
	removeCookie({ name: PERSISTENCE_KEYS.AD_FREE_USER_COOKIE });
	removeCookie({ name: PERSISTENCE_KEYS.HIDE_SUPPORT_MESSAGING_COOKIE });
};

beforeAll(() => {
	window.guardian.config.page.userAttributesApiUrl = '';
});

describe('Refreshing the features data', () => {
	describe('If user signed in', () => {
		beforeEach(() => {
			jest.resetAllMocks();
			isUserLoggedInOktaRefactor.mockResolvedValue(true);
			getAuthStatus.mockResolvedValue({
				kind: 'SignedInWithOkta',
			} as AuthStatus);
			fetchJsonSpy.mockReturnValue(Promise.resolve(fakeUserFeatures));
		});

		it('Performs an update if the user has missing data', async () => {
			deleteAllFeaturesData();
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
			expect(
				getCookie({
					name: PERSISTENCE_KEYS.USER_FEATURES_EXPIRY_COOKIE,
				}),
			).toEqual(expect.stringMatching(/\d{13}/));
			expect(
				getCookie({ name: PERSISTENCE_KEYS.AD_FREE_USER_COOKIE }),
			).toEqual(expect.stringMatching(/\d{13}/));
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
		deleteAllFeaturesData();
		await refresh();
		expect(fetchJsonSpy).not.toHaveBeenCalled();
	});

	it('Deletes leftover feature data', async () => {
		setAllFeaturesData({ isExpired: false });
		await refresh();
		expect(
			getCookie({ name: PERSISTENCE_KEYS.AD_FREE_USER_COOKIE }),
		).toBeNull();
		expect(
			getCookie({
				name: PERSISTENCE_KEYS.USER_FEATURES_EXPIRY_COOKIE,
			}),
		).toBeNull();
	});
});

describe('Storing new feature data', () => {
	beforeEach(() => {
		const mockResponse = {
			userId: 'abc',
			showSupportMessaging: false,
			contentAccess: {
				member: false,
				paidMember: false,
				recurringContributor: false,
				digitalPack: false,
				paperSubscriber: false,
				guardianWeeklySubscriber: false,
			},
		};

		jest.resetAllMocks();
		fetchJsonSpy.mockReturnValue(Promise.resolve(mockResponse));
		deleteAllFeaturesData();
		isUserLoggedInOktaRefactor.mockResolvedValue(true);
		getAuthStatus.mockResolvedValue({
			kind: 'SignedInWithOkta',
		} as AuthStatus);
	});

	it('Puts the paying-member state and ad-free state in appropriate cookie', () => {
		fetchJsonSpy.mockReturnValueOnce(
			Promise.resolve({
				showSupportMessaging: false,
				contentAccess: {
					paidMember: false,
					recurringContributor: false,
					digitalPack: false,
				},
				adFree: false,
			}),
		);
		return refresh().then(() => {
			expect(
				getCookie({ name: PERSISTENCE_KEYS.AD_FREE_USER_COOKIE }),
			).toBeNull();
		});
	});

	it('Puts the paying-member state and ad-free state in appropriate cookie', () => {
		fetchJsonSpy.mockReturnValueOnce(
			Promise.resolve({
				showSupportMessaging: false,
				contentAccess: {
					paidMember: true,
					recurringContributor: true,
					digitalPack: true,
				},
				adFree: true,
			}),
		);
		return refresh().then(() => {
			expect(
				getCookie({ name: PERSISTENCE_KEYS.AD_FREE_USER_COOKIE }),
			).toBeTruthy();
			expect(
				Number.isNaN(
					parseInt(
						// @ts-expect-error -- we’re testing it
						getCookie({
							name: PERSISTENCE_KEYS.AD_FREE_USER_COOKIE,
						}),
						10,
					),
				),
			).toBe(false);
		});
	});

	it('Puts an expiry date in an accompanying cookie', () =>
		refresh().then(() => {
			const expiryDate = getCookie({
				name: PERSISTENCE_KEYS.USER_FEATURES_EXPIRY_COOKIE,
			});
			expect(expiryDate).toBeTruthy();
			// @ts-expect-error -- we’re testing it
			expect(Number.isNaN(parseInt(expiryDate, 10))).toBe(false);
		}));

	it('The expiry date is in the future', () =>
		refresh().then(() => {
			const expiryDateString = getCookie({
				name: PERSISTENCE_KEYS.USER_FEATURES_EXPIRY_COOKIE,
			});
			// @ts-expect-error -- we’re testing it
			const expiryDateEpoch = parseInt(expiryDateString, 10);
			const currentTimeEpoch = new Date().getTime();
			expect(currentTimeEpoch < expiryDateEpoch).toBe(true);
		}));
});
