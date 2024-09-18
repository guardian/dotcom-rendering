import { trails } from 'fixtures/manual/trails';
import { determineCardPositions } from './FlexibleGeneral';
import { DCRFrontCard } from 'src/types/front';

const standardCard = {
	...trails[0],
	boostLevel: 'default',
} satisfies DCRFrontCard;

const boostedCard = {
	...trails[0],
	boostLevel: 'boost',
} satisfies DCRFrontCard;

describe('FlexibleGeneral', () => {
	it.skip('Should return a one card half width row if one standard card is provided', () => {
		expect(determineCardPositions([standardCard])).toEqual([]);
	});
	it.skip('Should return a one full half width row if one standard boosted card is provided', () => {
		expect(determineCardPositions([boostedCard])).toEqual([]);
	});
	it.skip('Should return a two card row if two standard cards are provided', () => {
		expect(determineCardPositions([standardCard, standardCard])).toEqual(
			[],
		);
	});
});
