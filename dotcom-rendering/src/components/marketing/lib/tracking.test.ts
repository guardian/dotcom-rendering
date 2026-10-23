import type { Tracking } from '@guardian/support-dotcom-components/dist/shared/types';
import { enrichSupportUrl, getChoiceCardUrl } from './tracking';

describe('enrichSupportUrl', () => {
	const tracking: Tracking = {
		referrerUrl: 'https://theguardian.com',
		abTestName: 'test',
		abTestVariant: 'control',
		campaignCode: 'test',
		ophanPageId: '123',
		platformId: 'WEB',
		componentType: 'ACQUISITIONS_EPIC',
	};

	it('returns the base URL if it is not a support URL', () => {
		const result = enrichSupportUrl({
			baseUrl: 'https://theguardian.com',
			tracking,
			promoCodes: [],
		});
		expect(result).toEqual('https://theguardian.com');
	});

	it('adds tracking and region to a support URL without existing querystring', () => {
		const result = enrichSupportUrl({
			baseUrl: 'https://support.theguardian.com/contribute',
			tracking,
			countryCode: 'GB',
			promoCodes: [],
		});
		expect(result).toEqual(
			'https://support.theguardian.com/uk/contribute?REFPVID=123&INTCMP=test&acquisitionData=%7B%22source%22%3A%22WEB%22%2C%22componentId%22%3A%22test%22%2C%22componentType%22%3A%22ACQUISITIONS_EPIC%22%2C%22campaignCode%22%3A%22test%22%2C%22abTests%22%3A%5B%7B%22name%22%3A%22test%22%2C%22variant%22%3A%22control%22%7D%5D%2C%22referrerPageviewId%22%3A%22123%22%2C%22referrerUrl%22%3A%22https%3A%2F%2Ftheguardian.com%22%2C%22isRemote%22%3Atrue%7D',
		);
	});

	it('adds tracking and region to a support URL with existing querystring', () => {
		const result = enrichSupportUrl({
			baseUrl: 'https://support.theguardian.com/contribute?test=test',
			tracking,
			countryCode: 'GB',
			promoCodes: [],
		});
		expect(result).toEqual(
			'https://support.theguardian.com/uk/contribute?test=test&REFPVID=123&INTCMP=test&acquisitionData=%7B%22source%22%3A%22WEB%22%2C%22componentId%22%3A%22test%22%2C%22componentType%22%3A%22ACQUISITIONS_EPIC%22%2C%22campaignCode%22%3A%22test%22%2C%22abTests%22%3A%5B%7B%22name%22%3A%22test%22%2C%22variant%22%3A%22control%22%7D%5D%2C%22referrerPageviewId%22%3A%22123%22%2C%22referrerUrl%22%3A%22https%3A%2F%2Ftheguardian.com%22%2C%22isRemote%22%3Atrue%7D',
		);
	});

	it('adds tracking, region and promo codes to a support URL', () => {
		const result = enrichSupportUrl({
			baseUrl: 'https://support.theguardian.com/contribute',
			tracking,
			countryCode: 'GB',
			promoCodes: ['PROMO1', 'PROMO2'],
		});
		expect(result).toEqual(
			'https://support.theguardian.com/uk/contribute?REFPVID=123&INTCMP=test&acquisitionData=%7B%22source%22%3A%22WEB%22%2C%22componentId%22%3A%22test%22%2C%22componentType%22%3A%22ACQUISITIONS_EPIC%22%2C%22campaignCode%22%3A%22test%22%2C%22abTests%22%3A%5B%7B%22name%22%3A%22test%22%2C%22variant%22%3A%22control%22%7D%5D%2C%22referrerPageviewId%22%3A%22123%22%2C%22referrerUrl%22%3A%22https%3A%2F%2Ftheguardian.com%22%2C%22isRemote%22%3Atrue%7D&promoCode=PROMO1&promoCode=PROMO2',
		);
	});

	it('deduplicates existing query params and repeated promo codes', () => {
		const result = enrichSupportUrl({
			baseUrl:
				'https://support.theguardian.com/contribute?REFPVID=base&REFPVID=duplicate&INTCMP=campaign&INTCMP=campaign&acquisitionData=data&acquisitionData=data&label=one&label=one&label=two&promoCode=EXISTING&promoCode=EXISTING',
			tracking,
			promoCodes: [
				'NEW_FIRST',
				'EXISTING',
				'NEW_SECOND',
				'NEW_FIRST',
				'EXISTING',
			],
		});
		const query = new URL(result).searchParams;

		expect(query.getAll('REFPVID')).toEqual(['base']);
		expect(query.getAll('INTCMP')).toEqual(['campaign']);
		expect(query.getAll('acquisitionData')).toEqual(['data']);
		expect(query.getAll('label')).toEqual(['one', 'two']);
		expect(query.getAll('promoCode')).toEqual([
			'EXISTING',
			'NEW_FIRST',
			'NEW_SECOND',
		]);
	});

	it('does not duplicate parameters when an enriched support URL is enriched again', () => {
		const params = {
			tracking,
			countryCode: 'GB',
			promoCodes: ['PROMO1', 'PROMO2'],
		};
		const enrichedUrl = enrichSupportUrl({
			baseUrl: 'https://support.theguardian.com/contribute',
			...params,
		});

		const enrichedAgain = enrichSupportUrl({
			baseUrl: enrichedUrl,
			...params,
		});

		expect(enrichedAgain).toEqual(enrichedUrl);
	});
});

