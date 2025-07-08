/**
 * @jest-environment node
 */

import { Comment } from '../../fixtures/generated/fe-articles/Comment';
import { Feature } from '../../fixtures/generated/fe-articles/Feature';
import { Live } from '../../fixtures/generated/fe-articles/Live';
import { MatchReport } from '../../fixtures/generated/fe-articles/MatchReport';
import { Review } from '../../fixtures/generated/fe-articles/Review';
import { Standard } from '../../fixtures/generated/fe-articles/Standard';
import { validateAsFEArticle } from './validate';

const articles = [
	{
		name: 'Standard',
		data: Standard,
	},
	{
		name: 'Feature',
		data: Feature,
	},
	{
		name: 'Comment',
		data: Comment,
	},
	{
		name: 'Match Report',
		data: MatchReport,
	},
	{
		name: 'Review',
		data: Review,
	},
	{
		name: 'Liveblog',
		data: Live,
	},
] as const;

describe('validate', () => {
	it('throws on invalid data', () => {
		const data = { foo: 'bar' };
		expect(() => validateAsFEArticle(data)).toThrow(TypeError);
	});

	for (const article of articles) {
		it(`validates data for a ${article.name} article`, () => {
			expect(validateAsFEArticle(article.data)).toBe(article.data);
		});
	}
});
