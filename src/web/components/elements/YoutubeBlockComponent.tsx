import React from 'react';

import { Caption } from '@root/src/web/components/Caption';
import { YouTubeOverlay } from '@frontend/web/components/YouTubeOverlay';
import { MaintainAspectRatio } from '@frontend/web/components/MaintainAspectRatio';

import { constructQuery } from '@root/src/lib/querystring';

type Props = {
    display: Display;
    designType: DesignType;
    element: YoutubeBlockElement;
    pillar: Pillar;
    role: RoleType;
    hideCaption?: boolean;
    overlayImage?: string;
    adTargeting?: AdTargeting;
    isMainMedia?: boolean;
    height?: number;
    width?: number;
    title?: string;
    duration?: number; // in seconds
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

export const YoutubeBlockComponent = ({
    display,
    designType,
    element,
    pillar,
    hideCaption,
    overlayImage,
    role,
    adTargeting,
    isMainMedia,
    height = 259,
    width = 460,
    title = 'YouTube video player',
    duration,
}: Props) => {
    const shouldLimitWidth =
        !isMainMedia &&
        (role === 'showcase' || role === 'supporting' || role === 'immersive');

    const embedConfig =
        adTargeting && JSON.stringify(buildEmbedConfig(adTargeting));

    return (
        <>
            <MaintainAspectRatio height={height} width={width}>
                {overlayImage && (
                    <YouTubeOverlay
                        image={overlayImage}
                        pillar={pillar}
                        duration={duration}
                    />
                )}
                <iframe
                    title={title}
                    width={width}
                    height={height}
                    src={`https://www.youtube.com/embed/${element.assetId}?embed_config=${embedConfig}&enablejsapi=1&origin=https://www.theguardian.com&widgetid=1&modestbranding=1`}
                />
            </MaintainAspectRatio>
            {!hideCaption && (
                <Caption
                    display={display}
                    designType={designType}
                    captionText={element.mediaTitle || ''}
                    pillar={pillar}
                    displayCredit={false}
                    shouldLimitWidth={shouldLimitWidth}
                />
            )}
        </>
    );
};
