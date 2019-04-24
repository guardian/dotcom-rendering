import React from 'react';
import { Caption } from '@guardian/guui/components/Caption/Caption';

export const YoutubeVideo: React.FC<{
    element: YoutubeBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    // https://www.ampproject.org/docs/reference/components/amp-youtube
    // https://developers.google.com/youtube/player_parameters
    const attributes = {
        id: `gu-video-youtube-${element.id}`,
        'data-videoid': element.assetId,
        layout: 'responsive',
        width: '16',
        height: '9',
        'data-param-modestbranding': true, // Remove YouTube logo
        'data-param-rel': '0', // Show the channel's related videos
        'data-param-listType': 'playlist', // Related videos from playlist
        'data-param-list': element.channelId, // Use specific channel ID for related videos
    };

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
