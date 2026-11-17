import { Standard as StandardFixture } from '../../fixtures/generated/fe-articles/Standard';
import { ArticleDesign, Pillar } from '../lib/articleFormat';
import type { EditionId } from '../lib/edition';
import { enhanceArticleType } from './article';

const crosswordArticle = (edition: EditionId) =>
	enhanceArticleType(
		{
			...StandardFixture,
			format: {
				...StandardFixture.format,
				design: 'CrosswordDesign',
				theme: 'LifestylePillar',
			},
			config: { ...StandardFixture.config, edition },
		},
		'Web',
	);

describe('enhanceArticleType crossword theme', () => {
	const originalEnv = process.env.NODE_ENV;
	afterEach(() => {
		Object.defineProperty(process.env, 'NODE_ENV', {
			value: originalEnv,
		});
	});

	it('uses the news theme for crosswords in the International edition', () => {
		const article = crosswordArticle('INT');

		expect(article.design).toBe(ArticleDesign.Crossword);
		expect(article.theme).toBe(Pillar.News);
	});

	it('keeps the theme sent by Frontend outside the International edition', () => {
		Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' });
		const article = crosswordArticle('UK');

		expect(article.theme).toBe(Pillar.Lifestyle);
	});
});
