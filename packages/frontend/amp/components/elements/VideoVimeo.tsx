import React from 'react';
import { getIdFromUrl } from '@frontend/model/validators';

export const VideoVimeo: React.FC<{
    element: VideoVimeo;
}> = ({ element }) => {
    const vimeoId = getIdFromUrl(element.url, '(\\d+)($|\\/)', true);

    return (
        <amp-vimeo
            data-videoid={vimeoId}
            layout="responsive"
            width={element.width}
            height={element.height}
        />
    );
};
