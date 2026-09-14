import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
	buildMergedAbTestString,
	buildXcustParamForAffiliateLink,
	extractAbTestParticipationFromUrl,
} from './affiliateLinksUtils';

void describe('extractAbTestParticipationFromUrl', () => {
	void it('extracts AB test participations from xcust', () => {
		const url =
			'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.argos.co.uk%2Fproduct%2F8112969&sref=https://www.theguardian.com/thefilter/2024/nov/21/best-coffee-machines&xcust=referrer%7Cwww.theguardian.com%7CaccountId%7C114047X1572903%7CabTestParticipations%7Cthefilter-at-a-glance-redesign-v2%3Acarousel%7CcomponentId%7Ccarousel-card';

		assert.deepEqual(extractAbTestParticipationFromUrl(url), {
			'thefilter-at-a-glance-redesign-v2': 'carousel',
		});
	});

	void it('returns empty object when xcust has no AB test section', () => {
		const url =
			'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.argos.co.uk%2Fproduct%2F8112969&xcust=referrer%7Cwww.theguardian.com%7CaccountId%7C114047X1572903%7CcomponentId%7Ccarousel-card';

		assert.deepEqual(extractAbTestParticipationFromUrl(url), {});
	});
});

void describe('buildXcustValueForAffiliateLink', () => {
	void it('returns xcust value for skimlinks URLs', () => {
		const xcustResult = buildXcustParamForAffiliateLink({
			url: new URL(
				'https://go.skimresources.com/?id=1234X9876&url=https%3A%2F%2Fwww.theguardian.com%2Fuk',
			),
			abTestParticipations: {},
			utmParamsString: '',
			referrerDomain: 'www.theguardian.com',
			xcustComponentId: null,
		});

		assert.equal(
			xcustResult,
			'referrer|www.theguardian.com|accountId|1234X9876',
		);
	});

	void it('includes optional xcust values when provided', () => {
		const xcustResult = buildXcustParamForAffiliateLink({
			url: new URL(
				'https://go.skimresources.com/?id=1111&url=https%3A%2F%2Fwww.theguardian.com%2Fus-news',
			),
			abTestParticipations: { abTest1: 'variantA' },
			utmParamsString: 'utm_medium|cpc|utm_campaign|summer',
			referrerDomain: 'www.theguardian.com',
			xcustComponentId: 'related-content',
		});

		assert.equal(
			xcustResult,
			'referrer|www.theguardian.com|accountId|1111|abTestParticipations|abTest1:variantA|utm_medium|cpc|utm_campaign|summer|componentId|related-content',
		);
	});

	void it('merges existing and incoming AB test participations', () => {
		const xcustResult = buildXcustParamForAffiliateLink({
			url: new URL(
				'https://go.skimresources.com/?id=1111&url=https%3A%2F%2Fwww.theguardian.com%2Fus-news&xcust=referrer%7Cwww.theguardian.com%7CaccountId%7C1111%7CabTestParticipations%7CexistingTest%3Acontrol%2CabTest1%3AoldVariant',
			),
			abTestParticipations: { abTest1: 'variantA', newTest: 'variantB' },
			utmParamsString: '',
			referrerDomain: 'www.theguardian.com',
			xcustComponentId: null,
		});

		assert.ok(xcustResult.includes('|abTestParticipations|'));
		assert.ok(xcustResult.includes('existingTest:control'));
		assert.ok(xcustResult.includes('newTest:variantB'));
		assert.ok(xcustResult.includes('abTest1:oldVariant'));
		assert.ok(!xcustResult.includes('abTest1:variantA'));
	});

	void it('preserves existing AB participations when url already has xcust', () => {
		const xcustResult = buildXcustParamForAffiliateLink({
			url: new URL(
				'https://go.skimresources.com/?id=1111&url=https%3A%2F%2Fwww.theguardian.com%2Fus-news&xcust=referrer%7Cold.example%7CaccountId%7C1111%7CabTestParticipations%7ColdTest%3AoldVariant',
			),
			abTestParticipations: { newTest: 'newVariant' },
			utmParamsString: '',
			referrerDomain: 'www.theguardian.com',
			xcustComponentId: null,
		});

		assert.ok(
			xcustResult.includes('referrer|www.theguardian.com|accountId|1111'),
		);
		assert.ok(xcustResult.includes('newTest:newVariant'));
		assert.ok(xcustResult.includes('oldTest:oldVariant'));
	});
});

void describe('buildMergedAbTestString', () => {
	void it('returns incoming AB test string when URL has no existing participations', () => {
		const url =
			'https://go.skimresources.com/?id=1111&url=https%3A%2F%2Fwww.theguardian.com%2Fus-news';

		assert.equal(
			buildMergedAbTestString({
				url,
				abTestParticipations: {
					abTest1: 'variantA',
					abTest2: 'variantB',
				},
			}),
			'abTest1:variantA,abTest2:variantB',
		);
	});

	void it('keeps existing URL values when keys collide', () => {
		const url =
			'https://go.skimresources.com/?id=1111&url=https%3A%2F%2Fwww.theguardian.com%2Fus-news&xcust=referrer%7Cwww.theguardian.com%7CaccountId%7C1111%7CabTestParticipations%7ColdTest%3AoldVariant';

		assert.equal(
			buildMergedAbTestString({
				url,
				abTestParticipations: {
					newTest: 'newVariant',
				},
			}),
			'newTest:newVariant,oldTest:oldVariant',
		);
	});
});
