import { ArticleSpecial, Pillar } from '@guardian/libs';
import { findPillar } from './find-pillar';

jest.mock('../lib/pillars', () => ({
	pillarNames: ['news', 'opinion', 'sport', 'culture', 'lifestyle', 'labs'],
}));

describe('findPillar', () => {
	it('returns pillar if valid', () => {
		expect(findPillar('News')).toBe(Pillar.News);
	});

	it('returns undefined if not valid', () => {
		expect(findPillar('foo')).toBeUndefined();
	});

	it('returns "culture" if "arts"', () => {
		expect(findPillar('Arts', [])).toBe(Pillar.Culture);
	});

	it('returns "labs" if paid content tagging exists', () => {
		const tags = [
			{
				id: 'money/ticket-prices',
				type: 'Keyword',
				title: 'Ticket prices',
			},
			{
				id: 'tone/advertisement-features',
				type: 'Tone',
				title: 'Consumer affairs',
			},
		];

		expect(findPillar('Arts', tags)).toBe(ArticleSpecial.Labs);
	});
});
