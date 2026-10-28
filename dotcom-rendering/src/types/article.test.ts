import { Standard as StandardFixture } from '../../fixtures/generated/fe-articles/Standard';
import { ArticleDesign, Pillar } from '../lib/articleFormat';
import {
	puzzlesHubV1Experiment,
	puzzlesHubV1Participation,
} from '../lib/puzzlesHubVersionExperiment';
import { enhanceArticleType } from './article';

const crosswordArticle = (serverSideABTests: Record<string, string>) =>
	enhanceArticleType(
		{
			...StandardFixture,
			format: {
				...StandardFixture.format,
				design: 'CrosswordDesign',
				theme: 'LifestylePillar',
			},
			config: { ...StandardFixture.config, serverSideABTests },
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

	it('uses the news theme for crosswords in the puzzles-new-hub-v1 variant', () => {
		const article = crosswordArticle(
			puzzlesHubV1Participation(puzzlesHubV1Experiment.variant),
		);

		expect(article.design).toBe(ArticleDesign.Crossword);
		expect(article.theme).toBe(Pillar.News);
	});

	it('keeps the theme sent by Frontend outside the experiment', () => {
		Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' });
		const article = crosswordArticle(
			puzzlesHubV1Participation(puzzlesHubV1Experiment.control),
		);

		expect(article.theme).toBe(Pillar.Lifestyle);
	});
});
