import React from 'react';
import { Picture, PictureSource } from '@frontend/web/components/Picture';

const makeSources = (imageSources: ImageSource[]): PictureSource[] => {
    const inlineSrcSets = imageSources.filter(
        ({ weighting }) => weighting === 'inline',
    )[0].srcSet;
    const sources: PictureSource[] = [];

    inlineSrcSets.forEach(srcSet => {
        sources.push(makeSource(true, srcSet));
        sources.push(makeSource(false, srcSet));
    });

    return sources;
};

const makeSource = (hidpi: boolean, srcSet: SrcSet): PictureSource => {
    return {
        hidpi,
        width: srcSet.width,
        minWidth: srcSet.width < 320 ? 320 : srcSet.width,
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
