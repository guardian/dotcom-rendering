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
        useOzone: true,
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

    const ozoneConfig = {
        ozone: {
            PUBLISHER_ID: 'OZONE_PROVIDED_PUBLISHER_ID',
            SITE_ID: 'YOUR_SITE_ID',
            TAG_ID: 'OZONE_PROVIDED_STORED_REQUEST_ID',
            PLACEMENT_ID: 'OZONE_PROVIDED_PLACEMENT_ID',
            AD_UNIT_CODE: 'YOUR_AD_UNIT_CODE',
            PUBCID: 'YOUR_PUBCID',
        }
    }
    beforeEach(() => {
        commercialConfig.usePermutive = true;
        commercialConfig.usePrebid = true;
        commercialConfig.useOzone = true;
    });

    it('rtc-config returns correctly formed Permutive and PreBid URLs and the correctly formed ozone config when usePermutive, usePrebid and useOzone flags are set to true', () => {
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
                expect(JSON.parse(usRtcAttribute)).toEqual(expect.objectContaining({
                    urls: [
                        usPrebidURL,
                        permutiveURL,
                    ],
                    vendors: ozoneConfig,
                }));
            }
            if (auRtcAttribute) {
                expect(JSON.parse(auRtcAttribute)).toEqual(expect.objectContaining({
                    urls: [
                        auPrebidURL,
                        permutiveURL,
                    ],
                    vendors: ozoneConfig,
                }));
            }
            if (rowRtcAttribute) {
                expect(JSON.parse(rowRtcAttribute)).toEqual(expect.objectContaining({
                    urls: [
                        rowPrebidURL,
                        permutiveURL,
                    ],
                    vendors: ozoneConfig,
                }));
            }
        }
    });

    it('rtc-config returns only the correctly formed PreBid URL when usePermutive and useOzone flags are set to false and usePrebid flag is set to true', () => {
        commercialConfig.usePermutive = false;
        commercialConfig.useOzone = false;

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

    it('rtc-config returns only the Permutive URL when usePermutive flags is set to true and usePrebid and useOzone flags are set to false', () => {
        commercialConfig.usePrebid = false;
        commercialConfig.useOzone = false;

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

    it('rtc-config returns no URLs and the correct Ozone config when usePermutive and usePrebid flags are set to false and useOzone flag is set to true', () => {
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
                expect(JSON.parse(usRtcAttribute)).toEqual(expect.objectContaining({
                    urls: [],
                    vendors: ozoneConfig,
                }));
            }
            if (auRtcAttribute) {
                expect(JSON.parse(auRtcAttribute)).toEqual(expect.objectContaining({
                    urls: [],
                    vendors: ozoneConfig,
                }));
            }
            if (rowRtcAttribute) {
                expect(JSON.parse(rowRtcAttribute)).toEqual(expect.objectContaining({
                    urls: [],
                    vendors: ozoneConfig,
                }));
            }
        }
    })

    it('rtc-config returns no URLs when usePermutive and usePrebid flags are set to false', () => {
        commercialConfig.usePrebid = false;
        commercialConfig.usePermutive = false;
        commercialConfig.useOzone = false;

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
