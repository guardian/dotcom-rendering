import React from 'react';
import { Picture, PictureSource } from '@frontend/web/components/Picture';
import { Caption } from '@guardian/guui/components/Caption/Caption';

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

const getSrcSetsForWeighting = (
    imageSources: ImageSource[],
    forWeighting: Weighting,
): SrcSet[] =>
    imageSources.filter(({ weighting }) => weighting === forWeighting)[0]
        .srcSet;

const makeSources = (imageSources: ImageSource[]): PictureSource[] => {
    const inlineSrcSets = getSrcSetsForWeighting(imageSources, 'inline');
    const sources: PictureSource[] = [];

    // TODO: ideally the imageSources array will come from frontend with prebaked URLs for
    // hidpi images.
    // Until that happens, here we're manually injecting (inadequate) <source> elements for
    // those images, albeit without the necessary query params for hidpi images :(
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

const getFallback: (imageSources: ImageSource[]) => string = imageSources => {
    const inlineSrcSets = getSrcSetsForWeighting(imageSources, 'inline');

    return bestFor(300, inlineSrcSets).src;
};

export const ImageBlockComponent: React.FC<{
    element: ImageBlockElement;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    const sources = makeSources(element.imageSources);
    return (
        <Caption
            captionText={element.data.caption || ''}
            pillar={pillar}
            dirtyHtml={true}
        >
            <Picture
                sources={sources}
                alt={element.data.alt || ''}
                src={getFallback(element.imageSources)}
            />
        </Caption>
    );
};
