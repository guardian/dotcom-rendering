import React from 'react';
import { RawComponent } from '../RawComponent';

const getFallback: (images: Image[]) => Image = images =>
    images.find(_ => _.fields.isMaster === 'true') || images[0];

export const ImageBlockComponent: React.SFC<{ element: ImageBlockElement }> = ({
    element,
}) => {
    const image = getFallback(element.media.allImages);
    return (
        <RawComponent
            html={`<amp-img src="${image.url}" alt="${
                element.data.alt
            }" height="${image.fields.height}" width="${
                image.fields.width
            }" />`}
        />
    );
};
