import { incrementDailyArticleCount } from '@frontend/web/lib/dailyArticleCount';
import { Article } from '@root/fixtures/generated/articles/Article';
import { makeGuardianBrowserCAPI } from '@root/src/model/window-guardian';
import {
	isNPageOrHigherPageView,
	isIOS9,
	isValidContentType,
	isValidSection,
	isValidTag,
} from './displayRule';

const CAPI = Article;

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
});
