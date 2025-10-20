import { trackClickedCard } from './personaliseHighlights';

const highlights = [{ url: '1' }, { url: '2' }, { url: '3' }, { url: '4' }];

describe('trackClickedCard', () => {
	it('should add a card to the history if it is not already there', () => {
		const clickHistory = ['1', '2', '3'];
		const card = '4';

		expect(trackClickedCard(card, clickHistory).toBe(['1', '2', '3', '4']));
	});

	it;
});

export default highlights;
