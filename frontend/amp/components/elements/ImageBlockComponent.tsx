import React from 'react';
import { Img } from '../primitives/Img';

const getFallback: (images: Image[]) => Image = images =>
    images.find(_ => _.fields.isMaster === 'true') || images[0];
export const ImageBlockComponent: React.SFC<{ element: ImageBlockElement }> = ({
    element,
}) => {
    const image = getFallback(element.media.allImages);
    return (
        <Img
            src={image.url}
            alt={element.data.alt}
            attribution={element.data.credit}
            height={image.fields.height}
            width={image.fields.width}
        />
    );
};
