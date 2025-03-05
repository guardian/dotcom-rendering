import { incrementDailyArticleCount } from '../../lib/dailyArticleCount';
import {
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
