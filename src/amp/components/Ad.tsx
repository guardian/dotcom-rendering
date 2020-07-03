import React from 'react';
import { css, cx } from 'emotion';

import { text } from '@guardian/src-foundations/palette';
import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { adJson, stringify } from '@root/src/amp/lib/ad-json';

const svgBackground = encodeURIComponent(
    '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 86 76" enable-background="new 0 0 86 76" xml:space="preserve"><path fill="#dcdcdc" d="M50.8,15.9c0-11.8-3.5-13.6-7.8-13.6c-4.2,0-7.7,1.6-7.7,13.6c0,12,3.5,13,7.7,13C47.2,28.9,50.8,27.7,50.8,15.9 M35.3,60.8c-5.4,0-7,4-7,6.9c0,4.3,3.8,8.2,15,8.2c12.7,0,16.2-3.6,16.2-8.2c0-4.1-3.1-6.9-8.2-6.9H35.3z M25.1,0.5C10.3,7.3,0,22.3,0,39.6C0,51.4,4.7,62,12.4,69.8c0-0.2,0-0.4,0-0.6c0-7.7,7.5-10.5,14.1-11.9v0c-6.3-1.4-9.4-5.9-9.4-10.5c0-6.2,6.9-11.5,10.3-13.9L27,32.7c-5.9-3.3-9.8-9-9.8-16.8C17.2,9.2,20.1,4,25.1,0.5 M86,39.6C86,21.9,75.3,6.7,60,0.1c5.1,3.3,8.3,8.5,8.5,15c0,0.6,0.1,1,0.1,1.4c0,12.8-10.4,19.6-25.6,19.6c-3.9,0-6.5-0.2-9.7-1.2c-1.5,1-2.6,2.7-2.6,4.3c0,2.1,1.9,3.8,4.2,3.8h21.1c13.1,0,19.5,5.4,19.5,16.9c0,3.9-0.8,7.3-2.4,10.3C81,62.5,86,51.6,86,39.6"/></svg>',
);

const adStyle = css`
    background: ${palette.neutral[93]};
    background-image: url('data:image/svg+xml; ${svgBackground}');
    background-size: 105px;
    background-repeat: no-repeat;
    background-position: center;
    border-top: 1px solid ${palette.neutral[86]};
    height: 272px;
    width: 300px;
    clear: both;
    text-align: center;
    margin: 0 auto 12px;

    :before {
        content: 'Advertisement';
        display: block;
        ${textSans.xsmall()};
        /* Adverts specifcally don't use the GU font branding. */
        /* stylelint-disable-next-line property-blacklist */
        font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande',
            sans-serif;
        padding: 3px 10px;
        color: ${text.supporting};
        text-align: right;
    }
`;

const adClass = css`
    display: none;
`;

const usAdRegionClass = css`
    .amp-geo-group-us & {
        display: block;
    }
`;

const auAdRegionClass = css`
    .amp-geo-group-au & {
        display: block;
    }
`;

const rowAdRegionClass = css`
    .amp-geo-group-eea & {
        display: block;
    }
    .amp-geo-no-group & {
        display: block;
    }
`;

const adRegionClasses = {
    US: usAdRegionClass,
    AU: auAdRegionClass,
    ROW: rowAdRegionClass,
};

type AdRegion = 'US' | 'AU' | 'ROW';

const dfpAdUnitRoot = 'theguardian.com';

const ampData = (section: string, contentType: string): string => {
    const dfpAccountId = '59666047';

    if (section !== '') {
        return `/${dfpAccountId}/${dfpAdUnitRoot}/${section}/${contentType.toLowerCase()}/amp`;
    }

    return `/${dfpAccountId}/${dfpAdUnitRoot}/amp`;
};

const getPlacementId = (adRegion: AdRegion): number => {
    switch (adRegion) {
        case 'US':
            return 7;
        case 'AU':
            return 6;
        default:
            return 4;
    }
};

const realTimeConfig = (
    adRegion: AdRegion,
    usePrebid: boolean,
    usePermutive: boolean,
): any => {
    const placementID = getPlacementId(adRegion);
    const preBidServerPrefix = 'https://prebid.adnxs.com/pbs/v1/openrtb2/amp';
    const permutiveURL =
        'https://guardian.amp.permutive.com/rtc?type=doubleclick';

    const prebidURL = [
        `${preBidServerPrefix}?tag_id=${placementID}`,
        'w=ATTR(width)',
        'h=ATTR(height)',
        'ow=ATTR(data-override-width)',
        'oh=ATTR(data-override-height)',
        'ms=ATTR(data-multi-size)',
        'slot=ATTR(data-slot)',
        'targeting=TGT',
        'curl=CANONICAL_URL',
        'timeout=TIMEOUT',
        'adcid=ADCID',
        'purl=HREF',
    ].join('&');

    const data = {
        urls: [
            usePrebid ? prebidURL : '',
            usePermutive ? permutiveURL : '',
        ].filter((url) => url),
    };

    return JSON.stringify(data);
};

interface CommercialConfig {
    usePrebid: boolean;
    usePermutive: boolean;
}

const ampAdElem = (
    adRegion: AdRegion,
    edition: Edition,
    section: string,
    contentType: string,
    config: CommercialConfig,
    commercialProperties: CommercialProperties,
) => {
    return (
        <amp-ad
            class={cx(adClass, adRegionClasses[adRegion])}
            data-block-on-consent=""
            width={300}
            height={250}
            data-npa-on-unknown-consent={true}
            data-loading-strategy="prefer-viewability-over-views"
            layout="responsive"
            type="doubleclick"
            json={stringify(adJson(commercialProperties[edition].adTargeting))}
            data-slot={ampData(section, contentType)}
            rtc-config={realTimeConfig(
                adRegion,
                config.usePrebid,
                config.usePermutive,
            )}
        />
    );
};

export const Ad: React.SFC<{
    edition: Edition;
    section?: string;
    contentType: string;
    config: CommercialConfig;
    commercialProperties: CommercialProperties;
    className: string;
}> = ({
    edition,
    section,
    contentType,
    config,
    commercialProperties,
    className,
}) => (
    <div className={cx(adStyle, className)}>
        {ampAdElem(
            'US',
            edition,
            section || '',
            contentType,
            config,
            commercialProperties,
        )}
        {ampAdElem(
            'AU',
            edition,
            section || '',
            contentType,
            config,
            commercialProperties,
        )}
        {ampAdElem(
            'ROW',
            edition,
            section || '',
            contentType,
            config,
            commercialProperties,
        )}
    </div>
);
