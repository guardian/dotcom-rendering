import React from 'react';
import { Picture, ImageSource } from '@frontend/web/components/Picture';

const makeSource: (image: Image) => ImageSource = image => {
    return {
        width: image.fields.width,
        minWidth:
            parseFloat(image.fields.width) < 320 ? '320' : image.fields.width,
        srcset: `${image.url} ${image.fields.width}w`,
        hidpi: false,
    };
};

const getFallback: (images: Image[]) => string = images =>
    (images.find(_ => _.fields.isMaster === 'true') || images[0]).url;

export const ImageBlockComponent: React.SFC<{ element: ImageBlockElement }> = ({
    element,
}) => {
    return (
        <Picture
            sources={element.media.allImages.map(makeSource)}
            alt={element.data.alt}
            src={getFallback(element.media.allImages)}
        />
    );
};
