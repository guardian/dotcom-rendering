import { bylineTokens } from './byline-tokens';

describe('byline-tokens', () => {
	it('should split out tag titles from the text', () => {
		const byline = 'John Smith and Mary Piper';
		const contributorTags = [
			{
				id: 'profile/john-smith',
				type: 'Contributor',
				title: 'John Smith',
			},
			{
				id: 'profile/mary-piper',
				type: 'Contributor',
				title: 'Mary Piper',
			},
		];

		const tokens = bylineTokens(byline, contributorTags);

		expect(tokens).toEqual(['', 'John Smith', ' and ', 'Mary Piper', '']);
	});
});
