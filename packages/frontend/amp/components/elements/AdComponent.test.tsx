import React from 'react';
import { render } from 'react-testing-library';
import { AdComponent } from './AdComponent';

describe('AdComponent', () => {
    const edition = 'UK';
    const section = '';
    const contentType = '';
    const commercialConfig = {
        useKrux: true,
        usePrebid: true,
    };
    const commercialProperties = {
        UK: { adTargeting: [] },
        US: { adTargeting: [] },
        AU: { adTargeting: [] },
        INT: { adTargeting: [] },
    };
    const kruxURL =
        'https://cdn.krxd.net/userdata/v2/amp/2196ddf0-947c-45ec-9b0d-0a82fb280cb8?segments_key=x&kuid_key=kuid';
    const prebidURL =
        'https://prebid.adnxs.com/pbs/v1/openrtb2/amp?tag_id=4&w=ATTR(width)&h=ATTR(height)&ow=ATTR(data-override-width)&oh=ATTR(data-override-height)&ms=ATTR(data-multi-size)&slot=ATTR(data-slot)&targeting=TGT&curl=CANONICAL_URL&timeout=TIMEOUT&adcid=ADCID&purl=HREF';

    beforeEach(() => {
        commercialConfig.useKrux = true;
        commercialConfig.usePrebid = true;
    });

    it('rtc-config returns Krux and PreBid URLs when useKrux and usePrebid flags are set to true', () => {
        const { container } = render(
            <AdComponent
                edition={edition}
                section={section}
                contentType={contentType}
                config={commercialConfig}
                commercialProperties={commercialProperties}
            />,
        );

        const ampAdElement = container.querySelector('amp-ad');

        expect(ampAdElement).not.toBeNull();

        if (ampAdElement) {
            const rtcAttribute = ampAdElement.getAttribute('rtc-config');

            expect(rtcAttribute).not.toBeNull();

            if (rtcAttribute) {
                expect(JSON.parse(rtcAttribute).urls).toMatchObject([
                    kruxURL,
                    prebidURL,
                ]);
            }
        }
    });

    it('rtc-config returns only the PreBid URL when useKrux flag is set to false and usePrebid flag is set to true', () => {
        commercialConfig.useKrux = false;

        const { container } = render(
            <AdComponent
                edition={edition}
                section={section}
                contentType={contentType}
                config={commercialConfig}
                commercialProperties={commercialProperties}
            />,
        );

        const ampAdElement = container.querySelector('amp-ad');

        expect(ampAdElement).not.toBeNull();

        if (ampAdElement) {
            const rtcAttribute = ampAdElement.getAttribute('rtc-config');

            expect(rtcAttribute).not.toBeNull();

            if (rtcAttribute) {
                expect(JSON.parse(rtcAttribute).urls).toMatchObject([
                    prebidURL,
                ]);
            }
        }
    });

    it('rtc-config returns only the Krux URL when useKrux flag is set to true and usePrebid flag is set to false', () => {
        commercialConfig.usePrebid = false;

        const { container } = render(
            <AdComponent
                edition={edition}
                section={section}
                contentType={contentType}
                config={commercialConfig}
                commercialProperties={commercialProperties}
            />,
        );

        const ampAdElement = container.querySelector('amp-ad');

        expect(ampAdElement).not.toBeNull();

        if (ampAdElement) {
            const rtcAttribute = ampAdElement.getAttribute('rtc-config');

            expect(rtcAttribute).not.toBeNull();

            if (rtcAttribute) {
                expect(JSON.parse(rtcAttribute).urls).toMatchObject([kruxURL]);
            }
        }
    });

    it('rtc-config returns no URLs when useKrux and usePrebid flags are set to false', () => {
        commercialConfig.useKrux = false;
        commercialConfig.usePrebid = false;

        const { container } = render(
            <AdComponent
                edition={edition}
                section={section}
                contentType={contentType}
                config={commercialConfig}
                commercialProperties={commercialProperties}
            />,
        );

        const ampAdElement = container.querySelector('amp-ad');

        expect(ampAdElement).not.toBeNull();

        if (ampAdElement) {
            const rtcAttribute = ampAdElement.getAttribute('rtc-config');

            expect(rtcAttribute).not.toBeNull();

            if (rtcAttribute) {
                expect(JSON.parse(rtcAttribute).urls).toMatchObject([]);
            }
        }
    });
});
