import React from 'react';

export const VideoFacebookBlockComponent: React.FC<{
    element: VideoFacebookBlockElement;
}> = ({ element }) => {
    return (
        <amp-facebook
            data-href={element.url}
            data-embed-as="video"
            layout="responsive"
            width="5"
            height="3"
        />
    );
};
