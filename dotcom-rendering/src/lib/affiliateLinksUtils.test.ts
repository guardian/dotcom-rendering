import {
	addCustomAttributesToLink,
	createMergedAbTestString,
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

describe('addCustomAttributesToLink', () => {
	const createLink = (href: string): HTMLAnchorElement => {
		const link = document.createElement('a');
		link.href = href;
		return link;
	};

	it('adds xcust attributes for skimlinks URLs', () => {
		const link = createLink(
			'https://go.skimresources.com/?id=1234X9876&url=https%3A%2F%2Fwww.theguardian.com%2Fuk',
		);

		const updated = addCustomAttributesToLink({
			link,
			abTestParticipations: {},
			utmParamsString: '',
			referrerDomain: 'www.theguardian.com',
		});

		expect(updated).toBe(link);
		const xcust = new URL(updated.href).searchParams.get('xcust');
		expect(decodeURIComponent(xcust ?? '')).toBe(
			'referrer|www.theguardian.com|accountId|1234X9876',
		);
	});

	it('includes optional xcust values when provided', () => {
		const link = createLink(
			'https://go.skimresources.com/?id=1111&url=https%3A%2F%2Fwww.theguardian.com%2Fus-news',
		);
		link.setAttribute('data-x-cust-component-id', 'related-content');

		const updated = addCustomAttributesToLink({
			link,
			abTestParticipations: { abTest1: 'variantA' },
			utmParamsString: 'utm_medium|cpc|utm_campaign|summer',
			referrerDomain: 'www.theguardian.com',
		});

		const xcust = decodeURIComponent(
			new URL(updated.href).searchParams.get('xcust') ?? '',
		);
		expect(xcust).toBe(
			'referrer|www.theguardian.com|accountId|1111|abTestParticipations|abTest1:variantA|utm_medium|cpc|utm_campaign|summer|componentId|related-content',
		);
	});

	it('does not modify non-skimlinks URLs', () => {
		const originalHref = 'https://www.theguardian.com/world';
		const link = createLink(originalHref);

		const updated = addCustomAttributesToLink({
			link,
			abTestParticipations: { abTest1: 'variantA' },
			utmParamsString: 'utm_medium|cpc',
			referrerDomain: 'www.theguardian.com',
		});

		expect(updated.href).toBe(originalHref);
	});

	it('merges existing and incoming AB test participations', () => {
		const link = createLink(
			'https://go.skimresources.com/?id=1111&url=https%3A%2F%2Fwww.theguardian.com%2Fus-news&xcust=referrer%7Cwww.theguardian.com%7CaccountId%7C1111%7CabTestParticipations%7CexistingTest%3Acontrol%2CabTest1%3AoldVariant',
		);

		const updated = addCustomAttributesToLink({
			link,
			abTestParticipations: { abTest1: 'variantA', newTest: 'variantB' },
			utmParamsString: '',
			referrerDomain: 'www.theguardian.com',
		});

		const xcust = decodeURIComponent(
			new URL(updated.href).searchParams.get('xcust') ?? '',
		);
		expect(xcust).toContain('|abTestParticipations|');
		expect(xcust).toContain('existingTest:control');
		expect(xcust).toContain('newTest:variantB');
		expect(xcust).toContain('abTest1:oldVariant');
		expect(xcust).not.toContain('abTest1:variantA');
	});

	it('replaces existing xcust instead of adding a second xcust param', () => {
		const link = createLink(
			'https://go.skimresources.com/?id=1111&url=https%3A%2F%2Fwww.theguardian.com%2Fus-news&xcust=referrer%7Cold.example%7CaccountId%7C1111%7CabTestParticipations%7ColdTest%3AoldVariant',
		);

		const updated = addCustomAttributesToLink({
			link,
			abTestParticipations: { newTest: 'newVariant' },
			utmParamsString: '',
			referrerDomain: 'www.theguardian.com',
		});

		const updatedUrl = new URL(updated.href);
		expect(updatedUrl.searchParams.getAll('xcust')).toHaveLength(1);

		const xcust = decodeURIComponent(
			updatedUrl.searchParams.get('xcust') ?? '',
		);
		expect(xcust).toContain('referrer|www.theguardian.com|accountId|1111');
		expect(xcust).toContain('newTest:newVariant');
		expect(xcust).toContain('oldTest:oldVariant');
	});
});

describe('createMergedAbTestString', () => {
	it('returns incoming AB test string when URL has no existing participations', () => {
		const url =
			'https://go.skimresources.com/?id=1111&url=https%3A%2F%2Fwww.theguardian.com%2Fus-news';

		expect(
			createMergedAbTestString({
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
			createMergedAbTestString({
				url,
				abTestParticipations: {
					newTest: 'newVariant',
				},
			}),
		).toBe('newTest:newVariant,oldTest:oldVariant');
	});
});
