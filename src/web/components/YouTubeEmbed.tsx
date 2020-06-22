import React from 'react';
import { css } from 'emotion';

import { YouTubeOverlay } from '@frontend/web/components/YouTubeOverlay';

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

const MaintainAspectRatio = ({
    height,
    width,
    children,
}: {
    height: number;
    width: number;
    children: JSX.Element | JSX.Element[];
}) => (
    /* https://css-tricks.com/aspect-ratio-boxes/ */
    <div
        className={css`
            /* position relative to contain the absolutely positioned iframe plus any Overlay image */
            position: relative;
            padding-bottom: ${(height / width) * 100}%;
            position: relative;
            iframe {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
        `}
    >
        {children}
    </div>
);

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
