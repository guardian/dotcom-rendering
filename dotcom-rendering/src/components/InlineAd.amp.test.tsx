import { render } from '@testing-library/react';
import { ContentABTestProvider } from './ContentABTest.amp';
import { InlineAd } from './InlineAd.amp';

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

	const expectedJsonAttribute = {
		targeting: {
			p: 'amp',
			rp: 'dotcom-rendering',
			sens: 'f',
			slot: 'ad-1',
			// TODO Should empty strings have been filtered out?
			urlkw: '',
		},
	};

	it('rtc-config contains just a permutive URL and prebid object when `usePermutive` and `usePubmaticPrebid` flags are set to true', () => {
		const { container } = render(
			<ContentABTestProvider pageId="" switches={{}}>
				<InlineAd
					id="ad-1"
					editionId="UK"
					section=""
					contentType=""
					config={{
						usePubmaticPrebid: true,
						useCriteoPrebid: false,
						useOzonePrebid: false,
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

		const ampAdElements = Array.from(container.querySelectorAll('amp-ad'));

		expect(ampAdElements).not.toBeNull();

		const [ukJson, usJson, auJson, intJson] = ampAdElements
			.map((el) => el.getAttribute('json'))
			.map(
				(config) =>
					JSON.parse(config ?? '{}') as Record<string, unknown>,
			);

		expect(ukJson).toEqual(expectedJsonAttribute);
		expect(usJson).toEqual(expectedJsonAttribute);
		expect(auJson).toEqual(expectedJsonAttribute);
		expect(intJson).toEqual(expectedJsonAttribute);

		const [ukRtc, usRtc, auRtc, intRtc] = ampAdElements
			.map((el) => el.getAttribute('rtc-config'))
			.map(
				(config) =>
					JSON.parse(config ?? '{}') as Record<string, unknown>,
			);

		expect(ukRtc?.urls).toEqual([permutiveURL]);
		expect(usRtc?.urls).toEqual([permutiveURL]);
		expect(auRtc?.urls).toEqual([permutiveURL]);
		expect(intRtc?.urls).toEqual([permutiveURL]);

		expect(ukRtc?.vendors).toEqual(ukPubmaticVendorObj);
		expect(usRtc?.vendors).toEqual(usPubmaticVendorObj);
		expect(auRtc?.vendors).toEqual(auPubmaticVendorObj);
		expect(intRtc?.vendors).toEqual(intPubmaticVendorObj);
	});

	it('rtc-config contains just a prebid object when `usePubmaticPrebid` is true and other flags are false', () => {
		const { container } = render(
			<ContentABTestProvider pageId="" switches={{}}>
				<InlineAd
					id="ad-1"
					editionId="UK"
					section=""
					contentType=""
					config={{
						usePubmaticPrebid: true,
						useCriteoPrebid: false,
						useOzonePrebid: false,
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

		const ampAdElements = Array.from(container.querySelectorAll('amp-ad'));

		expect(ampAdElements).not.toBeNull();

		const [ukJson, usJson, auJson, intJson] = ampAdElements
			.map((el) => el.getAttribute('json'))
			.map(
				(config) =>
					JSON.parse(config ?? '{}') as Record<string, unknown>,
			);

		expect(ukJson).toEqual(expectedJsonAttribute);
		expect(usJson).toEqual(expectedJsonAttribute);
		expect(auJson).toEqual(expectedJsonAttribute);
		expect(intJson).toEqual(expectedJsonAttribute);

		const [ukRtc, usRtc, auRtc, intRtc] = ampAdElements
			.map((el) => el.getAttribute('rtc-config'))
			.map(
				(config) =>
					JSON.parse(config ?? '{}') as Record<string, unknown>,
			);

		expect(ukRtc?.urls).toEqual([]);
		expect(usRtc?.urls).toEqual([]);
		expect(auRtc?.urls).toEqual([]);
		expect(intRtc?.urls).toEqual([]);

		expect(ukRtc?.vendors).toEqual(ukPubmaticVendorObj);
		expect(usRtc?.vendors).toEqual(usPubmaticVendorObj);
		expect(auRtc?.vendors).toEqual(auPubmaticVendorObj);
		expect(intRtc?.vendors).toEqual(intPubmaticVendorObj);
	});

	it('rtc-config contains just the permutive URL when `usePermutive` is true and other flags are false', () => {
		const { container } = render(
			<ContentABTestProvider pageId="" switches={{}}>
				<InlineAd
					id="ad-1"
					editionId="UK"
					section=""
					contentType=""
					config={{
						usePubmaticPrebid: false,
						useCriteoPrebid: false,
						useOzonePrebid: false,
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

		const ampAdElements = Array.from(container.querySelectorAll('amp-ad'));

		expect(ampAdElements).not.toBeNull();

		const [ukJson, usJson, auJson, intJson] = ampAdElements
			.map((el) => el.getAttribute('json'))
			.map(
				(config) =>
					JSON.parse(config ?? '{}') as Record<string, unknown>,
			);

		expect(ukJson).toEqual(expectedJsonAttribute);
		expect(usJson).toEqual(expectedJsonAttribute);
		expect(auJson).toEqual(expectedJsonAttribute);
		expect(intJson).toEqual(expectedJsonAttribute);

		const [ukRtc, usRtc, auRtc, intRtc] = ampAdElements
			.map((el) => el.getAttribute('rtc-config'))
			.map(
				(config) =>
					JSON.parse(config ?? '{}') as Record<string, unknown>,
			);

		expect(ukRtc?.urls).toEqual([permutiveURL]);
		expect(usRtc?.urls).toEqual([permutiveURL]);
		expect(auRtc?.urls).toEqual([permutiveURL]);
		expect(intRtc?.urls).toEqual([permutiveURL]);

		expect(ukRtc?.vendors).toEqual({});
		expect(usRtc?.vendors).toEqual({});
		expect(auRtc?.vendors).toEqual({});
		expect(intRtc?.vendors).toEqual({});
	});

	it('rtc-config contains the correct vendor config when just `useAmazon` flag is set to true', () => {
		const { container } = render(
			<ContentABTestProvider pageId="" switches={{}}>
				<InlineAd
					id="ad-1"
					editionId="UK"
					section=""
					contentType=""
					config={{
						usePubmaticPrebid: false,
						useCriteoPrebid: false,
						useOzonePrebid: false,
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
		const ampAdElements = Array.from(container.querySelectorAll('amp-ad'));

		expect(ampAdElements).not.toBeNull();

		const [ukJson, usJson, auJson, intJson] = ampAdElements
			.map((el) => el.getAttribute('json'))
			.map(
				(config) =>
					JSON.parse(config ?? '{}') as Record<string, unknown>,
			);

		expect(ukJson).toEqual(expectedJsonAttribute);
		expect(usJson).toEqual(expectedJsonAttribute);
		expect(auJson).toEqual(expectedJsonAttribute);
		expect(intJson).toEqual(expectedJsonAttribute);

		const [ukRtc, usRtc, auRtc, intRtc] = ampAdElements
			.map((el) => el.getAttribute('rtc-config'))
			.map(
				(config) =>
					JSON.parse(config ?? '{}') as Record<string, unknown>,
			);

		expect(ukRtc?.urls).toEqual([]);
		expect(usRtc?.urls).toEqual([]);
		expect(auRtc?.urls).toEqual([]);
		expect(intRtc?.urls).toEqual([]);

		expect(ukRtc?.vendors).toEqual(apsVendorObj);
		expect(usRtc?.vendors).toEqual(apsVendorObj);
		expect(auRtc?.vendors).toEqual(apsVendorObj);
		expect(intRtc?.vendors).toEqual(apsVendorObj);
	});

	it('rtc-config contains no vendor config when all flags are set to false', () => {
		const { container } = render(
			<ContentABTestProvider pageId="" switches={{}}>
				<InlineAd
					id="ad-1"
					editionId="UK"
					section=""
					contentType=""
					config={{
						usePubmaticPrebid: false,
						useCriteoPrebid: false,
						useOzonePrebid: false,
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

		const ampAdElements = Array.from(container.querySelectorAll('amp-ad'));

		expect(ampAdElements).not.toBeNull();

		const [ukJson, usJson, auJson, intJson] = ampAdElements
			.map((el) => el.getAttribute('json'))
			.map(
				(config) =>
					JSON.parse(config ?? '{}') as Record<string, unknown>,
			);

		expect(ukJson).toEqual(expectedJsonAttribute);
		expect(usJson).toEqual(expectedJsonAttribute);
		expect(auJson).toEqual(expectedJsonAttribute);
		expect(intJson).toEqual(expectedJsonAttribute);

		const [ukRtc, usRtc, auRtc, intRtc] = ampAdElements
			.map((el) => el.getAttribute('rtc-config'))
			.map(
				(config) =>
					JSON.parse(config ?? '{}') as Record<string, unknown>,
			);

		expect(ukRtc?.urls).toEqual([]);
		expect(usRtc?.urls).toEqual([]);
		expect(auRtc?.urls).toEqual([]);
		expect(intRtc?.urls).toEqual([]);

		expect(ukRtc?.vendors).toEqual({});
		expect(usRtc?.vendors).toEqual({});
		expect(auRtc?.vendors).toEqual({});
		expect(intRtc?.vendors).toEqual({});
	});
});
