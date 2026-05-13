import { buildNewsletterPreviewUrl } from './newsletterPreviewUrl';

describe('buildNewsletterPreviewUrl', () => {
	it('returns undefined when exampleUrl is missing', () => {
		expect(
			buildNewsletterPreviewUrl({
				category: 'fronts-based',
			}),
		).toBeUndefined();
	});

	it('returns undefined for unsupported categories', () => {
		expect(
			buildNewsletterPreviewUrl({
				exampleUrl: '/uk/newsletters/morning-mail',
				category: 'unsupported-category',
			}),
		).toBeUndefined();
	});

	it('builds a fronts-based preview URL from a path', () => {
		expect(
			buildNewsletterPreviewUrl({
				exampleUrl: '/uk/newsletters/morning-mail',
				category: 'fronts-based',
			}),
		).toBe(
			'https://email-rendering.guardianapis.com/fronts/uk/newsletters/morning-mail?variant=persephone&readonly=true&embed=true',
		);
	});

	it('ignores query params and fragments from exampleUrl', () => {
		expect(
			buildNewsletterPreviewUrl({
				exampleUrl:
					'https://www.theguardian.com/world/newsletters/morning-mail?variant=malicious&readonly=false#section',
				category: 'fronts-based',
			}),
		).toBe(
			'https://email-rendering.guardianapis.com/fronts/world/newsletters/morning-mail?variant=persephone&readonly=true&embed=true',
		);
	});

	it('strips trailing /email for article-based newsletters', () => {
		expect(
			buildNewsletterPreviewUrl({
				exampleUrl: '/world/series/first-edition/email',
				category: 'article-based',
			}),
		).toBe(
			'https://email-rendering.guardianapis.com/article/world/series/first-edition?variant=kronos&readonly=true&embed=true',
		);
	});

	it('supports article-based-legacy category', () => {
		expect(
			buildNewsletterPreviewUrl({
				exampleUrl: '/world/series/first-edition/email',
				category: 'article-based-legacy',
			}),
		).toBe(
			'https://email-rendering.guardianapis.com/article/world/series/first-edition?variant=kronos&readonly=true&embed=true',
		);
	});

	it('routes /email paths to fronts preview even when category is article-based', () => {
		expect(
			buildNewsletterPreviewUrl({
				exampleUrl: '/email/global-dispatch',
				category: 'article-based',
			}),
		).toBe(
			'https://email-rendering.guardianapis.com/fronts/email/global-dispatch?variant=persephone&readonly=true&embed=true',
		);
	});

	it('supports /article prefixed newsletter paths', () => {
		expect(
			buildNewsletterPreviewUrl({
				exampleUrl:
					'/article/sport/series/tokyo-2020-daily-briefing/latest/email',
				category: 'other',
			}),
		).toBe(
			'https://email-rendering.guardianapis.com/article/sport/series/tokyo-2020-daily-briefing/latest?variant=kronos&readonly=true&embed=true',
		);
	});

	it('encodes unsafe path segments', () => {
		expect(
			buildNewsletterPreviewUrl({
				exampleUrl: '/world/newsletters/briefing with spaces',
				category: 'fronts-based',
			}),
		).toBe(
			'https://email-rendering.guardianapis.com/fronts/world/newsletters/briefing%20with%20spaces?variant=persephone&readonly=true&embed=true',
		);
	});
});
