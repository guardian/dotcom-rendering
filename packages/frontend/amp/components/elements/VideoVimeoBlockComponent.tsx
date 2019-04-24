import React from 'react';
import { Caption } from '@guardian/guui/components/Caption/Caption';

export const VideoVimeoBlockComponent: React.FC<{
    element: VideoVimeoBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    const vimeoId = element.url.split('/').pop();
    return (
        <Caption captionText={element.caption} pillar={pillar}>
            <amp-vimeo
                data-videoid={vimeoId}
                layout="responsive"
                width="5"
                height="3"
            />
        </Caption>
    );
};
