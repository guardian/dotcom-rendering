import React from 'react';
import { getIdFromUrl } from '@frontend/amp/lib/get-video-id';
import { Caption } from '@frontend/amp/components/Caption';

export const VideoVimeo: React.FC<{
    element: VideoVimeo;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    const vimeoId = getIdFromUrl(element.url, '(\\d+)($|\\/)', true);

    return (
        <Caption captionText={element.caption} pillar={pillar}>
            <amp-vimeo
                data-videoid={vimeoId}
                layout="responsive"
                width={element.width}
                height={element.height}
            />
        </Caption>
    );
};
