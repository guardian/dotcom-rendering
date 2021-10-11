import { Article } from '@root/fixtures/generated/articles/Article';
import { getPermutivePFPSegments } from '@guardian/commercial-core';
import { getCookie } from '@root/src/web/browser/cookie';
import { buildAdTargeting } from './ad-targeting';
import { canUseDom } from './can-use-dom';

jest.mock('./can-use-dom');
jest.mock('@guardian/commercial-core');
jest.mock('@root/src/web/browser/cookie');

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
	const expectedAdTargeting = {
		adUnit: '/59666047/theguardian.com/money/article/ng',
		customParams: {
			cc: 'UK',
			co: ['rob-davies'],
			ct: 'article',
			edition: 'uk',
			inskin: 'f',
			k: [
				'ticket-prices',
				'consumer-affairs',
				'internet',
				'viagogo',
				'money',
			],
			p: 'ng',
			pa: 'f',
			s: 'money',
			sh: 'https://theguardian.com/p/64ak8',
			su: ['0'],
			tn: ['news'],
			url:
				'/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software',
			sens: 'f',
			si: 'f',
			vl: 0,
		},
	};

	it('builds adTargeting correctly', () => {
		(canUseDom as jest.Mock).mockReturnValue(false);
		expect(buildAdTargeting(CAPI)()).toEqual(expectedAdTargeting);
	});

	it('builds adTargeting correctly when invoked in a browser', () => {
		(canUseDom as jest.Mock).mockReturnValue(true);
		(getCookie as jest.Mock).mockReturnValue('value');
		(getPermutivePFPSegments as jest.Mock).mockReturnValue([1,2,3]);
		const expectedAdTargetingBrowser = { ...expectedAdTargeting };
		expectedAdTargetingBrowser.customParams = {
			...expectedAdTargetingBrowser.customParams,
			...{permutive: [1,2,3], si: 't'}};
		expect(buildAdTargeting(CAPI)()).toEqual(expectedAdTargetingBrowser);
	});
});
