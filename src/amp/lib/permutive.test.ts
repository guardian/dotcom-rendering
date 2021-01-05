import { generatePermutivePayload } from './permutive';

describe('generatePermutivePayload', () => {
	test('generates the right payload given a complete config', () => {
		const config = {
			isPaidContent: false,
			pageId: 'page id',
			headline: 'article headline',
			section: 'sport',
			author: 'author name',
			keywords: 'keyword1,keyword2',
			edition: 'UK',
			webPublicationDate: 1578926460000,
			toneIds: 'tone/advertisement-features,tone/minutebyminute',
		};

		const expected = {
			'properties.content.premium': false,
			'properties.content.id': 'page id',
			'properties.content.title': 'article headline',
			'properties.content.section': 'sport',
			'properties.content.authors!list[string]': 'author name',
			'properties.content.keywords!list[string]': 'keyword1,keyword2',
			'properties.content.publishedAt': '2020-01-13T14:41:00.000Z',
			'properties.content.tone!list[string]':
				'tone/advertisement-features,tone/minutebyminute',
			'properties.user.edition': 'UK',
		};
		expect(generatePermutivePayload(config as ConfigType)).toStrictEqual(
			expected,
		);
	});

	test('generates the right payload given an incomplete config', () => {
		const config = {
			pageId: 'page id',
		};
		const expected = {
			'properties.content.id': 'page id',
		};

		expect(generatePermutivePayload(config as ConfigType)).toStrictEqual(
			expected,
		);
	});

	test('generates the right payload given an invalid date', () => {
		const config = {
			webPublicationDate: 'invalid',
			headline: 'article headline',
		};
		const expected = {
			'properties.content.title': 'article headline',
		};
		expect(
			generatePermutivePayload((config as unknown) as ConfigType),
		).toStrictEqual(expected);
	});

	test('generates the right payload given untrimmed keywords, authors or tone', () => {
		const config = {
			author: 'author 1 , author 2 ,author3, author 4  ',
			keywords: ' keyword1,  keyword2  ,keyword3',
			toneIds: ' tone/world,  tone/worldnews    ,tone/minutebyminute',
		};
		const expected = {
			'properties.content.authors!list[string]':
				'author 1,author 2,author3,author 4',
			'properties.content.keywords!list[string]':
				'keyword1,keyword2,keyword3',
			'properties.content.tone!list[string]':
				'tone/world,tone/worldnews,tone/minutebyminute',
		};

		expect(
			generatePermutivePayload((config as unknown) as ConfigType),
		).toStrictEqual(expected);
	});

	test('generates the right payload given invalid keywords or authors', () => {
		const config = {
			author: null,
			keywords: undefined,
		};
		const expected = {};

		expect(
			generatePermutivePayload((config as unknown) as ConfigType),
		).toStrictEqual(expected);
	});
});
