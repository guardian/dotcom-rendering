import { getBylineComponentsFromTokens } from './byline';

describe('Byline utilities', () => {
	it('should link a single tag by linking name tokens with Contributor tag titles', () => {
		const bylineTokens = ['Eva Smith', 'and friends'];
		const tags = [
			{
				id: 'eva-smith',
				type: 'Contributor',
				title: 'Eva Smith',
			},
		];

		const bylineComponents = getBylineComponentsFromTokens(
			bylineTokens,
			tags,
		);

		expect(bylineComponents).toEqual([
			{ tag: tags[0], token: 'Eva Smith' },
			'and friends',
		]);
	});

	it('should link multiple tags by linking name tokens with Contributor tag titles', () => {
		const bylineTokens = ['Eva Smith', ' and ', 'Duncan Campbell'];
		const tags = [
			{
				id: 'eva-smith',
				type: 'Contributor',
				title: 'Eva Smith',
			},
			{
				id: 'duncan-campbell',
				type: 'Contributor',
				title: 'Duncan Campbell',
			},
		];
		const bylineComponents = getBylineComponentsFromTokens(
			bylineTokens,
			tags,
		);

		expect(bylineComponents).toEqual([
			{ tag: tags[0], token: 'Eva Smith' },
			' and ',
			{ tag: tags[1], token: 'Duncan Campbell' },
		]);
	});

	it('should not reuse a contributor tag, to successfully disambiguate identical names', () => {
		const bylineTokens = ['Duncan Campbell', ' and ', 'Duncan Campbell'];
		const tags = [
			{
				id: 'duncan-campbell',
				type: 'Contributor',
				title: 'Duncan Campbell',
			},
			{
				id: 'duncan-campbell-1',
				type: 'Contributor',
				title: 'Duncan Campbell',
			},
		];

		const bylineComponents = getBylineComponentsFromTokens(
			bylineTokens,
			tags,
		);

		expect(bylineComponents).toEqual([
			{ tag: tags[0], token: 'Duncan Campbell' },
			' and ',
			{ tag: tags[1], token: 'Duncan Campbell' },
		]);
	});
});
