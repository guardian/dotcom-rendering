import { adJson, stringify } from './ad-json';

const paramSet: AdTargetParam[] = [
	{
		name: 'su',
		value: ['4', '5', '1', '2', '3'],
	},
	{
		name: 'url',
		value: [
			'/business/2019/feb/07/no-deal-brexit-uk-exporters-risk-being-locked-out-of-world-harbours',
		],
	},
	{
		name: 'tn',
		value: ['news'],
	},
	{
		name: 'ct',
		value: ['article'],
	},
	{
		name: 'p',
		value: ['ng'],
	},
	{
		name: 'co',
		value: ['richard-partington'],
	},
	{
		name: 'k',
		value: [
			'asia-pacific',
			'politics',
			'business',
			'uk/uk',
			'eu',
			'newzealand',
			'world',
			'europe-news',
			'internationaltrade',
			'foreignpolicy',
			'australia-news',
			'eu-referendum',
			'global-economy',
			'japan',
			'economics',
			'south-korea',
		],
	},
	{
		name: 'edition',
		value: ['au'],
	},
	{
		name: 'sh',
		value: ['https://theguardian.com/p/akj3n'],
	},
];

describe('ampadslots', () => {
	it('should set platform to amp', () => {
		const res = adJson(paramSet);
		const p = res.targeting.find((param) => param.name === 'p');
		if (p === undefined) {
			return fail();
		}

		expect(p.value).toBe('amp');
	});

	it('should set rendering platform to dotcom-rendering', () => {
		const res = adJson(paramSet);
		const renderingPlatform = res.targeting.find(
			(param) => param.name === 'rp',
		);
		if (renderingPlatform === undefined) {
			return fail();
		}
		expect(renderingPlatform.value).toBe('dotcom-rendering');
	});

	it('should set values to a comma-separated string', () => {
		const res = adJson(paramSet);
		const p = res.targeting.find((param) => param.name === 'su');
		if (p === undefined) {
			return fail();
		}
		expect(p.value).toBe('4,5,1,2,3');
	});
});

describe('stringify', () => {
	it('should generate the correct string value from an AdJson', () => {
		const res = adJson(paramSet);
		const outputJson = {
			targeting: {
				su: '4,5,1,2,3',
				url:
					'/business/2019/feb/07/no-deal-brexit-uk-exporters-risk-being-locked-out-of-world-harbours',
				tn: 'news',
				ct: 'article',
				co: 'richard-partington',
				k:
					'asia-pacific,politics,business,uk/uk,eu,newzealand,world,europe-news,internationaltrade,foreignpolicy,australia-news,eu-referendum,global-economy,japan,economics,south-korea',
				edition: 'au',
				sh: 'https://theguardian.com/p/akj3n',
				p: 'amp',
				rp: 'dotcom-rendering',
			},
		};
		expect(stringify(res)).toBe(JSON.stringify(outputJson));
	});
});
