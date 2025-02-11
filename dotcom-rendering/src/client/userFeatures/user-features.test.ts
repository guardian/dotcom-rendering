import { getCookie } from '@guardian/libs';
import type { AuthStatus } from '../../lib/identity';
import {
	getAuthStatus as getAuthStatus_,
	isUserLoggedInOktaRefactor as isUserLoggedInOktaRefactor_,
} from '../../lib/identity';
import { AD_FREE_USER_COOKIE, getAdFreeCookie } from './cookies/adFree';
import {
	ALLOW_REJECT_ALL_COOKIE,
	getAllowRejectAllCookie,
} from './cookies/allowRejectAll';
import {
	deleteAllCookies,
	extendCookieExpiry,
	timeInDaysFromNow,
} from './cookies/cookieHelpers';
import {
	getHideSupportMessagingCookie,
	HIDE_SUPPORT_MESSAGING_COOKIE,
} from './cookies/hideSupportMessaging';
import {
	getUserBenefitsExpiryCookie,
	USER_BENEFITS_EXPIRY_COOKIE,
} from './cookies/userBenefitsExpiry';
import { fetchJson } from './fetchJson';
import { refresh } from './user-features';

const fakeUserBenefits = {
	benefits: ['adFree', 'hideSupportMessaging'],
};

const noBenefits = {
	benefits: [],
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

const setAllBenefitsData = (opts: { isExpired: boolean }) => {
	const daysToExpiry = opts.isExpired ? -1 : 1;
	extendCookieExpiry(HIDE_SUPPORT_MESSAGING_COOKIE, daysToExpiry);
	extendCookieExpiry(AD_FREE_USER_COOKIE, daysToExpiry);
	extendCookieExpiry(ALLOW_REJECT_ALL_COOKIE, daysToExpiry);
	extendCookieExpiry(USER_BENEFITS_EXPIRY_COOKIE, daysToExpiry);
};

beforeAll(() => {
	window.guardian.config.page.userBenefitsApiUrl = 'fake-url';
	window.guardian.config.tests['useUserBenefitsApiVariant'] = 'variant';
});

const expectUserBenefitExpiryCookieHasBeenSetCorrectly = () => {
	const expectedNextRefreshDate = new Date(
		timeInDaysFromNow(1),
	).toDateString();
	expect(
		new Date(
			parseInt(getUserBenefitsExpiryCookie() ?? '0', 10),
		).toDateString(),
	).toEqual(expectedNextRefreshDate);
};

const expectAllBenefitsCookiesToBeDeleted = () => {
	expect(getAdFreeCookie()).toBeNull();
	expect(getHideSupportMessagingCookie()).toBeNull();
	expect(getAllowRejectAllCookie()).toBeNull();
};

const expectAllCookiesToBeSet = () => {
	expect(getAdFreeCookie()).toBeTruthy();
	expect(getHideSupportMessagingCookie()).toBeTruthy();
	expect(getAllowRejectAllCookie()).toBeTruthy();
	expectUserBenefitExpiryCookieHasBeenSetCorrectly();
};

describe('Refreshing the benefits data', () => {
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
			expectUserBenefitExpiryCookieHasBeenSetCorrectly();
		});

		it('Performs an update if the user has expired data', async () => {
			setAllBenefitsData({ isExpired: true });
			await refresh();
			expect(fetchJsonSpy).toHaveBeenCalledTimes(1);
		});

		it(
			'Deletes all expired user benefits cookies if the api response does not contain the benefit, ' +
				'but does not delete the user benefits expiry cookie (so we know when next to check for benefits)',
			async () => {
				fetchJsonSpy.mockReturnValueOnce(Promise.resolve(noBenefits));
				setAllBenefitsData({ isExpired: true });
				await refresh();
				expectAllBenefitsCookiesToBeDeleted();
				expectUserBenefitExpiryCookieHasBeenSetCorrectly();
			},
		);

		it('Does not delete non-expired user benefits cookies even if the api response does not contain the benefit', async () => {
			fetchJsonSpy.mockReturnValueOnce(Promise.resolve(noBenefits));
			setAllBenefitsData({ isExpired: false });
			await refresh();
			expectAllCookiesToBeSet();
		});

		it('Does not perform an update if user has non-expired user benefits data', async () => {
			setAllBenefitsData({ isExpired: false });
			await refresh();
			expect(fetchJsonSpy).not.toHaveBeenCalled();
		});
	});
});
describe('If user signed out', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		isUserLoggedInOktaRefactor.mockResolvedValue(false);
		fetchJsonSpy.mockReturnValue(Promise.resolve(noBenefits));
	});

	it('Does not perform update, even if benefit data missing', async () => {
		deleteAllCookies();
		await refresh();
		expect(fetchJsonSpy).not.toHaveBeenCalled();
	});

	it('Does not delete non-expired user benefits cookies', async () => {
		setAllBenefitsData({ isExpired: false });
		await refresh();
		expectAllCookiesToBeSet();
	});

	it('Does delete expired user benefits cookies', async () => {
		setAllBenefitsData({ isExpired: true });
		await refresh();
		expectAllBenefitsCookiesToBeDeleted();
		expect(getUserBenefitsExpiryCookie()).toBeNull();
	});
});

describe('Benefit to cookie mapping', () => {
	type BenefitMapping = {
		benefit: string;
		cookie: string;
	};
	const allBenefits = [
		{ benefit: 'adFree', cookie: AD_FREE_USER_COOKIE },
		{
			benefit: 'hideSupportMessaging',
			cookie: HIDE_SUPPORT_MESSAGING_COOKIE,
		},
		{ benefit: 'allowRejectAll', cookie: ALLOW_REJECT_ALL_COOKIE },
	];

	const mappingIsCorrect = async (
		currentElement: BenefitMapping,
		otherElements: BenefitMapping[],
	) => {
		jest.resetAllMocks();
		deleteAllCookies();
		isUserLoggedInOktaRefactor.mockResolvedValue(true);
		getAuthStatus.mockResolvedValue({
			kind: 'SignedInWithOkta',
		} as AuthStatus);

		// Mock the fetchJson function to return the current benefit only
		fetchJsonSpy.mockReturnValueOnce(
			Promise.resolve({
				benefits: [currentElement.benefit],
			}),
		);
		await refresh();
		// Check that the cookie is set for the current benefit
		expect(getCookie({ name: currentElement.cookie })).toBeTruthy();
		// Check that cookies are not set for other benefits
		for (const otherElement of otherElements) {
			expect(getCookie({ name: otherElement.cookie })).toBeNull();
		}
	};

	it('Sets all cookies correctly', async () => {
		for (const currentElement of allBenefits) {
			const index = allBenefits.indexOf(currentElement);
			const otherElements = [
				...allBenefits.slice(0, index),
				...allBenefits.slice(index + 1),
			];
			await mappingIsCorrect(currentElement, otherElements);
		}
	});
});
