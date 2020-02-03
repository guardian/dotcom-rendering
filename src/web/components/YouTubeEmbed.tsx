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

const PositionRelative = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => (
    <div
        className={css`
            /* position relative to contain the absolutely positioned Overlay image */
            position: relative;
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
    title = 'YouTube video player',
}: Props) => {
    const embedConfig =
        adTargeting && JSON.stringify(buildEmbedConfig(adTargeting));

    if (overlayImage) {
        return (
            <PositionRelative>
                <YouTubeOverlay
                    image={overlayImage}
                    pillar={pillar}
                    duration={duration}
                />
                <iframe
                    title={title}
                    width="100%"
                    height="350px"
                    src={`https://www.youtube.com/embed/${assetId}?embed_config=${embedConfig}&enablejsapi=1&origin=https://www.theguardian.com&widgetid=1&modestbranding=1`}
                />
            </PositionRelative>
        );
    }

    return (
        <iframe
            title={title}
            width="100%"
            height="350px"
            src={`https://www.youtube.com/embed/${assetId}?embed_config=${embedConfig}&enablejsapi=1&origin=https://www.theguardian.com&widgetid=1&modestbranding=1`}
        />
    );
};
