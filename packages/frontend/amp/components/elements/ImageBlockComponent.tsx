import React from 'react';
import { Img } from '@frontend/amp/components/primitives/Img';
import { sans } from '@guardian/pasteup/fonts';
import { palette } from '@guardian/pasteup/palette';
import { css } from 'react-emotion';
import { pillarPalette } from '@frontend/lib/pillars';
import {
    bestFitImage,
    heightEstimate,
} from '@frontend/amp/components/lib/GetImage';
const figureStyle = css`
    margin-top: 16px;
    margin-bottom: 8px;
`;
const captionStyle = css`
    padding-top: 8px;
    font-size: 12px;
    font-family: ${sans.body};
    word-wrap: break-word;
    line-height: 16px;
    color: ${palette.neutral[46]};
`;

export const ImageBlockComponent: React.SFC<{
    element: ImageBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    const containerWidth = 600;
    const image: SrcSet = bestFitImage(element.imageSources, containerWidth);
    const height: number = heightEstimate(
        element.media.allImages[0],
        image.width,
    );
    const fill = css`
        fill: ${pillarPalette[pillar].main};
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
            {element.data.caption && (
                <figcaption className={captionStyle}>
                    <span className={fill}>
                        <svg width="11" height="10" viewBox="0 0 11 10">
                            <path fill-rule="evenodd" d="M5.5 0L11 10H0z" />
                        </svg>
                    </span>
                    {element.data.caption}
                </figcaption>
            )}
        </figure>
    );
};
