import { trails } from '../../fixtures/manual/trails';
import type { DCRFrontCard } from '../types/front';
import { decideCardPositions } from './FlexibleGeneral';

const standardCard = {
	...trails[0],
	boostLevel: 'default',
} satisfies DCRFrontCard;

const boostedCard = {
	...trails[0],
	boostLevel: 'boost',
} satisfies DCRFrontCard;

describe('FlexibleGeneral', () => {
	it('Should return a one card half width row layout if one standard card is provided', () => {
		expect(decideCardPositions([standardCard])).toEqual([
			{
				layout: 'oneCardHalfWidth',
				cards: [standardCard],
			},
		]);
	});
	it('Should return a one card full width row layout if one boosted card is provided', () => {
		expect(decideCardPositions([boostedCard])).toEqual([
			{ layout: 'oneCardFullWidth', cards: [boostedCard] },
		]);
	});
	it('Should return a one card full width row layout if one immersive card is provided', () => {
		expect(
			decideCardPositions([{ ...standardCard, isImmersive: true }]),
		).toEqual([
			{
				layout: 'oneCardFullWidth',
				cards: [{ ...standardCard, isImmersive: true }],
			},
		]);
	});
	it('Should return a two card row layout if two standard cards are provided', () => {
		expect(decideCardPositions([standardCard, standardCard])).toEqual([
			{ layout: 'twoCard', cards: [standardCard, standardCard] },
		]);
	});

	it('Should return a one card half width row layout if one card without boost level is provided', () => {
		const cardWithoutBoostLevel = {
			...standardCard,
			boostLevel: undefined,
		};
		expect(decideCardPositions([cardWithoutBoostLevel])).toEqual([
			{
				layout: 'oneCardHalfWidth',
				cards: [cardWithoutBoostLevel],
			},
		]);
	});

	it('Should return two rows of two card row layouts if four standard cards are provided', () => {
		expect(
			decideCardPositions([
				standardCard,
				standardCard,
				standardCard,
				standardCard,
			]),
		).toEqual([
			{ layout: 'twoCard', cards: [standardCard, standardCard] },
			{ layout: 'twoCard', cards: [standardCard, standardCard] },
		]);
	});

	it('Should return three rows of expected row layouts if a boosted card and three standard cards are provided', () => {
		expect(
			decideCardPositions([
				boostedCard,
				standardCard,
				standardCard,
				standardCard,
			]),
		).toEqual([
			{ layout: 'oneCardFullWidth', cards: [boostedCard] },
			{ layout: 'twoCard', cards: [standardCard, standardCard] },
			{ layout: 'oneCardHalfWidth', cards: [standardCard] },
		]);
	});

	it('Should return three rows of expected row layouts if a standard, then boosted card and two standard cards are provided', () => {
		expect(
			decideCardPositions([
				standardCard,
				boostedCard,
				standardCard,
				standardCard,
			]),
		).toEqual([
			{ layout: 'oneCardHalfWidth', cards: [standardCard] },
			{ layout: 'oneCardFullWidth', cards: [boostedCard] },
			{ layout: 'twoCard', cards: [standardCard, standardCard] },
		]);
	});
});
