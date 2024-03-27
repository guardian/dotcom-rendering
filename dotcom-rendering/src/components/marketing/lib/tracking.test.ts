import { addChoiceCardsParams } from './tracking';

describe('addChoiceCardsParams', () => {
	it('adds choice cards params to url without existing querystring', () => {
		const result = addChoiceCardsParams(
			'https://support.theguardian.com/contribute',
			'ONE_OFF',
			5,
		);
		expect(result).toEqual(
			'https://support.theguardian.com/contribute?selected-contribution-type=ONE_OFF&selected-amount=5',
		);
	});

	it('adds choice cards params to url with existing querystring', () => {
		const result = addChoiceCardsParams(
			'https://support.theguardian.com/contribute?test=test',
			'ONE_OFF',
			5,
		);
		expect(result).toEqual(
			'https://support.theguardian.com/contribute?test=test&selected-contribution-type=ONE_OFF&selected-amount=5',
		);
	});
});
