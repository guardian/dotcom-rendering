import { Article } from '@root/fixtures/generated/articles/Article';
import { buildAdTargeting } from './ad-targeting';

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

const expectedAdTargeting = ({isSignedIn}: {isSignedIn: string}) => ({
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
		si: isSignedIn,
		vl: 0,
	},
});

describe('buildAdTargeting', () => {
	it('builds adTargeting correctly', () => {
		expect(buildAdTargeting(CAPI)).toEqual(expectedAdTargeting({isSignedIn: 'f'}));
	});

	it('builds adTargeting correctly for a signed in user', () => {
		expect(buildAdTargeting(CAPI, true)).toEqual(expectedAdTargeting({isSignedIn: 't'}));
	});

	it('builds adTargeting correctly for an ad free user', () => {
		const CAPIAdFree = { ...CAPI, ...{ isAdFreeUser: true }};
		const expectedAdTargetingAdFree = { disableAds: true };
		expect(buildAdTargeting(CAPIAdFree)).toEqual(expectedAdTargetingAdFree);
	});
});
