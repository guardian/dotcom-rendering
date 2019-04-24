import React from 'react';

export const VideoYoutube: React.FC<{
    element: VideoYoutube;
}> = ({ element }) => {
    const youtubeId = element.url.split('v=').pop();
    return (
        <amp-youtube
            data-videoid={youtubeId}
            layout="responsive"
            width="5"
            height="3"
        />
    );
};
