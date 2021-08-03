import { Design, Display, Pillar } from '@guardian/types';
import { decidePalette } from '@root/src/web/lib/decidePalette';

import { findCount, buildUrl } from './useComments';

describe('findCount', () => {
	it('finds and returns a specific count', () => {
		expect(
			findCount(
				[
					{ id: '/p/fb292', count: 188 },
					{ id: '/p/fbxdn', count: 437 },
					{ id: '/p/fbvdy', count: 11 },
					{ id: '/p/fbx3d', count: 18 },
					{ id: '/p/fan69', count: 11 },
					{ id: '/p/f36yf', count: 128 },
				],
				'https://theguardian.com/p/fb292',
			),
		).toBe(188);
	});

	it('returns zero when the id is not found', () => {
		expect(
			findCount(
				[
					{ id: '/p/fb292', count: 188 },
					{ id: '/p/fbxdn', count: 437 },
					{ id: '/p/fbvdy', count: 11 },
					{ id: '/p/fbx3d', count: 18 },
					{ id: '/p/fan69', count: 11 },
					{ id: '/p/f36yf', count: 128 },
				],
				'https://theguardian.com/p/notvalid',
			),
		).toBe(0);
	});

	it('works with the legacy gu.com domain', () => {
		expect(
			findCount(
				[
					{ id: '/p/fb292', count: 188 },
					{ id: '/p/fbxdn', count: 437 },
				],
				'https://gu.com/p/fbxdn',
			),
		).toBe(437);
	});

	it('handles an empty array for counts', () => {
		expect(findCount([], 'https://gu.com/p/fbxdn')).toBe(0);
	});

	it('returns zero when no shortUrl is provided', () => {
		expect(
			findCount([
				{ id: '/p/fb292', count: 188 },
				{ id: '/p/fbxdn', count: 437 },
			]),
		).toBe(0);
	});
});

describe('buildUrl', () => {
	it('builds the url as expected', () => {
		const sections: OnwardsType[] = [
			{
				format: {
					display: Display.Standard,
					theme: Pillar.Opinion,
					design: Design.Comment,
				},
				heading: 'opinion',
				trails: [
					{
						url:
							'https://www.theguardian.com/commentisfree/2020/nov/03/nigel-farage-new-party-reform-uk-brexit-alternative',
						linkText:
							"There's no point railing against Farage. You have to present an alternative | Zoe Williams",
						showByline: true,
						byline: 'Zoe Williams',
						image:
							'https://i.guim.co.uk/img/media/8ffbd3dc5aedfd502ca5ddd5f91f82c767cd28ea/0_0_3442_2065/master/3442.jpg?width=300&quality=85&auto=format&fit=max&s=52292233df8e95c6308e01f4222e25b3',
						isLiveBlog: false,
						format: {
							display: Display.Standard,
							theme: Pillar.Opinion,
							design: Design.Comment,
						},
						palette: decidePalette({
							display: Display.Standard,
							theme: Pillar.Opinion,
							design: Design.Comment,
						}),
						webPublicationDate: '2020-11-03T11:00:02.000Z',
						headline:
							"There's no point railing against Farage. You have to present an alternative",
						shortUrl: 'https://theguardian.com/p/fb28c',
					},
					{
						url:
							'https://www.theguardian.com/commentisfree/2020/nov/03/this-election-isnt-about-the-next-four-years-its-about-the-next-four-millennia',
						linkText:
							"This election isn't about the next four years. It's about the next four millennia | Bill McKibben",
						showByline: true,
						byline: 'Bill McKibben',
						image:
							'https://i.guim.co.uk/img/media/5dfdcb80828f014e04054ab626750cc112e92364/0_129_5065_3039/master/5065.jpg?width=300&quality=85&auto=format&fit=max&s=c108e8f88f55b627161b8f1827c93698',
						isLiveBlog: false,
						format: {
							display: Display.Standard,
							theme: Pillar.Opinion,
							design: Design.Comment,
						},
						palette: decidePalette({
							display: Display.Standard,
							theme: Pillar.Opinion,
							design: Design.Comment,
						}),
						webPublicationDate: '2020-11-03T10:26:01.000Z',
						headline:
							"This election isn't about the next four years. It's about the next four millennia",
						shortUrl: 'https://theguardian.com/p/f36yf',
					},
				],
				ophanComponentName: 'series',
			},
		];
		expect(buildUrl(sections)).toBe(
			'https://api.nextgen.guardianapps.co.uk/discussion/comment-counts.json?shortUrls=/p/fb28c,/p/f36yf',
		);
	});

	it('handles the legacy gu domain', () => {
		const sections: OnwardsType[] = [
			{
				format: {
					display: Display.Standard,
					theme: Pillar.Opinion,
					design: Design.Comment,
				},
				heading: 'opinion',
				trails: [
					{
						url:
							'https://www.theguardian.com/commentisfree/2020/nov/03/ehrc-report-anti-racist-politics-antisemitism-labour-party',
						linkText:
							'The EHRC report shows how difficult building real anti-racist politics will be | David Feldman and others',
						showByline: true,
						byline:
							'David Feldman, Ben Gidley and Brendan McGeever',
						image:
							'https://i.guim.co.uk/img/media/637243d90e93683dd13234ff543ab9b93da3d8d0/0_161_3926_2355/master/3926.jpg?width=300&quality=85&auto=format&fit=max&s=4f1ca464b3b4e7c498acd29d548ecae0',
						isLiveBlog: false,
						format: {
							display: Display.Standard,
							theme: Pillar.Opinion,
							design: Design.Comment,
						},
						palette: decidePalette({
							display: Display.Standard,
							theme: Pillar.Opinion,
							design: Design.Comment,
						}),
						webPublicationDate: '2020-11-03T15:33:04.000Z',
						headline:
							'The EHRC report shows how difficult building real anti-racist politics will be',
						shortUrl: 'https://gu.com/p/fb7yx',
					},
					{
						url:
							'https://www.theguardian.com/commentisfree/2020/nov/03/emmanuel-macron-islam-french-president-terror-attacks',
						linkText:
							"Macron wants to fix France's social ills – but he won't do it by 'reforming' Islam | Arthur Goldhammer",
						showByline: true,
						byline: 'Arthur Goldhammer',
						image:
							'https://i.guim.co.uk/img/media/1f18d9b3ee4a6d38ff5a5544651f6cc382fdf480/0_203_5184_3110/master/5184.jpg?width=300&quality=85&auto=format&fit=max&s=ebc79b062b7f7f72582f8480a548eacb',
						isLiveBlog: false,
						format: {
							display: Display.Standard,
							theme: Pillar.Opinion,
							design: Design.Comment,
						},
						palette: decidePalette({
							display: Display.Standard,
							theme: Pillar.Opinion,
							design: Design.Comment,
						}),
						webPublicationDate: '2020-11-03T13:50:06.000Z',
						headline:
							"Macron wants to fix France's social ills – but he won't do it by 'reforming' Islam",
						shortUrl: 'https://gu.com/p/fbx5q',
					},
				],
				ophanComponentName: 'series',
			},
		];
		expect(buildUrl(sections)).toBe(
			'https://api.nextgen.guardianapps.co.uk/discussion/comment-counts.json?shortUrls=/p/fb7yx,/p/fbx5q',
		);
	});
});
