import {
	buildMergedAbTestString,
	buildXcustValueForAffiliateLink,
	extractAbTestParticipationFromUrl,
} from './affiliateLinksUtils';

describe('extractAbTestParticipationFromUrl', () => {
	it('extracts AB test participations from xcust', () => {
		const url =
			'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.argos.co.uk%2Fproduct%2F8112969&sref=https://www.theguardian.com/thefilter/2024/nov/21/best-coffee-machines&xcust=referrer%7Cwww.theguardian.com%7CaccountId%7C114047X1572903%7CabTestParticipations%7Cthefilter-at-a-glance-redesign-v2%3Acarousel%7CcomponentId%7Ccarousel-card';

		expect(extractAbTestParticipationFromUrl(url)).toEqual({
			'thefilter-at-a-glance-redesign-v2': 'carousel',
		});
	});

	it('returns empty object when xcust has no AB test section', () => {
		const url =
			'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.argos.co.uk%2Fproduct%2F8112969&xcust=referrer%7Cwww.theguardian.com%7CaccountId%7C114047X1572903%7CcomponentId%7Ccarousel-card';

		expect(extractAbTestParticipationFromUrl(url)).toEqual({});
	});
});

describe('buildXcustValueForAffiliateLink', () => {
	it('returns xcust value for skimlinks URLs', () => {
		const xcustResult = buildXcustValueForAffiliateLink({
			url: 'https://go.skimresources.com/?id=1234X9876&url=https%3A%2F%2Fwww.theguardian.com%2Fuk',
			abTestParticipations: {},
			utmParamsString: '',
			referrerDomain: 'www.theguardian.com',
			xcustComponentId: null,
		});

		expect(xcustResult.ok).toBe(true);
		if (!xcustResult.ok) throw new Error('Expected Ok result');
		expect(xcustResult.value).toBe(
			'referrer|www.theguardian.com|accountId|1234X9876',
		);
	});

	it('includes optional xcust values when provided', () => {
		const xcustResult = buildXcustValueForAffiliateLink({
			url: 'https://go.skimresources.com/?id=1111&url=https%3A%2F%2Fwww.theguardian.com%2Fus-news',
			abTestParticipations: { abTest1: 'variantA' },
			utmParamsString: 'utm_medium|cpc|utm_campaign|summer',
			referrerDomain: 'www.theguardian.com',
			xcustComponentId: 'related-content',
		});

		expect(xcustResult.ok).toBe(true);
		if (!xcustResult.ok) throw new Error('Expected Ok result');
		expect(xcustResult.value).toBe(
			'referrer|www.theguardian.com|accountId|1111|abTestParticipations|abTest1:variantA|utm_medium|cpc|utm_campaign|summer|componentId|related-content',
		);
	});

	it('returns NotSkimlink error for non-skimlinks URLs', () => {
		const xcustResult = buildXcustValueForAffiliateLink({
			url: 'https://www.theguardian.com/world',
			abTestParticipations: { abTest1: 'variantA' },
			utmParamsString: 'utm_medium|cpc',
			referrerDomain: 'www.theguardian.com',
			xcustComponentId: null,
		});

		expect(xcustResult.ok).toBe(false);
		if (xcustResult.ok) throw new Error('Expected Err result');
		expect(xcustResult.error).toBe('NotSkimlink');
	});

	it('merges existing and incoming AB test participations', () => {
		const xcustResult = buildXcustValueForAffiliateLink({
			url: 'https://go.skimresources.com/?id=1111&url=https%3A%2F%2Fwww.theguardian.com%2Fus-news&xcust=referrer%7Cwww.theguardian.com%7CaccountId%7C1111%7CabTestParticipations%7CexistingTest%3Acontrol%2CabTest1%3AoldVariant',
			abTestParticipations: { abTest1: 'variantA', newTest: 'variantB' },
			utmParamsString: '',
			referrerDomain: 'www.theguardian.com',
			xcustComponentId: null,
		});

		expect(xcustResult.ok).toBe(true);
		if (!xcustResult.ok) throw new Error('Expected Ok result');
		expect(xcustResult.value).toContain('|abTestParticipations|');
		expect(xcustResult.value).toContain('existingTest:control');
		expect(xcustResult.value).toContain('newTest:variantB');
		expect(xcustResult.value).toContain('abTest1:oldVariant');
		expect(xcustResult.value).not.toContain('abTest1:variantA');
	});

	it('preserves existing AB participations when url already has xcust', () => {
		const xcustResult = buildXcustValueForAffiliateLink({
			url: 'https://go.skimresources.com/?id=1111&url=https%3A%2F%2Fwww.theguardian.com%2Fus-news&xcust=referrer%7Cold.example%7CaccountId%7C1111%7CabTestParticipations%7ColdTest%3AoldVariant',
			abTestParticipations: { newTest: 'newVariant' },
			utmParamsString: '',
			referrerDomain: 'www.theguardian.com',
			xcustComponentId: null,
		});

		expect(xcustResult.ok).toBe(true);
		if (!xcustResult.ok) throw new Error('Expected Ok result');
		expect(xcustResult.value).toContain(
			'referrer|www.theguardian.com|accountId|1111',
		);
		expect(xcustResult.value).toContain('newTest:newVariant');
		expect(xcustResult.value).toContain('oldTest:oldVariant');
	});

	it('returns InvalidUrl error for malformed URLs', () => {
		const xcustResult = buildXcustValueForAffiliateLink({
			url: 'not a url',
			abTestParticipations: {},
			utmParamsString: '',
			referrerDomain: 'www.theguardian.com',
			xcustComponentId: null,
		});

		expect(xcustResult.ok).toBe(false);
		if (xcustResult.ok) throw new Error('Expected Err result');
		expect(xcustResult.error).toBe('InvalidUrl');
	});
});

describe('buildMergedAbTestString', () => {
	it('returns incoming AB test string when URL has no existing participations', () => {
		const url =
			'https://go.skimresources.com/?id=1111&url=https%3A%2F%2Fwww.theguardian.com%2Fus-news';

		expect(
			buildMergedAbTestString({
				url,
				abTestParticipations: {
					abTest1: 'variantA',
					abTest2: 'variantB',
				},
			}),
		).toBe('abTest1:variantA,abTest2:variantB');
	});

	it('keeps existing URL values when keys collide', () => {
		const url =
			'https://go.skimresources.com/?id=1111&url=https%3A%2F%2Fwww.theguardian.com%2Fus-news&xcust=referrer%7Cwww.theguardian.com%7CaccountId%7C1111%7CabTestParticipations%7ColdTest%3AoldVariant';

		expect(
			buildMergedAbTestString({
				url,
				abTestParticipations: {
					newTest: 'newVariant',
				},
			}),
		).toBe('newTest:newVariant,oldTest:oldVariant');
	});
});
