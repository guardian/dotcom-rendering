import { render } from '@testing-library/react';
import { ContentABTestProvider } from './ContentABTest';
import { RegionalAd } from './RegionalAd';

describe('RegionalAd', () => {
	const permutiveURL =
		'https://guardian.amp.permutive.com/rtc?type=doubleclick';

	const ukPrebidURL =
		'https://prebid.adnxs.com/pbs/v1/openrtb2/amp?tag_id=4&w=ATTR(width)&h=ATTR(height)&ow=ATTR(data-override-width)&oh=ATTR(data-override-height)&ms=ATTR(data-multi-size)&slot=ATTR(data-slot)&targeting=TGT&curl=CANONICAL_URL&timeout=TIMEOUT&adcid=ADCID&purl=HREF&gdpr_consent=CONSENT_STRING';
	const usPrebidURL =
		'https://prebid.adnxs.com/pbs/v1/openrtb2/amp?tag_id=7&w=ATTR(width)&h=ATTR(height)&ow=ATTR(data-override-width)&oh=ATTR(data-override-height)&ms=ATTR(data-multi-size)&slot=ATTR(data-slot)&targeting=TGT&curl=CANONICAL_URL&timeout=TIMEOUT&adcid=ADCID&purl=HREF&gdpr_consent=CONSENT_STRING';
	const auPrebidURL =
		'https://prebid.adnxs.com/pbs/v1/openrtb2/amp?tag_id=6&w=ATTR(width)&h=ATTR(height)&ow=ATTR(data-override-width)&oh=ATTR(data-override-height)&ms=ATTR(data-multi-size)&slot=ATTR(data-slot)&targeting=TGT&curl=CANONICAL_URL&timeout=TIMEOUT&adcid=ADCID&purl=HREF&gdpr_consent=CONSENT_STRING';
	const intPrebidURL =
		'https://prebid.adnxs.com/pbs/v1/openrtb2/amp?tag_id=4&w=ATTR(width)&h=ATTR(height)&ow=ATTR(data-override-width)&oh=ATTR(data-override-height)&ms=ATTR(data-multi-size)&slot=ATTR(data-slot)&targeting=TGT&curl=CANONICAL_URL&timeout=TIMEOUT&adcid=ADCID&purl=HREF&gdpr_consent=CONSENT_STRING';

	const ukRelevantYieldURL =
		'https://pbs.relevant-digital.com/openrtb2/amp?tag_id=6214ca675cf18e70cbaeef37_6214c9a4b73a6613d4aeef2f&tgt_pfx=rv&gdpr_consent=CONSENT_STRING';
	const usRelevantYieldURL =
		'https://pbs.relevant-digital.com/openrtb2/amp?tag_id=6214cb381a577cd525aeef3f_6214caacb52b565527aeef39&tgt_pfx=rv&gdpr_consent=CONSENT_STRING';
	const auRelevantYieldURL =
		'https://pbs.relevant-digital.com/openrtb2/amp?tag_id=6214cbe6a24103508faeef45_6214cb50aac9c1160daeef40&tgt_pfx=rv&gdpr_consent=CONSENT_STRING';
	const intRelevantYieldURL =
		'https://pbs.relevant-digital.com/openrtb2/amp?tag_id=6214ca56243f4ff4f5aeef36_6214c723c70856442e4d79f2&tgt_pfx=rv&gdpr_consent=CONSENT_STRING';

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

	it('with no ab test running rtc-config contains permutive and prebid URLs when `usePermutive` and `usePrebid` flags are set to true', () => {
		const { container } = render(
			<ContentABTestProvider pageId="" switches={{}}>
				<RegionalAd
					edition="UK"
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

		expect(ukRtcAttribute.urls).toEqual([ukPrebidURL, permutiveURL]);
		expect(usRtcAttribute.urls).toEqual([usPrebidURL, permutiveURL]);
		expect(auRtcAttribute.urls).toEqual([auPrebidURL, permutiveURL]);
		expect(intRtcAttribute.urls).toEqual([intPrebidURL, permutiveURL]);
	});

	it('with no ab test running rtc-config contains just the prebid URL when `usePermutive` is false and `usePrebid` is true', () => {
		const { container } = render(
			<ContentABTestProvider pageId="" switches={{}}>
				<RegionalAd
					edition="UK"
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

		expect(ukRtcAttribute.urls).toEqual([ukPrebidURL]);
		expect(usRtcAttribute.urls).toEqual([usPrebidURL]);
		expect(auRtcAttribute.urls).toEqual([auPrebidURL]);
		expect(intRtcAttribute.urls).toEqual([intPrebidURL]);
	});

	it('with no ab test running rtc-config contains just the permutive URL when `usePermutive` is true and `usePrebid` is false', () => {
		const { container } = render(
			<ContentABTestProvider pageId="" switches={{}}>
				<RegionalAd
					edition="UK"
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
					edition="UK"
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
					edition="UK"
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
					edition="UK"
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

	it('with ab test running and in control group, rtc-config contains permutive and prebid URLs when `usePermutive` and `usePrebid` flags are set to true', () => {
		const { container } = render(
			<ContentABTestProvider
				pageId="world/2021/jun/24/hong-kong-apple-daily-queue-final-edition-newspaper"
				switches={{ ampContentAbTesting: true }}
			>
				<RegionalAd
					edition="UK"
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

		expect(ukRtcAttribute.urls).toEqual([ukPrebidURL, permutiveURL]);
		expect(usRtcAttribute.urls).toEqual([usPrebidURL, permutiveURL]);
		expect(auRtcAttribute.urls).toEqual([auPrebidURL, permutiveURL]);
		expect(intRtcAttribute.urls).toEqual([intPrebidURL, permutiveURL]);

		expect(ukRtcAttribute.vendors).toEqual(apsVendorObj);
		expect(usRtcAttribute.vendors).toEqual(apsVendorObj);
		expect(auRtcAttribute.vendors).toEqual(apsVendorObj);
		expect(intRtcAttribute.vendors).toEqual(apsVendorObj);
	});

	it('with ab test running and in relevant yield variant, rtc-config contains permutive and relevant yield URLs when `usePermutive` and `usePrebid` flags are set to true', () => {
		const { container } = render(
			<ContentABTestProvider
				pageId="food/2022/feb/15/air-fryers-miraculous-kitchen-must-have-or-just-a-load-of-hot-air"
				switches={{ ampContentAbTesting: true }}
			>
				<RegionalAd
					edition="UK"
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

	it('with ab test running and in Pubmatic variant, rtc-config contains Permutive UR and Pubmatic vendor when `usePermutive` and `usePrebid` flags are set to true', () => {
		const { container } = render(
			<ContentABTestProvider
				pageId="money/2004/may/13/homeimprovements"
				switches={{ ampContentAbTesting: true }}
			>
				<RegionalAd
					edition="UK"
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
