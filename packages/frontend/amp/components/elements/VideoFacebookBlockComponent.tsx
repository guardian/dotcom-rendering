import React from 'react';
import { Caption } from '@guardian/guui/components/Caption/Caption';

export const VideoFacebookBlockComponent: React.FC<{
    element: VideoFacebookBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    return (
        <Caption captionText={element.caption} pillar={pillar}>
            <amp-facebook
                data-href={element.url}
                data-embed-as="video"
                layout="responsive"
                width="5"
                height="3"
            />
        </Caption>
    );
};
