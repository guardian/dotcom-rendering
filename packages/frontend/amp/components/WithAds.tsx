import React from 'react';
import { Ad } from '@frontend/amp/components/Ad';

interface AdInfo {
    edition: Edition;
    contentType: string;
    commercialProperties: CommercialProperties;
    switches: {
        krux: boolean;
        ampPrebid: boolean;
    };
    section?: string;
}

export const WithAds: React.SFC<{
    items: any[];
    adSlots: number[];
    adClassName: string;
    adInfo: AdInfo;
}> = ({ items, adSlots, adClassName, adInfo }) => {
    const commercialConfig = {
        useKrux: adInfo.switches.krux,
        usePrebid: adInfo.switches.ampPrebid,
    };

    const ad = (
        <Ad
            className={adClassName}
            edition={adInfo.edition}
            section={adInfo.section}
            contentType={adInfo.contentType}
            config={commercialConfig}
            commercialProperties={adInfo.commercialProperties}
        />
    );

    const withAds = items.map((item, i) => {
        if (adSlots.includes(i)) {
            return (
                <>
                    {item}
                    {ad}
                </>
            );
        }

        return item;
    });

    return <>{withAds}</>;
};
