import type { TagType } from '../types/tag';
import { doNotIndex } from './htmlPageTemplate';

const noIndexTag: TagType = {
	id: 'production-monitoring/production-monitoring',
	type: 'tracking',
	title: 'No index',
};

const otherTag: TagType = {
	id: 'type/article',
	type: 'type',
	title: 'Article',
};

describe('doNotIndex', () => {
	it.each([
		{
			description: 'has no canonical URL',
			canonicalUrl: undefined,
			tags: undefined,
		},
		{
			description: 'has an ordinary canonical front URL',
			canonicalUrl: 'https://www.theguardian.com/uk',
			tags: [otherTag],
		},
		{
			description: 'has an ordinary canonical article URL',
			canonicalUrl:
				'https://www.theguardian.com/tv-and-radio/2026/nov/25/blade-runner-2099-review-tv-version-terrifying-visual-beauty',
			tags: [otherTag],
		},

		{
			description: 'is the allow-listed Filter page',
			canonicalUrl:
				'https://www.theguardian.com/tracking/commissioningdesk/the-filter',
			tags: undefined,
		},
		{
			description: 'is the allow-listed US Filter page',
			canonicalUrl:
				'https://www.theguardian.com/tracking/commissioningdesk/filter-us',
			tags: undefined,
		},
		{
			description: 'is an allow-listed Filter front not in the block list',
			canonicalUrl:
				'https://www.theguardian.com/lifeandstyle/kitchen+tracking/commissioningdesk/the-filter',
			tags: undefined,
		},
	] satisfies {
		description: string;
		canonicalUrl: string | undefined;
		tags: TagType[] | undefined;
	}[])(
		'DOES index a production page that $description',
		({ canonicalUrl, tags }) => {
			expect(doNotIndex('PROD', canonicalUrl, tags)).toBe(false);
		},
	);

	it('does NOT index tracking/commissioningdesk pages', () => {
		expect(
			doNotIndex(
				'PROD',
				'https://www.theguardian.com/tracking/commissioningdesk/other',
				undefined,
			),
		).toBe(true);
	});

	it.each([
		'https://www.theguardian.com/lifeandstyle/sleep+tracking/commissioningdesk/the-filter',
		'https://www.theguardian.com/fashion+tracking/commissioningdesk/the-filter',
		'https://www.theguardian.com/fashion/beauty+tracking/commissioningdesk/the-filter',
		'https://www.theguardian.com/technology+tracking/commissioningdesk/the-filter',
	])('does NOT index block-listed Filter front %s', (canonicalUrl) => {
		expect(doNotIndex('PROD', canonicalUrl, undefined)).toBe(true);
	});

	it('does NOT index pages in non-production environments', () => {
		expect(
			doNotIndex('CODE', 'https://www.theguardian.com/example', []),
		).toBe(true);
	});

	it('does NOT index pages with a no-index tag in production', () => {
		expect(
			doNotIndex('PROD', 'https://www.theguardian.com/example', [
				otherTag,
				noIndexTag,
			]),
		).toBe(true);
	});

	it('does NOT index pages with a no-index tag in production, ignores allow listed page', () => {
		expect(
			doNotIndex(
				'PROD',
				'https://www.theguardian.com/tracking/commissioningdesk/filter-us',
				[otherTag, noIndexTag],
			),
		).toBe(true);
	});
});
