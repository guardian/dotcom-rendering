import React from 'react';

export const VideoYoutubeBlockComponent: React.FC<{
    element: VideoYoutubeBlockElement;
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
