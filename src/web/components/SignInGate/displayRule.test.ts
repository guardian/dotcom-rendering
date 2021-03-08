import { incrementDailyArticleCount } from '@frontend/web/lib/dailyArticleCount';
import { Article } from '@root/fixtures/generated/articles/Article';
import { makeGuardianBrowserCAPI } from '@root/src/model/window-guardian';
import { setCountryCodeSynchronous } from '@root/src/web/lib/getCountryCode';
import {
	isNPageOrHigherPageView,
	isIOS9,
	isValidContentType,
	isValidSection,
	isValidTag,
	isCountry,
	hasRequiredConsents,
} from './displayRule';

const CAPI = Article;

let mockOnConsentChangeResult: any;
jest.mock('@guardian/consent-management-platform', () => ({
	onConsentChange: (callback: any) => {
		callback(mockOnConsentChangeResult);
	},
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	getConsentFor: jest.requireActual('@guardian/consent-management-platform')
		.getConsentFor,
}));

afterEach(() => {
	mockOnConsentChangeResult = undefined;
});

describe('SignInGate - displayRule methods', () => {
	describe('isNPageOrHigherPageView', () => {
		beforeEach(() => {
			localStorage.clear();
		});

		test('default - checks for is 2 article views returns true', () => {
			incrementDailyArticleCount();
			incrementDailyArticleCount();

			const output = isNPageOrHigherPageView();

			expect(output).toBe(true);
		});

		test('default - checks for higher 2 article views returns true', () => {
			incrementDailyArticleCount();
			incrementDailyArticleCount();
			incrementDailyArticleCount();

			const output = isNPageOrHigherPageView();

			expect(output).toBe(true);
		});

		test('default - checks for lower than 2 article views returns false', () => {
			incrementDailyArticleCount();

			const output = isNPageOrHigherPageView();

			expect(output).toBe(false);
		});

		test('default - checks for is n = 3 article views returns true', () => {
			incrementDailyArticleCount();
			incrementDailyArticleCount();
			incrementDailyArticleCount();

			const output = isNPageOrHigherPageView(3);

			expect(output).toBe(true);
		});

		test('default - checks for is n = 5 article views returns false', () => {
			incrementDailyArticleCount();
			incrementDailyArticleCount();
			incrementDailyArticleCount();

			const output = isNPageOrHigherPageView(5);

			expect(output).toBe(false);
		});
	});

	describe("isCountry('countryCode')", () => {
		beforeEach(() => {
			localStorage.clear();
		});
		test('geolocation is US', () => {
			setCountryCodeSynchronous('US');
			expect(isCountry('US')).toBe(true);
		});

		test('geolocation is not US', () => {
			setCountryCodeSynchronous('GB');
			expect(isCountry('US')).toBe(false);
		});
		test('geolocation is false if not set', () => {
			expect(isCountry('US')).toBe(false);
		});
	});

	describe('isIOS9', () => {
		// spy on user agent to mock return value
		const userAgentGetter = jest.spyOn(
			window.navigator,
			'userAgent',
			'get',
		);

		test('iphone ios9 is true', () => {
			userAgentGetter.mockReturnValueOnce(
				'Mozilla/5.0 (iPhone; CPU OS 9_0 like Mac OS X) AppleWebKit/601.1.17 (KHTML, like Gecko) Version/8.0 Mobile/13A175 Safari/600.1.4',
			);
			expect(isIOS9()).toBe(true);
		});

		test('ipad ios9 is true', () => {
			userAgentGetter.mockReturnValueOnce(
				'Mozilla/5.0 (iPad; CPU OS 9_0 like Mac OS X) AppleWebKit/601.1.17 (KHTML, like Gecko) Version/8.0 Mobile/13A175 Safari/600.1.4',
			);
			expect(isIOS9()).toBe(true);
		});

		test('ipod ios9 is true', () => {
			userAgentGetter.mockReturnValueOnce(
				'Mozilla/5.0 (iPod; CPU OS 9_0 like Mac OS X) AppleWebKit/601.1.17 (KHTML, like Gecko) Version/8.0 Mobile/13A175 Safari/600.1.4',
			);
			expect(isIOS9()).toBe(true);
		});

		test('iphone not ios9 is false', () => {
			userAgentGetter.mockReturnValueOnce(
				'Mozilla/5.0 (iPhone; CPU OS 10_3 like Mac OS X) AppleWebKit/601.1.17 (KHTML, like Gecko) Version/8.0 Mobile/13A175 Safari/600.1.4',
			);
			expect(isIOS9()).toBe(false);
		});

		test('ipad not ios9 is false', () => {
			userAgentGetter.mockReturnValueOnce(
				'Mozilla/5.0 (iPad; CPU OS 8_1 like Mac OS X) AppleWebKit/601.1.17 (KHTML, like Gecko) Version/8.0 Mobile/13A175 Safari/600.1.4',
			);
			expect(isIOS9()).toBe(false);
		});

		test('ipod not ios9 is false', () => {
			userAgentGetter.mockReturnValueOnce(
				'Mozilla/5.0 (iPod; CPU OS 7_0 like Mac OS X) AppleWebKit/601.1.17 (KHTML, like Gecko) Version/8.0 Mobile/13A175 Safari/600.1.4',
			);
			expect(isIOS9()).toBe(false);
		});

		test('not ios device is false', () => {
			expect(isIOS9()).toBe(false);
		});
	});

	describe('isValidContentType', () => {
		let defaultCAPIBrowser: CAPIBrowserType;
		let CAPIBrowser: CAPIBrowserType;

		beforeAll(() => {
			defaultCAPIBrowser = makeGuardianBrowserCAPI(CAPI);
		});

		beforeEach(() => {
			// reset the CAPI data
			CAPIBrowser = { ...defaultCAPIBrowser };
		});

		test('is a valid type - article', () => {
			CAPIBrowser.contentType = 'Article';

			expect(isValidContentType(CAPIBrowser)).toBe(true);
		});

		test('is not a valid type - LiveBlog', () => {
			CAPIBrowser.contentType = 'LiveBlog';

			expect(isValidContentType(CAPIBrowser)).toBe(false);
		});
	});

	describe('isValidSection', () => {
		let defaultCAPIBrowser: CAPIBrowserType;
		let CAPIBrowser: CAPIBrowserType;

		beforeAll(() => {
			defaultCAPIBrowser = makeGuardianBrowserCAPI(CAPI);
		});

		beforeEach(() => {
			// reset the CAPI data
			CAPIBrowser = { ...defaultCAPIBrowser };
		});

		test('is valid section - politics - returns true', () => {
			CAPIBrowser.sectionName = 'politics';

			expect(isValidSection(CAPIBrowser)).toBe(true);
		});

		test('is valid section - membership - return false', () => {
			CAPIBrowser.sectionName = 'membership';

			expect(isValidSection(CAPIBrowser)).toBe(false);
		});
	});

	describe('isValidTag', () => {
		let defaultCAPIBrowser: CAPIBrowserType;
		let CAPIBrowser: CAPIBrowserType;

		beforeAll(() => {
			defaultCAPIBrowser = makeGuardianBrowserCAPI(CAPI);
		});

		beforeEach(() => {
			// reset the CAPI data
			CAPIBrowser = { ...defaultCAPIBrowser };
		});

		test('is valid tag - us-news/us-news - returns true', () => {
			CAPIBrowser.tags = [
				{
					id: 'us-news/us-news',
					type: 'Keyword',
					title: 'US news',
				},
			];

			expect(isValidTag(CAPIBrowser)).toBe(true);
		});

		test('is valid tag - info/newsletter-sign-up - return false', () => {
			CAPIBrowser.tags = [
				{
					id: 'info/newsletter-sign-up',
					type: 'Keyword',
					title: 'Newsletters',
				},
			];

			expect(isValidTag(CAPIBrowser)).toBe(false);
		});
	});

	describe('hasRequiredConsents', () => {
		const generateConstents: () => { [key: string]: boolean } = () => {
			return {
				'5f369a02b8e05c308701f829': true,
				'5f203dcb1f0dea790562e20f': true,
				'5ed8c49c4b8ce4571c7ad801': true,
				'5efefe25b8e05c06542b2a77': true,
				'5e716fc09a0b5040d575080f': true,
				'5e7e1298b8e05c54a85c52d2': true,
				'5e68dbc769e7a93e0b25902f': true,
				'5e542b3a4cd8884eb41b5a72': true,
				'5f1aada6b8e05c306c0597d7': true,
				'5e4a5fbf26de4a77922b38a6': true,
				'5e952f6107d9d20c88e7c975': true,
				'5e7ced57b8e05c485246ccf3': true,
				'5e37fc3e56a5e6615502f9c9': true,
				'5f745ab96f3aae0163740409': true,
				'5ed6aeb1b8e05c241a63c71f': true,
				'5ef5c3a5b8e05c69980eaa5b': true,
				'5f203dbeeaaaa8768fd3226a': true,
				'5eff0d77969bfa03746427eb': true,
				'5f22bfd82a6b6c1afd1181a9': true,
				'5f199c302425a33f3f090f51': true,
				'5ed0eb688a76503f1016578f': true,
				'5f0f39014effda6e8bbd2006': true,
				'5eab3d5ab8e05c2bbe33f399': true,
				'5e71760b69966540e4554f01': true,
				'5e7ac3fae30e7d1bc1ebf5e8': true,
			};
		};

		test('returns true when the user has consented to the required vendors', async () => {
			const consents = generateConstents();
			mockOnConsentChangeResult = {
				tcfv2: {
					vendorConsents: consents,
				},
			};
			await expect(hasRequiredConsents()).resolves.toBe(true);
		});

		test('returns false when the user has not consented to one of the required vendors', async () => {
			const consents = generateConstents();
			consents['5f203dcb1f0dea790562e20f'] = false;

			mockOnConsentChangeResult = {
				tcfv2: {
					vendorConsents: consents,
				},
			};
			await expect(hasRequiredConsents()).resolves.toBe(false);
		});

		test('returns false when the user has not consented to any of the required vendors', async () => {
			const consents = generateConstents();
			Object.keys(consents).forEach((key) => {
				consents[key] = false;
			});

			mockOnConsentChangeResult = {
				tcfv2: {
					vendorConsents: consents,
				},
			};
			await expect(hasRequiredConsents()).resolves.toBe(false);
		});
	});
});
