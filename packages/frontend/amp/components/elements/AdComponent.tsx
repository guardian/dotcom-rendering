import React from 'react';

const dfpAdUnitRoot = 'theguardian.com';

const ampJson = (
    edition: Edition,
    uri: string,
    editionAdTargetings: EditionAdTargeting[],
): string => {
    const targeting = editionAdTargetings
        .filter(t => t.edition === edition)
        .map(t =>
            t.paramSet.map(p => {
                console.log('param', p);
                return {
                    name: p.name,
                    values: p.values.join(','),
                };
            }),
        );

    targeting.push([{ name: 'p', values: 'amp' }]);

    console.log(targeting);

    return '{"targeting":""}';
};

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
const getPlacementId = (edition): number => {
    if (edition === 'US') {
        return 7;
    }
    if (edition === 'AU') {
        return 6;
    }
    return 4;
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
    <amp-ad
        width={300}
        height={250}
        data-npa-on-unknown-consent={true}
        data-loading-strategy={'prefer-viewability-over-views'}
        // data-slot={AmpAdDataSlot(article).toString()}
        layout={'responsive'}
        type={'doubleclick'}
        json={ampJson(edition, 'todo', commercialProperties.editionAdTargeting)}
        data-slot={ampData(section, dfpAccountId, contentType)}
        rtc-config={realTimeConfig('test', edition, false, switches)}
    />
);
