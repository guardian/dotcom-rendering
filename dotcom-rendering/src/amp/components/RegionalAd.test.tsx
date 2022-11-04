import { render } from '@testing-library/react';
import { ContentABTestProvider } from './ContentABTest';
import { RegionalAd } from './RegionalAd';

describe('RegionalAd', () => {
	const permutiveURL = 'amp-script:permutiveCachedTargeting.ct';

	const ukRelevantYieldURL =
		'https://guardian-pbs.relevant-digital.com/openrtb2/amp?tag_id=6214ca675cf18e70cbaeef37_6214c9a4b73a6613d4aeef2f&w=ATTR(width)&h=ATTR(height)&ow=ATTR(data-override-width)&oh=ATTR(data-override-height)&ms=ATTR(data-multi-size)&slot=ATTR(data-slot)&targeting=TGT&curl=CANONICAL_URL&timeout=TIMEOUT&adcid=ADCID&purl=HREF&gdpr_consent=CONSENT_STRING&tgt_pfx=rv&dummy_param=ATTR(data-amp-slot-index)';
	const usRelevantYieldURL =
		'https://guardian-pbs.relevant-digital.com/openrtb2/amp?tag_id=6214cb381a577cd525aeef3f_6214caacb52b565527aeef39&w=ATTR(width)&h=ATTR(height)&ow=ATTR(data-override-width)&oh=ATTR(data-override-height)&ms=ATTR(data-multi-size)&slot=ATTR(data-slot)&targeting=TGT&curl=CANONICAL_URL&timeout=TIMEOUT&adcid=ADCID&purl=HREF&gdpr_consent=CONSENT_STRING&tgt_pfx=rv&dummy_param=ATTR(data-amp-slot-index)';
	const auRelevantYieldURL =
		'https://guardian-pbs.relevant-digital.com/openrtb2/amp?tag_id=6214cbe6a24103508faeef45_6214cb50aac9c1160daeef40&w=ATTR(width)&h=ATTR(height)&ow=ATTR(data-override-width)&oh=ATTR(data-override-height)&ms=ATTR(data-multi-size)&slot=ATTR(data-slot)&targeting=TGT&curl=CANONICAL_URL&timeout=TIMEOUT&adcid=ADCID&purl=HREF&gdpr_consent=CONSENT_STRING&tgt_pfx=rv&dummy_param=ATTR(data-amp-slot-index)';
	const intRelevantYieldURL =
		'https://guardian-pbs.relevant-digital.com/openrtb2/amp?tag_id=6214ca56243f4ff4f5aeef36_6214c723c70856442e4d79f2&w=ATTR(width)&h=ATTR(height)&ow=ATTR(data-override-width)&oh=ATTR(data-override-height)&ms=ATTR(data-multi-size)&slot=ATTR(data-slot)&targeting=TGT&curl=CANONICAL_URL&timeout=TIMEOUT&adcid=ADCID&purl=HREF&gdpr_consent=CONSENT_STRING&tgt_pfx=rv&dummy_param=ATTR(data-amp-slot-index)';
	const apsVendorObj = {
		aps: { PUB_ID: '3722', PARAMS: { amp: '1' } },
	};

	const ukPubmaticVendorObj = {
		openwrap: {
			PROFILE_ID: '6611',
			PUB_ID: '157207',
		},
	};
	const usPubmaticVendorObj = {
		openwrap: {
			PROFILE_ID: '6696',
			PUB_ID: '157206',
		},
	};
	const auPubmaticVendorObj = {
		openwrap: {
			PROFILE_ID: '6697',
			PUB_ID: '157203',
		},
	};
	const intPubmaticVendorObj = {
		openwrap: {
			PROFILE_ID: '6611',
			PUB_ID: '157207',
		},
	};

	it('with no ab test running rtc-config contains just a permutive URL when `usePermutive` and `usePrebid` flags are set to true', () => {
		const { container } = render(
			<ContentABTestProvider pageId="" switches={{}}>
				<RegionalAd
					editionId="UK"
					section=""
					contentType=""
					config={{
						usePrebid: true,
						usePermutive: true,
						useAmazon: false,
					}}
					commercialProperties={{
						UK: { adTargeting: [] },
						US: { adTargeting: [] },
						AU: { adTargeting: [] },
						INT: { adTargeting: [] },
						EUR: { adTargeting: [] },
					}}
					adTargeting={{
						customParams: { sens: 'f', urlkw: [] },
						adUnit: '',
					}}
				/>
			</ContentABTestProvider>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		const ukRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[0].getAttribute('rtc-config') || '{}',
		);
		const usRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[1].getAttribute('rtc-config') || '{}',
		);
		const auRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[2].getAttribute('rtc-config') || '{}',
		);
		const intRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[3].getAttribute('rtc-config') || '{}',
		);

		expect(ukRtcAttribute.urls).toEqual([permutiveURL]);
		expect(usRtcAttribute.urls).toEqual([permutiveURL]);
		expect(auRtcAttribute.urls).toEqual([permutiveURL]);
		expect(intRtcAttribute.urls).toEqual([permutiveURL]);
	});

	it('with no ab test running rtc-config contains just no prebid URL when `usePermutive` is false and `usePrebid` is true', () => {
		const { container } = render(
			<ContentABTestProvider pageId="" switches={{}}>
				<RegionalAd
					editionId="UK"
					section=""
					contentType=""
					config={{
						usePrebid: true,
						usePermutive: false,
						useAmazon: false,
					}}
					commercialProperties={{
						UK: { adTargeting: [] },
						US: { adTargeting: [] },
						AU: { adTargeting: [] },
						INT: { adTargeting: [] },
						EUR: { adTargeting: [] },
					}}
					adTargeting={{
						customParams: { sens: 'f', urlkw: [] },
						adUnit: '',
					}}
				/>
			</ContentABTestProvider>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		const ukRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[0].getAttribute('rtc-config') || '{}',
		);
		const usRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[1].getAttribute('rtc-config') || '{}',
		);
		const auRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[2].getAttribute('rtc-config') || '{}',
		);
		const intRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[3].getAttribute('rtc-config') || '{}',
		);

		expect(ukRtcAttribute.urls).toEqual([]);
		expect(usRtcAttribute.urls).toEqual([]);
		expect(auRtcAttribute.urls).toEqual([]);
		expect(intRtcAttribute.urls).toEqual([]);
	});

	it('with no ab test running rtc-config contains just the permutive URL when `usePermutive` is true and `usePrebid` is false', () => {
		const { container } = render(
			<ContentABTestProvider pageId="" switches={{}}>
				<RegionalAd
					editionId="UK"
					section=""
					contentType=""
					config={{
						usePrebid: false,
						usePermutive: true,
						useAmazon: false,
					}}
					commercialProperties={{
						UK: { adTargeting: [] },
						US: { adTargeting: [] },
						AU: { adTargeting: [] },
						INT: { adTargeting: [] },
						EUR: { adTargeting: [] },
					}}
					adTargeting={{
						customParams: { sens: 'f', urlkw: [] },
						adUnit: '',
					}}
				/>
			</ContentABTestProvider>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		const ukRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[0].getAttribute('rtc-config') || '{}',
		);
		const usRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[1].getAttribute('rtc-config') || '{}',
		);
		const auRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[2].getAttribute('rtc-config') || '{}',
		);
		const intRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[3].getAttribute('rtc-config') || '{}',
		);

		expect(ukRtcAttribute.urls).toEqual([permutiveURL]);
		expect(usRtcAttribute.urls).toEqual([permutiveURL]);
		expect(auRtcAttribute.urls).toEqual([permutiveURL]);
		expect(intRtcAttribute.urls).toEqual([permutiveURL]);
	});

	it('with no ab test running rtc-config contains no URLs when `usePermutive` and `usePrebid` flags are both set to false', () => {
		const { container } = render(
			<ContentABTestProvider pageId="" switches={{}}>
				<RegionalAd
					editionId="UK"
					section=""
					contentType=""
					config={{
						usePrebid: false,
						usePermutive: false,
						useAmazon: false,
					}}
					commercialProperties={{
						UK: { adTargeting: [] },
						US: { adTargeting: [] },
						AU: { adTargeting: [] },
						INT: { adTargeting: [] },
						EUR: { adTargeting: [] },
					}}
					adTargeting={{
						customParams: { sens: 'f', urlkw: [] },
						adUnit: '',
					}}
				/>
			</ContentABTestProvider>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		const ukRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[0].getAttribute('rtc-config') || '{}',
		);
		const usRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[1].getAttribute('rtc-config') || '{}',
		);
		const auRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[2].getAttribute('rtc-config') || '{}',
		);
		const intRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[3].getAttribute('rtc-config') || '{}',
		);

		expect(ukRtcAttribute.urls).toHaveLength(0);
		expect(usRtcAttribute.urls).toHaveLength(0);
		expect(auRtcAttribute.urls).toHaveLength(0);
		expect(intRtcAttribute.urls).toHaveLength(0);
	});

	it('with no ab test running rtc-config contains the correct vendor config when `useAmazon` is set to true', () => {
		const { container } = render(
			<ContentABTestProvider pageId="" switches={{}}>
				<RegionalAd
					editionId="UK"
					section=""
					contentType=""
					config={{
						usePrebid: false,
						usePermutive: false,
						useAmazon: true,
					}}
					commercialProperties={{
						UK: { adTargeting: [] },
						US: { adTargeting: [] },
						AU: { adTargeting: [] },
						INT: { adTargeting: [] },
						EUR: { adTargeting: [] },
					}}
					adTargeting={{
						customParams: { sens: 'f', urlkw: [] },
						adUnit: '',
					}}
				/>
			</ContentABTestProvider>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		const ukRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[0].getAttribute('rtc-config') || '{}',
		);
		const usRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[1].getAttribute('rtc-config') || '{}',
		);
		const auRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[2].getAttribute('rtc-config') || '{}',
		);
		const intRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[3].getAttribute('rtc-config') || '{}',
		);

		expect(ukRtcAttribute.vendors).toEqual(apsVendorObj);
		expect(usRtcAttribute.vendors).toEqual(apsVendorObj);
		expect(auRtcAttribute.vendors).toEqual(apsVendorObj);
		expect(intRtcAttribute.vendors).toEqual(apsVendorObj);
	});

	it('with no ab test running rtc-config contains no vendor config when `useAmazon` is set to false', () => {
		const { container } = render(
			<ContentABTestProvider pageId="" switches={{}}>
				<RegionalAd
					editionId="UK"
					section=""
					contentType=""
					config={{
						usePrebid: false,
						usePermutive: false,
						useAmazon: false,
					}}
					commercialProperties={{
						UK: { adTargeting: [] },
						US: { adTargeting: [] },
						AU: { adTargeting: [] },
						INT: { adTargeting: [] },
						EUR: { adTargeting: [] },
					}}
					adTargeting={{
						customParams: { sens: 'f', urlkw: [] },
						adUnit: '',
					}}
				/>
			</ContentABTestProvider>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		const ukRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[0].getAttribute('rtc-config') || '{}',
		);
		const usRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[1].getAttribute('rtc-config') || '{}',
		);
		const auRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[2].getAttribute('rtc-config') || '{}',
		);
		const intRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[3].getAttribute('rtc-config') || '{}',
		);

		expect(ukRtcAttribute.vendors).toEqual({});
		expect(usRtcAttribute.vendors).toEqual({});
		expect(auRtcAttribute.vendors).toEqual({});
		expect(intRtcAttribute.vendors).toEqual({});
	});

	it('with ab test running and in relevant yield variant, rtc-config contains permutive and relevant yield URLs when `usePermutive` and `usePrebid` flags are set to true', () => {
		const { container } = render(
			<ContentABTestProvider
				pageId="food/2022/feb/15/air-fryers-miraculous-kitchen-must-have-or-just-a-load-of-hot-air"
				switches={{ ampContentAbTesting: true }}
			>
				<RegionalAd
					editionId="UK"
					section=""
					contentType=""
					config={{
						usePrebid: true,
						usePermutive: true,
						useAmazon: true,
					}}
					commercialProperties={{
						UK: { adTargeting: [] },
						US: { adTargeting: [] },
						AU: { adTargeting: [] },
						INT: { adTargeting: [] },
						EUR: { adTargeting: [] },
					}}
					adTargeting={{
						customParams: { sens: 'f', urlkw: [] },
						adUnit: '',
					}}
				/>
			</ContentABTestProvider>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		const ukRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[0].getAttribute('rtc-config') || '{}',
		);
		const usRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[1].getAttribute('rtc-config') || '{}',
		);
		const auRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[2].getAttribute('rtc-config') || '{}',
		);
		const intRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[3].getAttribute('rtc-config') || '{}',
		);

		expect(ukRtcAttribute.urls).toEqual([ukRelevantYieldURL, permutiveURL]);
		expect(usRtcAttribute.urls).toEqual([usRelevantYieldURL, permutiveURL]);
		expect(auRtcAttribute.urls).toEqual([auRelevantYieldURL, permutiveURL]);
		expect(intRtcAttribute.urls).toEqual([
			intRelevantYieldURL,
			permutiveURL,
		]);

		expect(ukRtcAttribute.vendors).toEqual(apsVendorObj);
		expect(usRtcAttribute.vendors).toEqual(apsVendorObj);
		expect(auRtcAttribute.vendors).toEqual(apsVendorObj);
		expect(intRtcAttribute.vendors).toEqual(apsVendorObj);
	});

	it.skip('with ab test running and in Pubmatic variant, rtc-config contains Permutive UR and Pubmatic vendor when `usePermutive` and `usePrebid` flags are set to true', () => {
		const { container } = render(
			<ContentABTestProvider
				pageId="money/2004/may/13/homeimprovements"
				switches={{ ampContentAbTesting: true }}
			>
				<RegionalAd
					editionId="UK"
					section=""
					contentType=""
					config={{
						usePrebid: true,
						usePermutive: true,
						useAmazon: true,
					}}
					commercialProperties={{
						UK: { adTargeting: [] },
						US: { adTargeting: [] },
						AU: { adTargeting: [] },
						INT: { adTargeting: [] },
						EUR: { adTargeting: [] },
					}}
					adTargeting={{
						customParams: { sens: 'f', urlkw: [] },
						adUnit: '',
					}}
				/>
			</ContentABTestProvider>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		const ukRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[0].getAttribute('rtc-config') || '{}',
		);
		const usRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[1].getAttribute('rtc-config') || '{}',
		);
		const auRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[2].getAttribute('rtc-config') || '{}',
		);
		const intRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[3].getAttribute('rtc-config') || '{}',
		);

		expect(ukRtcAttribute.urls).toEqual([permutiveURL]);
		expect(usRtcAttribute.urls).toEqual([permutiveURL]);
		expect(auRtcAttribute.urls).toEqual([permutiveURL]);
		expect(intRtcAttribute.urls).toEqual([permutiveURL]);

		expect(ukRtcAttribute.vendors).toEqual({
			...ukPubmaticVendorObj,
			...apsVendorObj,
		});
		expect(usRtcAttribute.vendors).toEqual({
			...usPubmaticVendorObj,
			...apsVendorObj,
		});
		expect(auRtcAttribute.vendors).toEqual({
			...auPubmaticVendorObj,
			...apsVendorObj,
		});
		expect(intRtcAttribute.vendors).toEqual({
			...intPubmaticVendorObj,
			...apsVendorObj,
		});
	});
});
