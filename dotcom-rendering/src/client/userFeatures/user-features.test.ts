import { getCookie, removeCookie, setCookie } from '@guardian/libs';
import type { AuthStatus } from '../../lib/identity';
import {
	getAuthStatus as getAuthStatus_,
	isUserLoggedInOktaRefactor as isUserLoggedInOktaRefactor_,
} from '../../lib/identity';
import { isDigitalSubscriber, refresh } from './user-features';
import { fetchJson } from './user-features-lib';

jest.mock('./user-features-lib', () => {
	// Only mock the fetchJson function, rather than the whole module
	const original = jest.requireActual('./user-features-lib');
	return {
		...original,
		fetchJson: jest.fn(() => Promise.resolve()),
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
	PAYING_MEMBER_COOKIE: 'gu_paying_member',
	RECURRING_CONTRIBUTOR_COOKIE: 'gu_recurring_contributor',
	AD_FREE_USER_COOKIE: 'GU_AF1',
	ACTION_REQUIRED_FOR_COOKIE: 'gu_action_required_for',
	DIGITAL_SUBSCRIBER_COOKIE: 'gu_digital_subscriber',
	SUPPORT_ONE_OFF_CONTRIBUTION_COOKIE: 'gu.contributions.contrib-timestamp',
	ONE_OFF_CONTRIBUTION_DATE_COOKIE: 'gu_one_off_contribution_date',
	HIDE_SUPPORT_MESSAGING_COOKIE: 'gu_hide_support_messaging',
	SUPPORT_MONTHLY_CONTRIBUTION_COOKIE:
		'gu.contributions.recurring.contrib-timestamp.Monthly',
	SUPPORT_ANNUAL_CONTRIBUTION_COOKIE:
		'gu.contributions.recurring.contrib-timestamp.Annual',
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
	setCookie({ name: PERSISTENCE_KEYS.PAYING_MEMBER_COOKIE, value: 'true' });
	setCookie({
		name: PERSISTENCE_KEYS.RECURRING_CONTRIBUTOR_COOKIE,
		value: 'true',
	});
	setCookie({
		name: PERSISTENCE_KEYS.DIGITAL_SUBSCRIBER_COOKIE,
		value: 'true',
	});
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
	setCookie({
		name: PERSISTENCE_KEYS.ACTION_REQUIRED_FOR_COOKIE,
		value: 'test',
	});
};

const deleteAllFeaturesData = () => {
	removeCookie({ name: PERSISTENCE_KEYS.PAYING_MEMBER_COOKIE });
	removeCookie({ name: PERSISTENCE_KEYS.RECURRING_CONTRIBUTOR_COOKIE });
	removeCookie({ name: PERSISTENCE_KEYS.DIGITAL_SUBSCRIBER_COOKIE });
	removeCookie({ name: PERSISTENCE_KEYS.USER_FEATURES_EXPIRY_COOKIE });
	removeCookie({ name: PERSISTENCE_KEYS.AD_FREE_USER_COOKIE });
	removeCookie({ name: PERSISTENCE_KEYS.ACTION_REQUIRED_FOR_COOKIE });
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
			fetchJsonSpy.mockReturnValue(Promise.resolve());
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
				getCookie({ name: PERSISTENCE_KEYS.PAYING_MEMBER_COOKIE }),
			).toBe('true');
			expect(
				getCookie({
					name: PERSISTENCE_KEYS.RECURRING_CONTRIBUTOR_COOKIE,
				}),
			).toBe('true');
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

		it('Performs an update if membership-frontend wipes just the paying-member cookie', async () => {
			// Set everything except paying-member cookie
			setAllFeaturesData({ isExpired: true });
			removeCookie({ name: PERSISTENCE_KEYS.PAYING_MEMBER_COOKIE });

			await refresh();
			expect(fetchJsonSpy).toHaveBeenCalledTimes(1);
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
			getCookie({ name: PERSISTENCE_KEYS.PAYING_MEMBER_COOKIE }),
		).toBeNull();
		expect(
			getCookie({
				name: PERSISTENCE_KEYS.RECURRING_CONTRIBUTOR_COOKIE,
			}),
		).toBeNull();
		expect(
			getCookie({ name: PERSISTENCE_KEYS.DIGITAL_SUBSCRIBER_COOKIE }),
		).toBeNull();
		expect(
			getCookie({
				name: PERSISTENCE_KEYS.USER_FEATURES_EXPIRY_COOKIE,
			}),
		).toBeNull();
	});
});

describe('The isDigitalSubscriber getter', () => {
	it('Is false when the user is logged out', () => {
		jest.resetAllMocks();
		isUserLoggedInOktaRefactor.mockResolvedValue(false);
		expect(isDigitalSubscriber()).toBe(false);
	});

	describe('When the user is logged in', () => {
		beforeEach(() => {
			jest.resetAllMocks();
			isUserLoggedInOktaRefactor.mockResolvedValue(true);
		});

		it('Is true when the user has a `true` digital subscriber cookie', () => {
			setCookie({
				name: PERSISTENCE_KEYS.DIGITAL_SUBSCRIBER_COOKIE,
				value: 'true',
			});
			expect(isDigitalSubscriber()).toBe(true);
		});

		it('Is false when the user has a `false` digital subscriber cookie', () => {
			setCookie({
				name: PERSISTENCE_KEYS.DIGITAL_SUBSCRIBER_COOKIE,
				value: 'false',
			});
			expect(isDigitalSubscriber()).toBe(false);
		});

		it('Is false when the user has no digital subscriber cookie', () => {
			removeCookie({ name: PERSISTENCE_KEYS.DIGITAL_SUBSCRIBER_COOKIE });
			expect(isDigitalSubscriber()).toBe(false);
		});
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
				getCookie({ name: PERSISTENCE_KEYS.PAYING_MEMBER_COOKIE }),
			).toBe('false');
			expect(
				getCookie({
					name: PERSISTENCE_KEYS.RECURRING_CONTRIBUTOR_COOKIE,
				}),
			).toBe('false');
			expect(
				getCookie({ name: PERSISTENCE_KEYS.DIGITAL_SUBSCRIBER_COOKIE }),
			).toBe('false');
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
				getCookie({ name: PERSISTENCE_KEYS.PAYING_MEMBER_COOKIE }),
			).toBe('true');
			expect(
				getCookie({
					name: PERSISTENCE_KEYS.RECURRING_CONTRIBUTOR_COOKIE,
				}),
			).toBe('true');
			expect(
				getCookie({ name: PERSISTENCE_KEYS.DIGITAL_SUBSCRIBER_COOKIE }),
			).toBe('true');
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
