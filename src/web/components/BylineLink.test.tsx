import { bylineAsTokens, getContributorTagsForToken } from './BylineLink';

describe('bylineAsTokens', () => {
	it('Correctly performs the standard one contributor case', () => {
		const byline = 'Gwyn Topham Transport correspondent';
		const tags = [
			{
				id: 'profile/gwyntopham',
				type: 'Contributor',
				title: 'Gwyn Topham',
				twitterHandle: 'GwynTopham',
				bylineImageUrl: 'https://i.guim.co.uk/something',
			},
		];
		const tokensExpected = ['', 'Gwyn Topham', ' Transport correspondent'];
		expect(bylineAsTokens(byline, tags)).toEqual(tokensExpected);
	});

	it('Correctly extract the correct contributor tag when more than one tag with the same title', () => {
		const byline = 'Paul Kagame';
		const tags = [
			{ id: 'world/paul-kagame', type: 'Keyword', title: 'Paul Kagame' },
			{
				id: 'profile/paul-kagame',
				type: 'Contributor',
				title: 'Paul Kagame',
			},
		];
		const tokensExpected = ['', 'Paul Kagame', ''];
		expect(bylineAsTokens(byline, tags)).toEqual(tokensExpected);

		const token = 'Paul Kagame';
		const contributorTagsExpected = [
			{
				id: 'profile/paul-kagame',
				type: 'Contributor',
				title: 'Paul Kagame',
			},
		];
		expect(getContributorTagsForToken(tags, token)).toEqual(
			contributorTagsExpected,
		);
		expect(getContributorTagsForToken(tags.reverse(), token)).toEqual(
			contributorTagsExpected,
		);
	});

	it('Correctly process the sam-levin/sam-levine in either tags order', () => {
		const byline = 'Sam Levin in Los Angeles and Sam Levine in New York';
		const tags = [
			{
				id: 'profile/sam-levin',
				type: 'Contributor',
				title: 'Sam Levin',
				twitterHandle: 'SamTLevin',
				bylineImageUrl: 'https://i.guim.co.uk/something',
			},
			{
				id: 'profile/sam-levine',
				type: 'Contributor',
				title: 'Sam Levine',
			},
		];
		const tokensExpected = [
			'',
			'Sam Levin',
			' in Los Angeles and ',
			'Sam Levine',
			' in New York',
		];
		expect(bylineAsTokens(byline, tags)).toEqual(tokensExpected);
		expect(bylineAsTokens(byline, tags.reverse())).toEqual(tokensExpected);
	});
});
