import React from 'react';

export const VideoVimeo: React.FC<{
    element: VideoVimeo;
}> = ({ element }) => {
    const vimeoId = element.url.split('/').pop();
    return (
        <amp-vimeo
            data-videoid={vimeoId}
            layout="responsive"
            width="5"
            height="3"
        />
    );
};
