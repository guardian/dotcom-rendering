import React from 'react';
import { textSans, palette } from '@guardian/src-foundations';
import { css } from 'emotion';
import { pillarPalette } from '@frontend/lib/pillars';
import { bestFitImage, heightEstimate } from '@frontend/amp/lib/image-fit';
import TriangleIcon from '@frontend/static/icons/triangle.svg';

const figureStyle = css`
    margin-top: 16px;
    margin-bottom: 8px;
`;
const captionStyle = css`
    padding-top: 8px;
    ${textSans({ level: 1 })};
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

    const captionLink = css`
        a {
            color: ${pillarPalette[pillar].main};
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        strong {
            font-weight: bold;
        }
    `;

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
            {(element.data.caption ||
                (element.data.credit && element.displayCredit)) && (
                <figcaption className={captionStyle}>
                    <span className={iconStyle}>
                        <TriangleIcon />
                    </span>
                    {/*
                        TODO - Move caption handling to use https://github.com/guardian/dotcom-rendering/blob/master/packages/guui/components/Caption/Caption.tsx
                        Update: 16th October (Pascal): guui has been decommissioned.
                    */}
                    <span
                        // tslint:disable-line:react-no-dangerous-html
                        className={captionLink}
                        dangerouslySetInnerHTML={{
                            __html: element.data.caption || '',
                        }}
                        key={'caption'}
                    />{' '}
                    {element.displayCredit && element.data.credit}
                </figcaption>
            )}
        </figure>
    );
};
