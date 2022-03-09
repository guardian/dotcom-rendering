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
	// UK and International have same tag_id
	const intPrebidURL = ukPrebidURL;

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

		expect(ukRtcAttribute.urls).toMatchObject([ukPrebidURL, permutiveURL]);
		expect(usRtcAttribute.urls).toMatchObject([usPrebidURL, permutiveURL]);
		expect(auRtcAttribute.urls).toMatchObject([auPrebidURL, permutiveURL]);
		expect(intRtcAttribute.urls).toMatchObject([
			intPrebidURL,
			permutiveURL,
		]);
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

		expect(ukRtcAttribute.urls).toMatchObject([ukPrebidURL]);
		expect(usRtcAttribute.urls).toMatchObject([usPrebidURL]);
		expect(auRtcAttribute.urls).toMatchObject([auPrebidURL]);
		expect(intRtcAttribute.urls).toMatchObject([intPrebidURL]);
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

		expect(ukRtcAttribute.urls).toMatchObject([permutiveURL]);
		expect(usRtcAttribute.urls).toMatchObject([permutiveURL]);
		expect(auRtcAttribute.urls).toMatchObject([permutiveURL]);
		expect(intRtcAttribute.urls).toMatchObject([permutiveURL]);
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

		const apsVendorObj = {
			aps: { PUB_ID: '3722', PARAMS: { amp: '1' } },
		};

		expect(ukRtcAttribute.vendors).toMatchObject(apsVendorObj);
		expect(usRtcAttribute.vendors).toMatchObject(apsVendorObj);
		expect(auRtcAttribute.vendors).toMatchObject(apsVendorObj);
		expect(intRtcAttribute.vendors).toMatchObject(apsVendorObj);
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

		expect(ukRtcAttribute.vendors).toMatchObject({});
		expect(usRtcAttribute.vendors).toMatchObject({});
		expect(auRtcAttribute.vendors).toMatchObject({});
		expect(intRtcAttribute.vendors).toMatchObject({});
	});
});
