import React from 'react';
import { css } from 'emotion';
import { bestFitImage, heightEstimate } from '@frontend/amp/lib/image-fit';
import { Caption } from '@frontend/amp/components/Caption';

const figureStyle = css`
    margin-top: 16px;
    margin-bottom: 8px;
`;

export const Image: React.FC<{
    element: ImageBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    const containerWidth = 600;
    const image: SrcSet = bestFitImage(element.imageSources, containerWidth);
    const height: number = heightEstimate(
        element.media.allImages[0],
        image.width,
    );

    const captionText = element.displayCredit
        ? element.data.caption + element.data.credit
        : element.data.caption || '';

    const shouldDisplayCaption =
        element.data.caption || (element.data.credit && element.displayCredit);

    if (!image) {
        return null;
    }

    return (
        <figure className={figureStyle}>
            <amp-img
                src={image.src}
                alt={element.data.alt}
                attribution={element.data.credit}
                height={height.toString()}
                width={image.width.toString()}
                layout="responsive"
            />
            {shouldDisplayCaption && (
                <Caption
                    captionText={captionText}
                    pillar={pillar}
                    dirtyHtml={true}
                />
            )}
        </figure>
    );
};
