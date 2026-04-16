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
			'https://email-rendering.guardianapis.com/fronts/uk/newsletters/morning-mail?variant=persephone&readonly=true',
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
			'https://email-rendering.guardianapis.com/fronts/world/newsletters/morning-mail?variant=persephone&readonly=true',
		);
	});

	it('strips trailing /email for article-based newsletters', () => {
		expect(
			buildNewsletterPreviewUrl({
				exampleUrl: '/world/series/first-edition/email',
				category: 'article-based',
			}),
		).toBe(
			'https://email-rendering.guardianapis.com/article/world/series/first-edition?variant=kronos&readonly=true',
		);
	});

	it('supports article-based-legacy category', () => {
		expect(
			buildNewsletterPreviewUrl({
				exampleUrl: '/world/series/first-edition/email',
				category: 'article-based-legacy',
			}),
		).toBe(
			'https://email-rendering.guardianapis.com/article/world/series/first-edition?variant=kronos&readonly=true',
		);
	});

	it('encodes unsafe path segments', () => {
		expect(
			buildNewsletterPreviewUrl({
				exampleUrl: '/world/newsletters/briefing with spaces',
				category: 'fronts-based',
			}),
		).toBe(
			'https://email-rendering.guardianapis.com/fronts/world/newsletters/briefing%20with%20spaces?variant=persephone&readonly=true',
		);
	});
});
