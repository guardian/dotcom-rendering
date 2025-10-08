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
});

describe('getChoiceCardUrl', () => {
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

	// Recurring contribution
	it('builds landing page url for one-time choice', () => {
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
	it('builds checkout page url for one-time choice', () => {
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
	it('builds landing page url for one-time choice', () => {
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
	it('builds checkout page url for one-time choice', () => {
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
