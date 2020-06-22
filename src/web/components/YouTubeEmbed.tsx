import React from 'react';

import { YouTubeOverlay } from '@frontend/web/components/YouTubeOverlay';
import { MaintainAspectRatio } from '@frontend/web/components/MaintainAspectRatio';

import { constructQuery } from '@root/src/lib/querystring';

type Props = {
    assetId: string;
    pillar: Pillar;
    adTargeting?: AdTargeting;
    overlayImage?: string;
    duration?: number; // in seconds
    title?: string;
    height?: number;
    width?: number;
};

type EmbedConfig = {
    adsConfig: {
        adTagParameters: {
            iu: string;
            cust_params: string;
        };
    };
};

const buildEmbedConfig = (adTargeting: AdTargeting): EmbedConfig => {
    return {
        adsConfig: {
            adTagParameters: {
                iu: `${adTargeting.adUnit || ''}`,
                cust_params: encodeURIComponent(
                    constructQuery(adTargeting.customParams),
                ),
            },
        },
    };
};

export const YouTubeEmbed = ({
    assetId,
    pillar,
    adTargeting,
    overlayImage,
    duration,
    height = 259,
    width = 460,
    title = 'YouTube video player',
}: Props) => {
    const embedConfig =
        adTargeting && JSON.stringify(buildEmbedConfig(adTargeting));

    if (overlayImage) {
        return (
            <MaintainAspectRatio height={height} width={width}>
                <YouTubeOverlay
                    image={overlayImage}
                    pillar={pillar}
                    duration={duration}
                />
                <iframe
                    title={title}
                    width={width}
                    height={height}
                    src={`https://www.youtube.com/embed/${assetId}?embed_config=${embedConfig}&enablejsapi=1&origin=https://www.theguardian.com&widgetid=1&modestbranding=1`}
                />
            </MaintainAspectRatio>
        );
    }

    return (
        <MaintainAspectRatio height={height} width={width}>
            <iframe
                title={title}
                width={width}
                height={height}
                src={`https://www.youtube.com/embed/${assetId}?embed_config=${embedConfig}&enablejsapi=1&origin=https://www.theguardian.com&widgetid=1&modestbranding=1`}
            />
        </MaintainAspectRatio>
    );
};
