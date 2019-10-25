import React from 'react';
import { Caption } from '@frontend/amp/components/Caption';
import { constructQuery } from '@frontend/amp/lib/querystring';

interface EmbedConfig {
    adsConfig: {
        adTagParameters: {
            iu: string;
            cust_params: string;
        };
    };
}

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

export const YoutubeVideo: React.FC<{
    element: YoutubeBlockElement;
    pillar: Pillar;
    adTargeting?: AdTargeting;
}> = ({ element, pillar, adTargeting }) => {
    // https://www.ampproject.org/docs/reference/components/amp-youtube
    // https://developers.google.com/youtube/player_parameters
    const attributes: any = {
        id: `gu-video-youtube-${element.id}`,
        'data-videoid': element.assetId,
        layout: 'responsive',
        width: '16',
        height: '9',
        'data-param-modestbranding': true, // Remove YouTube logo
    };

    if (adTargeting) {
        attributes['data-param-embed_config'] = JSON.stringify(
            buildEmbedConfig(adTargeting),
        );
    }

    if (element.channelId) {
        // related videos metadata
        attributes['data-param-rel'] = '0';
        attributes['data-param-listType'] = 'playlist';
        attributes['data-param-list'] = element.channelId;
    }

    return (
        <Caption
            captionText={element.mediaTitle}
            pillar={pillar}
            padCaption={true}
        >
            <amp-youtube {...attributes} />
        </Caption>
    );
};
