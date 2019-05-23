import React from 'react';
import { css, cx } from 'emotion';
import { until } from '@guardian/pasteup/breakpoints';
import { palette } from '@guardian/pasteup/palette';
import { adJson, stringify } from '@frontend/amp/lib/ad-json';

const adStyle = css`
    background: ${palette.neutral[93]};
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiP…AsMy45LTAuOCw3LjMtMi40LDEwLjNDODEsNjIuNSw4Niw1MS42LDg2LDM5LjYiLz48L3N2Zz4=);
    background-size: 105px;
    background-repeat: no-repeat;
    background-position: center;
    border-top: 1px solid ${palette.neutral[86]};
    float: right;
    height: 272px;
    width: 300px;
    margin: 4px 0 12px 20px;

    ${until.phablet} {
        clear: both;
        float: none;
        text-align: center;
        margin-right: auto;
        margin-left: auto;
    }

    :before {
        content: 'Advertisement';
        display: block;
        font-size: 12px;
        line-height: 16px;
        /* Adverts specifcally don't use the GU font branding. */
        /* stylelint-disable-next-line property-blacklist */
        font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande',
            sans-serif;
        padding: 3px 10px;
        color: ${palette.neutral[46]};
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
    useKrux: boolean,
    usePrebid: boolean,
): any => {
    const placementID = getPlacementId(adRegion);
    const preBidServerPrefix = 'https://prebid.adnxs.com/pbs/v1/openrtb2/amp';
    const kruxURL =
        'https://cdn.krxd.net/userdata/v2/amp/2196ddf0-947c-45ec-9b0d-0a82fb280cb8?segments_key=x&kuid_key=kuid';

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
        urls: [useKrux ? kruxURL : '', usePrebid ? prebidURL : ''].filter(
            url => url,
        ),
    };

    return JSON.stringify(data);
};

interface CommercialConfig {
    useKrux: boolean;
    usePrebid: boolean;
}

const ampAdElem = (
    adRegion: AdRegion,
    edition: Edition,
    section: string,
    contentType: string,
    config: CommercialConfig,
    commercialProperties: CommercialProperties,
    className: string,
) => {
    return (
        <amp-ad
            class={cx(adClass, adRegionClasses[adRegion], className)}
            data-block-on-consent=""
            width={300}
            height={250}
            data-npa-on-unknown-consent={true}
            data-loading-strategy={'prefer-viewability-over-views'}
            layout={'responsive'}
            type={'doubleclick'}
            json={stringify(adJson(commercialProperties[edition].adTargeting))}
            data-slot={ampData(section, contentType)}
            rtc-config={realTimeConfig(
                adRegion,
                config.useKrux,
                config.usePrebid,
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
    <div className={adStyle}>
        {ampAdElem(
            'US',
            edition,
            section || '',
            contentType,
            config,
            commercialProperties,
            className,
        )}
        {ampAdElem(
            'AU',
            edition,
            section || '',
            contentType,
            config,
            commercialProperties,
            className,
        )}
        {ampAdElem(
            'ROW',
            edition,
            section || '',
            contentType,
            config,
            commercialProperties,
            className,
        )}
    </div>
);
