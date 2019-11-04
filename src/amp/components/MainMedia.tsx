import React from 'react';
import { bestFitImage, heightEstimate } from '@root/src/amp/lib/image-fit';
import { css } from 'emotion';
import { textSans, palette } from '@guardian/src-foundations';
import { visuallyHidden } from '@guardian/src-utilities';
import InfoIcon from '@frontend/static/icons/info.svg';
import { YoutubeVideo } from '@root/src/amp/components/elements/YoutubeVideo';

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
    ${textSans({ level: 2 })};
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
                <>
                    <input
                        aria-checked={false}
                        type="checkbox"
                        id="show-caption"
                        className={inputStyle}
                    />
                    <label className={labelStyle} htmlFor="show-caption">
                        <span className={visuallyHidden}>Show caption</span>
                        <InfoIcon />
                    </label>
                    <figcaption className={captionStyle}>
                        {element.data.caption}{' '}
                        {element.displayCredit && element.data.credit}
                    </figcaption>
                </>
            )}
        </figure>
    );
};

// used to break out of the inner container margin
const expanded = css`
    margin: 0 -10px;
`;

const asComponent = (
    element: CAPIElement,
    pillar: Pillar,
    adTargeting?: any,
): JSX.Element | null => {
    switch (element._type) {
        case 'model.dotcomrendering.pageElements.ImageBlockElement':
            return mainImage(element);
        case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
            return (
                <YoutubeVideo
                    element={element}
                    pillar={pillar}
                    adTargeting={adTargeting}
                />
            );
        default:
            return null;
    }
};

export const MainMedia: React.FC<{
    element: CAPIElement;
    pillar: Pillar;
    adTargeting?: any;
}> = ({ element, pillar, adTargeting }) => {
    return (
        <div className={expanded}>
            {asComponent(element, pillar, adTargeting)}
        </div>
    );
};
