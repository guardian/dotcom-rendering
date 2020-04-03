import React from 'react';
import { css, cx } from 'emotion';

import { text } from '@guardian/src-foundations/palette';
import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { adJson, stringify } from '@root/src/amp/lib/ad-json';

const adStyle = css`
    background: ${palette.neutral[93]};
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiP…AsMy45LTAuOCw3LjMtMi40LDEwLjNDODEsNjIuNSw4Niw1MS42LDg2LDM5LjYiLz48L3N2Zz4=);
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

interface RtcData {
    urls: Array<string>;
    vendors?: { ozone: {} };
}

const realTimeConfig = (
    adRegion: AdRegion,
    usePrebid: boolean,
    usePermutive: boolean,
    useOzone: boolean,
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

    const ozoneVendor = {
        ozone: {
            PUBLISHER_ID: 'OZONE_PROVIDED_PUBLISHER_ID',
            SITE_ID: 'YOUR_SITE_ID',
            TAG_ID: 'OZONE_PROVIDED_STORED_REQUEST_ID',
            PLACEMENT_ID: 'OZONE_PROVIDED_PLACEMENT_ID',
            AD_UNIT_CODE: 'YOUR_AD_UNIT_CODE',
            PUBCID: 'YOUR_PUBCID',
        },
    };

    const data: RtcData = {
        urls: [
            usePrebid ? prebidURL : '',
            usePermutive ? permutiveURL : '',
        ].filter(url => url),
    };

    if (useOzone) {
        data.vendors = ozoneVendor;
    }

    return JSON.stringify(data);
};

interface CommercialConfig {
    usePrebid: boolean;
    usePermutive: boolean;
    useOzone: boolean;
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
                config.useOzone,
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
