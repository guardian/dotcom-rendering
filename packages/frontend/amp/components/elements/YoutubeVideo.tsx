import React from 'react';
import { Caption } from '@guardian/guui/components/Caption/Caption';

export const YoutubeVideo: React.FC<{
    element: YoutubeBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
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
