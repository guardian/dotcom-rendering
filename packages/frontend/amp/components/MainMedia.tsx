import React from 'react';
import { Img } from '@frontend/amp/components/primitives/Img';
import { bestFitImage, heightEstimate } from '@frontend/amp/lib/image-fit';
import { css } from 'emotion';
import { textSans } from '@guardian/pasteup/typography';
import InfoIcon from '@guardian/pasteup/icons/info.svg';
import { palette } from '@guardian/pasteup/palette';
import { YoutubeBlockComponent } from '@frontend/amp/components/elements/YoutubeBlockComponent';

const figureStyle = css`
    margin: 0 0;
    position: relative;

    input:checked ~ figcaption {
        display: block;
    }
`;

const captionStyle = css`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(18, 18, 18, 0.8);
    color: ${palette.neutral[100]};
    display: none;
    padding: 6px 40px 12px 10px;
    max-width: 100%;
    min-height: 46px;
    line-height: 18px;
    ${textSans(2)};
`;

const inputStyle = css`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
`;

const labelStyle = css`
    position: absolute;
    right: 6px;
    width: 32px;
    height: 32px;
    z-index: 1;
    background-color: rgba(18, 18, 18, 0.6);
    border-radius: 50%;
    bottom: 6px;

    svg {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        position: absolute;
        fill: ${palette.neutral[100]};
    }
`;

const mainImage = (element: ImageBlockElement): JSX.Element | null => {
    const containerWidth = 600;
    const image: SrcSet = bestFitImage(element.imageSources, containerWidth);
    const height: number = heightEstimate(
        element.media.allImages[0],
        image.width,
    );

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
                <>
                    <input
                        aria-checked={false}
                        type="checkbox"
                        id="show-caption"
                        className={inputStyle}
                    />
                    <label className={labelStyle} htmlFor="show-caption">
                        <InfoIcon />
                    </label>
                    <figcaption className={captionStyle}>
                        {element.data.caption}
                    </figcaption>
                </>
            )}
        </figure>
    );
};

export const MainMedia: React.FC<{
    element: CAPIElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    switch (element._type) {
        case 'model.dotcomrendering.pageElements.ImageBlockElement':
            return mainImage(element);
        case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
            return <YoutubeBlockComponent element={element} pillar={pillar} />;
        default:
            return null;
    }
};
