import React from 'react';
import { Picture, PictureSource } from '@root/src/web/components/Picture';
import { Caption } from '@root/src/web/components/Caption';

const widths = [1020, 660, 480, 0];

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
    forWeighting: RoleType,
): SrcSet[] =>
    imageSources.filter(
        ({ weighting }) =>
            // Use toLowerCase to handle cases where we have halfWidth comparing to halfwidth
            weighting.toLowerCase() === forWeighting.toLowerCase(),
    )[0].srcSet;

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

const makeSources = (
    imageSources: ImageSource[],
    role: RoleType,
): PictureSource[] => {
    const inlineSrcSets = getSrcSetsForWeighting(imageSources, role);
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

const getFallback: (imageSources: ImageSource[]) => string = imageSources => {
    const inlineSrcSets = getSrcSetsForWeighting(imageSources, 'inline');

    return bestFor(300, inlineSrcSets).src;
};

export const ImageComponent: React.FC<{
    element: ImageBlockElement;
    pillar: Pillar;
    hideCaption?: boolean;
    role: RoleType;
    isMainMedia?: boolean;
    children?: JSXElements;
}> = ({ element, pillar, hideCaption, role, isMainMedia, children }) => {
    const sources = makeSources(element.imageSources, element.role);
    if (hideCaption) {
        return (
            <Picture
                sources={sources}
                alt={element.data.alt || ''}
                src={getFallback(element.imageSources)}
            >
                {children}
            </Picture>
        );
    }
    return (
        <Caption
            captionText={element.data.caption || ''}
            pillar={pillar}
            dirtyHtml={true}
            credit={element.data.credit}
            displayCredit={true}
            role={role}
            isMainMedia={isMainMedia}
        >
            <Picture
                sources={sources}
                alt={element.data.alt || ''}
                src={getFallback(element.imageSources)}
            >
                {children}
            </Picture>
        </Caption>
    );
};
