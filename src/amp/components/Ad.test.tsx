import React from 'react';
import { render } from '@testing-library/react';
import { Ad } from '@root/src/amp/components/Ad';

describe('AdComponent', () => {
	const edition = 'UK';
	const section = '';
	const contentType = '';
	const commercialConfig = {
		usePrebid: true,
		usePermutive: true,
	};
	const commercialProperties = {
		UK: { adTargeting: [] },
		US: { adTargeting: [] },
		AU: { adTargeting: [] },
		INT: { adTargeting: [] },
	};
	const permutiveURL =
		'https://guardian.amp.permutive.com/rtc?type=doubleclick';
	const usPrebidURL =
		'https://prebid.adnxs.com/pbs/v1/openrtb2/amp?tag_id=7&w=ATTR(width)&h=ATTR(height)&ow=ATTR(data-override-width)&oh=ATTR(data-override-height)&ms=ATTR(data-multi-size)&slot=ATTR(data-slot)&targeting=TGT&curl=CANONICAL_URL&timeout=TIMEOUT&adcid=ADCID&purl=HREF';
	const auPrebidURL =
		'https://prebid.adnxs.com/pbs/v1/openrtb2/amp?tag_id=6&w=ATTR(width)&h=ATTR(height)&ow=ATTR(data-override-width)&oh=ATTR(data-override-height)&ms=ATTR(data-multi-size)&slot=ATTR(data-slot)&targeting=TGT&curl=CANONICAL_URL&timeout=TIMEOUT&adcid=ADCID&purl=HREF';
	const rowPrebidURL =
		'https://prebid.adnxs.com/pbs/v1/openrtb2/amp?tag_id=4&w=ATTR(width)&h=ATTR(height)&ow=ATTR(data-override-width)&oh=ATTR(data-override-height)&ms=ATTR(data-multi-size)&slot=ATTR(data-slot)&targeting=TGT&curl=CANONICAL_URL&timeout=TIMEOUT&adcid=ADCID&purl=HREF';

	beforeEach(() => {
		commercialConfig.usePermutive = true;
		commercialConfig.usePrebid = true;
	});

	it('rtc-config returns correctly formed Permutive and PreBid URLs when usePermutive and usePrebid flags are set to true', () => {
		const { container } = render(
			<Ad
				edition={edition}
				section={section}
				contentType={contentType}
				config={commercialConfig}
				commercialProperties={commercialProperties}
				className=""
			/>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		if (ampAdElement) {
			const usRtcAttribute = ampAdElement[0].getAttribute('rtc-config');
			const auRtcAttribute = ampAdElement[1].getAttribute('rtc-config');
			const rowRtcAttribute = ampAdElement[2].getAttribute('rtc-config');

			expect(usRtcAttribute).not.toBeNull();
			expect(auRtcAttribute).not.toBeNull();
			expect(rowRtcAttribute).not.toBeNull();

			if (usRtcAttribute) {
				expect(JSON.parse(usRtcAttribute).urls).toMatchObject([
					usPrebidURL,
					permutiveURL,
				]);
			}
			if (auRtcAttribute) {
				expect(JSON.parse(auRtcAttribute).urls).toMatchObject([
					auPrebidURL,
					permutiveURL,
				]);
			}
			if (rowRtcAttribute) {
				expect(JSON.parse(rowRtcAttribute).urls).toMatchObject([
					rowPrebidURL,
					permutiveURL,
				]);
			}
		}
	});

	it('rtc-config returns only the correctly formed PreBid URL when usePermutive flag is set to false and usePrebid flag is set to true', () => {
		commercialConfig.usePermutive = false;

		const { container } = render(
			<Ad
				edition={edition}
				section={section}
				contentType={contentType}
				config={commercialConfig}
				commercialProperties={commercialProperties}
				className=""
			/>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		if (ampAdElement) {
			const usRtcAttribute = ampAdElement[0].getAttribute('rtc-config');
			const auRtcAttribute = ampAdElement[1].getAttribute('rtc-config');
			const rowRtcAttribute = ampAdElement[2].getAttribute('rtc-config');

			expect(usRtcAttribute).not.toBeNull();
			expect(auRtcAttribute).not.toBeNull();
			expect(rowRtcAttribute).not.toBeNull();

			if (usRtcAttribute) {
				expect(JSON.parse(usRtcAttribute).urls).toMatchObject([
					usPrebidURL,
				]);
			}
			if (auRtcAttribute) {
				expect(JSON.parse(auRtcAttribute).urls).toMatchObject([
					auPrebidURL,
				]);
			}
			if (rowRtcAttribute) {
				expect(JSON.parse(rowRtcAttribute).urls).toMatchObject([
					rowPrebidURL,
				]);
			}
		}
	});

	it('rtc-config returns only the Permutive URL when usePermutive flags is set to true and usePrebid flag is set to false', () => {
		commercialConfig.usePrebid = false;

		const { container } = render(
			<Ad
				edition={edition}
				section={section}
				contentType={contentType}
				config={commercialConfig}
				commercialProperties={commercialProperties}
				className=""
			/>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		if (ampAdElement) {
			const usRtcAttribute = ampAdElement[0].getAttribute('rtc-config');
			const auRtcAttribute = ampAdElement[1].getAttribute('rtc-config');
			const rowRtcAttribute = ampAdElement[2].getAttribute('rtc-config');

			expect(usRtcAttribute).not.toBeNull();
			expect(auRtcAttribute).not.toBeNull();
			expect(rowRtcAttribute).not.toBeNull();

			if (usRtcAttribute) {
				expect(JSON.parse(usRtcAttribute).urls).toMatchObject([
					permutiveURL,
				]);
			}
			if (auRtcAttribute) {
				expect(JSON.parse(auRtcAttribute).urls).toMatchObject([
					permutiveURL,
				]);
			}
			if (rowRtcAttribute) {
				expect(JSON.parse(rowRtcAttribute).urls).toMatchObject([
					permutiveURL,
				]);
			}
		}
	});

	it('rtc-config returns no URLs when usePermutive and usePrebid flags are set to false', () => {
		commercialConfig.usePrebid = false;
		commercialConfig.usePermutive = false;

		const { container } = render(
			<Ad
				edition={edition}
				section={section}
				contentType={contentType}
				config={commercialConfig}
				commercialProperties={commercialProperties}
				className=""
			/>,
		);

		const ampAdElement = container.querySelectorAll('amp-ad');

		expect(ampAdElement).not.toBeNull();

		if (ampAdElement) {
			const usRtcAttribute = ampAdElement[0].getAttribute('rtc-config');
			const auRtcAttribute = ampAdElement[1].getAttribute('rtc-config');
			const rowRtcAttribute = ampAdElement[2].getAttribute('rtc-config');

			expect(usRtcAttribute).not.toBeNull();
			expect(auRtcAttribute).not.toBeNull();
			expect(rowRtcAttribute).not.toBeNull();

			if (usRtcAttribute) {
				expect(JSON.parse(usRtcAttribute).urls).toMatchObject([]);
			}
			if (auRtcAttribute) {
				expect(JSON.parse(auRtcAttribute).urls).toMatchObject([]);
			}
			if (rowRtcAttribute) {
				expect(JSON.parse(rowRtcAttribute).urls).toMatchObject([]);
			}
		}
	});
});