describe('getChoiceCardUrl', () => {
	it('returns the landing page url when choiceCard is undefined', () => {
		const url = getChoiceCardUrl(undefined);
		expect(url).toEqual('https://support.theguardian.com/contribute');
	});

	// One-time
	it('builds landing page url for one-time choice', () => {
		const url = getChoiceCardUrl({
			benefits: [],
			isDefault: false,
			label: 'label',
			product: {
				supportTier: 'OneOff',
			},
			destination: 'LandingPage',
		});
		expect(url).toEqual(
			'https://support.theguardian.com/contribute?oneTime',
		);
	});
	it('builds checkout page url for one-time choice', () => {
		const url = getChoiceCardUrl({
			benefits: [],
			isDefault: false,
			label: 'label',
			product: {
				supportTier: 'OneOff',
			},
			destination: 'Checkout',
		});
		expect(url).toEqual(
			'https://support.theguardian.com/one-time-checkout',
		);
	});
	it('adds destination test param for one-time checkout choice', () => {
		const url = getChoiceCardUrl({
			benefits: [],
			isDefault: false,
			label: 'label',
			product: {
				supportTier: 'OneOff',
			},
			destination: 'Checkout',
			destinationTest: {
				testName: 'destination-test',
				variantName: 'variant-a',
			},
		});
		expect(url).toEqual(
			'https://support.theguardian.com/one-time-checkout?force-one-time-checkout=destination-test:variant-a',
		);
	});

	// Recurring contribution
	it('builds landing page url for recurring contribution choice', () => {
		const url = getChoiceCardUrl({
			benefits: [],
			isDefault: false,
			label: 'label',
			product: {
				supportTier: 'Contribution',
				ratePlan: 'Monthly',
			},
			destination: 'LandingPage',
		});
		expect(url).toEqual(
			'https://support.theguardian.com/contribute?product=Contribution&ratePlan=Monthly',
		);
	});
	it('adds destination test param for recurring landing page choice', () => {
		const url = getChoiceCardUrl({
			benefits: [],
			isDefault: false,
			label: 'label',
			product: {
				supportTier: 'Contribution',
				ratePlan: 'Monthly',
			},
			destination: 'LandingPage',
			destinationTest: {
				testName: 'destination-test',
				variantName: 'variant-b',
			},
		});
		expect(url).toEqual(
			'https://support.theguardian.com/contribute?product=Contribution&ratePlan=Monthly&force-landing-page=destination-test:variant-b',
		);
	});
	it('builds checkout page url for recurring contribution choice', () => {
		const url = getChoiceCardUrl({
			benefits: [],
			isDefault: false,
			label: 'label',
			product: {
				supportTier: 'Contribution',
				ratePlan: 'Monthly',
			},
			destination: 'Checkout',
		});
		expect(url).toEqual(
			'https://support.theguardian.com/checkout?product=Contribution&ratePlan=Monthly',
		);
	});

	// SupporterPlus
	it('builds landing page url for Supporter Plus choice', () => {
		const url = getChoiceCardUrl({
			benefits: [],
			isDefault: false,
			label: 'label',
			product: {
				supportTier: 'SupporterPlus',
				ratePlan: 'Annual',
			},
			destination: 'LandingPage',
		});
		expect(url).toEqual(
			'https://support.theguardian.com/contribute?product=SupporterPlus&ratePlan=Annual',
		);
	});
	it('builds checkout page url for Supporter Plus choice', () => {
		const url = getChoiceCardUrl({
			benefits: [],
			isDefault: false,
			label: 'label',
			product: {
				supportTier: 'SupporterPlus',
				ratePlan: 'Annual',
			},
			destination: 'Checkout',
		});
		expect(url).toEqual(
			'https://support.theguardian.com/checkout?product=SupporterPlus&ratePlan=Annual',
		);
	});
});
