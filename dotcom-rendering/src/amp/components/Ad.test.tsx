import { render } from '@testing-library/react';
import { Ad } from '@root/src/amp/components/Ad';

describe('Ad', () => {
	const permutiveURL =
		'https://guardian.amp.permutive.com/rtc?type=doubleclick';
	const usPrebidURL =
		'https://prebid.adnxs.com/pbs/v1/openrtb2/amp?tag_id=7&w=ATTR(width)&h=ATTR(height)&ow=ATTR(data-override-width)&oh=ATTR(data-override-height)&ms=ATTR(data-multi-size)&slot=ATTR(data-slot)&targeting=TGT&curl=CANONICAL_URL&timeout=TIMEOUT&adcid=ADCID&purl=HREF&gdpr_consent=CONSENT_STRING';
	const auPrebidURL =
		'https://prebid.adnxs.com/pbs/v1/openrtb2/amp?tag_id=6&w=ATTR(width)&h=ATTR(height)&ow=ATTR(data-override-width)&oh=ATTR(data-override-height)&ms=ATTR(data-multi-size)&slot=ATTR(data-slot)&targeting=TGT&curl=CANONICAL_URL&timeout=TIMEOUT&adcid=ADCID&purl=HREF&gdpr_consent=CONSENT_STRING';
	const rowPrebidURL =
		'https://prebid.adnxs.com/pbs/v1/openrtb2/amp?tag_id=4&w=ATTR(width)&h=ATTR(height)&ow=ATTR(data-override-width)&oh=ATTR(data-override-height)&ms=ATTR(data-multi-size)&slot=ATTR(data-slot)&targeting=TGT&curl=CANONICAL_URL&timeout=TIMEOUT&adcid=ADCID&purl=HREF&gdpr_consent=CONSENT_STRING';

	it('rtc-config contains permutive and prebid URLs when `usePermutive` and `usePrebid` flags are set to true', () => {
		const { container } = render(
			<Ad
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
			/>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		const usRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[0].getAttribute('rtc-config') || '{}',
		);
		const auRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[1].getAttribute('rtc-config') || '{}',
		);
		const rowRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[2].getAttribute('rtc-config') || '{}',
		);

		expect(usRtcAttribute.urls).toMatchObject([usPrebidURL, permutiveURL]);
		expect(auRtcAttribute.urls).toMatchObject([auPrebidURL, permutiveURL]);
		expect(rowRtcAttribute.urls).toMatchObject([
			rowPrebidURL,
			permutiveURL,
		]);
	});

	it('rtc-config contains just the prebid URL when `usePermutive` is false and `usePrebid` is true', () => {
		const { container } = render(
			<Ad
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
			/>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		const usRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[0].getAttribute('rtc-config') || '{}',
		);
		const auRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[1].getAttribute('rtc-config') || '{}',
		);
		const rowRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[2].getAttribute('rtc-config') || '{}',
		);

		expect(usRtcAttribute.urls).toMatchObject([usPrebidURL]);
		expect(auRtcAttribute.urls).toMatchObject([auPrebidURL]);
		expect(rowRtcAttribute.urls).toMatchObject([rowPrebidURL]);
	});

	it('rtc-config contains just the permutive URL when `usePermutive` is true and `usePrebid` is false', () => {
		const { container } = render(
			<Ad
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
			/>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		const usRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[0].getAttribute('rtc-config') || '{}',
		);
		const auRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[1].getAttribute('rtc-config') || '{}',
		);
		const rowRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[2].getAttribute('rtc-config') || '{}',
		);

		expect(usRtcAttribute.urls).toMatchObject([permutiveURL]);
		expect(auRtcAttribute.urls).toMatchObject([permutiveURL]);
		expect(rowRtcAttribute.urls).toMatchObject([permutiveURL]);
	});

	it('rtc-config contains no URLs when `usePermutive` and `usePrebid` flags are both set to false', () => {
		const { container } = render(
			<Ad
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
			/>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		const usRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[0].getAttribute('rtc-config') || '{}',
		);
		const auRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[1].getAttribute('rtc-config') || '{}',
		);
		const rowRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[2].getAttribute('rtc-config') || '{}',
		);

		expect(usRtcAttribute.urls).toHaveLength(0);
		expect(auRtcAttribute.urls).toHaveLength(0);
		expect(rowRtcAttribute.urls).toHaveLength(0);
	});

	it('rtc-config contains the correct vendor config when `useAmazon` is set to true', () => {
		const { container } = render(
			<Ad
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
			/>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		const usRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[0].getAttribute('rtc-config') || '{}',
		);
		const auRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[1].getAttribute('rtc-config') || '{}',
		);
		const rowRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[2].getAttribute('rtc-config') || '{}',
		);

		const apsVendorObj = {
			aps: { PUB_ID: '3722', PARAMS: { amp: '1' } },
		};

		expect(usRtcAttribute.vendors).toMatchObject(apsVendorObj);
		expect(auRtcAttribute.vendors).toMatchObject(apsVendorObj);
		expect(rowRtcAttribute.vendors).toMatchObject(apsVendorObj);
	});

	it('rtc-config contains no vendor config when `useAmazon` is set to false', () => {
		const { container } = render(
			<Ad
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
			/>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		const usRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[0].getAttribute('rtc-config') || '{}',
		);
		const auRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[1].getAttribute('rtc-config') || '{}',
		);
		const rowRtcAttribute: Record<string, unknown> = JSON.parse(
			ampAdElement[2].getAttribute('rtc-config') || '{}',
		);

		expect(usRtcAttribute.vendors).toMatchObject({});
		expect(auRtcAttribute.vendors).toMatchObject({});
		expect(rowRtcAttribute.vendors).toMatchObject({});
	});
});
