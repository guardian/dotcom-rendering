import { render } from '@testing-library/react';
import { ContentABTestProvider } from './ContentABTest';
import { RegionalAd } from './RegionalAd';

describe('RegionalAd', () => {
	const permutiveURL = 'amp-script:permutiveCachedTargeting.ct';

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

	it('rtc-config contains just a permutive URL and prebid object when `usePermutive` and `usePrebid` flags are set to true', () => {
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

		expect(ukRtcAttribute.vendors).toEqual(ukPubmaticVendorObj);
		expect(usRtcAttribute.vendors).toEqual(usPubmaticVendorObj);
		expect(auRtcAttribute.vendors).toEqual(auPubmaticVendorObj);
		expect(intRtcAttribute.vendors).toEqual(intPubmaticVendorObj);
	});

	it('rtc-config contains just a prebid object when `usePrebid` is true and other flags are false', () => {
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

		expect(ukRtcAttribute.vendors).toEqual(ukPubmaticVendorObj);
		expect(usRtcAttribute.vendors).toEqual(usPubmaticVendorObj);
		expect(auRtcAttribute.vendors).toEqual(auPubmaticVendorObj);
		expect(intRtcAttribute.vendors).toEqual(intPubmaticVendorObj);
	});

	it('rtc-config contains just the permutive URL when `usePermutive` is true and other flags are false', () => {
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

	it('rtc-config contains the correct vendor config when just `useAmazon` flag is set to true', () => {
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

	it('rtc-config contains no vendor config when all flags are set to false', () => {
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
});
