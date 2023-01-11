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

		const [uk, us, au, int] = Array.from(ampAdElement)
			.map((el) => el.getAttribute('rtc-config'))
			.map(
				(config) =>
					JSON.parse(config ?? '{}') as Record<string, unknown>,
			);

		expect(uk?.urls).toEqual([permutiveURL]);
		expect(us?.urls).toEqual([permutiveURL]);
		expect(au?.urls).toEqual([permutiveURL]);
		expect(int?.urls).toEqual([permutiveURL]);

		expect(uk?.vendors).toEqual(ukPubmaticVendorObj);
		expect(us?.vendors).toEqual(usPubmaticVendorObj);
		expect(au?.vendors).toEqual(auPubmaticVendorObj);
		expect(int?.vendors).toEqual(intPubmaticVendorObj);
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

		const [uk, us, au, int] = Array.from(ampAdElement)
			.map((el) => el.getAttribute('rtc-config'))
			.map(
				(config) =>
					JSON.parse(config ?? '{}') as Record<string, unknown>,
			);

		expect(uk?.urls).toEqual([]);
		expect(us?.urls).toEqual([]);
		expect(au?.urls).toEqual([]);
		expect(int?.urls).toEqual([]);

		expect(uk?.vendors).toEqual(ukPubmaticVendorObj);
		expect(us?.vendors).toEqual(usPubmaticVendorObj);
		expect(au?.vendors).toEqual(auPubmaticVendorObj);
		expect(int?.vendors).toEqual(intPubmaticVendorObj);
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

		const [uk, us, au, int] = Array.from(ampAdElement)
			.map((el) => el.getAttribute('rtc-config'))
			.map(
				(config) =>
					JSON.parse(config ?? '{}') as Record<string, unknown>,
			);

		expect(uk?.urls).toEqual([permutiveURL]);
		expect(us?.urls).toEqual([permutiveURL]);
		expect(au?.urls).toEqual([permutiveURL]);
		expect(int?.urls).toEqual([permutiveURL]);
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

		const [uk, us, au, int] = Array.from(ampAdElement)
			.map((el) => el.getAttribute('rtc-config'))
			.map(
				(config) =>
					JSON.parse(config ?? '{}') as Record<string, unknown>,
			);

		expect(uk?.vendors).toEqual(apsVendorObj);
		expect(us?.vendors).toEqual(apsVendorObj);
		expect(au?.vendors).toEqual(apsVendorObj);
		expect(int?.vendors).toEqual(apsVendorObj);
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

		const [uk, us, au, int] = Array.from(ampAdElement)
			.map((el) => el.getAttribute('rtc-config'))
			.map(
				(config) =>
					JSON.parse(config ?? '{}') as Record<string, unknown>,
			);

		expect(uk?.vendors).toEqual({});
		expect(us?.vendors).toEqual({});
		expect(au?.vendors).toEqual({});
		expect(int?.vendors).toEqual({});
	});
});
