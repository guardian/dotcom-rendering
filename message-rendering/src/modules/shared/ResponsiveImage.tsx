import React, { ReactElement } from 'react';

export type ImageAttrs = {
    url: string;
    media: string;
    alt?: string;
};

type ResponsiveImageProps = {
    images: Array<ImageAttrs>;
    baseImage: ImageAttrs;
};

function createSource(image: ImageAttrs): ReactElement {
    return <source media={image.media} srcSet={image.url} key={image.url} />;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
    images,
    baseImage,
}: ResponsiveImageProps) => {
    return (
        <picture>
            {images.map(createSource)}
            <img src={baseImage.url} alt={baseImage.alt} />
        </picture>
    );
};
