import { buildAdTargeting } from './ad-targeting';

const sharedAdTargeting = {
	co: ['rob-davies'],
	ct: 'article',
	edition: 'uk',
	k: ['ticket-prices', 'consumer-affairs', 'internet', 'viagogo', 'money'],
	p: 'ng',
	sh: 'https://theguardian.com/p/64ak8',
	su: ['0'],
	tn: ['news'],
	url: '/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software',
};

describe('buildAdTargeting', () => {
	const expectedAdTargeting = {
		adUnit: '/59666047/theguardian.com/money/article/ng',
		customParams: {
			sens: 'f',
			si: 'f',
			vl: 0,
			cc: 'UK',
			s: 'money',
			inskin: 'f',
			pa: 'f',
			...sharedAdTargeting,
		},
	};

	it('builds adTargeting correctly', () => {
		expect(
			buildAdTargeting({
				isAdFreeUser: false,
				isSensitive: false,
				edition: 'UK',
				section: 'money',
				sharedAdTargeting,
				adUnit: '/59666047/theguardian.com/money/article/ng',
			}),
		).toEqual(expectedAdTargeting);
	});
});
