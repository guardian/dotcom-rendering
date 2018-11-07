import React from 'react';
import { Img } from '../primitives/Img';
import { sans } from '@guardian/pasteup/fonts';
import { palette } from '@guardian/pasteup/palette';
import { css } from 'react-emotion';
import { pillarPalette } from '../../../lib/pillars';
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
const getFallback: (images: Image[]) => Image = images =>
    images.find(_ => _.fields.isMaster === 'true') || images[0];
export const ImageBlockComponent: React.SFC<{
    element: ImageBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    const image = getFallback(element.media.allImages);
    const fill = css`
        fill: ${pillarPalette[pillar].main};
    `;
    return (
        <figure className={figureStyle}>
            <Img
                src={image.url}
                alt={element.data.alt}
                attribution={element.data.credit}
                height={image.fields.height}
                width={image.fields.width}
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
