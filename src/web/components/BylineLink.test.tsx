import { bylineAsTokens } from './BylineLink';

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
		const tokenExpected = ['', 'Gwyn Topham', ' Transport correspondent'];
		expect(bylineAsTokens(byline, tags)).toEqual(tokenExpected);
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
		const tokenExpected = ['', 'Paul Kagame', ''];
		expect(bylineAsTokens(byline, tags)).toEqual(tokenExpected);
		expect(bylineAsTokens(byline, tags.reverse())).toEqual(tokenExpected);
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
		const tokenExpected = [
			'',
			'Sam Levin',
			' in Los Angeles and ',
			'Sam Levine',
			' in New York',
		];
		expect(bylineAsTokens(byline, tags)).toEqual(tokenExpected);
		expect(bylineAsTokens(byline, tags.reverse())).toEqual(tokenExpected);
	});
});
