import type { FEArticle } from '../frontend/feArticle';
import { buildCrosswordBlock } from './buildCrosswordBlock';

const crossword = { id: 'crosswords/quick/1' };

const articleWith = ({
	requiresSubscription,
	tests,
}: {
	requiresSubscription?: boolean;
	tests: Record<string, string>;
}) =>
	({
		crossword,
		config: { serverSideABTests: tests },
		crosswordRequiresSubscription: requiresSubscription,
		webPublicationDateDisplay: '',
		webPublicationSecondaryDateDisplay: '',
	}) as unknown as FEArticle;

const allTestsOn = {
	'puzzles-new-hub-v1': 'variant',
	'puzzles-new-hub-v2': 'variant',
	'puzzles-new-hub-v3': 'variant',
};

const elementOf = (article: FEArticle) =>
	buildCrosswordBlock(article)?.elements[0];

describe('buildCrosswordBlock', () => {
	it('marks the element as premium when the flag is sent and v1 to v3 are on', () => {
		expect(
			elementOf(
				articleWith({ requiresSubscription: true, tests: allTestsOn }),
			),
		).toEqual({
			_type: 'model.dotcomrendering.pageElements.CrosswordElement',
			crossword,
			requiresSubscription: true,
		});
	});

	it.each([
		['no test is on', {}],
		['only v1 is on', { 'puzzles-new-hub-v1': 'variant' }],
		[
			'v1 and v2 are on',
			{
				'puzzles-new-hub-v1': 'variant',
				'puzzles-new-hub-v2': 'variant',
			},
		],
		['v3 is on without v1 and v2', { 'puzzles-new-hub-v3': 'variant' }],
	])('leaves the element as it was when %s', (_, tests) => {
		const element = elementOf(
			articleWith({ requiresSubscription: true, tests }),
		);
		expect(element).toEqual({
			_type: 'model.dotcomrendering.pageElements.CrosswordElement',
			crossword,
		});
		expect(element).not.toHaveProperty('requiresSubscription');
	});

	it('leaves the element as it was when the flag is not sent', () => {
		expect(
			elementOf(articleWith({ tests: allTestsOn })),
		).not.toHaveProperty('requiresSubscription');
	});

	it('returns nothing when the article has no crossword', () => {
		const article = {
			...articleWith({ tests: allTestsOn }),
			crossword: undefined,
		} as FEArticle;
		expect(buildCrosswordBlock(article)).toBeUndefined();
	});
});
