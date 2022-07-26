import { getBylineComponentsFromTokens, getSoleContributor } from './byline';

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

	describe('getSoleContributor', () => {
		describe('returns a contributor', () => {
			it('Sebastian Köhn, as told to Wilfried Chan', () => {
				// https://www.theguardian.com/world/2022/jul/23/i-literally-screamed-out-loud-in-pain-my-two-weeks-of-monkeypox-hell

				const soleContributor = getSoleContributor(
					[
						{
							id: 'profile/wilfred-chan',
							type: 'Contributor',
							title: 'Wilfred Chan',
						},
					],
					'Sebastian Köhn, as told to Wilfred Chan',
				);

				expect(soleContributor?.title).toBe('Wilfred Chan');
			});

			it('Jim Waterson Media editor', () => {
				// https://www.theguardian.com/media/2021/nov/17/geordie-greig-ousted-as-editor-of-the-daily-mail

				const soleContributor = getSoleContributor(
					[
						{
							id: 'media/geordie-greig',
							type: 'Keyword',
							title: 'Geordie Greig',
						},
						{
							id: 'profile/jim-waterson',
							type: 'Contributor',
							title: 'Jim Waterson',
							twitterHandle: 'jimwaterson',
							bylineImageUrl:
								'https://i.guim.co.uk/img/uploads/2019/01/21/Jim_Waterson.jpg?width=300&quality=85&auto=format&fit=max&s=70dd40e52d9cbe5053f58ad8c4421664',
						},
					],
					'Jim Waterson Media editor',
				);

				expect(soleContributor?.title).toBe('Jim Waterson');
			});

			it('First Dog on the Moon', () => {
				// https://www.theguardian.com/commentisfree/2022/jul/22/europe-is-ablaze-italian-glaciers-are-collapsing-the-climate-crisis-is-here

				const soleContributor = getSoleContributor(
					[
						{
							id: 'profile/first-dog-on-the-moon',
							type: 'Contributor',
							title: 'First Dog on the Moon',
						},
					],
					'First Dog on the Moon',
				);

				expect(soleContributor?.title).toBe('First Dog on the Moon');
			});

			it('Sam Levine in New York', () => {
				// https://www.theguardian.com/us-news/2022/jul/22/january-6-panel-american-democracy-nose-dive

				const soleContributor = getSoleContributor(
					[
						{
							id: 'profile/sam-levine',
							type: 'Contributor',
							title: 'Sam Levine',
						},
					],
					'Sam Levine in New York',
				);

				expect(soleContributor?.title).toBe('Sam Levine');
			});
		});

		describe('returns `undefined`', () => {
			it('Sam Levin in Los Angeles and Sam Levine in New York', () => {
				// https://www.theguardian.com/us-news/2020/oct/12/republicans-election-2020-unauthorized-ballot-boxes

				const soleContributor = getSoleContributor(
					[
						{
							id: 'profile/sam-levin',
							type: 'Contributor',
							title: 'Sam Levin',
							twitterHandle: 'SamTLevin',
						},
						{
							id: 'profile/sam-levine',
							type: 'Contributor',
							title: 'Sam Levine',
						},
					],
					'Sam Levin in Los Angeles and Sam Levine in New York',
				);
				expect(soleContributor).toBe(undefined);
			});

			it('Gabriel Smith', () => {
				const soleContributor = getSoleContributor(
					[
						{
							id: 'profile/ben-beaumont-thomas',
							type: 'Contributor',
							title: 'Ben Beaumont-Thomas',
							twitterHandle: 'ben_bt',
						},
					],
					'Gabriel Smith',
				);
				expect(soleContributor).toBe(undefined);
			});

			it('Zoe Williams and others', () => {
				// https://www.theguardian.com/commentisfree/2022/jul/20/britain-next-prime-minister-rishi-sunak-liz-truss-conservative-leader

				const soleContributor = getSoleContributor(
					[
						{
							id: 'profile/zoewilliams',
							type: 'Contributor',
							title: 'Zoe Williams',
							twitterHandle: 'zoesqwilliams',
						},
						{
							id: 'profile/sahil-dutta',
							type: 'Contributor',
							title: 'Sahil Dutta',
						},
						{
							id: 'profile/henry-hill',
							type: 'Contributor',
							title: 'Henry Hill',
						},
						{
							id: 'profile/simonjenkins',
							type: 'Contributor',
							title: 'Simon Jenkins',
						},
						{
							id: 'profile/moya-lothian-mclean',
							type: 'Contributor',
							title: 'Moya Lothian-McLean',
						},
					],
					'Zoe Williams and others',
				);

				expect(soleContributor).toBe(undefined);
			});
		});
	});
});
