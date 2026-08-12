import { isFilterPageId } from './theFilter';

describe('isFilterPageId', () => {
	it('returns true for a UK Filter article pageId', () => {
		expect(
			isFilterPageId(
				'thefilter/2026/jul/02/jess-cartner-morleys-july-style-essentials-2026',
			),
		).toBe(true);
	});

	it('returns true for a US Filter article pageId', () => {
		expect(
			isFilterPageId(
				'thefilter-us/2025/dec/27/best-wine-subscriptions-us',
			),
		).toBe(true);
	});

	it('returns false for a non-Filter pageId', () => {
		expect(
			isFilterPageId('technology/2026/jan/01/some-other-article'),
		).toBe(false);
	});

	it('returns false for a pageId that merely contains "thefilter" mid-string', () => {
		expect(
			isFilterPageId('lifestyle/thefilter-mentioned/some-article'),
		).toBe(false);
	});
});
