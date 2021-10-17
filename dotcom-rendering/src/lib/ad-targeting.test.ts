import { buildAdsConfigWithConsent } from '@guardian/commercial-core';
import type { AdsConfigBasic } from '@guardian/commercial-core';
import { Article } from '@root/fixtures/generated/articles/Article';
import {
	buildAdTargeting,
	buildAdTargetingStatic,
 } from './ad-targeting';

jest.mock('@guardian/commercial-core');

const CAPI = {
	...Article,
	config: {
		...Article.config,
		adUnit: '/59666047/theguardian.com/money/article/ng',
		edition: 'UK',
		section: 'money',
		sharedAdTargeting: {
			ct: 'article',
			co: ['rob-davies'],
			url:
				'/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software',
			su: ['0'],
			edition: 'uk',
			tn: ['news'],
			p: 'ng',
			k: [
				'ticket-prices',
				'consumer-affairs',
				'internet',
				'viagogo',
				'money',
			],
			sh: 'https://theguardian.com/p/64ak8',
		},
	},
};

describe('buildAdTargeting', () => {

	it('builds static adTargeting', () => {
		const adTargeting = buildAdTargetingStatic(CAPI)() as AdsConfigBasic;
		expect(adTargeting.adTagParameters.cust_params.includes('cc%3DUK'));
		expect(adTargeting.adTagParameters.cust_params.includes('sens%3Df'));
		expect(adTargeting.adTagParameters.cust_params.includes('si%3Df'));
		expect(adTargeting.adTagParameters.cust_params.includes('vl%3D0'));
		expect(adTargeting.adTagParameters.iu.includes('/59666047/theguardian.com/money/article/ng'));
	});

	it('builds dynamic adTargeting', async () => {
		(buildAdsConfigWithConsent as jest.Mock).mockReturnValue(
			Promise.resolve(
				{
					adTargetingParameters: {
						iu: 'someAdUnit',
						cust_params: 'someParams',
					}
				}
			));
		const adTargeting = await buildAdTargeting(CAPI)()
		expect(adTargeting).toEqual(
			{
				adTargetingParameters: {
					iu: 'someAdUnit',
					cust_params: 'someParams',
				}
			}
		);
		expect(buildAdsConfigWithConsent as jest.Mock).toBeCalledWith(
			false,
			'/59666047/theguardian.com/money/article/ng',
			expect.anything()
		);
	});
});
