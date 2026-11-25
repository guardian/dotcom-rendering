import type { TagType } from '../types/tag';
import { doNotIndex } from './htmlPageTemplate';

const noIndexTag: TagType = {
	id: 'tracking/platformfunctional/no-index',
	type: 'tracking',
	title: 'No index',
};

const otherTag: TagType = {
	id: 'type/article',
	type: 'type',
	title: 'Article',
};

describe('doNotIndex', () => {
	const originalStage = process.env.GU_STAGE;

	afterEach(() => {
		if (originalStage === undefined) {
			delete process.env.GU_STAGE;
		} else {
			process.env.GU_STAGE = originalStage;
		}
	});

	it('does NOT index pages in non-production environments', () => {
		process.env.GU_STAGE = 'CODE';

		expect(doNotIndex('https://www.theguardian.com/example', [])).toBe(
			true,
		);
	});

	it('does NOT index pages with a no-index tag in production', () => {
		process.env.GU_STAGE = 'PROD';

		expect(
			doNotIndex('https://www.theguardian.com/example', [
				otherTag,
				noIndexTag,
			]),
		).toBe(true);
	});

	it.each([
		{
			description: 'has no canonical URL',
			canonicalUrl: undefined,
			tags: undefined,
		},
		{
			description: 'has an ordinary canonical URL',
			canonicalUrl: 'https://www.theguardian.com/example',
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
	] satisfies {
		description: string;
		canonicalUrl: string | undefined;
		tags: TagType[] | undefined;
	}[])(
		'DOE index a production page that $description',
		({ canonicalUrl, tags }) => {
			process.env.GU_STAGE = 'PROD';

			expect(doNotIndex(canonicalUrl, tags)).toBe(false);
		},
	);

	it('does NOT index tracking/commissioningdesk pages', () => {
		process.env.GU_STAGE = 'PROD';

		expect(
			doNotIndex(
				'https://www.theguardian.com/tracking/commissioningdesk/other',
				undefined,
			),
		).toBe(true);
	});
});
