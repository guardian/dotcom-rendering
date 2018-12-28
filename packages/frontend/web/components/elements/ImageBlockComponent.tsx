import React from 'react';
import { Picture, PictureSource } from '@frontend/web/components/Picture';

const widths = [660, 480, 0];

const bestFor = (desiredWidth: number, inlineSrcSets: SrcSet[]): SrcSet => {
    const sorted = inlineSrcSets.sort((a, b) => b.width - a.width);

    return sorted.reduce((best, current) => {
        if (current.width < best.width && current.width >= desiredWidth) {
            return current;
        }

        return best;
    });
};
const makeSources = (imageSources: ImageSource[]): PictureSource[] => {
    const inlineSrcSets = imageSources.filter(
        ({ weighting }) => weighting === 'inline',
    )[0].srcSet;
    const sources: PictureSource[] = [];

    widths.forEach(width => {
        sources.push(makeSource(true, width, bestFor(width, inlineSrcSets)));
        sources.push(makeSource(false, width, bestFor(width, inlineSrcSets)));
    });

    return sources;
};

const makeSource = (
    hidpi: boolean,
    minWidth: number,
    srcSet: SrcSet,
): PictureSource => {
    return {
        hidpi,
        minWidth,
        width: srcSet.width,
        srcset: `${srcSet.src} ${hidpi ? srcSet.width * 2 : srcSet.width}w`,
    };
};

const getFallback: (images: Image[]) => string = images =>
    (images.find(_ => _.fields.isMaster === 'true') || images[0]).url;

export const ImageBlockComponent: React.SFC<{ element: ImageBlockElement }> = ({
    element,
}) => {
    const sources = makeSources(element.imageSources);

    return (
        <Picture
            sources={sources}
            alt={element.data.alt}
            src={getFallback(element.media.allImages)}
        />
    );
};
