import React from 'react';
import { getIdFromUrl } from '@frontend/model/validators';

export const VideoYoutube: React.FC<{
    element: VideoYoutube;
}> = ({ element }) => {
    const youtubeId = getIdFromUrl(
        element.url,
        '^[a-zA-Z0-9_-]{11}$', // Alpha numeric, underscores and hyphens, exactly 11 numbers long
        false,
        'v',
    );
    return (
        <amp-youtube
            data-videoid={youtubeId}
            layout="responsive"
            width={element.width}
            height={element.height}
        />
    );
};
