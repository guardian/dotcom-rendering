import React from 'react';
import { Img } from '@frontend/amp/components/primitives/Img';
import { textSans } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';
import { css } from 'emotion';
import { pillarPalette } from '@frontend/lib/pillars';
import { bestFitImage, heightEstimate } from '@frontend/amp/lib/image-fit';
import TriangleIcon from '@guardian/pasteup/icons/triangle.svg';

const figureStyle = css`
    margin-top: 16px;
    margin-bottom: 8px;
`;
const captionStyle = css`
    padding-top: 8px;
    ${textSans(1)};
    word-wrap: break-word;
    color: ${palette.neutral[46]};
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
    const iconStyle = css`
        fill: ${pillarPalette[pillar].main};
        padding-right: 3px;
    `;

    if (!image) {
        return null;
    }

    return (
        <figure className={figureStyle}>
            <Img
                src={image.src}
                alt={element.data.alt}
                attribution={element.data.credit}
                height={height.toString()}
                width={image.width.toString()}
                layout="responsive"
            />
            {(element.data.caption || element.data.credit) && (
                <figcaption className={captionStyle}>
                    <span className={iconStyle}>
                        <TriangleIcon />
                    </span>
                    {element.data.caption} {element.data.credit}
                </figcaption>
            )}
        </figure>
    );
};
