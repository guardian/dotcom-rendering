import React from 'react';
import { css, cx } from 'emotion';

import { text } from '@guardian/src-foundations/palette';
import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { adJson, stringify } from '@root/src/amp/lib/ad-json';

const svgBackground = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86 76"><path fill="${palette.neutral[86]}" d="M51 16c0-12-4-14-8-14s-8 2-8 14 4 13 8 13 8-1 8-13M35 61c-5 0-7 4-7 7 0 4 4 8 15 8 13 0 16-4 16-8 1-4-3-7-8-7H35zM25 1a43 43 0 00-13 69v-1c0-7 8-10 15-12-7-1-10-6-10-10 0-6 7-12 10-14-6-4-10-9-10-17 0-7 3-12 8-15m61 39C86 22 75 7 60 0c5 3 8 9 9 15v2c0 12-11 19-26 19l-10-1-2 4c0 2 2 4 4 4h21c13 0 20 5 20 17 0 4-1 7-3 10 8-7 13-18 13-30"/></svg>`,
);

const sizes = [
    // We should investigate 336x280 - @mxdvl 2020-12-11
    // { width: 336, height: 280 },
    { width: 300, height: 250 },
    { width: 300, height: 170 },
    { width: 250, height: 250 },
    { width: 200, height: 200 },
];

const adStyle = css`
    background: ${palette.neutral[93]};
    background-image: url('data:image/svg+xml;utf-8,${svgBackground}');
    background-size: 105px;
    background-repeat: no-repeat;
    background-position: center;
    border-top: 1px solid ${palette.neutral[86]};
    height: ${sizes[0].height + 22}px;
    width: ${sizes[0].width}px;
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
            width={sizes[0].width}
            height={sizes[0].height}
            data-multi-size={sizes
                .map((e) => `${e.width}x${e.height}`)
                .join(',')}
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
