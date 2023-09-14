import { getTargetingParams } from './sendTargetingParams.apps';

describe('getTargetingParams', () => {
	it('extracts ad targeting params from editionCommercialProperties in the format Bridget consumes', () => {
		const testEditionCommercialProperties = {
			adTargeting: [
				{
					name: 'su',
					value: ['0'],
				},
				{
					name: 'k',
					value: [
						'us-politics',
						'state-of-georgia',
						'us-crime',
						'us-news',
						'donaldtrump',
					],
				},
				{
					name: 'edition',
					value: 'uk',
				},
				{
					name: 'tn',
					value: ['news'],
				},
				{
					name: 'co',
					value: ['sam-levin', 'hugo-lowell'],
				},
				{
					name: 'sh',
					value: 'https://www.theguardian.com/p/zm6gk',
				},
				{
					name: 'p',
					value: 'ng',
				},
				{
					name: 'ct',
					value: 'article',
				},
				{
					name: 'url',
					value: '/us-news/2023/aug/24/trump-surrender-georgia-jail-overturn-2020-election',
				},
			],
		};

		const expectedValue = new Map<string, string>([
			['ct', 'article'],
			['co', 'sam-levin,hugo-lowell'],
			[
				'url',
				'/us-news/2023/aug/24/trump-surrender-georgia-jail-overturn-2020-election',
			],
			['su', '0'],
			['edition', 'uk'],
			['tn', 'news'],
			['p', 'app'],
			['k', 'us-politics,state-of-georgia,us-crime,us-news,donaldtrump'],
		]);

		expect(getTargetingParams(testEditionCommercialProperties)).toEqual(
			expectedValue,
		);
	});
});
