import React from 'react';
import { css } from 'emotion';
import { until } from '@guardian/pasteup/breakpoints';
import { palette } from '@guardian/pasteup/palette';
import { adJson } from '@frontend/amp/lib/ad-json';

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
        font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande',
            sans-serif;
        padding: 3px 10px;
        color: ${palette.neutral[46]};
        text-align: right;
    }
`;

const dfpAdUnitRoot = 'theguardian.com';

// type AdRegion =  'US' | 'ROW' | 'AU';

// const editionToAdRegion(edition: Edition): AdRegion

const ampData = (
    section: string,
    dfpAccountId: string,
    contentType: string,
): string => {
    const dfpAccountId2 = '59666047';
    if (section !== '') {
        return `/${dfpAccountId2}/${dfpAdUnitRoot}/${section}/${contentType.toLowerCase()}/amp`;
    }
    return `/${dfpAccountId2}/${dfpAdUnitRoot}/amp`;
};

const getPlacementId = (edition: Edition): number => {
    switch (edition) {
        case 'US':
            return 7;
        case 'AU':
            return 6;
        default:
            return 4;
    }
};

const realTimeConfig = (
    preBidServerUrl: string,
    edition: Edition,
    debug: boolean,
    switches: { [key: string]: boolean },
): any => {
    const kruxUrl =
        'https://cdn.krxd.net/userdata/v2/amp/2196ddf0-947c-45ec-9b0d-0a82fb280cb8?segments_key=x&kuid_key=kuid';

    const prebidBaseUrl = `${preBidServerUrl}/openrtb2/amp?tag_id=${getPlacementId(
        edition,
    )}&w=ATTR(width)&h=ATTR(height)
            &ow=ATTR(data-override-width)&oh=ATTR(data-override-height)&ms=ATTR(data-multi-size)
            &slot=ATTR(data-slot)&targeting=TGT&curl=CANONICAL_URL&timeout=TIMEOUT&adcid=ADCID&purl=HREF}`;
    const ampPrebidUrl = debug ? `${prebidBaseUrl}&debug=1` : prebidBaseUrl;

    const lol = {
        urls: [
            switches.krux ? kruxUrl : '',
            switches['amp-prebid'] ? ampPrebidUrl : '',
        ].filter(url => url),
    };

    return JSON.stringify(lol);
};

export const AdComponent: React.SFC<{
    edition: Edition;
    section: string;
    dfpAccountId: string;
    contentType: string;
    switches: Switches;
    commercialProperties: CommercialProperties;
}> = ({
    edition,
    section,
    dfpAccountId,
    contentType,
    switches,
    commercialProperties,
}) => (
    <div className={adStyle}>
        <amp-ad
            width={300}
            height={250}
            data-npa-on-unknown-consent={true}
            data-loading-strategy={'prefer-viewability-over-views'}
            // data-slot={AmpAdDataSlot(article).toString()}
            layout={'responsive'}
            type={'doubleclick'}
            json={adJson(edition, commercialProperties.editionAdTargeting)}
            data-slot={ampData(section, dfpAccountId, contentType)}
            rtc-config={realTimeConfig('test', edition, false, switches)}
        />
    </div>
);
