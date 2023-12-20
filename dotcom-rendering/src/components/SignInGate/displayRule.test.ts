import { incrementDailyArticleCount } from '../../lib/dailyArticleCount';
import {
	isIOS9,
	isMobile,
	isNPageOrHigherPageView,
	isValidContentType,
	isValidSection,
	isValidTag,
} from './displayRule';

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
	// https://deviceatlas.com/blog/list-of-user-agent-strings

	describe('isMobile', () => {
		// spy on user agent to mock return value
		const userAgentGetter = jest.spyOn(
			window.navigator,
			'userAgent',
			'get',
		);
		describe('mobile devices', function () {
			test('samsung is true', () => {
				userAgentGetter.mockReturnValueOnce(
					'Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
				);
				expect(isMobile()).toBe(true);
			});
			test('pixel is true', () => {
				userAgentGetter.mockReturnValueOnce(
					'Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
				);
				expect(isMobile()).toBe(true);
			});
			test('motorola is true', () => {
				userAgentGetter.mockReturnValueOnce(
					'Mozilla/5.0 (Linux; Android 12; moto g pure) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
				);
				expect(isMobile()).toBe(true);
			});
			test('windows phone is true', () => {
				userAgentGetter.mockReturnValueOnce(
					'Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; RM-1152) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Mobile Safari/537.36 Edge/15.15254',
				);
				expect(isMobile()).toBe(true);
			});
			test('iphone is true', () => {
				userAgentGetter.mockReturnValueOnce(
					'Mozilla/5.0 (iPhone; CPU OS 9_0 like Mac OS X) AppleWebKit/601.1.17 (KHTML, like Gecko) Version/8.0 Mobile/13A175 Safari/600.1.4',
				);
				expect(isMobile()).toBe(true);
			});
		});

		describe('browsers', function () {
			test('windows browser is false', () => {
				userAgentGetter.mockReturnValueOnce(
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
				);
				expect(isMobile()).toBe(false);
			});
			test('chrome is false', () => {
				userAgentGetter.mockReturnValueOnce(
					'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36',
				);
				expect(isMobile()).toBe(false);
			});
			test('safari is false', () => {
				userAgentGetter.mockReturnValueOnce(
					'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36',
				);
				expect(isMobile()).toBe(false);
			});
		});
	});

	describe('isValidContentType', () => {
		test('is a valid type - article', () => {
			expect(isValidContentType('Article')).toBe(true);
		});

		test('is not a valid type - LiveBlog', () => {
			expect(isValidContentType('LiveBlog')).toBe(false);
		});
	});

	describe('isValidSection', () => {
		test('is valid section - politics - returns true', () => {
			expect(isValidSection('politics')).toBe(true);
		});

		test('is valid section - membership - return false', () => {
			expect(isValidSection('membership')).toBe(false);
		});
	});

	describe('isValidTag', () => {
		test('is valid tag - us-news/us-news - returns true', () => {
			expect(
				isValidTag([
					{
						id: 'us-news/us-news',
						type: 'Keyword',
						title: 'US news',
					},
				]),
			).toBe(true);
		});

		test('is valid tag - info/newsletter-sign-up - return false', () => {
			expect(
				isValidTag([
					{
						id: 'info/newsletter-sign-up',
						type: 'Keyword',
						title: 'Newsletters',
					},
				]),
			).toBe(false);
		});
	});
});
