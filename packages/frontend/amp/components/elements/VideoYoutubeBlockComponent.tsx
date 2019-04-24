import React from 'react';
import { Caption } from '@guardian/guui/components/Caption/Caption';

export const VideoYoutubeBlockComponent: React.FC<{
    element: VideoYoutubeBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    const youtubeId = element.url.split('v=').pop();
    return (
        <Caption captionText={element.caption} pillar={pillar}>
            <amp-youtube
                data-videoid={youtubeId}
                layout="responsive"
                width="5"
                height="3"
            />
        </Caption>
    );
};
