/**
 * @jest-environment node
 */

import { hostedArticle } from '../../fixtures/manual/hostedArticle';
import { hostedGallery } from '../../fixtures/manual/hostedGallery';
import { hostedVideo } from '../../fixtures/manual/hostedVideo';
import { articles } from '../../fixtures/manual/validationArticles';
import { validateAsFEArticle } from './validate';

const hostedContentArticles = [
	{
		name: 'Hosted Article',
		data: hostedArticle,
	},
	{
		name: 'Hosted Gallery',
		data: hostedGallery,
	},
	{
		name: 'Hosted Video',
		data: hostedVideo,
	},
];

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

	for (const hostedItem of hostedContentArticles) {
		it(`validates data for hosted ${hostedItem.name} content`, () => {
			expect(validateAsFEArticle(hostedItem.data)).toBe(hostedItem.data);
		});
	}
});
