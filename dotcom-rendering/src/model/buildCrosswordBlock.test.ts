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

const premiumVariant = {
	'puzzles-new-hub-v3': 'variant',
};

const elementOf = (article: FEArticle) =>
	buildCrosswordBlock(article)?.elements[0];

describe('buildCrosswordBlock', () => {
	it('marks the element as premium when the flag is sent and the premium variant is on', () => {
		expect(
			elementOf(
				articleWith({
					requiresSubscription: true,
					tests: premiumVariant,
				}),
			),
		).toEqual({
			_type: 'model.dotcomrendering.pageElements.CrosswordElement',
			crossword,
			requiresSubscription: true,
		});
	});

	it.each([
		['no test is on', {}],
		['v3 is in control', { 'puzzles-new-hub-v3': 'control' }],
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
			elementOf(articleWith({ tests: premiumVariant })),
		).not.toHaveProperty('requiresSubscription');
	});

	it('returns nothing when the article has no crossword', () => {
		const article = {
			...articleWith({ tests: premiumVariant }),
			crossword: undefined,
		} as FEArticle;
		expect(buildCrosswordBlock(article)).toBeUndefined();
	});
});
