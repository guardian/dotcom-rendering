import { trails } from '../../fixtures/manual/trails';
import type { DCRFrontCard } from '../types/front';
import { determineCardPositions } from './FlexibleGeneral';

const standardCard = {
	...trails[0],
	boostLevel: 'default',
} satisfies DCRFrontCard;

const boostedCard = {
	...trails[0],
	boostLevel: 'boost',
} satisfies DCRFrontCard;

describe('FlexibleGeneral', () => {
	it('Should return a one card row layout if one standard card is provided', () => {
		expect(determineCardPositions([standardCard])).toEqual([
			{
				rowLayout: 'oneCard',
				cards: [standardCard],
			},
		]);
	});
	it('Should return a one card boosted row layout if one boosted card is provided', () => {
		expect(determineCardPositions([boostedCard])).toEqual([
			{ rowLayout: 'oneCardBoosted', cards: [boostedCard] },
		]);
	});
	it('Should return a two card row layout if two standard cards are provided', () => {
		expect(determineCardPositions([standardCard, standardCard])).toEqual([
			{ rowLayout: 'twoCard', cards: [standardCard, standardCard] },
		]);
	});

	it('Should return two rows of two card row layouts if four standard cards are provided', () => {
		expect(
			determineCardPositions([
				standardCard,
				standardCard,
				standardCard,
				standardCard,
			]),
		).toEqual([
			{ rowLayout: 'twoCard', cards: [standardCard, standardCard] },
			{ rowLayout: 'twoCard', cards: [standardCard, standardCard] },
		]);
	});

	it('Should return three rows of expected row layouts if a boosted card and three standard cards are provided', () => {
		expect(
			determineCardPositions([
				boostedCard,
				standardCard,
				standardCard,
				standardCard,
			]),
		).toEqual([
			{ rowLayout: 'oneCardBoosted', cards: [boostedCard] },
			{ rowLayout: 'twoCard', cards: [standardCard, standardCard] },
			{ rowLayout: 'oneCard', cards: [standardCard] },
		]);
	});

	it('Should return three rows of expected row layouts if a standard, then boosted card and two standard cards are provided', () => {
		expect(
			determineCardPositions([
				standardCard,
				boostedCard,
				standardCard,
				standardCard,
			]),
		).toEqual([
			{ rowLayout: 'oneCard', cards: [standardCard] },
			{ rowLayout: 'oneCardBoosted', cards: [boostedCard] },
			{ rowLayout: 'twoCard', cards: [standardCard, standardCard] },
		]);
	});
});
